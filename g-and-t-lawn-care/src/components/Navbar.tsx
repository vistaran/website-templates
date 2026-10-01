import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldCheck, Clock, Flame, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
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
    { label: 'Services', href: '#services' },
    { label: 'Why G & T', href: '#why-us' },
    { label: 'Transformations', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gastonia Map', href: '#service-area' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#022c22] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              Temperatures are hot! Need your grass cut? Call for a free quote today.
            </span>
            <span className="flex items-center gap-1.5 text-emerald-200/90">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Open 7 Days: 8:00 AM – 6:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="flex items-center gap-1 text-emerald-200/80">
              <MapPin className="w-3 h-3 text-amber-400" />
              940 Etta Pl, Gastonia, NC
            </span>
            <span>&middot;</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-900/10 py-3'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Logo & Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 rounded-lg"
          >
            <img
              src="/gt-logo.jpg"
              alt="G & T Lawn Care Logo"
              className="w-11 h-11 rounded-full object-cover shadow-sm border-2 border-emerald-800 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-2xl tracking-tight text-[#022c22] leading-none font-heading flex items-center gap-1">
                G & T <span className="text-emerald-700 font-black">Lawn Care</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1 flex items-center gap-1">
                <span>Gastonia, NC</span>
                <span>&middot;</span>
                <span className="text-amber-600 font-bold">5.0 ★ Rated</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-900 transition-colors relative py-1 hover:underline underline-offset-4 decoration-2 decoration-amber-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#022c22] bg-emerald-50 hover:bg-emerald-100/80 rounded-xl transition-colors border border-emerald-200"
              title="Call G & T Lawn Care"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={onQuoteClick}
              className="btn-vibrant btn-primary inline-flex items-center justify-center px-5 py-2.5 text-sm rounded-xl font-bold cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="sm:hidden p-2.5 text-emerald-950 bg-amber-400 rounded-xl font-bold shadow-sm"
              aria-label="Call (716) 462-3657"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="space-y-1 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-900"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-100 text-[#022c22] font-bold text-center"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                Call Now: {BUSINESS_INFO.phone}
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="btn-vibrant btn-primary w-full py-3.5 px-4 rounded-xl text-center font-bold"
              >
                Get Free Quote Today
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
