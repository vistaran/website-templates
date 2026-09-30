/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { TransformationGallery } from './components/TransformationGallery';
import { Reviews } from './components/Reviews';
import { BusinessHoursAndArea } from './components/BusinessHoursAndArea';
import { QuoteFormSection } from './components/QuoteFormSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { SodCalculatorModal } from './components/SodCalculatorModal';


export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Sod Installation');
  const [calculatorNotes, setCalculatorNotes] = useState<string>('');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const scrollToQuote = () => {
    const el = document.getElementById('contact-quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToQuote();
  };

  const handleApplyEstimate = (service: string, details: string) => {
    setSelectedService(service);
    setCalculatorNotes(details);
    scrollToQuote();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0f172a]">
      {/* Sticky Navigation */}
      <Navbar onQuoteClick={scrollToQuote} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onQuoteClick={scrollToQuote}
          onServicesClick={scrollToServices}
        />

        {/* Services Section with Specialty Sod Banner */}
        <Services
          onSelectService={handleSelectService}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Before and After Transformation Gallery */}
        <TransformationGallery />

        {/* Social Proof & Google Reviews */}
        <Reviews />

        {/* Operating Hours, Charlotte Map & Service Radius */}
        <BusinessHoursAndArea />

        {/* Lead Generation Form */}
        <QuoteFormSection
          initialService={selectedService}
          initialMessage={calculatorNotes}
        />


        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar onQuoteClick={scrollToQuote} />

      {/* Interactive Yard Sod / Mulch Calculator Modal */}
      <SodCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyEstimate={handleApplyEstimate}
      />
    </div>
  );
}
