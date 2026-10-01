import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Phone, Mail, CheckCircle2, AlertCircle, Navigation, Shield, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../data/content';

export const BusinessHoursAndArea: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [zipStatus, setZipStatus] = useState<'idle' | 'serviced' | 'outer' | 'unserviced'>('idle');

  // Calculate if currently open based on Eastern Time (8:00 AM to 6:00 PM, Mon-Sun)
  const isOpenNow = useMemo(() => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(formatter.format(now), 10);
      return hour >= 8 && hour < 18;
    } catch {
      return true;
    }
  }, []);

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    const matchedArea = SERVICE_AREAS.find((area) => area.zip === cleanZip);
    if (matchedArea) {
      setZipStatus('serviced');
    } else if (cleanZip.startsWith('280') || cleanZip.startsWith('281')) {
      // Gaston, Lincoln, or Mecklenburg border
      setZipStatus('outer');
    } else {
      setZipStatus('unserviced');
    }
  };

  return (
    <section id="service-area" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            Local Gastonia, NC Operations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022c22] tracking-tight mb-4 font-heading">
            Hours of Operation & Service Radius
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Headquartered at 940 Etta Pl, Gastonia, NC 28054. We provide fast response times, dependable weekly schedules, 
            and dedicated lawn crews across Gastonia, Belmont, and surrounding Gaston County communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Business Hours & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hours Card */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-7 border border-emerald-900/10 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#064e3b] text-amber-400 flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#022c22] font-heading">
                      Operating Hours
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Eastern Standard Time</span>
                  </div>
                </div>

                {/* Live Status Badge */}
                <div className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className={isOpenNow ? 'text-emerald-800' : 'text-amber-800'}>
                    {isOpenNow ? 'Open Now' : 'Closed Now'}
                  </span>
                </div>
              </div>

              {/* Hours List */}
              <div className="space-y-3 text-sm border-t border-slate-200/80 pt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-[#022c22]">Monday – Friday</span>
                  <span className="font-extrabold text-emerald-900">8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-[#022c22]">Saturday</span>
                  <span className="font-extrabold text-emerald-900">8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-[#022c22]">Sunday</span>
                  <span className="font-extrabold text-emerald-900">8:00 AM – 6:00 PM</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <span>Immediate Dispatch:</span>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="font-black text-[#064e3b] hover:text-amber-600 text-sm"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-7 border border-emerald-900/10 shadow-sm space-y-4">
              <h3 className="font-extrabold text-lg text-[#022c22] font-heading">
                Direct Contact & Headquarters
              </h3>

              <div className="space-y-3.5 text-sm text-[#022c22]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#022c22]">940 Etta Pl, Gastonia, NC 28054</div>
                    <div className="text-xs text-slate-500 font-medium">Primary Gaston County Dispatch Hub</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#022c22]">{BUSINESS_INFO.phone}</div>
                    <div className="text-xs text-slate-500 font-medium">Call or Text for Free Grass Cutting Estimates</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#022c22]">{BUSINESS_INFO.email}</div>
                    <div className="text-xs text-slate-500 font-medium">Online inquiries & service questions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Zip Code Checker */}
            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200">
              <h4 className="font-extrabold text-sm text-[#022c22] font-heading mb-1 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-emerald-700" />
                Check Your Gaston County Zip Code
              </h4>
              <p className="text-xs text-slate-600 mb-3">
                Verify immediate route availability for weekly mowing and cleanups.
              </p>

              <form onSubmit={handleCheckZip} className="flex gap-2">
                <input
                  type="text"
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value);
                    setZipStatus('idle');
                  }}
                  placeholder="e.g. 28054"
                  maxLength={5}
                  className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-[#064e3b] font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#064e3b] hover:bg-[#022c22] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {/* Status responses */}
              {zipStatus === 'serviced' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-emerald-950 bg-white p-3 rounded-xl border border-emerald-300 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Great news! Zip <strong>{zipInput}</strong> is in our core Gastonia service loop. We can quote and schedule your lawn care this week!
                  </span>
                </div>
              )}

              {zipStatus === 'outer' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-emerald-950 bg-white p-3 rounded-xl border border-emerald-300 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Yes! We service <strong>{zipInput}</strong> for mowing, hedge trimming, and seasonal cleanups.
                  </span>
                </div>
              )}

              {zipStatus === 'unserviced' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-amber-950 bg-white p-3 rounded-xl border border-amber-300 shadow-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Zip {zipInput} is outside our daily loop, but we frequently accommodate larger yard cleanups. Give us a call at (716) 462-3657.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Interactive Service Area Map & Neighborhoods (7 cols) */}
          <div className="lg:col-span-7 bg-[#f8fafc] rounded-3xl p-6 sm:p-7 border border-emerald-900/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-[#022c22] font-heading">
                    Gastonia & Gaston County Service Map
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    20-mile radius with daily dispatch centered at 940 Etta Pl, Gastonia, NC 28054
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-900 font-bold bg-amber-400 px-3 py-1 rounded-md shadow-xs">
                  <Shield className="w-3.5 h-3.5 text-slate-950" />
                  20-Mile Radius
                </div>
              </div>

              {/* Embedded Google Map Frame showing 940 Etta Pl, Gastonia, NC */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-emerald-900/20 shadow-inner mb-6 bg-emerald-50">
                <iframe
                  title="G & T Lawn Care Gastonia Service Area Map"
                  src="https://maps.google.com/maps?q=940%20Etta%20Pl,%20Gastonia,%20NC%2028054&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.15]"
                />

                {/* Floating Map Label with direct link */}
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-xl shadow-md border border-emerald-300 text-xs font-bold text-[#022c22] flex items-center gap-1.5 hover:bg-emerald-50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>G & T Lawn Care (940 Etta Pl)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Serviced Neighborhoods List */}
              <div>
                <h4 className="text-xs font-bold text-[#022c22] uppercase tracking-wider mb-3">
                  Neighborhoods & Communities Frequently Serviced:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                  {SERVICE_AREAS.map((area) => (
                    <div
                      key={area.zip}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs"
                    >
                      <span className="font-semibold truncate pr-1">{area.name}</span>
                      <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        {area.zip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span>Do not see your neighborhood listed?</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="font-bold text-[#064e3b] hover:text-amber-600 transition-colors"
              >
                Call (716) 462-3657 to confirm route schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
