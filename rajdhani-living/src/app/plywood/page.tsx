import React from 'react';
import { Metadata } from 'next';
import PlywoodComponent from '@/components/PlywoodComponent';

export const metadata: Metadata = {
  title: 'Plywood | Rajdhani Group',
  description:
    'Explore our Interior Design Showcase to see a curated collection of our most stunning projects. From chic modern spaces to elegant classic designs, find inspiration for your next home makeover. Browse our portfolio to see how we bring creative visions to life!',
  keywords:
    ['Interior Design Showcase', 'Design Portfolio', 'Home Décor Inspiration', 'Modern Interior Design Projects', 'Classic Interior Designs', 'Interior Design Ideas', 'Home Makeover Examples', 'Designer Project Gallery', 'Stylish Home Interiors', 'Innovative Design Solutions'],
  openGraph: {
    title: 'Interior Design Plywood | Rajdhani Group',
    description:
      'Explore our Interior Design Showcase to see a curated collection of our most stunning projects. From chic modern spaces to elegant classic designs, find inspiration for your next home makeover. Browse our portfolio to see how we bring creative visions to life!',
    url: 'https://rajdhaniliving.com/plywood',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'Interior Design Plywood - Inspiring Projects & Design Ideas',
      },
    ],
    type: 'website',
  }
};


export default function Projects() {

  return <PlywoodComponent />;
}
