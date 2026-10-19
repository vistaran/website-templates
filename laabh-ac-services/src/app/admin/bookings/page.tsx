import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import BookingsClient from './BookingsClient';

export default async function AdminBookingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const [bookings, technicians] = await Promise.all([
    prisma.booking.findMany({
      include: {
        customer: true,
        service: true,
        technician: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    }),
    prisma.technician.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    <Suspense fallback={<div>Loading bookings...</div>}>
      <BookingsClient
        initialBookings={JSON.parse(JSON.stringify(bookings))}
        technicians={JSON.parse(JSON.stringify(technicians))}
      />
    </Suspense>
  );
}
