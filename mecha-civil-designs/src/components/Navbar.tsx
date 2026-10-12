import React, { useState, useEffect } from 'react';
import { STUDIO_DETAILS } from '../data/portfolioData';
import { Phone, Calendar, Menu, X, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Cost Estimator', href: '#estimator' },
    { label: 'Materials', href: '#materials' },
    { label: 'Studio & Map', href: '#studio-location' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E0D5] py-3 shadow-xs'
          : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Zone 1: Brand Wordmark (Compact & Elegant) */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 group"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-[#C5B8A5] bg-[#F5EFE6] flex items-center justify-center text-[#78562E] font-serif text-sm sm:text-base font-medium group-hover:border-[#9E7747] transition-colors shrink-0">
              M
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-xl xl:text-2xl tracking-[0.03em] font-semibold text-[#1C1917] leading-none truncate">
                MECHA <span className="font-light italic text-[#8A6739]">Civil Designs</span>
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.16em] uppercase font-mono text-[#8C8275] mt-0.5 truncate">
                Interior Architecture · Ahmedabad
              </span>
            </div>
          </a>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-[13px] font-medium tracking-wide text-[#59524A] shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#8A6739] transition-colors whitespace-nowrap py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Phone (Only on wide screens) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Phone pill only shown on >= 1280px (xl) to guarantee zero crowding on medium/laptop viewports */}
            <a
              href={`tel:${STUDIO_DETAILS.phone.replace(/\s+/g, '')}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-mono text-[#736A5E] hover:text-[#1C1917] transition-colors py-1.5 px-3 rounded-full border border-[#DED6C9] bg-[#F5EFE6]/60 hover:bg-[#EDE5DA] whitespace-nowrap shrink-0"
              title="Studio in Chandkheda, Ahmedabad"
            >
              <Phone className="w-3.5 h-3.5 text-[#8A6739]" />
              <span>{STUDIO_DETAILS.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-3.5 sm:px-4 xl:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-medium tracking-wide text-[#FAF8F5] bg-[#24201D] hover:bg-[#3D3732] rounded-full transition-all whitespace-nowrap shrink-0 shadow-sm active:scale-95 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#CBB38D]" />
              <span className="hidden sm:inline">Book Consultation</span><span className="sm:hidden">Book</span>
            </button>

            {/* Mobile / Tablet Hamburger Button (< 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#59524A] hover:text-[#1C1917] hover:bg-[#EDE5DA] rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E7E0D5] px-4 pt-3 pb-6 mt-3 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#3D3732] hover:text-[#8A6739] py-2.5 px-2 rounded-lg text-sm font-medium hover:bg-[#F5EFE6] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EFEAE2] flex flex-col gap-2">
            <a
              href={`tel:${STUDIO_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs text-[#59524A] py-1.5 px-2"
            >
              <Phone className="w-4 h-4 text-[#8A6739]" />
              <span>Direct Studio: {STUDIO_DETAILS.phoneDisplay}</span>
            </a>
            <a
              href={STUDIO_DETAILS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#736A5E] py-1 px-2 hover:text-[#8A6739]"
            >
              <MapPin className="w-4 h-4 text-[#8A6739]" />
              <span>Orange Mall, Chandkheda, Ahmedabad</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
