export type CarRow = { name: string; price: number };
export type CarCategory = { label: string; note?: string; cars: CarRow[] };

export const FLEET_24H: CarCategory[] = [
  {
    label: "Luxury & Super SUVs",
    note: "₹25/km beyond 300 km",
    cars: [
      { name: "Land Rover Defender", price: 100000 },
      { name: "Range Rover Sport", price: 90000 },
      { name: "Mercedes-Maybach GLS", price: 50000 },
      { name: "Porsche", price: 33000 },
      { name: "Mercedes C-Class", price: 33000 },
      { name: "Audi A3 Cabriolet", price: 32000 },
      { name: "Mercedes GLC", price: 27000 },
      { name: "Mercedes E-Class", price: 27000 },
      { name: "Mercedes A200", price: 26000 },
      { name: "Range Rover", price: 25000 },
      { name: "Jaguar XF", price: 23000 },
      { name: "BMW 7 Series", price: 23000 },
      { name: "Volvo S60", price: 23000 },
      { name: "Audi Q7", price: 19000 },
      { name: "Audi A6", price: 17000 },
    ],
  },
  {
    label: "Premium SUVs",
    note: "₹25/km beyond 300 km",
    cars: [
      { name: "Fortuner Legender", price: 15000 },
      { name: "Fortuner (New)", price: 15000 },
      { name: "Ford Endeavour", price: 17000 },
      { name: "Fortuner (Old)", price: 8000 },
    ],
  },
  {
    label: "7-Seaters & MPVs",
    note: "₹10/km beyond 300 km",
    cars: [
      { name: "Innova Crysta", price: 5500 },
      { name: "Kia Carens", price: 3500 },
      { name: "Ertiga", price: 3500 },
    ],
  },
  {
    label: "SUVs",
    note: "₹10/km beyond 300 km",
    cars: [
      { name: "Thar Roxx", price: 8500 },
      { name: "XUV700", price: 6900 },
      { name: "Scorpio-N", price: 6600 },
      { name: "Scorpio (New)", price: 5800 },
      { name: "Creta (New)", price: 5500 },
      { name: "Kia Seltos", price: 5500 },
      { name: "Harrier", price: 5500 },
      { name: "Thar", price: 5500 },
    ],
  },
  {
    label: "Sedans & Hatchbacks",
    note: "₹10/km beyond 300 km",
    cars: [
      { name: "Slavia", price: 5500 },
      { name: "Virtus", price: 5500 },
      { name: "Verna (New)", price: 5500 },
      { name: "Fronx", price: 3500 },
      { name: "Baleno", price: 3000 },
      { name: "i20", price: 3000 },
      { name: "Amaze", price: 3000 },
      { name: "Altroz", price: 3000 },
    ],
  },
];

export const FLEET_12H: CarCategory[] = [
  {
    label: "SUVs & MPVs",
    note: "₹10/km beyond 150 km",
    cars: [
      { name: "Thar Roxx", price: 6000 },
      { name: "Scorpio-N", price: 4000 },
      { name: "Innova Crysta", price: 3500 },
      { name: "Scorpio (New)", price: 3500 },
      { name: "Thar", price: 3000 },
      { name: "Creta (New)", price: 3000 },
      { name: "Ertiga", price: 2500 },
      { name: "Fronx", price: 2500 },
    ],
  },
  {
    label: "Sedans & Hatchbacks",
    note: "₹10/km beyond 150 km",
    cars: [
      { name: "Slavia", price: 3000 },
      { name: "Virtus", price: 3000 },
      { name: "Verna (New)", price: 3000 },
      { name: "Baleno", price: 2000 },
      { name: "i20", price: 2000 },
      { name: "Swift Dzire", price: 2000 },
      { name: "Swift", price: 2000 },
    ],
  },
];

export const PLAN_24H = { label: "24 Hours", km: "300 km", priceSuffix: "/day" };
export const PLAN_12H = { label: "12 Hours", km: "150 km", priceSuffix: "/day" };

/** Map of car name -> image path in /public/cars (named to match the fleet list). */
export const CAR_IMAGES: Record<string, string> = {
  "Land Rover Defender": "/cars/land-rover-defender.jpg",
  "Range Rover Sport": "/cars/range-rover-sport.jpg",
  "Mercedes-Maybach GLS": "/cars/mercedes-maybach-gls.webp",
  Porsche: "/cars/porsche.jpg",
  "Mercedes C-Class": "/cars/mercedes-c-class.jpg",
  "Audi A3 Cabriolet": "/cars/Audi-A3-Cabriolet.jpg",
  "Mercedes GLC": "/cars/Mercedes-GLC.jpg",
  "Mercedes E-Class": "/cars/Mercedes-E-Class.jpg",
  "Mercedes A200": "/cars/Mercedes-A200.webp",
  "Range Rover": "/cars/Range-Rover.jpg",
  "Jaguar XF": "/cars/Jaguar-XF.jpg",
  "BMW 7 Series": "/cars/BMW-7-Series.jpg",
  "Volvo S60": "/cars/Volvo-S60.webp",
  "Audi Q7": "/cars/Audi-Q7.jpg",
  "Audi A6": "/cars/Audi-A6.jpg",
  "Fortuner Legender": "/cars/Fortuner-Legender.jpg",
  "Fortuner (New)": "/cars/Fortuner-New.jpg",
  "Ford Endeavour": "/cars/Ford-Endeavour.jpg",
  "Fortuner (Old)": "/cars/Fortuner-Old.jpg",
  "Innova Crysta": "/cars/Innova-Crysta.jpg",
  "Kia Carens": "/cars/Kia-Carens.png",
  Ertiga: "/cars/Ertiga.jpg",
  "Thar Roxx": "/cars/Thar-Roxx.webp",
  XUV700: "/cars/XUV700.jpg",
  "Scorpio-N": "/cars/Scorpio-N.webp",
  "Scorpio (New)": "/cars/Scorpio-New.webp",
  "Creta (New)": "/cars/Creta-New.jpg",
  "Kia Seltos": "/cars/Kia-Seltos.webp",
  Harrier: "/cars/Harrier.jpg",
  Thar: "/cars/Thar.jpg",
  Slavia: "/cars/Slavia.jpg",
  Virtus: "/cars/Virtus.jpg",
  "Verna (New)": "/cars/Verna-New.webp",
  Fronx: "/cars/Fronx.jpg",
  Baleno: "/cars/Baleno.jpg",
  i20: "/cars/i20.jpg",
  Amaze: "/cars/Amaze.jpg",
  Altroz: "/cars/Altroz.jpg",
};

export function carImage(name: string): string | undefined {
  return CAR_IMAGES[name];
}

export function inr(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function bookingMessage(car: string, planLabel: string): string {
  return `Hi New Sonal Travels! I'd like to book the ${car} (${planLabel}), self-drive or with a driver. Please share availability.`;
}
