import React, { useState, useEffect } from 'react';
import { 
  X, Calendar as CalendarIcon, Clock, CheckCircle2, MapPin, Phone, 
  User, Mail, Sparkles, Download, ExternalLink, CalendarPlus, 
  Trash2, AlertCircle, RefreshCw
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { 
  BookedAppointment, 
  generateGoogleCalendarUrl, 
  generateOutlookCalendarUrl, 
  downloadIcsCalendarFile, 
  saveAppointmentLocally, 
  getStoredAppointments,
  removeAppointmentLocally
} from '../services/appointmentService';

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [viewMode, setViewMode] = useState<'book' | 'list'>('book');
  const [selectedService, setSelectedService] = useState('Lawn Mowing & Maintenance');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('Morning (8:00 AM – 11:00 AM)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  const [lastBooked, setLastBooked] = useState<BookedAppointment | null>(null);
  const [savedAppointments, setSavedAppointments] = useState<BookedAppointment[]>([]);

  useEffect(() => {
    setSavedAppointments(getStoredAppointments());
  }, [isOpen]);

  // Generate next 14 days for selection
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // starting tomorrow
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      monthDay: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isSunday: d.getDay() === 0,
    };
  });

  const timeSlots = [
    { id: 'morning', label: 'Morning (8:00 AM – 11:00 AM)' },
    { id: 'midday', label: 'Mid-Day (11:00 AM – 2:00 PM)' },
    { id: 'afternoon', label: 'Afternoon (2:00 PM – 5:00 PM)' },
    { id: 'evening', label: 'Evening (5:00 PM – 7:00 PM)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !selectedDate) {
      alert('Please fill in your name, phone number, address, and select a preferred date.');
      return;
    }

    const apptId = `JP-${Date.now().toString().slice(-4)}`;
    const title = `JP Lawn and Landscaping - Estimate (${selectedService})`;

    const gcalUrl = generateGoogleCalendarUrl({
      title,
      service: selectedService,
      date: selectedDate,
      slot: selectedSlot,
      address,
      customerName: name,
      phone,
      notes,
    });

    const newAppt: BookedAppointment = {
      id: apptId,
      service: selectedService,
      date: selectedDate,
      slot: selectedSlot,
      customerName: name,
      phone,
      email,
      address,
      notes,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      googleCalendarUrl: gcalUrl,
    };

    // Save locally
    saveAppointmentLocally(newAppt);
    setSavedAppointments(getStoredAppointments());
    setLastBooked(newAppt);

    // Call API in background if available
    try {
      await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppt),
      });
    } catch {
      // Local fallback already saved
    }
  };

  const handleDownloadIcs = (appt: BookedAppointment) => {
    downloadIcsCalendarFile({
      title: `JP Lawn and Landscaping - Estimate (${appt.service})`,
      service: appt.service,
      date: appt.date,
      slot: appt.slot,
      address: appt.address,
      customerName: appt.customerName,
      phone: appt.phone,
      notes: appt.notes,
    });
  };

  const handleDeleteAppt = (id: string) => {
    if (confirm('Cancel this scheduled appointment?')) {
      removeAppointmentLocally(id);
      setSavedAppointments(getStoredAppointments());
      if (lastBooked?.id === id) {
        setLastBooked(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative flex justify-between items-start border-b border-stone-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar Booking & Estimate Dispatch</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Schedule Your On-Site Estimate
            </h3>
            <p className="text-xs text-stone-300">
              Pick a date, add it instantly to your Google Calendar or download an Apple/Outlook iCal invite.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {savedAppointments.length > 0 && !lastBooked && (
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'book' ? 'list' : 'book')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 transition-colors"
              >
                {viewMode === 'book' ? `My Appointments (${savedAppointments.length})` : 'New Booking'}
              </button>
            )}
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode: Saved Appointments List */}
        {viewMode === 'list' && !lastBooked ? (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-stone-900 text-lg">Your Scheduled Appointments</h4>
              <button
                onClick={() => setViewMode('book')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                + Book Another
              </button>
            </div>

            {savedAppointments.length === 0 ? (
              <p className="text-sm text-stone-500 py-8 text-center">No saved appointments found.</p>
            ) : (
              <div className="space-y-4">
                {savedAppointments.map((appt) => (
                  <div key={appt.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {appt.id} • {appt.status.toUpperCase()}
                        </span>
                        <h5 className="font-bold text-stone-900 text-base mt-1">{appt.service}</h5>
                        <div className="text-xs text-stone-600 flex items-center gap-1.5 mt-0.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{appt.date} • {appt.slot}</span>
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{appt.address}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteAppt(appt.id)}
                        className="text-stone-400 hover:text-red-500 p-1.5 transition-colors"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Calendar Sync Actions */}
                    <div className="pt-2 border-t border-stone-200 flex flex-wrap gap-2 text-xs">
                      <a
                        href={appt.googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Google Calendar</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDownloadIcs(appt)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-500" />
                        <span>Download .ICS (Apple/Outlook)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setViewMode('book')}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm"
              >
                Schedule A New Appointment
              </button>
            </div>
          </div>
        ) : lastBooked ? (
          /* Confirmation & Calendar Event Action Screen */
          <div className="p-6 sm:p-8 text-center space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Ref ID: {lastBooked.id}
              </div>
              <h4 className="text-2xl font-black text-stone-900">
                Appointment Scheduled!
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you, <strong>{lastBooked.customerName}</strong>. Your estimate walkthrough for <strong>{lastBooked.service}</strong> is scheduled for <strong>{lastBooked.date}</strong> ({lastBooked.slot}).
              </p>
            </div>

            {/* Direct Calendar Add Buttons */}
            <div className="p-5 rounded-2xl bg-emerald-950 text-white text-left space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm text-white">Add this event to your calendar:</h5>
                  <p className="text-xs text-stone-300">Never miss your arrival window with built-in reminder alerts.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {/* 1-Click Google Calendar */}
                <a
                  href={lastBooked.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-[1.02]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>

                {/* 1-Click iCal Download */}
                <button
                  type="button"
                  onClick={() => handleDownloadIcs(lastBooked)}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS (Apple/Outlook)</span>
                </button>
              </div>
            </div>

            {/* Property Visit Summary Card */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2 text-stone-700">
              <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Property Address:</span>
                <span className="font-bold text-stone-900">{lastBooked.address}</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Contact Phone:</span>
                <span className="font-bold text-stone-900">{lastBooked.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">Provider:</span>
                <span className="font-bold text-emerald-800">JP Lawn and Landscaping ({BUSINESS_INFO.phone})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setLastBooked(null);
                  setViewMode('list');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
              >
                View Saved Appointments
              </button>

              <button
                type="button"
                onClick={() => {
                  setLastBooked(null);
                  setName('');
                  setPhone('');
                  setAddress('');
                  setNotes('');
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                1. What service do you need estimated?
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold bg-white text-stone-800"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Complete Yard Overhaul & Landscaping">Complete Yard Overhaul & Landscaping</option>
                <option value="Other / Multiple Services">Other / Multiple Services</option>
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. Select Preferred Walkthrough Date
                </label>
                <span className="text-[11px] text-emerald-700 font-semibold">Sundays Closed</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availableDates.slice(0, 7).map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    disabled={d.isSunday}
                    onClick={() => setSelectedDate(d.iso)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      d.isSunday
                        ? 'opacity-40 bg-stone-100 border-stone-200 cursor-not-allowed'
                        : selectedDate === d.iso
                        ? 'border-emerald-600 bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-stone-400 group-hover:text-stone-600">{d.dayName}</div>
                    <div className="text-xs font-bold mt-0.5">{d.monthDay}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                3. Preferred Arrival Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.label)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      selectedSlot === slot.label
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{slot.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Property & Contact Details */}
            <div className="space-y-4 pt-2 border-t border-stone-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                4. Your Property & Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">Phone Number (Call / Text) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(704) 490-1161"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">Property Address (Kannapolis, Concord, etc.) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Street, City, Zip"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">Email (For calendar invite)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-600 font-medium mb-1">Property Notes / Gate Code / Specific Goals</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Back yard needs grading; side gate is unlocked; dogs will be indoors."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Confirm & Add to Calendar</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
