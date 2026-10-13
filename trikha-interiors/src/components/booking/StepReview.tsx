import React, { useState } from 'react';
import { BusinessSettings, Service } from '../../types/booking';
import { CustomerDetailsFormData } from './StepDetails';
import { format12Hour } from '../../services/bookingStorage';
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Edit2
} from 'lucide-react';

interface StepReviewProps {
  selectedService: Service;
  selectedDate: string;
  selectedTime: string;
  formData: CustomerDetailsFormData;
  settings: BusinessSettings;
  onConfirmBooking: () => Promise<void>;
  onEditStep: (stepNumber: number) => void;
  onBack: () => void;
  errorMessage?: string;
}

export const StepReview: React.FC<StepReviewProps> = ({
  selectedService,
  selectedDate,
  selectedTime,
  formData,
  settings,
  onConfirmBooking,
  onEditStep,
  onBack,
  errorMessage
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = React.useMemo(() => {
    if (!selectedDate) return '';
    const [year, month, day] = selectedDate.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [selectedDate]);

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      await onConfirmBooking();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
          Step 5 of 5
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
          Review & Confirm Consultation
        </h2>
        <p className="text-sm text-[#66665E] leading-relaxed">
          Please review your appointment specifications and project summary before final submission.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-[#E8E0D5] p-6 sm:p-9 shadow-xs space-y-6">
        {/* Error alert if double booking or validation failed */}
        {errorMessage && (
          <div className="p-4 bg-[#FBF2F2] border border-[#DEAAAA] text-[#802020] text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium block">Appointment Reservation Alert</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Selected Service Card */}
        <div className="border border-[#E8E0D5] p-5 bg-[#F7F5F0] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-medium">
              Consultation Package
            </span>
            <h3 className="font-serif text-xl text-[#262622] font-medium">
              {selectedService.name}
            </h3>
            <p className="text-xs text-[#66665E]">{selectedService.tagline}</p>
            <div className="flex items-center gap-3 text-xs text-[#7A8069] pt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedService.durationMinutes} Minutes
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{formData.consultationMethod.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-serif text-2xl font-medium text-[#262622] block">
              {selectedService.isFree ? 'Free' : `₹${selectedService.price.toLocaleString('en-IN')}`}
            </span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[11px] text-[#7A8069] hover:text-[#262622] inline-flex items-center gap-1 mt-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Change</span>
            </button>
          </div>
        </div>

        {/* Date & Time Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[#E8E0D5] p-4 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-medium block">
                Appointment Date
              </span>
              <div className="flex items-center gap-2 text-sm text-[#262622] font-medium">
                <Calendar className="w-4 h-4 text-[#7A8069]" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-[11px] text-[#7A8069] hover:text-[#262622] inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>

          <div className="border border-[#E8E0D5] p-4 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-medium block">
                Time & Timezone
              </span>
              <div className="flex items-center gap-2 text-sm text-[#262622] font-medium">
                <Clock className="w-4 h-4 text-[#7A8069]" />
                <span>{format12Hour(selectedTime)} ({settings.timezone.replace('America/', '')})</span>
              </div>
              <span className="text-[10px] text-[#7A8069] block">
                Studio Timezone: {settings.timezoneLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-[11px] text-[#7A8069] hover:text-[#262622] inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Client & Project Details Summary */}
        <div className="border border-[#E8E0D5] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-2">
            <h4 className="text-xs uppercase tracking-wider text-[#262622] font-medium">
              Client & Project Details
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-[11px] text-[#7A8069] hover:text-[#262622] inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
            <div>
              <span className="text-[#7A8069] block">Full Name</span>
              <span className="text-[#262622] font-medium">{formData.customerName}</span>
            </div>
            <div>
              <span className="text-[#7A8069] block">Email Address</span>
              <span className="text-[#262622] font-medium">{formData.customerEmail}</span>
            </div>
            <div>
              <span className="text-[#7A8069] block">Phone Number</span>
              <span className="text-[#262622] font-medium">{formData.customerPhone}</span>
            </div>
            <div>
              <span className="text-[#7A8069] block">Property Location</span>
              <span className="text-[#262622] font-medium">{formData.projectLocation}</span>
            </div>
            <div>
              <span className="text-[#7A8069] block">Property Type</span>
              <span className="text-[#262622] font-medium">{formData.propertyType}</span>
            </div>
            <div>
              <span className="text-[#7A8069] block">Estimated Budget</span>
              <span className="text-[#262622] font-medium">{formData.budgetRange}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8E0D5]/60 text-xs">
            <span className="text-[#7A8069] block mb-1">Target Design Areas:</span>
            <div className="flex flex-wrap gap-1.5">
              {formData.designAreas.map((area) => (
                <span
                  key={area}
                  className="bg-[#EFECE6] px-2 py-0.5 text-[11px] text-[#262622] border border-[#E8E0D5]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {formData.projectDescription && (
            <div className="pt-2 text-xs">
              <span className="text-[#7A8069] block mb-0.5">Project Overview:</span>
              <p className="text-[#55554E] italic bg-[#F7F5F0] p-2.5 border border-[#E8E0D5]">
                "{formData.projectDescription}"
              </p>
            </div>
          )}
        </div>

        {/* Payment Policy Disclosure */}
        <div className="bg-[#EFECE6] border border-[#E8E0D5] p-4 text-xs text-[#55554E] space-y-2">
          <div className="flex items-center gap-1.5 font-medium text-[#262622]">
            <ShieldCheck className="w-4 h-4 text-[#7A8069]" />
            <span>Consultation & Studio Governance</span>
          </div>
          {selectedService.isFree ? (
            <p>
              • <strong>Complimentary Session:</strong> No payment required. Your appointment will be immediately confirmed upon submission.
            </p>
          ) : (
            <div className="space-y-1">
              <p>
                • <strong>Consultation Fee (₹{selectedService.price.toLocaleString('en-IN')}):</strong> In this demonstration environment, your reservation will be saved in <em>Pending</em> status. Real transactions require connecting the live payment gateway.
              </p>
              <p className="text-[11px] text-[#7A8069]">
                • No credit card details are collected or stored on this server.
              </p>
            </div>
          )}
          <p className="text-[11px]">
            • Rescheduling and cancellation are permitted without penalty up to {settings.cancellationWindowHours} hours prior to the session.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#E8E0D5] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-xs uppercase tracking-widest border border-[#262622] text-[#262622] hover:bg-[#E8E0D5] transition-colors cursor-pointer disabled:opacity-50"
          >
            Back to Edit
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-8 py-3 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Availability...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Confirm Appointment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
