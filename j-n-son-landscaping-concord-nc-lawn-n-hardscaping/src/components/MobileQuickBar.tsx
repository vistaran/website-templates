import React from "react";
import { Phone, Calendar } from "lucide-react";
import { BUSINESS_INFO } from "../data/content";

interface MobileQuickBarProps {
  onOpenQuote: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenQuote }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-sage/80 p-3 shadow-2xl flex items-center gap-3">
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        className="flex-1 py-3 px-4 rounded-xl bg-brand-sage/40 hover:bg-brand-sage/80 text-brand-moss font-mono text-xs font-bold flex items-center justify-center gap-2 border border-brand-sage"
      >
        <Phone className="w-3.5 h-3.5 text-brand-leaf" />
        <span>Call (704) 791-3793</span>
      </a>

      <button
        onClick={onOpenQuote}
        className="flex-1 py-3 px-4 rounded-xl bg-brand-leaf hover:bg-brand-moss text-brand-cream text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5 text-brand-clay" />
        <span>Free Quote</span>
      </button>
    </div>
  );
};
