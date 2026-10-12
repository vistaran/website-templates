import React, { useState } from 'react';
import { Calendar, Compass, ArrowRight, MapPin, Eye, Sparkles } from 'lucide-react';
import { STUDIO_DETAILS } from '../data/portfolioData';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePortfolio }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden border-b border-[#E7E0D5] bg-[#FAF8F5]">
      {/* Delicate warm linen texture backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #24201D 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Split Screen 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-4">
              <span>Interior Architecture</span>
              <span aria-hidden="true" className="text-[#C5B8A5]">·</span>
              <span>Turnkey Civil Execution</span>
              <span aria-hidden="true" className="text-[#C5B8A5]">·</span>
              <span>Ahmedabad, Est. 2014</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-light text-[#1C1917] leading-[1.08] mb-6 text-balance tracking-tight">
              Crafting <span className="italic font-normal text-[#8A6739]">sanctuaries</span> of refined form, engineered with structural permanence.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-[#59524A] leading-relaxed mb-8 max-w-2xl font-light">
              Mecha Civil Designs merges the sensory tactility of bespoke interior design with rigorous civil engineering standards. From duplex penthouses at Centrum by Sampad to executive corporate headquarters, we design and deliver turnkey spaces tailored to your way of living.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 text-xs sm:text-[13px] font-medium tracking-wide text-[#FAF8F5] bg-[#24201D] hover:bg-[#3D3732] rounded-full transition-all whitespace-nowrap shadow-md shadow-[#24201D]/10 flex items-center gap-3 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#CBB38D]" />
                <span>Book Private Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#CBB38D]" />
              </button>

              <button
                onClick={onExplorePortfolio}
                className="px-6 py-3.5 text-xs sm:text-[13px] font-medium tracking-wide text-[#3D3732] hover:text-[#1C1917] bg-[#F5EFE6] hover:bg-[#EBE2D5] border border-[#DED6C9] rounded-full transition-all whitespace-nowrap flex items-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8A6739]" />
                <span>View Selected Works</span>
              </button>
            </div>

            {/* Studio location reassurance */}
            <div className="flex items-center gap-2 text-xs text-[#736A5E] pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#8A6739] shrink-0" />
              <span>Design Studio & Material Bar: Orange Mall, Chandkheda</span>
              <span aria-hidden="true" className="text-[#C5B8A5]">·</span>
              <a
                href={STUDIO_DETAILS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A6739] hover:text-[#5C421E] underline underline-offset-4 decoration-[#8A6739]/40 hover:decoration-[#8A6739]"
              >
                Open Studio in Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-[#DED6C9] bg-[#F5EFE6] shadow-xl group min-h-[420px] lg:h-full flex flex-col justify-between p-6">
              {/* Media image backdrop */}
              {!imgError ? (
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Centrum Penthouse Luxury Interior Execution by Mecha Civil Designs"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5EFE6] via-[#EAE1D3] to-[#D5C7B3]" />
              )}

              {/* Editorial Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/40 to-[#1C1917]/10 pointer-events-none" />

              {/* Top card tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-[#FAF8F5] bg-[#1C1917]/75 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                  Marquee Project · Motera
                </span>
                <span className="text-[11px] font-mono tracking-wider text-[#EAE1D3] bg-[#1C1917]/75 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                  Duplex Handover
                </span>
              </div>

              {/* Bottom card content */}
              <div className="relative z-10 pt-36 text-white">
                <div className="flex items-center gap-2 text-xs text-[#EAE1D3] mb-1.5 font-mono">
                  <span>Centrum by Sampad, Motera</span>
                  <span aria-hidden="true" className="text-white/40">/</span>
                  <span>3,850 Sq.Ft Duplex</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white mb-2 leading-tight">
                  The Light-Filled Penthouse
                </h2>
                <p className="text-xs text-[#DDD4C7] line-clamp-2 mb-4 font-light leading-relaxed">
                  Cantilevered teak stairs, hand-selected Navona travertine walls, and flush acoustic false ceiling integration.
                </p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs text-[#DDD4C7]">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6C79C]" />
                    <span>Turnkey Civil & Millwork</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#E6C79C]">
                    10-Year Structural Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width KPI & Trust Strip placed below the hero split */}
        <div className="mt-14 pt-8 border-t border-[#E7E0D5] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917] tabular-nums">
              10+ <span className="font-sans text-xs uppercase tracking-wider text-[#8A6739] ml-1">Years</span>
            </div>
            <div className="text-xs text-[#736A5E] mt-1 font-light">Established 2014 in Ahmedabad</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917] tabular-nums">
              185+ <span className="font-sans text-xs uppercase tracking-wider text-[#8A6739] ml-1">Spaces</span>
            </div>
            <div className="text-xs text-[#736A5E] mt-1 font-light">Residences, Offices & Boutiques</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917] tabular-nums">
              100% <span className="font-sans text-xs uppercase tracking-wider text-[#8A6739] ml-1">Delivery</span>
            </div>
            <div className="text-xs text-[#736A5E] mt-1 font-light">Strict Milestone Handover Guarantee</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917] tabular-nums">
              4.9★ <span className="font-sans text-xs uppercase tracking-wider text-[#8A6739] ml-1">Google</span>
            </div>
            <div className="text-xs text-[#736A5E] mt-1 font-light">Verified Client Reviews in Chandkheda</div>
          </div>
        </div>
      </div>
    </section>
  );
};
