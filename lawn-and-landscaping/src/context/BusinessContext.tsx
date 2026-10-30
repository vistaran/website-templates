import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { BusinessInfo, ServiceArea, ReviewItem, TransformationItem, FAQItem } from '../types';
import {
  DEFAULT_BUSINESS_INFO,
  getDynamicServiceAreas,
  getDynamicReviews,
  getDynamicTransformations,
  getDynamicFaqs
} from '../data/content';

interface BusinessContextType {
  businessInfo: BusinessInfo;
  serviceAreas: ServiceArea[];
  reviews: ReviewItem[];
  transformations: TransformationItem[];
  faqs: FAQItem[];
  updateBusinessInfo: (overrides: Partial<BusinessInfo>) => void;
  resetToDefaults: () => void;
  isCustomized: boolean;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const STORAGE_KEY = 'generic_landscaping_business_params';

// Helper to extract clean initials from a business name
function getInitials(name: string): string {
  const words = name
    .replace(/[^\w\s]/gi, '')
    .trim()
    .split(/\s+/)
    .filter(w => !['and', 'llc', 'inc', 'co', 'the', 'of', '&'].includes(w.toLowerCase()));

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return 'LC';
}

// Helper to format any input phone into standard (XXX) XXX-XXXX for customer-facing display
function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone.trim();
}

// Helper to sanitize phone number into click-to-call tel: raw format (+1XXXXXXXXXX)
function formatPhoneRaw(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  } else if (digits.length > 0) {
    return `+${digits}`;
  }
  return phone.trim();
}

// Case-insensitive & multi-alias query parameter getter
function getParam(params: URLSearchParams, ...keys: string[]): string | null {
  for (const key of keys) {
    const direct = params.get(key);
    if (direct !== null && direct.trim() !== '') return direct.trim();
  }
  // Case-insensitive fallback
  const allEntries = Array.from(params.entries());
  for (const key of keys) {
    const lowerKey = key.toLowerCase();
    const found = allEntries.find(([k, v]) => k.toLowerCase() === lowerKey && v.trim() !== '');
    if (found) return found[1].trim();
  }
  return null;
}

