import type { Metadata } from 'next';
import './globals.css';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, getLocalBusinessSchema, getWebSiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Labh Air Conditioning Services | Expert AC Repair, Installation & Servicing Ahmedabad',
    template: '%s | Labh AC Services Ahmedabad',
  },
  description:
    'Ahmedabad’s #1 trusted AC repair, split AC installation, power-jet servicing, concealed piping, and preventative maintenance. 90-minute doorstep response with 30-day guarantee.',
  keywords: [
    'AC repair Ahmedabad',
    'Split AC installation Ahmedabad',
    'AC servicing near me',
    'Hydro jet AC cleaning Ahmedabad',
    'Concealed AC copper piping',
    'Inverter AC repair Bodakdev',
    'AC technician Satellite Ahmedabad',
    'AC gas refilling Ahmedabad',
    'Labh AC services',
    'HVAC contractor Gujarat',
  ],
  authors: [{ name: 'Labh Air Conditioning Services' }],
  creator: 'Labh Air Conditioning Services',
  publisher: 'Labh Air Conditioning Services',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Labh Air Conditioning Services | Professional AC Care in Ahmedabad',
    description:
      'Doorstep AC repair, power-jet cleaning, and split AC installation by certified HVAC technicians. 30-day warranty.',
    url: SITE_URL,
    siteName: 'Labh Air Conditioning Services',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Labh Air Conditioning Services Ahmedabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labh Air Conditioning Services Ahmedabad',
    description:
      'Doorstep AC repair, power-jet cleaning, and precision split installation with 30-day warranty.',
    images: ['/images/hero_banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <StructuredData data={[getLocalBusinessSchema(), getWebSiteSchema()]} />
      </head>
      <body>{children}</body>
    </html>
  );
}

