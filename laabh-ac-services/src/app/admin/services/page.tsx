import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import ServicesClient from './ServicesClient';

export default async function AdminServicesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <ServicesClient
      initialServices={JSON.parse(
        JSON.stringify(
          services.map((s) => ({
            ...s,
            startingPrice: s.startingPrice ? Number(s.startingPrice) : null,
          }))
        )
      )}
    />
  );
}
