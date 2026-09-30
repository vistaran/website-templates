import React from 'react';
import { Leaf, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#291002] text-[#F7FEE7] pt-16 pb-24 lg:pb-16 border-t border-amber-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-sm bg-[#65A30D] flex items-center justify-center text-white shadow-sm">
                <Leaf className="w-5 h-5 text-[#1A3317]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                Vasquez Landcare INC
              </span>
            </div>

            <p className="text-sm text-stone-100/80 leading-relaxed max-w-sm">
              Transforming Charlotte lawns into extraordinary landscapes. Specializing in exceptional sod installation,
              precision lawn maintenance, and rich mulch refreshes across Charlotte, NC and surrounding areas.
            </p>

            <div className="flex items-center gap-2 text-xs text-lime-300 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-[#65A30D]" />
              <span>Licensed & Insured Landscape Contractor in North Carolina</span>
            </div>

            {/* Social Media Links - hidden until the client supplies real profiles */}
            {(BUSINESS_INFO.socialLinks.facebook || BUSINESS_INFO.socialLinks.instagram) && (
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white/10 hover:bg-[#65A30D] hover:text-[#1A3317] flex items-center justify-center transition-colors text-white"
                aria-label="Vasquez Landcare INC Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={BUSINESS_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white/10 hover:bg-[#65A30D] hover:text-[#1A3317] flex items-center justify-center transition-colors text-white"
                aria-label="Vasquez Landcare INC Instagram Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-stone-100/80">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#sod-specialty" className="hover:text-white transition-colors">
                  Sod Installation Specialty
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
                  Charlotte Service Area
                </a>
              </li>
              <li>
                <a href="#contact-quote" className="hover:text-white transition-colors">
                  Free Quote Request
                </a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 font-heading">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-stone-100/80">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact-quote" className="hover:text-white transition-colors">
                  Yard Cleanups & Mulch
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 font-heading">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-100/80">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-bold text-white hover:text-[#65A30D] transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-[11px] text-lime-300">Call or Text Anytime</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/Lam9RzaPup69RUF47"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#65A30D] transition-colors"
                  >
                    Charlotte, NC 28273
                  </a>
                  <div className="text-[11px] text-lime-300">Mecklenburg County</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Mon - Sun: 7am - 8pm</span>
                  <span className="text-lime-300/80 text-[11px]"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & SEO Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lime-200/70">
          <div>
            © {currentYear} Vasquez Landcare INC. All rights reserved. Charlotte, NC.
          </div>
          <div className="flex items-center gap-4">
            <span>Specializing in Exceptional Sod Installation</span>
            <span>·</span>
            <span>Charlotte Lawn Care & Mulch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
