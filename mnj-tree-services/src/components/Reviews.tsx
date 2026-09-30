import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/content';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAFAFA] relative border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Verified Google Badge */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          {/* Verified Google Business Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-xs mb-4">
            {/* Google G Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span className="text-xs font-bold text-[#333333]">
              Verified Google Business Profile
            </span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center text-[#E6A817]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#E6A817]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#183D22]">5.0 Rating</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183D22] tracking-tight mb-4 font-heading">
            Trusted by Charlotte Homeowners
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            Real feedback from verified clients who trusted M&J Tree Service LLC with their sod installation,
            mulching, and lawn maintenance.
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
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 flex flex-col justify-between hover:border-gray-200 transition-all hover:shadow-md"
            >
              <div>
                {/* Review Header: Stars, Verified Badge, Service Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#E6A817]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E6A817]" />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-[#183D22] bg-[#F2FAF0] px-2.5 py-1 rounded-md">
                    {review.serviceUsed}
                  </span>
                </div>

                {/* Review Quote Text */}
                <div className="relative mb-5">
                  <Quote className="w-6 h-6 text-gray-200 absolute -top-2 -left-1 -z-0 opacity-50" />
                  <p className="relative z-10 text-sm sm:text-base text-[#333333] leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#183D22]">
                    {review.name}
                  </div>
                  <div className="text-xs text-[#333333]/70">
                    {review.location}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6B9E4B]" />
                  <span>Verified Client</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Trust Bar */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F2FAF0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#183D22]" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#183D22]">
                100% Satisfaction & Clean-up Guarantee
              </div>
              <div className="text-xs text-[#333333]/80">
                We never leave your yard messy. Gates latched, driveways blown clean, and green waste hauled.
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="text-xs text-[#333333]/70 mb-1">
              Have we worked on your lawn?
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-xs font-bold text-[#183D22] hover:text-[#6B9E4B] inline-flex items-center gap-1"
            >
              <span>Call our team at {BUSINESS_INFO.phone}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