// Parse search params from URL
function parseQueryParams(): Partial<BusinessInfo> | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  const overrides: Partial<BusinessInfo> = {};
  let foundAny = false;

  // 1. BUSINESS NAME (?name=, ?n=, ?company=, ?business=)
  const name = getParam(searchParams, 'name', 'n', 'business', 'company', 'bname');
  if (name) {
    overrides.name = name;
    foundAny = true;
  }

  // 2. PHONE (?phone=, ?p=, ?tel=, ?call=, ?mobile=)
  const phone = getParam(searchParams, 'phone', 'p', 'tel', 'call', 'mobile');
  if (phone) {
    overrides.phone = formatPhoneDisplay(phone);
    overrides.phoneRaw = formatPhoneRaw(phone);
    foundAny = true;
  }

  // 3. CITY & STATE (?city=, ?c=, ?town=, ?location=, ?loc=)
  const rawCity = getParam(searchParams, 'city', 'c', 'town', 'location', 'loc');
  const rawState = getParam(searchParams, 'state', 's', 'st');

  if (rawCity) {
    // If the city was passed as "Austin, TX" or "Austin,TX", automatically split city and state
    if (rawCity.includes(',')) {
      const parts = rawCity.split(',');
      overrides.city = parts[0].trim();
      const extractedState = parts[1].trim().toUpperCase();
      if (extractedState && !rawState) {
        overrides.state = extractedState;
      }
    } else {
      overrides.city = rawCity;
    }
    foundAny = true;
  }

  if (rawState) {
    overrides.state = rawState.toUpperCase();
    foundAny = true;
  }

  // 4. OWNER / CONTACT PERSON (?owner=, ?o=, ?contact=, ?person=)
  const owner = getParam(searchParams, 'owner', 'o', 'contact', 'person', 'ownername');
  if (owner) {
    overrides.ownerName = owner;
    foundAny = true;
  }

  // 5. SECONDARY NEIGHBORING CITY (?secondary=, ?secondaryCity=, ?city2=, ?neighbor=, ?area=)
  const secondary = getParam(searchParams, 'secondary', 'secondarycity', 'city2', 'neighbor', 'area');
  if (secondary) {
    overrides.secondaryCity = secondary;
    foundAny = true;
  }

  // 6. STREET ADDRESS (?address=, ?a=, ?street=, ?addr=)
  const address = getParam(searchParams, 'address', 'a', 'street', 'addr');
  if (address) {
    overrides.address = address;
    foundAny = true;
  }

  // 7. ZIP CODE (?zip=, ?z=, ?postal=)
  const zip = getParam(searchParams, 'zip', 'z', 'postal');
  if (zip) {
    overrides.zip = zip;
    foundAny = true;
  }

  // 8. EMAIL (?email=, ?e=, ?mail=)
  const email = getParam(searchParams, 'email', 'e', 'mail');
  if (email) {
    overrides.email = email;
    foundAny = true;
  }

  // 9. YEARS IN BUSINESS (?years=, ?y=, ?exp=, ?experience=)
  const years = getParam(searchParams, 'years', 'y', 'exp', 'experience');
  if (years) {
    overrides.yearsInBusiness = years.includes('+') ? years : `${years}+`;
    foundAny = true;
  }

  // 10. RATING (?rating=, ?r=, ?stars=)
  const rating = getParam(searchParams, 'rating', 'r', 'stars');
  if (rating) {
    const num = parseFloat(rating);
    if (!isNaN(num)) {
      overrides.rating = Math.min(5, Math.max(1, num));
      foundAny = true;
    }
  }

  // 11. REVIEW COUNT (?reviews=, ?rc=, ?reviewcount=)
  const reviews = getParam(searchParams, 'reviews', 'rc', 'reviewcount');
  if (reviews) {
    const num = parseInt(reviews, 10);
    if (!isNaN(num)) {
      overrides.reviewCount = num;
      foundAny = true;
    }
  }

  // 12. SHORT NAME (?shortName=, ?short=)
  const shortName = getParam(searchParams, 'shortname', 'short');
  if (shortName) {
    overrides.shortName = shortName;
    foundAny = true;
  }

  return foundAny ? overrides : null;
}

