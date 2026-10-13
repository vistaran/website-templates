import React, { useState } from 'react';
import { ArrowRight, Check, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    // No mailing-list backend on a static deploy — open the visitor's mail
    // client addressed to the studio instead of claiming they were "added".
    const subject = 'Add me to The Trikha Journal';
    const body = `Please add ${newsletterEmail} to The Trikha Journal reading list.`;
    window.location.href =
      `mailto:contact@trikhainteriors.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#262622] text-[#F7F5F0] pt-16 pb-12 border-t border-[#3D3D36]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#3D3D36]">
          {/* Brand & Ethos */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-tight block text-[#F7F5F0]">
                Trikha
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#A6ADA0] block mt-1">
                Interiors · Architecture · Space Planning
              </span>
            </div>
            <p className="text-sm text-[#C8C5BC] leading-relaxed max-w-md">
              Thoughtful interior architecture and residential design tailored to modern living.
              We create serene, tactile environments balancing quiet restraint with authentic materiality and custom craftsmanship.
            </p>

            <div className="flex flex-col space-y-2.5 pt-2 text-xs text-[#A6ADA0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7A8069] shrink-0 mt-0.5" />
                <div>
                  <span>Y/8, Sujata Flats, Shahibag</span>
                  <span className="block text-[#C8C5BC]">Ahmedabad, Gujarat 380004</span>
                  <a
                    href="https://maps.app.goo.gl/PZYmV4TyLKRRoZWc6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C8C5BC] hover:text-white underline mt-1 text-[11px]"
                  >
                    <span>View Location on Google Maps ↗</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7A8069] shrink-0" />
                <a href="tel:+919825012345" className="hover:text-white">
                  +91 98250 12345
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7A8069] shrink-0" />
                <a href="mailto:contact@trikhainteriors.com" className="hover:text-white">
                  contact@trikhainteriors.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7A8069] shrink-0" />
                <span>Monday – Saturday: 9:30 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#A6ADA0] font-medium">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8C5BC]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Design Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Booking & Client Services */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#A6ADA0] font-medium">
              Appointments
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8C5BC]">
              <li>
                <button
                  onClick={() => onNavigate('book')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Schedule Consultation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('manage')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Manage / Reschedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Studio Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#A6ADA0] font-medium">
              The Trikha Journal
            </h4>
            <p className="text-xs text-[#C8C5BC] leading-relaxed">
              Curated architectural insights, quarterly material studies, and private portfolio previews.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#33332D] border border-[#7A8069]/40 text-xs text-[#A6ADA0] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7A8069]" />
                <span>Almost there &mdash; press send in your mail app to join the reading list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border border-[#4D4D44] focus-within:border-[#A6ADA0] transition-colors">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-transparent px-3 py-2 text-xs text-white placeholder-[#787870] focus:outline-hidden w-full"
                  />
                  <button
                    type="submit"
                    className="bg-[#7A8069] px-3 text-white hover:bg-[#8D947B] transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-[#787870] block">
                  Strictly confidential. No spam, ever.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8C80] gap-4">
          <p>
            © {new Date().getFullYear()} Trikha Interiors. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://maps.app.goo.gl/PZYmV4TyLKRRoZWc6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A6ADA0] hover:text-white transition-colors"
            >
              Shahibag, Ahmedabad (Google Maps ↗)
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Studio
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('book')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
