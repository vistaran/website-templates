import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import CustomersClient from './CustomersClient';

export default async function AdminCustomersPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const customers = await prisma.customer.findMany({
    include: {
      _count: {
        select: { bookings: true },
      },
      addresses: {
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return <CustomersClient initialCustomers={JSON.parse(JSON.stringify(customers))} />;
}
