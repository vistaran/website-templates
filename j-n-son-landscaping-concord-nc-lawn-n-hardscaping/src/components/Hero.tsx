import React, { useState } from "react";
import { ShieldCheck, Star, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { BUSINESS_INFO } from "../data/content";

interface HeroProps {
  onOpenQuote: () => void;
  onScrollToSection: (sectionId: string) => void;
}

const FEATURED_HERO_PHOTOS = [
  {
    id: "hero",
    label: "Backyard Landscape",
    tag: "Concord, NC",
    src: "/images/hero.jpg",
    title: "Complete Backyard Landscape Design & Turf Care"
  },
  {
    id: "hardscape",
    label: "Custom Paver Patio",
    tag: "Huntersville, NC",
    src: "/images/hardscape.jpg",
    title: "Interlocking Bluestone Paver Patio & Entry Walkway"
  },
  {
    id: "lawn",
    label: "Precision Mowing",
    tag: "Cornelius, NC",
    src: "/images/lawn.jpg",
    title: "Suburban Lawn Mowing with Clean Blade Edging"
  },
  {
    id: "retaining-wall",
    label: "Stone Walls & Beds",
    tag: "Davidson, NC",
    src: "/images/retaining-wall.jpg",
    title: "Stone Retaining Walls & Planted Garden Beds"
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onScrollToSection }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const activePhoto = FEATURED_HERO_PHOTOS[selectedPhotoIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-brand-cream via-brand-cream to-brand-sage/20 border-b border-brand-sage/40">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15%" cy="20%" r="220" fill="#235128" filter="blur(140px)" />
          <circle cx="85%" cy="75%" r="280" fill="#b0823d" filter="blur(150px)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Text & Value proposition (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Rating Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-leaf/10 border border-brand-leaf/20 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-clay text-brand-clay" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-brand-moss tracking-wider">
                5.0 GOOGLE RATED • 24 VERIFIED REVIEWS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-brand-soil leading-[1.1] tracking-tight mb-6">
              Precision lawn care. <br className="hidden sm:inline" />
              <span className="text-brand-leaf italic font-normal">Custom hardscapes.</span> <br />
              Built for Carolina living.
            </h1>

            {/* Clear, honest description */}
            <p className="text-base sm:text-lg text-brand-soil/80 font-normal leading-relaxed max-w-2xl mb-8">
              At <strong className="font-semibold text-brand-moss">{BUSINESS_INFO.name}</strong>, we treat every lawn like our own. 
              From razor-sharp mowing stripes and fall fescue aeration to custom brick paver patios and French drainage systems, 
              we bring top-tier workmanship to homes across Concord and the Charlotte Metro area.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenQuote}
                className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-brand-cream bg-brand-leaf hover:bg-brand-moss rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Request Your Free Estimate</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-moss bg-white border border-brand-sage hover:border-brand-leaf/50 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm font-mono"
              >
                <Phone className="w-4 h-4 text-brand-clay" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-brand-sage/60 w-full text-left">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-leaf shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-soil">Licensed &amp; Fully Insured</h4>
                  <p className="text-xs text-brand-soil/65">Comprehensive liability coverage for full peace of mind</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-clay shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-soil">Owner-Operated Family Crew</h4>
                  <p className="text-xs text-brand-soil/65">J. and his son oversee every on-site discovery and project</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Real Photography Showcase with Interactive Switcher (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            
            {/* Main Interactive Photo Frame */}
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-brand-soil group">
              <img
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-soil/90 via-brand-soil/25 to-transparent pointer-events-none" />

              {/* Verified Location Stamp */}
              <div className="absolute top-4 right-4 bg-brand-soil/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-brand-cream text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activePhoto.tag}</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-brand-soil/95 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-brand-cream text-left shadow-lg">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-clay font-bold block mb-1">
                  REAL COMPLETED WORK
                </span>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-tight">
                  {activePhoto.title}
                </h3>
              </div>
            </div>

            {/* Clickable Photo Thumbnail Switcher (2 cols on mobile, 4 cols on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FEATURED_HERO_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedPhotoIndex === idx
                      ? "border-brand-clay ring-2 ring-brand-clay/30 scale-102"
                      : "border-brand-sage/60 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${photo.label}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-soil/30" />
                  <span className="absolute inset-x-0 bottom-1 text-[9px] sm:text-[8px] font-mono font-bold text-white text-center truncate px-1 drop-shadow-sm">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
