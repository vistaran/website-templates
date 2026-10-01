import React from 'react';
import { Phone, Star, ShieldCheck, Clock, Calendar, CheckCircle2, ArrowRight, Calculator, Award, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface HeroProps {
  onOpenQuote: (service?: string) => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenCalculator, onOpenBooking }) => {
  return (
    <section className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white pt-8 pb-20 sm:pt-14 sm:pb-28 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Rating & Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">5.0 Star Rated</span>
              <span className="text-emerald-500">•</span>
              <span>Kannapolis & Concord, NC</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Kannapolis & Concord's Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-200">Lawn & Landscape</span> Craftsmen
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From pristine weekly mowing and laser-straight edging to custom paver patios, lush sod installation, and professional tree trimming. Dependable local crew with 10+ years of dedicated service in Cabarrus and Rowan counties.
            </p>

            {/* Key Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Long Contracts</span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-Day Estimates</span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Commercial Equipment</span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10+ Yrs In Business</span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Locally Owned Crew</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={() => onOpenQuote()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-stone-950 font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Get Your Free Estimate</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-800 border border-stone-700/80 text-white font-semibold text-base transition-all flex items-center justify-center gap-2.5 hover:border-emerald-500/60"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Quick Helper Tool launcher */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-stone-400">
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-medium transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Need to calculate sod pallets or mulch yards? Click here</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Visual Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow & Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 shadow-2xl bg-stone-800/60 backdrop-blur-sm">
                
                {/* Image */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Manicured lawn and landscape in Kannapolis NC"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback in case of network issue
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80";
                    }}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Floating Badges on Image */}
                  <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md border border-stone-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Top Pro on Thumbtack</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">Local Excellence</span>
                    <h3 className="text-lg font-bold text-white">JP Lawn and Landscaping</h3>
                    <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      1400 Birch St, Kannapolis, NC 28081
                    </p>
                  </div>
                </div>

                {/* Quick Interactive Selector inside Card */}
                <div className="p-5 bg-stone-900 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-stone-800">
                    <span className="text-stone-400 font-medium">Popular Services in Kannapolis:</span>
                    <span className="text-emerald-400 font-semibold">100% Free Quotes</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { name: "Lawn Mowing", icon: "🌱", id: "lawn-maintenance" },
                      { name: "Paver Patios", icon: "🧱", id: "hardscaping-pavers" },
                      { name: "Sod Install", icon: "🌾", id: "sod-installation" },
                      { name: "Tree Trimming", icon: "🌳", id: "tree-service" },
                      { name: "Mulch & Pine Straw", icon: "🍂", id: "mulch-pine-straw" },
                      { name: "Yard Cleanups", icon: "🧹", id: "seasonal-cleanups" },
                    ].map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => onOpenQuote(svc.name)}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-800/80 hover:bg-emerald-950/70 border border-stone-700/60 hover:border-emerald-500/50 text-stone-200 hover:text-white transition-all text-left cursor-pointer group"
                      >
                        <span className="text-sm">{svc.icon}</span>
                        <span className="font-medium truncate group-hover:text-emerald-300">{svc.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      onClick={onOpenBooking}
                      className="w-1/2 py-2.5 px-3 rounded-lg border border-stone-700 hover:border-emerald-500 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Book On-Site</span>
                    </button>
                    <button
                      onClick={() => onOpenQuote()}
                      className="w-1/2 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-emerald-500/30"
                    >
                      <span>Custom Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Stat Widget */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-emerald-600 text-white p-3.5 rounded-xl shadow-xl border border-emerald-400/40 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-black text-lg">
                  10+
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Years Serving</div>
                  <div className="text-xs text-emerald-100">Kannapolis & Concord</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Trust Ribbon below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">5.0 ★</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">Google & Thumbtack</div>
            <div className="text-xs text-stone-400 mt-0.5">Top-Rated Quality Work</div>
          </div>
          <div className="p-3 border-l border-stone-800">
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">Free Quotes</div>
            <div className="text-xs text-stone-400 mt-0.5">No Obligation Pricing</div>
          </div>
          <div className="p-3 border-t md:border-t-0 md:border-l border-stone-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">10+ Yrs</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">Local Experience</div>
            <div className="text-xs text-stone-400 mt-0.5">Kannapolis Roots</div>
          </div>
          <div className="p-3 border-t md:border-t-0 border-l border-stone-800">
            <div className="text-2xl sm:text-3xl font-black text-white">0</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">Contract Traps</div>
            <div className="text-xs text-stone-400 mt-0.5">Pause Or Stop Anytime</div>
          </div>
        </div>
      </div>
    </section>
  );
};
