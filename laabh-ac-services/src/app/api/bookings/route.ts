import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import {
  notifyVendorNewBooking,
  notifyCustomerBookingReceived,
  scheduleBookingReminder,
} from '@/lib/whatsapp';

function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `LABH-${code}`;
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const query = searchParams.get('q');
    const date = searchParams.get('date');

    const whereClause: Record<string, unknown> = {};

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    if (date) {
      const searchDate = new Date(date);
      whereClause.preferredDate = searchDate;
    }

    if (query) {
      whereClause.OR = [
        { bookingRef: { contains: query } },
        { customer: { name: { contains: query } } },
        { customer: { phone: { contains: query } } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        customer: true,
        service: true,
        technician: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ bookings });
  } catch (error: unknown) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      mobileNumber,
      email,
      serviceId,
      acType,
      unitCount,
      serviceAddress,
      landmark,
      pincode,
      preferredDate,
      preferredTimeSlot,
      problemDescription,
    } = body;

    // Validate required fields
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }
    if (!mobileNumber || !mobileNumber.trim()) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }
    if (!serviceId) {
      return NextResponse.json({ error: 'Please select a service' }, { status: 400 });
    }
    if (!serviceAddress || !serviceAddress.trim()) {
      return NextResponse.json({ error: 'Service address is required' }, { status: 400 });
    }
    if (!preferredDate) {
      return NextResponse.json({ error: 'Preferred appointment date is required' }, { status: 400 });
    }
    if (!preferredTimeSlot) {
      return NextResponse.json({ error: 'Preferred time slot is required' }, { status: 400 });
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id: Number(serviceId) },
    });

    if (!service) {
      return NextResponse.json({ error: 'Selected service does not exist' }, { status: 404 });
    }

    const bookingRef = generateBookingRef();
    const parsedDate = new Date(preferredDate);

    // Relational transaction
    const booking = await prisma.$transaction(async (tx) => {
      // 1. Find or create customer
      let customer = await tx.customer.findFirst({
        where: { phone: { contains: cleanPhone.slice(-10) } },
      });

      if (!customer) {
        customer = await tx.customer.create({
          data: {
            name: customerName.trim(),
            phone: cleanPhone,
            email: email ? email.trim().toLowerCase() : null,
          },
        });
      } else {
        // Update contact info if changed
        customer = await tx.customer.update({
          where: { id: customer.id },
          data: {
            name: customerName.trim(),
            email: email ? email.trim().toLowerCase() : customer.email,
          },
        });
      }

      // 2. Create customer address
      const address = await tx.customerAddress.create({
        data: {
          customerId: customer.id,
          addressLine: serviceAddress.trim(),
          landmark: landmark ? landmark.trim() : null,
          pincode: pincode ? pincode.trim() : null,
          city: 'Ahmedabad',
          isDefault: true,
        },
      });

      // 3. Create Booking with Pending status
      const newBooking = await tx.booking.create({
        data: {
          bookingRef,
          customerId: customer.id,
          customerAddressId: address.id,
          serviceId: service.id,
          acType: acType || 'Split AC',
          unitCount: Number(unitCount) || 1,
          serviceAddress: serviceAddress.trim() + (landmark ? `, Near ${landmark.trim()}` : ''),
          preferredDate: parsedDate,
          preferredTimeSlot,
          problemDescription: problemDescription ? problemDescription.trim() : null,
          status: 'PENDING',
        },
        include: {
          customer: true,
          service: true,
        },
      });

      // 4. Record Initial Status History
      await tx.bookingStatusHistory.create({
        data: {
          bookingId: newBooking.id,
          oldStatus: null,
          newStatus: 'PENDING',
          changedByName: 'Customer Web Portal',
          reason: 'Initial booking request submitted',
        },
      });

      return newBooking;
    });

    // Asynchronously trigger WhatsApp alerts (non-blocking)
    try {
      await Promise.allSettled([
        notifyVendorNewBooking({
          id: booking.id,
          bookingRef: booking.bookingRef,
          customer: { name: booking.customer.name, phone: booking.customer.phone },
          service: { name: booking.service.name },
          acType: booking.acType,
          unitCount: booking.unitCount,
          serviceAddress: booking.serviceAddress,
          preferredDate: booking.preferredDate,
          preferredTimeSlot: booking.preferredTimeSlot,
          problemDescription: booking.problemDescription,
        }),
        notifyCustomerBookingReceived({
          id: booking.id,
          bookingRef: booking.bookingRef,
          customer: { name: booking.customer.name, phone: booking.customer.phone },
          service: { name: booking.service.name },
          preferredDate: booking.preferredDate,
          preferredTimeSlot: booking.preferredTimeSlot,
        }),
        scheduleBookingReminder(booking.id, booking.preferredDate),
      ]);
    } catch (e) {
      console.error('Non-critical error sending booking notifications:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully!',
      bookingRef: booking.bookingRef,
      bookingId: booking.id,
    });
  } catch (error: unknown) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while placing the booking. Please try again.' },
      { status: 500 }
    );
  }
}
