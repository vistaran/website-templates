import React from 'react'
import { Metadata } from 'next';
import TimberComponent from '@/components/TimberComponent';

export const metadata: Metadata = {
  title: 'Timber | Rajdhani Group',
  description:
    'Discover the finest Timber collection with Rajdhani Group. Explore our wide range of premium timber options for construction and interior needs. Find sustainable and high-quality wood solutions tailored to your projects.',
  keywords: [
    'Premium Timber Collection', 'Construction Timber', 'Interior Timber Solutions', 
    'Sustainable Wood Options', 'High-Quality Timber', 'Timber for Furniture', 
    'Timber for Flooring', 'Architectural Wood Solutions', 'Rajdhani Timber Gallery', 
    'Custom Timber Projects'
  ],
  openGraph: {
    title: 'Premium Timber Collection | Rajdhani Group',
    description:
      'Discover the finest Timber collection with Rajdhani Group. Explore our wide range of premium timber options for construction and interior needs. Find sustainable and high-quality wood solutions tailored to your projects.',
    url: 'https://rajdhaniliving.com/timber',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'Premium Timber Collection - Sustainable & High-Quality Wood Solutions',
      },
    ],
    type: 'website',
  },
};


export default function Projects() {

  return <TimberComponent />;
}
