import React from 'react';
import { BUSINESS_INFO, BUSINESS_HOURS, SERVICE_AREAS } from '../data/content';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BusinessHoursAndAreaProps {
  onOpenQuote: () => void;
}

export const BusinessHoursAndArea: React.FC<BusinessHoursAndAreaProps> = ({ onOpenQuote }) => {
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section id="service-area" className="py-20 bg-stone-100/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Serving Cabarrus & Rowan Counties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Our Location, Hours & Service Area
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            Headquartered in Kannapolis, NC, we provide rapid, reliable response times for homes and commercial facilities across the greater Concord and Charlotte northern metro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Hours Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">Operating Hours</h3>
                <span className="text-xs text-emerald-700 font-semibold">Available for Emergency Storm Service</span>
              </div>
            </div>

            {/* Hours Table */}
            <div className="space-y-2.5 text-sm">
              {BUSINESS_HOURS.map((h) => {
                const isToday = h.day.toLowerCase() === todayName.toLowerCase();
                return (
                  <div
                    key={h.day}
                    className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                      isToday ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isToday && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                      {h.day}
                    </span>
                    <span className={h.hours.includes('Closed') ? 'text-stone-400 font-medium' : 'font-semibold'}>
                      {h.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Contact Details */}
            <div className="pt-4 border-t border-stone-200 space-y-3 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <strong className="block text-stone-900">Physical Address:</strong>
                  <span>{BUSINESS_INFO.fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <strong className="block text-stone-900">Direct Phone:</strong>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-emerald-700 font-bold hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <strong className="block text-stone-900">Email:</strong>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-emerald-700 hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-all cursor-pointer text-center block"
              >
                Request Free Estimate
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Map & Towns Served */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Visual Map Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <div className="p-5 bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <h4 className="font-bold text-sm">Kannapolis Base & Service Radius</h4>
                    <p className="text-xs text-stone-300">1400 Birch St, Kannapolis, NC 28081</p>
                  </div>
                </div>

                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Map Canvas / Simulated Interactive Local View */}
              <div className="relative h-64 sm:h-72 w-full bg-stone-200 overflow-hidden">
                <iframe
                  title="JP Lawn and Landscaping Map Location"
                  src={`https://maps.google.com/maps?q=${BUSINESS_INFO.coordinates.lat},${BUSINESS_INFO.coordinates.lng}&z=13&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating overlay chip */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-stone-200 text-xs">
                  <div className="font-bold text-stone-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>JP Lawn and Landscaping</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Prompt daily routing in Kannapolis & Concord</div>
                </div>
              </div>
            </div>

            {/* Service Area Badges & Coverage */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-stone-900 text-base">
                  Towns & Communities We Frequently Serve:
                </h4>
                <span className="text-xs text-emerald-700 font-semibold">Cabarrus & Rowan Counties</span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {SERVICE_AREAS.map((area) => (
                  <div
                    key={area.name}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                      area.primary
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{area.name}, NC</span>
                    <span className="text-[10px] text-stone-500 font-normal">({area.county})</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-stone-500 pt-2 leading-relaxed">
                Don't see your specific neighborhood listed? If you are located within 25 miles of Kannapolis, NC, we are happy to visit your property for an estimate. Give us a call at <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-emerald-700 font-bold underline">{BUSINESS_INFO.phone}</a>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
