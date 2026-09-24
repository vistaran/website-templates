import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://js-dye-chem.vercel.app";
const TITLE = "JS Dye Chem — Textile Chemicals & Digital Printing Inks | Surat, Gujarat";
const DESCRIPTION =
  "B2B supplier of specialised chemicals, auxiliaries, silicon gel, softners, bonding agents, digital printing inks, value addition chemicals and enzymes for fabric. Serving textile processing houses and mills across India from Kadodara, Surat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | JS Dye Chem",
  },
  description: DESCRIPTION,
  keywords: [
    "textile chemicals",
    "digital printing inks",
    "printing ink manufacturer Surat",
    "textile auxiliary chemicals",
    "silicone gel textile",
    "fabric softeners",
    "bonding agents",
    "enzymes for fabric",
    "textile chemical supplier India",
    "Kadodara textile chemicals",
    "value addition chemicals textile",
    "DTF DTG inks",
  ],
  applicationName: "JS Dye Chem",
  authors: [{ name: "JS Dye Chem" }],
  creator: "JS Dye Chem",
  publisher: "JS Dye Chem",
  category: "Textile Chemicals & Printing Inks",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "JS Dye Chem",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06090d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "JS Dye Chem",
  alternateName: "JS Dye Chem — Textile Chemicals & Printing Inks",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: "+919712922210",
  email: "jsdyechem.sales@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B/h Poonam Hotel, 93, Jalaram Nagar Society, Surat–Bardoli Road",
    addressLocality: "Kadodara",
    addressRegion: "Gujarat",
    postalCode: "394327",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 21.1713368, longitude: 72.9666017 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:30",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919712922210",
    contactType: "sales",
    availableLanguage: ["en", "hi", "gu"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Textile Chemicals & Printing Inks",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Specialised Chemicals" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Auxiliary Chemicals" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Silicon Gel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Softners" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bonding Agents" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Digital Printing Inks" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Value Addition Chemicals" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Enzymes for Fabric" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
