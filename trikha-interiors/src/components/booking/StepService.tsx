import React from 'react';
import { Service } from '../../types/booking';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface StepServiceProps {
  services: Service[];
  selectedServiceId: string;
  onSelectService: (service: Service) => void;
  onNext: () => void;
}

export const StepService: React.FC<StepServiceProps> = ({
  services,
  selectedServiceId,
  onSelectService,
  onNext
}) => {
  // Only active consultation services for the primary booking funnel
  const consultationServices = services.filter((s) => s.isActive);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
          Step 1 of 5
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
          Select Consultation Type
        </h2>
        <p className="text-sm text-[#66665E] leading-relaxed">
          Choose the consultation format that best complements your project scope, location, and timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
        {consultationServices.slice(0, 3).map((service) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`flex flex-col justify-between p-6 sm:p-7 border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-[#262622] bg-[#EFECE6] shadow-sm'
                  : 'border-[#E8E0D5] bg-[#FFFFFF] hover:border-[#7A8069]'
              }`}
            >
              {/* Active Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-3 right-5 bg-[#262622] text-[#F7F5F0] text-[10px] tracking-widest uppercase px-3 py-0.5">
                  Selected
                </div>
              )}

              <div>
                {/* Image Preview */}
                <div className="h-44 w-full overflow-hidden mb-5">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Header & Pricing */}
                <div className="flex items-baseline justify-between gap-2 border-b border-[#E8E0D5] pb-3 mb-4">
                  <h3 className="font-serif text-xl text-[#262622] font-medium leading-snug">
                    {service.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-serif font-semibold text-[#262622]">
                      {service.isFree ? 'Free' : `₹${service.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="block text-[11px] text-[#7A8069]">
                      {service.isFree ? 'Introductory' : 'Consultation Fee'}
                    </span>
                  </div>
                </div>

                {/* Duration & Tagline */}
                <div className="flex items-center gap-2 text-xs text-[#7A8069] mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.durationMinutes} minutes</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{service.consultationMethod.replace('_', ' ')}</span>
                </div>

                <p className="text-xs text-[#55554E] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Deliverables Bullet List */}
                <div className="space-y-1.5 pt-2 border-t border-[#E8E0D5]/70">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-medium block">
                    What is Included:
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#66665E]">
                      <CheckCircle2 className="w-3 h-3 text-[#7A8069] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-[#E8E0D5]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service);
                    onNext();
                  }}
                  className={`w-full py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36]'
                      : 'border border-[#262622] text-[#262622] hover:bg-[#262622] hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Continue with This' : 'Select Consultation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful note */}
      <div className="bg-[#EFECE6] border border-[#E8E0D5] p-4 text-center max-w-2xl mx-auto text-xs text-[#66665E]">
        <p>
          Consultation fees for Virtual or In-Home visits are credited in full toward your architectural project retainer should you proceed with Full-Service execution.
        </p>
      </div>
    </div>
  );
};
