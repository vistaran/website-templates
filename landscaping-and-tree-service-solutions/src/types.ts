export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  isSpecialty?: boolean;
  features: string[];
  startingPrice?: string;
  popularFor?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  serviceUsed: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'sod' | 'mulch' | 'cleanup' | 'landscape';
  description: string;
  beforeImg: string;
  afterImg: string;
  altText: string;
  locationTag: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  serviceType: string;
  propertySize: string;
  timeline: string;
  message: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
