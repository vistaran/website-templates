import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get('ref')?.trim().toUpperCase();
    const phone = searchParams.get('phone')?.trim();

    if (!ref) {
      return NextResponse.json({ error: 'Booking reference is required' }, { status: 400 });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        bookingRef: ref,
        customer: phone
          ? {
              phone: { contains: phone.slice(-10) },
            }
          : undefined,
      },
      include: {
        customer: {
          select: {
            name: true,
            phone: true,
          },
        },
        service: {
          select: {
            name: true,
            icon: true,
            slug: true,
          },
        },
        technician: {
          select: {
            name: true,
            phone: true,
          },
        },
        statusHistory: {
          orderBy: { createdAt: 'asc' },
          select: {
            oldStatus: true,
            newStatus: true,
            reason: true,
            createdAt: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found with the provided reference number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      booking: {
        bookingRef: booking.bookingRef,
        status: booking.status,
        customerName: booking.customer.name,
        serviceName: booking.service.name,
        serviceSlug: booking.service.slug,
        acType: booking.acType,
        unitCount: booking.unitCount,
        serviceAddress: booking.serviceAddress,
        preferredDate: booking.preferredDate,
        preferredTimeSlot: booking.preferredTimeSlot,
        technician: booking.technician,
        statusHistory: booking.statusHistory,
        createdAt: booking.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error('Error tracking booking:', error);
    return NextResponse.json({ error: 'Failed to retrieve booking information' }, { status: 500 });
  }
}
