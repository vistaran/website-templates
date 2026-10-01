import { BusinessDetails, ServiceItem, TransformationItem, ReviewItem, ServiceAreaNeighborhood } from '../types';

export const businessDetails: BusinessDetails = {
  name: 'Carolina Lawn Enhancement',
  legalName: 'Lawn Enhancement Inc. / Carolina Lawn Enhancement',
  tagline: '36+ Years of Master Landscaping & Precision Lawn Enhancement in Charlotte, NC',
  phone: '(704) 918-0398',
  phoneRaw: '7049180398',
  address: {
    street: '10915 Delsing Ct',
    city: 'Charlotte',
    state: 'NC',
    zip: '28214',
    full: '10915 Delsing Ct, Charlotte, NC 28214'
  },
  googleMapsUrl: 'https://maps.app.goo.gl/pHSjQxNF9mUC1ogF6',
  yearsOfExperience: 36,
  establishedYear: 1988,
  rating: 4.9,
  reviewCount: 128,
  hours: [
    { days: 'Monday – Friday', time: '7:00 AM – 6:30 PM', isOpenToday: true },
    { days: 'Saturday', time: '8:00 AM – 3:30 PM', isOpenToday: false },
    { days: 'Sunday', time: 'Closed (Emergency On-Call)', isOpenToday: false }
  ],
  billingOptions: [
    'QuickBooks Online Invoicing & Card Auto-Pay',
    'Flexible Monthly Billing Statements',
    'Customized Annual Service Contracts',
    'Zero-Hassle Commercial & HOA Billing'
  ]
};

export const serviceItems: ServiceItem[] = [
  {
    id: 'precision-mowing',
    title: 'Precision Lawn Maintenance & Mowing',
    category: 'residential',
    shortDesc: 'Diamond-pattern mowing, razor-sharp hard edging, perimeter string trimming, and clean surface blowing.',
    fullDesc: 'Our flagship lawn maintenance service keeps your Carolina turf immaculate week after week. We calibrate blade heights seasonally for Tall Fescue, Bermuda, and Zoysia to ensure root health and drought resistance.',
    features: [
      'Commercial zero-turn diamond striping',
      'Walkway, curb & bed definition edging',
      'Obstacle line trimming & weed management',
      'Complete debris blowing off hardscapes',
      'Weekly or bi-weekly scheduled routing'
    ],
    startingPrice: '$45 / visit',
    popular: true,
    frequency: 'Weekly / Bi-Weekly',
    iconName: 'Scissors',
    badge: 'Most Popular',
    image: '/images/precision_mowing.jpg'
  },
  {
    id: 'designer-landscaping',
    title: 'Designer Landscaping & Yard Enhancement',
    category: 'residential',
    shortDesc: 'Custom architectural garden beds, native plant curation, decorative stone, and aesthetic focal points.',
    fullDesc: 'Tailored for Charlotte properties that deserve curb appeal distinction. From elegant English boxwood borders to blooming hydrangeas and natural stone retaining walls, we design and install outdoor beauty that thrives in the Piedmont climate.',
    features: [
      'Site analysis & custom planting master plan',
      'Carolina-native drought & heat resilient perennials',
      'Stone retaining walls, pavers & boulder accents',
      'Deep bed trenching & edging definition',
      'Low-voltage ambient landscape illumination'
    ],
    startingPrice: '$1,200',
    popular: true,
    frequency: 'Project-Based',
    iconName: 'Sparkles',
    badge: 'Custom Design',
    image: '/images/designer_landscaping.jpg'
  },
  {
    id: 'sod-installation',
    title: 'Lawn Installation & Premium Sodding',
    category: 'installation',
    shortDesc: 'Full soil grading, heavy clay amendment, laser-level prep, and fresh farm-cut turf roll installation.',
    fullDesc: 'Revitalize bare, weed-dominated dirt into an emerald showstopper in a single day. We source certified fresh-cut sod from local Carolina turf farms, properly tilling and conditioning our infamous red clay so roots take hold deep.',
    features: [
      'Old lawn removal & laser-guided surface grading',
      'Soil aeration & compost clay amendment',
      'Fresh-cut Tall Fescue, Tifway Bermuda, or Zoysia',
      'Tight staggered-seam roll installation & rolling',
      '30-day initial watering & establishment schedule'
    ],
    startingPrice: '$1.10 / sq ft',
    popular: true,
    frequency: 'One-Time / Seasonal',
    iconName: 'Layers',
    badge: 'Instant Green',
    image: '/images/sod_installation.jpg'
  },
  {
    id: 'aeration-seeding',
    title: 'Core Aeration, Overseeding & Feeding',
    category: 'care',
    shortDesc: 'Relieve compacted Carolina red clay, inject premium seed, and deliver balanced seasonal nutrients.',
    fullDesc: 'Charlotte red clay naturally compacts, suffocating root systems. Our heavy-duty core aerator pulls 2.5-inch plugs to let oxygen, water, and premium Blue Tag Certified Tall Fescue seed penetrate deep into the root zone.',
    features: [
      'Double-pass mechanical core aeration',
      'Blue Tag Certified heat-tolerant Fescue seed',
      'Starter fertilizer & root booster application',
      'Pre-emergent & broadleaf weed treatments',
      'Fall and Spring seasonal optimization'
    ],
    startingPrice: '$180 / service',
    frequency: 'Spring / Fall Essential',
    iconName: 'Sprout',
    badge: 'Clay Relief',
    image: '/images/aeration_seeding.jpg'
  },
  {
    id: 'mulch-pine-straw',
    title: 'Mulch Installation & Longleaf Pine Straw',
    category: 'care',
    shortDesc: 'Double-shredded dark hardwood mulch and vibrant North Carolina longleaf pine needle groundcover.',
    fullDesc: 'Protect your shrub roots from scorching summer heat and winter freezes while locking in moisture and preventing weed growth. We clean all beds, cut fresh deep edges, and lay uniform 3-inch depth cover.',
    features: [
      'Rich double-shredded dark brown/black bark mulch',
      'Prime North Carolina longleaf red pine straw',
      'Complete bed weeding & pre-emergent treatment',
      'Crisp spade spade-cut trench edging',
      'Clean hand-raked presentation'
    ],
    startingPrice: '$85 / yard installed',
    frequency: 'Spring / Fall Refresh',
    iconName: 'Leaf',
    badge: 'Seasonal Refresh',
    image: '/images/mulch_pine_straw.jpg'
  },
  {
    id: 'commercial-grounds',
    title: 'Commercial Grounds & HOA Contracts',
    category: 'commercial',
    shortDesc: 'Turnkey property management, yearly service contracts, and monthly QuickBooks invoicing.',
    fullDesc: 'Trusted by Charlotte HOAs, business parks, retail plazas, and property management firms. We deliver dependable schedules, comprehensive liability coverage, and unified invoicing that makes accounting effortless.',
    features: [
      'Comprehensive 52-week grounds management',
      'Turf, shrubs, beds, trees & parking lot debris',
      'Monthly QuickBooks itemized invoicing',
      'Annual locked-rate fixed contracts',
      'Priority emergency storm response crew'
    ],
    startingPrice: 'Custom Proposal',
    frequency: 'Yearly Contract',
    iconName: 'Building2',
    badge: 'Contract Billing',
    image: '/images/commercial_grounds.jpg'
  }
];

