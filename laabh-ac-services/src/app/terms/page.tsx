import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL } from '@/lib/seo';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Labh Air Conditioning Services',
  description:
    'Terms of service, warranty guidelines, 30-day guarantee policies, and customer service conditions for Labh Air Conditioning Services in Ahmedabad.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
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
            <Breadcrumb items={[{ label: 'Terms of Service' }]} />
            <h1 style={{ color: '#fff', fontSize: '2.5rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Terms of Service & Warranty Conditions
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
              Last revised: October 2026 • Labh Air Conditioning Services
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
              1. Scope of Services
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Labh Air Conditioning Services (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides residential and commercial air conditioning installation, jet servicing, preventative maintenance, diagnostic repairs, and concealed copper piping across the Ahmedabad and Gandhinagar metropolitan regions.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              2. 30-Day Post-Service Guarantee
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Every repair and servicing job performed by our certified technicians is backed by our 30-day service warranty. If the exact component or repair problem reported re-occurs within 30 calendar days from the date of completion, our team will re-inspect and fix it without charging additional service or diagnosis fees. This guarantee does not apply if physical tampering, unauthorized third-party handling, or severe external electrical surges occur following our visit.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              3. Transparent Pricing & Diagnostic Estimates
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Our technicians assess your air conditioning system and present an upfront cost estimate prior to commencing repair or parts replacement. No work proceeds without explicit homeowner or authorized customer approval. Payment is due immediately upon satisfactory completion of services via Cash, UPI, Credit/Debit card, or Net Banking.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              4. Genuine OEM Spare Parts
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              We supply brand-compatible OEM spares including copper coils, motor capacitors, PCB components, expansion valves, and virgin refrigerants (R32, R410A, R22). Replaced components are presented to the client for verification.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              5. Appointment Rescheduling & Cancellations
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Customers may reschedule or cancel appointments at any time prior to technician dispatch without penalty. We request reasonable advance notice via our tracking portal or WhatsApp helpline so we can reallocate mobile units efficiently.
            </p>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              6. Contact Information
            </h2>
            <p>
              For any questions regarding our terms or warranty support, contact us at:<br />
              <strong>Labh Air Conditioning Services</strong><br />
              Shop No. 12, Commercial Complex, Bodakdev, SG Highway, Ahmedabad, Gujarat 380054<br />
              Email: contact@laabhservices.com • Phone: +91 87588 66744
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
