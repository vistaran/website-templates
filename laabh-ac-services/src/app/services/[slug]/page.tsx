import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import prisma from '@/lib/prisma';
import { SITE_URL, getServiceSchema, getFAQSchema } from '@/lib/seo';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  MessageSquare,
  ArrowLeft,
  HelpCircle,
  Sparkles,
  PhoneCall,
} from 'lucide-react';

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!service) {
    return { title: 'Service Not Found | Labh AC Services' };
  }

  const imageUrl = service.imageUrl || '/images/services/service.jpg';

  return {
    title: `${service.name} in Ahmedabad | Labh Air Conditioning Services`,
    description: service.shortDescription,
    keywords: [
      `${service.name} Ahmedabad`,
      `${service.name} cost`,
      `${service.name} near me`,
      'Labh AC services',
      'HVAC Ahmedabad',
    ],
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} in Ahmedabad | Labh AC Services`,
      description: service.shortDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: service.name,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!service) {
    notFound();
  }

  let featuresList: string[] = [];
  try {
    if (service.features) {
      featuresList = JSON.parse(service.features);
    }
  } catch (e) {
    featuresList = [service.shortDescription];
  }

  let faqsList: { q: string; a: string }[] = [];
  try {
    if (service.faqs) {
      faqsList = JSON.parse(service.faqs);
    }
  } catch (e) {
    faqsList = [];
  }

  return (
    <>
      <StructuredData
        data={[
          getServiceSchema(service),
          ...(faqsList.length > 0 ? [getFAQSchema(faqsList)] : []),
        ]}
      />
      <Navbar />

      <main style={{ paddingBottom: '5rem', background: '#f8fafc' }}>
        {/* BREADCRUMB & HEADER */}
        <section
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            padding: '3rem 0 4rem',
          }}
        >
          <div className="container">
            <Breadcrumb
              items={[
                { label: 'All Services', href: '/services' },
                { label: service.name },
              ]}
            />


            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span
                className="badge badge-ice"
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#7dd3fc',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              >
                <Sparkles size={13} /> Certified Service
              </span>
              {service.estimatedDuration && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                  }}
                >
                  <Clock size={14} /> Est. Duration: {service.estimatedDuration}
                </span>
              )}
            </div>

            <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.85rem)', marginBottom: '1rem' }}>
              {service.name}
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '720px', lineHeight: 1.6 }}>
              {service.shortDescription}
            </p>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="container" style={{ marginTop: '-2.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 360px',
              gap: '2.5rem',
              alignItems: 'flex-start',
            }}
          >
            {/* MAIN CONTENT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Service Hero Photo */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '380px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-slate-200)',
                }}
              >
                <Image
                  src={service.imageUrl || '/images/services/service.jpg'}
                  alt={service.name}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Service Detailed Overview */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: 'var(--color-navy)' }}>
                  Service Overview & Scope of Work
                </h2>
                <p
                  style={{
                    color: 'var(--color-slate-700)',
                    lineHeight: 1.75,
                    fontSize: '1.025rem',
                    marginBottom: '2rem',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {service.fullDescription || service.shortDescription}
                </p>

                {/* Features & Inclusions */}
                {featuresList.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-navy)' }}>
                      What’s Included in This Service
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1rem',
                      }}
                    >
                      {featuresList.map((feat, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            gap: '0.75rem',
                            padding: '1rem',
                            background: 'var(--color-slate-50)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-slate-200)',
                            alignItems: 'flex-start',
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span style={{ fontSize: '0.925rem', color: 'var(--color-slate-700)', lineHeight: 1.5 }}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* FAQs Section */}
              {faqsList.length > 0 && (
                <div
                  style={{
                    background: '#ffffff',
                    padding: '2.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-slate-200)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <HelpCircle size={22} style={{ color: 'var(--color-primary)' }} />
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-navy)' }}>
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {faqsList.map((faq, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '1.25rem',
                          background: 'var(--color-slate-50)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-slate-200)',
                        }}
                      >
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                          {faq.q}
                        </h4>
                        <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SIDEBAR CTA CARD */}
            <div
              style={{
                position: 'sticky',
                top: '90px',
                background: '#ffffff',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-slate-200)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-slate-100)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)', textTransform: 'uppercase', display: 'block' }}>
                  Starting Price
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)' }}>
                    {service.startingPrice ? `₹${Number(service.startingPrice).toLocaleString('en-IN')}` : 'Fair Estimate'}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)' }}>
                    {service.startingPrice ? '/ unit' : '(Consultation free)'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem', fontSize: '0.9rem', color: 'var(--color-slate-600)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Clock size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>Duration: {service.estimatedDuration || '60 - 90 mins'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ShieldCheck size={16} style={{ color: '#16a34a' }} />
                  <span>30-Day Post-Service Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>Genuine Spares & Leak Proof Testing</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  href={`/book?service=${service.slug}`}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '1rem' }}
                >
                  <Calendar size={18} /> Book This Service
                </Link>

                <a
                  href={getWhatsAppVendorUrl(`Hello Labh AC Services, I have an inquiry regarding ${service.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '0.8rem 1rem' }}
                >
                  <MessageSquare size={18} /> Chat on WhatsApp
                </a>

                <a
                  href={getTelVendorUrl()}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.75rem 1rem' }}
                >
                  <PhoneCall size={18} /> Call {getFormattedVendorPhone()}
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
