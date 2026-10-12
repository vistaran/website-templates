import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Phone, User, Mail, 
  CheckCircle2, AlertCircle, MessageSquare, Download, ArrowRight, X, ChevronRight, History
} from 'lucide-react';
import { STUDIO_DETAILS } from '../data/portfolioData';
import { ConsultationBooking as BookingType, ConsultationMode } from '../types';

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectTitle?: string;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  isOpen,
  onClose,
  initialProjectTitle
}) => {
  const [step, setStep] = useState<number>(1);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [savedBookings, setSavedBookings] = useState<BookingType[]>([]);

  // Form State
  const [serviceType, setServiceType] = useState<string>('Turnkey Residential Interior');
  const [propertyType, setPropertyType] = useState<string>('3BHK Apartment');
  const [carpetArea, setCarpetArea] = useState<number>(1850);
  const [budgetBracket, setBudgetBracket] = useState<string>('₹15L – ₹30L');
  const [consultationMode, setConsultationMode] = useState<ConsultationMode>('studio-visit');
  
  // Dynamic next 12 days for date picker
  const availableDates = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      display: d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      isSunday: d.getDay() === 0
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');

  // Contact Info
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [propertyAddress, setPropertyAddress] = useState<string>('');
  const [projectNotes, setProjectNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingType | null>(null);

  // Load saved bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mcd_consultations');
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, []);

  // Pre-populate if initial title passed
  useEffect(() => {
    if (initialProjectTitle) {
      setProjectNotes(`Interested in spatial style similar to: ${initialProjectTitle}`);
      if (initialProjectTitle.toLowerCase().includes('penthouse') || initialProjectTitle.toLowerCase().includes('residence')) {
        setServiceType('Turnkey Residential Interior');
        setPropertyType('Luxury Penthouse / Villa');
      } else if (initialProjectTitle.toLowerCase().includes('corporate') || initialProjectTitle.toLowerCase().includes('hq')) {
        setServiceType('Commercial Workspace & Office');
        setPropertyType('Corporate Office Floor');
      }
    }
  }, [initialProjectTitle]);

  if (!isOpen) return null;

  const timeSlots = [
    '10:30 AM',
    '12:00 PM',
    '02:30 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  const handleValidateAndNext = () => {
    setFormError('');
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Validation for contact info
      if (!fullName.trim()) {
        setFormError('Please enter your full name.');
        return;
      }
      if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
        setFormError('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (!propertyAddress.trim()) {
        setFormError('Please enter your property society name or locality in Ahmedabad.');
        return;
      }

      // Create booking object
      const newBooking: BookingType = {
        id: `MCD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: fullName.trim(),
        phone: phoneNumber.trim(),
        email: email.trim(),
        serviceType,
        propertyType,
        carpetAreaSqFt: carpetArea,
        budgetBracket,
        consultationMode,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        address: propertyAddress.trim(),
        notes: projectNotes.trim(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const updated = [newBooking, ...savedBookings];
      setSavedBookings(updated);
      try {
        localStorage.setItem('mcd_consultations', JSON.stringify(updated));
      } catch {
        // storage fallback
      }

      setConfirmedBooking(newBooking);
      setStep(4);
    }
  };

  const generateIcsCalendar = (booking: BookingType) => {
    const title = `Mecha Civil Designs Consultation (${booking.id})`;
    const description = `Consultation for ${booking.propertyType} (${booking.carpetAreaSqFt} sq.ft) with Mecha Civil Designs Ahmedabad. Phone: ${STUDIO_DETAILS.phone}`;
    const location =
      booking.consultationMode === 'studio-visit'
        ? '231, 2nd Floor, Orange Mall, Chandkheda, Ahmedabad'
        : booking.address;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mecha Civil Designs//Ahmedabad//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${booking.preferredDate.replace(/-/g, '')}T110000Z
DTEND:${booking.preferredDate.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Mecha_Civil_Designs_${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppShareLink = (booking: BookingType) => {
    const lines = [
      'Hello Mecha Civil Designs — I would like to request an interior consultation.',
      '',
      `Ref: ${booking.id}`,
      `Name: ${booking.clientName}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      `Service: ${booking.serviceType}`,
      `Property: ${booking.propertyType} - ${booking.carpetAreaSqFt} sq.ft`,
      `Budget: ${booking.budgetBracket}`,
      `Consultation mode: ${booking.consultationMode}`,
      `Preferred slot: ${booking.preferredDate} at ${booking.preferredTime}`,
      `Address: ${booking.address}`,
      `Notes: ${booking.notes && booking.notes.trim() ? booking.notes : '-'}`
    ];
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/919725935504?text=${text}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#DED6C9] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-[#24201D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E7E0D5] bg-[#FFFFFF]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded border border-[#C5B8A5] bg-[#F5EFE6] flex items-center justify-center text-[#78562E] font-serif text-base font-medium">
              M
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1C1917] tracking-tight">
                {confirmedBooking ? 'Request Ready to Send' : 'Atelier Consultation Concierge'}
              </h3>
              <p className="text-xs text-[#736A5E] font-light">
                Mecha Civil Designs Studio · Chandkheda, Ahmedabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedBookings.length > 0 && !confirmedBooking && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  showHistory
                    ? 'bg-[#24201D] text-[#FAF8F5]'
                    : 'text-[#59524A] hover:text-[#1C1917] bg-[#F5EFE6] border border-[#DED6C9]'
                }`}
                title="View previous consultations"
              >
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Bookings ({savedBookings.length})</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#736A5E] hover:text-[#1C1917] hover:bg-[#F5EFE6] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Indicator */}
        {!confirmedBooking && !showHistory && (
          <div className="px-6 sm:px-8 py-3 bg-[#F5EFE6] border-b border-[#E7E0D5] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] ${step >= 1 ? 'bg-[#24201D] text-[#FAF8F5]' : 'bg-[#E7E0D5] text-[#736A5E]'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-[#1C1917] font-medium' : 'text-[#736A5E]'}>Scope</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5B8A5]" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] ${step >= 2 ? 'bg-[#24201D] text-[#FAF8F5]' : 'bg-[#E7E0D5] text-[#736A5E]'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-[#1C1917] font-medium' : 'text-[#736A5E]'}>Schedule & Format</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5B8A5]" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] ${step >= 3 ? 'bg-[#24201D] text-[#FAF8F5]' : 'bg-[#E7E0D5] text-[#736A5E]'}`}>
                3
              </span>
              <span className={step === 3 ? 'text-[#1C1917] font-medium' : 'text-[#736A5E]'}>Your Details</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* View Booking History Tab */}
          {showHistory ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D5]">
                <h4 className="font-serif text-lg text-[#1C1917]">Your Booked Consultations</h4>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-xs text-[#8A6739] hover:underline cursor-pointer"
                >
                  ← Back to New Booking
                </button>
              </div>

              {savedBookings.length === 0 ? (
                <p className="text-xs text-[#736A5E] text-center py-6 font-light">No previous bookings found.</p>
              ) : (
                <div className="space-y-3">
                  {savedBookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E0D5] space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#8A6739] font-semibold">{bk.id}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#78562E] border border-[#DED6C9]">
                          {bk.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-serif text-base font-medium text-[#1C1917]">{bk.propertyType} · {bk.serviceType}</div>
                      <div className="text-xs text-[#59524A] flex items-center gap-2 font-light">
                        <Calendar className="w-3.5 h-3.5 text-[#8A6739]" />
                        <span>{bk.preferredDate} at {bk.preferredTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{bk.consultationMode === 'studio-visit' ? 'Orange Mall Atelier' : 'On-Site Visit'}</span>
                      </div>
                      <div className="text-xs text-[#736A5E]">Client: {bk.clientName} ({bk.phone})</div>
                      <div className="pt-2 flex items-center gap-3">
                        <a
                          href={getWhatsAppShareLink(bk)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#8A6739] hover:underline flex items-center gap-1 font-medium"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Studio</span>
                        </a>
                        <button
                          onClick={() => generateIcsCalendar(bk)}
                          className="text-xs text-[#59524A] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download .ics</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : step === 1 ? (
            /* STEP 1: Project Scope & Space Details */
            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739] mb-2.5">
                  1. Select Interior Design & Civil Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'Turnkey Residential Interior', label: 'Turnkey Residential Interior', desc: 'Bespoke civil restructuring, modular carpentry & styling' },
                    { id: 'Commercial Workspace & Office', label: 'Commercial Workspace & Office', desc: 'Acoustic ceilings, glass partitions, executive suites' },
                    { id: 'Retail Showroom & Boutique', label: 'Retail Showroom & Boutique', desc: 'Jewelry showcases, specialty illumination & display' },
                    { id: 'Civil Retrofit & Structural Remodel', label: 'Civil Retrofit & Restoration', desc: 'Wall knockdowns, lintel beams & waterproofing' },
                    { id: '3D Architectural Planning & CAD', label: '3D CAD & Spatial Blueprinting', desc: 'Photorealistic layout & electrical masterplan' }
                  ].map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setServiceType(srv.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        serviceType === srv.id
                          ? 'border-[#8A6739] bg-[#F5EFE6] text-[#1C1917]'
                          : 'border-[#E7E0D5] bg-[#FFFFFF] text-[#59524A] hover:border-[#DED6C9]'
                      }`}
                    >
                      <div className="text-xs font-semibold">{srv.label}</div>
                      <div className="text-[11px] text-[#736A5E] mt-0.5 font-light leading-snug">{srv.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Configuration */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739] mb-2.5">
                  2. Property Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    '2BHK Apartment',
                    '3BHK Apartment',
                    '4BHK Apartment',
                    'Duplex / Penthouse',
                    'Independent Villa',
                    'Corporate Office'
                  ].map((prop) => (
                    <button
                      key={prop}
                      type="button"
                      onClick={() => setPropertyType(prop)}
                      className={`px-3 py-2 text-xs rounded-xl border text-left cursor-pointer transition-all ${
                        propertyType === prop
                          ? 'border-[#24201D] bg-[#24201D] text-[#FAF8F5] font-medium shadow-xs'
                          : 'border-[#E7E0D5] bg-[#FFFFFF] text-[#59524A] hover:border-[#DED6C9]'
                      }`}
                    >
                      {prop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carpet Area Slider */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#736A5E] font-light">Carpet Area:</span>
                  <span className="font-serif text-lg font-medium text-[#8A6739] tabular-nums">
                    {carpetArea.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="12000"
                  step="50"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(Number(e.target.value))}
                  className="w-full accent-[#8A6739] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A3998C] mt-1 font-mono">
                  <span>500 sq.ft</span>
                  <span>3,000 sq.ft</span>
                  <span>6,000 sq.ft</span>
                  <span>12,000+ sq.ft</span>
                </div>
              </div>

              {/* Target Budget Bracket */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739] mb-2.5">
                  Target Estimated Budget Bracket
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['₹8L – ₹15L', '₹15L – ₹30L', '₹30L – ₹60L', '₹60L+ Bespoke'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudgetBracket(b)}
                      className={`px-3 py-2 text-xs rounded-xl border text-center cursor-pointer transition-all ${
                        budgetBracket === b
                          ? 'border-[#8A6739] bg-[#F5EFE6] text-[#1C1917] font-semibold'
                          : 'border-[#E7E0D5] bg-[#FFFFFF] text-[#59524A] hover:border-[#DED6C9]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: Consultation Format & Appointment Slot */
            <div className="space-y-6">
              {/* Consultation Format */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739] mb-2.5">
                  1. Choose Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'studio-visit' as ConsultationMode,
                      title: 'Orange Mall Atelier',
                      desc: 'Visit us at 231 Orange Mall, Chandkheda to explore physical stone, wood & metal samples',
                      badge: 'Recommended'
                    },
                    {
                      id: 'site-visit' as ConsultationMode,
                      title: 'On-Site Property Visit',
                      desc: 'Our lead civil engineer inspects your site in Ahmedabad / Gandhinagar directly',
                      badge: 'On-Site Measure'
                    },
                    {
                      id: 'virtual-meet' as ConsultationMode,
                      title: 'Virtual Video Meeting',
                      desc: 'Convenient 45-min Google Meet session to review digital layouts & budget estimates',
                      badge: 'Online Video'
                    }
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setConsultationMode(mode.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        consultationMode === mode.id
                          ? 'border-[#8A6739] bg-[#F5EFE6] text-[#1C1917]'
                          : 'border-[#E7E0D5] bg-[#FFFFFF] text-[#59524A] hover:border-[#DED6C9]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#1C1917] mb-1">{mode.title}</div>
                        <p className="text-[11px] text-[#736A5E] leading-relaxed font-light">{mode.desc}</p>
                      </div>
                      <div className="mt-3 text-[10px] font-mono text-[#8A6739] font-medium">
                        {mode.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739] mb-2.5">
                  2. Select Consultation Date (Chandkheda Studio)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableDates.map((item) => (
                    <button
                      key={item.iso}
                      type="button"
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === item.iso
                          ? 'border-[#24201D] bg-[#24201D] text-[#FAF8F5] font-medium shadow-xs'
                          : 'border-[#E7E0D5] bg-[#FFFFFF] text-[#59524A] hover:border-[#DED6C9]'
                      }`}
                    >
                      <div className="text-xs font-medium">{item.display}</div>
                      {item.isSunday && (
                        <div className="text-[9px] font-mono text-[#8A6739]">By Appt</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739] mb-2.5">
                  3. Select Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-3 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                        selectedTime === slot
                          ? 'border-[#8A6739] bg-[#F5EFE6] text-[#1C1917] font-bold'
                          : 'border-[#E7E0D5] bg-[#FFFFFF] text-[#736A5E] hover:border-[#DED6C9]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : step === 3 ? (
            /* STEP 3: Client Contact Details */
            <div className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3D3732] mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A3998C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-[#FFFFFF] border border-[#DED6C9] rounded-xl pl-10 pr-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#8A6739]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3D3732] mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A3998C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 98250 12345"
                      className="w-full bg-[#FFFFFF] border border-[#DED6C9] rounded-xl pl-10 pr-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#8A6739]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3732] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A3998C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh.patel@gmail.com"
                    className="w-full bg-[#FFFFFF] border border-[#DED6C9] rounded-xl pl-10 pr-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#8A6739]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3732] mb-1">
                  Property Location / Society Name in Ahmedabad *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#A3998C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    placeholder="e.g. Centrum by Sampad Motera, Adani Shantigram, or Chandkheda"
                    className="w-full bg-[#FFFFFF] border border-[#DED6C9] rounded-xl pl-10 pr-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#8A6739]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3732] mb-1">
                  Project Notes & Aesthetic Vision (Optional)
                </label>
                <textarea
                  rows={2}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Tell us about specific needs: Italian marble, duplex staircase, timeline expectations, etc."
                  className="w-full bg-[#FFFFFF] border border-[#DED6C9] rounded-xl p-3 text-xs text-[#1C1917] focus:outline-none focus:border-[#8A6739] resize-none"
                />
              </div>

              {/* Consultation Summary strip */}
              <div className="p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5] text-xs text-[#59524A] space-y-1">
                <div className="font-medium text-[#1C1917]">Consultation Summary:</div>
                <div className="text-[#736A5E] flex flex-wrap gap-2 font-light">
                  <span>{serviceType}</span>
                  <span>·</span>
                  <span>{propertyType} ({carpetArea} sq.ft)</span>
                  <span>·</span>
                  <span>{selectedDate} @ {selectedTime}</span>
                </div>
              </div>
            </div>
          ) : confirmedBooking ? (
            /* STEP 4: Confirmed State */
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-[#F5EFE6] border border-[#C5B8A5] flex items-center justify-center mx-auto text-[#8A6739]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
                  Final Step - Send Your Request
                </span>
                <h4 className="font-serif text-3xl font-light text-[#1C1917] tracking-tight mt-1">
                  Thank You, {confirmedBooking.clientName}
                </h4>
                <p className="text-xs text-[#59524A] mt-1 max-w-md mx-auto font-light leading-relaxed">
                  Your consultation details are ready. Tap{' '}
                  <span className="text-[#8A6739] font-medium">Send Request via WhatsApp</span> below to
                  deliver them to our studio — we confirm every slot within one working day.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D5]">
                  <span className="text-xs text-[#736A5E]">Booking Reference</span>
                  <span className="text-xs font-mono text-[#8A6739] font-bold">{confirmedBooking.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-[#8C8275]">Service:</span>
                    <div className="text-[#1C1917] font-medium">{confirmedBooking.serviceType}</div>
                  </div>
                  <div>
                    <span className="text-[#8C8275]">Date & Slot:</span>
                    <div className="text-[#1C1917] font-medium">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</div>
                  </div>
                  <div>
                    <span className="text-[#8C8275]">Location:</span>
                    <div className="text-[#1C1917] font-medium">
                      {confirmedBooking.consultationMode === 'studio-visit'
                        ? 'Orange Mall Atelier, Chandkheda'
                        : confirmedBooking.address}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#8C8275]">Carpet Area:</span>
                    <div className="text-[#1C1917] font-medium font-mono">{confirmedBooking.carpetAreaSqFt} sq.ft</div>
                  </div>
                </div>
              </div>

              {/* Immediate Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getWhatsAppShareLink(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#24201D] hover:bg-[#3D3732] text-[#FAF8F5] text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#CBB38D]" />
                  <span>Send Request via WhatsApp</span>
                </a>

                <button
                  onClick={() => generateIcsCalendar(confirmedBooking)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F5EFE6] border border-[#DED6C9] text-[#24201D] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#8A6739]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={STUDIO_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#DED6C9] hover:border-[#8A6739] text-[#59524A] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#8A6739]" />
                  <span>Driving Directions</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal Action Footer */}
        {!confirmedBooking && !showHistory && (
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-[#E7E0D5] bg-[#FFFFFF]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium text-[#736A5E] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <div className="text-xs text-[#8C8275] font-mono">
                Studio Phone: +91 97259 35504
              </div>
            )}

            <button
              type="button"
              onClick={handleValidateAndNext}
              className="px-6 py-2.5 text-xs sm:text-[13px] font-medium tracking-wide text-[#FAF8F5] bg-[#24201D] hover:bg-[#3D3732] rounded-full transition-all cursor-pointer shadow-md shadow-[#24201D]/10 flex items-center gap-2"
            >
              <span>{step === 3 ? 'Review Request' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 text-[#CBB38D]" />
            </button>
          </div>
        )}

        {confirmedBooking && (
          <div className="flex items-center justify-center px-6 py-3 border-t border-[#E7E0D5] bg-[#FFFFFF]">
            <button
              onClick={onClose}
              className="px-6 py-2 text-xs font-medium text-[#59524A] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
