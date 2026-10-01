import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Trees, Truck, Leaf, Sprout, Check, ArrowRight, Phone, Calculator, Flame } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/content';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenCalculator: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenCalculator }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'mowing' | 'care'>('all');

  const getIcon = (iconName: string, className?: string) => {
    const baseClass = className || "w-6 h-6";
    switch (iconName) {
      case 'Scissors':
        return <Scissors className={baseClass} />;
      case 'Sparkles':
        return <Sparkles className={baseClass} />;
      case 'Trees':
        return <Trees className={baseClass} />;
      case 'Truck':
        return <Truck className={baseClass} />;
      case 'Leaf':
        return <Leaf className={baseClass} />;
      case 'Sprout':
        return <Sprout className={baseClass} />;
      default:
        return <Scissors className={baseClass} />;
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeTab === 'mowing') return service.id === 'lawn-mowing' || service.id === 'edging-trimming';
    if (activeTab === 'care') return service.id === 'hedge-shrub-care' || service.id === 'property-cleanups' || service.id === 'mulch-pinestraw' || service.id === 'aeration-seeding';
    return true;
  });

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            Professional Gaston County Lawn Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022c22] tracking-tight mb-4 font-heading">
            Expert Lawn Mowing & Property Maintenance
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            From sharp weekly mowing and crisp vertical sidewalk edging to hedge shaping and seasonal property cleanups,
            G & T Lawn Care keeps your Gastonia property pristine all year round.
          </p>

          {/* Interactive Filter Controls & Quick Estimate */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 bg-white rounded-2xl shadow-sm border border-emerald-900/10">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#064e3b] text-white shadow-sm'
                    : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                All Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mowing')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'mowing'
                    ? 'bg-[#064e3b] text-white shadow-sm'
                    : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                Grass Cutting & Edging
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'care'
                    ? 'bg-[#064e3b] text-white shadow-sm'
                    : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                Trimming, Mulch & Cleanups
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 border border-amber-500/30 rounded-2xl transition-all cursor-pointer shadow-sm"
            >
              <Calculator className="w-4 h-4 text-slate-950" />
              <span>Yard & Mulch Estimator</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const isFeatured = service.isSpecialty;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group flex flex-col bg-white rounded-3xl transition-all duration-300 relative overflow-hidden ${
                  isFeatured
                    ? 'border-2 border-amber-400 shadow-xl hover:-translate-y-1'
                    : 'border border-emerald-900/10 shadow-sm hover:shadow-xl hover:border-emerald-600/30 hover:-translate-y-1'
                }`}
              >
                {/* Special Ribbon for Signature Lawn Mowing */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl z-10 flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Gastonia #1 Choice
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-0">
                  <div>
                    {/* Header with Icon and Title */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isFeatured 
                          ? 'bg-[#064e3b] text-amber-400 shadow-md shadow-emerald-900/20' 
                          : 'bg-emerald-50 text-emerald-800 group-hover:bg-[#064e3b] group-hover:text-amber-400'
                      }`}>
                        {getIcon(service.iconName, "w-7 h-7")}
                      </div>
                      <div className={isFeatured ? "pr-12" : ""}>
                        <h3 className="text-xl font-extrabold text-[#022c22] font-heading leading-tight mb-1">
                          {service.title}
                        </h3>
                        <span className="text-xs text-emerald-800 font-semibold">
                          {service.popularFor}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.fullDesc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-3 mb-8 pt-5 border-t border-slate-100">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 transition-colors ${
                            isFeatured 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-emerald-100 text-emerald-800 group-hover:bg-amber-100 group-hover:text-amber-700'
                          }`}>
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                          <span className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
                      {service.startingPrice}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#064e3b] hover:text-amber-600 transition-colors cursor-pointer group/btn"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose G & T Banner */}
        <div id="why-us" className="mt-16 bg-[#022c22] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-emerald-900">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Scissors className="w-96 h-96 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-3 py-1 rounded-md mb-3">
              <Flame className="w-3.5 h-3.5 text-slate-950" />
              The G & T Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4 font-heading">
              Why Gastonia Homeowners Count on G & T Lawn Care
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
              Carolina heat causes fast, aggressive lawn growth. We never rush a job or leave messy clippings behind. 
              Our team operates with sharp mower blades that cleanly slice grass without tearing, delivers razor-straight edging along your driveway, and checks every gate latch before we leave.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                <span className="text-base font-bold text-amber-300 block">7-Day Availability</span>
                <span className="text-xs text-emerald-100 mt-1 block">Operating Monday through Sunday, 8am – 6pm to keep your yard neat.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                <span className="text-base font-bold text-amber-300 block">Laser-Crisp Edges</span>
                <span className="text-xs text-emerald-100 mt-1 block">90-degree trenching along all curbs, walkways, and garden beds.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                <span className="text-base font-bold text-amber-300 block">Full Site Blowout</span>
                <span className="text-xs text-emerald-100 mt-1 block">All driveways, porches, and decks blown free of grass clippings.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectService('Routine Lawn Mowing & Striping')}
                className="btn-vibrant btn-primary px-6 py-3.5 rounded-2xl transition-all cursor-pointer inline-flex items-center gap-2 font-bold"
              >
                <span>Get Free Lawn Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-2xl border border-white/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
