export interface ServiceItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'installation' | 'care';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  startingPrice: string;
  popular?: boolean;
  frequency: string;
  iconName: string;
  badge?: string;
  image: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  location: string;
  serviceType: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  grassType: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  neighborhood: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  yearsAsClient?: string;
}

export interface ServiceAreaNeighborhood {
  name: string;
  zipCode: string;
  region: string;
  primaryServices: string;
}

export interface BusinessDetails {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  googleMapsUrl: string;
  yearsOfExperience: number;
  establishedYear: number;
  rating: number;
  reviewCount: number;
  hours: {
    days: string;
    time: string;
    isOpenToday: boolean;
  }[];
  billingOptions: string[];
}
