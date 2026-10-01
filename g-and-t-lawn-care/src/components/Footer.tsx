import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#022c22] text-emerald-100 pt-16 pb-24 lg:pb-16 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/40">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/gt-logo.jpg"
                alt="G & T Lawn Care Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
              <span className="font-black text-2xl tracking-tight text-white font-heading">
                G & T <span className="text-amber-400">Lawn Care</span>
              </span>
            </div>

            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Providing precision residential and commercial lawn mowing, sharp vertical edging, hedge trimming, 
              and seasonal property cleanups across Gastonia and Gaston County, NC.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Locally Owned & Operated in Gastonia, North Carolina</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  The G & T Standard
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Transformation Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  5-Star Google Reviews
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-white transition-colors">
                  Gastonia Service Area & Map
                </a>
              </li>
              <li>
                <a href="#contact-quote" className="hover:text-white transition-colors">
                  Free Quote Request
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
              Contact & Hours
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-emerald-200/80">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-[11px] text-amber-300">Call or Text for Free Quotes</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <span>940 Etta Pl, Gastonia, NC 28054</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                  <div className="text-[11px] text-emerald-300">Gaston County, North Carolina</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-bold">Mon – Sun: 8:00 AM – 6:00 PM</span>
                  <span className="text-emerald-300 text-[11px]">Open 7 Days a Week</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <div>
            &copy; {currentYear} G & T Lawn Care. All rights reserved. 940 Etta Pl, Gastonia, NC 28054.
          </div>
          <div className="flex items-center gap-4">
            <span>Precision Grass Cutting & Edging</span>
            <span>&middot;</span>
            <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              Google Maps Listing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
