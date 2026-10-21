import Link from 'next/link';
import { Snowflake, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="site-logo" style={{ color: '#fff', marginBottom: '1rem' }}>
              <div className="logo-badge">
                <Snowflake size={22} />
              </div>
              <div>
                <span>Labh</span>
                <span style={{ color: 'var(--color-primary-light)', marginLeft: '4px' }}>AC Services</span>
              </div>
            </div>
            <p style={{ color: 'var(--color-slate-400)', fontSize: '0.925rem', marginBottom: '1.5rem', maxWidth: '340px' }}>
              Ahmedabad’s premier cooling care specialists. Providing precision split AC installation,
              jet-pump servicing, concealed piping, and diagnostic repairs with certified technicians.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={getWhatsAppVendorUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageSquare size={16} /> WhatsApp Care
              </a>
              <a href={getTelVendorUrl()} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><Link href="/services" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>All Services Catalogue →</Link></li>
              <li><Link href="/services/split-ac-installation" style={{ color: 'var(--color-slate-400)' }}>Split AC Installation</Link></li>
              <li><Link href="/services/ac-service" style={{ color: 'var(--color-slate-400)' }}>AC Jet Servicing</Link></li>
              <li><Link href="/services/ac-repair" style={{ color: 'var(--color-slate-400)' }}>AC Repair & Diagnostics</Link></li>
              <li><Link href="/services/concealed-ac-piping" style={{ color: 'var(--color-slate-400)' }}>Concealed AC Piping</Link></li>
              <li><Link href="/services/ac-maintenance" style={{ color: 'var(--color-slate-400)' }}>Preventative Maintenance</Link></li>
              <li><Link href="/services/window-ac-installation" style={{ color: 'var(--color-slate-400)' }}>Window AC Installation</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Company & Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><Link href="/about" style={{ color: 'var(--color-slate-400)' }}>About Us</Link></li>
              <li><Link href="/areas-served" style={{ color: 'var(--color-slate-400)' }}>Service Areas (Ahmedabad)</Link></li>
              <li><Link href="/faq" style={{ color: 'var(--color-slate-400)' }}>Frequently Asked Questions</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--color-slate-400)' }}>Contact & Location</Link></li>
              <li><Link href="/book" style={{ color: 'var(--color-slate-400)' }}>Book an Appointment</Link></li>
              <li><Link href="/track" style={{ color: 'var(--color-slate-400)' }}>Track Your Booking</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Contact Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--color-slate-400)' }}>
              <li style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0, marginTop: '2px' }} />
                <span>Shop No. 12, Commercial Complex, Bodakdev, SG Highway, Ahmedabad, Gujarat 380054</span>
              </li>
              <li style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />
                <span>{getFormattedVendorPhone()}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />
                <span>contact@laabhservices.com</span>
              </li>
              <li style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />
                <span>Mon – Sun: 8:00 AM – 8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-slate-500)' }}>
          <p>© {new Date().getFullYear()} Labh Air Conditioning Services. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" style={{ color: 'var(--color-slate-400)' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'var(--color-slate-400)' }}>Terms of Service</Link>
            {/* <Link href="/sitemap.xml" style={{ color: 'var(--color-slate-400)' }}>Sitemap</Link> */}
          </div>
        </div>
      </div>

    </footer>
  );
}
