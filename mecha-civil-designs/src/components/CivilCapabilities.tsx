import React from 'react';
import { Layers, ShieldCheck, Ruler, Clock, Hammer, Cpu, CheckCircle } from 'lucide-react';

export const CivilCapabilities: React.FC = () => {
  const capabilities = [
    {
      number: '01',
      title: 'Structural Civil Remodeling & Demolition',
      description:
        'Unlike conventional decorator studios, our civil engineering background allows us to safely reconfigure floor layouts, remove non-loadbearing brick partitions, install structural steel I-beams, create duplex slab cutouts, and execute cantilevered balconies with certified calculations.',
      tags: ['Slab Openings', 'Beam Jacketing', 'Waterproofing Screeds']
    },
    {
      number: '02',
      title: 'Concealed MEP & Acoustic Engineering',
      description:
        'We engineer complete Mechanical, Electrical, and Plumbing conduits embedded seamlessly within slabs and false ceilings. Multi-zone VRV air conditioning, automated circadian LED channels, and acoustic PET ceiling baffles are integrated cleanly without unsightly surface trunking.',
      tags: ['VRV / VRF HVAC', 'Acoustic Soundproofing', 'Automated Lighting']
    },
    {
      number: '03',
      title: 'Precision Architectural Joinery & Millwork',
      description:
        'Every wardrobe, media credenza, and fluted paneling element is crafted using BWP Grade Marine Plywood (IS 710), hand-selected natural veneers, and German soft-close architectural hardware (Blum & Hettich) guaranteed against warping and climate expansion.',
      tags: ['IS 710 Marine Plywood', 'Burma Teak Veneer', 'Blum Motion Hardware']
    },
    {
      number: '04',
      title: 'Turnkey Handover & Single-Source Accountability',
      description:
        'You deal with one unified team from initial 3D BIM visualizations to key handover. We maintain strict Gantt-chart milestones, share daily photo logs from the site on WhatsApp, and guarantee 100% on-time project completion with zero surprise bills.',
      tags: ['Daily WhatsApp Logs', '10-Year Warranty', 'Zero Budget Spills']
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-28 border-b border-[#E7E0D5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-2">
            Engineering Backbone · Turnkey Craft
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
            Where Civil Engineering Meets Interior Elegance
          </h2>
          <p className="text-sm sm:text-base text-[#59524A] mt-2 font-light leading-relaxed">
            Most interior flaws occur when styling studios lack civil structural knowledge. At Mecha Civil Designs, licensed engineering calculations guarantee the longevity of every aesthetic element.
          </p>
        </div>

        {/* 4-Column Asymmetric Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] hover:border-[#C5B8A5] transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-light text-[#8A6739]">
                    {cap.number}.
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-[#736A5E] bg-[#F5EFE6] px-3 py-1 rounded-full border border-[#DED6C9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-light text-[#1C1917] mb-2.5">
                  {cap.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#59524A] leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EFEAE2] flex items-center justify-between text-xs text-[#8C8275]">
                <span className="font-mono text-[11px]">Ahmedabad Standards</span>
                <span className="text-[#8A6739] font-medium font-mono text-[11px]">Turnkey Verified ✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Phase Delivery Roadmap */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-4">
            Our 4-Phase Turnkey Execution Framework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 text-xs">
            <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
              <div className="font-mono text-[#8A6739] text-xs font-bold mb-1">Phase 1</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium mb-1.5">Spatial Planning & 3D</div>
              <p className="text-[11px] text-[#59524A] font-light leading-relaxed">
                Laser measurement, 3D visualization, material moodboards, and detailed Bill of Quantities (BOQ).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
              <div className="font-mono text-[#8A6739] text-xs font-bold mb-1">Phase 2</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium mb-1.5">Civil & MEP Rough-In</div>
              <p className="text-[11px] text-[#59524A] font-light leading-relaxed">
                Masonry adjustments, waterproofing tests, concealed plumbing, and electrical & HVAC conduits.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
              <div className="font-mono text-[#8A6739] text-xs font-bold mb-1">Phase 3</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium mb-1.5">Millwork & Ceilings</div>
              <p className="text-[11px] text-[#59524A] font-light leading-relaxed">
                Calibrated marine ply carpentry, Italian marble polishing, Gyproc false ceilings, and veneer pressing.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
              <div className="font-mono text-[#8A6739] text-xs font-bold mb-1">Phase 4</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium mb-1.5">Styling & Handover</div>
              <p className="text-[11px] text-[#59524A] font-light leading-relaxed">
                4-coat lime plaster burnishing, soft furnishings, deep sanitization, and 10-year warranty handover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
