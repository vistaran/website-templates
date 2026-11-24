import React from 'react';
import KitchenComponent from '@/components/KitchenComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'R Kitchen | Rajdhani Group',
  description:
    'Explore R Kitchen by Rajdhani Group for modern and stylish kitchen designs. Contact us for personalized design solutions that blend functionality with elegance.',
  keywords:
    ['R Kitchen', 'Modern Kitchen Designs', 'Stylish Kitchen Solutions', 'Rajdhani Group Kitchen', 'Interior Design Kitchen', 'Kitchen Remodeling', 'Personalized Kitchen Designs', 'Functional Kitchen Layouts', 'Elegant Kitchen Interiors', 'Contact R Kitchen'],
  openGraph: {
    title: 'R Kitchen | Rajdhani Group',
    description:
      'Explore R Kitchen by Rajdhani Group for modern and stylish kitchen designs. Contact us for personalized design solutions that blend functionality with elegance.',
    url: 'https://rajdhaniliving.com/kitchen',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'R Kitchen - Modern and Stylish Kitchen Designs',
      },
    ],
    type: 'website',
  }
};


export default function Projects() {

  return <KitchenComponent />;
}
