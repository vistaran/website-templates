import React from "react";
import { Metadata } from "next";
import PrivacyComponent from "@/components/PrivacyComponent";

export const metadata: Metadata = {
  title: 'Privacy Policy | Rajdhani Group - Interior Design Services',
  description:
    'Read our Privacy Policy to understand how Rajdhani Group safeguards your personal information. We are committed to protecting your privacy and ensuring the security of your data. Learn about our practices and your rights regarding the information we collect.',
  keywords:
    ['Privacy Policy', 'Data Protection', 'Personal Information Security', 'Interior Design Company Privacy', 'Rajdhani Group Privacy Policy', 'Privacy Practices', 'Data Privacy Information', 'Security of Personal Data', 'Confidentiality and Data Protection', 'Interior Design Service Privacy'],
  openGraph: {
    title: 'Privacy Policy | Rajdhani Group - Interior Design Services',
    description:
      'Read our Privacy Policy to understand how Rajdhani Group safeguards your personal information. We are committed to protecting your privacy and ensuring the security of your data. Learn about our practices and your rights regarding the information we collect.',
    url: 'https://rajdhaniliving.com/privacy',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'Rajdhani Group - Privacy Policy',
      },
    ],
    type: 'website',
  }
};


const PrivacyPolicy: React.FC = () => {
  return <PrivacyComponent />;
};

export default PrivacyPolicy;

