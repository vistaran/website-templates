'use client';

import Link from 'next/link';
import { Snowflake, Phone, MessageSquare, Calendar, ShieldCheck } from 'lucide-react';
import { getWhatsAppVendorUrl } from '@/lib/config';

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="container site-nav-inner">
        <Link href="/" className="site-logo">
          <div className="logo-badge">
            <Snowflake size={22} />
          </div>
          <div>
            <span>Labh</span>
            <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>AC Services</span>
          </div>
        </Link>

        <nav>
          <ul className="site-nav-links">
            <li>
              <Link href="/#services" className="site-nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#why-us" className="site-nav-link">
                Why Us
              </Link>
            </li>
            <li>
              <Link href="/track" className="site-nav-link">
                Track Booking
              </Link>
            </li>
            <li>
              <Link href="/admin" className="site-nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={16} /> Admin
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href={getWhatsAppVendorUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            style={{ display: 'inline-flex' }}
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </a>

          <Link href="/book" className="btn btn-primary btn-sm">
            <Calendar size={16} />
            <span>Book Service</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
