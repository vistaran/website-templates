import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardClient from './DashboardClient';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  // Fetch KPI counts from MySQL via Prisma
  const [
    totalBookings,
    pendingCount,
    confirmedCount,
    inProgressCount,
    completedCount,
    cancelledCount,
    settings,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.booking.count({ where: { status: 'CANCELLED' } }),
    prisma.businessSettings.findFirst(),
    prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        service: true,
        technician: true,
      },
    }),
  ]);

  // Today's appointment count
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayCount = await prisma.booking.count({
    where: {
      preferredDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const isMockMode =
    settings?.mockModeEnabled ??
    (process.env.WHATSAPP_MOCK_MODE !== 'false' || !settings?.whatsappCloudApiToken);

  const stats = {
    totalBookings,
    pendingCount,
    confirmedCount,
    inProgressCount,
    completedCount,
    cancelledCount,
    todayCount,
    mockMode: isMockMode,
    recentBookings: JSON.parse(JSON.stringify(recentBookings)),
  };

  return <DashboardClient initialStats={stats} />;
}
