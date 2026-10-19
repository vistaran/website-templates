import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';
import {
  Wrench,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  Star,
  Users,
  Award,
  Zap,
} from 'lucide-react';

export default async function HomePage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <>
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            padding: '5rem 0 6rem',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: '3.5rem',
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  className="badge badge-ice"
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#7dd3fc',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Sparkles size={14} /> Ahmedabad’s #1 AC Specialists
                </div>

                <h1
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginBottom: '1.25rem',
                  }}
                >
                  Breathe Arctic Fresh Air in Every Room
                </h1>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                    maxWidth: '540px',
                  }}
                >
                  Professional air conditioner repair, power-jet servicing, concealed piping, and
                  precision split AC installation. Certified technicians at your doorstep within 90 minutes.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                  <Link href="/book" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                    Book Service Now <ArrowRight size={18} />
                  </Link>

                  <a
                    href={getWhatsAppVendorUrl('Hello Labh AC Services, I would like to book an AC service.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ padding: '0.85rem 1.75rem' }}
                  >
                    <MessageSquare size={18} /> WhatsApp Booking
                  </a>
                </div>

                {/* Trust Stats */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div>
                    <h3 style={{ color: '#38bdf8', fontSize: '1.65rem', fontWeight: 800 }}>12,000+</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>ACs Serviced</p>
                  </div>
                  <div>
                    <h3 style={{ color: '#38bdf8', fontSize: '1.65rem', fontWeight: 800 }}>4.9 / 5</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Customer Rating</p>
                  </div>
                  <div>
                    <h3 style={{ color: '#38bdf8', fontSize: '1.65rem', fontWeight: 800 }}>90 Mins</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Doorstep Response</p>
                  </div>
                </div>
              </div>

              {/* Hero Image Showcase */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    position: 'relative',
                    aspectRatio: '16/10',
                  }}
                >
                  <Image
                    src="/images/hero_banner.jpg"
                    alt="Luxury living room cooling by Labh AC Services"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Floating Assurance Card */}
                <div
                  className="glass-dark"
                  style={{
                    position: 'absolute',
                    bottom: '-25px',
                    left: '20px',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <div
                    style={{
                      background: 'var(--color-primary)',
                      borderRadius: '50%',
                      width: '42px',
                      height: '42px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShieldCheck size={22} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>100% Genuine Spares</p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>30-Day Post-Service Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICIAL SERVICE CATALOGUE */}
        <section id="services" style={{ padding: '6rem 0', background: '#f8fafc' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem' }}>
              <div className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
                <Zap size={14} /> Official Service Catalogue
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-navy)' }}>
                Comprehensive Air Conditioning Solutions
              </h2>
              <p style={{ color: 'var(--color-slate-600)', fontSize: '1.05rem' }}>
                Explore our full suite of certified residential and commercial HVAC services. Book
                online with real-time technician scheduling and WhatsApp updates.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
                      sizes="(max-width: 768px) 100vw, 350px"
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
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-navy)' }}>
                      {service.name}
                    </h3>

                    <p
                      style={{
                        color: 'var(--color-slate-600)',
                        fontSize: '0.9rem',
                        lineHeight: 1.55,
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
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', textTransform: 'uppercase', display: 'block' }}>
                          Starting From
                        </span>
                        <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {service.startingPrice ? `₹${Number(service.startingPrice).toLocaleString('en-IN')}` : 'Fair Estimate'}
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
                        Details <ArrowRight size={14} />
                      </Link>
                    </div>

                    <Link
                      href={`/book?service=${service.slug}`}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.7rem 1rem', fontSize: '0.9rem' }}
                    >
                      Book This Service
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section
          id="why-us"
          style={{
            padding: '5.5rem 0',
            background: '#ffffff',
            borderTop: '1px solid var(--color-slate-200)',
            borderBottom: '1px solid var(--color-slate-200)',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
              <div className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
                <Award size={14} /> Quality Assurance
              </div>
              <h2 style={{ fontSize: '2.3rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                Why Gujarat Trusts Labh AC Services
              </h2>
              <p style={{ color: 'var(--color-slate-600)' }}>
                We uphold strict standards of technical integrity, transparent pricing, and courteous service.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
              }}
            >
              <div
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-slate-50)',
                  border: '1px solid var(--color-slate-200)',
                }}
              >
                <div
                  style={{
                    background: 'var(--color-primary-ice)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Certified HVAC Engineers</h3>
                <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>
                  Every technician undergoes background verification and comprehensive brand-specific technical training.
                </p>
              </div>

              <div
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-slate-50)',
                  border: '1px solid var(--color-slate-200)',
                }}
              >
                <div
                  style={{
                    background: 'var(--color-primary-ice)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Hydro-Jet Cleaning Tech</h3>
                <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>
                  We utilize specialized high-pressure wash bags preventing any wall spills, ensuring deep coil sterilization.
                </p>
              </div>

              <div
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-slate-50)',
                  border: '1px solid var(--color-slate-200)',
                }}
              >
                <div
                  style={{
                    background: 'var(--color-primary-ice)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <MessageSquare size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Real-time WhatsApp Updates</h3>
                <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>
                  Stay informed with instant booking receipts, technician contact cards, and scheduled appointment alerts.
                </p>
              </div>

              <div
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-slate-50)',
                  border: '1px solid var(--color-slate-200)',
                }}
              >
                <div
                  style={{
                    background: 'var(--color-primary-ice)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>30-Day Service Guarantee</h3>
                <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>
                  Our repairs are backed by genuine OEM spares and a 30-day post-service peace-of-mind warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '5.5rem 0', background: '#f8fafc' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                Hassle-Free 4-Step Booking Process
              </h2>
              <p style={{ color: 'var(--color-slate-600)' }}>
                From booking to icy cool airflow in a few simple steps.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                { step: '01', title: 'Select Service', desc: 'Choose your AC service and preferred appointment date & slot.' },
                { step: '02', title: 'Instant Booking Ref', desc: 'Receive booking reference and immediate WhatsApp confirmation.' },
                { step: '03', title: 'Doorstep Visit', desc: 'Certified technician arrives with diagnostic tools and equipment.' },
                { step: '04', title: 'Chilled Comfort', desc: 'Comprehensive testing and cooling verification before payment.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#fff',
                    padding: '2rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-slate-200)',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: 'var(--color-primary-ice)',
                      lineHeight: 1,
                      display: 'block',
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {item.step}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMERGENCY HOTLINE BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, #0369a1 100%)',
            color: '#fff',
            padding: '3.5rem 0',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.75rem', marginBottom: '0.4rem' }}>
                Need Immediate Emergency AC Repair?
              </h3>
              <p style={{ color: '#bae6fd', fontSize: '1rem' }}>
                Compressor tripped or water leaking inside? Our priority response team is on standby.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href={getTelVendorUrl()} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>
                <PhoneCall size={18} /> Call: {getFormattedVendorPhone()}
              </a>
              <Link href="/book" className="btn btn-dark" style={{ padding: '0.8rem 1.75rem' }}>
                Book Appointment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
