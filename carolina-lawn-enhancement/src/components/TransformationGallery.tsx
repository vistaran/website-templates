import React, { useState } from 'react';
import { transformationItems } from '../data/content';
import { TransformationItem } from '../types';
import { MapPin, Clock, Sprout, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface TransformationGalleryProps {
  onOpenQuote: () => void;
}

export const TransformationGallery: React.FC<TransformationGalleryProps> = ({ onOpenQuote }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);

  const activeItem: TransformationItem = transformationItems[selectedItemIndex];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  return (
    <section id="transformations" className="py-20 bg-white text-[#1a241e] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
            Real Charlotte Case Studies
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1">
            Before & After Property Transformations
          </h2>
          <p className="text-base text-neutral-600 mt-2 leading-relaxed">
            Drag the comparison slider on each project to inspect the difference 36 years of soil preparation, correct turf selection, and diamond-line maintenance make.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {transformationItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedItemIndex === idx
                  ? 'bg-[#0c2317] text-white border-[#0c2317] shadow-sm'
                  : 'bg-[#faf8f5] text-neutral-700 hover:bg-neutral-100 border-neutral-200'
              }`}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#faf8f5] p-6 sm:p-8 rounded-3xl border border-neutral-200">
          
          {/* Left: Interactive Slider Frame (7 cols) */}
          <div className="lg:col-span-7">
            <div 
              className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-md select-none cursor-ew-resize border border-neutral-300 touch-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Full background) */}
              <img
                src={activeItem.afterImage}
                alt={`${activeItem.title} - After`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/after_pristine.jpg';
                }}
              />
              <div className="absolute top-4 right-4 bg-[#0c2317]/85 backdrop-blur-md text-amber-400 font-bold text-xs px-3 py-1.5 rounded-full shadow-md z-10">
                AFTER ENHANCEMENT
              </div>

              {/* Before Image (Clipped overlay) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={activeItem.beforeImage}
                  alt={`${activeItem.title} - Before`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/before_patchy.jpg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                  BEFORE
                </div>
              </div>

              {/* Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag Handle Button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0c2317] border-2 border-[#0c2317] shadow-xl flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4 text-[#0c2317]" />
                </div>
              </div>

              {/* Drag Prompt */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full pointer-events-none">
                Drag slider left or right
              </div>
            </div>

            {/* Quick Toggle Helper Buttons */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <button
                onClick={() => setSliderPos(100)}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white px-3 py-1 rounded-md border border-neutral-200"
              >
                Show 100% Before
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className="text-xs font-semibold text-[#0c2317] hover:text-emerald-800 bg-white px-3 py-1 rounded-md border border-neutral-300 shadow-xs"
              >
                Split 50/50
              </button>
              <button
                onClick={() => setSliderPos(0)}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white px-3 py-1 rounded-md border border-neutral-200"
              >
                Show 100% After
              </button>
            </div>
          </div>

          {/* Right: Project Details & Meta (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {activeItem.serviceType}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0c2317] mt-1">
                {activeItem.title}
              </h3>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              {activeItem.description}
            </p>

            {/* Project Specs */}
            <div className="bg-white rounded-xl p-4 border border-neutral-200/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  Neighborhood
                </span>
                <span className="font-bold text-neutral-800">{activeItem.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  Turnaround
                </span>
                <span className="font-bold text-neutral-800">{activeItem.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                  Turf / Plant Choice
                </span>
                <span className="font-bold text-neutral-800">{activeItem.grassType}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0c2317] hover:bg-[#184632] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Get a Transformation for Your Property</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
