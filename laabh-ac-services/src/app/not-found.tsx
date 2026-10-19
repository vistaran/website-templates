import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Snowflake, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '3rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: '500px' }}>
          <div
            style={{
              background: 'var(--color-primary-ice)',
              color: 'var(--color-primary)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <Snowflake size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
            404 - Page Not Found
          </h1>
          <p style={{ color: 'var(--color-slate-600)', marginBottom: '2rem' }}>
            The requested AC service or page could not be located.
          </p>
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
