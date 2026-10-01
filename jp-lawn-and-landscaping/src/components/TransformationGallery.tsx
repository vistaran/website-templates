import React, { useState, useRef, useEffect } from 'react';
import { TRANSFORMATIONS } from '../data/content';
import { Sparkles, MapPin, Clock, ArrowRight, Eye, SlidersHorizontal } from 'lucide-react';

interface TransformationGalleryProps {
  onOpenQuote: (service?: string) => void;
}

export const TransformationGallery: React.FC<TransformationGalleryProps> = ({ onOpenQuote }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const activeProject = TRANSFORMATIONS[activeProjectIdx];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="transformations" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Before & After</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Real Transformations Across Kannapolis & Concord
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300">
            Drag the slider to reveal how our crew turns tired, overgrown, or bare yards into lush lawns and stunning outdoor gathering spaces.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          {TRANSFORMATIONS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProjectIdx(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeProjectIdx === idx
                  ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/25 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700/80 border border-stone-700'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Interactive Before / After Split Viewer */}
        <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Viewer Column */}
            <div 
              ref={containerRef}
              className="lg:col-span-8 relative h-[300px] sm:h-[420px] md:h-[460px] select-none overflow-hidden bg-stone-900"
            >
              
              {/* "After" Image (Base layer) */}
              <img
                src={activeProject.afterImage}
                alt={`${activeProject.title} After`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=800&q=80";
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-emerald-700/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md z-10">
                AFTER (JP Landscaping)
              </span>

              {/* "Before" Image (Clipped layer) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden z-10"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeProject.beforeImage}
                  alt={`${activeProject.title} Before`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="absolute inset-0 h-full object-cover max-w-none"
                  style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
                />
                <span className="absolute bottom-4 left-4 bg-stone-900/90 backdrop-blur-sm text-stone-300 text-xs font-bold px-3 py-1.5 rounded-md shadow-md">
                  BEFORE
                </span>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-stone-900 shadow-xl flex items-center justify-center font-bold text-xs border-2 border-emerald-500">
                  ↔
                </div>
              </div>

              {/* Invisible Range Input for Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Before and after slider"
              />

              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded text-[11px] text-stone-300 z-10">
                Drag slider left / right
              </div>
            </div>

            {/* Project Details Column */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-800">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                  {activeProject.category}
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight">
                  {activeProject.title}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-800 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Location: <strong className="text-stone-200">{activeProject.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Turnaround Time: <strong className="text-stone-200">{activeProject.duration}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <button
                  onClick={() => onOpenQuote(activeProject.title)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Request Similar Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
