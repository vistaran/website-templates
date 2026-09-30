import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface HeroProps {
  onQuoteClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onServicesClick }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0D2614]">
      {/* Background Lawn Image with Multi-layer Gradient Overlay for perfect readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image.png"
          alt="Freshly manicured Charlotte lawn with mowing stripes by M&J Tree Service LLC"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.82] contrast-[1.05]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Darkening Forest-Green Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170B]/90 via-[#0D2614]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07170B] via-transparent to-[#07170B]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 w-full">
        <div className="max-w-3xl">
          {/* Unboxed Metadata & Credibility Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#F2FAF0]/90 font-medium tracking-wide uppercase mb-4"
          >
            <span className="flex items-center gap-1 text-[#6B9E4B] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              Charlotte, NC
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span>Zip 28273 & Greater Charlotte</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-[#E6A817] font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#E6A817]" />
              5.0 Star Rated (GMB)
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-heading"
          >
            Safe & Professional Tree Services in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">
              Charlotte.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#FAFAFA]/90 leading-relaxed max-w-2xl mb-8 font-light"
          >
            Professional sod installation, mulch, and lawn maintenance for a yard you'll love coming home to.
            Specializing in lush, weed-free sod laid with precision craftsmanship across Charlotte and Mecklenburg County.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
          >
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-[#6B9E4B] hover:bg-[#57863A] active:scale-[0.98] rounded-2xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9E4B] focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onServicesClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 rounded-2xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              Our Services
            </button>
          </motion.div>

          {/* Trust Highlights - Zero-Pill Typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-white/90"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#6B9E4B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase font-medium">Turf Specialty</span>
                <span className="text-sm font-semibold">Exceptional Sod Layer</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#6B9E4B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase font-medium">Fast Turnaround</span>
                <span className="text-sm font-semibold">Quotes Within 24h</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-5 h-5 text-[#6B9E4B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase font-medium">Charlotte Verified</span>
                <span className="text-sm font-semibold">Licensed & Insured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
