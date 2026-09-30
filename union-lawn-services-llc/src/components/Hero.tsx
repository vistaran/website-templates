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
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-800">
      {/* Background Lawn Image with Multi-layer Gradient Overlay for perfect readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image.png"
          alt="Freshly manicured Charlotte lawn with mowing stripes by Union Lawn Services LLC"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.82] contrast-[1.05]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Darkening Overlays for better text visibility */}
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28 w-full flex justify-center">
        <div className="max-w-4xl flex flex-col items-center text-center">
          {/* Unboxed Metadata & Credibility Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-emerald-50/90 font-medium tracking-wide uppercase mb-4 drop-shadow-md"
          >
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <MapPin className="w-3.5 h-3.5" />
              Charlotte, NC
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span>Zip 28216 & Greater Charlotte</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-yellow-300 font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-300" />
              5.0 Star Rated (GMB)
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-heading drop-shadow-lg"
          >
            Crafting the Perfect Outdoor Space for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">
              Your Home.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-100 leading-relaxed max-w-2xl mb-10 drop-shadow-md font-medium"
          >
            Professional sod installation, mulch, and lawn maintenance for a yard you'll love coming home to.
            Specializing in lush, weed-free sod laid with precision craftsmanship across Charlotte and Mecklenburg County.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full"
          >
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-tr from-emerald-600 to-green-400 hover:from-emerald-500 hover:to-green-300 active:scale-[0.98] rounded-xl  transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onServicesClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              Our Services
            </button>
          </motion.div>

          {/* Trust Highlights - Zero-Pill Typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 sm:gap-12 text-white/90 w-full"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs text-white/70 uppercase font-bold tracking-wider">Turf Specialty</span>
                <span className="text-sm font-semibold">Exceptional Sod Layer</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-500 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs text-white/70 uppercase font-bold tracking-wider">Fast Turnaround</span>
                <span className="text-sm font-semibold">Quotes Within 24h</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs text-white/70 uppercase font-bold tracking-wider">Charlotte Verified</span>
                <span className="text-sm font-semibold">Licensed & Insured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
