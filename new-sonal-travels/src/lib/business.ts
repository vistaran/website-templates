export const BUSINESS = {
  name: "New Sonal Travels",
  tagline: "Self-Drive & With-Driver Car Rental",
  rating: 5.0,
  reviewCount: 80,
  address:
    "Circuit House, Block CH 3A, Rajbhavan Staff Qtrs Rd, Sector 19, Gandhinagar, Gujarat 382021",
  shortAddress: "Sector 19, Gandhinagar, Gujarat",
  plusCode: "6M8C+RV Gandhinagar",
  phones: [
    { display: "97244 37686", tel: "+919724437686", wa: "919724437686" },
    { display: "96245 75729", tel: "+919624575729", wa: "919624575729" },
  ],
  primaryWa: "919724437686",
  hours: "Open 24 Hours",
  mapsQuery: "New Sonal Travels, Sector 19, Gandhinagar, Gujarat 382021",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=New+Sonal+Travels%2C+Rajbhavan+Staff+Qtrs+Rd%2C+Sector+19%2C+Gandhinagar%2C+Gujarat+382021",
  mapsEmbed:
    "https://www.google.com/maps?q=New+Sonal+Travels,+Rajbhavan+Staff+Qtrs+Rd,+Sector+19,+Gandhinagar,+Gujarat+382021&output=embed",
};

export const DEFAULT_WA_MESSAGE =
  "Hi New Sonal Travels! I'd like to book a car (self-drive or with a driver). Please share availability and rates.";

export function waLink(message: string = DEFAULT_WA_MESSAGE, phone?: string) {
  const number = phone ?? BUSINESS.primaryWa;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telLink(tel: string) {
  return `tel:${tel.replace(/[^+\d]/g, "")}`;
}
