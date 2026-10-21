import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | Labh Air Conditioning Services',
  description:
    'Privacy policy and customer data handling practices for Labh Air Conditioning Services in Ahmedabad.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main style={{ paddingBottom: '5rem', background: '#f8fafc' }}>
        <section
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            padding: '3rem 0 4rem',
          }}
        >
          <div className="container">
            <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
            <h1 style={{ color: '#fff', fontSize: '2.5rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Privacy & Data Policy
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
              Last updated: October 2026 • Labh Air Conditioning Services
            </p>
          </div>
        </section>

        <section className="container" style={{ marginTop: '3.5rem' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2.5rem',
              border: '1px solid var(--color-slate-200)',
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: 1.8,
              color: 'var(--color-slate-700)',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              When you schedule an air conditioning service, request an estimate, or interact with our WhatsApp booking bot, we collect your name, phone number, doorstep service address, landmark, preferred appointment slot, and AC problem description. This information is collected solely to schedule and dispatch certified technicians to your address.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Your details are utilized to:
              <br />• Coordinate doorstep technician arrival and technician tracking.
              <br />• Send automated WhatsApp notifications, appointment receipts, and invoice summaries.
              <br />• Provide timely 24-hour service reminder alerts.
              <br />• Honor our 30-day post-service warranty records.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              3. We Do Not Sell or Rent Your Personal Data
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Labh Air Conditioning Services strictly protects customer privacy. We never sell, lease, or distribute your phone number or contact details to third-party telemarketers or external advertisers.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              4. WhatsApp Communications & Meta Cloud API
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Our booking confirmations and service updates are routed through official Meta WhatsApp Business Cloud APIs. You may request to cease non-transactional reminders at any time by replying &quot;STOP&quot; on WhatsApp.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              5. Contact Us
            </h2>
            <p>
              For data access, update, or deletion inquiries, reach us at:<br />
              <strong>Privacy Coordinator, Labh Air Conditioning Services</strong><br />
              Shop No. 12, Commercial Complex, Bodakdev, SG Highway, Ahmedabad, Gujarat 380054<br />
              Email: contact@laabhservices.com
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
