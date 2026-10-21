import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, getLocalBusinessSchema, OG_IMAGE } from '@/lib/seo';
import { getFormattedVendorPhone, getWhatsAppVendorUrl, getTelVendorUrl } from '@/lib/config';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Areas: Ahmedabad & Gandhinagar',
  description:
    'Doorstep AC repair, split AC installation, and power-jet servicing across Ahmedabad & Gandhinagar. Serving Bodakdev, Satellite, Bopal, Prahlad Nagar, Vastrapur, SG Highway & more.',
  keywords: [
    'AC repair Ahmedabad areas',
    'AC service Bodakdev',
    'AC technician Satellite Ahmedabad',
    'Split AC installation Bopal',
    'AC servicing SG Highway',
    'AC repair Prahlad Nagar',
    'AC fitting Gandhinagar',
    'AC service Vastrapur',
  ],
  alternates: {
    canonical: `${SITE_URL}/areas-served`,
  },
  openGraph: {
    title: 'AC Service Areas in Ahmedabad & Gandhinagar',
    description:
      'Fast 90-minute doorstep AC repair, jet cleaning, and installation across all major Ahmedabad & Gandhinagar localities.',
    url: `${SITE_URL}/areas-served`,
    type: 'website',
    images: [OG_IMAGE],
  },
};

interface AreaInfo {
  name: string;
  zone: 'West Ahmedabad' | 'Central & North Ahmedabad' | 'South & East Ahmedabad' | 'Gandhinagar & Outskirts';
  pincodes: string;
  responseTime: string;
  popularServices: string[];
  description: string;
}

const LOCALITIES: AreaInfo[] = [
  {
    name: 'Bodakdev & Judges Bungalow Road',
    zone: 'West Ahmedabad',
    pincodes: '380054',
    responseTime: '45 - 60 mins',
    popularServices: ['Jet Servicing', 'Inverter Split AC Installation', 'Concealed Piping'],
    description:
      'Home to our central dispatch hub. High-priority rapid doorstep repair for residential societies, villas, and commercial offices.',
  },
  {
    name: 'Satellite & Jodhpur',
    zone: 'West Ahmedabad',
    pincodes: '380015',
    responseTime: '60 mins',
    popularServices: ['Power Jet Service', 'Gas Refilling (R32/R410A)', 'Drain Leak Fix'],
    description:
      'Comprehensive cooling maintenance and capacitor/PCB troubleshooting for high-rise residential towers and apartments.',
  },
  {
    name: 'SG Highway & Thaltej',
    zone: 'West Ahmedabad',
    pincodes: '380059',
    responseTime: '45 - 60 mins',
    popularServices: ['Commercial HVAC', 'Split AC Fitting', 'Annual Maintenance'],
    description:
      'Serving corporate complexes, retail showrooms, co-working spaces, and premier residential gated communities along the highway corridor.',
  },
  {
    name: 'Prahlad Nagar & Anand Nagar',
    zone: 'West Ahmedabad',
    pincodes: '380015',
    responseTime: '60 mins',
    popularServices: ['Deep Jet Cleaning', 'PCB Relay Repair', 'Noise Diagnostics'],
    description:
      'Fast-response certified technicians providing clean, spill-free jet wash and precision temperature calibration.',
  },
  {
    name: 'Bopal & South Bopal (SoBo)',
    zone: 'West Ahmedabad',
    pincodes: '380058',
    responseTime: '60 - 90 mins',
    popularServices: ['New AC Installation', 'Wall Chasing & Copper Piping', 'Filter Jet Clean'],
    description:
      'Dedicated mobile technician van covering fast-growing residential developments, townships, and bunglows in South Bopal and Shela.',
  },
  {
    name: 'Vastrapur & IIM Road',
    zone: 'West Ahmedabad',
    pincodes: '380015',
    responseTime: '60 mins',
    popularServices: ['Inverter Compressor Repair', 'Coil Leak Brazing', 'Routine Service'],
    description:
      'Serving faculty quarters, educational institutes, residential flats, and surrounding commercial shops around Vastrapur Lake.',
  },
  {
    name: 'Navrangpura & CG Road',
    zone: 'Central & North Ahmedabad',
    pincodes: '380009',
    responseTime: '60 mins',
    popularServices: ['Window AC Fitting', 'Split AC Uninstallation', 'Emergency Repair'],
    description:
      'Heart of commercial Ahmedabad. Rapid response for corporate offices, diagnostic clinics, boutique stores, and classic residential estates.',
  },
  {
    name: 'Naranpura & Usmanpura',
    zone: 'Central & North Ahmedabad',
    pincodes: '380013',
    responseTime: '60 - 75 mins',
    popularServices: ['Deep Jet Wash', 'Starting Capacitor Replacement', 'Drain Sludge Clean'],
    description:
      'Reliable, transparent AC repair and maintenance with genuine spare parts for traditional residential blocks and complexes.',
  },
  {
    name: 'Gota & Chandkheda',
    zone: 'Central & North Ahmedabad',
    pincodes: '382481, 382424',
    responseTime: '60 - 90 mins',
    popularServices: ['Split AC Installation', 'Nitrogen Leak Test', 'Seasonal Maintenance'],
    description:
      'Covering the bustling North Ahmedabad corridor with full diagnostic gear, genuine refrigerant tanks, and bracket mounts.',
  },
  {
    name: 'Science City & Sola',
    zone: 'West Ahmedabad',
    pincodes: '380060',
    responseTime: '60 mins',
    popularServices: ['Concealed Piping', 'Heavy-Duty Bracket Fitting', 'Jet Wash'],
    description:
      'Comprehensive HVAC solutions for modern apartments, penthouses, and healthcare institutions along Science City Road.',
  },
  {
    name: 'Paldi, Ellisbridge & Ambawadi',
    zone: 'Central & North Ahmedabad',
    pincodes: '380006',
    responseTime: '60 - 75 mins',
    popularServices: ['AC Maintenance', 'Fan Motor Replacement', 'Jet Cleaning'],
    description:
      'Trusted cooling care for established residential localities, hospitals, and independent bungalows.',
  },
  {
    name: 'Maninagar & Kankaria',
    zone: 'South & East Ahmedabad',
    pincodes: '380008',
    responseTime: '75 - 90 mins',
    popularServices: ['Emergency AC Repair', 'Window to Split Conversion', 'Gas Recharge'],
    description:
      'Experienced doorstep technicians serving South Ahmedabad with guaranteed 30-day post-repair assurance.',
  },
  {
    name: 'Shela & Ghuma',
    zone: 'West Ahmedabad',
    pincodes: '380058',
    responseTime: '60 - 90 mins',
    popularServices: ['Full Home AC Fitting', 'Pre-Construction Piping', 'Deep Servicing'],
    description:
      'Serving premium high-rise projects and villa communities with architectural-grade copper piping and installation.',
  },
  {
    name: 'Gandhinagar (Sectors 1-30)',
    zone: 'Gandhinagar & Outskirts',
    pincodes: '382010',
    responseTime: '90 mins',
    popularServices: ['Institutional Servicing', 'Split Installation', 'Preventative Care'],
    description:
      'Regular maintenance visits for government quarters, residential sectors, private villas, and educational campuses.',
  },
  {
    name: 'Infocity & GIFT City Corridor',
    zone: 'Gandhinagar & Outskirts',
    pincodes: '382009, 382355',
    responseTime: '90 mins',
    popularServices: ['Server Room AC Care', 'Commercial Split Systems', 'AMC Contracts'],
    description:
      'Specialized cooling solutions for tech offices, financial entities, data clusters, and residential towers in GIFT City.',
  },
];

