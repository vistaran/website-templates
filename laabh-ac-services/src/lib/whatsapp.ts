import prisma from './prisma';

export interface WhatsAppSendResult {
  success: boolean;
  mock: boolean;
  messageId?: string;
  error?: string;
}

export interface SendWhatsAppParams {
  bookingId?: number;
  recipientPhone: string;
  recipientType: 'CUSTOMER' | 'VENDOR' | 'TECHNICIAN';
  templateName: string;
  messageContent: string;
  templateParams?: {
    name: string;
    language?: string;
    parameters?: string[];
  };
}

/**
 * Normalizes phone numbers to international format (e.g., 918141434327)
 */
export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`; // Default to India country code
  }
  return digits;
}

/**
 * Checks if a duplicate notification was sent recently to avoid spamming
 */
async function isDuplicateNotification(
  bookingId: number | undefined,
  templateName: string,
  recipientPhone: string
): Promise<boolean> {
  if (!bookingId) return false;

  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  const existing = await prisma.notification.findFirst({
    where: {
      bookingId,
      templateName,
      recipientPhone,
      createdAt: { gte: fifteenMinutesAgo },
      status: { in: ['SENT', 'MOCK_SENT'] },
    },
  });

  return !!existing;
}

/**
 * Sends a WhatsApp message using Meta WhatsApp Cloud API or Mock Dev Mode
 */
export async function sendWhatsAppMessage(
  params: SendWhatsAppParams
): Promise<WhatsAppSendResult> {
  const { bookingId, recipientPhone, recipientType, templateName, messageContent, templateParams } = params;
  const normalizedPhone = cleanPhoneNumber(recipientPhone);

  // 1. Prevent duplicate notifications
  if (await isDuplicateNotification(bookingId, templateName, normalizedPhone)) {
    console.log(`[WHATSAPP SKIPPED - DUPLICATE] ${templateName} to ${normalizedPhone}`);
    return {
      success: true,
      mock: true,
      messageId: 'skipped-duplicate',
    };
  }

  // 2. Fetch business settings and environment keys
  const settings = await prisma.businessSettings.findFirst();
  const token =
    process.env.FACEBOOK_ACCESS_TOKEN ||
    process.env.WHATSAPP_API_TOKEN ||
    settings?.whatsappCloudApiToken ||
    '';
  const phoneNumberId =
    process.env.FACEBOOK_WHATSAPP_PHONE_ID ||
    process.env.WHATSAPP_PHONE_NUMBER_ID ||
    settings?.whatsappPhoneNumberId ||
    '';
  const apiBaseUrl = (
    process.env.FACEBOOK_API_URL || 'https://graph.facebook.com/v22.0'
  ).replace(/\/+$/, '');

  const isMockMode =
    process.env.WHATSAPP_MOCK_MODE === 'false'
      ? false
      : settings?.mockModeEnabled ?? (process.env.WHATSAPP_MOCK_MODE !== 'false' || !token || !phoneNumberId);

  // 3. Mock Mode Execution
  if (isMockMode || !token || !phoneNumberId) {
    const mockId = `mock_wamid_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    console.log('\n================== [WHATSAPP CLOUD API - MOCK MODE] ==================');
    console.log(`To: ${normalizedPhone} (${recipientType})`);
    console.log(`Template: ${templateName}`);
    console.log(`Booking ID: ${bookingId || 'N/A'}`);
    console.log('------------------ MESSAGE CONTENT ------------------');
    console.log(messageContent);
    console.log('=======================================================================\n');

    await prisma.notification.create({
      data: {
        bookingId: bookingId || null,
        recipientPhone: normalizedPhone,
        recipientType,
        channel: 'WHATSAPP',
        templateName,
        messageContent,
        status: 'MOCK_SENT',
        whatsappMessageId: mockId,
        sentAt: new Date(),
      },
    });

    return {
      success: true,
      mock: true,
      messageId: mockId,
    };
  }

  // 4. Live Meta WhatsApp Business Cloud API execution
  const url = `${apiBaseUrl}/${phoneNumberId}/messages`;

  // Function to perform the HTTP post to Meta
  const postToMeta = async (payloadObj: Record<string, unknown>) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadObj),
    });
  };

  try {
    let response: Response;
    let data: any;
    let attemptedTemplate = false;

    // A) If templateParams are configured, attempt template dispatch first
    if (templateParams?.name) {
      attemptedTemplate = true;
      const templatePayload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: normalizedPhone,
        type: 'template',
        template: {
          name: templateParams.name.toLowerCase().trim(),
          language: { code: templateParams.language || process.env.WHATSAPP_TEMPLATE_LANG || 'en_US' },
          components: templateParams.parameters?.length
            ? [
                {
                  type: 'body',
                  parameters: templateParams.parameters.map((val) => {
                    const cleaned = String(val ?? 'N/A')
                      .replace(/[\r\n\t]+/g, ', ')
                      .replace(/\s{2,}/g, ' ')
                      .trim();
                    return {
                      type: 'text',
                      text: cleaned.slice(0, 1000) || 'N/A',
                    };
                  }),
                },
              ]
            : undefined,
        },
      };

      response = await postToMeta(templatePayload);
      data = await response.json();

      // If template language mismatch (error 132001), retry with alternate language code (en <-> en_US)
      if (!response.ok && data?.error?.code === 132001) {
        const altLang = templatePayload.template.language.code === 'en_US' ? 'en' : 'en_US';
        console.warn(`[WHATSAPP] Retrying template "${templateParams.name}" with alternate language code: "${altLang}"`);
        templatePayload.template.language.code = altLang;
        response = await postToMeta(templatePayload);
        data = await response.json();
      }

      // If template doesn't exist on Meta yet (error 132000 or 100), fallback to text message
      if (!response.ok && (data?.error?.code === 132000 || data?.error?.code === 100 || data?.error?.error_subcode === 2388040)) {
        console.warn(`[WHATSAPP] Template "${templateParams.name}" not found in Meta account. Falling back to direct text message...`);
        attemptedTemplate = false;
      }
    }

    // B) Text message dispatch (if no template requested or if template was not found on Meta)
    if (!attemptedTemplate) {
      const textPayload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: normalizedPhone,
        type: 'text',
        text: {
          preview_url: true,
          body: messageContent,
        },
      };

      response = await postToMeta(textPayload);
      data = await response.json();
    }

    if (!response!.ok || data?.error) {
      const errorMsg = data?.error?.message || `HTTP ${response!.status}: ${response!.statusText}`;
      console.error('[WHATSAPP API ERROR]', data?.error || data);

      await prisma.notification.create({
        data: {
          bookingId: bookingId || null,
          recipientPhone: normalizedPhone,
          recipientType,
          channel: 'WHATSAPP',
          templateName,
          messageContent,
          status: 'FAILED',
          errorMessage: errorMsg,
        },
      });

      return {
        success: false,
        mock: false,
        error: errorMsg,
      };
    }

    const messageId = data?.messages?.[0]?.id || `wamid_${Date.now()}`;
    await prisma.notification.create({
      data: {
        bookingId: bookingId || null,
        recipientPhone: normalizedPhone,
        recipientType,
        channel: 'WHATSAPP',
        templateName,
        messageContent,
        status: 'SENT',
        whatsappMessageId: messageId,
        sentAt: new Date(),
      },
    });

    return {
      success: true,
      mock: false,
      messageId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[WHATSAPP DISPATCH ERROR]', errorMsg);

    await prisma.notification.create({
      data: {
        bookingId: bookingId || null,
        recipientPhone: normalizedPhone,
        recipientType,
        channel: 'WHATSAPP',
        templateName,
        messageContent,
        status: 'FAILED',
        errorMessage: errorMsg,
      },
    });

    return {
      success: false,
      mock: false,
      error: errorMsg,
    };
  }
}

