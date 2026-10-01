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
import { SodCalculatorModal } from './components/SodCalculatorModal';
import { BookingCalendar } from './components/BookingCalendar';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // State for prefilling the quote section
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setPrefilledService(serviceName);
    }
    const quoteElement = document.getElementById('quote-section');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyCalculatorToQuote = (details: {
    materialType: string;
    sqft: number;
    quantity: string;
    costEstimate: string;
  }) => {
    const formattedNotes = `[Calculated via Estimator Tool]: ${details.materialType} | Area: ${details.sqft.toLocaleString()} sq.ft | Approx Quantity: ${details.quantity} | Est. Cost: ${details.costEstimate}`;
    setPrefilledNotes(formattedNotes);
    if (details.materialType.toLowerCase().includes('sod')) {
      setPrefilledService('Sod Installation & Lawn Renovation');
    } else {
      setPrefilledService('Mulch, Pine Straw & Garden Beds');
    }
    
    // Smooth scroll down to the quote section
    setTimeout(() => {
      const quoteElement = document.getElementById('quote-section');
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col pb-16 sm:pb-0">
      
      {/* Top Navbar */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenQuote={handleOpenQuote}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <Services
          onOpenQuote={handleOpenQuote}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        <TransformationGallery
          onOpenQuote={handleOpenQuote}
        />

        <Reviews />

        <BusinessHoursAndArea
          onOpenQuote={handleOpenQuote}
        />

        <QuoteFormSection
          prefilledService={prefilledService}
          prefilledNotes={prefilledNotes}
        />

        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={handleOpenQuote}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Modals */}
      <SodCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyToQuote={handleApplyCalculatorToQuote}
      />

      <BookingCalendar
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Floating Bottom Bar for Mobile Users */}
      <MobileQuickBar
        onOpenQuote={() => handleOpenQuote()}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

    </div>
  );
}
