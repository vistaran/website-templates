import React, { useState } from 'react';
import { businessDetails, serviceNeighborhoods } from '../data/content';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck, CheckCircle2, Copy, Check, ReceiptText, CalendarCheck, FileText } from 'lucide-react';

export const BusinessHoursAndArea: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(businessDetails.address.full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="hours-area" className="py-20 bg-[#faf8f5] text-[#1a241e] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
            Local Charlotte Roots Since 1988
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1">
            Service Area, Location & Business Hours
          </h2>
          <p className="text-base text-neutral-600 mt-2 leading-relaxed">
            Headquartered on Delsing Court in Northwest Charlotte, our crews service residential neighborhoods, private estates, and commercial grounds throughout Mecklenburg and surrounding Carolina communities.
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Map Location Card & Google Maps Embed/Link (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            
            {/* Business Card Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-[#0c2317]">
                    {businessDetails.name}
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                    36 Yrs In Business
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  Google Maps Business Listing · Charlotte, North Carolina
                </div>
              </div>

              <a
                href={businessDetails.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c2317] text-white text-xs font-bold hover:bg-[#184632] transition-colors shadow-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>

            {/* Address & Phone Direct Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-neutral-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Physical Address</span>
                </div>
                <div className="font-bold text-sm text-[#0c2317]">{businessDetails.address.street}</div>
                <div className="text-xs text-neutral-600">{businessDetails.address.city}, {businessDetails.address.state} {businessDetails.address.zip}</div>
                
                <button
                  onClick={handleCopyAddress}
                  className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0c2317] hover:text-emerald-700 transition-colors"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Copied to Clipboard' : 'Copy Full Address'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-neutral-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Direct Phone Line</span>
                </div>
                <div className="font-bold text-base text-[#0c2317]">{businessDetails.phone}</div>
                <div className="text-xs text-neutral-600">Call for immediate scheduling or emergency services</div>
                
                <a
                  href={`tel:${businessDetails.phoneRaw}`}
                  className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-600"
                >
                  <span>Tap to Call Crew Dispatch</span>
                </a>
              </div>
            </div>

            {/* Visual Simulated Map Display of Charlotte 28214 */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-neutral-200 bg-[#e8ece9] flex items-center justify-center">
              {/* Map Graphic overlay */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(#153c29 1px, transparent 1px), radial-gradient(#153c29 1px, #e8ece9 1px)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px'
                }}
              />

              {/* Highway / Street graphic representation */}
              <svg className="absolute inset-0 w-full h-full text-neutral-300" viewBox="0 0 600 300" preserveAspectRatio="none">
                <path d="M 0,150 Q 200,80 400,160 T 600,120" stroke="#cbd5e1" strokeWidth="12" fill="none" />
                <path d="M 150,0 Q 200,150 250,300" stroke="#cbd5e1" strokeWidth="8" fill="none" />
                <path d="M 350,0 Q 320,150 390,300" stroke="#cbd5e1" strokeWidth="8" fill="none" />
                <circle cx="280" cy="140" r="80" fill="#22c55e" fillOpacity="0.08" />
              </svg>

              {/* Pin indicator for 10915 Delsing Ct */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-[#0c2317] text-white px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1.5 border border-amber-400/40">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>10915 Delsing Ct, Charlotte, NC</span>
                </div>
                <div className="w-1 h-4 bg-[#0c2317]" />
                <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-white shadow-md" />
              </div>

              {/* Interactive map button link */}
              <a
                href={businessDetails.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#0c2317] font-bold text-xs px-3.5 py-2 rounded-lg shadow-md border border-neutral-200 hover:bg-white flex items-center gap-1.5"
              >
                <span>View Live Google Map</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-800" />
              </a>
            </div>

            {/* Verified Charlotte Service Neighborhoods */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Key Neighborhoods & Communities Served Daily
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {serviceNeighborhoods.map((area, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-neutral-50 border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900 truncate">{area.name}</div>
                    <div className="text-[10px] text-neutral-500">{area.zipCode} · {area.region}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Business Hours & Billing Transparency (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Operating Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-display text-xl font-bold text-[#0c2317]">
                    Operating Hours
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Open Today
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {businessDetails.hours.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-neutral-100 last:border-0">
                    <span className="font-semibold text-neutral-800">{h.days}</span>
                    <span className="text-neutral-600 font-medium tabular-nums">{h.time}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
                *Crews depart the Charlotte facility at 7:00 AM to take advantage of cool morning hours. Weather delays are communicated directly via text or email.
              </p>
            </div>

            {/* Billing Options & Contract Flexibility Card (High priority from map info!) */}
            <div className="bg-[#0c2317] text-white rounded-3xl p-6 sm:p-7 border border-[#1b442e] shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <ReceiptText className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-xl font-bold">
                  Transparent Billing & Contracts
                </h3>
              </div>

              <p className="text-xs text-[#b8c9bf] leading-relaxed">
                As detailed in our official Charlotte business information, we offer complete invoicing clarity to match your accounting needs:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">QuickBooks Online Invoicing</span>
                    <p className="text-neutral-400 text-[11px]">Instant electronic statements, one-click card payments & auto-pay receipts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CalendarCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Flexible Monthly Billing</span>
                    <p className="text-neutral-400 text-[11px]">Itemized monthly statements with transparent visit logs for residential clients.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Locked Yearly Service Contracts</span>
                    <p className="text-neutral-400 text-[11px]">Guaranteed rate protection, priority storm routing & all-inclusive 12-month grounds care.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${businessDetails.phoneRaw}`}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0c2317] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us: {businessDetails.phone}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
