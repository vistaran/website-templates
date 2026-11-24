// pages/index.js
import type { Metadata } from 'next'
import CatalogueSectionV3 from "@/components/CatalogueSectionV3";
import CategorySwiper from "@/components/CategorySwiper";
import CompanySection from "@/components/CompanySection";
import HeroSection from "@/components/HeroSection";
import Committment from '@/components/Commitment';
// import Testimonials from '@/components/testimonials';

export const metadata: Metadata = {
  title: 'Top Interior Design Group in Gandhinagar | Rajdhani Group',
  description: 'We create stunning, personalized home decor solutions that reflect your unique taste. Transform your space with our expert design team today.',


openGraph: {
  title: 'Top Interior Design Group in Gandhinagar | Rajdhani Group',
  description:
    'We create stunning, personalized home decor solutions that reflect your unique taste. Transform your space with our expert design team today.',
  url: 'https://rajdhaniliving.com',
  images: [
    {
      url: 'https://rajdhaniliving.com/images/homepage.jpg',
      alt: 'Top Interior Design Group in Gandhinagar | Rajdhani Group',
    },
  ],
  type: 'website',
},
}
export default function Home() {
  return (
    <div>
      <div className='hero-bg'></div>
      <HeroSection />
      <CompanySection />
      {/* <AboutComponent /> */}
      <CatalogueSectionV3 />
      <CategorySwiper />
      <Committment />
      {/* <Testimonials /> */}
    </div>
  );
}
