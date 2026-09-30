import React from 'react';
import { Phone, MapPin, Shield, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import BookingCalendar from './BookingCalendar';

interface QuoteFormSectionProps {
  initialService?: string;
  initialMessage?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  initialService,
  initialMessage,
}) => {
  // The old form was replaced with the BookingCalendar.
  // We pass initialMessage down to it so the calculator output is utilized.

  return (
    <section id="contact-quote" className="py-20 bg-[#ffffff] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-bold text-[#84cc16] tracking-wider uppercase mb-2">
            Free No-Obligation Estimate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4 font-heading">
            Get Your Free Charlotte Lawn Quote
          </h2>
          <p className="text-base sm:text-lg text-[#0f172a] leading-relaxed">
            Tell us about your property and lawn care needs. We will inspect your requirements and respond
            within 24 hours with an upfront, transparent estimate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Direct Call & Highlights (5 cols) */}
          <div className="md:col-span-5 bg-[#0f172a] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#84cc16] bg-white/10 px-3 py-1 rounded-md uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Response
              </div>

              <h3 className="text-2xl font-bold font-heading mb-4 leading-snug">
                Prefer to speak with our crew directly?
              </h3>

              <p className="text-sm text-[#ecfccb]/90 mb-8 leading-relaxed">
                Give us a quick call or text with your address and photos for immediate assistance during business hours.
              </p>

              {/* Direct Action Card */}
              <div className="space-y-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#84cc16] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">Direct Phone</div>
                    <div className="text-lg font-bold">{BUSINESS_INFO.phone}</div>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#84cc16] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">Hours</div>
                    <div className="text-sm font-semibold">{BUSINESS_INFO.hours.weekdays}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#84cc16] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">HQ Base</div>
                    <div className="text-sm font-semibold">Charlotte, NC 28273</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/15 mt-8 flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-[#84cc16] shrink-0" />
              <span>No spam. Your info is only used to schedule your quote.</span>
            </div>
          </div>

          {/* Right Column: The Lead Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-10 bg-slate-50 flex flex-col justify-center">
            <div className="mb-8 text-center sm:text-left max-w-lg mx-auto w-full">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 font-heading tracking-tight">
                Schedule Your Free Consultation
              </h3>
              <p className="text-sm sm:text-base text-[#0f172a]/80 leading-relaxed">
                Pick a date and time that works best for you, and our team will come out to assess your yard and provide a custom quote.
              </p>
            </div>
            <div className="w-full flex justify-center pb-4">
              <BookingCalendar initialRequirement={initialMessage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
