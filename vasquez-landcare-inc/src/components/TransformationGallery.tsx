import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS } from '../data/content';
import { MapPin, Sparkles, Eye } from 'lucide-react';

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
      className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-lg transition-all"
    >
      {/* Interactive Before/After Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden select-none bg-gray-900">
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
          <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#451A03] text-[#451A03]">
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
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#451A03]/90 backdrop-blur-xs text-white rounded-md shadow-xs">
            After
          </span>
        </div>

        {/* Range Slider for DM Sansaction */}
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
          <span className="text-[10px] text-white/90 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
            <Eye className="w-3 h-3 text-[#65A30D]" />
            Drag slider left or right
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#333333]/70 mb-2">
            <span className="flex items-center gap-1 text-[#451A03] font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#65A30D]" />
              {item.locationTag}
            </span>
            <span className="uppercase tracking-wider font-bold text-[10px] text-[#65A30D]">
              Real Transformation
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#451A03] font-heading mb-2">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#65A30D] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            100% Sod & Soil Prepared
          </span>
          <button
            type="button"
            onClick={() => {
              const quoteSection = document.getElementById('contact-quote');
              if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#451A03] hover:text-[#78350F] hover:underline"
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
          <div className="text-xs font-bold text-[#65A30D] tracking-wider uppercase mb-2">
            Proven Results in Charlotte, NC
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#451A03] tracking-tight mb-4 font-heading">
            The Transformation Gallery
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            Drag the comparison sliders to see how our sod installations, mulch beds, and lawn cleanups
            turn tired Charlotte clay into lush, picture-perfect outdoor spaces.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <BeforeAfterCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Quality Commitment Callout */}
        <div className="mt-12 p-6 rounded-sm bg-[#FAFAFA] border border-gray-200/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-sm bg-[#451A03] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#65A30D]" />
            </div>
            <div>
              <div className="font-bold text-[#451A03] text-sm sm:text-base font-heading">
                Ready for your yard's before-and-after moment?
              </div>
              <div className="text-xs sm:text-sm text-[#333333]/80">
                We inspect soil grade, root depth, and sun conditions to ensure your new sod or mulch lasts.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#451A03] hover:bg-[#78350F] text-white text-xs sm:text-sm font-bold rounded-sm transition-colors shrink-0 cursor-pointer"
          >
            Claim Your Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
};
