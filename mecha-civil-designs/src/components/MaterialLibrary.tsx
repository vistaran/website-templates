import React, { useState } from 'react';
import { MATERIAL_SWATCHES } from '../data/portfolioData';
import { MaterialSwatch } from '../types';
import { Sparkles } from 'lucide-react';

export const MaterialLibrary: React.FC = () => {
  const [selectedSwatch, setSelectedSwatch] = useState<MaterialSwatch>(MATERIAL_SWATCHES[0]);

  return (
    <section id="materials" className="py-20 lg:py-28 border-b border-[#E7E0D5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-2">
              Physical Tactility & Materials Archive
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
              Material Palette & Sample Library
            </h2>
            <p className="text-sm sm:text-base text-[#59524A] mt-2 max-w-xl font-light leading-relaxed">
              Touch, inspect, and experience authentic surface textures at our Chandkheda atelier. We curate natural stones, sustainably harvested hardwoods, and hand-troweled mineral plasters.
            </p>
          </div>
          <div className="text-xs font-mono text-[#736A5E] bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#DED6C9] self-start md:self-auto shadow-xs">
            100% Certified Provenance
          </div>
        </div>

        {/* Swatch Selector Grid + Detail Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Swatch Tiles */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {MATERIAL_SWATCHES.map((swatch) => {
              const isSelected = selectedSwatch.id === swatch.id;
              return (
                <div
                  key={swatch.id}
                  onClick={() => setSelectedSwatch(swatch)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between aspect-square group shadow-xs ${
                    isSelected
                      ? 'border-[#8A6739] bg-[#FFFFFF] ring-2 ring-[#8A6739]/20 shadow-md'
                      : 'border-[#E7E0D5] bg-[#FFFFFF] hover:border-[#C5B8A5]'
                  }`}
                >
                  {/* Swatch visual texture mockup container */}
                  <div
                    className="w-full h-24 rounded-xl overflow-hidden border border-black/5 relative shadow-inner"
                    style={{ backgroundColor: swatch.colorHex }}
                  >
                    {/* Visual pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-40 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          swatch.texturePattern === 'wood-grain'
                            ? 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)'
                            : swatch.texturePattern === 'linear-vein'
                            ? 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.5) 45%, transparent 50%)'
                            : swatch.texturePattern === 'bold-marble'
                            ? 'radial-gradient(ellipse at 30% 30%, rgba(100,100,100,0.2) 0%, transparent 60%)'
                            : swatch.texturePattern === 'metallic-sheen'
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)'
                            : 'radial-gradient(circle, rgba(0,0,0,0.1) 10%, transparent 10%)'
                      }}
                    />
                    <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1C1917]/70 text-white backdrop-blur-sm">
                      {swatch.category}
                    </div>
                  </div>

                  <div className="pt-3">
                    <div className="font-serif text-lg font-medium text-[#1C1917] group-hover:text-[#8A6739] transition-colors leading-tight">
                      {swatch.name}
                    </div>
                    <div className="text-[11px] text-[#8C8275] font-mono truncate mt-0.5">
                      {swatch.origin}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Swatch Architectural Breakdown */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D5]">
              <span className="text-xs font-mono text-[#8A6739] uppercase tracking-[0.16em]">
                Material Specification
              </span>
              <span className="text-xs text-[#8C8275] font-mono">{selectedSwatch.category}</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917] tracking-tight">
                {selectedSwatch.name}
              </h3>
              <p className="text-xs text-[#8C8275] font-mono mt-1">
                Provenance: {selectedSwatch.origin}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#59524A] leading-relaxed font-light">
              {selectedSwatch.description}
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
                <div className="text-[#8C8275] font-mono text-[10px] uppercase tracking-wider">Surface Treatment</div>
                <div className="text-[#1C1917] font-medium mt-0.5">{selectedSwatch.finishType}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
                <div className="text-[#8C8275] font-mono text-[10px] uppercase tracking-wider">Recommended Architectural Application</div>
                <div className="text-[#3D3732] mt-0.5 leading-relaxed font-light">{selectedSwatch.recommendedUse}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6C9] text-xs text-[#59524A] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#8A6739] shrink-0 mt-0.5" />
              <span className="font-light leading-relaxed">
                Wish to feel physical slab samples? Our Chandkheda design atelier houses over 120+ curated tactile samples for live comparison.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
