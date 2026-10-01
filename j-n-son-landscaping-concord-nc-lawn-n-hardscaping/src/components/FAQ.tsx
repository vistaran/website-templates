import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQS } from "../data/content";

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1"); // Open first one by default

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-brand-cream border-b border-brand-sage/40">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
            06. CLEAR COGNITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-soil tracking-tight mb-5">
            Frequently asked questions.
          </h2>
          <p className="text-sm sm:text-base text-brand-soil/75 max-w-xl mx-auto">
            Everything you need to know about our estimates, scheduling, and lawn care techniques. 
            Have a different question? Give us a call directly.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white border border-brand-sage rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-brand-soil group-hover:text-brand-leaf transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-lg transition-colors ${isOpen ? "bg-brand-leaf/10 text-brand-leaf" : "bg-brand-sage/20 text-brand-soil/50 group-hover:text-brand-leaf"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-brand-sage/40" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-xs sm:text-sm text-brand-soil/70 leading-relaxed bg-brand-sage/10">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick Help box */}
        <div className="mt-12 p-6 bg-brand-sage/20 rounded-2xl border border-brand-sage/60 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-leaf/10 text-brand-leaf rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-soil">Need further clarification?</h4>
              <p className="text-xs text-brand-soil/65">Talk directly to J. or his son about your specific project.</p>
            </div>
          </div>
          <a
            href="tel:7047913793"
            className="px-5 py-3 bg-brand-leaf hover:bg-brand-moss text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0"
          >
            Call (704) 791-3793
          </a>
        </div>

      </div>
    </section>
  );
};
