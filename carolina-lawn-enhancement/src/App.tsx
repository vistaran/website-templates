import React, { useState } from 'react';
import { TopNoticeBar } from './components/TopNoticeBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStatsBar } from './components/TrustStatsBar';
import { Services } from './components/Services';
import { TransformationGallery } from './components/TransformationGallery';
import { BusinessHoursAndArea } from './components/BusinessHoursAndArea';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { BookingCalendar } from './components/BookingCalendar';
import { QuoteFormSection } from './components/QuoteFormSection';
import { SodCalculatorModal } from './components/SodCalculatorModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { Footer } from './components/Footer';

export default function App() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [calculatorDataForQuote, setCalculatorDataForQuote] = useState<{
    sqFt: number;
    materialType: string;
    palletsOrYards: number;
    estimatedCost: string;
  } | null>(null);

  const scrollToQuote = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForQuote(serviceId);
    }
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalendar = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForQuote(serviceId);
    }
    const calendarElement = document.getElementById('book-appointment');
    if (calendarElement) {
      calendarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyCalculatorToQuote = (data: {
    sqFt: number;
    materialType: string;
    palletsOrYards: number;
    estimatedCost: string;
  }) => {
    setCalculatorDataForQuote(data);
    scrollToQuote('sod-installation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1a241e] font-sans">
      {/* Top Banner Notice */}
      <TopNoticeBar onOpenQuote={() => scrollToQuote()} />

      {/* Main Navigation */}
      <Navbar 
        onOpenQuote={() => scrollToQuote()} 
        onOpenCalculator={() => setIsCalculatorOpen(true)} 
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero 
          onOpenQuote={(serviceId) => scrollToQuote(serviceId)} 
          onOpenCalculator={() => setIsCalculatorOpen(true)} 
          onOpenCalendar={() => scrollToCalendar()}
        />

        {/* 36-Year Trust & Core Capabilities Bar */}
        <TrustStatsBar />

        {/* Services & Capabilities */}
        <Services onSelectServiceForQuote={(serviceId) => scrollToQuote(serviceId)} />

        {/* Before / After Transformation Slider */}
        <TransformationGallery onOpenQuote={() => scrollToQuote('sod-installation')} />

        {/* Real-Time Interactive Calendar Event Booking Engine */}
        <BookingCalendar initialServiceId={selectedServiceForQuote} />

        {/* Service Area, 10915 Delsing Ct Map Information & Hours */}
        <BusinessHoursAndArea />

        {/* Client Reviews & Testimonials */}
        <Reviews />

        {/* FAQ Section */}
        <FAQ />

        {/* Interactive Free Quote Request Form */}
        <QuoteFormSection 
          initialService={selectedServiceForQuote} 
          calculatorData={calculatorDataForQuote}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuote={() => scrollToQuote()} 
        onOpenCalculator={() => setIsCalculatorOpen(true)} 
      />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar 
        onOpenQuote={() => scrollToQuote()} 
        onOpenCalculator={() => setIsCalculatorOpen(true)} 
        onOpenCalendar={() => scrollToCalendar()}
      />

      {/* Interactive Sod & Mulch Calculator Modal */}
      <SodCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyToQuote={handleApplyCalculatorToQuote}
      />
    </div>
  );
}
