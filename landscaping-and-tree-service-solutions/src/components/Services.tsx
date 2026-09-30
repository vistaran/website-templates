import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Leaf, Scissors, Truck, Trees, Check, ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenCalculator: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenCalculator }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sod' | 'maintenance'>('all');

  const getIcon = (iconName: string, className?: string) => {
    const baseClass = className || "w-6 h-6";
    switch (iconName) {
      case 'Sprout':
        return <Sprout className={baseClass} />;
      case 'Leaf':
        return <Leaf className={baseClass} />;
      case 'Scissors':
        return <Scissors className={baseClass} />;
      case 'Truck':
        return <Truck className={baseClass} />;
      case 'Trees':
        return <Trees className={baseClass} />;
      default:
        return <Sprout className={baseClass} />;
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeTab === 'sod') return service.id === 'sod-installation' || service.id === 'landscape-design';
    if (activeTab === 'maintenance') return service.id === 'lawn-maintenance' || service.id === 'mulch-pinestraw' || service.id === 'property-cleanups';
    return true;
  });

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#ffffff] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-[#84cc16] tracking-wider uppercase mb-2">
            Professional Outdoor Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4 font-heading">
            Complete Lawn Care & Landscaping Services
          </h2>
          <p className="text-base sm:text-lg text-[#0f172a] leading-relaxed">
            From our acclaimed sod installations to crisp bi-weekly maintenance and seasonal mulch refreshes,
            we bring meticulous standards to every Charlotte property.
          </p>

          {/* Interactive Filter Controls & Calculator Trigger */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 bg-white rounded-2xl shadow-xs border border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#0f172a] text-white'
                    : 'text-[#0f172a] hover:text-[#0f172a]'
                }`}
              >
                All Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sod')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  activeTab === 'sod'
                    ? 'bg-[#0f172a] text-white'
                    : 'text-[#0f172a] hover:text-[#0f172a]'
                }`}
              >
                Sod & Overhauls
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('maintenance')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  activeTab === 'maintenance'
                    ? 'bg-[#0f172a] text-white'
                    : 'text-[#0f172a] hover:text-[#0f172a]'
                }`}
              >
                Maintenance & Mulch
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-[#0f172a] bg-[#ecfccb] hover:bg-[#d8edd4] border border-[#84cc16]/30 rounded-2xl transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#84cc16]" />
              <span>Sod & Mulch Estimator</span>
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
                    ? 'border-2 border-[#84cc16] shadow-xl hover:-translate-y-1'
                    : 'border border-gray-200 shadow-md hover:shadow-xl hover:border-[#84cc16]/30 hover:-translate-y-1'
                }`}
              >
                {/* Special Ribbon for Signature Sod Installation */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-[#84cc16] text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl z-10 flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Charlotte #1 Choice
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-0">
                  <div>
                    {/* Header with Icon and Title */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${isFeatured ? 'bg-[#84cc16] text-white shadow-md shadow-[#84cc16]/20' : 'bg-[#f1f5f9] text-[#475569] group-hover:bg-[#ecfccb] group-hover:text-[#65a30d]'}`}>
                        {getIcon(service.iconName, "w-7 h-7")}
                      </div>
                      <div className={isFeatured ? "pr-12" : ""}>
                        <h3 className="text-xl font-bold text-[#0f172a] font-heading leading-tight mb-1">
                          {service.title}
                        </h3>
                        <span className="text-xs text-[#64748b] font-medium">
                          {service.popularFor}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-[#475569] leading-relaxed mb-6">
                      {service.fullDesc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-3 mb-8 pt-6 border-t border-gray-100/80">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm text-[#334155]">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 transition-colors ${isFeatured ? 'bg-[#ecfccb] text-[#65a30d]' : 'bg-gray-100 text-gray-400 group-hover:bg-[#ecfccb] group-hover:text-[#65a30d]'}`}>
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                          <span className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 border-t border-gray-100/80 flex items-center justify-between mt-auto">
                    <div className="text-xs sm:text-sm text-[#64748b] font-medium bg-gray-50/80 px-3 py-1.5 rounded-lg border border-gray-100">
                      {service.startingPrice}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className={`inline-flex items-center gap-2 text-sm font-bold transition-all cursor-pointer group/btn ${
                        isFeatured
                          ? 'text-[#84cc16] hover:text-[#65a30d]'
                          : 'text-[#0f172a] hover:text-[#84cc16]'
                      }`}
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

        {/* Sod Specialty Deep-Dive Banner */}
        <div id="sod-specialty" className="mt-16 bg-[#0f172a] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Sprout className="w-96 h-96 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16] bg-white/10 px-3 py-1 rounded-md">
              The Sod Installation Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-4 font-heading">
              Why Charlotte Homeowners Rely on Landscaping and tree service solutions For Sod
            </h3>
            <p className="text-sm sm:text-base text-[#ecfccb]/90 leading-relaxed mb-6">
              Charlotte's heavy red clay presents unique challenges for grass roots. Our process goes beyond simply dropping sod squares. We excavate weed networks, mechanically till and aerate compacted subsoil, introduce organic compost amendments, and establish optimal drainage grades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                <span className="text-lg font-bold text-white block">Bermuda Turf</span>
                <span className="text-xs text-emerald-200 mt-1 block">Tifway 419 & Celebration. Full sun, heat hardy, golf-green density.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                <span className="text-lg font-bold text-white block">Tall Fescue</span>
                <span className="text-xs text-emerald-200 mt-1 block">Deep green year-round color. Thrives in moderate shade & cooler temps.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                <span className="text-lg font-bold text-white block">Zoysia Grass</span>
                <span className="text-xs text-emerald-200 mt-1 block">Emerald & Zeon. Luxurious carpet feel, drought resistant, choke weeds.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectService('Sod Installation')}
                className="px-6 py-3 bg-[#84cc16] hover:bg-[#57863A] text-white font-bold text-sm rounded-2xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Book Sod Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm rounded-2xl border border-white/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-300" />
                <span>Estimate Yard Square Footage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

