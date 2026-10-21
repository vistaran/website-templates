import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, getLocalBusinessSchema } from '@/lib/seo';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  PhoneCall,
  MessageSquare,
  Wrench,
  Clock,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Labh Air Conditioning Services Ahmedabad',
  description:
    'Discover Ahmedabad’s leading HVAC air conditioning repair and installation specialists. Over 12,000+ ACs serviced with certified technicians, genuine OEM spares, and 30-day warranty.',
  keywords: [
    'About Labh AC Services',
    'AC technicians Ahmedabad',
    'certified HVAC engineer Ahmedabad',
    'AC repair company Gujarat',
    'trusted air conditioning service',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Labh Air Conditioning Services Ahmedabad',
    description:
      'Precision cooling care, certified HVAC technicians, and 30-day warranty across Ahmedabad & Gandhinagar.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
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
            <Breadcrumb items={[{ label: 'About Us' }]} />

            <div style={{ maxWidth: '800px', marginTop: '1rem' }}>
              <div
                className="badge badge-ice"
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#7dd3fc',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  marginBottom: '1rem',
                }}
              >
                <Award size={14} /> Gujarat’s Trusted HVAC Experts
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
                Delivering Arctic Fresh Comfort to Homes & Businesses Since 2018
              </h1>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  maxWidth: '700px',
                }}
              >
                At Labh Air Conditioning Services, we bridge the gap between amateur unorganized repairs
                and factory-grade HVAC engineering. Every service is delivered with surgical precision,
                transparent pricing, and zero compromise on safety.
              </p>
            </div>
          </div>
        </section>

        {/* STORY & MISSION */}
        <section className="container" style={{ marginTop: '4rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
                <Sparkles size={13} /> Our Mission
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
                Engineering Pure Airflow & Reliable Cooling
              </h2>
              <p
                style={{
                  color: 'var(--color-slate-700)',
                  fontSize: '1.025rem',
                  lineHeight: 1.75,
                  marginBottom: '1.25rem',
                }}
              >
                Founded in Ahmedabad, Labh Air Conditioning Services was built with a simple conviction:
                homeowners and businesses shouldn’t have to deal with messy water leaks on freshly painted walls,
                unnecessary gas top-up scams, or technicians who vanish when an issue recurs.
              </p>
              <p
                style={{
                  color: 'var(--color-slate-700)',
                  fontSize: '1.025rem',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                }}
              >
                We introduced specialized hydro-jet catchment jackets, calibrated digital vacuum pumps,
                and genuine copper flare connections across Ahmedabad. Today, over 12,000 households and commercial
                establishments rely on our team for prompt, honest cooling maintenance.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: '#ffffff',
                    border: '1px solid var(--color-slate-200)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.75rem', fontWeight: 800 }}>12,000+</h4>
                  <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>Air Conditioners Serviced</p>
                </div>

                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: '#ffffff',
                    border: '1px solid var(--color-slate-200)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.75rem', fontWeight: 800 }}>4.9 / 5</h4>
                  <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>Over 340+ Verified Reviews</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--color-slate-200)',
                  position: 'relative',
                  aspectRatio: '4/3',
                }}
              >
                <Image
                  src="/images/services/maintenance.jpg"
                  alt="Labh AC technician servicing cooling unit in Ahmedabad"
                  fill
                  sizes="(max-width: 900px) 100vw, 550px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE COMMITMENTS */}
        <section
          style={{
            marginTop: '5rem',
            padding: '5rem 0',
            background: '#ffffff',
            borderTop: '1px solid var(--color-slate-200)',
            borderBottom: '1px solid var(--color-slate-200)',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
              <span className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
                <ShieldCheck size={14} /> The Labh Standard
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                Why Our Engineering Quality Stands Apart
              </h2>
              <p style={{ color: 'var(--color-slate-600)', fontSize: '1.05rem' }}>
                We hold ourselves to rigorous technical benchmarks so you get genuine value and peace of mind.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
              }}
            >
              {[
                {
                  icon: Sparkles,
                  title: 'Spill-Free Hydro Jet Bags',
                  desc: 'Every indoor deep clean utilizes sealed waterproof catchment jackets with drainage pipes directly to buckets. Zero water drops touch your walls or furniture.',
                },
                {
                  icon: Wrench,
                  title: 'Nitrogen Pressure Testing',
                  desc: 'We never guess refrigerant leaks. All concealed pipes and repair joints are pressurized with nitrogen at 350+ PSI to certify leak-free operation.',
                },
                {
                  icon: ShieldCheck,
                  title: '30-Day Re-Service Warranty',
                  desc: 'Every repair is backed by a 30-day warranty. If the identical issue returns, our technician re-inspects and resolves it at no additional cost.',
                },
                {
                  icon: Users,
                  title: 'Background Verified Engineers',
                  desc: 'Our staff are vetted, certified HVAC professionals who wear official badges, boot covers, and adhere to courteous service protocols.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '2.25rem 2rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-slate-50)',
                    border: '1px solid var(--color-slate-200)',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: 'var(--color-primary-ice)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <item.icon size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-navy)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="container" style={{ marginTop: '5rem' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, #0284c7 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '3.5rem 3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div>
              <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem' }}>
                Experience the Labh Difference Today
              </h3>
              <p style={{ color: '#bae6fd', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Schedule a certified technician visit at your preferred date and time slot in Ahmedabad.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/book" className="btn btn-dark" style={{ padding: '0.85rem 1.75rem' }}>
                <Calendar size={18} /> Book Doorstep Service
              </Link>
              <a
                href={getWhatsAppVendorUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                <MessageSquare size={18} /> Chat with Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
