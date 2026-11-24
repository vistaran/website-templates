import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ThemeProvider } from '../components/ThemeProvider'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap'
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rajdhaniliving.com'),
  title: 'Top Interior Design Group in Gandhinagar | Rajdhani Group',
  description: 'We create stunning, personalized home decor solutions that reflect your unique taste. Transform your space with our expert design team today.',
  keywords: ['Interior Design', 'Home Decor', 'Gandhinagar', 'Stylish Decor', 'Hardware', 'Plywood'],
  openGraph: {
    title: 'Top Interior Design Group in Gandhinagar | Rajdhani Group',
    description: 'Transform your space with our personalized home decor solutions and expert design team.',
    url: 'https://rajdhaniliving.com',
    siteName: 'Rajdhani Group - Interior Design',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://rajdhaniliving.com/images/homepage.jpg',
        alt: 'Rajdhani Group - Interior Design',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/rajdhani-group-logo.png" type="image/png" sizes="any" />
      </head>
      <body className={`${outfit.variable} ${cinzel.variable} font-sans text-lg`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
