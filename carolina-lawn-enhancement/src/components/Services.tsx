import React, { useState } from 'react';
import { serviceItems } from '../data/content';
import { ServiceItem } from '../types';
import { Check, ArrowRight, Scissors, Sparkles, Layers, Sprout, Leaf, Building2, HelpCircle } from 'lucide-react';

interface ServicesProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Scissors': return <Scissors className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Sprout': return <Sprout className="w-5 h-5" />;
      case 'Leaf': return <Leaf className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      default: return <Sprout className="w-5 h-5" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'residential', label: 'Residential & Design' },
    { id: 'installation', label: 'Lawn Installation & Sod' },
    { id: 'care', label: 'Aeration & Cleanups' },
    { id: 'commercial', label: 'Commercial & HOA' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? serviceItems 
    : serviceItems.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-[#faf8f5] text-[#1a241e] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
              36 Years of Field Craftsmanship
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1.5">
              Comprehensive Grounds & Yard Enhancement
            </h2>
            <p className="text-base text-neutral-600 mt-3 leading-relaxed">
              Every property is unique. Whether you need weekly diamond-striping, custom flagstone garden beds, or annual commercial grounds maintenance with QuickBooks invoicing, our crews execute with precision.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#0c2317] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: ServiceItem) => {
            const isExpanded = expandedService === service.id;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-[#0c2317]/10">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/precision_mowing.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Category & Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="bg-white/90 backdrop-blur-md text-[#0c2317] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {service.frequency}
                    </span>
                    {service.badge && (
                      <span className="bg-amber-400 text-[#0c2317] font-bold px-2.5 py-1 rounded-md shadow-xs">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Icon floating */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-white/95 backdrop-blur-md text-[#0c2317] flex items-center justify-center shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="font-display text-xl font-bold text-[#0c2317] group-hover:text-emerald-800 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-neutral-100">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expanded Detail view */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg leading-relaxed">
                        <p>{service.fullDesc}</p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-neutral-500 block">Starting at</span>
                      <span className="text-sm font-bold text-[#0c2317]">{service.startingPrice}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedService(isExpanded ? null : service.id)}
                        className="text-xs text-neutral-500 hover:text-neutral-800 font-medium px-2 py-1.5 rounded transition-colors cursor-pointer"
                      >
                        {isExpanded ? 'Less' : 'Details'}
                      </button>
                      <button
                        onClick={() => onSelectServiceForQuote(service.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0c2317] hover:bg-[#184632] text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial & Contract Banner */}
        <div className="mt-16 bg-[#0c2317] text-white rounded-2xl p-8 sm:p-10 border border-[#1b442e] shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-900/20 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Commercial Properties, HOAs & Retail Centers
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                Looking for Year-Round Contract Grounds Management?
              </h3>
              <p className="text-sm text-[#b8c9bf] leading-relaxed">
                We manage multiple commercial acreage properties and HOA neighborhoods across Charlotte with monthly QuickBooks invoicing, locked annual agreements, and priority storm response.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onSelectServiceForQuote('commercial-grounds')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0c2317] font-bold text-sm shadow-md transition-colors cursor-pointer text-center"
              >
                Request Commercial Proposal
              </button>
              <a
                href="tel:7049180398"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-colors text-center"
              >
                Call (704) 918-0398
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
