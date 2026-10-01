import React, { useState } from 'react';
import { Shield, Star, CheckCircle, ArrowRight, Phone, Calculator, Calendar, MapPin, ReceiptText } from 'lucide-react';
import { businessDetails } from '../data/content';

interface HeroProps {
  onOpenQuote: (preselectedService?: string) => void;
  onOpenCalculator: () => void;
  onOpenCalendar?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenCalculator, onOpenCalendar }) => {
  const [selectedService, setSelectedService] = useState('precision-mowing');
  const [propertySize, setPropertySize] = useState('quarter-acre');

  const handleStartEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenCalendar) {
      onOpenCalendar();
    } else {
      onOpenQuote(selectedService);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0d281a] text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background textures */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-32 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & Authority */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-wide text-amber-300">
              <span className="flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/10 border border-white/15">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>36+ Years in Charlotte</span>
              </span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span className="text-emerald-200">10915 Delsing Ct, Charlotte, NC 28214</span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span className="text-white/90">QuickBooks & Contract Billing</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Enhancing Carolina Properties With 36+ Years of <span className="text-amber-400 italic">Lawn Mastery</span>
            </h1>

            {/* Body Proposition */}
            <p className="text-lg sm:text-xl text-[#c7d5cd] leading-relaxed max-w-2xl font-light">
              From crisp diamond-pattern turf maintenance and custom sod installation to designer landscaping and turnkey commercial contracts. Tailored specifically for the Piedmont's challenging red clay and climate.
            </p>

            {/* Primary Action Button Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-[#0c2317] bg-amber-400 hover:bg-amber-300 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-4 h-4 text-[#0c2317]" />
              </button>

              <button
                onClick={() => {
                  if (onOpenCalendar) {
                    onOpenCalendar();
                  } else {
                    const el = document.getElementById('book-appointment');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-base font-bold text-white bg-emerald-800/80 hover:bg-emerald-700/90 border border-emerald-600/40 transition-all cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book on Calendar</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-base font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Sod Calculator</span>
              </button>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">36+ Yrs</span>
                <span className="text-xs text-[#a0b5a8]">Charlotte Experience</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  <span className="font-display text-2xl font-bold text-white">4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </div>
                <span className="text-xs text-[#a0b5a8]">Verified Local Rating</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-[#a0b5a8]">Satisfaction Guaranteed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">QuickBooks</span>
                <span className="text-xs text-[#a0b5a8]">Flexible Invoicing</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Quote & Property Intake Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#ffffff] text-[#1a241e] rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/10 relative">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Direct Charlotte Dispatch
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#0c2317] mt-0.5">
                    Fast Property Estimate
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available Today
                </span>
              </div>

              <form onSubmit={handleStartEstimate} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    What service does your property need?
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50/50 text-neutral-800 focus:bg-white focus:border-[#153c29] focus:ring-2 focus:ring-[#153c29]/20 transition-all font-medium"
                  >
                    <option value="precision-mowing">Precision Lawn Maintenance & Mowing</option>
                    <option value="designer-landscaping">Designer Landscaping & Custom Beds</option>
                    <option value="sod-installation">Lawn Installation & Farm-Cut Sodding</option>
                    <option value="aeration-seeding">Clay Soil Core Aeration & Overseeding</option>
                    <option value="mulch-pine-straw">Hardwood Mulch & Longleaf Pine Straw</option>
                    <option value="commercial-grounds">Commercial Grounds / HOA Maintenance Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Estimated Lot / Lawn Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'small-yard', label: '< 5,000 sq ft', sub: 'Townhome/City' },
                      { id: 'quarter-acre', label: '1/4 – 1/2 Acre', sub: 'Standard Lot' },
                      { id: 'estate', label: '1/2+ Acre', sub: 'Large Estate' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPropertySize(opt.id)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          propertySize === opt.id
                            ? 'border-[#0c2317] bg-[#0c2317]/5 ring-1 ring-[#0c2317]'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-xs text-neutral-900">{opt.label}</div>
                        <div className="text-[10px] text-neutral-500">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f5f8f6] rounded-xl p-3.5 border border-[#e1ece4] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-neutral-800">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Free on-site property evaluation within 24-48 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-800">
                    <ReceiptText className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>QuickBooks Invoicing, monthly billing, or annual contract</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-800">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Locally based at 10915 Delsing Ct, Charlotte NC</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0c2317] hover:bg-[#153c29] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Continue to Free Estimate</span>
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Prefer to talk directly?</span>
                <a 
                  href={`tel:${businessDetails.phoneRaw}`}
                  className="font-bold text-[#0c2317] hover:text-emerald-700 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>(704) 918-0398</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
