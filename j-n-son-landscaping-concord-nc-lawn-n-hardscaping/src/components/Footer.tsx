import React from "react";
import { BUSINESS_INFO } from "../data/content";
import { Phone, MapPin, Mail, ShieldAlert } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-soil text-brand-cream border-t border-brand-sage/10 py-16 relative overflow-hidden">
      {/* Subtle brand backdrop */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-leaf/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-brand-cream/10">
          
          {/* Column 1: Brand Wordmark & Location (5 columns) */}
          <div className="md:col-span-5 text-left flex flex-col items-start gap-4">
            <span className="text-2xl font-serif font-black tracking-tight text-white block">
              {BUSINESS_INFO.name}
            </span>
            <p className="text-xs sm:text-sm text-brand-cream/60 leading-relaxed max-w-sm">
              Providing precision residential turf management, landscape renovations, 
              and robust stone masonry across the north Charlotte area since {BUSINESS_INFO.established}.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-clay font-bold mt-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>LICENSED &amp; FULLY INSURED LOCAL B2C/B2B</span>
            </div>
          </div>

          {/* Column 2: Navigation Mirror (4 columns) */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase mb-4">
              SITE MAP &amp; SECTIONS
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-brand-cream/75">
              <button
                onClick={() => onScrollToSection("services")}
                className="hover:text-brand-clay transition-colors text-left py-0.5 cursor-pointer"
              >
                Our Services
              </button>
              <button
                onClick={() => onScrollToSection("gallery")}
                className="hover:text-brand-clay transition-colors text-left py-0.5 cursor-pointer"
              >
                Portfolio Gallery
              </button>
              <button
                onClick={() => onScrollToSection("transformations")}
                className="hover:text-brand-clay transition-colors text-left py-0.5 cursor-pointer"
              >
                Transformations Slider
              </button>
              <button
                onClick={() => onScrollToSection("calculator")}
                className="hover:text-brand-clay transition-colors text-left py-0.5 cursor-pointer"
              >
                Lawn Sod Calculator
              </button>
              <button
                onClick={() => onScrollToSection("process")}
                className="hover:text-brand-clay transition-colors text-left py-0.5"
              >
                Our 4-Step Process
              </button>
              <button
                onClick={() => onScrollToSection("reviews")}
                className="hover:text-brand-clay transition-colors text-left py-0.5"
              >
                Customer Reviews
              </button>
            </nav>
          </div>

          {/* Column 3: Contact & Hours (4 columns) */}
          <div className="md:col-span-4 text-left flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase mb-1">
              DIRECT OFFICE CONTACTS
            </h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-brand-cream/75">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-brand-clay transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-brand-clay shrink-0" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-clay shrink-0" />
                <span>Serving Concord, NC &amp; Surrounds</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-clay shrink-0" />
                <span className="truncate">estimates@jandsonlandscaping.com</span>
              </div>
            </div>
            
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-cream/45 block mb-1">
                OPERATIONAL OFFICE HOURS
              </span>
              <span className="text-xs font-medium text-brand-cream/75">
                Mon – Sat: 7:00 AM – 6:00 PM | Sun: Closed
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-cream/45 text-center sm:text-left">
          <span>
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </span>
          <div className="flex gap-4">
            <span>Made locally in North Carolina</span>
            <span>·</span>
            <span>Owner: {BUSINESS_INFO.owner}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
