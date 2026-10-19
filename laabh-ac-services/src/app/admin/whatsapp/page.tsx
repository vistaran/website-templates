import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import WhatsAppClient from './WhatsAppClient';

export default async function AdminWhatsAppPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const [logs, settings] = await Promise.all([
    prisma.notification.findMany({
      include: {
        booking: {
          select: {
            bookingRef: true,
            customer: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.businessSettings.findFirst(),
  ]);

  const isMockMode =
    settings?.mockModeEnabled ??
    (process.env.WHATSAPP_MOCK_MODE !== 'false' || !settings?.whatsappCloudApiToken);

  return (
    <WhatsAppClient
      initialLogs={JSON.parse(JSON.stringify(logs))}
      mockMode={isMockMode}
    />
  );
}
