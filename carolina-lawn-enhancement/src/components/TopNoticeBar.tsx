import React from 'react';
import { Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { businessDetails } from '../data/content';

interface TopNoticeBarProps {
  onOpenQuote: () => void;
}

export const TopNoticeBar: React.FC<TopNoticeBarProps> = ({ onOpenQuote }) => {
  return (
    <div className="bg-[#0c2317] text-[#e0ded8] text-xs py-2 px-4 border-b border-[#1b3d2b] transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Trust & Location */}
        <div className="flex items-center flex-wrap gap-4 text-[#c4c1b7]">
          <span className="flex items-center gap-1.5 font-medium text-amber-400/95">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>36+ Years Serving Charlotte, NC</span>
          </span>
          <span className="hidden sm:inline text-white/30" aria-hidden="true">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#65a37e]" />
            <span>10915 Delsing Ct, Charlotte, NC 28214</span>
          </span>
          <span className="hidden md:inline text-white/30" aria-hidden="true">|</span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#65a37e]" />
            <span>Mon–Fri 7:00 AM – 6:30 PM · Sat 8:00 AM – 3:30 PM</span>
          </span>
        </div>

        {/* Right: Direct Phone & Quote Action */}
        <div className="flex items-center gap-4 ml-auto">
          <a 
            href={`tel:${businessDetails.phoneRaw}`} 
            className="flex items-center gap-1.5 text-white font-semibold hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{businessDetails.phone}</span>
          </a>
          <button
            onClick={onOpenQuote}
            className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded bg-emerald-800/80 hover:bg-emerald-700 text-white font-medium text-[11px] transition-colors"
          >
            Quick Estimate
          </button>
        </div>
      </div>
    </div>
  );
};
