import { ServiceItem, ReviewItem, TransformationItem, BusinessHours, FAQItem } from '../types';

export const BUSINESS_INFO = {
  name: "JP Lawn and Landscaping",
  shortName: "JP Landscaping",
  phone: "(704) 490-1161",
  phoneRaw: "+17044901161",
  email: "jplandscaping2113@gmail.com",
  address: "1400 Birch St",
  city: "Kannapolis",
  state: "NC",
  zip: "28081",
  fullAddress: "1400 Birch St, Kannapolis, NC 28081",
  mapsUrl: "https://maps.app.goo.gl/urRZWgvWDpGScGdB8",
  coordinates: {
    lat: 35.4960771,
    lng: -80.6456813,
  },
  yearsInBusiness: "10+",
  rating: 5.0,
  reviewCount: 42,
  licenseNote: "Licensed & Fully Insured in North Carolina",
  tagline: "Kannapolis & Concord's Premier Lawn Care, Hardscaping & Landscaping Experts",
  subheading: "From precision weekly lawn mowing and fresh sod installation to custom paver patios and expert tree trimming, we treat your property with the pride of a local family business.",
};

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: "Monday", hours: "7:00 AM – 7:00 PM" },
  { day: "Tuesday", hours: "7:00 AM – 7:00 PM" },
  { day: "Wednesday", hours: "7:00 AM – 7:00 PM" },
  { day: "Thursday", hours: "7:00 AM – 7:00 PM" },
  { day: "Friday", hours: "7:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "7:00 AM – 7:00 PM" },
  { day: "Sunday", hours: "Closed (Emergency Requests Only)" },
];

