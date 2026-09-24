import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { Terms } from "@/components/Terms";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-night text-zinc-50">
      <Navbar />
      <Hero />
      <Pricing />
      <HowItWorks />
      <WhyUs />
      <Terms />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
