import React from 'react';
import ShowcaseComponent from '@/components/ShowcaseComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showcase | Rajdhani Group - Interior Design Services',
  description:
    'Explore our Interior Design Showcase to see a curated collection of our most stunning projects. From chic modern spaces to elegant classic designs, find inspiration for your next home makeover. Browse our portfolio to see how we bring creative visions to life!',
  keywords:
    ['Privacy Policy', 'Data Protection', 'Personal Information Security', 'Interior Design Company Privacy', 'Rajdhani Group Privacy Policy', 'Privacy Practices', 'Data Privacy Information', 'Security of Personal Data', 'Confidentiality and Data Protection', 'Interior Design Service Privacy'],
  openGraph: {
    title: 'Showcase | Rajdhani Group - Interior Design Services',
    description:
      'Explore our Interior Design Showcase to see a curated collection of our most stunning projects. From chic modern spaces to elegant classic designs, find inspiration for your next home makeover. Browse our portfolio to see how we bring creative visions to life!',
    url: 'https://rajdhaniliving.com/showcase',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'Rajdhani Group - Showcase',
      },
    ],
    type: 'website',
  }
};

export default function Projects() {
  return <ShowcaseComponent />
}
