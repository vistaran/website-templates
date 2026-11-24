// components/ContactSection.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Rajdhani Group',
  description:
    'Get in touch with our expert interior designers at Rajdhani Group. Whether you have questions about our services, want to schedule a consultation, or need support with your project, we\'re here to help. Reach out to us today for personalized design solutions!',
  keywords:
    ['Contact Interior Designers', 'Interior Design Consultation', 'Reach Out to Designers', 'Interior Design Services Contact', 'Home Décor Inquiries', 'Schedule Design Appointment', 'Professional Design Support', 'Rajdhani Group Contact', 'Get in Touch with Designers', 'Interior Design Questions'],
  openGraph: {
    title: 'Contact Us | Rajdhani Group',
    description:
      'Get in touch with our expert interior designers at Rajdhani Group for personalized design solutions!',
    url: 'https://rajdhaniliving.com/contact',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'Contact Us - Rajdhani Group',
      },
    ],
    type: 'website',
  }
};
import ContactPageClient from '@/components/ContactPageClient';

export default function ContactPage() {
  return <ContactPageClient />;
}

