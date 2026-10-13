import {
  Service,
  AvailabilityRule,
  BusinessSettings,
  BlockedDate,
  Appointment,
  ProjectItem,
  JournalArticle
} from '../types/booking';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'initial-consultation',
    name: 'Initial Design Consultation',
    tagline: 'A complimentary discovery meeting to explore your vision and scope.',
    durationMinutes: 30,
    price: 0,
    isFree: true,
    description: 'A focused introductory conversation to discuss your architectural project, timeline, target budget, and design aspirations with our principal studio team.',
    deliverables: [
      'Comprehensive project scope review',
      'Preliminary timeline and budget estimation',
      'Studio process and fee structure overview',
      'Recommended next milestones'
    ],
    recommendedFor: 'Prospective clients beginning a renovation, new build, or full-room transformation.',
    consultationMethod: 'flexible',
    isActive: true,
    category: 'Consultation',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'virtual-consultation',
    name: 'Virtual Design Consultation',
    tagline: 'Targeted remote design guidance and spatial problem-solving.',
    durationMinutes: 45,
    price: 999,
    isFree: false,
    description: 'An interactive video consultation focusing on specific design challenges, furniture selections, paint palettes, lighting schemes, and spatial flow.',
    deliverables: [
      'Live screen-shared moodboard review',
      'Architectural layout recommendations',
      'Curated vendor & material sourcing links',
      'Written summary follow-up with actionable steps'
    ],
    recommendedFor: 'Clients seeking professional design guidance or targeted room refinements.',
    consultationMethod: 'video_call',
    isActive: true,
    category: 'Consultation',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'in-home-consultation',
    name: 'In-Home Design Consultation',
    tagline: 'An on-site walkthrough with spatial analysis and material insights.',
    durationMinutes: 60,
    price: 2499,
    isFree: false,
    description: 'An immersive on-site assessment at your residence. We examine lighting conditions, architectural layout, existing furnishings, and take preliminary measurements.',
    deliverables: [
      '60-minute in-person spatial diagnostic',
      'Rough architectural field measurements',
      'Initial spatial concept direction & material ideas',
      'Formalized proposal with tailored design packages'
    ],
    recommendedFor: 'Homeowners preparing for residential renovations and turnkey interiors.',
    consultationMethod: 'in_person',
    isActive: true,
    category: 'Consultation',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'full-service',
    name: 'Full-Service Interior Design',
    tagline: 'Turnkey concept-to-completion residential transformation.',
    durationMinutes: 90,
    price: 4999,
    isFree: false,
    description: 'Our signature bespoke service managing every phase: architectural drawings, custom millwork, bespoke furnishings, art curation, contractor oversight, and white-glove installation.',
    deliverables: [
      '3D photo-realistic spatial renderings',
      'Full architectural CAD drawing sets & elevations',
      'Custom millwork & fixture specifications',
      'Procurement, storage, white-glove styling'
    ],
    recommendedFor: 'Comprehensive primary residences, luxury apartments, and custom ground-up builds.',
    consultationMethod: 'in_person',
    isActive: true,
    category: 'Full Service',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'kitchen-bath',
    name: 'Kitchen & Bathroom Design',
    tagline: 'Specialized millwork, plumbing fixtures, and natural stone curation.',
    durationMinutes: 60,
    price: 2999,
    isFree: false,
    description: 'Precision architectural planning for the hardest-working rooms. We balance ergonomic perfection with tactile natural stones, custom cabinet profiles, and integrated lighting.',
    deliverables: [
      'Detailed cabinet layout & appliance elevations',
      'Stone slab selection & tile patterns',
      'Plumbing, hardware & fixture schedules',
      'Lighting and electrical placement plans'
    ],
    recommendedFor: 'Homeowners prioritizing high-impact culinary and wellness spaces.',
    consultationMethod: 'flexible',
    isActive: true,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'styling-procurement',
    name: 'Space Planning & Styling',
    tagline: 'Elevating existing architectures with collectible pieces and textiles.',
    durationMinutes: 45,
    price: 1999,
    isFree: false,
    description: 'For spaces with great bones needing that refined designer touch. We layer vintage textiles, artisanal ceramics, museum-grade framing, and lighting to create soul and depth.',
    deliverables: [
      'Furniture layout & circulation diagrams',
      'Textile, rug, and window treatment curation',
      'Fine art and decorative object sourcing',
      'On-site installation and photo styling day'
    ],
    recommendedFor: 'Furnished residences in need of cohesion, warmth, and curated character.',
    consultationMethod: 'flexible',
    isActive: true,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_AVAILABILITY_RULES: AvailabilityRule[] = [
  { id: 'rule-0', weekday: 0, weekdayName: 'Sunday', isOpen: false, startTime: '10:00', endTime: '16:00' },
  { id: 'rule-1', weekday: 1, weekdayName: 'Monday', isOpen: true, startTime: '09:30', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
  { id: 'rule-2', weekday: 2, weekdayName: 'Tuesday', isOpen: true, startTime: '09:30', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
  { id: 'rule-3', weekday: 3, weekdayName: 'Wednesday', isOpen: true, startTime: '09:30', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
  { id: 'rule-4', weekday: 4, weekdayName: 'Thursday', isOpen: true, startTime: '09:30', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
  { id: 'rule-5', weekday: 5, weekdayName: 'Friday', isOpen: true, startTime: '09:30', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
  { id: 'rule-6', weekday: 6, weekdayName: 'Saturday', isOpen: true, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' }
];

export const INITIAL_BUSINESS_SETTINGS: BusinessSettings = {
  studioName: 'Trikha Interiors',
  tagline: 'Spaces That Feel Like Home. Designed to Inspire.',
  phone: '+91 98250 12345',
  email: 'contact@trikhainteriors.com',
  address: 'Y/8, Sujata Flats, Shahibag',
  cityStateZip: 'Ahmedabad, Gujarat 380004',
  mapUrl: 'https://maps.app.goo.gl/PZYmV4TyLKRRoZWc6',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'India Standard Time (IST - Ahmedabad)',
  bufferMinutes: 15,
  minNoticeHours: 12,
  maxAdvanceDays: 60,
  cancellationWindowHours: 24,
  depositPercentage: 100
};

export const INITIAL_BLOCKED_DATES: BlockedDate[] = [
  { id: 'block-1', date: '2026-11-01', reason: 'Diwali Festival Studio Closure' },
  { id: 'block-2', date: '2026-11-02', reason: 'New Year Studio Holiday' },
  { id: 'block-3', date: '2026-12-25', reason: 'Winter Holiday Recess' }
];

// Seeded appointments for calendar realism and testing double-booking logic
export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-seed-1',
    bookingReference: 'TRIKHA-2026-7841',
    serviceId: 'initial-consultation',
    serviceName: 'Initial Design Consultation',
    servicePrice: 0,
    serviceDuration: 30,
    customerName: 'Aarav Patel',
    customerEmail: 'aarav.patel@example.com',
    customerPhone: '+91 98250 44821',
    projectLocation: 'Satellite, Ahmedabad 380015',
    propertyType: 'Apartment',
    designAreas: ['Living Room', 'Kitchen & Dining', 'Primary Bedroom'],
    budgetRange: '$50,000 – $100,000',
    projectDescription: 'Full interior planning of a 3,200 sq ft luxury apartment. Seeking contemporary warm minimalism with custom Italian marble inlay and veneer millwork.',
    consultationMethod: 'in_person',
    date: '2026-10-15',
    startTime: '10:30',
    endTime: '11:00',
    timezone: 'Asia/Kolkata',
    status: 'Confirmed',
    paymentStatus: 'Not Required',
    managementToken: 'tok-aarav-7841',
    createdAt: '2026-10-10T14:20:00Z',
    updatedAt: '2026-10-10T14:20:00Z',
    internalNotes: 'Client brought architectural floor plans of the new residence.'
  },
  {
    id: 'apt-seed-2',
    bookingReference: 'TRIKHA-2026-9214',
    serviceId: 'virtual-consultation',
    serviceName: 'Virtual Design Consultation',
    servicePrice: 999,
    serviceDuration: 45,
    customerName: 'Meera Shah',
    customerEmail: 'meera.shah@example.com',
    customerPhone: '+91 98791 55920',
    projectLocation: 'Bodakdev, Ahmedabad 380054',
    propertyType: 'House',
    designAreas: ['Whole Residence'],
    budgetRange: '$100,000 – $250,000',
    projectDescription: 'Bungalow interior redesign focusing on cohesive spatial flow, bespoke lighting, and premium stone accents.',
    consultationMethod: 'video_call',
    date: '2026-10-16',
    startTime: '14:30',
    endTime: '15:15',
    timezone: 'Asia/Kolkata',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    managementToken: 'tok-meera-9214',
    createdAt: '2026-10-11T09:15:00Z',
    updatedAt: '2026-10-11T09:15:00Z'
  },
  {
    id: 'apt-seed-3',
    bookingReference: 'TRIKHA-2026-6419',
    serviceId: 'in-home-consultation',
    serviceName: 'In-Home Design Consultation',
    servicePrice: 2499,
    serviceDuration: 60,
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.mehta@example.com',
    customerPhone: '+91 99099 12090',
    projectLocation: 'Ambli Road, Ahmedabad 380058',
    propertyType: 'Townhouse',
    designAreas: ['Kitchen & Dining', 'Primary Bathroom', 'Living Room'],
    budgetRange: '$100,000 – $250,000',
    projectDescription: 'On-site walkthrough for villa renovation. Desiring minimalist cabinetry, brass hardware, and custom teakwood furniture.',
    consultationMethod: 'in_person',
    date: '2026-10-19',
    startTime: '11:00',
    endTime: '12:00',
    timezone: 'Asia/Kolkata',
    status: 'Pending',
    paymentStatus: 'Paid',
    managementToken: 'tok-rohan-6419',
    createdAt: '2026-10-12T11:00:00Z',
    updatedAt: '2026-10-12T11:00:00Z'
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'modern-organic-residence',
    title: 'The Modern Organic Residence',
    subtitle: 'Warm minimalism infused with raw stone and handcrafted joinery',
    category: 'Full Residential',
    location: 'Westchester County, NY',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An expansive 5,200 sq ft woodland residence designed to celebrate the interplay between daylight and tactile surfaces. Our team balanced monolithic Roman travertine walls with wire-brushed white oak millwork and unlacquered brass details.',
    scope: 'Complete architectural layout revision, bespoke kitchen millwork, primary ensuite sanctuary, bespoke living room furniture curation.',
    materials: ['Roman Travertine', 'Wire-Brushed White Oak', 'Limewash Plaster', 'Belgian Linen', 'Unlacquered Brass'],
    isFeatured: true
  },
  {
    id: 'contemporary-city-home',
    title: 'The Contemporary City Home',
    subtitle: 'An airy sanctuary floating above Manhattan with serene geometries',
    category: 'Penthouse & Loft',
    location: 'Tribeca, New York',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A duplex penthouse redesigned to offer quiet respite from the bustling streets below. Curved acoustic plaster ceilings, low-slung Italian mohair sofas, and panoramic steel-framed glazing establish a quiet, meditative atmosphere.',
    scope: 'Architectural space planning, custom double-height steel shelving, lighting choreography, bespoke upholstery.',
    materials: ['Calacatta Viola Marble', 'Smoked Walnut', 'Mohair Velvet', 'Blackened Steel', 'Bouclé'],
    isFeatured: true
  },
  {
    id: 'warm-minimalist-retreat',
    title: 'The Warm Minimalist Retreat',
    subtitle: 'Wabi-sabi principles rendered in textured plaster and natural light',
    category: 'Full Residential',
    location: 'Litchfield Hills, CT',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed as a weekend sanctuary for two creative directors. Every unnecessary ornament was peeled away to elevate tactile textures: micro-cement flooring, custom hearth seating in raw wool, and reclaimed timber ceiling beams.',
    scope: 'Interior architecture, custom hearth masonry, bespoke banquette, vintage lighting curation.',
    materials: ['Micro-Cement', 'Reclaimed Timber', 'Raw Wool', 'Dolomite Stone', 'Cast Bronze'],
    isFeatured: true
  },
  {
    id: 'timeless-kitchen-project',
    title: 'The Timeless Kitchen Project',
    subtitle: 'A culinary centerpiece uniting fluted joinery and sculptural stone',
    category: 'Kitchen & Bath',
    location: 'Greenwich, CT',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Commissioned by a gourmet chef and art collector. Features an 11-foot Taj Mahal quartzite island with integrated induction, pocket doors concealing specialty pantry bays, and artisanal handmade zellige wall tiles.',
    scope: 'Full kitchen architectural design, custom cabinet fabrication drawings, appliance integration, task lighting.',
    materials: ['Taj Mahal Quartzite', 'Fumed Oak', 'Handmade Zellige Tile', 'Burnished Brass', 'Fluted Glass'],
    isFeatured: true
  },
  {
    id: 'soho-loft-renovation',
    title: 'The SoHo Cast-Iron Loft',
    subtitle: 'Preserving historic Corinthian columns with contemporary gallery flow',
    category: 'Penthouse & Loft',
    location: 'SoHo, New York',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A 3,600 sq ft landmarked loft restored with deep respect for historic structural elements. We maintained 14-foot ceiling heights and integrated discreet museum wall reveals for private contemporary art collections.',
    scope: 'Landmark preservation approval, whole-loft architecture, lighting art curation, primary bath spa.',
    materials: ['Cast Iron', 'Bleached Herringbone Oak', 'Nero Marquina', 'Linen Gauze', 'Textured Plaster'],
    isFeatured: false
  },
  {
    id: 'pacific-palisades-villa',
    title: 'The Coastal Horizon Villa',
    subtitle: 'Seamless indoor-outdoor living overlooking coastal bluffs',
    category: 'Full Residential',
    location: 'Pacific Palisades, CA',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Framing breathtaking ocean vistas through oversized automated pivot glass doors. Earthy terracotta tilework, cedar louvered ceilings, and bespoke outdoor lounge vignettes blur all boundaries with nature.',
    scope: 'Interior and exterior living design, custom terrace pergolas, stone infinity plunge pool furnishings.',
    materials: ['Terracotta Paving', 'Red Cedar', 'Linen Slipcovers', 'Tumbled Limestone', 'Teak'],
    isFeatured: false
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'materiality-and-soul',
    title: 'The Architecture of Stillness: Designing for Quietude in 2026',
    slug: 'architecture-of-stillness',
    date: 'October 2026',
    author: 'Julianna Vance',
    authorRole: 'Founder & Principal Designer',
    readTime: '6 min read',
    category: 'Design Philosophy',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Why modern luxury is shifting from conspicuous displays toward tactile materiality, restorative acoustics, and spaces that slow our pulse.',
    content: [
      'In a world dominated by constant visual stimulation and hyper-connectivity, our domestic sanctuaries must perform a different role than they did a decade ago. Home is no longer merely a showcase of status; it is a restorative refuge.',
      'At Trikha Interiors, we approach stillness through four primary sensory anchors: acoustic absorption through thick woven textiles, diffuse natural lighting, honest natural materials that develop patina over time, and intentional spatial voids that let the eye rest.',
      'When you remove decorative noise, the true character of a room reveals itself: the honest grain of rift-cut white oak, the cool touch of honed travertine, and the shifting shadows cast by afternoon light.'
    ]
  },
  {
    id: 'selecting-natural-stone',
    title: 'A Curator’s Guide to Selecting Natural Stone Slabs',
    slug: 'selecting-natural-stone',
    date: 'September 2026',
    author: 'Henri Lindqvist',
    authorRole: 'Head of Architecture & Millwork',
    readTime: '8 min read',
    category: 'Materiality',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Navigating stone quarries from Carrara to Mount Hermon: assessing veining, honed versus polished finishes, and structural longevity.',
    content: [
      'Every natural stone slab is a geological painting millions of years in the making. Selecting the right block for an island or powder room basin is an intimate, visceral process.',
      'We almost universally recommend a honed or leathered finish over high-gloss polish in residential applications. Honed stone interacts with light gently, absorbs glare, and develops an authentic, romantic patina that looks even more majestic after years of dinner parties and shared mornings.',
      'When specifying dramatic stones like Calacatta Viola or Verde Alpi, allow the slab to act as the primary artwork of the room, keeping surrounding millwork restrained and monochromatic.'
    ]
  },
  {
    id: 'lighting-choreography',
    title: 'Choreographing Light: The Three Pillars of Residential Illumination',
    slug: 'lighting-choreography',
    date: 'August 2026',
    author: 'Clara Zhao',
    authorRole: 'Senior Interior Stylist',
    readTime: '5 min read',
    category: 'Technical Guide',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'The critical hierarchy between architectural wash, ambient warm pools, and sculptural decorative fixtures for nocturnal warmth.',
    content: [
      'The single most common mistake in contemporary residential renovations is relying excessively on grid-pattern recessed ceiling downlights. Overhead glare flattens architecture and induces subconscious stress.',
      'A masterfully lit residence relies on low-level pools of light: dim-to-warm architectural cove lighting, floor lamps casting soft glows on textured plaster, and low-wattage accent lamps illuminating art at eye level.',
      'Always specify 2700K or 2400K color temperatures for living quarters to mimic the soothing amber spectrum of dusk and candlelight.'
    ]
  }
];

export const DESIGN_PROCESS_STEPS = [
  {
    step: '01',
    name: 'Discover',
    tagline: 'Listening & Spatial Discovery',
    description: 'We begin with an in-depth dialogue examining how you live, your sensory preferences, daily rituals, project budget, and spatial pain points.'
  },
  {
    step: '02',
    name: 'Concept',
    tagline: 'Materiality & Mood Direction',
    description: 'Our team crafts tactile material boards, architectural space plans, and 3D conceptual visualizations that define the mood, tone, and circulation of your home.'
  },
  {
    step: '03',
    name: 'Design',
    tagline: 'Technical Drawings & Curation',
    description: 'We develop millimeter-precise construction documents, custom millwork details, electrical plans, and procure heirloom furniture, lighting, and textiles.'
  },
  {
    step: '04',
    name: 'Transform',
    tagline: 'White-Glove Execution & Styling',
    description: 'We coordinate with trade partners, supervise on-site installations, and perform full white-glove styling down to the final art placement and custom scented candles.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'Trikha Interiors transformed our residence into a sanctuary that feels both deeply rooted in quality craftsmanship and effortlessly modern. Their eye for subtle textures, lighting, and proportion is peerless.',
    author: 'Sarah & David Sterling',
    role: 'Homeowners · Modern Villa',
    project: 'The Urban Villa Overhaul'
  },
  {
    id: 't-2',
    quote: 'The consultation process was the most organized and inspiring client experience we have ever had. From the first design appointment to our final installation, the Trikha team exceeded every expectation.',
    author: 'Dr. Arthur Pendelton',
    role: 'Client · Luxury Duplex',
    project: 'The Contemporary City Home'
  },
  {
    id: 't-3',
    quote: 'They have a rare gift for editing out the noise and focusing on pure quality. Every morning when sunlight hits our kitchen island, we are reminded of their extraordinary craftsmanship.',
    author: 'Genevieve Moreau',
    role: 'Client · Garden Residence',
    project: 'The Modern Organic Residence'
  }
];
