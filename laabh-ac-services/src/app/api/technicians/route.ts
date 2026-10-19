import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
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

    return NextResponse.json({ technicians });
  } catch (error: unknown) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json({ error: 'Failed to fetch technicians' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, email, skills } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const tech = await prisma.technician.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim().toLowerCase() : null,
        skills: skills ? skills.trim() : null,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ success: true, technician: tech });
  } catch (error: unknown) {
    console.error('Error creating technician:', error);
    return NextResponse.json({ error: 'Failed to create technician' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, phone, email, skills, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Technician ID required' }, { status: 400 });
    }

    const tech = await prisma.technician.update({
      where: { id: Number(id) },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        phone: phone !== undefined ? phone.trim() : undefined,
        email: email !== undefined ? (email ? email.trim().toLowerCase() : null) : undefined,
        skills: skills !== undefined ? skills.trim() : undefined,
        status: status !== undefined ? status : undefined,
      },
    });

    return NextResponse.json({ success: true, technician: tech });
  } catch (error: unknown) {
    console.error('Error updating technician:', error);
    return NextResponse.json({ error: 'Failed to update technician' }, { status: 500 });
  }
}
