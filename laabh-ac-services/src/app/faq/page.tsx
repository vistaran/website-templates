import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import { ALL_FAQS } from '@/lib/faqData';
import { SITE_URL } from '@/lib/seo';
import { HelpCircle, Sparkles, MessageSquare, PhoneCall, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'AC Service & Repair FAQs Ahmedabad | Labh Air Conditioning Services',
  description:
    'Got questions about AC jet cleaning, split AC installation, gas refilling, cooling problems, or pricing in Ahmedabad? Find detailed answers from certified HVAC technicians.',
  keywords: [
    'AC repair FAQ',
    'AC service questions Ahmedabad',
    'AC gas refill price Ahmedabad',
    'split AC installation cost',
    'hydro jet ac servicing faq',
    'Labh AC services answers',
  ],
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: 'AC Service & Repair FAQs | Labh Air Conditioning Services Ahmedabad',
    description:
      'Clear, honest answers to all your air conditioner questions: jet wash, gas leakage, split installation, and pricing.',
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <>
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
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              right: '-5%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container">
            <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

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
                <HelpCircle size={14} /> Knowledge Hub & Common Inquiries
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
                Air Conditioning Questions, Answered by Master HVAC Engineers
              </h1>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  maxWidth: '680px',
                }}
              >
                Everything you need to know about hydro-jet cleaning, inverter AC installation,
                nitrogen pressure leak testing, refrigerant refills, and our 30-day warranty in Ahmedabad.
              </p>
            </div>
          </div>
        </section>

        {/* ACCORDION SECTION */}
        <section className="container" style={{ marginTop: '3.5rem' }}>
          <FAQAccordion
            items={ALL_FAQS}
            title="Browse Frequently Asked Questions"
            subtitle="Filter by category or search your exact symptom below."
            showCategories={true}
            showSearch={true}
            includeSchema={true}
          />
        </section>

        {/* QUICK ACTION BAR */}
        <section className="container" style={{ marginTop: '5rem' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem 2.5rem',
              border: '1px solid var(--color-slate-200)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
                <Sparkles size={13} /> Ready for Chilled Comfort?
              </span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                Book Your Doorstep AC Service in 60 Seconds
              </h3>
              <p style={{ color: 'var(--color-slate-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                Certified technicians arrive with waterproof jet jackets, digital manifolds, and genuine spares.
                90-minute response time across Ahmedabad.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <Link href="/book" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                <Calendar size={18} /> Book Appointment
              </Link>
              <a
                href={getWhatsAppVendorUrl('Hello Labh AC Services, I need assistance with my AC.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                <MessageSquare size={18} /> WhatsApp Hotline
              </a>
              <a
                href={getTelVendorUrl()}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.5rem' }}
              >
                <PhoneCall size={18} /> Call {getFormattedVendorPhone()}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
