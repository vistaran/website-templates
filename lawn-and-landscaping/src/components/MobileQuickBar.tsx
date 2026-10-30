import React from 'react';
import { Phone, Sparkles, Navigation } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface MobileQuickBarProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenQuote }) => {
  const { businessInfo } = useBusiness();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 p-2 sm:hidden shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2">
        
        {/* Call Now */}
        <a
          href={`tel:${businessInfo.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 min-h-[44px] rounded-xl bg-stone-900 hover:bg-stone-800 text-emerald-400 font-bold text-xs border border-stone-800 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>Call Now</span>
        </a>

        {/* Free Estimate */}
        <button
          onClick={onOpenQuote}
          className="flex flex-col items-center justify-center py-2 px-1 min-h-[44px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-stone-950" />
          <span>Free Quote</span>
        </button>

        {/* Directions / Maps */}
        <a
          href={businessInfo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 min-h-[44px] rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold text-xs border border-stone-800 active:scale-95 transition-transform"
        >
          <Navigation className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>Location</span>
        </a>

      </div>
    </div>
  );
};
