import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import BookingFormClient from './BookingFormClient';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Book AC Service Online',
  description: 'Book instant doorstep AC service, repair, or installation in Ahmedabad with certified technicians.',
};

export default async function BookingPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    select: {
      id: true,
      slug: true,
      name: true,
      startingPrice: true,
      estimatedDuration: true,
    },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <>
      <Navbar />

      <main style={{ padding: '3.5rem 0 6rem', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              className="badge badge-ice"
              style={{ marginBottom: '0.75rem' }}
            >
              Doorstep Service Within 90 Mins
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              Book Your Air Conditioning Service
            </h1>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Fill out the form below. Our service team will instantly dispatch a booking reference and
              schedule our verified technician.
            </p>
          </div>

          {/* Quick Perks Strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              color: 'var(--color-slate-600)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} color="var(--color-primary)" /> Verified Technicians
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="var(--color-primary)" /> On-Time Arrival
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#16a34a" /> 30-Day Service Assurance
            </span>
          </div>

          <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem' }}>Loading booking form...</div>}>
            <BookingFormClient
              services={services.map((s) => ({
                id: s.id,
                slug: s.slug,
                name: s.name,
                startingPrice: s.startingPrice ? Number(s.startingPrice) : null,
                estimatedDuration: s.estimatedDuration,
              }))}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
