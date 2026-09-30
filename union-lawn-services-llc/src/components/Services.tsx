import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Leaf, Scissors, Truck, Trees, CheckCircle2, ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/content';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenCalculator: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenCalculator }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sod' | 'maintenance'>('all');

  const getIcon = (iconName: string, isFeatured: boolean) => {
    const iconClass = isFeatured ? "w-7 h-7 text-emerald-400" : "w-7 h-7 text-emerald-600";
    switch (iconName) {
      case 'Sprout': return <Sprout className={iconClass} />;
      case 'Leaf': return <Leaf className={iconClass} />;
      case 'Scissors': return <Scissors className={iconClass} />;
      case 'Truck': return <Truck className={iconClass} />;
      case 'Trees': return <Trees className={iconClass} />;
      default: return <Sprout className={iconClass} />;
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeTab === 'sod') return service.id === 'sod-installation' || service.id === 'landscape-design';
    if (activeTab === 'maintenance') return service.id === 'lawn-maintenance' || service.id === 'mulch-pinestraw' || service.id === 'property-cleanups';
    return true;
  });

  return (
    <section id="services" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-40 -left-64 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-64 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200/50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Professional Solutions
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 font-heading"
          >
            Complete Lawn Care <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
              & Landscaping Services
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            From our acclaimed sod installations to crisp bi-weekly maintenance and seasonal mulch refreshes,
            we bring meticulous standards to every Charlotte property.
          </motion.p>

          {/* Interactive Filter Controls & Calculator Trigger */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="inline-flex items-center p-1.5 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60">
              {['all', 'sod', 'maintenance'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  {tab === 'all' ? 'All Services' : tab === 'sod' ? 'Sod & Overhauls' : 'Maintenance & Mulch'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 rounded-2xl transition-all hover:shadow-md cursor-pointer group"
            >
              <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Estimator Tool</span>
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const isFeatured = service.isSpecialty;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group flex flex-col rounded-[2rem] transition-all duration-300 relative overflow-hidden ${
                  isFeatured
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 border border-slate-800'
                    : 'bg-white text-slate-800 shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:-translate-y-1'
                }`}
              >
                {/* Subtle Gradient Glow for Featured */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                )}

                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    {/* Header with Icon and Title */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                        isFeatured ? 'bg-slate-800 border border-slate-700' : 'bg-emerald-50 border border-emerald-100'
                      }`}>
                        {getIcon(service.iconName, !!isFeatured)}
                      </div>
                      {isFeatured && (
                        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                          Top Choice
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-2xl font-extrabold mb-2 font-heading tracking-tight ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
                      {service.title}
                    </h3>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-5 ${isFeatured ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {service.popularFor}
                    </div>

                    {/* Short Description */}
                    <p className={`text-sm leading-relaxed mb-8 ${isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
                      {service.fullDesc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm font-medium">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isFeatured ? 'text-emerald-400' : 'text-emerald-500'}`} />
                          <span className={isFeatured ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className={`pt-6 mt-auto border-t flex items-center justify-between ${isFeatured ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div className={`text-sm font-bold ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                      {service.startingPrice}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className={`inline-flex items-center gap-2 text-sm font-bold transition-all cursor-pointer group/btn ${
                        isFeatured
                          ? 'text-white hover:text-emerald-400'
                          : 'text-slate-900 hover:text-emerald-600'
                      }`}
                    >
                      <span>Request Quote</span>
                      <div className={`p-1.5 rounded-full transition-colors ${isFeatured ? 'bg-slate-800 group-hover/btn:bg-emerald-500/20' : 'bg-emerald-50 group-hover/btn:bg-emerald-100'}`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sod Specialty Deep-Dive Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4 blur-2xl">
            <Sprout className="w-96 h-96 text-emerald-500" />
          </div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block mb-6">
              The Sod Installation Standard
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 font-heading tracking-tight">
              Why Charlotte Homeowners Rely on <br className="hidden sm:block" />
              Union Lawn Services LLC For Sod
            </h3>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl">
              Charlotte's heavy red clay presents unique challenges for grass roots. Our process goes beyond simply dropping sod squares. We excavate weed networks, mechanically till and aerate compacted subsoil, introduce organic compost amendments, and establish optimal drainage grades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-xl font-bold text-white block mb-2 font-heading">Bermuda Turf</span>
                <span className="text-sm text-slate-400 leading-relaxed block">Tifway 419 & Celebration. Full sun, heat hardy, golf-green density.</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-xl font-bold text-white block mb-2 font-heading">Tall Fescue</span>
                <span className="text-sm text-slate-400 leading-relaxed block">Deep green year-round color. Thrives in moderate shade & cooler temps.</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-xl font-bold text-white block mb-2 font-heading">Zoysia Grass</span>
                <span className="text-sm text-slate-400 leading-relaxed block">Emerald & Zeon. Luxurious carpet feel, drought resistant, choke weeds.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectService('Sod Installation')}
                className="px-8 py-4 bg-gradient-to-tr from-emerald-600 to-green-400 hover:from-emerald-500 hover:to-green-300 text-white font-black text-sm rounded-xl  transition-all cursor-pointer inline-flex items-center gap-2 group"
              >
                <span>Book Sod Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span>Estimate Yard Square Footage</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
