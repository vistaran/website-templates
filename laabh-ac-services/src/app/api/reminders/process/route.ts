import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import {
  notifyVendorTodayAppointment,
  notifyCustomerTodayAppointment,
} from '@/lib/whatsapp';

/**
 * Sending reminders fires real WhatsApp Cloud API messages (billable, and visible to
 * customers), so the trigger must never be anonymous. Allowed callers: an authenticated
 * admin session (the in-app buttons) or a scheduler presenting `Bearer <CRON_SECRET>`.
 */
async function isAuthorized(req: Request): Promise<boolean> {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth === `Bearer ${secret}`) return true;
  }
  const user = await getCurrentUser();
  return Boolean(user);
}

/**
 * Dispatches "Appointment Scheduled for Today" reminders to BOTH Vendor and Customer
 * Can be triggered via cron or manually from the Admin WhatsApp Dashboard.
 */
export async function POST(req: Request) {
  try {
    if (!(await isAuthorized(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();

    // 1. Identify start and end of today
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    // 2. Fetch all active bookings scheduled for today
    const todayBookings = await prisma.booking.findMany({
      where: {
        preferredDate: {
          gte: todayStart,
          lte: todayEnd,
        },
        status: { in: ['PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS'] },
      },
      include: {
        customer: true,
        service: true,
        technician: true,
      },
      orderBy: { preferredTimeSlot: 'asc' },
    });

    const results = [];

    // 3. Dispatch dual notification (Customer + Vendor) for each of today's bookings
    for (const booking of todayBookings) {
      console.log(`[TODAY REMINDER] Dispatching alerts for booking ${booking.bookingRef} to customer & vendor`);

      const [custResult, vendorResult] = await Promise.allSettled([
        notifyCustomerTodayAppointment(booking),
        notifyVendorTodayAppointment(booking),
      ]);

      const custSuccess = custResult.status === 'fulfilled' && custResult.value.success;
      const vendorSuccess = vendorResult.status === 'fulfilled' && vendorResult.value.success;

      // Update any pending reminder records for this booking
      await prisma.reminder.updateMany({
        where: {
          bookingId: booking.id,
          status: 'PENDING',
        },
        data: {
          status: custSuccess || vendorSuccess ? 'SENT' : 'FAILED',
          sentAt: new Date(),
        },
      });

      results.push({
        bookingRef: booking.bookingRef,
        customerName: booking.customer.name,
        customerPhone: booking.customer.phone,
        slot: booking.preferredTimeSlot,
        customerAlert: custSuccess ? 'SENT' : (custResult.status === 'fulfilled' ? custResult.value.error : 'FAILED'),
        vendorAlert: vendorSuccess ? 'SENT' : (vendorResult.status === 'fulfilled' ? vendorResult.value.error : 'FAILED'),
      });
    }

    // 4. Cancel obsolete reminders for cancelled/completed bookings
    await prisma.reminder.updateMany({
      where: {
        status: 'PENDING',
        booking: { status: { in: ['CANCELLED', 'COMPLETED'] } },
      },
      data: { status: 'CANCELLED' },
    });

    return NextResponse.json({
      success: true,
      todayBookingsCount: todayBookings.length,
      results,
    });
  } catch (error: unknown) {
    console.error('Error processing today appointment reminders:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process reminders' },
      { status: 500 }
    );
  }
}

// Allow GET for simple manual browser verification / cron trigger
export async function GET(req: Request) {
  return POST(req);
}
