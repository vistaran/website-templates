export type ConsultationMethod = 'in_person' | 'video_call' | 'phone_call' | 'flexible';

export interface Service {
  id: string;
  name: string;
  tagline: string;
  durationMinutes: number;
  price: number;
  isFree: boolean;
  description: string;
  deliverables: string[];
  recommendedFor: string;
  consultationMethod: ConsultationMethod;
  isActive: boolean;
  image: string;
  category: 'Consultation' | 'Full Service' | 'Specialty';
}

export interface AvailabilityRule {
  id: string;
  weekday: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  weekdayName: string;
  isOpen: boolean;
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "18:00"
  breakStart?: string; // e.g. "13:00"
  breakEnd?: string; // e.g. "14:00"
}

export interface BlockedDate {
  id: string;
  date: string; // "YYYY-MM-DD"
  reason: string;
}

export interface BusinessSettings {
  studioName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  cityStateZip: string;
  mapUrl: string;
  timezone: string;
  timezoneLabel: string;
  bufferMinutes: number;
  minNoticeHours: number;
  maxAdvanceDays: number;
  cancellationWindowHours: number;
  depositPercentage: number;
}

export type PropertyType = 'House' | 'Apartment' | 'Condo' | 'Townhouse' | 'Commercial' | 'Other';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'No-show';

export type PaymentStatus = 'Not Required' | 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface Appointment {
  id: string;
  bookingReference: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  
  // Customer details
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectLocation: string;
  propertyType: PropertyType;
  designAreas: string[];
  budgetRange: string;
  projectDescription: string;
  consultationMethod: ConsultationMethod;
  
  // Schedule
  date: string; // "YYYY-MM-DD"
  startTime: string; // "09:00"
  endTime: string; // "09:30"
  timezone: string;
  
  // Status & Governance
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  cancelReason?: string;
  managementToken: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  gallery: string[];
  description: string;
  scope: string;
  materials: string[];
  isFeatured: boolean;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  category: string;
  content: string[];
}
