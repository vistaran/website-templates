import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, Quote, MessageSquarePlus } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const Reviews: React.FC = () => {
  const { businessInfo, reviews } = useBusiness();
  const [filterService, setFilterService] = useState<string>('all');

  const filteredReviews = filterService === 'all'
    ? reviews
    : reviews.filter(r => r.service.toLowerCase().includes(filterService.toLowerCase()));

  const cityAreaLabel = businessInfo.secondaryCity
    ? `${businessInfo.city} & ${businessInfo.secondaryCity}`
    : businessInfo.city;

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Badge */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-14">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Recommended by Neighbors Across {cityAreaLabel}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
              We take pride in every cut edge, every leveled paver stone, and every fresh sod roll. Read what homeowners in {cityAreaLabel} say about {businessInfo.name}.
            </p>
          </div>

          {/* Google Rating Showcase Box */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl text-center shrink-0 w-full sm:w-80">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span className="font-bold text-stone-900 text-sm">Customer Rating</span>
            </div>

            <div className="text-4xl font-black text-stone-900 flex items-center justify-center gap-1">
              <span>{businessInfo.rating.toFixed(1)}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-stone-500 mt-2">
              Based on {businessInfo.reviewCount}+ verified local reviews
            </p>

            <a
              href={businessInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold transition-all inline-flex items-center justify-center gap-1.5 shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Location on Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs font-bold text-stone-500 uppercase mr-1">Filter by Service:</span>
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'mowing', label: 'Lawn Mowing' },
            { id: 'paver', label: 'Paver Patios' },
            { id: 'sod', label: 'Sod Install' },
            { id: 'tree', label: 'Tree Trimming' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterService(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterService === cat.id
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-medium">{rev.date}</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {rev.service}
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Location Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">{rev.author}</div>
                  <div className="text-xs text-stone-500">{rev.location}</div>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Callout Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Quote className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base">Had great work done by {businessInfo.name}?</h4>
              <p className="text-xs text-stone-600">Your feedback helps our local {businessInfo.city} family business thrive!</p>
            </div>
          </div>

          <a
            href={businessInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl border border-stone-300 hover:border-emerald-600 text-stone-800 hover:text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-600" />
            <span>Leave a Review</span>
          </a>
        </div>

      </div>
    </section>
  );
};
