import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS_INFO } from "../data/content";

interface NavbarProps {
  onOpenQuote: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onScrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-sage/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-serif font-black tracking-tight text-brand-moss hover:opacity-90 transition-opacity shrink-0"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: Primary navigation links (5 clean single-line links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-brand-soil/80">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, "services")}
            className="hover:text-brand-leaf transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-leaf hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, "gallery")}
            className="hover:text-brand-leaf transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-leaf hover:after:w-full after:transition-all after:duration-300"
          >
            Portfolio
          </a>
          <a
            href="#transformations"
            onClick={(e) => handleNavClick(e, "transformations")}
            className="hover:text-brand-leaf transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-leaf hover:after:w-full after:transition-all after:duration-300"
          >
            Before &amp; After
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, "calculator")}
            className="hover:text-brand-leaf transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-leaf hover:after:w-full after:transition-all after:duration-300"
          >
            Sod Calculator
          </a>
          <a
            href="#reviews"
            onClick={(e) => handleNavClick(e, "reviews")}
            className="hover:text-brand-leaf transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-leaf hover:after:w-full after:transition-all after:duration-300"
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: Primary action button and mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="hidden sm:flex items-center gap-2 text-xs font-mono font-semibold text-brand-leaf bg-brand-sage/40 hover:bg-brand-sage/80 px-3 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="hidden md:block px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-leaf hover:bg-brand-moss transition-all duration-200 rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            Get Free Quote
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-brand-soil hover:text-brand-leaf transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-brand-cream border-b border-brand-sage shadow-md transition-all duration-300">
          <div className="px-6 py-6 flex flex-col gap-5 text-base font-semibold text-left">
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className="text-brand-soil hover:text-brand-leaf transition-colors py-1"
            >
              Our Services
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "gallery")}
              className="text-brand-soil hover:text-brand-leaf transition-colors py-1"
            >
              Portfolio Gallery
            </a>
            <a
              href="#transformations"
              onClick={(e) => handleNavClick(e, "transformations")}
              className="text-brand-soil hover:text-brand-leaf transition-colors py-1"
            >
              Before &amp; After Comparison
            </a>
            <a
              href="#calculator"
              onClick={(e) => handleNavClick(e, "calculator")}
              className="text-brand-soil hover:text-brand-leaf transition-colors py-1"
            >
              Lawn Sod &amp; Mulch Calculator
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleNavClick(e, "reviews")}
              className="text-brand-soil hover:text-brand-leaf transition-colors py-1"
            >
              Google Reviews (5.0 ★)
            </a>

            <hr className="border-brand-sage/60 my-2" />

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 border border-brand-leaf/20 rounded-lg text-brand-leaf font-mono text-sm font-bold bg-brand-sage/20 hover:bg-brand-sage/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3.5 bg-brand-leaf hover:bg-brand-moss text-brand-cream font-bold rounded-lg transition-colors shadow-sm text-center text-sm cursor-pointer"
              >
                Request Free Estimate
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