// ----------------- Notification Trigger Helpers -----------------

export async function notifyVendorNewBooking(booking: {
  id: number;
  bookingRef: string;
  customer: { name: string; phone: string };
  service: { name: string };
  acType?: string | null;
  unitCount: number;
  serviceAddress: string;
  preferredDate: Date;
  preferredTimeSlot: string;
  problemDescription?: string | null;
}) {
  const settings = await prisma.businessSettings.findFirst();
  const vendorPhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '918141434327';
  const formattedDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const message = [
    `🚨 *NEW BOOKING ALERT | Labh AC Services*`,
    `--------------------------------------`,
    `📌 *Ref ID:* ${booking.bookingRef}`,
    `👤 *Customer:* ${booking.customer.name}`,
    `📞 *Phone:* ${booking.customer.phone}`,
    `🛠️ *Service:* ${booking.service.name}`,
    `❄️ *AC Type:* ${booking.acType || 'Standard'} (${booking.unitCount} unit${booking.unitCount > 1 ? 's' : ''})`,
    `📅 *Date:* ${formattedDate}`,
    `⏰ *Slot:* ${booking.preferredTimeSlot}`,
    `📍 *Address:* ${booking.serviceAddress}`,
    booking.problemDescription ? `📝 *Notes/Issue:* ${booking.problemDescription}` : '',
    `--------------------------------------`,
    `👉 Login to admin dashboard to review and assign a technician.`,
  ]
    .filter(Boolean)
    .join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: vendorPhone,
    recipientType: 'VENDOR',
    templateName: 'vendor_booking_alert',
    messageContent: message,
    templateParams: {
      name: 'vendor_booking_alert',
      language: 'en',
      parameters: [
        booking.bookingRef,
        booking.customer.name,
        booking.customer.phone,
        booking.service.name,
        `${formattedDate} (${booking.preferredTimeSlot})`,
        booking.serviceAddress,
      ],
    },
  });
}

