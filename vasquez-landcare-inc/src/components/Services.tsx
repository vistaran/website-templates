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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-[#451A03]" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#65A30D]" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-[#451A03]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#333333]" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-[#451A03]" />;
      default:
        return <Sprout className="w-6 h-6 text-[#451A03]" />;
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeTab === 'sod') return service.id === 'sod-installation' || service.id === 'landscape-design';
    if (activeTab === 'maintenance') return service.id === 'lawn-maintenance' || service.id === 'mulch-pinestraw' || service.id === 'property-cleanups';
    return true;
  });

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-[#65A30D] tracking-wider uppercase mb-2">
            Professional Outdoor Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#451A03] tracking-tight mb-4 font-heading">
            Complete Lawn Care & Landscaping Services
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            From our acclaimed sod installations to crisp bi-weekly maintenance and seasonal mulch refreshes,
            we bring meticulous standards to every Charlotte property.
          </p>

          {/* Interactive Filter Controls & Calculator Trigger */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 bg-white rounded-sm shadow-xs border border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#451A03] text-white shadow-xs'
                    : 'text-[#333333] hover:text-[#451A03]'
                }`}
              >
                All Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sod')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm transition-all ${
                  activeTab === 'sod'
                    ? 'bg-[#451A03] text-white shadow-xs'
                    : 'text-[#333333] hover:text-[#451A03]'
                }`}
              >
                Sod & Overhauls
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('maintenance')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm transition-all ${
                  activeTab === 'maintenance'
                    ? 'bg-[#451A03] text-white shadow-xs'
                    : 'text-[#333333] hover:text-[#451A03]'
                }`}
              >
                Maintenance & Mulch
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-[#451A03] bg-[#F7FEE7] hover:bg-[#ECFCCB] border border-[#65A30D]/30 rounded-sm transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#65A30D]" />
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
                className={`flex flex-col bg-white rounded-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${
                  isFeatured
                    ? 'ring-2 ring-[#65A30D] shadow-xl relative'
                    : 'border border-gray-100 shadow-md hover:border-[#65A30D]/50'
                }`}
              >
                {/* Special Ribbon for Signature Sod Installation */}
                {isFeatured && (
                  <div className="bg-[#451A03] text-white text-xs font-bold py-2.5 px-5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#65A30D]" />
                      Vasquez Landcare INC Specialty
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#F7FEE7] font-semibold uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded-sm">
                      Charlotte #1 Choice
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header with Icon and Title */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-sm flex items-center justify-center shrink-0 shadow-inner ${
                        isFeatured ? 'bg-gradient-to-br from-[#F7FEE7] to-[#e2f5df]' : 'bg-gray-50'
                      }`}>
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#451A03] font-heading tracking-tight leading-tight mb-1">
                          {service.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-[#65A30D] font-semibold tracking-wide">
                          {service.popularFor}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-[#333333] leading-relaxed mb-5">
                      {service.fullDesc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-2.5 mb-8 pt-5 border-t border-gray-100">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm text-[#333333]/90 font-medium">
                          <div className="w-5 h-5 rounded-full bg-[#F7FEE7] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-[#65A30D]" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="text-sm font-semibold text-[#333333]/70">
                      {service.startingPrice}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className={`inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 cursor-pointer px-5 py-2.5 rounded-sm ${
                        isFeatured
                          ? 'bg-[#451A03] text-white hover:bg-[#78350F] hover:shadow-lg hover:-translate-y-0.5'
                          : 'bg-[#F7FEE7] text-[#451A03] hover:bg-[#65A30D] hover:text-white hover:shadow-md'
                      }`}
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sod Specialty Deep-Dive Banner */}
        <div id="sod-specialty" className="mt-16 bg-[#451A03] rounded-md p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Sprout className="w-96 h-96 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#65A30D] bg-white/10 px-3 py-1 rounded-md">
              The Sod Installation Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-4 font-heading">
              Why Charlotte Homeowners Rely on Vasquez Landcare INC For Sod
            </h3>
            <p className="text-sm sm:text-base text-[#F7FEE7]/90 leading-relaxed mb-6">
              Charlotte's heavy red clay presents unique challenges for grass roots. Our process goes beyond simply dropping sod squares. We excavate weed networks, mechanically till and aerate compacted subsoil, introduce organic compost amendments, and establish optimal drainage grades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-sm border border-white/15">
                <span className="text-lg font-bold text-white block">Bermuda Turf</span>
                <span className="text-xs text-lime-200 mt-1 block">Tifway 419 & Celebration. Full sun, heat hardy, golf-green density.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-sm border border-white/15">
                <span className="text-lg font-bold text-white block">Tall Fescue</span>
                <span className="text-xs text-lime-200 mt-1 block">Deep green year-round color. Thrives in moderate shade & cooler temps.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-sm border border-white/15">
                <span className="text-lg font-bold text-white block">Zoysia Grass</span>
                <span className="text-xs text-lime-200 mt-1 block">Emerald & Zeon. Luxurious carpet feel, drought resistant, choke weeds.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectService('Sod Installation')}
                className="px-6 py-3 bg-[#65A30D] hover:bg-[#4D7C0F] text-white font-bold text-sm rounded-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Book Sod Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm rounded-sm border border-white/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-lime-300" />
                <span>Estimate Yard Square Footage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
