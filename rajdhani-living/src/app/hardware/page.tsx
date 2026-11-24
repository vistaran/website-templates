import React from 'react';
import HardwareComponent from '@/components/HardwareComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hardware | Rajdhani Group',
  description:
    'Explore Rajdhani Hardware for top-quality interior design products and services. Contact us for personalized design solutions tailored to your needs.',
  keywords:
    ['Rajdhani Hardware', 'Interior Design Products', 'Premium Hardware Solutions', 'Contact Rajdhani Hardware', 'Interior Design Experts', 'Home Decor Hardware', 'High-Quality Hardware', 'Customized Design Solutions', 'Rajdhani Group Hardware'],
  openGraph: {
    title: 'Hardware | Rajdhani Group',
    description:
      'Explore Rajdhani Hardware for top-quality interior design products and services. Contact us for personalized design solutions tailored to your needs.',
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

export default function Projects() {
  return <HardwareComponent />;
}