export async function notifyCustomerBookingReceived(booking: {
  id: number;
  bookingRef: string;
  customer: { name: string; phone: string };
  service: { name: string };
  preferredDate: Date;
  preferredTimeSlot: string;
}) {
  const formattedDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const settings = await prisma.businessSettings.findFirst();
  const helplinePhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '+91 81414 34327';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005';
  const trackingLink = `${appUrl}/track?ref=${booking.bookingRef}&phone=${booking.customer.phone}`;

  const message = [
    `👋 *Hello ${booking.customer.name},*`,
    `Thank you for reaching out to *Labh Air Conditioning Services*!`,
    ``,
    `We have received your service request:`,
    `📌 *Booking Reference:* ${booking.bookingRef}`,
    `🛠️ *Service:* ${booking.service.name}`,
    `📅 *Preferred Date:* ${formattedDate}`,
    `⏰ *Preferred Slot:* ${booking.preferredTimeSlot}`,
    `⏳ *Status:* PENDING REVIEW`,
    ``,
    `Our service team is reviewing your schedule. We will assign a technician and confirm shortly.`,
    ``,
    `🔍 *Track Status Online:*`,
    `${trackingLink}`,
    ``,
    `📞 *Helpline:* ${helplinePhone}`,
  ].join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: booking.customer.phone,
    recipientType: 'CUSTOMER',
    templateName: 'booking_received',
    messageContent: message,
    templateParams: {
      name: 'booking_received',
      language: 'en',
      parameters: [
        booking.customer.name,
        booking.bookingRef,
        booking.service.name,
        formattedDate,
        booking.preferredTimeSlot,
      ],
    },
  });
}

export async function notifyCustomerBookingConfirmed(booking: {
  id: number;
  bookingRef: string;
  customer: { name: string; phone: string };
  service: { name: string };
  preferredDate: Date;
  preferredTimeSlot: string;
  serviceAddress: string;
  technician?: { name: string; phone: string } | null;
}) {
  const formattedDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const techDetails = booking.technician
    ? `👨‍🔧 *Assigned Technician:* ${booking.technician.name} (${booking.technician.phone})`
    : `👨‍🔧 *Technician:* Assigned technician will contact you 30 mins prior to arrival.`;

  const techNamePhone = booking.technician
    ? `${booking.technician.name} (${booking.technician.phone})`
    : 'Will contact 30 mins prior to arrival';

  const settings = await prisma.businessSettings.findFirst();
  const helplinePhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '+91 81414 34327';

  const message = [
    `✅ *BOOKING CONFIRMED | Labh AC Services*`,
    `--------------------------------------`,
    `Dear *${booking.customer.name}*, your AC service is confirmed!`,
    ``,
    `📌 *Booking Ref:* ${booking.bookingRef}`,
    `🛠️ *Service:* ${booking.service.name}`,
    `📅 *Appointment Date:* ${formattedDate}`,
    `⏰ *Time Slot:* ${booking.preferredTimeSlot}`,
    `📍 *Location:* ${booking.serviceAddress}`,
    `${techDetails}`,
    `--------------------------------------`,
    `Our certified technician will arrive equipped with genuine parts and diagnostic equipment.`,
    ``,
    `Need to reschedule? Call ${helplinePhone} for help.`,
  ].join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: booking.customer.phone,
    recipientType: 'CUSTOMER',
    templateName: 'vendor_booking_confirmed',
    messageContent: message,
    templateParams: {
      name: 'vendor_booking_confirmed',
      language: 'en',
      parameters: [
        booking.customer.name,
        booking.bookingRef,
        booking.service.name,
        formattedDate,
        booking.preferredTimeSlot,
        booking.serviceAddress,
        techNamePhone,
        helplinePhone,
      ],
    },
  });
}

