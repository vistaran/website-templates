import React from 'react';
import { Phone, Calculator, Calendar } from 'lucide-react';
import { businessDetails } from '../data/content';

interface MobileQuickBarProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
  onOpenCalendar?: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenQuote,
  onOpenCalculator,
  onOpenCalendar
}) => {
  const handleCalendar = () => {
    if (onOpenCalendar) {
      onOpenCalendar();
    } else {
      const el = document.getElementById('book-appointment');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c2317] border-t border-[#1b442e] p-2.5 px-3 shadow-2xl flex items-center gap-2">
      <a
        href={`tel:${businessDetails.phoneRaw}`}
        className="flex-1 py-2.5 px-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
      >
        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate">Call (704) 918-0398</span>
      </a>

      <button
        onClick={handleCalendar}
        className="p-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-amber-400 font-bold transition-colors border border-emerald-600/40 shrink-0"
        title="Book Appointment Calendar"
      >
        <Calendar className="w-4 h-4 text-amber-400" />
      </button>

      <button
        onClick={onOpenCalculator}
        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-amber-400 font-bold transition-colors border border-white/10 shrink-0"
        title="Sod Calculator"
      >
        <Calculator className="w-4 h-4" />
      </button>

      <button
        onClick={onOpenQuote}
        className="flex-1 py-2.5 px-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0c2317] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shrink-0"
      >
        <span>Free Quote</span>
      </button>
    </div>
  );
};
