import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface MobileQuickBarProps {
  onQuoteClick: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onQuoteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 sm:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.06)] flex items-center gap-2.5">
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        className="flex-1 py-3 px-3 bg-[#EBF7E9] text-[#2D5A27] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:bg-[#d5eed0] transition-colors"
      >
        <Phone className="w-4 h-4 text-[#55AD4B]" />
        <span>Call (980) 271-1799</span>
      </a>

      <button
        type="button"
        onClick={onQuoteClick}
        className="flex-1 py-3 px-3 bg-[#2D5A27] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:bg-[#1F3F1B] transition-colors"
      >
        <Calendar className="w-4 h-4 text-emerald-300" />
        <span>Free Quote</span>
      </button>
    </div>
  );
};