export const transformationItems: TransformationItem[] = [
  {
    id: 'west-charlotte-fescue',
    title: 'Complete Turf Restoration & Clay Reconditioning',
    location: 'Mountain Island / Charlotte (28214)',
    serviceType: 'Lawn Installation & Aeration',
    description: 'This neglected half-acre backyard had severe red clay compaction, broadleaf weed dominance, and bald erosion runoff. Our team graded the lot, tilled soil amendments, and laid premium heat-tolerant Fescue sod with deep trench bed borders.',
    beforeImage: '/images/before_patchy.jpg',
    afterImage: '/images/after_pristine.jpg',
    duration: '2 Days Completion',
    grassType: 'Tall Fescue Elite'
  },
  {
    id: 'coulwood-landscaping',
    title: 'Designer Bed Overhaul & Fresh Longleaf Pine Straw',
    location: 'Coulwood, Charlotte NC',
    serviceType: 'Designer Landscaping & Cleanups',
    description: 'Overgrown invasive bushes and faded decomposing mulch replaced with tailored flowering crape myrtles, evergreen boxwoods, river rock perimeter dry creek, and fresh longleaf Carolina pine straw.',
    beforeImage: '/images/before_beds.jpg',
    afterImage: '/images/after_beds.jpg',
    duration: '1 Day Completion',
    grassType: 'Hybrid Bermuda'
  },
  {
    id: 'belmont-estate-stripes',
    title: 'Estate Mowing & Precision Edge Definition',
    location: 'Belmont & Catawba River Basin',
    serviceType: 'Contract Lawn Maintenance',
    description: 'Transitioned a struggling property into an executive showcase with weekly calibrated mowing heights, custom diamond striping, deep concrete edge beveling, and seasonal nitrogen balancing.',
    beforeImage: '/images/before_belmont.jpg',
    afterImage: '/images/after_belmont.jpg',
    duration: 'Weekly Maintenance',
    grassType: 'Emerald Zoysia'
  }
];

