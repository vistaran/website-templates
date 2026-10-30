import React, { useState } from 'react';
import { 
  Phone, Star, ShieldCheck, CheckCircle2, ArrowRight, 
  MapPin, Sparkles, Check, Zap, Award 
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface HeroProps {
  onOpenQuote: (service?: string, notes?: string) => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenCalculator }) => {
  const { businessInfo } = useBusiness();

  // Simple, frictionless fast-estimate form
  const [selectedService, setSelectedService] = useState('Lawn Mowing & Precision Edging');
  const [addressInput, setAddressInput] = useState('');

  const cityAreaLabel = businessInfo.secondaryCity
    ? `${businessInfo.city} & ${businessInfo.secondaryCity}`
    : businessInfo.city;

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notes = addressInput ? `[Hero Request]: Property Address: ${addressInput}` : '';
    onOpenQuote(selectedService, notes);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#F5F9F6] via-[#EDF5F0] to-[#E7F0E9] text-stone-900 pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-stone-200">
      
      {/* Subtle Natural Daylight Lawn Background with soft ambient blend */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&w=2000&q=80" 
          alt="Sunlit green lawn background"
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#F2F7F4]/90 to-[#E7F0E9]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Social Proof, Sunlit Headline & Dual CTAs
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Social Proof Pill */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-emerald-300 text-[11px] sm:text-xs shadow-sm max-w-full">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-bold text-emerald-900">Accepting New Clients in {businessInfo.city}</span>
              <span className="text-stone-300 hidden xs:inline">•</span>
              <div className="flex items-center text-amber-500 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-stone-900 text-[11px] sm:text-xs">{businessInfo.rating.toFixed(1)}</span>
            </div>

            {/* Clean, Modern Sunlight Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-stone-950 leading-[1.14]">
              {cityAreaLabel}'s Trusted{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800">
                Lawn & Landscape
              </span>{' '}
              Craftsmen
            </h1>

            {/* Clear Value Proposition */}
            <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Keep your property looking pristine year-round. From precision weekly mowing and laser-straight edging to custom paver patios, sod installation, and seasonal cleanups. Transparent pricing with zero long contracts.
            </p>

            {/* 3 Clean Daylight Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1 text-[11px] sm:text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200/90 text-stone-800 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Same-Day Free Quotes</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200/90 text-stone-800 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Licensed & Fully Insured</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200/90 text-stone-800 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">No Contracts Required</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3 justify-center lg:justify-start">
              <button
                onClick={() => onOpenQuote()}
                className="group px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Get Your Free Estimate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-300 hover:border-emerald-600 text-stone-900 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-xs"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call {businessInfo.phone}</span>
              </a>
            </div>

            {/* Micro Trust Bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs text-stone-600 pt-1">
              <span className="flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                <span>No credit card needed</span>
              </span>
              <span className="text-stone-300 hidden xs:inline">•</span>
              <span className="flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                <span>Responses in ~2 hrs</span>
              </span>
              <span className="text-stone-300 hidden xs:inline">•</span>
              <button
                onClick={onOpenCalculator}
                className="text-emerald-700 hover:text-emerald-800 underline underline-offset-2 cursor-pointer font-bold"
              >
                Sod Calculator
              </button>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Sunlit Showcase Photo + Fast Estimate Card
             ======================================================== */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 bg-white shadow-2xl shadow-emerald-950/10">
                
                {/* Visual Showcase Photo */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt={`Manicured lawn in ${businessInfo.city}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=1000&q=80";
                    }}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />
                  
                  {/* Floating Badges on Photo */}
                  <div className="absolute top-3.5 left-3.5 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/20">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Top Rated in {businessInfo.city}</span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider shadow">
                    {businessInfo.yearsInBusiness} Experience
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-bold text-white drop-shadow">{businessInfo.name}</span>
                    <span className="text-emerald-300 drop-shadow flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {cityAreaLabel}
                    </span>
                  </div>
                </div>

                {/* Streamlined Fast Estimate Form */}
                <div className="p-5 sm:p-6 space-y-4 bg-white">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      Request Your Free Estimate
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Fast, no-obligation pricing tailored to your yard.
                    </p>
                  </div>

                  <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                    {/* Service Selection Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Select Service:
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                      >
                        <option value="Lawn Mowing & Precision Edging">🌱 Lawn Mowing & Precision Edging (From $45)</option>
                        <option value="Paver Patios, Walkways & Retaining Walls">🧱 Paver Patios & Hardscaping (Free 3D Design)</option>
                        <option value="Sod Installation & Lawn Renovation">🌾 Sod Installation (Instant Green Yard)</option>
                        <option value="Mulch, Pine Straw & Garden Beds">🍂 Mulch & Pine Straw Installation</option>
                        <option value="Tree Trimming & Shrub Shaping">🌳 Tree Trimming & Shrub Care</option>
                        <option value="Spring & Fall Yard Cleanups">🧹 Full Yard Cleanup & Debris Haul</option>
                        <option value="Other / Multiple Services">✨ Other / Complete Yard Overhaul</option>
                      </select>
                    </div>

                    {/* Street Address Input */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Property Street Address:
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder={`e.g. 123 Main St, ${businessInfo.city}`}
                          value={addressInput}
                          onChange={(e) => setAddressInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Get Instant Free Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="pt-1 text-center">
                    <p className="text-[11px] text-stone-500">
                      🔒 No obligation • Usually estimated within 2 hours
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          TRUST METRIC RIBBON (Below Hero)
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-lg shadow-stone-200/60">
          <div className="p-2 sm:p-3">
            <div className="text-xl sm:text-3xl font-black text-emerald-700">{businessInfo.rating.toFixed(1)} ★</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1">Google Rating</div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5">Top-Rated in {businessInfo.city}</div>
          </div>
          <div className="p-2 sm:p-3 border-l border-stone-200">
            <div className="text-xl sm:text-3xl font-black text-stone-900">100%</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1">Free Estimates</div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5">Fast Digital Proposals</div>
          </div>
          <div className="p-2 sm:p-3 border-t lg:border-t-0 lg:border-l border-stone-200">
            <div className="text-xl sm:text-3xl font-black text-emerald-700">{businessInfo.yearsInBusiness}</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1">Local Experience</div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5">Family-Owned Crew</div>
          </div>
          <div className="p-2 sm:p-3 border-t lg:border-t-0 border-l border-stone-200">
            <div className="text-xl sm:text-3xl font-black text-stone-900">0</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1">Contract Traps</div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5">Pause or Cancel Anytime</div>
          </div>
        </div>
      </div>

    </section>
  );
};
