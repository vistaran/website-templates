export interface ServiceItem {
  id: string;
  title: string;
  category: 'lawn' | 'hardscape' | 'sod' | 'tree' | 'seasonal';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  priceEstimate?: string;
  popular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  service: string;
  location: string;
  text: string;
  verified: boolean;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
  isOpenToday?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
