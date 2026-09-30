import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/content';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-[#84cc16] tracking-wider uppercase mb-2">
            Homeowner Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#0f172a]">
            Everything you need to know about sod installation and lawn care in Charlotte, NC.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50/80 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-[#0f172a] font-heading">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0f172a] text-white' : 'bg-[#ecfccb] text-[#0f172a]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#0f172a] leading-relaxed border-t border-gray-100 bg-[#ffffff]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-[#ecfccb] border border-[#84cc16]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#0f172a] shrink-0" />
            <div className="text-xs sm:text-sm text-[#0f172a]">
              Have a specific question about your lawn or soil grading?
            </div>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f172a] text-white text-xs font-bold rounded-xl hover:bg-[#020617] transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (980) 253-5692</span>
          </a>
        </div>
      </div>
    </section>
  );
};
