import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/content';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#f8fafc] relative border-t border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Verified Google Badge */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          {/* Verified Google Business Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-200/80 shadow-sm mb-4">
            {/* Google G Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-xs font-bold text-[#022c22]">
              Verified Google Business Profile
            </span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-emerald-950">5.0 Star Rating (38 Reviews)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022c22] tracking-tight mb-4 font-heading">
            Trusted by Homeowners Across Gastonia
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Real feedback from local clients who rely on G & T Lawn Care for consistent weekly grass cutting, 
            sharp edging, and dependable property maintenance.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 flex flex-col justify-between hover:border-emerald-600/30 transition-all hover:shadow-lg"
            >
              <div>
                {/* Review Header: Stars, Verified Badge, Service Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-lg">
                    {review.serviceUsed}
                  </span>
                </div>

                {/* Review Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-emerald-100 absolute -top-3 -left-2 -z-0 opacity-80" />
                  <p className="relative z-10 text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm text-[#022c22]">
                    {review.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {review.location}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Google Review</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Trust Bar */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#064e3b] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="text-base font-extrabold text-[#022c22] font-heading">
                100% Satisfaction & Tidy Property Guarantee
              </div>
              <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Gates securely latched, walkways blown clean, and sharp blade cuts every single visit.
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="text-xs text-slate-500 mb-1 font-medium">
              Check our profile on Google Maps:
            </div>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-800 hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View G & T Lawn Care on Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
