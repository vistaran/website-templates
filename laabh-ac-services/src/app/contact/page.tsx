import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, getLocalBusinessSchema, OG_IMAGE } from '@/lib/seo';
import { getFormattedVendorPhone, getCleanVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Doorstep Booking',
  description:
    `Contact Labh Air Conditioning Services in Ahmedabad. Reach our central workshop at Bodakdev, SG Highway or call ${getFormattedVendorPhone()} for immediate AC repair & booking dispatch.`,
  keywords: [
    'Contact Labh AC Services',
    'AC repair contact number Ahmedabad',
    'AC service Bodakdev address',
    'AC technician phone number Ahmedabad',
    'air conditioner helpline Gujarat',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Labh AC Services | Ahmedabad Helpline',
    description:
      `Doorstep AC service dispatch across Ahmedabad & Gandhinagar. Call ${getFormattedVendorPhone()} or chat on WhatsApp.`,
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Labh Air Conditioning Services',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'HVACBusiness',
      name: 'Labh Air Conditioning Services',
      telephone: `+${getCleanVendorPhone()}`,
      email: 'contact@laabhservices.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop No. 12, Commercial Complex, Bodakdev, SG Highway',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380054',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <StructuredData data={[getLocalBusinessSchema(), contactSchema]} />
      <Navbar />

      <main style={{ paddingBottom: '5rem', background: '#f8fafc' }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            padding: '3.5rem 0 4.5rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              right: '-5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container">
            <Breadcrumb items={[{ label: 'Contact Us' }]} />

            <div style={{ maxWidth: '780px', marginTop: '1rem' }}>
              <div
                className="badge badge-ice"
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#7dd3fc',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  marginBottom: '1rem',
                }}
              >
                <Sparkles size={14} /> Immediate Assistance & Dispatch
              </div>

              <h1
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                Connect With Our Ahmedabad AC Care Team
              </h1>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  maxWidth: '680px',
                }}
              >
                Whether you need immediate emergency repair, a power-jet deep service slot,
                or a quotation for concealed architectural piping, our dispatch coordinators are ready.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT GRID */}
        <section className="container" style={{ marginTop: '4rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'flex-start',
            }}
          >
            {/* CONTACT CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: '1px solid var(--color-slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'var(--color-primary-ice)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.4rem' }}>
                      Central Hub & Workshop
                    </h3>
                    <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Shop No. 12, Commercial Complex, Bodakdev, SG Highway,<br />
                      Ahmedabad, Gujarat 380054
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                      }}
                    >
                      Technicians dispatched from Bodakdev, Bopal & Satellite
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: '1px solid var(--color-slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(37, 211, 102, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#16a34a',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.4rem' }}>
                      Phone & WhatsApp Helpline
                    </h3>
                    <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', marginBottom: '1rem' }}>
                      Direct technical support, pricing inquiries, and immediate booking:
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <a href={getTelVendorUrl()} className="btn btn-secondary btn-sm">
                        <Phone size={15} /> Call: {getFormattedVendorPhone()}
                      </a>
                      <a
                        href={getWhatsAppVendorUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                      >
                        <MessageSquare size={15} /> WhatsApp Dispatch
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: '1px solid var(--color-slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'var(--color-primary-ice)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.4rem' }}>
                      Operating Hours
                    </h3>
                    <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      <strong>Monday – Sunday:</strong> 8:00 AM – 8:30 PM<br />
                      <span style={{ color: 'var(--color-slate-500)', fontSize: '0.85rem' }}>
                        Emergency breakdown calls accepted 7 days a week including public holidays.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK BOOKING & INQUIRY CARD */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--color-slate-200)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge badge-ice" style={{ marginBottom: '0.5rem' }}>
                  <ShieldCheck size={13} /> Rapid Response
                </span>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                  Book a Technician Online
                </h2>
                <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  Choose your AC service, select your preferred date & time slot, and get real-time tracking
                  with WhatsApp updates.
                </p>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--color-slate-50)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-slate-200)',
                  marginBottom: '1.75rem',
                }}
              >
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--color-slate-700)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-primary)" />
                    <span>No pre-payment required (Pay after service)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-primary)" />
                    <span>Certified technicians equipped with hydro-jet jackets</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-primary)" />
                    <span>30-Day post-service guarantee on repairs</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <Link
                  href="/book"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem 1.25rem', fontSize: '1rem' }}
                >
                  <Calendar size={18} /> Schedule Doorstep Visit
                </Link>

                <a
                  href={getWhatsAppVendorUrl('Hello Labh AC Services, I want to book an appointment.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '0.85rem 1.25rem' }}
                >
                  <MessageSquare size={18} /> Instant Booking on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
