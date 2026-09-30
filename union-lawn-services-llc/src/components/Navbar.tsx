import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Leaf, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/content';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto pointer-events-auto"
        >
          <div className={`relative flex items-center justify-between px-4 sm:px-6 py-3 rounded-xl transition-all duration-500 shadow-2xl ${isScrolled ? 'bg-white/80 backdrop-blur-xl border border-white/40 shadow-emerald-900/5' : 'bg-white/95 backdrop-blur-md shadow-black/5 border border-white/50'}`}>
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-white  group-hover:scale-105 transition-transform duration-300">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
                  Union
                </span>
                <span className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase mt-0.5">
                  Lawn Services
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-3 z-10">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                {BUSINESS_INFO.phone}
              </a>

              <button
                type="button"
                onClick={onQuoteClick}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-tr from-emerald-600 to-green-400 hover:from-emerald-500 hover:to-green-300 rounded-xl  hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Quote
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl pointer-events-auto"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg font-bold text-slate-800 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-2xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-50 text-emerald-700 font-bold rounded-2xl"
                >
                  <Phone className="w-5 h-5" />
                  {BUSINESS_INFO.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onQuoteClick();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-tr from-emerald-600 to-green-400 text-white font-bold rounded-2xl "
                >
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
