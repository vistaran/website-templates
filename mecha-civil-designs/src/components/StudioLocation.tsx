import React from 'react';
import { 
  MapPin, Phone, Mail, Clock, ExternalLink, Navigation, 
  CheckCircle
} from 'lucide-react';
import { STUDIO_DETAILS } from '../data/portfolioData';

interface StudioLocationProps {
  onOpenBooking: () => void;
}

export const StudioLocation: React.FC<StudioLocationProps> = ({ onOpenBooking }) => {
  return (
    <section id="studio-location" className="py-20 lg:py-28 border-b border-[#E7E0D5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-2">
            Physical Experience Atelier · Ahmedabad
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
            Orange Mall Atelier & Design Studio
          </h2>
          <p className="text-sm sm:text-base text-[#59524A] mt-2 font-light leading-relaxed">
            Conveniently situated in North Ahmedabad, our studio is appointed with physical stone libraries, veneer sample bars, CAD workstations, and private consultation suites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Studio Details Card */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8A6739] mb-3">
                <MapPin className="w-4 h-4" />
                <span>Atelier Location & Office</span>
              </div>

              <h3 className="font-serif text-2xl font-light text-[#1C1917] mb-2">
                {STUDIO_DETAILS.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#59524A] leading-relaxed font-light">
                {STUDIO_DETAILS.address.line1}, {STUDIO_DETAILS.address.landmark}, {STUDIO_DETAILS.address.city} - {STUDIO_DETAILS.address.pincode}, {STUDIO_DETAILS.address.state}, India.
              </p>
            </div>

            {/* Quick Contact & Hours List */}
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
                <Clock className="w-4 h-4 text-[#8A6739] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#1C1917] font-medium">Studio Working Hours</div>
                  <div className="text-[#59524A] mt-0.5">{STUDIO_DETAILS.workingHours.weekdays}</div>
                  <div className="text-[#8C8275] text-[11px]">{STUDIO_DETAILS.workingHours.sunday}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
                <Phone className="w-4 h-4 text-[#8A6739] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#1C1917] font-medium">Direct Telephone & WhatsApp</div>
                  <a
                    href={`tel:${STUDIO_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="text-[#8A6739] hover:underline font-mono text-xs block mt-0.5"
                  >
                    {STUDIO_DETAILS.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5]">
                <Mail className="w-4 h-4 text-[#8A6739] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#1C1917] font-medium">Inquiries & Blueprint Submissions</div>
                  <a
                    href={`mailto:${STUDIO_DETAILS.email}`}
                    className="text-[#59524A] hover:text-[#1C1917] font-mono text-xs block mt-0.5"
                  >
                    {STUDIO_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Amenities */}
            <div className="pt-2 border-t border-[#EFEAE2]">
              <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#8C8275] mb-2.5">
                Visitor Experience Amenities
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#59524A]">
                <div className="flex items-center gap-1.5 font-light">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8A6739]" />
                  <span>Reserved Mall Parking</span>
                </div>
                <div className="flex items-center gap-1.5 font-light">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8A6739]" />
                  <span>Physical Sample Bar</span>
                </div>
                <div className="flex items-center gap-1.5 font-light">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8A6739]" />
                  <span>3D CAD Projection</span>
                </div>
                <div className="flex items-center gap-1.5 font-light">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8A6739]" />
                  <span>Elevator & Private Lounge</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={STUDIO_DETAILS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-[#24201D] hover:bg-[#3D3732] text-[#FAF8F5] text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-[#CBB38D]" />
                <span>Open in Google Maps</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="py-3 px-5 rounded-full bg-[#FAF8F5] hover:bg-[#F5EFE6] border border-[#DED6C9] text-[#3D3732] text-xs font-medium transition-colors cursor-pointer"
              >
                <span>Reserve Appointment</span>
              </button>
            </div>
          </div>

          {/* Warm Architectural Map Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#F5EFE6] border border-[#DED6C9] overflow-hidden relative flex flex-col justify-between min-h-[460px] shadow-xs">
            {/* Map Canvas Background Representation */}
            <div className="absolute inset-0 bg-[#F5EFE6]">
              {/* Architectural Grid Lines */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #DED6C9 1px, transparent 1px),
                    linear-gradient(to bottom, #DED6C9 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />
              
              {/* Highway / Road vector lines */}
              <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 800 500">
                <path d="M 0 250 Q 400 240 800 250" stroke="#8A6739" strokeWidth="3" fill="none" />
                <path d="M 400 0 L 400 500" stroke="#C5B8A5" strokeWidth="2" fill="none" />
                <path d="M 200 100 L 600 400" stroke="#D5CABB" strokeWidth="1.5" fill="none" />
                <path d="M 150 450 L 650 50" stroke="#D5CABB" strokeWidth="1.5" fill="none" />
                <circle cx="400" cy="245" r="9" fill="#8A6739" />
                <circle cx="400" cy="245" r="28" fill="none" stroke="#8A6739" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              </svg>
            </div>

            {/* Top Overlay Badge */}
            <div className="relative z-10 p-6 flex items-center justify-between">
              <div className="p-3 rounded-xl bg-[#FFFFFF]/90 border border-[#DED6C9] backdrop-blur-md shadow-xs">
                <div className="text-xs font-mono text-[#8A6739] font-semibold">
                  Chandkheda Studio Pinpoint
                </div>
                <div className="text-[11px] text-[#59524A]">
                  Nr. Sharda Petrol Pump, Orange Mall
                </div>
              </div>

              <a
                href={STUDIO_DETAILS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#24201D] text-[#FAF8F5] hover:bg-[#3D3732] text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#CBB38D]" />
              </a>
            </div>

            {/* Central Pin Callout */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative group cursor-pointer">
                <div className="w-13 h-13 rounded-full bg-[#8A6739] text-[#FAF8F5] flex items-center justify-center shadow-lg shadow-[#8A6739]/30 animate-bounce">
                  <MapPin className="w-7 h-7 fill-[#FAF8F5]" />
                </div>
              </div>

              <div className="mt-3 p-3.5 rounded-xl bg-[#FFFFFF]/95 border border-[#DED6C9] backdrop-blur-md max-w-sm shadow-sm">
                <div className="font-serif text-lg font-medium text-[#1C1917]">Mecha Civil Designs</div>
                <div className="text-xs text-[#59524A] mt-0.5 font-light">231 Orange Mall, 2nd Floor</div>
                <div className="text-[11px] text-[#8A6739] font-mono mt-1">
                  Chandkheda, Ahmedabad, Gujarat 382424
                </div>
              </div>
            </div>

            {/* Bottom Landmark & Travel Time Bar */}
            <div className="relative z-10 p-5 bg-gradient-to-t from-[#F5EFE6] via-[#F5EFE6]/95 to-transparent border-t border-[#DED6C9]">
              <div className="text-xs font-mono text-[#736A5E] mb-2">
                Approximate Transit Times to Our Chandkheda Atelier:
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E0D5] text-center shadow-xs">
                  <div className="text-[#8C8275] text-[10px]">Motera Stadium</div>
                  <div className="font-serif text-base font-medium text-[#1C1917]">5 Mins</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E0D5] text-center shadow-xs">
                  <div className="text-[#8C8275] text-[10px]">SG Highway</div>
                  <div className="font-serif text-base font-medium text-[#1C1917]">12 Mins</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E0D5] text-center shadow-xs">
                  <div className="text-[#8C8275] text-[10px]">Gift City</div>
                  <div className="font-serif text-base font-medium text-[#1C1917]">20 Mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
