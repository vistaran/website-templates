import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import prisma from '@/lib/prisma';
import { SITE_URL, OG_IMAGE } from '@/lib/seo';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';
import {
  Sparkles,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'All AC Services & Repairs',
  description:
    'Comprehensive air conditioning services in Ahmedabad: split AC installation, hydro-jet power wash, concealed piping, capacitor/PCB repair, and gas refilling. Transparent pricing and 30-day guarantee.',
  keywords: [
    'AC services Ahmedabad',
    'Split AC installation',
    'AC jet cleaning',
    'Concealed copper piping',
    'Window AC service',
    'Inverter AC repair',
    'AC maintenance Ahmedabad',
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'AC Services & Rates | Labh Air Conditioning Services Ahmedabad',
    description:
      'Certified residential and commercial air conditioning installation, jet cleaning, and repair solutions across Ahmedabad.',
    url: `${SITE_URL}/services`,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default async function ServicesCataloguePage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  const catalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Air Conditioning Services Ahmedabad',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: `${SITE_URL}/services/${service.slug}`,
      description: service.shortDescription,
    })),
  };

  return (
    <>
      <StructuredData data={catalogSchema} />
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
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container">
            <Breadcrumb items={[{ label: 'Our Services' }]} />

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
                <Sparkles size={14} /> Certified HVAC Solutions
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
                Comprehensive Air Conditioning Services in Ahmedabad
              </h1>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  maxWidth: '680px',
                }}
              >
                From hydro-jet deep servicing to complex concealed copper piping and inverter split installations,
                we deliver precision cooling care backed by genuine spares and a 30-day post-service guarantee.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES CATALOGUE */}
        <section className="container" style={{ marginTop: '3.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '2rem',
            }}
          >
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-img-wrapper">
                  <Image
                    src={service.imageUrl || '/images/services/service.jpg'}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="service-card-img"
                  />
                  {service.estimatedDuration && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Clock size={12} /> {service.estimatedDuration}
                    </div>
                  )}
                </div>

                <div className="service-card-body">
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--color-navy)' }}>
                    {service.name}
                  </h3>

                  <p
                    style={{
                      color: 'var(--color-slate-600)',
                      fontSize: '0.925rem',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flexGrow: 1,
                    }}
                  >
                    {service.shortDescription}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-slate-100)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-slate-400)',
                          textTransform: 'uppercase',
                          display: 'block',
                        }}
                      >
                        Starting From
                      </span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                        {service.startingPrice
                          ? `₹${Number(service.startingPrice).toLocaleString('en-IN')}`
                          : 'Fair Estimate'}
                      </span>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-slate-600)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Link
                      href={`/book?service=${service.slug}`}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.925rem' }}
                    >
                      <Calendar size={15} /> Book Service
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST BANNER */}
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
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
                <ShieldCheck size={14} /> Guaranteed Satisfaction
              </span>
              <h3 style={{ fontSize: '1.85rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                Backed by 30-Day Service Guarantee & Verified Techs
              </h3>
              <p style={{ color: 'var(--color-slate-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                Every visit includes multi-point testing, refrigerant pressure verification, and digital receipt delivery.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/book" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Book Your Slot
              </Link>
              <a
                href={getWhatsAppVendorUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                <MessageSquare size={18} /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
