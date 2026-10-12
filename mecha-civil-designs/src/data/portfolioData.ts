import { PortfolioProject, MaterialSwatch } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'centrum-penthouse',
    title: 'Centrum Penthouse at Motera',
    category: 'residential',
    categoryLabel: 'Luxury Residential',
    subtitle: 'Duplex Penthouse Interior & Structural Balcony Cantilever',
    location: 'Motera, Ahmedabad',
    areaSqFt: 3850,
    year: 2024,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'Commissioned for a leading textile industrialist family at Centrum by Sampad in Motera, this duplex residence celebrates continuous spatial geometry. We merged two upper-level floor plates, introducing a cantilevered teak-and-steel staircase and floor-to-ceiling Italian travertine wall slabs. Customized acoustic baffles conceal high-efficiency HVAC ducting while ambient circadian coves enhance twilight relaxation.',
    scopeOfWork: [
      'Complete civil structural modification & duplex slab cut-out',
      'Italian Botticino marble flooring with brass inlay grid',
      'Bespoke fluted Burma teak wall panelling and concealed doorways',
      'Smart Lutron lighting automation & architectural linear channels',
      'Custom modular chef kitchen with integrated Caesarstone island'
    ],
    specs: {
      materials: ['Italian Botticino Marble', 'Burma Teak Veneer', 'Brushed Brass', 'Fluted Toughened Glass'],
      duration: '5.5 Months',
      executionType: 'Turnkey Civil & Interior',
      areaSqFt: 3850,
      location: 'Motera, Ahmedabad',
      year: 2024
    },
    review: {
      client: 'Sunil & Radhika Patel',
      location: 'Centrum by Sampad, Motera',
      quote:
        'Mecha Civil Designs completely reimagined our penthouse. Their civil engineering background meant they tackled our staircase opening and structural load modifications with absolute confidence. The craftsmanship is flawless.',
      rating: 5
    },
    comparison: {
      renderTitle: 'Initial 3D Architectural Blueprint',
      renderImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      realityTitle: 'Final Turnkey Site Handover',
      realityImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'zenith-corporate-hq',
    title: 'Zenith Corporate HQ',
    category: 'commercial',
    categoryLabel: 'Corporate Workspace',
    subtitle: 'Executive Suite & Collaborative Tech Floor',
    location: 'SG Highway, Ahmedabad',
    areaSqFt: 6200,
    year: 2024,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'Engineered for an Ahmedabad-based enterprise logistics firm, this workspace balances high-density ergonomic hot-desks with quiet acoustic executive enclaves. We designed custom timber slat acoustic ceiling canopies that hide fire sprinklers and linear air diffusers, paired with switchable PDLC smart glass partitions for executive privacy at the touch of a button.',
    scopeOfWork: [
      'Complete civil floor reorganization and demising glass partitions',
      'Custom acoustic ceiling baffles and micro-perforated wall finishes',
      'Under-floor power busbar distribution and server room fire suppression',
      'Executive boardroom with 18-seat bespoke walnut conference table',
      'Biophilic indoor courtyard break zone with preserved moss walls'
    ],
    specs: {
      materials: ['Acoustic PET Timber Slats', 'Black Anodized Aluminum', 'Smoked Oak', 'Switchable Smart Glass'],
      duration: '3.5 Months',
      executionType: 'Turnkey Commercial Execution',
      areaSqFt: 6200,
      location: 'SG Highway, Ahmedabad',
      year: 2024
    },
    review: {
      client: 'Rajiv Mehta (Managing Director)',
      location: 'SG Highway, Ahmedabad',
      quote:
        'Delivering a 6,200 sq.ft office in under 4 months without a single day of handover delay was remarkable. The acoustic isolation in our conference rooms is world-class.',
      rating: 5
    },
    comparison: {
      renderTitle: 'BIM & 3D Lighting Simulation',
      renderImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      realityTitle: 'Executed Working Workspace',
      realityImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'aura-fine-jewels',
    title: 'Aura Fine Jewels Boutique',
    category: 'retail',
    categoryLabel: 'Retail & Showroom',
    subtitle: 'High-Jewelry Showroom & Private Viewing Vault',
    location: 'CG Road, Ahmedabad',
    areaSqFt: 1850,
    year: 2023,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'Designing for high-value diamond and gold jewelry requires lighting precision and strict physical security. We engineered custom reinforced civil masonry vaults and bullet-resistant display showcases finished in brushed champagne brass. Gentle Venetian lime plaster archways soften the interior while 98 CRI museum-grade spotlights reveal diamond fire with zero chromatic distortion.',
    scopeOfWork: [
      'Civil vault room construction and reinforced security masonry',
      'Custom curved stucco arches and Venetian lime plaster application',
      'Bespoke brass and anti-reflective low-iron glass showcase fabrication',
      'High-CRI 98+ focused track lighting for jewelry sparkle evaluation',
      'Private VIP consultation lounge with acoustically insulated doors'
    ],
    specs: {
      materials: ['Champagne Brushed Brass', 'Venetian Lime Stucco', 'Low-Iron Crystal Glass', 'Navona Travertine'],
      duration: '2.5 Months',
      executionType: 'Boutique Turnkey Fit-Out',
      areaSqFt: 1850,
      location: 'CG Road, Ahmedabad',
      year: 2023
    },
    review: {
      client: 'Bhavin Shah (Founder)',
      location: 'CG Road, Ahmedabad',
      quote:
        'Our clients frequently compliment the opulent yet minimalist ambience. Mecha Civil Designs handled both the heavy structural civil security needs and the delicate artistic jewelry showcases seamlessly.',
      rating: 5
    }
  },
  {
    id: 'gulmohar-sanctuary-villa',
    title: 'Gulmohar Sanctuary Villa',
    category: 'residential',
    categoryLabel: 'Luxury Residential',
    subtitle: 'Turnkey Civil Architecture & Biophilic Interior',
    location: 'Sanand / Bopal, Ahmedabad',
    areaSqFt: 4600,
    year: 2024,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'A sprawling suburban retreat designed with exposed board-marked concrete civil columns, double-height living spaces, and natural kota stone transitions. The central living pavilion features an integrated internal water feature that cools the desert summer breeze through evaporative micro-drafts.',
    scopeOfWork: [
      'Architectural civil foundation, slab casting and elevation expansion',
      'Natural polished Kota stone and warm teakwood decking transitions',
      'Custom solid teak furniture millwork and wardrobe architecture',
      'Double-height motorized sheer linen track systems',
      'Integrated solar thermal and energy-efficient heat-pump hot water'
    ],
    specs: {
      materials: ['Board-Marked Concrete', 'Solid Teakwood', 'Polished Kota Stone', 'Linen Textures'],
      duration: '8 Months',
      executionType: 'Civil Expansion & Full Interior',
      areaSqFt: 4600,
      location: 'Sanand / Bopal, Ahmedabad',
      year: 2024
    },
    review: {
      client: 'Dr. Hardik & Neha Dave',
      location: 'Sanand, Ahmedabad',
      quote:
        'From civil excavation to the final throw pillow, Mecha Civil Designs was our single point of contact. Their transparency with bill of quantities and civil drawings saved us months of stress.',
      rating: 5
    }
  },
  {
    id: 'signature-3bhk-chandkheda',
    title: 'The Haven 3BHK Residence',
    category: 'residential',
    categoryLabel: 'Modern Apartment',
    subtitle: 'Space-Optimized Urban Haven with Modular Precision',
    location: 'Chandkheda, Ahmedabad',
    areaSqFt: 1850,
    year: 2023,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'Located minutes away from our Chandkheda studio, this 3BHK redesign transformed a standard builder floor into an open, Scandinavian-inspired haven. We removed non-structural partition walls between kitchen and dining to create a connected family hub with concealed pantry storage and customized study alcoves.',
    scopeOfWork: [
      'Internal partition removal and lintel beam reinforcement',
      'Seamless microcement flooring across living and dining',
      'PU matte finish modular cabinetry with Blum soft-close hardware',
      'Concealed magnetic profile lighting channels in Gyproc false ceiling',
      'Custom fluted wall feature behind master bedroom headboard'
    ],
    specs: {
      materials: ['Matte PU Lacquer', 'Warm Birch Ply', 'Microcement', 'Recessed Aluminium Profiles'],
      duration: '70 Days',
      executionType: 'Turnkey Residential Remodel',
      areaSqFt: 1850,
      location: 'Chandkheda, Ahmedabad',
      year: 2023
    },
    review: {
      client: 'Amit & Kripa Trivedi',
      location: 'Chandkheda, Ahmedabad',
      quote:
        'Being in Chandkheda, they were on our site daily monitoring workers. The attention to detail in carpentry alignment and electrical wiring was phenomenal.',
      rating: 5
    }
  },
  {
    id: 'solitaire-clinic-science-city',
    title: 'Solitaire Wellness & Dental Studio',
    category: 'commercial',
    categoryLabel: 'Healthcare & Wellness',
    subtitle: 'Biophilic Clinical Architecture with Seamless Surfaces',
    location: 'Science City Road, Ahmedabad',
    areaSqFt: 2100,
    year: 2023,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'A patient-centric clinical environment designed to eliminate medical anxiety. Seamless antimicrobial Corian surfaces, soft organic curved corridors, and hidden acoustic baffles create a serene, spa-like experience while meeting strict medical sterilisation regulations.',
    scopeOfWork: [
      'Medical plumbing line isolation and underground suction conduits',
      'Curved drywall partitioning with anti-bacterial paint coating',
      'Seamless DuPont Corian reception desk and treatment cabinetry',
      'Calming indirect perimeter lighting with warm color temperature',
      'Acoustic soundproofing between patient consultation suites'
    ],
    specs: {
      materials: ['DuPont Corian', 'Curved Fluted Glass', 'Acoustic Rockwool', 'Anti-Bacterial Vinyl'],
      duration: '60 Days',
      executionType: 'Turnkey Clinical Fit-Out',
      areaSqFt: 2100,
      location: 'Science City, Ahmedabad',
      year: 2023
    },
    review: {
      client: 'Dr. Ananya Shah (Cosmetic Specialist)',
      location: 'Science City, Ahmedabad',
      quote:
        'Patients immediately comment on the peaceful atmosphere. Mecha Civil handled the complex dental compressor piping and civil suction trenches without a hitch.',
      rating: 5
    }
  },
  {
    id: 'heritage-bungalow-remodel',
    title: 'Navrangpura Villa Civil Retrofit',
    category: 'civil-renovation',
    categoryLabel: 'Civil Renovation',
    subtitle: 'Structural Strengthening & Modern Heritage Fusion',
    location: 'Navrangpura, Ahmedabad',
    areaSqFt: 3400,
    year: 2024,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    architecturalConcept:
      'A 35-year-old traditional residential bungalow upgraded through comprehensive civil retrofitting. We inserted structural steel I-beams to open up cramped load-bearing masonry walls, redid the entire roof waterproofing membrane, and layered timeless teakwood interiors over refreshed thermal insulation.',
    scopeOfWork: [
      'Structural micro-piling and steel I-beam lintel insertions',
      'Complete civil demolition of internal walls with jackhammer precision',
      'High-grade polymer waterproofing and thermal roof screeding',
      'Restoration of antique jali screens blended into modern interior panels',
      'All-new concealed plumbing with high-pressure booster systems'
    ],
    specs: {
      materials: ['Structural Grade ISMB 250 Steel', 'Reclaimed Teakwood', 'Terrazzo Flooring', 'Brass Jali Screens'],
      duration: '6 Months',
      executionType: 'Civil Retrofitting & Interior Architecture',
      areaSqFt: 3400,
      location: 'Navrangpura, Ahmedabad',
      year: 2024
    },
    review: {
      client: 'Ketan & Sangeeta Joshi',
      location: 'Navrangpura, Ahmedabad',
      quote:
        'Most interior designers refused to touch a 35-year-old house because of structural risks. Mecha Civil Designs are civil engineers first — they reinforced the columns, opened up the floorplan, and gave us our dream home.',
      rating: 5
    },
    comparison: {
      renderTitle: 'Initial Cracked Civil Shell',
      renderImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      realityTitle: 'Reinforced Turnkey Luxury Home',
      realityImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    }
  }
];

