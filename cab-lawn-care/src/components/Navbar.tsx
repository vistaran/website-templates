import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Leaf, ShieldCheck, Clock } from 'lucide-react';
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
    { label: 'Specialty Sod', href: '#sod-specialty' },
    { label: 'Transformations', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Service Area & Hours', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
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
      {/* Top Notification Bar */}
      <div className="bg-[#1E293B] text-[#FFFBEB] text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              Licensed & Insured in Charlotte, NC
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              Mon–Sat: 7:00 AM – 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span>Specializing in Exceptional Sod Installation</span>
            <span>·</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-[#F59E0B] hover:text-white font-semibold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-gray-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] rounded"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1E293B] transition-colors">
              <Leaf className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xl tracking-tight text-[#0F172A] leading-none">
                CAB LAWN CARE
              </span>
              <span className="text-[11px] font-semibold text-[#333333]/80 tracking-wider uppercase mt-0.5">
                Landscaping LLC · Charlotte
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
                className="text-sm font-medium text-[#333333] hover:text-[#0F172A] transition-colors relative py-1 hover:underline underline-offset-4 decoration-2 decoration-[#F59E0B]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#FFFBEB] rounded-xl transition-colors border border-[#0F172A]/20"
              title="Call CAB LAWN CARE"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F172A] curor-pointer"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="sm:hidden p-2 text-[#0F172A] bg-[#FFFBEB] rounded-xl"
              aria-label="Call +1 (743) 217-6176"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#333333] hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A]"
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
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-[#333333] hover:bg-[#FFFBEB] hover:text-[#0F172A]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFFBEB] text-[#0F172A] font-bold text-center"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                Call Now: {BUSINESS_INFO.phone}
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0F172A] text-white font-semibold text-center hover:bg-[#1E293B]"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
