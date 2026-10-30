import React, { useState } from 'react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { CheckCircle, ArrowRight, Sparkles, X, Info } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface ServicesProps {
  onOpenQuote: (serviceName?: string) => void;
  onOpenCalculator: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote, onOpenCalculator }) => {
  const { businessInfo } = useBusiness();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'lawn', label: 'Lawn Care & Mowing' },
    { id: 'hardscape', label: 'Paver Patios & Hardscapes' },
    { id: 'sod', label: 'Sod Installation' },
    { id: 'tree', label: 'Tree & Shrub Care' },
    { id: 'seasonal', label: 'Cleanups & Mulch' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-24 bg-stone-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Complete Landscape & Lawn Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            Crafted for {businessInfo.city}{businessInfo.state ? `, ${businessInfo.state}` : ''} Properties
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Whether you need weekly manicured mowing, a complete backyard paver patio transformation, or fresh farm-cut sod, our experienced team provides dependable, top-tier workmanship.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20 font-bold'
                  : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Popular Tag */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                
                {service.popular && (
                  <span className="absolute top-3.5 left-3.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </span>
                )}

                {service.priceEstimate && (
                  <span className="absolute bottom-3.5 right-3.5 bg-stone-900/90 backdrop-blur-sm text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-stone-700">
                    {service.priceEstimate}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => onOpenQuote(service.title)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sod & Material Calculator Teaser */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 to-stone-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/40">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Instant Cost Estimator</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Planning a Sod or Mulch Project?
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              Use our interactive calculator to find how many sod rolls/pallets or mulch cubic yards your {businessInfo.city} yard needs, with real-time pricing estimates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Open Material Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenQuote("Custom Landscaping Project")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Direct Estimate</span>
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-48 sm:h-64 w-full shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-3.5 right-3.5 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-stone-950/85 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-stone-700 text-white">
                <span className="text-[11px] uppercase font-bold text-emerald-400">{businessInfo.name}</span>
                <h3 className="text-lg sm:text-xl font-bold">{selectedService.title}</h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <p className="text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed">
                {selectedService.fullDesc}
              </p>

              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wider mb-2">
                  What's Included:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                  {selectedService.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedService.priceEstimate && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-emerald-900 font-medium">Estimated Pricing:</span>
                  <span className="text-emerald-900 font-extrabold">{selectedService.priceEstimate}</span>
                </div>
              )}
            </div>

            <div className="p-3 sm:p-4 border-t border-stone-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 shrink-0 bg-stone-50">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold text-xs sm:text-sm transition-colors cursor-pointer text-center"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenQuote(title);
                }}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Quote for This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
