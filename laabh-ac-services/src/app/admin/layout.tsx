import { getCurrentUser } from '@/lib/auth';
import AdminLayoutClient from './AdminLayoutClient';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Admin Control Center | Labh AC Services',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  const user = await getCurrentUser();

  // If unauthenticated and not already accessing login, let client component or page handle redirect
  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
