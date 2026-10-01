import React from 'react';
import { Award, CreditCard, TreePine, Clock, ShieldCheck, FileCheck } from 'lucide-react';

export const TrustStatsBar: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: '36+ Years in Business',
      desc: 'Established in 1988, serving Charlotte and Mecklenburg county properties with proven lawn expertise.'
    },
    {
      icon: CreditCard,
      title: 'QuickBooks & Contract Billing',
      desc: 'Hassle-free automated billing, transparent monthly invoicing, and locked-rate yearly contracts.'
    },
    {
      icon: TreePine,
      title: 'Carolina Clay Turf Science',
      desc: 'Engineered specifically for Piedmont clay compaction, drought resistance, and root-depth health.'
    },
    {
      icon: FileCheck,
      title: 'Fully Licensed & Insured',
      desc: 'Complete commercial and residential liability coverage with clean, uniformed, background-checked crews.'
    }
  ];

  return (
    <section className="bg-white border-y border-neutral-200/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0f291e]/5 text-[#0f291e] border border-[#0f291e]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#1b5537]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0c2317] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
