import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Phone, Mail, CheckCircle2, AlertCircle, Navigation, Shield } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../data/content';

export const BusinessHoursAndArea: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [zipStatus, setZipStatus] = useState<'idle' | 'serviced' | 'outer' | 'unserviced'>('idle');

  // Calculate if currently open based on America/New_York (Charlotte, NC) time
  const isOpenNow = useMemo(() => {
    try {
      const now = new Date();
      // Get current hour and day in Charlotte time zone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        hour12: false,
        weekday: 'short',
      });
      const parts = formatter.formatToParts(now);
      const day = parts.find((p) => p.type === 'weekday')?.value;
      const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);

      if (day === 'Sun') return false;
      return hour >= 7 && hour < 19;
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
    } else if (cleanZip.startsWith('282') || cleanZip.startsWith('280') || cleanZip.startsWith('281')) {
      // Surrounding Mecklenburg / Cabarrus area
      setZipStatus('outer');
    } else {
      setZipStatus('unserviced');
    }
  };

  return (
    <section id="service-area" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-[#65A30D] tracking-wider uppercase mb-2">
            Local Charlotte Operation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#451A03] tracking-tight mb-4 font-heading">
            Hours of Operation & Service Radius
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            Proudly rooted in Charlotte, NC (28273). We deliver fast response times, on-schedule arrivals,
            and dedicated landscaping crews across Mecklenburg and adjacent counties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Business Hours & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hours Card */}
            <div className="bg-[#FAFAFA] rounded-sm p-6 sm:p-7 border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-sm bg-[#451A03] text-white flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#65A30D]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#451A03] font-heading">
                      Operating Hours
                    </h3>
                    <span className="text-xs text-[#333333]/70">Eastern Standard Time</span>
                  </div>
                </div>

                {/* Live Status Badge */}
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOpenNow ? 'bg-lime-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className={isOpenNow ? 'text-lime-700' : 'text-amber-800'}>
                    {isOpenNow ? 'Open Now' : 'Closed Now'}
                  </span>
                </div>
              </div>

              {/* Hours List */}
              <div className="space-y-3 text-sm border-t border-gray-200/60 pt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-[#333333]">Monday – Sunday</span>
                  <span className="font-bold text-[#451A03]">7:00 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-[#333333]/80">
                <span>Direct Dispatch:</span>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="font-bold text-[#451A03] hover:underline"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#FAFAFA] rounded-sm p-6 sm:p-7 border border-gray-100 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-[#451A03] font-heading">
                Direct Contact & Headquarters
              </h3>

              <div className="space-y-3 text-sm text-[#333333]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#451A03]">Charlotte, North Carolina</div>
                    <div className="text-xs text-[#333333]/80">Primary Service Hub: Zip Code 28273</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#451A03]">{BUSINESS_INFO.phone}</div>
                    <div className="text-xs text-[#333333]/80">Call or Text for Estimates & Inquiries</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#451A03]">{BUSINESS_INFO.email}</div>
                    <div className="text-xs text-[#333333]/80">Written inquiries & project specs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Zip Code Checker */}
            <div className="bg-[#F7FEE7] rounded-sm p-6 border border-[#65A30D]/30">
              <h4 className="font-bold text-sm text-[#451A03] font-heading mb-1 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#65A30D]" />
                Check Your Charlotte Zip Code
              </h4>
              <p className="text-xs text-[#333333] mb-3">
                Verify immediate route availability for sod delivery and lawn maintenance crews.
              </p>

              <form onSubmit={handleCheckZip} className="flex gap-2">
                <input
                  type="text"
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value);
                    setZipStatus('idle');
                  }}
                  placeholder="e.g. 28273"
                  maxLength={5}
                  className="w-full px-3 py-2 text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#451A03]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#451A03] text-white text-xs font-bold rounded-sm hover:bg-[#78350F] transition-colors shrink-0 cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {/* Status responses */}
              {zipStatus === 'serviced' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-lime-900 bg-white/80 p-2.5 rounded-sm border border-lime-300">
                  <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                  <span>
                    Great news! Zip <strong>{zipInput}</strong> is in our primary Charlotte service zone. We can schedule an on-site estimate within 24 hours.
                  </span>
                </div>
              )}

              {zipStatus === 'outer' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-lime-900 bg-white/80 p-2.5 rounded-sm border border-lime-300">
                  <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                  <span>
                    Yes! We service <strong>{zipInput}</strong> for sod installation, mulch overhauls, and property cleanups.
                  </span>
                </div>
              )}

              {zipStatus === 'unserviced' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-amber-900 bg-white/80 p-2.5 rounded-sm border border-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Zip {zipInput} is outside our typical route, but we take select large sod and overhaul projects. Give us a call at (704) 369-4499.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Interactive Service Area Map & Neighborhoods (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFAFA] rounded-sm p-6 sm:p-7 border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#451A03] font-heading">
                    Charlotte Service Area Map
                  </h3>
                  <p className="text-xs text-[#333333]/70">
                    Covering a 25-mile radius with daily dispatch centered in 28273
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#451A03] font-semibold bg-[#F7FEE7] px-3 py-1 rounded-md">
                  <Shield className="w-3.5 h-3.5 text-[#65A30D]" />
                  25-Mile Radius
                </div>
              </div>

              {/* Embedded Google Map Frame showing Charlotte, NC */}
              <div className="relative w-full h-72 sm:h-80 rounded-sm overflow-hidden border border-gray-200 shadow-inner mb-6 bg-stone-50">
                <iframe
                  title="Vasquez Landcare INC Charlotte Service Area Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104273.74314227094!2d-80.8431267!3d35.308253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541c1959732733%3A0xc3f837e8c393bc65!2sCharlotte%2C%20NC%2028273!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.1]"
                />

                {/* Floating Map Label */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-sm shadow-sm border border-gray-200 text-xs font-bold text-[#451A03] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#65A30D]" />
                  Vasquez Landcare INC Hub (28273)
                </div>
              </div>

              {/* Serviced Neighborhoods List */}
              <div>
                <h4 className="text-xs font-bold text-[#333333] uppercase tracking-wider mb-3">
                  Neighborhoods & Communities Frequently Serviced:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#333333]">
                  {SERVICE_AREAS.map((area) => (
                    <div
                      key={area.zip}
                      className="p-2 rounded-sm bg-white border border-gray-200/70 flex items-center justify-between"
                    >
                      <span className="font-medium truncate pr-1">{area.name}</span>
                      <span className="text-[11px] font-bold text-[#451A03] bg-[#F7FEE7] px-1.5 py-0.5 rounded">
                        {area.zip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#333333]/80">
              <span>Do not see your Charlotte neighborhood?</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="font-bold text-[#451A03] hover:underline"
              >
                Call (704) 369-4499 to check route schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
