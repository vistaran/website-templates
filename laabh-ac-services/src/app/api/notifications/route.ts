import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const recipient = searchParams.get('recipient');

    const whereClause: Record<string, unknown> = {};
    if (status) whereClause.status = status;
    if (recipient) whereClause.recipientPhone = { contains: recipient };

    const notifications = await prisma.notification.findMany({
      where: whereClause,
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
    });

    return NextResponse.json({ notifications });
  } catch (error: unknown) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipientPhone, message } = await req.json();

    if (!recipientPhone || !message) {
      return NextResponse.json(
        { error: 'Phone number and message content are required' },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppMessage({
      recipientPhone,
      recipientType: 'VENDOR',
      templateName: 'ADMIN_MANUAL_TEST',
      messageContent: message,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error('Error sending test notification:', error);
    return NextResponse.json({ error: 'Failed to send test message' }, { status: 500 });
  }
}