// Compute derived fields and ensure no hardcoded Kannapolis leaks when parameters are customized
function computeFullBusinessInfo(info: Partial<BusinessInfo>): BusinessInfo {
  const isCustomizedName = !!info.name && info.name !== DEFAULT_BUSINESS_INFO.name;
  const isCustomizedCity = !!info.city && info.city !== DEFAULT_BUSINESS_INFO.city;
  const isCustomized = isCustomizedName || isCustomizedCity;

  const name = info.name || DEFAULT_BUSINESS_INFO.name;
  const city = info.city || DEFAULT_BUSINESS_INFO.city;
  const state = info.state !== undefined ? info.state : (isCustomizedCity ? '' : DEFAULT_BUSINESS_INFO.state);

  // If city is customized, never leak Kannapolis's hardcoded "Concord" unless explicitly provided
  const secondaryCity = info.secondaryCity !== undefined
    ? info.secondaryCity
    : (isCustomizedCity ? '' : DEFAULT_BUSINESS_INFO.secondaryCity);

  // If city is customized, never leak Kannapolis's "1400 Birch St" or "28081" unless explicitly provided
  const address = info.address !== undefined
    ? info.address
    : (isCustomizedCity ? '' : DEFAULT_BUSINESS_INFO.address);
  const zip = info.zip !== undefined
    ? info.zip
    : (isCustomizedCity ? '' : DEFAULT_BUSINESS_INFO.zip);

  const phone = info.phone || DEFAULT_BUSINESS_INFO.phone;
  const phoneRaw = info.phoneRaw || formatPhoneRaw(phone);

  const shortName = info.shortName || (name.length > 24 ? name.split(' ')[0] + ' Landscaping' : name);
  const initials = info.initials || getInitials(name);

  // Clean full address string
  let fullAddress = '';
  if (address) {
    fullAddress = `${address}, ${city}${state ? `, ${state}` : ''}${zip ? ` ${zip}` : ''}`.trim();
  } else {
    fullAddress = `Serving ${city}${state ? `, ${state}` : ''} & Surrounding Areas`;
  }

  const mapsUrl = info.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${name} ${city} ${state}`.trim())}`;

  // Auto-generate clean email if customized and not provided
  const email = info.email || (isCustomizedName
    ? `info@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
    : DEFAULT_BUSINESS_INFO.email);

  const ownerName = info.ownerName || (isCustomized ? 'our team' : DEFAULT_BUSINESS_INFO.ownerName);
  const countyOrRegion = info.countyOrRegion || `${city} Metro Area`;

  return {
    ...DEFAULT_BUSINESS_INFO,
    ...info,
    name,
    shortName,
    initials,
    phone,
    phoneRaw,
    city,
    state,
    address,
    zip,
    fullAddress,
    secondaryCity,
    countyOrRegion,
    ownerName,
    email,
    mapsUrl,
  };
}

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    // 1. Try URL parameters first
    const fromQuery = parseQueryParams();
    if (fromQuery) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromQuery));
      } catch {
        // Ignore storage errors
      }
      return computeFullBusinessInfo(fromQuery);
    }

    // 2. Fall back to sessionStorage if previously set in session
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return computeFullBusinessInfo(parsed);
      }
    } catch {
      // Ignore storage errors
    }

    // 3. Fall back to defaults
    return DEFAULT_BUSINESS_INFO;
  });

  const isCustomized = useMemo(() => {
    return businessInfo.name !== DEFAULT_BUSINESS_INFO.name ||
      businessInfo.phone !== DEFAULT_BUSINESS_INFO.phone ||
      businessInfo.city !== DEFAULT_BUSINESS_INFO.city;
  }, [businessInfo]);

  // Keep document title and description meta synced dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const stateLabel = businessInfo.state ? `, ${businessInfo.state}` : '';
      document.title = `${businessInfo.name} | ${businessInfo.city}${stateLabel} Premier Lawn Care & Landscaping`;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `${businessInfo.name} provides top-rated lawn mowing, landscaping design, paver patios, sod installation, and tree services in ${businessInfo.city}${businessInfo.secondaryCity ? `, ${businessInfo.secondaryCity}` : ''}${stateLabel}. Call ${businessInfo.phone}.`
        );
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${businessInfo.name} | ${businessInfo.city}${stateLabel} Premier Lawn Care & Hardscaping`);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute(
          'content',
          `Professional lawn care, landscaping design, paver patios, sod installation, and tree services in ${businessInfo.city}${stateLabel}. Call ${businessInfo.phone} for a free estimate!`
        );
      }
    }
  }, [businessInfo]);

  const updateBusinessInfo = (overrides: Partial<BusinessInfo>) => {
    setBusinessInfo(prev => {
      const merged = computeFullBusinessInfo({ ...prev, ...overrides });
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
      } catch {
        // Ignore
      }
      return merged;
    });
  };

  const resetToDefaults = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore
    }
    setBusinessInfo(DEFAULT_BUSINESS_INFO);
  };

  // Dynamic collections based on the active business details
  const serviceAreas = useMemo(() => getDynamicServiceAreas(businessInfo), [businessInfo]);
  const reviews = useMemo(() => getDynamicReviews(businessInfo), [businessInfo]);
  const transformations = useMemo(() => getDynamicTransformations(businessInfo), [businessInfo]);
  const faqs = useMemo(() => getDynamicFaqs(businessInfo), [businessInfo]);

  return (
    <BusinessContext.Provider
      value={{
        businessInfo,
        serviceAreas,
        reviews,
        transformations,
        faqs,
        updateBusinessInfo,
        resetToDefaults,
        isCustomized,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
