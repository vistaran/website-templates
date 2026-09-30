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
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col lg:flex-row bg-[#0F172A] overflow-hidden">
      {/* Left Content Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16 lg:py-24 z-10 relative">
        <div className="max-w-xl w-full">
          {/* Metadata Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B] border border-[#F59E0B]/20 text-[#F59E0B] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <MapPin className="w-4 h-4" />
            Charlotte, NC
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-heading"
          >
            Reliable Lawn Care for a <span className="text-[#F59E0B]">Greener Charlotte.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 leading-relaxed mb-8 font-light"
          >
            Professional sod installation, mulch, and lawn maintenance for a yard you'll love coming home to. We specialize in lush, weed-free sod laid with precision craftsmanship.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
          >
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-[#0F172A] bg-[#F59E0B] hover:bg-[#FCD34D] active:scale-[0.98] rounded-full transition-all duration-150 cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onServicesClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-transparent hover:bg-white/5 border border-white/20 rounded-full transition-all duration-150 cursor-pointer"
            >
              Our Services
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-300"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#F59E0B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Exceptional Sod Layer</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#F59E0B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Quotes Within 24h</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#F59E0B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Licensed & Insured</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-[#F59E0B] shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">5.0 Star Rated (GMB)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Image Area */}
      <div className="w-full lg:w-1/2 relative min-h-[40vh] lg:min-h-full order-first lg:order-last">
        <div className="absolute inset-0 bg-[#F59E0B] mix-blend-multiply opacity-20 z-10" />
        <img
          src="/image.png"
          alt="Freshly manicured Charlotte lawn with mowing stripes by CAB LAWN CARE"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Decorative elements */}
        <div className="absolute -left-10 top-1/4 w-32 h-32 bg-[#0F172A] rounded-full blur-3xl opacity-50 z-20" />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0F172A] via-transparent to-transparent z-10" />
      </div>
    </section>
  );
};