export default function AreasServedPage() {
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
            <Breadcrumb items={[{ label: 'Service Areas' }]} />

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
                <MapPin size={14} /> Comprehensive Regional Coverage
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
                Doorstep AC Repair & Jet Servicing Across Ahmedabad & Gandhinagar
              </h1>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  maxWidth: '700px',
                }}
              >
                Strategically positioned mobile service vans equipped with hydro-jet jackets, virgin refrigerant cylinders,
                and digital diagnostic tools ready to reach your doorstep within 60 to 90 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem 2rem',
              border: '1px solid var(--color-slate-200)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--color-primary-ice)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', fontWeight: 800 }}>60-90 Mins</h4>
                <p style={{ color: 'var(--color-slate-500)', fontSize: '0.85rem' }}>Average Doorstep Response</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--color-primary-ice)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', fontWeight: 800 }}>16+ Localities</h4>
                <p style={{ color: 'var(--color-slate-500)', fontSize: '0.85rem' }}>Active Service Hubs</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--color-primary-ice)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', fontWeight: 800 }}>30-Day Guarantee</h4>
                <p style={{ color: 'var(--color-slate-500)', fontSize: '0.85rem' }}>Post-Repair Peace of Mind</p>
              </div>
            </div>
          </div>
        </section>

        {/* LOCALITIES GRID */}
        <section className="container" style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
            <span className="badge badge-ice" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={13} /> Active Zones
            </span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              Find Your Neighborhood
            </h2>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '1.05rem' }}>
              Select your area to see typical technician arrival times and available cooling services.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {LOCALITIES.map((loc, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  border: '1px solid var(--color-slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 200ms ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {loc.zone}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-navy)', marginTop: '2px' }}>
                      {loc.name}
                    </h3>
                  </div>

                  <span
                    style={{
                      background: 'var(--color-slate-100)',
                      color: 'var(--color-slate-700)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      flexShrink: 0,
                    }}
                  >
                    Pin: {loc.pincodes}
                  </span>
                </div>

                <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {loc.description}
                </p>

                <div
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--color-slate-50)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-slate-200)',
                    marginBottom: '1.25rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-slate-700)', marginBottom: '0.35rem' }}>
                    <Clock size={14} style={{ color: 'var(--color-primary)' }} />
                    <strong>Response Time:</strong> {loc.responseTime}
                  </div>
                  <div style={{ color: 'var(--color-slate-600)' }}>
                    <strong>Frequent Services:</strong> {loc.popularServices.join(', ')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Link
                    href={`/book?area=${encodeURIComponent(loc.name)}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, padding: '0.65rem 1rem' }}
                  >
                    <Calendar size={15} /> Book in {loc.name.split(' ')[0]}
                  </Link>

                  <a
                    href={getWhatsAppVendorUrl(`Hello Labh AC Services, I need service in ${loc.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    style={{ padding: '0.65rem 0.85rem' }}
                    aria-label={`WhatsApp inquiry for ${loc.name}`}
                  >
                    <MessageSquare size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="container" style={{ marginTop: '5rem' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, var(--color-navy) 0%, #0369a1 100%)',
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
            <div style={{ maxWidth: '640px' }}>
              <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem' }}>
                Don’t see your exact locality listed?
              </h3>
              <p style={{ color: '#bae6fd', fontSize: '1.05rem', lineHeight: 1.6 }}>
                We cover the entire Ahmedabad Urban Development Area (AUDA) and Gandhinagar.
                Reach out to our dispatch coordinator to confirm immediate technician availability.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={getTelVendorUrl()}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
              >
                <PhoneCall size={18} /> Call {getFormattedVendorPhone()}
              </a>
              <Link href="/book" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                Book Online Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
