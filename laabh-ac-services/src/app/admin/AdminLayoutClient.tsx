'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Wrench,
  UserCheck,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Snowflake,
} from 'lucide-react';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render clean without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/services', label: 'Services Catalogue', icon: Wrench },
    { href: '/admin/technicians', label: 'Technicians', icon: UserCheck },
    { href: '/admin/whatsapp', label: 'WhatsApp Logs', icon: MessageSquare },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: '260px',
          background: 'var(--color-navy)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <div className="logo-badge" style={{ width: '34px', height: '34px' }}>
            <Snowflake size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 800 }}>Labh Admin</h2>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>AC Services Control</span>
          </div>
        </div>

        {/* Links */}
        <nav style={{ padding: '1.25rem 0.75rem', flexGrow: 1 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : '#94a3b8',
                      background: isActive ? 'rgba(2, 132, 199, 0.35)' : 'transparent',
                      borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} color={isActive ? '#38bdf8' : '#94a3b8'} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Links & Footer */}
        <div
          style={{
            padding: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#94a3b8',
              fontSize: '0.85rem',
            }}
          >
            <ExternalLink size={15} /> View Public Website
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#f87171',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.5rem 0',
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN AREA */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* TOP BAR */}
        <header
          style={{
            height: '68px',
            background: '#ffffff',
            borderBottom: '1px solid var(--color-slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)' }}>
              Operations Dashboard
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block' }}>
                {user?.name || 'Administrator'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                {user?.email || 'admin@laabhservices.com'}
              </span>
            </div>

            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--color-primary-ice)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              {(user?.name || 'A')[0]}
            </div>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <main style={{ padding: '2rem', flexGrow: 1, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
