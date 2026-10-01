import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS } from '../data/content';
import { MapPin, Sparkles, Eye, Scissors } from 'lucide-react';

interface BeforeAfterCardProps {
  item: (typeof GALLERY_ITEMS)[0];
  index: number;
}

const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({ item, index }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-emerald-900/10 flex flex-col group hover:shadow-xl transition-all"
    >
      {/* Interactive Before/After Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden select-none bg-slate-900">
        {/* "After" Image (Base layer) */}
        <img
          src={item.afterImg}
          alt={`After: ${item.altText}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.beforeImg}
            alt={`Before: ${item.altText}`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', minWidth: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#064e3b] text-[#064e3b]">
            <span className="text-[10px] font-black tracking-tighter">◀ ▶</span>
          </div>
        </div>

        {/* Minimal Tags */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-xs text-white rounded-md shadow-xs">
            Before
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#064e3b]/90 backdrop-blur-xs text-amber-300 rounded-md shadow-xs">
            After G & T
          </span>
        </div>

        {/* Range Slider for Interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          onMouseDown={() => setIsInteracting(true)}
          onMouseUp={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
          aria-label={`Compare before and after for ${item.title}`}
        />

        {/* Interactive Helper Hint */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
            <Eye className="w-3 h-3 text-amber-400" />
            Drag slider left or right
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1 text-emerald-900 font-bold">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {item.locationTag}
            </span>
            <span className="uppercase tracking-wider font-extrabold text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Verified Project
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-[#022c22] font-heading mb-2">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Crisp Edges & Clean Finish
          </span>
          <button
            type="button"
            onClick={() => {
              const quoteSection = document.getElementById('contact-quote');
              if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#064e3b] hover:text-amber-600 hover:underline cursor-pointer"
          >
            Get Similar Results →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const TransformationGallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            Real Gaston County Transformations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022c22] tracking-tight mb-4 font-heading">
            See the G & T Lawn Care Difference
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Drag the sliders to see how our precision grass cutting, vertical edging, mulch beds, and property cleanups
            turn unruly yards into tidy outdoor spaces.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <BeforeAfterCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Quality Commitment Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-[#022c22] text-base sm:text-lg font-heading">
                Ready for crisp mowing lines and razor-clean edges?
              </div>
              <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                We provide reliable weekly and bi-weekly schedules throughout Gastonia, Belmont, and nearby communities.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 btn-vibrant btn-primary text-slate-950 text-xs sm:text-sm font-black rounded-2xl transition-colors shrink-0 cursor-pointer text-center"
          >
            Claim Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
};
