export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  metric: string;
  metricLabel: string;
  category: "lawn" | "hardscape" | "masonry" | "tree" | "sod" | "drainage";
  iconName: "sprout" | "hammer" | "layers" | "tree" | "droplet" | "shovel";
  features: string[];
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: "all" | "hardscape" | "lawn" | "trees" | "drainage";
  categoryLabel: string;
  location: string;
  image: string;
  details: string;
}

export const BUSINESS_INFO = {
  name: "J & Son Landscaping",
  phone: "(704) 791-3793",
  phoneRaw: "7047913793",
  location: "Concord, NC",
  regions: [
    "Concord",
    "Kannapolis",
    "Huntersville",
    "Cornelius",
    "Davidson",
    "Charlotte",
    "Harrisburg"
  ],
  zipCodes: [
    "28025", "28026", "28027", "28081", "28082", "28083", "28078", "28031", "28036", "28269", "28262", "28075"
  ],
  established: 2018,
  owner: "J. Ramirez & Son"
};

export const SERVICES: ServiceItem[] = [
  {
    id: "lawn-maintenance",
    title: "Precision Lawn Care & Mowing",
    shortDesc: "Weekly and bi-weekly manicuring with crisp, straight-stripe finishes.",
    description: "Our core maintenance includes razor-sharp mowing, expert string trimming around all borders, hard trench edging along driveways and walkways, and complete debris blowing. We tailor blade heights to tall fescue or bermuda to keep turf dense, weed-resistant, and vibrant.",
    metric: "100%",
    metricLabel: "Satisfaction Rating",
    category: "lawn",
    iconName: "sprout",
    image: "/images/lawn.jpg",
    features: [
      "Weekly or bi-weekly flexible schedules",
      "Signature straight-line mowing stripes",
      "Hard vertical sidewalk & curb trench edging",
      "Full patio, porch & driveway debris blowing"
    ]
  },
  {
    id: "custom-hardscaping",
    title: "Custom Paver Patios & Walkways",
    shortDesc: "Interlocking concrete, brick, and natural stone outdoor living spaces.",
    description: "Maximize your backyard with custom masonry built for heavy Carolina weather. We lay interlocking concrete and brick pavers over compacted aggregate bases, grade sloped land, and build bespoke stone walkways that resist shifting and cracking.",
    metric: "10+",
    metricLabel: "Year Paver Durability",
    category: "hardscape",
    iconName: "hammer",
    image: "/images/hardscape.jpg",
    features: [
      "Interlocking concrete & brick paver patios",
      "Custom winding flagstone & stone walkways",
      "Crushed stone compacted base stability",
      "Polymeric sand joint stabilization"
    ]
  },
  {
    id: "retaining-walls",
    title: "Stone Retaining Walls & Fire Pits",
    shortDesc: "Structural dry-stack walls, garden tiering, and custom stone firepits.",
    description: "Tame sloped yards and prevent erosion with robust, engineered stone retaining walls. We construct reinforced structural block walls, decorative flower bed tiering, and custom integrated fire pit gathering areas for family evenings.",
    metric: "100%",
    metricLabel: "Erosion Prevention",
    category: "masonry",
    iconName: "layers",
    image: "/images/retaining-wall.jpg",
    features: [
      "Structural dry-stack & mortar retaining walls",
      "Tiered garden walls & terrace leveling",
      "Integrated natural stone firepit hubs",
      "Granite & limestone landscape borders"
    ]
  },
  {
    id: "tree-shrub-care",
    title: "Tree Services, Pruning & Hedging",
    shortDesc: "Expert pruning, structural limb trimming, and safe tree removal.",
    description: "Protect your home and elevate curb appeal. Our skilled team performs precision pruning, deadwood removal, decorative shaping of boxwood hedges, and safe technical takedowns of hazardous trees. We haul away all timber and leave your lawn immaculate.",
    metric: "24/7",
    metricLabel: "Storm Clean-Up Safety",
    category: "tree",
    iconName: "tree",
    image: "/images/tree.jpg",
    features: [
      "Structural limb trimming & deadwood pruning",
      "Formal boxwood & hedge shaping",
      "Hazardous branch removal near rooflines",
      "Complete site cleanup & wood chipping"
    ]
  },
  {
    id: "sod-seeding-aeration",
    title: "Fresh Sod Installation & Aeration",
    shortDesc: "Complete lawn restoration with premium tall fescue or bermuda sod.",
    description: "Tired of patchy dirt and stubborn weeds? We strip old thatch, till in nutrient-rich organic topsoil, grade for proper runoff, and lay fresh-cut North Carolina tall fescue sod. We also provide commercial core aeration and overseeding every autumn.",
    metric: "14 Days",
    metricLabel: "Average Sod Rooting Time",
    category: "sod",
    iconName: "shovel",
    image: "/images/sod.jpg",
    features: [
      "Thorough soil excavation & compost tilling",
      "Fresh-cut certified NC tall fescue sod",
      "Heavy commercial core aeration service",
      "Starter root fertilizer & watering schedule"
    ]
  },
  {
    id: "drainage-irrigation",
    title: "French Drains & Stormwater Grading",
    shortDesc: "Eliminate standing water with custom grading and French drains.",
    description: "Don't let North Carolina summer storms flood your yard or foundation. We diagnose water flow, install subsurface French drains, redirect gutter downspouts underground, and grade slopes away from living spaces to ensure a dry, usable yard.",
    metric: "0L",
    metricLabel: "Standing Water Post-Storm",
    category: "drainage",
    iconName: "droplet",
    image: "/images/drainage.jpg",
    features: [
      "Perforated pipe French drain installation",
      "Underground gutter downspout extensions",
      "Laser yard grading away from foundation",
      "Decorative river rock swales & dry creek beds"
    ]
  }
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "proj-1",
    title: "Full Backyard Landscape & Patio Renovation",
    category: "hardscape",
    categoryLabel: "Backyard Landscaping",
    location: "Concord, NC (Afton Village)",
    image: "/images/hero.jpg",
    details: "Complete backyard transformation featuring flagstone patio, lush turf lawn, and curved flowering garden borders."
  },
  {
    id: "proj-2",
    title: "Bluestone Paver Patio & Entry Walkway",
    category: "hardscape",
    categoryLabel: "Paver Patios",
    location: "Huntersville, NC (Birkdale)",
    image: "/images/hardscape.jpg",
    details: "Installed 450 sq. ft. of interlocking bluestone pavers with laser-leveled base and polymer sand joints."
  },
  {
    id: "proj-3",
    title: "Weekly Suburban Lawn Care & Mowing",
    category: "lawn",
    categoryLabel: "Lawn Mowing",
    location: "Cornelius, NC",
    image: "/images/lawn.jpg",
    details: "Routine weekly turf maintenance with razor-sharp striping, sidewalk blade edging, and weed management."
  },
  {
    id: "proj-4",
    title: "Mature Silver Maple Tree Pruning & Elevation",
    category: "trees",
    categoryLabel: "Tree Pruning",
    location: "Davidson, NC",
    image: "/images/tree.jpg",
    details: "Elevated canopy over roofline, removed structural deadwood, and hauled away all chipped timber."
  },
  {
    id: "proj-5",
    title: "Fresh Tall Fescue Sod Installation on Prepared Soil",
    category: "lawn",
    categoryLabel: "Sod Installation",
    location: "Kannapolis, NC",
    image: "/images/sod.jpg",
    details: "Stripped dead weeds, tilled organic compost, and installed 1,800 sq. ft. of certified fresh-cut Carolina tall fescue sod."
  },
  {
    id: "proj-6",
    title: "Subsurface French Drain & Stormwater Trench",
    category: "drainage",
    categoryLabel: "French Drainage",
    location: "North Charlotte, NC (Highland Creek)",
    image: "/images/drainage.jpg",
    details: "Excavated a 75-foot gravel French drain trench with perforated pipe to divert storm runoff safely away from foundation."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    location: "Concord, NC",
    role: "Verified Homeowner",
    rating: 5,
    text: "J & Son Landscaping completely transformed our backyard. They leveled out a steep slope, installed a gorgeous brick paver patio, and laid down fresh fescue sod. They were punctual, extremely detailed, and tidied up every scrap of debris. 5 stars all the way!",
    date: "August 2026",
    verified: true
  },
  {
    id: "rev-2",
    author: "Sarah Lindquist",
    location: "Huntersville, NC",
    role: "Weekly Maintenance Client",
    rating: 5,
    text: "I've been using J & Son for our weekly lawn care for over a year now. The stripe patterns they mow are absolute perfection, and their edgework along our concrete driveway is razor-clean. Outstanding customer service and communication.",
    date: "September 2026",
    verified: true
  },
  {
    id: "rev-3",
    author: "David Kessler",
    location: "Cornelius, NC",
    role: "Retaining Wall & Drainage Client",
    rating: 5,
    text: "We had a massive pooling issue near our deck. J and his son diagnosed the grading problem, installed a French drain, and built a beautiful natural stone retaining wall. Super honest crew, fair pricing, and clear explanations.",
    date: "July 2026",
    verified: true
  },
  {
    id: "rev-4",
    author: "Elena Rossi",
    location: "Davidson, NC",
    role: "Tree Pruning & Sod Client",
    rating: 5,
    text: "We needed some mature oak limbs pruned back and our front yard completely re-sodded. J & Son gave us a prompt estimate, showed up on time, and did an amazing job. Highly recommend them for anyone in the Charlotte Metro area!",
    date: "June 2026",
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you provide free project estimates?",
    answer: "Yes, absolutely! We provide free, transparent, and itemized estimates for all of our services, including ongoing maintenance, tree work, and custom hardscaping projects. Just give us a call or fill out our online quote form."
  },
  {
    id: "faq-2",
    question: "What areas in the Charlotte Metro do you serve?",
    answer: "Our main base of operations is Concord, NC. However, we regularly serve clients across the entire north Charlotte Metro area, including Kannapolis, Huntersville, Cornelius, Davidson, Harrisburg, and north Charlotte."
  },
  {
    id: "faq-3",
    question: "When is the best time to seed or aerate my Concord lawn?",
    answer: "For our local Tall Fescue lawns (the most popular grass in our region), the absolute best window for core aeration and overseeding is between early September and late October. This allows the roots to establish during the cool fall and winter months."
  },
  {
    id: "faq-4",
    question: "What is your process for installing sod or pavers?",
    answer: "We start with a thorough site preparation—clearing existing weeds, rototilling, and modifying grading for water runoff. For pavers, we lay down a heavily compacted aggregate base and sand to prevent settling. For sod, we apply nutrient-rich topsoil to ensure fast root-locking within 10 to 14 days."
  },
  {
    id: "faq-5",
    question: "Are you licensed and insured?",
    answer: "Yes. J & Son Landscaping is a fully licensed and insured local business. We carry comprehensive general liability insurance so you can have complete peace of mind while we are working on your property."
  }
];
