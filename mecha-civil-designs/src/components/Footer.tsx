import React from 'react';
import { STUDIO_DETAILS } from '../data/portfolioData';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#F5EFE6] border-t border-[#E7E0D5] text-[#59524A] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded border border-[#C5B8A5] bg-[#FFFFFF] flex items-center justify-center text-[#78562E] font-serif text-base font-medium">
                M
              </span>
              <span className="font-serif text-2xl tracking-[0.03em] font-semibold text-[#1C1917]">
                MECHA <span className="font-light italic text-[#8A6739]">Civil Designs</span>
              </span>
            </div>

            <p className="text-[#59524A] text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              Ahmedabad’s premier interior architecture and turnkey civil execution studio. Designing and delivering bespoke residential penthouses, corporate offices, and boutique showrooms since 2014.
            </p>

            <div className="text-[11px] text-[#8C8275] font-mono">
              Reg. Studio Address: 231, Second Floor, Orange Mall, Nr. Sharda Petrol Pump, Chandkheda, Ahmedabad - 382424, Gujarat, India.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#1C1917] font-semibold">
              Spatial Navigation
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#portfolio" className="hover:text-[#8A6739] transition-colors">
                  Lookbook & Selected Works
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#8A6739] transition-colors">
                  Civil Engineering & Scope
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#8A6739] transition-colors">
                  Turnkey Cost Estimator
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#8A6739] transition-colors">
                  Material Palette Library
                </a>
              </li>
              <li>
                <a href="#studio-location" className="hover:text-[#8A6739] transition-colors">
                  Studio Location & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#1C1917] font-semibold">
              Atelier Contact & Location
            </div>

            <div className="space-y-2.5 text-[#59524A]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8A6739]" />
                <a href={`tel:${STUDIO_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-[#1C1917] font-mono">
                  {STUDIO_DETAILS.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8A6739]" />
                <a href={`mailto:${STUDIO_DETAILS.email}`} className="hover:text-[#1C1917] font-mono">
                  {STUDIO_DETAILS.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8A6739]" />
                <a
                  href={STUDIO_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8A6739] flex items-center gap-1 text-[#3D3732]"
                >
                  <span>Google Maps: Chandkheda Studio</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-1 text-[11px] text-[#8C8275] font-light">
                Studio Hours: Monday – Saturday: 10:00 AM – 7:30 PM (Sunday by Prior Appointment)
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#DED6C9] hover:border-[#8A6739] text-[#1C1917] text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                Book Studio Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E7E0D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C8275]">
          <div>
            © {new Date().getFullYear()} Mecha Civil Designs. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={STUDIO_DETAILS.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#1C1917]">
              Google Maps Location
            </a>
            <span aria-hidden="true">·</span>
            <a href="https://wa.me/919725935504" target="_blank" rel="noopener noreferrer" className="hover:text-[#1C1917]">
              WhatsApp Direct Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
