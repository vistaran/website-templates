import React from 'react';
import { Appointment, BusinessSettings } from '../types/booking';
import { generateIcsCalendar } from '../services/calendarExport';
import { format12Hour } from '../services/bookingStorage';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Download,
  ArrowRight,
  ShieldAlert,
  Phone,
  Mail,
  Copy,
  Check
} from 'lucide-react';

interface BookingConfirmationPageProps {
  appointment: Appointment;
  settings: BusinessSettings;
  onNavigate: (page: string) => void;
  onManageBooking: (ref: string, token: string) => void;
}

export const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  appointment,
  settings,
  onNavigate,
  onManageBooking
}) => {
  const [copiedRef, setCopiedRef] = React.useState(false);

  const formattedDate = React.useMemo(() => {
    if (!appointment.date) return '';
    const [year, month, day] = appointment.date.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [appointment.date]);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(appointment.bookingReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleDownloadCalendar = () => {
    generateIcsCalendar(appointment, settings);
  };

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Success Header */}
        <div className="text-center space-y-4 pb-8">
          <div className="w-14 h-14 bg-[#7A8069] text-white flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
            {appointment.status === 'Confirmed' ? 'Consultation Confirmed' : 'Reservation Received'}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            {appointment.status === 'Confirmed'
              ? 'We Look Forward to Meeting You'
              : 'Consultation Held (Pending Gateway)'}
          </h1>

          <p className="text-sm text-[#66665E] max-w-lg mx-auto leading-relaxed">
            {appointment.status === 'Confirmed'
              ? 'Your design consultation has been successfully reserved with our studio team. Please save your booking reference below.'
              : 'Your requested time slot is reserved in pending status. As this is a paid consultation in demo mode, real payment gateway credentials are not yet linked.'}
          </p>
        </div>

        {/* Primary Booking Reference Card */}
        <div className="bg-white border border-[#E8E0D5] p-6 sm:p-10 shadow-xs space-y-8">
          {/* Booking Reference banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#F7F5F0] border border-[#E8E0D5] gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#7A8069] font-medium block">
                Official Booking Reference
              </span>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#262622]">
                {appointment.bookingReference}
              </span>
            </div>

            <button
              onClick={handleCopyReference}
              className="px-3.5 py-1.5 text-xs border border-[#262622] hover:bg-[#262622] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Copied' : 'Copy Reference'}</span>
            </button>
          </div>

          {/* Paid / Demo notice if applicable */}
          {appointment.servicePrice > 0 && appointment.paymentStatus === 'Pending' && (
            <div className="p-4 bg-[#FBF6ED] border border-[#E0D0B8] text-[#7A5B2E] text-xs flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium">Payment Gateway Notice</strong>
                <span>
                  Consultation Fee: ₹{appointment.servicePrice.toLocaleString('en-IN')}. In this environment, live payment processing is not configured, so card charges were not made. The studio record is preserved with status <em>Pending</em>.
                </span>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[#7A8069] block">Consultation Package</span>
                <span className="font-serif text-base text-[#262622] font-medium block">
                  {appointment.serviceName}
                </span>
                <span className="text-[11px] text-[#66665E]">
                  Duration: {appointment.serviceDuration} minutes
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#7A8069] block">Date & Scheduled Time</span>
                <div className="flex items-center gap-2 text-sm text-[#262622] font-medium">
                  <Calendar className="w-4 h-4 text-[#7A8069]" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#262622]">
                  <Clock className="w-3.5 h-3.5 text-[#7A8069]" />
                  <span>
                    {format12Hour(appointment.startTime)} – {format12Hour(appointment.endTime)} ({appointment.timezone.replace('America/', '')})
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#7A8069] block">Consultation Method</span>
                <span className="text-[#262622] font-medium capitalize">
                  {appointment.consultationMethod.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#E8E0D5] pt-4 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <span className="text-[#7A8069] block">Client Name</span>
                <span className="text-sm text-[#262622] font-medium block">
                  {appointment.customerName}
                </span>
                <span className="text-[#66665E] block">{appointment.customerEmail}</span>
                <span className="text-[#66665E] block">{appointment.customerPhone}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[#7A8069] block">Property & Location</span>
                <span className="text-[#262622] font-medium block">
                  {appointment.propertyType} · {appointment.projectLocation}
                </span>
                <span className="text-[11px] text-[#7A8069]">
                  Design Areas: {appointment.designAreas.join(', ')}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#7A8069] block">Reservation Status</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium border ${
                    appointment.status === 'Confirmed'
                      ? 'bg-[#F2F5ED] text-[#4A6B34] border-[#C3D4B3]'
                      : 'bg-[#FFF8E6] text-[#8C6D1F] border-[#E8D9A8]'
                  }`}>
                    {appointment.status}
                  </span>
                  <span className="text-[11px] text-[#7A8069]">
                    Payment: {appointment.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs: Download .ICS & Manage */}
          <div className="pt-6 border-t border-[#E8E0D5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleDownloadCalendar}
              className="w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Calendar (.ics)</span>
            </button>

            <button
              onClick={() => onManageBooking(appointment.bookingReference, appointment.managementToken)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-widest border border-[#262622] text-[#262622] hover:bg-[#E8E0D5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Manage / Reschedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Studio Liaison Contact Information */}
        <div className="mt-8 bg-[#EFECE6] border border-[#E8E0D5] p-6 text-xs text-[#55554E] space-y-3">
          <h4 className="font-serif text-base text-[#262622] font-medium">
            Studio Inquiries & Rescheduling Policy
          </h4>
          <p className="leading-relaxed">
            Need to adjust details or submit floor plans prior to our session? You may contact your client liaison directly via phone or email, referencing your booking code <strong>{appointment.bookingReference}</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2 text-[#262622] font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#7A8069]" />
              {settings.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#7A8069]" />
              {settings.email}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7A8069]" />
              {settings.address}, {settings.cityStateZip}
            </span>
          </div>
          <div className="pt-2">
            <a
              href="https://maps.app.goo.gl/ykpSQACyKotSyDea9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#262622] font-semibold underline hover:text-[#7A8069]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7A8069]" />
              <span>Open Studio in Google Maps (Titanium City Center, Satellite) ↗</span>
            </a>
          </div>
        </div>

        {/* Return Button */}
        <div className="text-center pt-8">
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