export const reviewItems: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marcus & Linda Sterling',
    neighborhood: 'Mountain Island Lake, Charlotte',
    service: 'Full Season Maintenance & Mulch',
    rating: 5,
    date: '3 weeks ago',
    text: 'Carolina Lawn Enhancement has cared for our lawn for 8 years now. You can tell they have decades of local Charlotte experience—our lawn is the greenest in the neighborhood, their crew never misses a Thursday, and the QuickBooks billing makes payments completely effortless.',
    verified: true,
    yearsAsClient: '8 years client'
  },
  {
    id: 'rev-2',
    author: 'David H. Thompson',
    neighborhood: 'Coulwood / Paw Creek, Charlotte',
    service: 'Sod Installation & Soil Grading',
    rating: 5,
    date: '1 month ago',
    text: 'Had terrible red clay erosion after home renovations. Called (704) 918-0398 and spoke directly with the team. They came out, gave an honest written quote, graded the slopes, and installed fresh Fescue sod in 24 hours. Phenomenal work ethic and fair pricing.',
    verified: true,
    yearsAsClient: 'New project'
  },
  {
    id: 'rev-3',
    author: 'Sarah Jenkins',
    neighborhood: 'Riverbend / Northwest Charlotte',
    service: 'Designer Landscaping & Clean Up',
    rating: 5,
    date: '2 months ago',
    text: 'Finding a landscaper who has been in business for 36 years in Charlotte gives you total peace of mind. They redesigned our entire front yard beds with gorgeous stone borders and pine straw. Highly recommend their yearly contract!',
    verified: true,
    yearsAsClient: '3 years client'
  },
  {
    id: 'rev-4',
    author: 'Robert Patterson',
    neighborhood: 'Commercial HOA Property Manager, Belmont NC',
    service: 'Annual Commercial Contract',
    rating: 5,
    date: '3 months ago',
    text: 'We manage three commercial facilities along the I-85 corridor. Carolina Lawn Enhancement handles our mowing, fertilization, and winter storm clearances under an annual agreement. Transparent QuickBooks billing and immaculate attention to detail.',
    verified: true,
    yearsAsClient: '5 years client'
  }
];

export const serviceNeighborhoods: ServiceAreaNeighborhood[] = [
  { name: 'Northwest Charlotte / Delsing Ct', zipCode: '28214', region: 'Primary Headquarters', primaryServices: 'Full Lawn Care, Sod, Mowing' },
  { name: 'Mountain Island / Riverbend', zipCode: '28216', region: 'West Mecklenburg', primaryServices: 'Designer Landscaping & Aeration' },
  { name: 'Paw Creek & Coulwood', zipCode: '28214', region: 'Northwest Charlotte', primaryServices: 'Weekly Maintenance & Pine Straw' },
  { name: 'Belmont & Catawba River', zipCode: '28012', region: 'Gaston / Mecklenburg Border', primaryServices: 'Residential & Commercial Contracts' },
  { name: 'Mount Holly & Stanley', zipCode: '28120', region: 'Northwest Corridor', primaryServices: 'Sodding & Yard Renovations' },
  { name: 'Huntersville & Lake Norman South', zipCode: '28078', region: 'North Mecklenburg', primaryServices: 'Estate Maintenance & Hardscapes' },
  { name: 'University City & North Charlotte', zipCode: '28262', region: 'Northeast Charlotte', primaryServices: 'HOA & Commercial Grounds' },
  { name: 'SouthPark & Ballantyne', zipCode: '28277', region: 'South Charlotte', primaryServices: 'Custom Landscaping & Aeration' }
];

export const faqItems = [
  {
    q: 'How long has Carolina Lawn Enhancement been serving the Charlotte area?',
    a: 'We have over 36 years of continuous, hands-on experience in lawn maintenance, sod installation, and designer landscaping throughout Charlotte and Mecklenburg County. Our deep knowledge of local Carolina red clay and climate guarantees superior results.'
  },
  {
    q: 'What billing options and contracts do you offer?',
    a: 'We provide maximum flexibility: QuickBooks Online automated invoicing with credit card/bank transfer, transparent monthly billing statements, and customized annual residential or commercial service contracts with locked-in rates.'
  },
  {
    q: 'What type of grass is best suited for Charlotte, NC lawns?',
    a: 'Charlotte sits in the transition zone. For shaded lawns or year-round green color, Tall Fescue (cool-season) is king when aerated and seeded in the fall. For full-sun, drought-heavy properties, warm-season grasses like Tifway 419 Bermuda or Emerald Zoysia deliver thick, barefoot-soft carpet in the heat.'
  },
  {
    q: 'How does your Free On-Site Estimate process work?',
    a: 'You can submit your property details using our online form or call us directly at (704) 918-0398. We will visit your property (often within 24 to 48 hours), take exact laser measurements, assess shade/soil condition, and deliver a clear itemized quote with zero obligation.'
  },
  {
    q: 'Do you require long-term contracts for residential mowing?',
    a: 'No! While many clients prefer the budget certainty of our popular yearly maintenance agreements, we offer flexible month-to-month and seasonal services with no lock-in fees.'
  },
  {
    q: 'Are you licensed and fully insured in North Carolina?',
    a: 'Yes, we are fully licensed and carry comprehensive commercial liability insurance for all residential and commercial landscaping operations.'
  }
];
