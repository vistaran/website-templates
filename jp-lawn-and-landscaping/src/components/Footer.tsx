import React from 'react';
import { BUSINESS_INFO, SERVICES, SERVICE_AREAS } from '../data/content';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Star } from 'lucide-react';

interface FooterProps {
  onOpenQuote: (service?: string) => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenCalculator, onOpenBooking }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-28 sm:pb-14 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-black text-lg border border-emerald-400/40">
                JP
              </div>
              <div>
                <span className="text-xl font-bold text-white block">
                  JP Lawn and Landscaping
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Kannapolis & Concord, NC
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Family-owned residential and commercial landscaping company serving Kannapolis, Concord, and Cabarrus County with dedicated lawn mowing, custom paver hardscaping, sod installation, and tree services for over 10 years.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">5.0 Star Rated on Google</span>
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/70 border border-emerald-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Licensed & Fully Insured in NC</span>
              </span>
            </div>
          </div>

          {/* Quick Links & Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-emerald-400 transition-colors">Before & After Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-400 transition-colors">Customer Reviews (5.0 ★)</a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-emerald-400 transition-colors">Service Area & Hours</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold text-left transition-colors cursor-pointer"
                >
                  Schedule On-Site Visit
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="text-stone-300 hover:text-emerald-400 font-semibold text-left transition-colors cursor-pointer"
                >
                  Sod & Mulch Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Services List (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Landscaping Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <button
                    onClick={() => onOpenQuote(svc.title)}
                    className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-white font-bold hover:text-emerald-400">
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-stone-300 hover:text-white truncate">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mon – Sat: 7:00 AM – 7:00 PM<br />Sunday: Closed</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 hover:text-white hover:border-emerald-500 transition-colors"
              >
                <span>Google Maps Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Communities Served Footer Strip */}
        <div className="py-6 border-b border-stone-800/80 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start">
            <span className="font-semibold text-stone-300">Service Coverage:</span>
            {SERVICE_AREAS.map((a, i) => (
              <span key={a.name}>
                {a.name}, NC {i < SERVICE_AREAS.length - 1 && '•'}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} JP Lawn and Landscaping. All rights reserved. Locally operated in Kannapolis, NC.</p>
          <p className="text-stone-500">Commercial & Residential Outdoor Services</p>
        </div>

      </div>
    </footer>
  );
};