export async function notifyCustomerStatusChange(
  booking: {
    id: number;
    bookingRef: string;
    customer: { name: string; phone: string };
    service: { name: string };
  },
  newStatus: string,
  reason?: string
) {
  let statusEmoji = '🔄';
  let statusMessage = '';

  switch (newStatus) {
    case 'IN_PROGRESS':
      statusEmoji = '⚡';
      statusMessage = 'Our technician has arrived and commenced service on your air conditioning unit.';
      break;
    case 'COMPLETED':
      statusEmoji = '🎉';
      statusMessage =
        'Your AC service has been successfully completed and verified. Thank you for trusting Labh Air Conditioning Services!';
      break;
    case 'CANCELLED':
      statusEmoji = '❌';
      statusMessage = `Your booking has been cancelled.${reason ? ` Reason: ${reason}` : ''}`;
      break;
    default:
      statusMessage = `Your booking status is updated to ${newStatus}.`;
  }

  const settings = await prisma.businessSettings.findFirst();
  const helplinePhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '+91 81414 34327';

  const message = [
    `${statusEmoji} *Booking Update | ${newStatus}*`,
    `Ref ID: *${booking.bookingRef}*`,
    `Service: ${booking.service.name}`,
    ``,
    `Dear ${booking.customer.name},`,
    statusMessage,
    ``,
    `For any questions or feedback, reach us at ${helplinePhone}.`,
  ].join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: booking.customer.phone,
    recipientType: 'CUSTOMER',
    templateName: `vendor_status_${newStatus.toLowerCase()}`,
    messageContent: message,
    templateParams: {
      name: 'vendor_booking_status_update',
      language: 'en',
      parameters: [
        booking.customer.name,
        booking.bookingRef,
        newStatus,
        statusMessage,
        helplinePhone,
      ],
    },
  });
}

export async function notifyCustomerRescheduled(booking: {
  id: number;
  bookingRef: string;
  customer: { name: string; phone: string };
  service: { name: string };
  preferredDate: Date;
  preferredTimeSlot: string;
}) {
  const formattedDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const settings = await prisma.businessSettings.findFirst();
  const helplinePhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '+91 81414 34327';

  const message = [
    `🗓️ *APPOINTMENT RESCHEDULED | Labh AC Services*`,
    `Dear ${booking.customer.name}, your service appointment has been rescheduled.`,
    ``,
    `📌 *Ref ID:* ${booking.bookingRef}`,
    `🛠️ *Service:* ${booking.service.name}`,
    `📅 *New Date:* ${formattedDate}`,
    `⏰ *New Time Slot:* ${booking.preferredTimeSlot}`,
    ``,
    `Our team will reach your address at the updated time. For assistance, call ${helplinePhone}. Thank you!`,
  ].join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: booking.customer.phone,
    recipientType: 'CUSTOMER',
    templateName: 'vendor_booking_rescheduled',
    messageContent: message,
    templateParams: {
      name: 'vendor_booking_rescheduled',
      language: 'en',
      parameters: [
        booking.customer.name,
        booking.bookingRef,
        booking.service.name,
        formattedDate,
        booking.preferredTimeSlot,
        helplinePhone,
      ],
    },
  });
}

/**
 * Handles scheduling and rescheduling of appointment reminders
 */
