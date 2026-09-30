import { ServiceItem, TestimonialItem, GalleryItem, FaqItem } from '../types';

export const BUSINESS_INFO = {
  name: 'CAB LAWN CARE',
  tagline: 'Transforming Charlotte Lawns into Extraordinary Landscapes.',
  subHeadline: 'Professional sod installation, mulch, and lawn maintenance for a yard you\'ll love coming home to.',
  phone: '+1 (743) 217-6176',
  phoneRaw: '17432176176',
  // TODO(client): real address. The ZIP reused another company's
  // (mjtreeservice.com) contact details; neutral placeholder so no
  // visitor is misdirected.
  email: 'info@example.com',
  primaryLocation: 'Charlotte, NC',
  primaryZip: '28273',
  serviceRadiusMiles: 25,
  hours: {
    weekdays: '7:00 AM – 7:00 PM',
    saturday: '7:00 AM – 7:00 PM',
    sunday: 'Closed',
    display: 'Mon – Sat: 7:00 AM – 7:00 PM | Sun: Closed'
  },
  googleRating: 5.0,
  reviewCount: 28,
  socialLinks: {
    facebook: '',
    instagram: ''
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'sod-installation',
    title: 'Sod Installation',
    shortDesc: 'Professional turf laying for instant green results and lush, barefoot-ready grass.',
    fullDesc: 'Our signature service. We provide end-to-end sod installation customized for the Charlotte, NC transition zone climate. From complete old grass removal, mechanical soil tilling, compost enrichment, and precision grade leveling to tight-seam turf laying and rolling. We work with premium Bermuda, Tall Fescue, and Zoysia varieties.',
    iconName: 'Sprout',
    isSpecialty: true,
    features: [
      'Site grading & debris removal',
      'Soil cultivation & root prep',
      'Premium NC farm-fresh sod',
      'Tight-seam rolled installation',
      'Initial deep soak & starter fertilizer',
      'Detailed watering & care guide'
    ],
    startingPrice: 'Free Custom Estimate',
    popularFor: 'New homes, patchy lawns, instant curb appeal'
  },
  {
    id: 'mulch-pinestraw',
    title: 'Mulch & Pine Straw',
    shortDesc: 'Enhancing soil health, moisture retention, weed control, and rich curb appeal.',
    fullDesc: 'Revitalize flower beds, tree rings, and foundation plantings with fresh mulch or premium North Carolina longleaf pine straw. Mulching retains critical soil moisture during hot Charlotte summers, moderates root temperatures, suppresses aggressive weeds, and delivers that crisp, dark landscaped finish.',
    iconName: 'Leaf',
    features: [
      'Bed weeding & deadhead cleanup',
      'Deep 3-4 inch trench edging for clean borders',
      'Dark brown, black, or natural hardwood mulch',
      'Clean, hand-tucked longleaf pine straw',
      'Even uniform coverage without tree volcano mounds'
    ],
    startingPrice: 'By cubic yard / roll',
    popularFor: 'Spring & Fall yard refreshes'
  },
  {
    id: 'lawn-maintenance',
    title: 'Lawn Maintenance',
    shortDesc: 'Precision mowing, edging, weed trimming, and blowing for razor-sharp lines every visit.',
    fullDesc: 'Keep your property looking neat and immaculate all season long. Our recurring lawn maintenance includes precision rotary mowing at optimal seasonal heights, crisp string trimming around fences and obstacles, vertical hard-surface blade edging along sidewalks and driveways, and thorough leaf/clipping blowing.',
    iconName: 'Scissors',
    features: [
      'Sharp blade rotary mowing',
      'Crisp driveway & walkway hard edging',
      'String weed trimming along perimeters',
      'Complete hard-surface debris blowout',
      'Weekly & bi-weekly schedule options',
      'Gate and pet secure protocols'
    ],
    startingPrice: 'Flexible recurring plans',
    popularFor: 'Consistent weekly or bi-weekly upkeep'
  },
  {
    id: 'property-cleanups',
    title: 'Property Clean-ups',
    shortDesc: 'Seasonal leaf removal, brush clearing, storm debris cleanup, and full yard overhauls.',
    fullDesc: 'Whether it is heavy autumn oak leaves blanketed over your turf, post-storm branches, or a neglected property that needs a fresh start, our clean-up crews quickly restore order. We rake, vacuum, bag, and haul away yard waste so you do not have to lift a finger.',
    iconName: 'Truck',
    features: [
      'Heavy leaf collection & curb removal',
      'Overgrown brush & briar clearing',
      'Perennial bed cutout & debris cleanup',
      'Fallen branch and storm debris pickup',
      'Off-site green waste haul-away'
    ],
    startingPrice: 'One-time & seasonal quotes',
    popularFor: 'Fall leaf season, Spring revival, moving in/out'
  },
  {
    id: 'landscape-design',
    title: 'Landscaping Design',
    shortDesc: 'Custom outdoor transformations, stone borders, drainage fixes, and plant bed styling.',
    fullDesc: 'Bring your outdoor living vision to life with tailored landscape enhancements. We design and install low-maintenance shrubs, ornamental grasses, perennial flower beds, river rock swales for drainage, and natural stone or metal bed borders built to withstand Charlotte weather.',
    iconName: 'Trees',
    features: [
      'Custom bed design & plant selection',
      'River rock & decorative stone borders',
      'French drains & yard drainage grading',
      'Shrub pruning and structural trimming',
      'Full backyard & front yard renovations'
    ],
    startingPrice: 'Consultation & 3D planning',
    popularFor: 'Total yard makeovers & curb appeal boost'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    location: 'Charlotte, NC (28273)',
    date: 'Verified Google Review',
    rating: 5,
    text: 'Professionalism, Punctuality, Quality, Responsiveness, Value. The sod job was extremely exceptional. They prepped the ground thoroughly, laid the sod without any gaps, and gave clear watering instructions. Two weeks later my lawn is dense, vibrant green, and healthy.',
    serviceUsed: 'Exceptional Sod Installation',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    location: 'University City, Charlotte',
    date: 'Verified Google Review',
    rating: 5,
    text: 'Great communication and attention to detail. My yard has never looked better. They put down fresh pine straw and clean mulch borders that transformed the whole look of our front porch. Honest pricing and very respectful team.',
    serviceUsed: 'Mulch & Bed Transformation',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Terrence B.',
    location: 'Highland Creek, Charlotte',
    date: 'Verified Google Review',
    rating: 5,
    text: 'CAB LAWN CARE is hands-down the most reliable lawn crew we have had in Charlotte. The edging is razor sharp, they never miss a week, and they always close the backyard gates securely behind them. Couldn’t ask for better service.',
    serviceUsed: 'Weekly Lawn Maintenance',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Sarah & David Jenkins',
    location: 'Mallard Creek, Charlotte',
    date: 'Verified Google Review',
    rating: 5,
    text: 'We had dead patchy clay from builder grading. The crew cleared everything, enriched the soil, and laid fresh Bermuda sod. Three months later and our yard is the envy of the entire street. Highly recommend CAB LAWN CARE!',
    serviceUsed: 'Sod Installation & Soil Prep',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'proj-1',
    title: 'Complete Sod Transformation',
    category: 'sod',
    description: 'Replaced dead, weed-choked Charlotte clay with premium Bermuda turf. Complete tilling, soil conditioning, tight-seam laying, and rolling.',
    beforeImg: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    afterImg: '/image.png',
    altText: 'Sod installation in Charlotte NC before and after transformation',
    locationTag: 'Charlotte, NC · 28273'
  },
  {
    id: 'proj-2',
    title: 'Mulch Beds & Sharp Edging',
    category: 'mulch',
    description: 'Dug 3-inch clean trench borders, weeded beds, and laid 4 yards of rich dark brown hardwood mulch to protect foundation shrubs.',
    beforeImg: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=800&q=80',
    altText: 'Mulch and pine straw installation in Charlotte NC flower beds',
    locationTag: 'University City, Charlotte'
  },
  {
    id: 'proj-3',
    title: 'Precision Lawn Maintenance & Edging',
    category: 'cleanup',
    description: 'Precision striping, vertical edging along concrete driveway and sidewalks, plus thorough debris clearing for pristine curb appeal.',
    beforeImg: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
    altText: 'Professional lawn mowing service and property cleanup in Charlotte',
    locationTag: 'Highland Creek, Charlotte'
  }
];

