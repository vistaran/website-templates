import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const FAQ: React.FC = () => {
  const { businessInfo, faqs } = useBusiness();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our residential and commercial landscaping services in {businessInfo.city}.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-stone-50 transition-colors cursor-pointer select-none"
                >
                  <span className="font-bold text-stone-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <h4 className="font-bold text-stone-900 text-base">Have a specific question about your yard?</h4>
          <p className="text-xs sm:text-sm text-stone-600">
            Call or text {businessInfo.ownerName || 'our team'} at <a href={`tel:${businessInfo.phoneRaw}`} className="text-emerald-700 font-bold hover:underline">{businessInfo.phone}</a>. We answer quickly and are happy to help!
          </p>
        </div>

      </div>
    </section>
  );
};
