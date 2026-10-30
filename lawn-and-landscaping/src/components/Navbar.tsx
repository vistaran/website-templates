import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, Menu, X, ChevronDown, CheckCircle2, ShieldCheck, Sparkles, Calculator } from 'lucide-react';
import { BUSINESS_HOURS } from '../data/content';
import { useBusiness } from '../context/BusinessContext';

interface NavbarProps {
  onOpenQuote: (service?: string) => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenCalculator, onOpenBooking }) => {
  const { businessInfo } = useBusiness();
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

  // Determine if currently open based on local business hours (Mon-Sat 7am-7pm)
  useEffect(() => {
    try {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hour = now.getHours();
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
    <div className="sticky top-0 z-40 w-full shadow-lg">
      {/* Top Notification & Utility Bar */}
      <div className="hidden sm:block w-full bg-[#0E1A14] text-stone-300 text-xs py-2 px-4 border-b border-[#1A2E24]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              {isOpenNow ? 'Open Today: 7:00 AM – 7:00 PM' : 'Closed Now (Opens 7:00 AM)'}
            </span>
            <span className="hidden md:inline-block text-stone-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{businessInfo.fullAddress}</span>
            </span>
            <span className="hidden lg:inline-block text-stone-600">•</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{businessInfo.licenseNote}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center gap-1.5 text-stone-300 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Material Calculator</span>
            </button>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1 rounded-full text-xs transition-colors shadow-sm shadow-emerald-950"
            >
              <Phone className="w-3 h-3 text-emerald-100" />
              <span>{businessInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-stone-200' 
            : 'bg-white/95 backdrop-blur-md border-b border-stone-200/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Brand Logo & Identification */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 flex items-center justify-center text-white font-extrabold text-base sm:text-xl tracking-tight shadow-md shadow-emerald-900/25 group-hover:scale-105 transition-transform border border-emerald-500/30 shrink-0">
                <span>{businessInfo.initials}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors leading-tight truncate max-w-[160px] xs:max-w-[200px] sm:max-w-none">
                  {businessInfo.name}
                </span>
                <span className="text-[9px] sm:text-xs font-semibold text-emerald-700 tracking-wide uppercase truncate max-w-[160px] xs:max-w-[200px] sm:max-w-none">
                  {businessInfo.city}{businessInfo.secondaryCity ? ` & ${businessInfo.secondaryCity}` : ''}, {businessInfo.state}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 xl:space-x-8">
              <a href="#services" className="text-stone-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
                Services
              </a>
              <a href="#transformations" className="text-stone-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
                Before & After
              </a>
              <a href="#reviews" className="text-stone-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
                Reviews
              </a>
              <a href="#service-area" className="text-stone-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
                Service Area
              </a>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-300 bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-xs font-semibold transition-all cursor-pointer hover:border-emerald-600 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>Book Visit</span>
              </button>

              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/35 transition-all cursor-pointer hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Free Estimate</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => onOpenQuote()}
                className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-bold shadow-sm"
              >
                Free Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                Reviews ({businessInfo.rating} ★)
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
                href={`tel:${businessInfo.phoneRaw}`}
                className="w-full py-3 px-4 rounded-lg bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {businessInfo.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