export const MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: 'travertine-navona',
    name: 'Italian Navona Travertine',
    category: 'Stone & Marble',
    origin: 'Tivoli, Italy',
    description: 'Porous warm ivory stone with natural linear calcite veins. Unfilled & honed for soft architectural depth.',
    finishType: 'Honed & Sealed Matte',
    recommendedUse: 'Feature accent walls, cantilevered fireplace surrounds, and master bath vanity backsplashes.',
    colorHex: '#e8dec8',
    texturePattern: 'linear-vein'
  },
  {
    id: 'fluted-burma-teak',
    name: 'Fluted Burma Teak',
    category: 'Wood & Veneers',
    origin: 'Sustainably Farmed Teak',
    description: 'Golden-honey architectural hardwood milled into 18mm fluted acoustic slats. Natural water and termite resistance.',
    finishType: 'Dead Matte Natural PU Oil',
    recommendedUse: 'Acoustic dining ceilings, master bed headboard panels, concealed walk-in closet doors.',
    colorHex: '#9a6b3e',
    texturePattern: 'wood-grain'
  },
  {
    id: 'calacatta-gold-marble',
    name: 'Calacatta Gold Slabs',
    category: 'Stone & Marble',
    origin: 'Carrara, Italy',
    description: 'Luminous milky white base with dramatic warm gold and graphite veining. Bookmatched with microscopic seams.',
    finishType: 'Satin Silk Honed',
    recommendedUse: 'Monolithic kitchen waterfall islands, powder room consoles, executive boardroom credenzas.',
    colorHex: '#f5f2eb',
    texturePattern: 'bold-marble'
  },
  {
    id: 'brushed-champagne-brass',
    name: 'Brushed Champagne Brass',
    category: 'Metals',
    origin: 'Precision Custom Alloy',
    description: 'Electro-plated architectural brass treated with directional hairline brushing and anti-tarnish protective lacquer.',
    finishType: 'Hairline Satin Brushed',
    recommendedUse: 'Cabinetry pulls, showcase trim frames, partition fluted glass dividers, bathroom accents.',
    colorHex: '#caba94',
    texturePattern: 'metallic-sheen'
  },
  {
    id: 'stucco-veneziano',
    name: 'Lime Plaster (Stucco)',
    category: 'Surfaces & Glass',
    origin: 'Natural Slaked Lime, Verona',
    description: 'Breathable, eco-friendly mineral wall plaster applied by hand trowel in 4 whisper-thin burnished coats.',
    finishType: 'Soft Satin Trowel',
    recommendedUse: 'Double-height stairwell walls, bedroom accent backdrops, curved archways.',
    colorHex: '#d6cfc5',
    texturePattern: 'mineral-cloud'
  },
  {
    id: 'smoked-fluted-glass',
    name: 'Smoked Fluted Glass',
    category: 'Surfaces & Glass',
    origin: 'Architectural Toughened Glazing',
    description: 'Bronze-smoked tempered glass with 12mm reeded vertical corrugations for elegant diffused privacy.',
    finishType: 'Fluted Bronze Tint',
    recommendedUse: 'Walk-in wardrobe shutters, bathroom shower privacy screens, office meeting room partitions.',
    colorHex: '#524c44',
    texturePattern: 'reeded-glass'
  }
];

export const STUDIO_DETAILS = {
  name: 'Mecha Civil Designs',
  tagline: 'Interior Architecture & Turnkey Civil Engineering',
  establishedYear: 2014,
  experienceYears: 10,
  address: {
    line1: '231, Second Floor, Orange Mall',
    landmark: 'Nr. Sharda Petrol Pump, Nigam Nagar',
    city: 'Chandkheda, Ahmedabad',
    state: 'Gujarat',
    pincode: '382424',
    country: 'India'
  },
  phone: '+91 97259 35504',
  phoneDisplay: '+91 97259 35504',
  email: 'connect@mechacivildesigns.com',
  secondaryEmail: 'mecha.civil@outlook.com',
  mapsUrl: 'https://maps.app.goo.gl/w3v9J1vB3QnAJm7Z9',
  workingHours: {
    weekdays: 'Monday – Saturday: 10:00 AM – 7:30 PM',
    sunday: 'Sunday: By Prior Appointment Only'
  },
  socials: {
    whatsapp: 'https://wa.me/919725935504',
    instagram: '#',
    linkedin: '#'
  }
};
