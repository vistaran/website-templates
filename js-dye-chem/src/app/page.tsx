import { Hero } from "@/components/Hero";
import { ClientLogoStrip } from "@/components/ClientLogoStrip";
import { Offerings } from "@/components/Offerings";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogoStrip />
      <Offerings />
      <HowItWorks />
      <WhyUs />
      <CTASection />
    </>
  );
}
