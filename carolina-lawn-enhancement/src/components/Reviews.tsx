import React, { useState } from 'react';
import { reviewItems } from '../data/content';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, ExternalLink } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'verified'>('all');

  return (
    <section id="reviews" className="py-20 bg-white text-[#1a241e] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
              Trusted Across Mecklenburg County
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1">
              Client Feedback & Long-Term Trust
            </h2>
            <p className="text-base text-neutral-600 mt-2 leading-relaxed">
              When a landscaping company thrives for over 36 years in Charlotte, it comes down to reliable crews, honest pricing, and immaculate property care week after week.
            </p>
          </div>

          {/* Aggregate Rating Scorecard */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#faf8f5] border border-neutral-200 shadow-xs shrink-0">
            <div className="text-center pr-4 border-r border-neutral-200">
              <div className="font-display text-4xl font-bold text-[#0c2317] leading-none">4.9</div>
              <div className="flex items-center gap-0.5 mt-1.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-neutral-500 block mt-1">128+ Reviews</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0c2317]">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>36 Years in Charlotte</span>
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">
                QuickBooks billing verified
              </div>
              <a
                href="https://maps.app.goo.gl/pHSjQxNF9mUC1ogF6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950"
              >
                <span>Read on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewItems.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#faf8f5] rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Client Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.yearsAsClient && (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {rev.yearsAsClient}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-700 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Service Meta */}
              <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    <span title="Verified Customer">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 inline" />
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500">{rev.neighborhood}</div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-900 block">{rev.service}</span>
                  <span className="text-[10px] text-neutral-400">{rev.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
