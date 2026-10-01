import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { SodCalculator } from "./components/SodCalculator";
import { Process } from "./components/Process";
import { Reviews } from "./components/Reviews";
import { ServiceAreaCheck } from "./components/ServiceAreaCheck";
import { FAQ } from "./components/FAQ";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { MobileQuickBar } from "./components/MobileQuickBar";
import { X, Calendar, Phone, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "./data/content";

export default function App() {
  // Modal states for general quote request
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Precision Lawn Care & Maintenance");
  
  // States passed from the interactive sod/mulch calculator
  const [prefilledArea, setPrefilledArea] = useState<number | undefined>(undefined);
  const [prefilledAmount, setPrefilledAmount] = useState<number | undefined>(undefined);

  const handleOpenQuoteWithService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setPrefilledArea(undefined);
    setPrefilledAmount(undefined);
    setIsQuoteOpen(true);
  };

  const handleOpenQuoteWithCalculator = (materialLabel: string, area: number, amount: number) => {
    setSelectedService(materialLabel);
    setPrefilledArea(area);
    setPrefilledAmount(amount);
    setIsQuoteOpen(true);
  };

  const handleOpenGeneralQuote = () => {
    setSelectedService("Precision Lawn Care & Maintenance");
    setPrefilledArea(undefined);
    setPrefilledAmount(undefined);
    setIsQuoteOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-soil selection:bg-brand-leaf selection:text-brand-cream antialiased pb-16 md:pb-0">
      
      {/* 3-Zone Navigation Header */}
      <Navbar 
        onOpenQuote={handleOpenGeneralQuote} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main content body */}
      <main>
        {/* Cinematic landing hero with interactive photo switcher */}
        <Hero 
          onOpenQuote={handleOpenGeneralQuote} 
          onScrollToSection={handleScrollToSection} 
        />

        {/* Asymmetric services Bento-grid with real photography */}
        <Services onSelectService={handleOpenQuoteWithService} />

        {/* Real Project Portfolio Gallery Showcase */}
        <Gallery onSelectProject={handleOpenQuoteWithService} />

        {/* Real Photo Interactive Before & After comparison slider */}
        <BeforeAfterSlider />

        {/* Interactive Sod & Mulch Material Calculator */}
        <SodCalculator onQuoteWithCalc={handleOpenQuoteWithCalculator} />

        {/* Professional 4-step pathway */}
        <Process />

        {/* Social proof testimonials with Google ratings */}
        <Reviews />

        {/* Interactive service area ZIP code check */}
        <ServiceAreaCheck />

        {/* Expandable FAQs accordions */}
        <FAQ />

        {/* High-intent closing CTA & Inline Lead Form */}
        <section className="py-24 bg-brand-sage/20 border-b border-brand-sage/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Closing pitch - 5 columns */}
              <div className="lg:col-span-5 text-left">
                <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
                  07. READY TO BEGIN?
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-soil tracking-tight mb-5 leading-tight">
                  Let’s inspect your yard this week.
                </h2>
                <p className="text-base text-brand-soil/75 mb-6 leading-relaxed">
                  J. and his son perform every initial site discovery personally. Fill out our simple estimate form, 
                  and we’ll reach out within 24 hours to schedule a convenient time to walk your property together.
                </p>
                
                <div className="flex flex-col gap-3 pt-6 border-t border-brand-sage">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="flex items-center gap-2.5 text-sm font-bold text-brand-leaf hover:text-brand-moss transition-colors font-mono"
                  >
                    <Phone className="w-5 h-5 text-brand-clay shrink-0" />
                    <span>Call J &amp; Son: {BUSINESS_INFO.phone}</span>
                  </a>
                  <div className="flex items-center gap-2.5 text-sm text-brand-soil/75">
                    <ShieldCheck className="w-5 h-5 text-brand-leaf shrink-0" />
                    <span>Free, transparent, and itemized estimations</span>
                  </div>
                </div>
              </div>

              {/* Inline validated Lead Capture Card - 7 columns */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-brand-sage rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-soil mb-6 tracking-tight text-left">
                    Request Your Free On-Site Estimate
                  </h3>
                  <ContactForm 
                    initialService={selectedService}
                    prefilledArea={prefilledArea}
                    prefilledAmount={prefilledAmount}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Quiet, elegant footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Sticky Mobile Quick-Action Bar */}
      <MobileQuickBar onOpenQuote={handleOpenGeneralQuote} />

      {/* GENERAL MODAL OVERLAY: Quote Form popup */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          {/* Backdrop scrim */}
          <div 
            onClick={() => setIsQuoteOpen(false)}
            className="absolute inset-0 bg-brand-soil/50 backdrop-blur-sm transition-opacity cursor-pointer" 
          />
          
          {/* Modal box */}
          <div className="relative bg-white border border-brand-sage rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 animate-scale-up">
            
            {/* Header row */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-sage/60 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-leaf/10 text-brand-leaf rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-serif font-bold text-brand-soil tracking-tight">
                    Schedule Free On-Site Estimate
                  </h3>
                  <p className="text-[10px] font-mono text-brand-soil/55 uppercase tracking-wider">
                    J &amp; SON LANDSCAPING • CONCORD, NC
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsQuoteOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-sage/40 text-brand-soil/50 hover:text-brand-soil transition-colors focus:outline-none cursor-pointer"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <ContactForm
              initialService={selectedService}
              prefilledArea={prefilledArea}
              prefilledAmount={prefilledAmount}
              onClose={() => setIsQuoteOpen(false)}
              isModal={true}
            />

          </div>
        </div>
      )}

    </div>
  );
}
