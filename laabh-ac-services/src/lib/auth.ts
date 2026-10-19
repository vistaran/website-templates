import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'laabh_ac_services_super_secure_jwt_token_secret_key_2026_jwt';

export interface AuthSession {
  userId: number;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: AuthSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthSession;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get('laabh_admin_token')?.value;

  if (!token) {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  const session = verifyToken(token);
  if (!session) return null;

  // Verify user still exists in database
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) return null;

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
