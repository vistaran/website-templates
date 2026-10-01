import React, { useState } from 'react';
import { Phone, Menu, X, Calculator } from 'lucide-react';
import { businessDetails } from '../data/content';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#0f291e]/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a href="#" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0f291e] flex items-center justify-center text-amber-400 font-display font-bold text-lg sm:text-xl shadow-xs group-hover:bg-[#184632] transition-colors shrink-0">
                CL
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#0f291e] group-hover:text-[#184632] transition-colors leading-none truncate">
                  Carolina Lawn Enhancement
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#506356] tracking-wider uppercase mt-1 truncate">
                  Est. 1988 · Charlotte, NC
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4 clean single-line navigation links (desktop lg+) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#2d3f34]">
            <a href="#services" className="hover:text-[#0f291e] transition-colors whitespace-nowrap shrink-0">
              Services
            </a>
            <a href="#book-appointment" className="hover:text-[#0f291e] text-[#153c29] font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <span>Book On-Site</span>
            </a>
            <a href="#transformations" className="hover:text-[#0f291e] transition-colors whitespace-nowrap shrink-0">
              Transformations
            </a>
            <button 
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 hover:text-[#0f291e] text-[#1f593b] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Sod Calculator</span>
            </button>
          </nav>

          {/* Zone 3: Primary actions & Tablet/Mobile menu controls */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0">
            <a
              href={`tel:${businessDetails.phoneRaw}`}
              className="hidden xl:flex items-center gap-2 text-sm font-semibold text-[#0f291e] hover:text-[#1f593b] transition-colors px-2.5 py-2 whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{businessDetails.phone}</span>
            </a>

            {/* Desktop & Tablet Get Estimate Button */}
            <button
              onClick={onOpenQuote}
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0f291e] hover:bg-[#184632] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              Get Free Estimate
            </button>

            {/* Small Mobile Quote Button (<640px) */}
            <button
              onClick={onOpenQuote}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#0f291e] rounded-md shadow-xs whitespace-nowrap"
            >
              Quote
            </button>

            {/* Mobile & Tablet Hamburger (visible on all screens < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0f291e] hover:bg-[#faf8f5] focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#0f291e]/10 bg-[#faf8f5] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-base font-medium text-[#1f2d24]">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white hover:text-[#0f291e]"
            >
              Services
            </a>
            <a 
              href="#book-appointment" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white text-[#153c29] font-bold"
            >
              📅 Book On-Site Consultation (Calendar)
            </a>
            <a 
              href="#transformations" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white hover:text-[#0f291e]"
            >
              Transformations
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
              className="flex items-center gap-2 text-left px-3 py-2 rounded-md text-[#184632] font-semibold hover:bg-white"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Sod & Yard Calculator</span>
            </button>
            <a 
              href="#hours-area" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white hover:text-[#0f291e]"
            >
              Service Area & Hours
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white hover:text-[#0f291e]"
            >
              Reviews & Testimonials
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white hover:text-[#0f291e]"
            >
              FAQ
            </a>
          </nav>
          
          <div className="pt-3 border-t border-[#0f291e]/10 flex flex-col gap-2.5">
            <a
              href={`tel:${businessDetails.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[#0f291e]/20 text-[#0f291e] font-bold text-center bg-white"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call (704) 918-0398</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="w-full py-3 rounded-lg bg-[#0f291e] text-white font-bold text-center shadow-sm"
            >
              Request Free On-Site Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