export const SERVICE_AREAS = [
  { zip: '28273', name: 'Steele Creek / Southwest Charlotte', primary: true },
  { zip: '28269', name: 'Highland Creek & Prosperity', primary: true },
  { zip: '28213', name: 'Old Concord & Newell', primary: true },
  { zip: '28202', name: 'Uptown Charlotte', primary: false },
  { zip: '28203', name: 'South End', primary: false },
  { zip: '28205', name: 'Plaza Midwood / NoDa', primary: false },
  { zip: '28209', name: 'Myers Park & Park Road', primary: false },
  { zip: '28211', name: 'SouthPark & Foxcroft', primary: false },
  { zip: '28226', name: 'Carmel & South Charlotte', primary: false },
  { zip: '28277', name: 'Ballantyne', primary: false },
  { zip: '28078', name: 'Huntersville', primary: false },
  { zip: '28027', name: 'Concord / Cabarrus Border', primary: false }
];

export const FAQS: FaqItem[] = [
  {
    question: 'When is the best time to install sod in Charlotte, NC?',
    answer: 'In the Charlotte area (USDA Zone 7b/8a), warm-season grasses like Bermuda and Zoysia are best installed from late spring through mid-summer when the soil is warm. Cool-season grasses like Tall Fescue are best installed in early autumn (September–November) or early spring. We can advise on the ideal turf type for your sun exposure and yard layout.',
    category: 'Sod Installation'
  },
  {
    question: 'How quickly can I get a quote for my yard?',
    answer: 'We respond to quote requests within 24 hours. For most properties in our 28273 and Charlotte service area, we can inspect your property in person or review your yard specifications via satellite/measurements to provide a written upfront quote with no hidden fees.',
    category: 'Estimates'
  },
  {
    question: 'What is included in your sod installation service?',
    answer: 'Our sod installation is comprehensive: we remove existing turf and weeds, rototill and aerate the topsoil, add organic compost/starter fertilizer, level and grade to ensure proper drainage away from foundations, lay fresh farm-cut turf rolls with tight staggered seams, roll the lawn with a water-weighted roller for root contact, and provide an exact watering protocol.',
    category: 'Sod Installation'
  },
  {
    question: 'How often do you recommend mulch or pine straw refreshing?',
    answer: 'In Charlotte, we recommend refreshing mulch once a year (typically in early spring or fall) with a 2-to-3 inch depth. For pine straw, semi-annual touch-ups keep the vibrant copper color looking crisp while safeguarding your plant root systems from Charlotte heat.',
    category: 'Mulch & Pine Straw'
  },
  {
    question: 'Are you licensed and insured in North Carolina?',
    answer: 'Yes, CAB LAWN CARE is fully registered and carries comprehensive general liability insurance for both residential and commercial landscaping operations in Charlotte and surrounding Mecklenburg County.',
    category: 'General'
  }
];
