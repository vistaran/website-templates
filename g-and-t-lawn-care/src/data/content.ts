import { ServiceItem, TestimonialItem, GalleryItem, FaqItem } from '../types';

export const BUSINESS_INFO = {
  name: 'G & T Lawn Care',
  tagline: 'Precision Lawn Care, Crisp Edging & Reliable Mowing Across Gastonia.',
  subHeadline: 'Temperatures are hot 🔥 — if you need your grass cut, call for a free quote today! Serving Gastonia, Belmont & Gaston County.',
  phone: '(716) 462-3657',
  phoneRaw: '7164623657',
  email: 'estimates@gtlawncarenc.com',
  address: '940 Etta Pl, Gastonia, NC 28054',
  primaryLocation: 'Gastonia, NC',
  primaryZip: '28054',
  serviceRadiusMiles: 20,
  mapsUrl: 'https://maps.app.goo.gl/mfeookeDQUqKc27n9',
  hours: {
    weekdays: '8:00 AM - 6:00 PM',
    saturday: '8:00 AM - 6:00 PM',
    sunday: '8:00 AM - 6:00 PM',
    display: 'Mon - Sun: 8:00 AM - 6:00 PM'
  },
  googleRating: 5.0,
  reviewCount: 38,
  socialLinks: {
    facebook: '',
    instagram: ''
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'lawn-mowing',
    title: 'Routine Lawn Mowing & Striping',
    shortDesc: 'Weekly and bi-weekly manicured grass cutting with razor-clean stripe finishes.',
    fullDesc: 'Keep your Gastonia lawn looking lush, uniform, and healthy all season. Every visit includes precision rotary cutting at the proper grass height, crisp string trimming around fences and obstacles, and full debris blowing off driveways and patios.',
    iconName: 'Scissors',
    isSpecialty: true,
    features: [
      'Sharp blade cutting at optimal seasonal heights',
      'Vertical sidewalk & driveway hard edging included',
      'String weed-whacking along perimeters & fences',
      'Thorough blower cleanup of clippings & surfaces',
      'Flexible weekly & bi-weekly route schedules',
      'Gate security check before leaving property'
    ],
    startingPrice: 'Free On-Site Quote',
    popularFor: 'Consistent weekly or bi-weekly yard care'
  },
  {
    id: 'edging-trimming',
    title: 'Precision Blade Edging & Trimming',
    shortDesc: 'Deep 90-degree vertical trench borders along concrete, walkways, and driveways.',
    fullDesc: 'The secret to unmatched curb appeal is crisp border lines. We trench clean vertical edges along concrete driveways, stone pathways, and flowerbeds to eliminate grass encroachment and produce sharp lines.',
    iconName: 'Sparkles',
    features: [
      'Crisp vertical edge trenches along sidewalks',
      'Driveway and curb line definition',
      'Flower bed and mulch perimeter trenching',
      'Detail weed-trimming around mailbox & AC units',
      'Clean separation between turf and hardscapes'
    ],
    startingPrice: 'Included with Mowing Plans',
    popularFor: 'Immaculate curb appeal & sidewalk definition'
  },
  {
    id: 'hedge-shrub-care',
    title: 'Hedge & Shrub Trimming',
    shortDesc: 'Sculpting, pruning, and shaping boxwoods, ornamental shrubs, and foundation bushes.',
    fullDesc: 'Maintain healthy plant development and neat aesthetics. We prune dead branches, shape boxwoods, trim unruly ornamental shrubbery, and haul away all foliage trimmings so your foundation beds remain orderly.',
    iconName: 'Trees',
    features: [
      'Formal boxwood & shrub pruning',
      'Deadwood & damaged branch removal',
      'Seasonal shaping of ornamental bushes',
      'Clearance trimming away from siding & windows',
      'Complete foliage rake-up & off-site hauling'
    ],
    startingPrice: 'Custom Project Quotes',
    popularFor: 'Spring & Fall yard cleanups, curb enhancement'
  },
  {
    id: 'property-cleanups',
    title: 'Property Clean-ups & Debris Removal',
    shortDesc: 'Heavy leaf raking, storm branch clearing, overgrown brush cutting, and seasonal overhauls.',
    fullDesc: 'When heavy autumn leaves pile up or summer thunderstorms leave limbs across your lawn, G & T Lawn Care restores order. We rake, bag, vacuum, and haul away natural green waste so your turf can breathe and thrive.',
    iconName: 'Truck',
    features: [
      'Seasonal autumn leaf collection & vacuuming',
      'Storm debris & fallen limb removal',
      'Overgrown grass & thicket clearing',
      'Flowerbed cleanout & dead foliage removal',
      'Full green waste haul-away & site blowout'
    ],
    startingPrice: 'One-time & seasonal quotes',
    popularFor: 'Fall leaf cleanup, Spring revivals, storm recovery'
  },
  {
    id: 'mulch-pinestraw',
    title: 'Mulch & Pine Straw Bed Refresh',
    shortDesc: 'Enhancing soil moisture, suppressing weeds, and delivering dark rich landscape contrast.',
    fullDesc: 'Protect your plants during hot Carolina summers with fresh mulch or golden longleaf pine straw. Mulching retains critical soil moisture, regulates root temperatures, chokes weeds, and makes flowerbeds pop with vibrant contrast.',
    iconName: 'Leaf',
    features: [
      'Thorough bed weeding and pre-emergent treatment',
      'Clean 3-inch trench edges to prevent mulch washout',
      'Premium triple-shredded dark brown hardwood mulch',
      'Clean, hand-tucked longleaf pine straw needles',
      'Smooth, even distribution around tree drip lines'
    ],
    startingPrice: 'By cubic yard / roll',
    popularFor: 'Annual spring refresh & moisture retention'
  },
  {
    id: 'aeration-seeding',
    title: 'Core Aeration & Overseeding',
    shortDesc: 'Relieving compacted red clay and establishing thick, weed-resistant Carolina turf.',
    fullDesc: 'Piedmont clay soil becomes densely compacted over time, starving grass roots of air and water. Our heavy core aerators pull soil plugs to relieve compaction, followed by premium seed and starter fertilizer for thick grass.',
    iconName: 'Sprout',
    features: [
      'Commercial deep-core plug aeration',
      'Relief of compacted Gastonia clay soil',
      'High-germination certified Tall Fescue or Bermuda seed',
      'Starter fertilizer application for rapid rooting',
      'Detailed post-aeration watering instructions'
    ],
    startingPrice: 'Seasonal package',
    popularFor: 'Fall lawn restoration & filling thin patches'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Jason Miller',
    location: 'Gastonia, NC (Etta Pl Area)',
    date: 'Verified Google Review',
    rating: 5,
    text: 'G & T Lawn Care did an exceptional job on our overgrown yard! They showed up promptly, gave a very fair quote, and the grass cutting was immaculate. The edging along our driveway looks like it was cut with a laser. Very polite and hardworking crew.',
    serviceUsed: 'Weekly Lawn Mowing & Edging',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Brenda Kessler',
    location: 'Belmont, NC',
    date: 'Verified Google Review',
    rating: 5,
    text: 'Temperatures were brutal this summer and our lawn got out of hand. I called G & T Lawn Care and they responded immediately. They took care of the mowing, trimmed all the bushes, and blew away every stray blade of grass. 10/10 recommend to anyone in Gaston County!',
    serviceUsed: 'Lawn Care & Shrub Trimming',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Robert Thornton',
    location: 'Gastonia, NC (Cramer Mountain)',
    date: 'Verified Google Review',
    rating: 5,
    text: 'Reliable lawn maintenance is so hard to find nowadays, but G & T Lawn Care has been flawless. They come on schedule every week, do clean work, and always make sure my gates are latched for our dogs. Top-tier service.',
    serviceUsed: 'Routine Maintenance & Trimming',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Angela Hayes',
    location: 'Mount Holly, NC',
    date: 'Verified Google Review',
    rating: 5,
    text: 'Had a lot of storm debris and high grass in the backyard. G & T gave me a free quote on the spot and had the entire yard cleared and beautifully cut by the next afternoon. Great communication and fair pricing.',
    serviceUsed: 'Yard Cleanup & Grass Cutting',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'proj-1',
    title: 'Precision Striped Lawn & Edge Trenches',
    category: 'cleanup',
    description: 'Weekly mowing service featuring signature diamond stripe pattern, hard blade edging along concrete driveway, and debris blowout.',
    beforeImg: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    afterImg: '/image.png',
    altText: 'Lawn mowing and straight stripe cutting in Gastonia NC',
    locationTag: 'Gastonia, NC · 28054'
  },
  {
    id: 'proj-2',
    title: 'Dark Mulch Beds & Shrub Shaping',
    category: 'mulch',
    description: 'Weeded overgrown garden beds, cut clean 3-inch spade trenches, and installed 4 yards of rich dark brown hardwood mulch with formal boxwood pruning.',
    beforeImg: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=800&q=80',
    altText: 'Dark hardwood mulch installation and shrub trimming in Belmont NC',
    locationTag: 'Belmont, NC · 28012'
  },
  {
    id: 'proj-3',
    title: 'Overgrown Property Clearing & Cleanup',
    category: 'cleanup',
    description: 'Cleared knee-high overgrown grass, trimmed perimeter briars, collected storm limbs, and restored pristine turf order.',
    beforeImg: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
    altText: 'Property cleanup and heavy brush removal in Gastonia',
    locationTag: 'South Gastonia · 28056'
  }
];

