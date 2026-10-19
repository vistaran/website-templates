import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';

    const services = await prisma.service.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ services });
  } catch (error: unknown) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, startingPrice, estimatedDuration, isActive, shortDescription, fullDescription } = body;

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        startingPrice: startingPrice !== undefined ? (startingPrice === null || startingPrice === '' ? null : Number(startingPrice)) : undefined,
        estimatedDuration: estimatedDuration !== undefined ? estimatedDuration : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
        shortDescription: shortDescription !== undefined ? shortDescription : undefined,
        fullDescription: fullDescription !== undefined ? fullDescription : undefined,
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: unknown) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