export async function scheduleBookingReminder(bookingId: number, appointmentDate: Date) {
  // 1. Cancel previous pending reminders for this booking
  await prisma.reminder.updateMany({
    where: {
      bookingId,
      status: 'PENDING',
    },
    data: {
      status: 'CANCELLED',
    },
  });

  // 2. Schedule 24h prior reminder (or 2 hours before if appointment is today/tomorrow)
  const scheduledTime = new Date(appointmentDate);
  scheduledTime.setHours(9, 0, 0, 0); // 9:00 AM on the day or previous day
  scheduledTime.setDate(scheduledTime.getDate() - 1);

  // If already in the past, schedule for 1 hour from now
  const now = new Date();
  const targetDate = scheduledTime > now ? scheduledTime : new Date(now.getTime() + 60 * 60 * 1000);

  await prisma.reminder.create({
    data: {
      bookingId,
      scheduledFor: targetDate,
      reminderType: 'UPCOMING_APPOINTMENT_24H',
      status: 'PENDING',
    },
  });
}

export async function notifyVendorTodayAppointment(booking: {
  id: number;
  bookingRef: string;
  customer: { name: string; phone: string };
  service: { name: string };
  preferredDate: Date;
  preferredTimeSlot: string;
  serviceAddress: string;
  technician?: { name: string; phone: string } | null;
}) {
  const settings = await prisma.businessSettings.findFirst();
  const vendorPhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '918141434327';

  const formattedDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const techInfo = booking.technician
    ? `${booking.technician.name} (${booking.technician.phone})`
    : 'Pending Assignment';

  const message = [
    `🔔 *Service appointment scheduled for today!*`,
    `--------------------------------------`,
    `📌 *Ref ID:* ${booking.bookingRef}`,
    `👤 *Customer:* ${booking.customer.name} (${booking.customer.phone})`,
    `🛠️ *Service:* ${booking.service.name}`,
    `⏰ *Schedule:* Today, ${formattedDate} (${booking.preferredTimeSlot})`,
    `📍 *Address:* ${booking.serviceAddress}`,
    `👨‍🔧 *Assigned Technician:* ${techInfo}`,
    `--------------------------------------`,
    `Please ensure the technician arrives on schedule. Login to the admin dashboard for details.`,
  ].join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: vendorPhone,
    recipientType: 'VENDOR',
    templateName: 'vendor_today_appointment_alert',
    messageContent: message,
    templateParams: {
      name: 'vendor_today_appointment_alert',
      language: 'en',
      parameters: [
        booking.bookingRef,
        booking.customer.name,
        booking.customer.phone,
        booking.service.name,
        `Today, ${formattedDate} (${booking.preferredTimeSlot})`,
        booking.serviceAddress,
        techInfo,
      ],
    },
  });
}

export async function notifyCustomerTodayAppointment(booking: {
  id: number;
  bookingRef: string;
  customer: { name: string; phone: string };
  service: { name: string };
  preferredDate: Date;
  preferredTimeSlot: string;
  serviceAddress: string;
  technician?: { name: string; phone: string } | null;
}) {
  const formattedDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const settings = await prisma.businessSettings.findFirst();
  const helplinePhone =
    process.env.VENDOR_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_VENDOR_PHONE ||
    settings?.vendorPhone ||
    '+91 81414 34327';

  const techInfo = booking.technician
    ? `${booking.technician.name} (${booking.technician.phone})`
    : 'Our certified field technician';

  const message = [
    `Dear *${booking.customer.name}*, your service appointment is scheduled for today!`,
    `--------------------------------------`,
    `📌 *Booking Ref:* ${booking.bookingRef}`,
    `🛠️ *Service:* ${booking.service.name}`,
    `📅 *Date:* Today (${formattedDate})`,
    `⏰ *Time Slot:* ${booking.preferredTimeSlot}`,
    `📍 *Address:* ${booking.serviceAddress}`,
    `👨‍🔧 *Assigned Technician:* ${techInfo}`,
    `--------------------------------------`,
    `Our technician will arrive equipped with necessary equipment and will contact you prior to arrival.`,
    `Need to reschedule or make changes? Please call ${helplinePhone} for assistance.`,
  ].join('\n');

  return sendWhatsAppMessage({
    bookingId: booking.id,
    recipientPhone: booking.customer.phone,
    recipientType: 'CUSTOMER',
    templateName: 'vendor_customer_today_appointment_reminder',
    messageContent: message,
    templateParams: {
      name: 'vendor_customer_today_appointment_reminder',
      language: 'en',
      parameters: [
        booking.customer.name,
        booking.bookingRef,
        booking.service.name,
        `Today (${formattedDate})`,
        booking.preferredTimeSlot,
        booking.serviceAddress,
        techInfo,
        helplinePhone,
      ],
    },
  });
}

