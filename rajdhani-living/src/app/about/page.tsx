import AboutContent from "@/components/AboutComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Rajdhani Group | Leading Interior Design Experts & Innovators',
  description: 'Discover the story behind Rajdhani Group, a premier interior design company dedicated to transforming spaces with creativity and expertise. Learn about our mission, values, and the team that brings innovative design solutions to life, making every project uniquely exceptional.',
  keywords: ['About Rajdhani Group', 'Interior Design Experts', 'Rajdhani Group Team', 'Company Mission and Values', 'Leading Interior Designers', 'Interior Design Innovators', 'Rajdhani Group Story', 'Premier Design Solutions', 'Transformative Interior Design', 'Meet Our Design Team'],
  openGraph: {
    title: 'About Rajdhani Group | Leading Interior Design Experts & Innovators',
    description: 'Discover the story behind Rajdhani Group, a premier interior design company dedicated to transforming spaces with creativity and expertise. Learn about our mission, values, and the team that brings innovative design solutions to life, making every project uniquely exceptional.',
    url: 'https://rajdhaniliving.com/about',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'About Us - Rajdhani Group',
      },
    ],
    type: 'website'
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
