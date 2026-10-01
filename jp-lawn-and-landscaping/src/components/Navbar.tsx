import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, Menu, X, ChevronDown, CheckCircle2, ShieldCheck, Sparkles, Calculator } from 'lucide-react';
import { BUSINESS_INFO, BUSINESS_HOURS } from '../data/content';

interface NavbarProps {
  onOpenQuote: (service?: string) => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenCalculator, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if currently open based on local Eastern time (NC is UTC-4 EDT / UTC-5 EST)
  useEffect(() => {
    try {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hour = now.getHours();
      // Mon-Sat: 7am to 7pm (19:00)
      if (day === 0) {
        setIsOpenNow(false);
      } else {
        setIsOpenNow(hour >= 7 && hour < 19);
      }
    } catch {
      setIsOpenNow(true);
    }
  }, []);

  return (
    <>
      {/* Top Notification & Utility Bar */}
      <header className="w-full bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-200">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              {isOpenNow ? 'Open Today: 7:00 AM – 7:00 PM' : 'Closed Now (Opens 7:00 AM)'}
            </span>
            <span className="hidden md:inline-block text-emerald-700">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              1400 Birch St, Kannapolis, NC 28081
            </span>
            <span className="hidden lg:inline-block text-emerald-700">•</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Licensed & Fully Insured
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sod & Material Calculator</span>
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-bold text-white bg-emerald-700/80 hover:bg-emerald-600 px-3 py-1 rounded-full text-xs transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-200" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full sticky top-[33px] sm:top-[33px] z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-stone-800' 
            : 'bg-stone-900 border-b border-stone-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Identification */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-800 flex items-center justify-center text-white font-extrabold text-xl tracking-tight shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform border border-emerald-400/30">
                <span>JP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  JP Lawn & Landscaping
                </span>
                <span className="text-xs font-medium text-emerald-400/90 tracking-wide uppercase">
                  Kannapolis & Concord, NC
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Focused & Compact) */}
            <div className="hidden md:flex items-center space-x-6 xl:space-x-8">
              <a href="#services" className="text-stone-300 hover:text-emerald-400 font-medium text-sm transition-colors">
                Services
              </a>
              <a href="#transformations" className="text-stone-300 hover:text-emerald-400 font-medium text-sm transition-colors">
                Before & After
              </a>
              <a href="#reviews" className="text-stone-300 hover:text-emerald-400 font-medium text-sm transition-colors">
                Reviews
              </a>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-700 bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all cursor-pointer hover:border-emerald-500/50 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book Visit</span>
              </button>

              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all cursor-pointer hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>Free Estimate</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => onOpenQuote()}
                className="px-3 py-1.5 rounded-md bg-emerald-500 text-stone-950 text-xs font-bold"
              >
                Free Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="flex flex-col space-y-2.5 pt-2">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 font-medium text-base"
              >
                Services
              </a>
              <a
                href="#transformations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 font-medium text-base"
              >
                Before & After Gallery
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 font-medium text-base"
              >
                Google Reviews (5.0 ★)
              </a>
              <a
                href="#service-area"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 font-medium text-base"
              >
                Service Area & Hours
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 font-medium text-base"
              >
                Frequently Asked Questions
              </a>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-stone-800 text-stone-200 font-medium text-sm flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Sod & Material Calculator</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-stone-800 text-stone-200 font-medium text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Schedule On-Site Consultation</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 px-4 rounded-lg bg-emerald-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Request Free Estimate</span>
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full py-3 px-4 rounded-lg bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
