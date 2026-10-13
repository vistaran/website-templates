import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
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
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About the Studio' },
    { id: 'journal', label: 'Journal' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E8E0D5] py-3.5 shadow-xs'
          : 'bg-[#F7F5F0]/90 backdrop-blur-xs border-b border-[#E8E0D5]/60 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Studio Identity */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262622]"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#262622] block font-medium group-hover:text-[#7A8069] transition-colors">
            Trikha
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A8069] block font-sans">
            Interiors · Architecture
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm tracking-wide transition-colors cursor-pointer relative py-1 focus-visible:outline-2 focus-visible:outline-[#262622] ${
                  isActive
                    ? 'text-[#262622] font-medium'
                    : 'text-[#66665E] hover:text-[#262622]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#262622] animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Primary Consultation CTA */}
          <button
            onClick={() => onNavigate('book')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-[#262622] ${
              currentPage === 'book'
                ? 'bg-[#7A8069] text-white shadow-xs'
                : 'bg-[#262622] text-[#F7F5F0] hover:bg-[#3E4035]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 opacity-80" />
            <span>Book a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => onNavigate('book')}
            className="px-3 py-1.5 text-[11px] uppercase tracking-wider bg-[#262622] text-white cursor-pointer"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#262622] hover:bg-[#E8E0D5] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F0] border-b border-[#E8E0D5] px-6 py-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-base py-1.5 transition-colors cursor-pointer font-serif ${
                  currentPage === link.id
                    ? 'text-[#262622] font-semibold pl-2 border-l-2 border-[#262622]'
                    : 'text-[#66665E] hover:text-[#262622]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#E8E0D5] flex flex-col gap-3">
              <button
                onClick={() => {
                  onNavigate('book');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
