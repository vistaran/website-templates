import React, { useState, useEffect } from 'react';
import {
  Appointment,
  AvailabilityRule,
  BlockedDate,
  BusinessSettings,
  Service
} from '../types/booking';
import {
  createAppointment,
  getAvailabilityRules,
  getBlockedDates,
  getBusinessSettings,
  getServices
} from '../services/bookingStorage';
import { StepService } from '../components/booking/StepService';
import { StepDate } from '../components/booking/StepDate';
import { StepTime } from '../components/booking/StepTime';
import { CustomerDetailsFormData, StepDetails } from '../components/booking/StepDetails';
import { StepReview } from '../components/booking/StepReview';
import { Check } from 'lucide-react';

interface BookingPageProps {
  onBookingSuccess: (appointment: Appointment) => void;
  onNavigate: (page: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onBookingSuccess,
  onNavigate
}) => {
  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [availabilityRules, setAvailabilityRules] = useState<AvailabilityRule[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(getBusinessSettings());

  // Wizard selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState<CustomerDetailsFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    projectLocation: '',
    propertyType: 'Condo',
    designAreas: ['Living Room'],
    budgetRange: '$50,000 – $100,000',
    projectDescription: '',
    consultationMethod: 'in_person'
  });
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    const s = getServices();
    const r = getAvailabilityRules();
    const b = getBlockedDates();
    const cfg = getBusinessSettings();

    setServices(s);
    setAvailabilityRules(r);
    setBlockedDates(b);
    setSettings(cfg);

    if (s.length > 0 && !selectedService) {
      setSelectedService(s[0]);
    }
  }, []);

  const handleUpdateFormData = (data: Partial<CustomerDetailsFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setSubmitError('Missing appointment schedule selection.');
      return;
    }

    setSubmitError('');

    // Call storage creation service
    const result = createAppointment({
      serviceId: selectedService.id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      projectLocation: formData.projectLocation,
      propertyType: formData.propertyType,
      designAreas: formData.designAreas,
      budgetRange: formData.budgetRange,
      projectDescription: formData.projectDescription,
      consultationMethod: formData.consultationMethod,
      date: selectedDate,
      startTime: selectedTime
    });

    if (result.success && result.appointment) {
      onBookingSuccess(result.appointment);
    } else {
      setSubmitError(result.error || 'Unable to confirm appointment at this time.');
    }
  };

  const stepsList = [
    { number: 1, label: 'Service' },
    { number: 2, label: 'Date' },
    { number: 3, label: 'Time' },
    { number: 4, label: 'Details' },
    { number: 5, label: 'Confirm' }
  ];

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Wizard Stepper Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E8E0D5] -z-0 -translate-y-1/2" />
            {stepsList.map((s) => {
              const isPassed = step > s.number;
              const isCurrent = step === s.number;
              return (
                <button
                  key={s.number}
                  disabled={s.number > step}
                  onClick={() => setStep(s.number)}
                  className={`relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif transition-colors ${
                      isPassed
                        ? 'bg-[#7A8069] text-white'
                        : isCurrent
                        ? 'bg-[#262622] text-[#F7F5F0] ring-4 ring-[#E8E0D5]'
                        : 'bg-[#FFFFFF] text-[#8C8C80] border border-[#E8E0D5]'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : s.number}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider mt-2 transition-colors hidden sm:block ${
                      isCurrent
                        ? 'text-[#262622] font-semibold'
                        : isPassed
                        ? 'text-[#7A8069]'
                        : 'text-[#9E9B91]'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Views */}
        {step === 1 && (
          <StepService
            services={services}
            selectedServiceId={selectedService?.id || ''}
            onSelectService={(svc) => {
              setSelectedService(svc);
              setSelectedTime(''); // Reset time when service changes
            }}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && selectedService && (
          <StepDate
            selectedService={selectedService}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedTime(''); // Reset time when date changes
            }}
            availabilityRules={availabilityRules}
            blockedDates={blockedDates}
            settings={settings}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && selectedService && (
          <StepTime
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectTime={(t) => setSelectedTime(t)}
            settings={settings}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && selectedService && (
          <StepDetails
            selectedService={selectedService}
            formData={formData}
            onChangeFormData={handleUpdateFormData}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && selectedService && (
          <StepReview
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            formData={formData}
            settings={settings}
            onConfirmBooking={handleConfirmBooking}
            onEditStep={(targetStep) => setStep(targetStep)}
            onBack={() => setStep(4)}
            errorMessage={submitError}
          />
        )}
      </div>
    </div>
  );
};
