import React, { useState } from "react";
import { Sprout, Hammer, Layers, TreePine, Droplet, Shovel, CheckCircle, ArrowRight } from "lucide-react";
import { SERVICES, ServiceItem } from "../data/content";

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "sprout":
        return <Sprout className={className} strokeWidth={1.5} />;
      case "hammer":
        return <Hammer className={className} strokeWidth={1.5} />;
      case "layers":
        return <Layers className={className} strokeWidth={1.5} />;
      case "tree":
        return <TreePine className={className} strokeWidth={1.5} />;
      case "shovel":
        return <Shovel className={className} strokeWidth={1.5} />;
      default:
        return <Droplet className={className} strokeWidth={1.5} />;
    }
  };

  const filteredServices = activeCategory === "all"
    ? SERVICES
    : SERVICES.filter((s) => {
        if (activeCategory === "lawn") return s.category === "lawn" || s.category === "sod";
        if (activeCategory === "hardscape") return s.category === "hardscape" || s.category === "masonry";
        if (activeCategory === "tree") return s.category === "tree";
        if (activeCategory === "drainage") return s.category === "drainage";
        return true;
      });

  return (
    <section id="services" className="py-24 bg-brand-cream border-b border-brand-sage/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
              01. SIGNATURE SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-soil tracking-tight leading-tight">
              Impeccable lawn manicuring &amp; custom stone masonry.
            </h2>
            <p className="text-base text-brand-soil/75 mt-3 leading-relaxed">
              We provide full-service property care tailored to Cabarrus &amp; Mecklenburg soils. 
              Explore our core offerings below.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-brand-sage/40 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              All Services ({SERVICES.length})
            </button>
            <button
              onClick={() => setActiveCategory("lawn")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === "lawn"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Lawn &amp; Sod
            </button>
            <button
              onClick={() => setActiveCategory("hardscape")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === "hardscape"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Patios &amp; Walls
            </button>
          </div>
        </div>

        {/* Perfectly Balanced 3-Column Grid (6 Cards, 2 Rows of 3, Zero Gaps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between bg-white border border-brand-sage rounded-3xl p-6 sm:p-7 hover:border-brand-leaf/40 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Top line: Number, Category, and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-brand-clay tracking-widest">
                    0{index + 1}. {service.category.toUpperCase()}
                  </span>
                  <div className="p-2.5 bg-brand-sage/30 text-brand-leaf rounded-xl group-hover:bg-brand-leaf group-hover:text-brand-cream transition-colors duration-300">
                    {getIcon(service.iconName, "w-4 h-4")}
                  </div>
                </div>

                {/* Real Photo Frame */}
                <div className="w-full h-52 overflow-hidden rounded-2xl mb-5 relative border border-brand-sage/60 bg-brand-soil">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-soil/75 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Photo Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-brand-clay block mb-0.5">
                      J &amp; SON SPECIALTY
                    </span>
                    <span className="text-xs font-serif font-bold text-white leading-tight block">
                      {service.title}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-serif font-bold text-brand-soil mb-2.5 tracking-tight text-left">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-soil/75 leading-relaxed mb-5 text-left">
                  {service.description}
                </p>

                {/* Included Key Features Checklist */}
                {service.features && (
                  <div className="mb-6 pt-3.5 border-t border-brand-sage/50 text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-soil/50 block mb-2">
                      WHAT'S INCLUDED:
                    </span>
                    <ul className="space-y-1.5">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-brand-soil/80 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-leaf shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom line: Real metric and Get estimate button */}
              <div className="flex items-end justify-between pt-5 border-t border-brand-sage/50 mt-auto">
                <div className="text-left">
                  <span className="text-2xl font-mono font-black text-brand-leaf tracking-tight block">
                    {service.metric}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-semibold text-brand-soil/55 tracking-wider">
                    {service.metricLabel}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-leaf hover:bg-brand-moss text-brand-cream text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Get Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
