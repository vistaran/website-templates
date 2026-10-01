import React, { useState } from 'react';
import { faqItems } from '../data/content';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { businessDetails } from '../data/content';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#faf8f5] text-[#1a241e] border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
            Clear Answers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-neutral-600 mt-2 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our Charlotte property maintenance, billing, turf installation, and seasonal programs.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base text-[#0c2317]">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'text-neutral-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-sm text-[#0c2317]">Have a specific Charlotte landscaping question?</h4>
            <p className="text-xs text-neutral-500">Call owner dispatch directly at (704) 918-0398.</p>
          </div>
          <a
            href={`tel:${businessDetails.phoneRaw}`}
            className="px-5 py-2.5 rounded-xl bg-[#0c2317] hover:bg-[#184632] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call (704) 918-0398</span>
          </a>
        </div>

      </div>
    </section>
  );
};
