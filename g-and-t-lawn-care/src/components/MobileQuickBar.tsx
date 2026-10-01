import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface MobileQuickBarProps {
  onQuoteClick: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onQuoteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-900/10 px-4 py-2.5 sm:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.06)] flex items-center gap-2.5">
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        className="flex-1 py-3 px-3 bg-amber-400 text-slate-950 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 active:bg-amber-500 transition-colors shadow-xs"
      >
        <Phone className="w-4 h-4 text-slate-950" />
        <span>Call {BUSINESS_INFO.phone}</span>
      </a>

      <button
        type="button"
        onClick={onQuoteClick}
        className="flex-1 py-3 px-3 bg-[#064e3b] text-white rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 active:bg-[#022c22] transition-colors shadow-xs"
      >
        <Calendar className="w-4 h-4 text-amber-300" />
        <span>Free Quote</span>
      </button>
    </div>
  );
};
