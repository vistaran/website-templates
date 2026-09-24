import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "New Sonal Travels — Self-Drive & With-Driver Car Rental in Gandhinagar | Open 24 Hours",
  description:
    "Self-drive & with-driver cars on rent in Gandhinagar, Gujarat. 40+ cars from Baleno to Defender. 12-hour & 24-hour plans with transparent rates. 5.0★ rated. Open 24 hours. Book on WhatsApp.",
  keywords: [
    "self-drive car rental Gandhinagar",
    "self-drive car hire Gandhinagar",
    "car rental with driver Gandhinagar",
    "car with driver Gandhinagar",
    "chauffeur driven car Gandhinagar",
    "New Sonal Travels",
    "car rental on self-drive Gujarat",
    "Innova self-drive Gandhinagar",
    "luxury car self-drive Gandhinagar",
  ],
  openGraph: {
    title: "New Sonal Travels — Self-Drive & With-Driver Car Rental, Gandhinagar",
    description:
      "5.0★ rated car rental in Gandhinagar for self-drive or with a driver. 40+ cars, 12h & 24h plans, doorstep delivery. Open 24 hours. Book on WhatsApp.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
