export interface ProjectSpec {
  materials: string[];
  duration: string;
  executionType: string;
  areaSqFt: number;
  location: string;
  year: number;
}

export interface ClientReview {
  client: string;
  location: string;
  quote: string;
  rating: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'retail' | 'civil-renovation';
  categoryLabel: string;
  subtitle: string;
  location: string;
  areaSqFt: number;
  year: number;
  featured: boolean;
  coverImage: string;
  additionalImages: string[];
  architecturalConcept: string;
  scopeOfWork: string[];
  specs: ProjectSpec;
  review?: ClientReview;
  comparison?: {
    renderTitle: string;
    renderImage: string;
    realityTitle: string;
    realityImage: string;
  };
}

export interface MaterialSwatch {
  id: string;
  name: string;
  category: 'Stone & Marble' | 'Wood & Veneers' | 'Metals' | 'Surfaces & Glass';
  origin: string;
  description: string;
  finishType: string;
  recommendedUse: string;
  colorHex: string;
  texturePattern: string;
}

export type ConsultationMode = 'studio-visit' | 'site-visit' | 'virtual-meet';

export interface ConsultationBooking {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  serviceType: string;
  propertyType: string;
  carpetAreaSqFt: number;
  budgetBracket: string;
  consultationMode: ConsultationMode;
  preferredDate: string;
  preferredTime: string;
  address: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface EstimationInputs {
  propertyType: '1bhk' | '2bhk' | '3bhk' | '4bhk' | 'penthouse-villa' | 'commercial-office' | 'retail-store';
  carpetAreaSqFt: number;
  tier: 'signature' | 'luxury' | 'bespoke';
  includeCivilMasonry: boolean;
  includeFalseCeiling: boolean;
  includeModularKitchen: boolean;
  includeCustomMillwork: boolean;
  includeElectricalLighting: boolean;
  includeSurfaceStucco: boolean;
  includeLooseFurniture: boolean;
  includeSmartAutomation: boolean;
}
