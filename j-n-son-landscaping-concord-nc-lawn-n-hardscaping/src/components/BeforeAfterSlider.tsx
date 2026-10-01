import React, { useState } from "react";
import { Sparkles, MoveHorizontal, CheckCircle2, MapPin, Calendar, Ruler } from "lucide-react";

interface TransformationItem {
  id: string;
  tabLabel: string;
  title: string;
  location: string;
  duration: string;
  size: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  beforeFeatures: string[];
  afterFeatures: string[];
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "patio-rebuilt",
    tabLabel: "Paver Patio & Walkway",
    title: "Overgrown Sloped Backyard to Bluestone Paver Living Space",
    location: "Concord, NC (Cabarrus County)",
    duration: "4 Days",
    size: "480 sq. ft.",
    description: "This homeowner suffered from chronic water pooling and an unusable muddy slope. Our team excavated the clay, installed a sub-grade French drainage system, leveled the foundation with compacted crusher run, and installed interlocking bluestone pavers with integrated walkway borders.",
    beforeLabel: "BEFORE: Unkempt Clay Slope & Poor Drainage",
    afterLabel: "AFTER: Leveled Bluestone Paver Living Space",
    beforeImage: "/images/patio-before.jpg",
    afterImage: "/images/patio-after.jpg",
    beforeFeatures: ["Standing water during heavy rains", "Unusable uneven weed-choked slope", "Patchy weed & debris perimeter"],
    afterFeatures: ["Integrated subsurface French drain", "Laser-leveled bluestone flagstone pavers", "Compacted crushed stone base stability"]
  },
  {
    id: "fescue-renovation",
    tabLabel: "Lawn Sod Renovation",
    title: "Weed-Infested Yard to Clean Emerald Turf & Flowerbeds",
    location: "Huntersville, NC",
    duration: "2 Days",
    size: "2,200 sq. ft.",
    description: "Severely choked with stubborn weeds and overgrown brush. J & Son completely stripped the old dead surface, amended the heavy red clay with nutrient-dense topsoil compost, graded for runoff, and restored clean turf lines and manicured planting beds.",
    beforeLabel: "BEFORE: Overgrown Weeds & Hardened Clay",
    afterLabel: "AFTER: Restored Healthy Turf & Clean Borders",
    beforeImage: "/images/lawn-before.jpg",
    afterImage: "/images/lawn-after.jpg",
    beforeFeatures: ["85% weed and brush infestation", "Compacted clay preventing root depth", "Unmaintained overgrown yard edges"],
    afterFeatures: ["Excavated and tilled organic compost", "Clean hand-cut edging along perimeter", "Manicured lawn & healthy mulched beds"]
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("patio-rebuilt");
  const [sliderPos, setSliderValue] = useState<number>(50);

  const activeJob = TRANSFORMATIONS.find((t) => t.id === activeId) || TRANSFORMATIONS[0];

  return (
    <section id="transformations" className="py-24 bg-brand-cream border-b border-brand-sage/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
            03. PROVEN TRANSFORMATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-soil tracking-tight mb-5 leading-tight">
            See the difference real precision makes.
          </h2>
          <p className="text-base text-brand-soil/75 font-normal leading-relaxed">
            Drag the interactive slider below to inspect actual project outcomes across Concord and Huntersville. 
            No staged mockups—just honest, hard-working craftsmanship.
          </p>
        </div>

        {/* Tab Switcher & Quick View Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-brand-sage/40 rounded-xl w-full sm:w-auto">
            {TRANSFORMATIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveId(t.id);
                  setSliderValue(50);
                }}
                className={`flex-1 sm:flex-initial py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-bold rounded-lg transition-all text-center cursor-pointer ${
                  activeId === t.id
                    ? "bg-white text-brand-moss shadow-sm"
                    : "text-brand-soil/70 hover:text-brand-soil"
                }`}
              >
                {t.tabLabel}
              </button>
            ))}
          </div>

          {/* Quick preset positions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono text-brand-soil/60 hidden md:inline">Quick View:</span>
            <button
              onClick={() => setSliderValue(100)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                sliderPos === 100
                  ? "bg-brand-moss text-white border-brand-moss"
                  : "bg-white text-brand-soil/70 border-brand-sage hover:border-brand-soil/40"
              }`}
            >
              Before Only
            </button>
            <button
              onClick={() => setSliderValue(50)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                sliderPos === 50
                  ? "bg-brand-moss text-white border-brand-moss"
                  : "bg-white text-brand-soil/70 border-brand-sage hover:border-brand-soil/40"
              }`}
            >
              50 / 50
            </button>
            <button
              onClick={() => setSliderValue(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                sliderPos === 0
                  ? "bg-brand-moss text-white border-brand-moss"
                  : "bg-white text-brand-soil/70 border-brand-sage hover:border-brand-soil/40"
              }`}
            >
              After Only
            </button>
          </div>
        </div>

        {/* Double-Panel Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Column 1: Real Photo Interactive Slider - 7 columns */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">
            
            <div className="relative w-full h-[320px] sm:h-[440px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl select-none border-2 border-brand-sage bg-brand-soil">
              
              {/* Layer 1: AFTER PHOTO (Base Layer - 100% responsive width/height) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeJob.afterImage}
                  alt={activeJob.afterLabel}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* AFTER label badge */}
                <div className="absolute top-4 right-4 bg-brand-moss/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-brand-cream shadow-md z-10">
                  <span className="text-xs font-mono font-bold tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-clay" />
                    AFTER (COMPLETED)
                  </span>
                </div>
              </div>

              {/* Layer 2: BEFORE PHOTO (100% container match, precisely clipped with CSS clipPath) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75 pointer-events-none z-20"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={activeJob.beforeImage}
                  alt={activeJob.beforeLabel}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />

                {/* BEFORE label badge */}
                <div className="absolute top-4 left-4 bg-brand-soil/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-brand-cream shadow-md z-30">
                  <span className="text-xs font-mono font-bold tracking-wider">
                    BEFORE (INITIAL)
                  </span>
                </div>
              </div>

              {/* Interactive Range Slider (Responsive touch & drag on all screens) */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize z-40 w-full h-full"
                aria-label="Drag to view before and after comparison"
              />

              {/* Vertical Divider Line with Grab Handle */}
              <div 
                className="absolute top-0 bottom-0 w-[3px] sm:w-[4px] bg-white z-30 pointer-events-none shadow-2xl transition-all duration-75"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-moss text-brand-cream border-2 border-white flex items-center justify-center shadow-2xl">
                  <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

            </div>

            {/* Slider Drag Hint */}
            <span className="text-xs font-mono text-brand-soil/60 mt-3 flex items-center gap-2 text-center">
              <MoveHorizontal className="w-3.5 h-3.5 text-brand-leaf animate-pulse shrink-0" />
              <span>Drag or slide anywhere across the photo to compare</span>
            </span>

          </div>

          {/* Column 2: Verified Case Study Details - 5 columns */}
          <div className="lg:col-span-5 text-left bg-white border border-brand-sage rounded-3xl p-6 sm:p-8 shadow-sm w-full">
            
            {/* Project Quick Meta Tag */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-soil/60 mb-4 pb-4 border-b border-brand-sage/60">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-clay" />
                {activeJob.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-leaf" />
                {activeJob.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-brand-leaf" />
                {activeJob.size}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-soil tracking-tight mb-4 leading-snug">
              {activeJob.title}
            </h3>

            <p className="text-sm text-brand-soil/75 mb-6 leading-relaxed">
              {activeJob.description}
            </p>

            {/* Before vs After comparison bullets */}
            <div className="space-y-4 pt-4 border-t border-brand-sage/60">
              
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <h4 className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Initial Site Challenges
                </h4>
                <ul className="space-y-1.5">
                  {activeJob.beforeFeatures.map((f, i) => (
                    <li key={i} className="text-xs text-amber-950/80 flex items-start gap-2">
                      <span className="text-amber-700 font-bold shrink-0">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                <h4 className="text-xs font-mono font-bold text-emerald-900 uppercase tracking-wider mb-2">
                  Completed J &amp; Son Execution
                </h4>
                <ul className="space-y-1.5">
                  {activeJob.afterFeatures.map((f, i) => (
                    <li key={i} className="text-xs text-emerald-950/80 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
