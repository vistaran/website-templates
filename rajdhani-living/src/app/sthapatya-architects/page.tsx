import React from 'react'
import { Metadata } from 'next';
import SthapatyaArchitectsComponent from '@/components/sthapatyaArchitectsComponent';

export const metadata: Metadata = {
    title: 'Sthapatya Architects | Rajdhani Group',
    description:
        'Explore the innovative and sustainable architectural solutions by Sthapatya Architects. Discover our portfolio of modern, eco-friendly designs for residential, commercial, and public projects.',
    keywords: [
        'Sthapatya Architects', 'Innovative Architecture', 'Sustainable Architecture', 
        'Modern Building Designs', 'Residential Architecture', 'Commercial Architecture', 
        'Eco-friendly Building Solutions', 'Architectural Firm', 'Sustainable Design Projects', 
        'Sthapatya Architects'
    ],
    openGraph: {
        title: 'Innovative & Sustainable Architecture | Sthapatya Architects',
        description:
            'Explore the innovative and sustainable architectural solutions by Sthapatya Architects. Discover our portfolio of modern, eco-friendly designs for residential, commercial, and public projects.',
        url: 'https://rajdhaniliving.com/sthapatya-architects',
        images: [
            {
                url: 'https://rajdhaniliving.com/images/homepage.jpg',
                alt: 'Sustainable & Innovative Architecture by Sthapatya Architects',
            },
        ],
        type: 'website',
    },
};



export default function Projects() {

    return <SthapatyaArchitectsComponent />
}
