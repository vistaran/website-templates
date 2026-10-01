import React from 'react';
import { businessDetails } from '../data/content';
import { MapPin, Phone, ShieldCheck, ExternalLink, Clock, CreditCard } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenCalculator }) => {
  return (
    <footer className="bg-[#091b11] text-white border-t border-[#163825] pt-16 pb-24 sm:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Legacy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-[#0c2317] font-display font-bold text-xl flex items-center justify-center">
                CL
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-white block leading-none">
                  Carolina Lawn Enhancement
                </span>
                <span className="text-[11px] text-[#8fa897] font-medium tracking-wide">
                  Established 1988 · Charlotte, NC
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9bb3a4] leading-relaxed">
              36+ years of specialized lawn care maintenance, turf installation, and designer landscaping for fine residences, private estates, and commercial grounds throughout Charlotte and Mecklenburg County.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#cad8cf]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>10915 Delsing Ct, Charlotte, NC 28214</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${businessDetails.phoneRaw}`} className="font-bold text-white hover:text-amber-300">
                  (704) 918-0398
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon–Fri: 7:00 AM – 6:30 PM · Sat: 8:00 AM – 3:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base font-bold text-amber-400">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs text-[#a7beb0]">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Precision Lawn Mowing & Striping</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Designer Landscaping & Custom Beds</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Lawn Installation & Farm-Cut Sod</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Core Aeration & Clay Soil Seeding</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Dark Hardwood Mulch & Pine Straw</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Commercial & HOA Grounds Contracts</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information (Service Area, Hours, Reviews, FAQ) (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base font-bold text-amber-400">
              Information & Guides
            </h4>
            <ul className="space-y-2 text-xs text-[#a7beb0]">
              <li>
                <a href="#hours-area" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Service Area & Operating Hours</span>
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Customer Reviews (4.9★ Rating)</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Frequently Asked Questions (FAQ)</span>
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Before &amp; After Photo Gallery</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] text-neutral-400 block font-semibold mb-1">Serving Greater Charlotte:</span>
              <p className="text-[11px] text-[#8ea696] leading-relaxed">
                Paw Creek, Mountain Island Lake, Riverbend, Coulwood, Belmont, Mount Holly, Huntersville &amp; Mecklenburg County.
              </p>
              <a
                href={businessDetails.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white"
              >
                <span>View Google Maps Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 4: Billing & Actions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-base font-bold text-amber-400">
              Quick Actions
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#0c2317] font-bold text-xs transition-colors cursor-pointer text-center"
              >
                Free On-Site Quote
              </button>
              <a
                href="#book-appointment"
                className="w-full py-2 px-3 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white font-medium text-xs transition-colors cursor-pointer text-center border border-emerald-600/30"
              >
                📅 Book on Calendar
              </a>
              <button
                onClick={onOpenCalculator}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors cursor-pointer text-center border border-white/10"
              >
                Sod Calculator
              </button>
            </div>
            
            <div className="pt-2 text-[11px] text-[#8fa897] space-y-1">
              <span className="block font-bold text-neutral-300">Accepted Invoicing:</span>
              <span className="block">QuickBooks Auto-Pay</span>
              <span className="block">Monthly Billing Statements</span>
              <span className="block">Annual Fixed Contracts</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d9685]">
          <p>
            © {new Date().getFullYear()} Carolina Lawn Enhancement / Lawn Enhancement Inc. All rights reserved. 10915 Delsing Ct, Charlotte, NC 28214.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Licensed & Insured NC Contractor
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
