import React from 'react';
import { Phone, Sparkles, Navigation, Calculator } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface MobileQuickBarProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenQuote, onOpenCalculator }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-2.5 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        
        {/* Call Now */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-800 text-emerald-400 font-bold text-xs border border-stone-700 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>Call Now</span>
        </a>

        {/* Free Estimate */}
        <button
          onClick={onOpenQuote}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-500 text-stone-950 font-black text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-stone-950" />
          <span>Free Quote</span>
        </button>

        {/* Directions / Maps */}
        <a
          href={BUSINESS_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-800 text-stone-200 font-bold text-xs border border-stone-700 active:scale-95 transition-transform"
        >
          <Navigation className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>Map / Store</span>
        </a>

      </div>
    </div>
  );
};
