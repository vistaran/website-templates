/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CivilCapabilities } from './components/CivilCapabilities';
import { CostEstimator } from './components/CostEstimator';
import { MaterialLibrary } from './components/MaterialLibrary';
import { StudioLocation } from './components/StudioLocation';
import { Footer } from './components/Footer';
import { ConsultationBooking } from './components/ConsultationBooking';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState<string | undefined>(undefined);

  const handleOpenBooking = (projectTitle?: string) => {
    setPrefilledProject(projectTitle);
    setBookingOpen(true);
  };

  const handleScrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#24201D] flex flex-col font-sans selection:bg-[#B89058]/25 selection:text-[#5C421E]">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection="portfolio"
      />

      {/* Main Page Flow: Proposition -> Proof/Portfolio -> Mechanisms/Civil -> Estimation -> Materiality -> Location */}
      <main className="flex-1">
        {/* Architectural Hero */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExplorePortfolio={handleScrollToPortfolio}
        />

        {/* Professional Portfolio Gallery */}
        <PortfolioGallery
          onBookConsultation={(title) => handleOpenBooking(title)}
        />

        {/* Civil Engineering & Services Capabilities */}
        <CivilCapabilities />

        {/* Interactive Interior Cost Estimator */}
        <CostEstimator
          onApplyToBooking={(summary) => handleOpenBooking(summary)}
        />

        {/* Tactile Material Library */}
        <MaterialLibrary />

        {/* Experience Center & Google Maps Location */}
        <StudioLocation
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Quiet Architectural Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Client Consultation Booking System Modal */}
      <ConsultationBooking
        isOpen={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setPrefilledProject(undefined);
        }}
        initialProjectTitle={prefilledProject}
      />
    </div>
  );
}
