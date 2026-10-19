import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import {
  notifyCustomerBookingConfirmed,
  notifyCustomerStatusChange,
  notifyCustomerRescheduled,
  scheduleBookingReminder,
} from '@/lib/whatsapp';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const bookingId = Number(resolvedParams.id);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: {
          include: {
            addresses: true,
          },
        },
        service: true,
        technician: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          include: {
            changedByUser: {
              select: { name: true, email: true },
            },
          },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        notifications: {
          orderBy: { createdAt: 'desc' },
        },
        reminders: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error: unknown) {
    console.error('Error fetching booking detail:', error);
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const bookingId = Number(resolvedParams.id);
    const body = await req.json();

    const {
      status,
      technicianId,
      preferredDate,
      preferredTimeSlot,
      reason,
      totalAmount,
    } = body;

    const existing = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: true,
        service: true,
        technician: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const isStatusChanged = status && status !== existing.status;
    const isRescheduled =
      (preferredDate && new Date(preferredDate).toISOString().split('T')[0] !== new Date(existing.preferredDate).toISOString().split('T')[0]) ||
      (preferredTimeSlot && preferredTimeSlot !== existing.preferredTimeSlot);
    const isTechnicianChanged =
      technicianId !== undefined && Number(technicianId) !== existing.technicianId;

    // Transaction to update booking and log history
    const updated = await prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: isStatusChanged ? status : undefined,
          technicianId: isTechnicianChanged
            ? technicianId
              ? Number(technicianId)
              : null
            : undefined,
          preferredDate: preferredDate ? new Date(preferredDate) : undefined,
          preferredTimeSlot: preferredTimeSlot || undefined,
          totalAmount: totalAmount !== undefined ? (totalAmount ? Number(totalAmount) : null) : undefined,
          cancellationReason: status === 'CANCELLED' && reason ? reason : undefined,
        },
        include: {
          customer: true,
          service: true,
          technician: true,
        },
      });

      // Record status change history
      if (isStatusChanged) {
        await tx.bookingStatusHistory.create({
          data: {
            bookingId,
            oldStatus: existing.status,
            newStatus: status,
            changedByUserId: user.userId,
            changedByName: user.name,
            reason: reason || `Status changed to ${status}`,
          },
        });
      } else if (isRescheduled) {
        await tx.bookingStatusHistory.create({
          data: {
            bookingId,
            oldStatus: existing.status,
            newStatus: existing.status,
            changedByUserId: user.userId,
            changedByName: user.name,
            reason: `Appointment rescheduled to ${new Date(preferredDate || existing.preferredDate).toLocaleDateString()} (${preferredTimeSlot || existing.preferredTimeSlot})`,
          },
        });
      } else if (isTechnicianChanged) {
        const newTech = technicianId
          ? await tx.technician.findUnique({ where: { id: Number(technicianId) } })
          : null;
        await tx.bookingStatusHistory.create({
          data: {
            bookingId,
            oldStatus: existing.status,
            newStatus: existing.status,
            changedByUserId: user.userId,
            changedByName: user.name,
            reason: newTech
              ? `Technician ${newTech.name} assigned`
              : 'Technician assignment cleared',
          },
        });
      }

      return updatedBooking;
    });

    // Trigger WhatsApp notifications based on changes
    try {
      if (isStatusChanged) {
        if (status === 'CONFIRMED') {
          await notifyCustomerBookingConfirmed({
            id: updated.id,
            bookingRef: updated.bookingRef,
            customer: { name: updated.customer.name, phone: updated.customer.phone },
            service: { name: updated.service.name },
            preferredDate: updated.preferredDate,
            preferredTimeSlot: updated.preferredTimeSlot,
            serviceAddress: updated.serviceAddress,
            technician: updated.technician,
          });
        } else {
          await notifyCustomerStatusChange(
            {
              id: updated.id,
              bookingRef: updated.bookingRef,
              customer: { name: updated.customer.name, phone: updated.customer.phone },
              service: { name: updated.service.name },
            },
            status,
            reason
          );
        }
      }

      if (isRescheduled) {
        await scheduleBookingReminder(updated.id, updated.preferredDate);
        await notifyCustomerRescheduled({
          id: updated.id,
          bookingRef: updated.bookingRef,
          customer: { name: updated.customer.name, phone: updated.customer.phone },
          service: { name: updated.service.name },
          preferredDate: updated.preferredDate,
          preferredTimeSlot: updated.preferredTimeSlot,
        });
      }
    } catch (notifyErr) {
      console.error('Non-critical notification error during booking update:', notifyErr);
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: unknown) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
