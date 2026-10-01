import React, { useState } from "react";
import { Star, MessageSquare, CheckCircle, ShieldCheck } from "lucide-react";
import { REVIEWS } from "../data/content";

export const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredReviews = activeFilter === "all"
    ? REVIEWS
    : REVIEWS.filter((r) => r.role.toLowerCase().includes(activeFilter));

  return (
    <section id="reviews" className="py-24 bg-brand-sage/20 border-b border-brand-sage/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
              06. CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-soil tracking-tight leading-tight">
              5-Star Google ratings from your neighbors.
            </h2>
            <p className="text-sm sm:text-base text-brand-soil/75 mt-3 leading-relaxed">
              Read how J. and his crew have transformed properties across Concord, Huntersville, and Cornelius.
            </p>
          </div>

          {/* Quick Filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-brand-sage/40 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveFilter("maintenance")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === "maintenance"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Lawn Care
            </button>
            <button
              onClick={() => setActiveFilter("retaining")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === "retaining"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Hardscapes
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className="flex flex-col justify-between p-8 bg-white border border-brand-sage rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-clay text-brand-clay" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-brand-soil/45">{review.date}</span>
                </div>

                {/* Review Text */}
                <blockquote className="text-sm sm:text-base text-brand-soil/85 leading-relaxed font-normal italic mb-6 text-left">
                  "{review.text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-sage/60 mt-auto">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-brand-leaf/10 text-brand-leaf font-serif font-black text-sm flex items-center justify-center shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-serif font-bold text-brand-soil block">
                      {review.author}
                    </cite>
                    <div className="flex items-center gap-1.5 text-xs text-brand-soil/55 font-mono">
                      <span>{review.location}</span>
                      <span aria-hidden="true" className="text-brand-clay font-bold">•</span>
                      <span>{review.role}</span>
                    </div>
                  </div>
                </div>

                {review.verified && (
                  <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Client
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Google Ratings Summary Box */}
        <div className="p-6 sm:p-8 bg-white border border-brand-sage rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-clay/10 text-brand-clay flex items-center justify-center font-mono font-black text-2xl shrink-0">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-serif font-bold text-brand-soil">
                  Google Verified Business
                </h4>
                <ShieldCheck className="w-4 h-4 text-brand-leaf" />
              </div>
              <p className="text-xs text-brand-soil/65 mt-0.5">
                All 24 ratings are independently authenticated Google reviews for J &amp; Son Landscaping.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-brand-sage/60 pt-4 md:pt-0 md:pl-8 shrink-0">
            <div className="text-right">
              <span className="text-3xl font-mono font-black text-brand-leaf block leading-none">
                5.0
              </span>
              <div className="flex items-center gap-0.5 mt-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-clay text-brand-clay" />
                ))}
              </div>
            </div>
            <div className="text-left text-xs font-mono text-brand-soil/60">
              <span className="font-bold text-brand-soil block">24 Reviews</span>
              <span>100% Positive</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
