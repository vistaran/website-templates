import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const bookingId = Number(resolvedParams.id);
    const { note } = await req.json();

    if (!note || !note.trim()) {
      return NextResponse.json({ error: 'Note text cannot be empty' }, { status: 400 });
    }

    const createdNote = await prisma.bookingNote.create({
      data: {
        bookingId,
        note: note.trim(),
        authorId: user.userId,
        authorName: user.name,
      },
    });

    return NextResponse.json({ success: true, note: createdNote });
  } catch (error: unknown) {
    console.error('Error adding booking note:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}
