import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, ArrowRight, Clock, MapPin, CheckCircle2, Phone, Flame, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface HeroProps {
  onQuoteClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onServicesClick }) => {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#022c22]">
      {/* Background Lawn Image with Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image.png"
          alt="Freshly manicured Gastonia lawn with mowing stripes by G & T Lawn Care"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.75] contrast-[1.08]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Forest Emerald to Night Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#022c22]/98 via-[#022c22]/85 to-[#064e3b]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-[#022c22]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Value Proposition & Actions (7 cols) */}
          <div className="lg:col-span-7">
            {/* Unboxed Metadata & Credibility Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-emerald-200 font-medium tracking-wide uppercase mb-4"
            >
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                Gastonia, NC
              </span>
              <span aria-hidden="true" className="text-white/40">&middot;</span>
              <span className="text-emerald-100">940 Etta Pl & Gaston County</span>
              <span aria-hidden="true" className="text-white/40">&middot;</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                5.0 Star Rated (38 Reviews)
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-heading"
            >
              Precision Lawn Care & Clean Grass Cutting in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Gastonia, NC.
              </span>
            </motion.h1>

            {/* Sub-headline with Owner Post Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span>Temperatures are hot — Call for a free quote today!</span>
              </div>

              <p className="text-lg sm:text-xl text-emerald-100/90 leading-relaxed max-w-2xl">
                Reliable weekly and bi-weekly mowing, sharp vertical sidewalk edging, shrub trimming, and full property cleanups. 
                Locally based at 940 Etta Pl, serving homeowners across Gastonia and Belmont.
              </p>
            </motion.div>

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
                className="btn-vibrant btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base rounded-2xl cursor-pointer"
              >
                <span>Get Your Free Estimate</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="btn-vibrant inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-white bg-emerald-900/60 hover:bg-emerald-800/80 backdrop-blur-sm border border-emerald-400/30 rounded-2xl transition-all duration-150 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-emerald-100/90"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-emerald-300/80 uppercase font-medium">Straight Stripes</span>
                  <span className="text-sm font-bold text-white">Crisp Blade Edging</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-emerald-300/80 uppercase font-medium">Open 7 Days</span>
                  <span className="text-sm font-bold text-white">8:00 AM – 6:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-emerald-300/80 uppercase font-medium">Local Gastonia</span>
                  <span className="text-sm font-bold text-white">5.0 Star Reviewed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Quick Dispatch & Instant Estimate Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 text-slate-900 relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Fast Response
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-[#022c22] font-heading tracking-tight mb-2">
                  Need Your Grass Cut?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Call or message G & T Lawn Care today for immediate route scheduling in Gastonia, Belmont, and nearby neighborhoods.
                </p>
              </div>

              {/* Direct Phone Highlight Card */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
                    Direct Customer Hotline
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-xl sm:text-2xl font-black text-[#022c22] hover:text-emerald-700 transition-colors tracking-tight font-heading"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>

              {/* Service Badges */}
              <div className="space-y-2 mb-6 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Routine Grass Mowing & Striping</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vertical Edging & Trimming Along Walkways</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hedge Trimming & Bush Shaping</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Property Clean-ups & Mulch Refresh</span>
                </div>
              </div>

              {/* Book button */}
              <button
                type="button"
                onClick={onQuoteClick}
                className="w-full py-4 rounded-2xl bg-[#064e3b] hover:bg-[#022c22] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Free Gastonia Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  Mon – Sun: 8:00 AM – 6:00 PM &bull; 940 Etta Pl, Gastonia, NC
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
