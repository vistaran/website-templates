import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Download, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { businessDetails, serviceItems } from '../data/content';

interface BookingCalendarProps {
  initialServiceId?: string;
  onBookingComplete?: (bookingDetails: any) => void;
}

interface TimeSlot {
  time: string;
  period: 'morning' | 'afternoon';
  available: boolean;
  spotsLeft: number;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  initialServiceId,
  onBookingComplete 
}) => {
  // Calendar state: starting with current date or October 2026
  const today = new Date();
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // Default to tomorrow or next business day
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1); // skip Sunday
    return d;
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00 AM');
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || 'free-consultation');
  
  // Client contact state
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    neighborhood: 'Charlotte',
    notes: '',
    servicePlan: 'residential'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    date: string;
    time: string;
    serviceName: string;
    clientName: string;
    address: string;
  } | null>(null);

  // Month navigation
  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  // Generate days for currentMonthDate
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to check if date is Sunday (closed) or past
  const isDateSelectable = (day: number) => {
    const checkDate = new Date(year, month, day);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    // disable past days
    if (checkDate < now) return false;
    // disable Sundays (day 0) as Charlotte facility is closed for crew rest
    if (checkDate.getDay() === 0) return false;
    return true;
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  // Available Time Slots based on day of week
  const isSaturday = selectedDate.getDay() === 6;

  const timeSlots: TimeSlot[] = isSaturday
    ? [
        { time: '08:00 AM', period: 'morning', available: true, spotsLeft: 2 },
        { time: '09:30 AM', period: 'morning', available: true, spotsLeft: 3 },
        { time: '11:00 AM', period: 'morning', available: true, spotsLeft: 1 },
        { time: '01:00 PM', period: 'afternoon', available: true, spotsLeft: 2 },
        { time: '02:30 PM', period: 'afternoon', available: true, spotsLeft: 1 }
      ]
    : [
        { time: '07:30 AM', period: 'morning', available: true, spotsLeft: 2 },
        { time: '08:30 AM', period: 'morning', available: true, spotsLeft: 4 },
        { time: '09:30 AM', period: 'morning', available: true, spotsLeft: 3 },
        { time: '10:30 AM', period: 'morning', available: true, spotsLeft: 2 },
        { time: '11:30 AM', period: 'morning', available: true, spotsLeft: 1 },
        { time: '01:00 PM', period: 'afternoon', available: true, spotsLeft: 3 },
        { time: '02:00 PM', period: 'afternoon', available: true, spotsLeft: 4 },
        { time: '03:30 PM', period: 'afternoon', available: true, spotsLeft: 2 },
        { time: '04:30 PM', period: 'afternoon', available: true, spotsLeft: 2 },
        { time: '05:30 PM', period: 'afternoon', available: true, spotsLeft: 1 }
      ];

  const servicesList = [
    { id: 'free-consultation', name: 'Free On-Site Property Assessment & Quote', duration: '30-45 Mins' },
    { id: 'precision-mowing', name: 'Precision Lawn Maintenance & Striping Walkthrough', duration: '30 Mins' },
    { id: 'designer-landscaping', name: 'Designer Landscaping & Garden Master Plan', duration: '45-60 Mins' },
    { id: 'sod-installation', name: 'Sodding & Clay Soil Prep Laser Survey', duration: '45 Mins' },
    { id: 'aeration-seeding', name: 'Clay Soil Aeration & Overseeding Evaluation', duration: '30 Mins' },
    { id: 'commercial-grounds', name: 'Commercial Grounds & HOA Contract Consultation', duration: '60 Mins' }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceObj = servicesList.find(s => s.id === selectedService) || servicesList[0];
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    setTimeout(() => {
      const booking = {
        bookingId: `CLE-${Math.floor(100000 + Math.random() * 900000)}`,
        date: formattedDate,
        time: selectedTimeSlot,
        serviceName: serviceObj.name,
        clientName: clientData.name,
        address: `${clientData.address}, ${clientData.neighborhood}, NC`
      };

      setConfirmedBooking(booking);
      setIsSubmitting(false);

      if (onBookingComplete) {
        onBookingComplete(booking);
      }
    }, 700);
  };

  // Google Calendar URL Generator
  const generateGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Carolina Lawn Enhancement: ${confirmedBooking.serviceName}`);
    const details = encodeURIComponent(
      `Appointment with Carolina Lawn Enhancement (36+ Years in Charlotte).\nAddress: ${confirmedBooking.address}\nBooking ID: ${confirmedBooking.bookingId}\nHotline: (704) 918-0398\nWebsite: https://maps.app.goo.gl/pHSjQxNF9mUC1ogF6`
    );
    const location = encodeURIComponent(confirmedBooking.address || '10915 Delsing Ct, Charlotte, NC 28214');
    
    // approximate start/end
    const dateStr = selectedDate.toISOString().replace(/-|:|\.\d\d\d/g, '').substring(0, 8);
    const dates = `${dateStr}T130000Z/${dateStr}T140000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // ICS File Generator for Apple/Outlook Calendar
  const downloadIcsFile = () => {
    if (!confirmedBooking) return;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Carolina Lawn Enhancement//Appointment Booking//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.bookingId}@carolinalawnenhancement.com`,
      `SUMMARY:Carolina Lawn Enhancement - ${confirmedBooking.serviceName}`,
      `DESCRIPTION:Appointment confirmation for ${confirmedBooking.clientName}. Call (704) 918-0398 for any updates.`,
      `LOCATION:${confirmedBooking.address}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${confirmedBooking.bookingId}-Carolina-Lawn.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="book-appointment" className="py-20 bg-white text-[#1a241e] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
            Real-Time Charlotte Field Schedule
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1">
            Book an On-Site Property Consultation
          </h2>
          <p className="text-base text-neutral-600 mt-2 leading-relaxed">
            Select your preferred day and arrival window. A seasoned Carolina Lawn Enhancement property specialist will visit your property for exact laser measurements, soil evaluation, and a transparent written estimate.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Card with Calendar Integration */
          <div className="bg-[#0c2317] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-900 max-w-3xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-700/40 text-amber-400 mx-auto flex items-center justify-center border-2 border-amber-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Appointment Confirmed & Dispatched
                </span>
                <h3 className="font-display text-3xl font-bold mt-1">
                  You're on the Charlotte Schedule!
                </h3>
                <p className="text-sm text-neutral-300 mt-1 max-w-md mx-auto">
                  Reference Confirmation: <span className="font-mono text-amber-300 font-bold">{confirmedBooking.bookingId}</span>
                </p>
              </div>

              {/* Appointment summary box */}
              <div className="bg-white/10 rounded-2xl p-5 text-left text-xs space-y-3 max-w-lg mx-auto border border-white/15 my-6">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Scheduled Date:</span>
                  <span className="font-bold text-white text-sm">{confirmedBooking.date}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Arrival Window:</span>
                  <span className="font-bold text-amber-400 text-sm">{confirmedBooking.time}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Service:</span>
                  <span className="font-semibold text-white">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Property Location:</span>
                  <span className="font-semibold text-white">{confirmedBooking.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Billing Support:</span>
                  <span className="font-semibold text-emerald-300">QuickBooks Invoicing / Monthly / Contract</span>
                </div>
              </div>

              {/* Action Buttons to Add to Google Calendar & ICS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0c2317] font-bold text-xs transition-colors shadow-md"
                >
                  <CalendarIcon className="w-4 h-4 text-[#0c2317]" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download .ICS File (Apple / Outlook)</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 max-w-lg mx-auto">
                <span>Need to adjust your time?</span>
                <a
                  href={`tel:${businessDetails.phoneRaw}`}
                  className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-1 sm:mt-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call (704) 918-0398</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Schedule Another Appointment
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Multi-Pane Calendar Booking Engine */
          <div className="bg-[#faf8f5] rounded-3xl border border-neutral-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Pane 1: Month & Date Picker (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-white">
              
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0c2317]">
                    1. Select Date
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Mon–Fri (7am–6:30pm) · Sat (8am–3:30pm)
                  </p>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
                    aria-label="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-[#0c2317] min-w-28 text-center">
                    {monthNames[month]} {year}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
                    aria-label="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-neutral-400 mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Calendar Grid Days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Blank spaces before day 1 */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10" />
                ))}

                {/* Actual Month Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const selectable = isDateSelectable(day);
                  const active = isSelected(day);

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      disabled={!selectable}
                      onClick={() => {
                        setSelectedDate(new Date(year, month, day));
                      }}
                      className={`h-10 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                        active
                          ? 'bg-[#0c2317] text-amber-400 shadow-md ring-2 ring-[#0c2317]/20 scale-105'
                          : selectable
                          ? 'hover:bg-emerald-50 text-neutral-800 hover:text-emerald-900 cursor-pointer'
                          : 'text-neutral-300 cursor-not-allowed bg-neutral-50/50'
                      }`}
                    >
                      <span>{day}</span>
                      {selectable && !active && (
                        <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Calendar Legend */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-4 mt-4 border-t border-neutral-100">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Available Day</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-300" />
                  <span>Closed (Sun / Past)</span>
                </span>
              </div>

              {/* Selected Date Notice */}
              <div className="mt-5 p-3 rounded-xl bg-[#faf8f5] border border-neutral-200/80 flex items-center gap-2.5 text-xs text-[#0c2317]">
                <CalendarIcon className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>
                  Selected: <strong className="font-bold">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                </span>
              </div>

            </div>

            {/* Pane 2: Time Slots & Service Selection (3 cols) */}
            <div className="lg:col-span-3 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-[#fbf9f6]">
              
              <div className="mb-4">
                <h3 className="font-display text-xl font-bold text-[#0c2317]">
                  2. Arrival Window
                </h3>
                <p className="text-xs text-neutral-500">
                  {isSaturday ? 'Saturday Morning Schedule' : 'Weekday Morning & Afternoon'}
                </p>
              </div>

              {/* Time Slots List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {timeSlots.map((slot, sIdx) => {
                  const isSlotActive = selectedTimeSlot === slot.time;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        isSlotActive
                          ? 'bg-[#0c2317] text-white border-[#0c2317] shadow-sm'
                          : 'bg-white text-neutral-800 hover:border-neutral-300 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${isSlotActive ? 'text-amber-400' : 'text-neutral-400'}`} />
                        <span>{slot.time}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isSlotActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                        {slot.spotsLeft} spots
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Service Selection dropdown */}
              <div className="mt-5 pt-4 border-t border-neutral-200">
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Consultation Focus
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-800 focus:ring-2 focus:ring-[#0c2317]/20"
                >
                  {servicesList.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} ({srv.duration})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Pane 3: Contact & Property Booking Form (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-7 bg-white flex flex-col justify-between">
              
              <div>
                <h3 className="font-display text-xl font-bold text-[#0c2317] mb-1">
                  3. Property Details
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Where should our supervisor arrive?
                </p>

                <form id="calendar-booking-form" onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={clientData.name}
                      onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#0c2317]/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(704) 555-0123"
                      value={clientData.phone}
                      onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#0c2317]/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@example.com"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#0c2317]/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Charlotte Property Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street address (e.g. 10915 Delsing Ct)"
                      value={clientData.address}
                      onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#0c2317]/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Gate Code / Special Property Notes</label>
                    <input
                      type="text"
                      placeholder="Backyard gate unlocked, pets inside, etc."
                      value={clientData.notes}
                      onChange={(e) => setClientData({ ...clientData, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#0c2317]/20"
                    />
                  </div>
                </form>
              </div>

              {/* Action Box */}
              <div className="pt-5 mt-4 border-t border-neutral-100">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>36 Yrs Charlotte Heritage · No Obligation Free Estimate</span>
                </div>

                <button
                  type="submit"
                  form="calendar-booking-form"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0c2317] hover:bg-[#184632] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span>
                    {isSubmitting ? 'Confirming Appointment...' : `Confirm Booking for ${selectedTimeSlot}`}
                  </span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
