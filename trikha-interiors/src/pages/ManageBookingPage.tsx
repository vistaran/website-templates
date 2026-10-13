import React, { useState, useEffect } from 'react';
import { Appointment, BusinessSettings } from '../types/booking';
import {
  cancelAppointment,
  format12Hour,
  getAppointmentByReference,
  getAvailableSlotsForDate,
  rescheduleAppointment
} from '../services/bookingStorage';
import { generateIcsCalendar } from '../services/calendarExport';
import {
  Search,
  Calendar,
  Clock,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info
} from 'lucide-react';

interface ManageBookingPageProps {
  initialReference?: string;
  initialToken?: string;
  settings: BusinessSettings;
  onNavigate: (page: string) => void;
}

export const ManageBookingPage: React.FC<ManageBookingPageProps> = ({
  initialReference,
  initialToken,
  settings,
  onNavigate
}) => {
  const [referenceInput, setReferenceInput] = useState(initialReference || '');
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [searchError, setSearchError] = useState('');

  // Reschedule state
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduleError, setRescheduleError] = useState('');
  const [rescheduleSuccess, setRescheduleSuccess] = useState('');

  // Cancel state
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState('');

  // Load initial if passed
  useEffect(() => {
    if (initialReference) {
      const found = getAppointmentByReference(initialReference);
      if (found) {
        setAppointment(found);
      }
    }
  }, [initialReference]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setRescheduleSuccess('');
    if (!referenceInput.trim()) {
      setSearchError('Please enter your booking reference.');
      return;
    }

    const found = getAppointmentByReference(referenceInput.trim());
    if (found) {
      setAppointment(found);
    } else {
      setAppointment(null);
      setSearchError(`No appointment found for reference "${referenceInput}". Please check your code (e.g. AO-2026-XXXX).`);
    }
  };

  const availableSlotsForReschedule = React.useMemo(() => {
    if (!appointment || !newDate) return [];
    return getAvailableSlotsForDate(newDate, appointment.serviceDuration);
  }, [appointment, newDate]);

  const handleRescheduleSubmit = () => {
    if (!appointment || !newDate || !newTime) {
      setRescheduleError('Please select both a date and an available time slot.');
      return;
    }

    const result = rescheduleAppointment(
      appointment.id,
      newDate,
      newTime,
      initialToken || appointment.managementToken
    );

    if (result.success && result.appointment) {
      setAppointment(result.appointment);
      setIsRescheduling(false);
      setRescheduleSuccess(`Consultation successfully rescheduled to ${newDate} at ${format12Hour(newTime)}.`);
      setRescheduleError('');
    } else {
      setRescheduleError(result.error || 'Failed to reschedule.');
    }
  };

  const handleCancelSubmit = () => {
    if (!appointment) return;

    const result = cancelAppointment(
      appointment.id,
      cancelReason || 'Client requested cancellation via portal',
      initialToken || appointment.managementToken
    );

    if (result.success) {
      const refreshed = getAppointmentByReference(appointment.bookingReference);
      if (refreshed) setAppointment(refreshed);
      setIsCancelling(false);
    } else {
      setCancelError(result.error || 'Failed to cancel appointment.');
    }
  };

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
            Client Self-Service Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            Manage Your Consultation
          </h1>
          <p className="text-sm text-[#66665E] max-w-md mx-auto leading-relaxed">
            Look up your appointment with your booking code to view specifications, reschedule, or cancel your session.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white border border-[#E8E0D5] p-5 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7A8069] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value)}
              placeholder="Enter Booking Reference (e.g. INLAY-2026-7841)"
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622] placeholder-[#9E9B91] focus:outline-hidden focus:border-[#262622] uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#262622] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#3D3D36] transition-colors cursor-pointer shrink-0"
          >
            Look Up Booking
          </button>
        </form>

        {searchError && (
          <div className="p-4 bg-[#FBF2F2] border border-[#DEAAAA] text-[#802020] text-xs">
            {searchError}
          </div>
        )}

        {rescheduleSuccess && (
          <div className="p-4 bg-[#F2F7ED] border border-[#BBD4AC] text-[#3D6B26] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{rescheduleSuccess}</span>
          </div>
        )}

        {/* Appointment Details Display */}
        {appointment && (
          <div className="bg-white border border-[#E8E0D5] p-6 sm:p-9 shadow-xs space-y-6 animate-in fade-in">
            {/* Top Bar with Reference and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E0D5] gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7A8069] font-medium block">
                  Booking Reference
                </span>
                <span className="font-serif text-2xl font-bold text-[#262622]">
                  {appointment.bookingReference}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border ${
                    appointment.status === 'Confirmed'
                      ? 'bg-[#F2F5ED] text-[#4A6B34] border-[#C3D4B3]'
                      : appointment.status === 'Cancelled'
                      ? 'bg-[#FBF2F2] text-[#8C2C2C] border-[#DEAAAA]'
                      : 'bg-[#FFF8E6] text-[#8C6D1F] border-[#E8D9A8]'
                  }`}
                >
                  {appointment.status}
                </span>
                <span className="text-xs text-[#7A8069]">
                  (Payment: {appointment.paymentStatus})
                </span>
              </div>
            </div>

            {/* Core details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div>
                  <span className="text-[#7A8069] block">Service</span>
                  <span className="font-serif text-lg text-[#262622] font-medium">
                    {appointment.serviceName}
                  </span>
                  <span className="text-[#66665E] block">
                    Duration: {appointment.serviceDuration} minutes · {appointment.servicePrice === 0 ? 'Free' : `₹${appointment.servicePrice.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <div>
                  <span className="text-[#7A8069] block">Scheduled Time</span>
                  <div className="flex items-center gap-1.5 text-sm text-[#262622] font-medium">
                    <Calendar className="w-4 h-4 text-[#7A8069]" />
                    <span>{appointment.date}</span>
                    <span aria-hidden="true">·</span>
                    <Clock className="w-4 h-4 text-[#7A8069]" />
                    <span>{format12Hour(appointment.startTime)} – {format12Hour(appointment.endTime)}</span>
                  </div>
                  <span className="text-[11px] text-[#7A8069]">
                    Timezone: {appointment.timezone}
                  </span>
                </div>

                <div>
                  <span className="text-[#7A8069] block">Consultation Method</span>
                  <span className="text-[#262622] font-medium capitalize">
                    {appointment.consultationMethod.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t md:border-t-0 md:border-l border-[#E8E0D5] pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-[#7A8069] block">Client Name</span>
                  <span className="text-[#262622] font-medium">{appointment.customerName}</span>
                  <span className="text-[#66665E] block">{appointment.customerEmail}</span>
                  <span className="text-[#66665E] block">{appointment.customerPhone}</span>
                </div>

                <div>
                  <span className="text-[#7A8069] block">Property & Location</span>
                  <span className="text-[#262622] font-medium">
                    {appointment.propertyType} in {appointment.projectLocation}
                  </span>
                  <span className="text-[11px] text-[#7A8069] block">
                    Scope: {appointment.designAreas.join(', ')} · Budget: {appointment.budgetRange}
                  </span>
                </div>

                {appointment.projectDescription && (
                  <div>
                    <span className="text-[#7A8069] block">Project Overview</span>
                    <p className="text-[#55554E] italic bg-[#F7F5F0] p-2 border border-[#E8E0D5]">
                      "{appointment.projectDescription}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Reschedule Drawer */}
            {isRescheduling && (
              <div className="p-5 bg-[#F7F5F0] border border-[#262622] space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-2">
                  <h4 className="font-serif text-lg text-[#262622] font-medium">
                    Select New Consultation Time
                  </h4>
                  <button
                    onClick={() => setIsRescheduling(false)}
                    className="text-xs text-[#7A8069] hover:text-[#262622] cursor-pointer"
                  >
                    Cancel Rescheduling
                  </button>
                </div>

                {rescheduleError && (
                  <div className="p-3 bg-[#FBF2F2] border border-[#DEAAAA] text-[#802020] text-xs">
                    {rescheduleError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
                      New Date (YYYY-MM-DD)
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => {
                        setNewDate(e.target.value);
                        setNewTime('');
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E8E0D5] text-sm text-[#262622]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
                      Available Time Slots
                    </label>
                    {newDate ? (
                      <select
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E0D5] text-sm text-[#262622]"
                      >
                        <option value="">-- Choose a slot --</option>
                        {availableSlotsForReschedule
                          .filter((s) => s.isAvailable)
                          .map((s) => (
                            <option key={s.time} value={s.time}>
                              {s.timeFormatted} (until {s.endTimeFormatted})
                            </option>
                          ))}
                      </select>
                    ) : (
                      <span className="text-xs text-[#7A8069] italic block pt-2">
                        Select a date first to calculate availability
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsRescheduling(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider border border-[#262622]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRescheduleSubmit}
                    className="px-5 py-2 text-xs uppercase tracking-wider bg-[#262622] text-white hover:bg-[#3D3D36]"
                  >
                    Confirm New Time
                  </button>
                </div>
              </div>
            )}

            {/* Cancel Drawer */}
            {isCancelling && (
              <div className="p-5 bg-[#FDF5F5] border border-[#E2B2B2] space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-[#992222]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <h4 className="font-serif text-lg font-medium">Cancel Consultation</h4>
                </div>

                <p className="text-xs text-[#7A3333] leading-relaxed">
                  Per studio policy, cancellations made with at least {settings.cancellationWindowHours} hours notice incur no penalty. Are you sure you wish to cancel this booking?
                </p>

                {cancelError && (
                  <div className="p-3 bg-[#FBF2F2] border border-[#DEAAAA] text-[#802020] text-xs">
                    {cancelError}
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7A3333] font-medium mb-1">
                    Reason for Cancellation (Optional)
                  </label>
                  <input
                    type="text"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="e.g. Project timeline postponed, traveling..."
                    className="w-full px-3 py-2 bg-white border border-[#E2B2B2] text-xs text-[#262622]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsCancelling(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider border border-[#7A3333] text-[#7A3333]"
                  >
                    Keep Appointment
                  </button>
                  <button
                    onClick={handleCancelSubmit}
                    className="px-5 py-2 text-xs uppercase tracking-wider bg-[#992222] text-white hover:bg-[#7A1A1A]"
                  >
                    Yes, Cancel Appointment
                  </button>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#E8E0D5] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => generateIcsCalendar(appointment, settings)}
                className="px-4 py-2 text-xs uppercase tracking-wider bg-[#F7F5F0] border border-[#E8E0D5] hover:border-[#262622] text-[#262622] flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .ics Calendar</span>
              </button>

              {appointment.status !== 'Cancelled' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsRescheduling(true);
                      setIsCancelling(false);
                    }}
                    className="px-4 py-2 text-xs uppercase tracking-wider border border-[#262622] text-[#262622] hover:bg-[#262622] hover:text-white transition-colors cursor-pointer"
                  >
                    Reschedule
                  </button>

                  <button
                    onClick={() => {
                      setIsCancelling(true);
                      setIsRescheduling(false);
                    }}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-[#992222] hover:bg-[#FDF2F2] border border-transparent hover:border-[#E2B2B2] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs uppercase tracking-widest text-[#7A8069] hover:text-[#262622] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Return to Studio Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
