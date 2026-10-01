export interface BookedAppointment {
  id: string;
  service: string;
  date: string; // YYYY-MM-DD
  slot: string; // e.g. "Morning (8:00 AM – 11:00 AM)"
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  googleCalendarUrl: string;
}

const STORAGE_KEY = 'jp_lawn_appointments';

export function getStoredAppointments(): BookedAppointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load appointments from localStorage', e);
    return [];
  }
}

export function saveAppointmentLocally(appt: BookedAppointment): void {
  try {
    const current = getStoredAppointments();
    const updated = [appt, ...current.filter(a => a.id !== appt.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save appointment', e);
  }
}

export function removeAppointmentLocally(id: string): void {
  try {
    const current = getStoredAppointments();
    const updated = current.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to remove appointment', e);
  }
}

export function getSlotHours(slot: string): { startHour: number; endHour: number } {
  if (slot.includes('11:00 AM')) {
    return { startHour: 11, endHour: 14 };
  } else if (slot.includes('2:00 PM')) {
    return { startHour: 14, endHour: 17 };
  } else if (slot.includes('5:00 PM')) {
    return { startHour: 17, endHour: 19 };
  }
  return { startHour: 8, endHour: 11 };
}

export function generateGoogleCalendarUrl(appt: {
  title: string;
  service: string;
  date: string;
  slot: string;
  address: string;
  customerName: string;
  phone: string;
  notes?: string;
}): string {
  const { startHour, endHour } = getSlotHours(appt.slot);
  const [year, month, day] = appt.date.split('-').map(Number);
  
  const pad = (n: number) => (n < 10 ? '0' + n : String(n));
  const startIso = `${year}${pad(month)}${pad(day)}T${pad(startHour)}0000`;
  const endIso = `${year}${pad(month)}${pad(day)}T${pad(endHour)}0000`;

  const details = [
    `Appointment: On-Site Landscape & Lawn Estimate`,
    `Service Requested: ${appt.service}`,
    `Client Name: ${appt.customerName}`,
    `Client Phone: ${appt.phone}`,
    `Property Address: ${appt.address}`,
    appt.notes ? `Notes / Gate Info: ${appt.notes}` : '',
    ``,
    `Provider: JP Lawn and Landscaping`,
    `Phone: (704) 490-1161`,
    `Address: 1400 Birch St, Kannapolis, NC 28081`,
    `Website: https://maps.app.goo.gl/urRZWgvWDpGScGdB8`,
  ].filter(Boolean).join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: appt.title || `JP Lawn and Landscaping - Estimate Consultation`,
    dates: `${startIso}/${endIso}`,
    details: details,
    location: appt.address || '1400 Birch St, Kannapolis, NC 28081',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateOutlookCalendarUrl(appt: {
  title: string;
  service: string;
  date: string;
  slot: string;
  address: string;
}): string {
  const { startHour, endHour } = getSlotHours(appt.slot);
  const [year, month, day] = appt.date.split('-').map(Number);
  const pad = (n: number) => (n < 10 ? '0' + n : String(n));
  
  const startIso = `${year}-${pad(month)}-${pad(day)}T${pad(startHour)}:00:00`;
  const endIso = `${year}-${pad(month)}-${pad(day)}T${pad(endHour)}:00:00`;

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: appt.title || 'JP Lawn and Landscaping - Estimate Consultation',
    startdt: startIso,
    enddt: endIso,
    body: `On-site estimate for ${appt.service}. Call (704) 490-1161 for questions.`,
    location: appt.address,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadIcsCalendarFile(appt: {
  title: string;
  service: string;
  date: string;
  slot: string;
  address: string;
  customerName: string;
  phone: string;
  notes?: string;
}): void {
  const { startHour, endHour } = getSlotHours(appt.slot);
  const [year, month, day] = appt.date.split('-').map(Number);
  const pad = (n: number) => (n < 10 ? '0' + n : String(n));

  const startIso = `${year}${pad(month)}${pad(day)}T${pad(startHour)}0000`;
  const endIso = `${year}${pad(month)}${pad(day)}T${pad(endHour)}0000`;
  const nowIso = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const description = `On-Site Estimate by JP Lawn and Landscaping\\nService: ${appt.service}\\nClient: ${appt.customerName}\\nPhone: ${appt.phone}\\nLocation: ${appt.address}\\n${appt.notes ? `Notes: ${appt.notes}\\n` : ''}Questions? Call Joel at (704) 490-1161`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JP Lawn and Landscaping//Appointment Booking Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:jp-lawn-appt-${Date.now()}-${Math.floor(Math.random() * 1000)}@jplawnlandscaping.com`,
    `DTSTAMP:${nowIso}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:${appt.title || 'JP Lawn and Landscaping - Estimate Consultation'}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${appt.address.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: JP Lawn and Landscaping Estimate Visit in 2 Hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `JP_Lawn_Appointment_${appt.date}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
