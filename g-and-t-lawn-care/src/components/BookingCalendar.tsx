import React, { useState, useEffect } from 'react';
import { format, isBefore, startOfDay, isSunday } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, CheckCircle, Phone, Mail, CalendarClock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

type Slot = { timeLabel: string; startTime: string; endTime: string; available: boolean };

/**
 * `npm run dev` runs Vite on :3000 and the Express dev server in server.js on
 * :3001, so locally the widget talks to :3001 directly. In production these
 * same endpoints are served from the site's own origin as Vercel functions.
 */
const DEFAULT_API_BASE = import.meta.env.DEV
  ? 'http://localhost:3001/api/appointments'
  : '/api/appointments';

type Connection = 'checking' | 'live' | 'offline';

export default function BookingCalendar({ apiBaseUrl = DEFAULT_API_BASE, hideWrapperStyles = false, initialRequirement = '' }: { apiBaseUrl?: string, hideWrapperStyles?: boolean, initialRequirement?: string }) {
  const [connection, setConnection] = useState<Connection>('checking');
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', requirement: initialRequirement });
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wrapper = `w-full mx-auto ${hideWrapperStyles ? 'bg-transparent' : 'max-w-md p-6 bg-white rounded-2xl'}`;

  // Check whether online scheduling is actually connected before showing a date
  // picker that could never confirm a real appointment.
  useEffect(() => {
    let cancelled = false;
    setConnection('checking');

    fetch(`${apiBaseUrl}/status`)
      .then(res => res.json())
      .then(data => { if (!cancelled) setConnection(data?.configured ? 'live' : 'offline'); })
      .catch(() => { if (!cancelled) setConnection('offline'); });

    return () => { cancelled = true; };
  }, [apiBaseUrl]);

  useEffect(() => {
    if (!selectedDate || connection !== 'live') return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    fetch(`${apiBaseUrl}/slots?date=${dateStr}`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        if (data?.configured === false) {
          setConnection('offline');
          return;
        }
        setSlots(data.slots || []);
        if (data.error) setError(data.error);
        setStep(2);
      })
      .catch(err => {
        console.error(err);
        if (cancelled) return;
        setSlots([]);
        setError('We could not load the available times. Please try again, or call us directly.');
        setStep(2);
      })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [selectedDate, apiBaseUrl, connection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBaseUrl}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, startTime: selectedSlot?.startTime, endTime: selectedSlot?.endTime })
      });
      const data = await res.json();
      if (data.success) {
        setMeetLink(data.meetLink);
        setStep(4);
      } else if (data?.configured === false) {
        setConnection('offline');
      } else {
          setError(data.error || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Booking failed. Please try again, or call us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (connection === 'checking') {
    return (
      <div className={wrapper}>
        <div className="py-10 text-center text-sm text-slate-400">Loading scheduling…</div>
      </div>
    );
  }

  // Scheduling is not connected yet: keep the visitor on a path that still
  // reaches the business rather than showing a widget that cannot work.
  if (connection === 'offline') {
    return (
      <div className={wrapper}>
        <div className="text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-lime-500 text-slate-950 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-lime-500/30">
            <CalendarClock className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 font-heading tracking-tight">
            Book Your Free Consultation
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7">
            Call or message us with your address and a photo of your yard we will reply within 24
            hours with an upfront, no-obligation estimate.
          </p>

          <div className="space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold transition-all"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS_INFO.phone}
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent('Free lawn care estimate request')}`}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-white border border-slate-300 hover:border-lime-500 hover:text-lime-700 text-slate-700 font-bold transition-all"
            >
              <Mail className="w-5 h-5" />
              Email us
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-5">{BUSINESS_INFO.hours.display}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <AnimatePresence mode="wait">

        {/* STEP 1: DATE PICKER */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-bold mb-4 text-center text-slate-800">Select a Date</h3>
            <div className="flex justify-center text-slate-900">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => isBefore(date, startOfDay(new Date())) || isSunday(date)}
                modifiersClassNames={{ selected: 'bg-green-700 text-white rounded-full' }}
              />
            </div>
            <style>{`
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                background-color: #15803d; /* green-700 */
                color: white;
              }
            `}</style>
          </motion.div>
        )}

        {/* STEP 2: TIME SLOTS */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <button onClick={() => setStep(1)} className="flex items-center text-sm text-slate-500 hover:text-green-700 mb-4 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Available Times</h3>
            <div className="grid grid-cols-2 gap-3">
              {isLoading ? (
                  <div className="col-span-2 text-center text-slate-500 py-4">Loading slots...</div>
              ) : slots.length === 0 ? (
                  <div className="col-span-2 text-center text-slate-500 py-4 leading-relaxed">
                    {error || 'No slots available'}
                  </div>
              ) : slots.map((slot, i) => (
                <button
                  key={i}
                  disabled={!slot.available}
                  onClick={() => { setSelectedSlot(slot); setStep(3); }}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    slot.available ? 'border-slate-200 hover:border-green-600 hover:bg-green-50 text-slate-700' : 'bg-slate-50 text-slate-400 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {slot.timeLabel}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: FORM */}
        {step === 3 && (
           <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
             <button onClick={() => setStep(2)} className="flex items-center text-sm text-slate-500 hover:text-green-700 mb-4 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
             <div className="bg-green-50 p-4 rounded-xl mb-6 flex items-center gap-3 border border-green-100">
               <div className="bg-white p-2 rounded-full shadow-sm">
                 <Clock className="text-green-700 w-5 h-5" />
               </div>
               <div>
                 <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-0.5">Selected Time</p>
                 <p className="text-sm font-bold text-green-900">
                   {selectedDate && format(selectedDate, 'MMMM do, yyyy')} at {selectedSlot?.timeLabel}
                 </p>
               </div>
             </div>

             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="text-sm font-semibold text-slate-700 block mb-1.5">Name</label>
                 <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-slate-900" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" />
               </div>
               <div>
                 <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email</label>
                 <input required type="email" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-slate-900" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" />
               </div>
               <div>
                 <label className="text-sm font-semibold text-slate-700 block mb-1.5">Project Details</label>
                 <textarea required rows={3} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-slate-900" value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})} placeholder="Briefly describe what you're looking for..." />
               </div>
               {error && (
                 <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 leading-relaxed">
                   {error}
                 </p>
               )}
               <button disabled={isLoading} className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold py-3.5 rounded-xl transition-all mt-2">
                 {isLoading ? 'Confirming...' : 'Confirm Appointment'}
               </button>
             </form>
           </motion.div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <motion.div key="step4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Booking Confirmed!</h3>
            <p className="text-slate-600 mb-8 max-w-[250px] mx-auto leading-relaxed">Your consultation is set. A calendar invite has been sent to <strong className="text-slate-800">{formData.email}</strong>.</p>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
