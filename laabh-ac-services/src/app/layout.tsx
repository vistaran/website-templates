import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Labh Air Conditioning Services | Expert AC Repair, Installation & Servicing',
  description:
    'Ahmedabad’s trusted AC repair, split AC installation, power-jet servicing, concealed piping, and preventative maintenance. Book certified HVAC technicians online.',
  keywords: [
    'AC installation',
    'AC repair Ahmedabad',
    'Split AC installation',
    'AC servicing',
    'Concealed AC piping',
    'Window AC installation',
    'HVAC maintenance',
    'Labh AC services',
  ],
  authors: [{ name: 'Labh Air Conditioning Services' }],
  openGraph: {
    title: 'Labh Air Conditioning Services | Professional AC Care',
    description: 'Expert doorstep air conditioning repair, jet cleaning, and installation services.',
    type: 'website',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
