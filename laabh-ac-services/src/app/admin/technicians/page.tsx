import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import TechniciansClient from './TechniciansClient';

export default async function AdminTechniciansPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const technicians = await prisma.technician.findMany({
    include: {
      _count: {
        select: {
          bookings: {
            where: {
              status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
            },
          },
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  return <TechniciansClient initialTechnicians={JSON.parse(JSON.stringify(technicians))} />;
}
