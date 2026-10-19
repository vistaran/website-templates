import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackerClient from './TrackerClient';

export const metadata = {
  title: 'Track AC Service Booking | Labh Air Conditioning Services',
  description: 'Check the real-time status, technician assignment, and arrival timeline for your AC service booking.',
};

export default function TrackPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: '4rem 0 6rem', background: '#f8fafc', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
              Real-time Service Tracker
            </span>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              Track Your Booking
            </h1>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '1.05rem' }}>
              Enter your booking reference number below to check the real-time status and assigned technician.
            </p>
          </div>

          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading tracker...</div>}>
            <TrackerClient />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
