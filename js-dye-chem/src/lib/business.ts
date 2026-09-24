/**
 * Central business data for JS Dye Chem.
 * Edit contact details here — every component reads from this file.
 */

export const BUSINESS = {
  name: "JS Dye Chem",
  shortName: "JS DYE CHEM",
  tagline: "Textile Chemicals & Printing Inks",
  category: "Wholesaler · Textile Processing Chemicals & Digital Printing Inks",

  /** WhatsApp number — digits only, with country code */
  whatsapp: "919712922210",
  phoneDisplay: "+91 97129 22210",
  phoneIntl: "+919712922210",

  /** Official sales email */
  email: "jsdyechem.sales@gmail.com",

  address:
    "B/h Poonam Hotel, 93, Jalaram Nagar Society, Surat–Bardoli Road, Kadodara, Gujarat 394327",
  plusCode: "5XC8+GJ Kadodara, Gujarat",
  city: "Kadodara, Surat, Gujarat",
  hours: "Mon – Sat · 10:00 AM – 6:30 PM",
  hoursNote: "Closed on Sundays",

  mapEmbed:
    "https://www.google.com/maps?q=JS+Dye+Chem,+Jalaram+Nagar+Society,+Kadodara,+Surat,+Gujarat+394327&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=JS+Dye+Chem%2C+Jalaram+Nagar+Society%2C+Kadodara%2C+Gujarat+394327",
};

export const DEFAULT_WA_MESSAGE =
  "Hello JS Dye Chem! I'd like to enquire about your textile chemicals and printing inks.";

/** Build a WhatsApp deep link with a prefilled message */
export function waLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function waLinkFor(product: string): string {
  return waLink(
    `Hello JS Dye Chem! I'd like a quote for ${product}. Please share pricing and availability.`
  );
}

export const telHref = `tel:${BUSINESS.phoneIntl}`;
