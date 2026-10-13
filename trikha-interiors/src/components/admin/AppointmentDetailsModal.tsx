import React, { useState } from 'react';
import { Appointment, AppointmentStatus, PaymentStatus } from '../../types/booking';
import { format12Hour } from '../../services/bookingStorage';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Home,
  DollarSign,
  Check,
  XCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
  onUpdateStatus: (
    appointmentId: string,
    status: AppointmentStatus,
    paymentStatus?: PaymentStatus,
    notes?: string
  ) => void;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  onClose,
  onUpdateStatus
}) => {
  const [internalNotes, setInternalNotes] = useState(appointment.internalNotes || '');
  const [status, setStatus] = useState<AppointmentStatus>(appointment.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(appointment.paymentStatus);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    onUpdateStatus(appointment.id, status, paymentStatus, internalNotes);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E8E0D5] max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A8069] hover:text-[#262622] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#E8E0D5] pb-4 pr-10">
          <div className="flex items-center gap-2 text-xs text-[#7A8069] uppercase tracking-wider mb-1">
            <span>Reference:</span>
            <span className="font-semibold text-[#262622] font-mono">{appointment.bookingReference}</span>
          </div>
          <h2 className="font-serif text-2xl text-[#262622]">
            {appointment.serviceName}
          </h2>
          <p className="text-xs text-[#66665E] mt-0.5">
            Booked on {new Date(appointment.createdAt).toLocaleDateString()} at {new Date(appointment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Content Grid */}
        <div className="py-6 space-y-6 text-xs text-[#262622]">
          {/* Scheduled Date and Time */}
          <div className="bg-[#F7F5F0] border border-[#E8E0D5] p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#7A8069]" />
              <span className="font-medium text-sm">{appointment.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7A8069]" />
              <span className="font-medium text-sm">
                {format12Hour(appointment.startTime)} – {format12Hour(appointment.endTime)}
              </span>
            </div>
            <div className="text-[11px] text-[#7A8069]">
              Method: <span className="capitalize font-medium text-[#262622]">{appointment.consultationMethod.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Client Information */}
          <div className="border border-[#E8E0D5] p-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider text-[#7A8069] font-medium border-b border-[#E8E0D5] pb-1.5">
              Client Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#7A8069]" />
                <span className="font-medium">{appointment.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7A8069]" />
                <a href={`mailto:${appointment.customerEmail}`} className="text-[#262622] underline hover:text-[#7A8069]">
                  {appointment.customerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#7A8069]" />
                <a href={`tel:${appointment.customerPhone}`} className="hover:text-[#7A8069]">
                  {appointment.customerPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-[#7A8069]" />
                <span>{appointment.propertyType} in {appointment.projectLocation}</span>
              </div>
            </div>
          </div>

          {/* Project Requirements & Scope */}
          <div className="border border-[#E8E0D5] p-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider text-[#7A8069] font-medium border-b border-[#E8E0D5] pb-1.5">
              Client Design Scope & Requirements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[#7A8069] block">Estimated Budget:</span>
                <span className="font-medium text-sm">{appointment.budgetRange}</span>
              </div>
              <div>
                <span className="text-[#7A8069] block">Design Areas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {appointment.designAreas.map((area) => (
                    <span key={area} className="bg-[#EFECE6] px-2 py-0.5 text-[10px] border border-[#E8E0D5]">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {appointment.projectDescription && (
              <div className="pt-2 border-t border-[#E8E0D5]/60">
                <span className="text-[#7A8069] block mb-1">Project Brief / Client Notes:</span>
                <p className="bg-[#F7F5F0] p-2.5 text-xs text-[#44443E] italic border border-[#E8E0D5]">
                  "{appointment.projectDescription}"
                </p>
              </div>
            )}
          </div>

          {/* Status & Payment Controls */}
          <div className="border border-[#E8E0D5] p-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-wider text-[#7A8069] font-medium border-b border-[#E8E0D5] pb-1.5">
              Appointment Management & Status
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
                  Appointment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs font-medium"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="No-show">No-show</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs font-medium"
                >
                  <option value="Not Required">Not Required (Free / ₹0)</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Internal Designer Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
                Internal Studio Notes (Private)
              </label>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add confidential notes, contractor requirements, or follow-up items..."
                className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E8E0D5] text-xs resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E8E0D5] pt-4 flex items-center justify-between">
          <div className="text-xs text-emerald-700 font-medium">
            {savedMessage && 'Changes saved successfully.'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider border border-[#262622] hover:bg-[#F7F5F0] cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs uppercase tracking-wider bg-[#262622] text-white hover:bg-[#3D3D36] cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