export const SERVICE_AREAS = [
  { zip: '28054', name: 'East Gastonia / Etta Pl (HQ)', primary: true },
  { zip: '28052', name: 'West Gastonia / Downtown', primary: true },
  { zip: '28056', name: 'South Gastonia / Cramer Mtn', primary: true },
  { zip: '28012', name: 'Belmont', primary: true },
  { zip: '28034', name: 'Dallas', primary: true },
  { zip: '28077', name: 'Ranlo / McAdenville', primary: true },
  { zip: '28098', name: 'Lowell', primary: false },
  { zip: '28032', name: 'Cramerton', primary: false },
  { zip: '28120', name: 'Mount Holly', primary: false },
  { zip: '28086', name: 'Kings Mountain', primary: false },
  { zip: '28016', name: 'Bessemer City', primary: false },
  { zip: '28164', name: 'Stanley', primary: false }
];

export const FAQS: FaqItem[] = [
  {
    question: 'How quickly can I get a free quote for my grass cutting?',
    answer: 'We provide fast, free estimates! Simply call or text us at (716) 462-3657 or submit our online form. For most homes in Gastonia and Belmont, we can give you a quote within hours and schedule your service the same week.',
    category: 'Estimates'
  },
  {
    question: 'What is included in your standard lawn mowing service?',
    answer: 'Every standard service includes razor-sharp mowing at optimal seasonal height, precision vertical edging along driveways and sidewalks, string trimming around all perimeters, trees, and obstacles, followed by a thorough blowout of all hard surfaces and patios.',
    category: 'Lawn Care'
  },
  {
    question: 'Do you offer weekly and bi-weekly schedules?',
    answer: 'Yes! We offer flexible recurring schedules. During peak summer growth (May through September), weekly mowing keeps your turf dense, healthy, and weed-resistant. We also provide bi-weekly visits depending on your yard needs and grass type.',
    category: 'Scheduling'
  },
  {
    question: 'What areas in Gaston County do you serve?',
    answer: 'Our main hub is based at 940 Etta Pl, Gastonia, NC 28054. We serve all of Gastonia, Belmont, Cramer Mountain, Dallas, Mount Holly, Lowell, Cramerton, Ranlo, Bessemer City, and surrounding communities.',
    category: 'Service Areas'
  },
  {
    question: 'Are you open on weekends?',
    answer: 'Yes! G & T Lawn Care operates 7 days a week from 8:00 AM to 6:00 PM, Monday through Sunday, so you can always count on us to keep your property looking its best.',
    category: 'General'
  }
];
