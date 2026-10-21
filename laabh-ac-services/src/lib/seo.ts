import { getCleanVendorPhone, getFormattedVendorPhone } from './config';

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://laabh-ac-services.vercel.app';

export const BUSINESS_INFO = {
  name: 'Labh Air Conditioning Services',
  legalName: 'Labh Air Conditioning Services LLP',
  alternateName: 'Labh AC Services Ahmedabad',
  url: SITE_URL,
  logo: `${SITE_URL}/images/services/service.jpg`,
  image: `${SITE_URL}/images/hero_banner.jpg`,
  telephone: `+${getCleanVendorPhone()}`,
  displayPhone: getFormattedVendorPhone(),
  email: 'contact@laabhservices.com',
  priceRange: '₹₹ (₹499 - ₹2,999)',
  currency: 'INR',
  address: {
    streetAddress: 'Shop No. 12, Commercial Complex, Bodakdev, SG Highway',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380054',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 23.0373,
    longitude: 72.5117,
  },
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:30',
    },
  ],
  areaServed: [
    'Ahmedabad',
    'Gandhinagar',
    'Bodakdev',
    'Satellite',
    'Bopal',
    'South Bopal',
    'Prahlad Nagar',
    'Vastrapur',
    'Thaltej',
    'Navrangpura',
    'Chandkheda',
    'Gota',
    'Naranpura',
    'Paldi',
    'Maninagar',
    'SG Highway',
    'Science City Road',
    'Shela',
  ],
  rating: {
    ratingValue: '4.9',
    reviewCount: '348',
    bestRating: '5',
    worstRating: '1',
  },
};

/**
 * Returns JSON-LD LocalBusiness / HVACBusiness Schema
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_INFO.name,
    alternateName: BUSINESS_INFO.alternateName,
    legalName: BUSINESS_INFO.legalName,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: [
      BUSINESS_INFO.image,
      `${SITE_URL}/images/services/installation.jpg`,
      `${SITE_URL}/images/services/repair.jpg`,
    ],
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:30',
      },
    ],
    areaServed: BUSINESS_INFO.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Gujarat',
      },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.rating.ratingValue,
      reviewCount: BUSINESS_INFO.rating.reviewCount,
      bestRating: BUSINESS_INFO.rating.bestRating,
      worstRating: BUSINESS_INFO.rating.worstRating,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Air Conditioning Services Ahmedabad',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'AC Maintenance & Servicing',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AC Jet Cleaning & Deep Servicing',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Preventative AC Health Maintenance',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'AC Installation & Fitting',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Split AC Installation & Uninstallation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Concealed Copper AC Piping',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Window AC Fitting & Bracket Mounting',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'AC Repair & Diagnostics',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Compressor & PCB Repair',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Refrigerant Gas Leak Detection & Refilling',
              },
            },
          ],
        },
      ],
    },
  };
}

/**
 * Returns WebSite Schema with SearchAction
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_INFO.name,
    alternateName: BUSINESS_INFO.alternateName,
    description:
      'Premier air conditioning repair, split AC installation, power-jet servicing, and concealed piping in Ahmedabad.',
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
    inLanguage: 'en-IN',
  };
}

/**
 * Returns JSON-LD Service Schema for individual service pages
 */
export function getServiceSchema(service: {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string | null;
  startingPrice?: any;
  estimatedDuration?: string | null;
  imageUrl?: string | null;
}) {
  const serviceUrl = `${SITE_URL}/services/${service.slug}`;
  const imageUrl = service.imageUrl
    ? service.imageUrl.startsWith('http')
      ? service.imageUrl
      : `${SITE_URL}${service.imageUrl}`
    : `${SITE_URL}/images/services/service.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: `${service.name} in Ahmedabad`,
    serviceType: 'HVAC Air Conditioning Service',
    description: service.shortDescription,
    url: serviceUrl,
    image: imageUrl,
    provider: {
      '@type': 'HVACBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.telephone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Ahmedabad',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Gujarat',
      },
    },
    offers: {
      '@type': 'Offer',
      price: service.startingPrice ? String(service.startingPrice) : '499',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/book?service=${service.slug}`,
      priceValidUntil: '2027-12-31',
    },
  };
}

/**
 * Returns JSON-LD FAQPage Schema
 */
export function getFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * Returns JSON-LD BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