export const SERVICE_AREAS = [
  { name: "Kannapolis", county: "Cabarrus/Rowan", primary: true },
  { name: "Concord", county: "Cabarrus", primary: true },
  { name: "China Grove", county: "Rowan", primary: true },
  { name: "Landis", county: "Rowan", primary: true },
  { name: "Huntersville", county: "Mecklenburg", primary: false },
  { name: "Mooresville", county: "Iredell", primary: false },
  { name: "Salisbury", county: "Rowan", primary: false },
  { name: "Davidson", county: "Mecklenburg", primary: false },
  { name: "Harrisburg", county: "Cabarrus", primary: false },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "lawn-maintenance",
    title: "Lawn Mowing & Precision Edging",
    category: "lawn",
    shortDesc: "Regular weekly or bi-weekly mowing, sharp blade edging along driveways and walkways, line trimming, and clean air blowing.",
    fullDesc: "Keep your lawn looking like a golf fairway all season long. Our crew uses commercial-grade mowers with sharpened blades, meticulous edging along concrete borders, string trimming around trees and fences, and thorough debris blow-off.",
    features: [
      "Weekly & Bi-Weekly schedule options",
      "Razor-sharp hard-surface edging",
      "Weed trimming along fence lines & beds",
      "Thorough driveway & patio blowdown",
      "No long-term contracts required"
    ],
    image: "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "Starting at $45 / visit",
    popular: true,
  },
  {
    id: "hardscaping-pavers",
    title: "Paver Patios, Walkways & Retaining Walls",
    category: "hardscape",
    shortDesc: "Transform your outdoor living area with durable stone paver patios, welcoming walkways, sturdy retaining walls, and custom fire pits.",
    fullDesc: "Hardscaping is our specialty craft. We engineer proper crushed stone base compaction and drainage for heavy North Carolina clay soil, laying interlocking pavers that never sink or shift.",
    features: [
      "Custom paver patios & outdoor living rooms",
      "Segmental retaining walls & sitting walls",
      "Front walkways & flagstone stepping paths",
      "Outdoor fire pits & stone borders",
      "Engineered base preparation & polymeric sand"
    ],
    image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "Custom quotes with 3D design",
    popular: true,
  },
  {
    id: "sod-installation",
    title: "Sod Installation & Lawn Renovation",
    category: "sod",
    shortDesc: "Instant, lush green yard transformation with premium Bermuda, Tall Fescue, or Zoysia sod tailored for NC climate.",
    fullDesc: "Tired of stubborn weeds, bare dirt patches, and patchy grass? Our sod installation team strips existing weeds, grades your soil, adds rich compost amendments, rolls fresh sod farm-direct, and rolls it flat for seamless root contact.",
    features: [
      "Bermuda, Tall Fescue & Zoysia sod varieties",
      "Existing grass & weed removal with sod cutter",
      "Precision soil grading & drainage slope correction",
      "Soil enrichment & starter fertilization",
      "Comprehensive watering & care guidelines"
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "From $1.10 - $1.85 / sq.ft installed",
    popular: true,
  },
  {
    id: "tree-service",
    title: "Tree Trimming & Shrub Shaping",
    category: "tree",
    shortDesc: "Safe tree pruning, branch thinning, canopy raising, hedge shaping, storm damage removal, and small tree takedowns.",
    fullDesc: "Protect your roof, siding, and power lines while keeping your landscape trees healthy and balanced. We trim dead branches, shape shrubs into crisp geometries, and haul away all limbs and brush.",
    features: [
      "Tree canopy raising & safety clearing",
      "Deadwood & hazard branch removal",
      "Ornamental tree & crape myrtle pruning",
      "Hedge, boxwood & shrub precision shaping",
      "Complete limb chipping & debris hauling"
    ],
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "On-site assessment & free quote",
  },
  {
    id: "mulch-pine-straw",
    title: "Mulch, Pine Straw & Garden Beds",
    category: "seasonal",
    shortDesc: "Deep trench edging and fresh installation of triple-shredded hardwood mulch, designer black mulch, or longleaf pine straw.",
    fullDesc: "Give your home immediate curb appeal while insulating plant roots and preventing weed growth. We create crisp spade-dug bed edges, apply weed pre-emergent, and spread consistent 3-inch layers of premium organic mulch or pine needles.",
    features: [
      "Triple-shredded brown, black & red hardwood mulch",
      "Premium NC longleaf pine straw tucking",
      "Deep spade-cut garden bed trench edging",
      "Pre-emergent weed suppression & fabric options",
      "Decorative river rock & pebble installations"
    ],
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "Starting at $75 / yard installed",
  },
  {
    id: "landscape-design",
    title: "Landscape Design & Planting",
    category: "hardscape",
    shortDesc: "Complete front yard revamps, perennial flower bed installations, privacy hedge planting, and decorative boulder placement.",
    fullDesc: "Whether you're building a brand new house in Kannapolis or updating an older garden in Concord, our team picks climate-resilient plants, flowering perennials, and flowering trees that thrive in NC zone 7/8.",
    features: [
      "Custom plant selection for NC soil and sunlight",
      "Privacy hedges (Emerald Green Arborvitae, Cherry Laurel)",
      "Flower bed planting & seasonal color",
      "Decorative landscape boulders & accents",
      "Drip irrigation line setup"
    ],
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "Personalized custom design",
  },
  {
    id: "seasonal-cleanups",
    title: "Spring & Fall Yard Cleanups",
    category: "seasonal",
    shortDesc: "Total leaf removal, perennial cutbacks, storm debris haul-away, bed clearing, and winterization for healthy seasonal transitions.",
    fullDesc: "Don't let autumn leaves suffocate your lawn or spring weeds take over your mulch beds. We bring commercial leaf vacuums and blowers to clear lawns, flower beds, walkways, and gutters in one swift visit.",
    features: [
      "Full yard leaf blowing, vacuuming & haul-away",
      "Spring dead-growth clearing & bed prep",
      "Storm branch and brush removal",
      "Gutter clearing & downspout checks",
      "One-time seasonal overhauls"
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "Affordable flat-rate estimates",
  },
  {
    id: "grading-drainage",
    title: "Yard Grading & French Drains",
    category: "hardscape",
    shortDesc: "Eliminate standing water, soggy turf, and water pooling near your foundation with laser grading and buried French drain pipes.",
    fullDesc: "Standing water ruins grass and threatens home foundations. We solve drainage issues across Cabarrus and Rowan counties using heavy equipment grading, catch basins, gravel-packed perforated pipes, and pop-up emitters.",
    features: [
      "French drain installation with geotextile fabric",
      "Downspout burial & water diversion",
      "Skid-steer yard leveling & slope correction",
      "Catch basin & swale construction",
      "Topsoil spreading & compaction"
    ],
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=800&q=80",
    priceEstimate: "Free on-site engineering check",
  },
];

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "trans-1",
    title: "Complete Sod Renovation & Mulch Beds",
    category: "Sod & Landscaping",
    location: "Kannapolis, NC (Near Irish Creek)",
    description: "Stripped weed-choked dirt yard, regraded for water runoff, installed fresh Tall Fescue sod, and created deep-trench black mulch beds with boxwood shrubs.",
    beforeImage: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=800&q=80",
    duration: "2 Days",
  },
  {
    id: "trans-2",
    title: "Custom Paver Patio with Fire Pit",
    category: "Hardscaping",
    location: "Concord, NC (Afton Village)",
    description: "Replaced an uneven eroding slope with a 450 sq.ft interlocking paver patio, integrated curved sitting wall, and stone fire pit for family gatherings.",
    beforeImage: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    duration: "4 Days",
  },
  {
    id: "trans-3",
    title: "Overgrown Yard Clearing & Fresh Lawn",
    category: "Cleanups & Tree Work",
    location: "China Grove, NC",
    description: "Removed 15 dead saplings, brush overgrowth, trimmed hanging oak branches, and restored crisp manicured turf lines with dark brown triple-shredded mulch.",
    beforeImage: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    duration: "1 Day",
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "David M.",
    rating: 5,
    date: "2 weeks ago",
    service: "Lawn Mowing & Edging",
    location: "Kannapolis, NC",
    text: "JP Lawn and Landscaping has been maintaining our property for 2 years now. Joel and his crew are always on time, polite, and their edging along our driveway is razor-sharp. Our neighbors constantly ask who cuts our grass. Highly recommended!",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Sarah Jenkins",
    rating: 5,
    date: "1 month ago",
    service: "Paver Patio & Fire Pit",
    location: "Concord, NC",
    text: "We hired JP to build an outdoor paver patio and retaining wall in our backyard. They worked tirelessly through the week, paid unbelievable attention to the base leveling, and the finished patio looks like something out of a luxury magazine. Honest pricing and outstanding work.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Marcus Vance",
    rating: 5,
    date: "2 months ago",
    service: "Sod Installation",
    location: "Kannapolis, NC",
    text: "Our yard was full of weeds and clay after construction. JP Lawn and Landscaping scraped the old junk, brought in fresh topsoil, and laid lush Bermuda sod in one weekend. Six weeks later, it is green, thick, and healthy. Best landscaping company in Cabarrus County.",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Linda & Tom R.",
    rating: 5,
    date: "3 months ago",
    service: "Tree Trimming & Mulch",
    location: "Salisbury, NC",
    text: "Called them on a Tuesday for tree limb removal and 10 yards of black mulch. They came out that evening for an estimate, gave a great quote, and completed the job by Friday. Cleaned up every last leaf and twig. Outstanding service!",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Brandon K.",
    rating: 5,
    date: "4 months ago",
    service: "Spring Yard Cleanup & Pruning",
    location: "Huntersville, NC",
    text: "Top pro on Thumbtack and Google for a reason. Great communication, transparent pricing, and they truly respect your property. Will continue to use them for all our outdoor projects.",
    verified: true,
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "How do I get a free estimate for my lawn or landscaping project?",
    answer: "Getting a quote is fast and hassle-free! You can call or text us directly at (704) 490-1161, use our online Instant Quote form on this page, or try our interactive Sod & Material Calculator. For most regular lawn mowing and mulch projects, we can provide same-day pricing. For custom paver patios or large grading jobs, we'll visit your property in Kannapolis or Concord for a free on-site consultation."
  },
  {
    question: "Do you require long-term contracts for residential lawn mowing?",
    answer: "No contracts required! We believe in earning your business with every single visit. You can choose weekly or bi-weekly maintenance and pause or cancel anytime with simple notice."
  },
  {
    question: "What areas around Kannapolis and Concord do you serve?",
    answer: "We proudly serve Kannapolis, Concord, China Grove, Landis, Salisbury, Huntersville, Mooresville, Harrisburg, and surrounding towns throughout Cabarrus and Rowan Counties."
  },
  {
    question: "Which type of sod is best for North Carolina yards?",
    answer: "It depends on sunlight and your lifestyle. Tall Fescue stays green year-round and handles moderate shade well. Bermuda grass loves full North Carolina summer sun and handles heavy foot traffic and pets. Zoysia offers a thick carpet-like feel with great drought resistance. We assess your yard's soil, shade, and drainage to recommend the ideal turf."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes, JP Lawn and Landscaping is fully licensed and carries comprehensive liability insurance. You can rest easy knowing your home, landscaping, and property are in safe, professional hands."
  },
  {
    question: "How soon can you start our project?",
    answer: "For weekly lawn mowing, we can usually slot you in within 24 to 48 hours. Mulch, pine straw, and seasonal cleanups are typically scheduled within 3 to 5 business days. Paver and hardscaping installations are scheduled following your approved design."
  },
];
