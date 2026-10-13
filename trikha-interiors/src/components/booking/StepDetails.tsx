import React, { useState } from 'react';
import { Appointment, ConsultationMethod, PropertyType, Service } from '../../types/booking';
import { ArrowRight, Lock, Check } from 'lucide-react';

export interface CustomerDetailsFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectLocation: string;
  propertyType: PropertyType;
  designAreas: string[];
  budgetRange: string;
  projectDescription: string;
  consultationMethod: ConsultationMethod;
}

interface StepDetailsProps {
  selectedService: Service;
  formData: CustomerDetailsFormData;
  onChangeFormData: (data: Partial<CustomerDetailsFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({
  selectedService,
  formData,
  onChangeFormData,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const propertyTypes: PropertyType[] = [
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Commercial',
    'Other'
  ];

  const availableAreas = [
    'Living Room',
    'Primary Bedroom',
    'Kitchen & Dining',
    'Primary Bathroom',
    'Powder Room',
    'Whole Residence',
    'Home Office / Library',
    'Outdoor / Terrace'
  ];

  const budgetRanges = [
    '₹15 Lakhs – ₹35 Lakhs',
    '₹35 Lakhs – ₹75 Lakhs',
    '₹75 Lakhs – ₹1.5 Crore',
    '₹1.5 Crore – ₹3 Crore',
    '₹3 Crore+'
  ];

  const toggleArea = (area: string) => {
    const current = [...formData.designAreas];
    const index = current.indexOf(area);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(area);
    }
    onChangeFormData({ designAreas: current });
    if (errors.designAreas && current.length > 0) {
      setErrors((prev) => ({ ...prev, designAreas: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please provide your full name.';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address.';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Please provide a contact phone number.';
    }

    if (!formData.projectLocation.trim()) {
      newErrors.projectLocation = 'Please provide the property city or ZIP code.';
    }

    if (formData.designAreas.length === 0) {
      newErrors.designAreas = 'Please select at least one area to design.';
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Please provide a short sentence about your goals.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
          Step 4 of 5
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
          Project & Client Details
        </h2>
        <p className="text-sm text-[#66665E] leading-relaxed">
          Tell us about your residence and aesthetic intentions so our team can prepare thoroughly for your consultation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white border border-[#E8E0D5] p-6 sm:p-9 shadow-xs space-y-6">
        {/* Contact info row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
              Full Name <span className="text-[#994D4D]">*</span>
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => {
                onChangeFormData({ customerName: e.target.value });
                if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
              }}
              placeholder="e.g. Eleanor Vance"
              className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border text-sm text-[#262622] placeholder-[#9E9B91] focus:outline-hidden focus:border-[#262622] transition-colors ${
                errors.customerName ? 'border-[#994D4D]' : 'border-[#E8E0D5]'
              }`}
            />
            {errors.customerName && (
              <p className="text-[11px] text-[#994D4D] mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
              Email Address <span className="text-[#994D4D]">*</span>
            </label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => {
                onChangeFormData({ customerEmail: e.target.value });
                if (errors.customerEmail) setErrors((prev) => ({ ...prev, customerEmail: '' }));
              }}
              placeholder="e.g. eleanor.vance@example.com"
              className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border text-sm text-[#262622] placeholder-[#9E9B91] focus:outline-hidden focus:border-[#262622] transition-colors ${
                errors.customerEmail ? 'border-[#994D4D]' : 'border-[#E8E0D5]'
              }`}
            />
            {errors.customerEmail && (
              <p className="text-[11px] text-[#994D4D] mt-1">{errors.customerEmail}</p>
            )}
          </div>
        </div>

        {/* Phone & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
              Phone Number (with Country Code) <span className="text-[#994D4D]">*</span>
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => {
                onChangeFormData({ customerPhone: e.target.value });
                if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: '' }));
              }}
              placeholder="+91 98250 44821"
              className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border text-sm text-[#262622] placeholder-[#9E9B91] focus:outline-hidden focus:border-[#262622] transition-colors ${
                errors.customerPhone ? 'border-[#994D4D]' : 'border-[#E8E0D5]'
              }`}
            />
            {errors.customerPhone && (
              <p className="text-[11px] text-[#994D4D] mt-1">{errors.customerPhone}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
              Project Location or City <span className="text-[#994D4D]">*</span>
            </label>
            <input
              type="text"
              value={formData.projectLocation}
              onChange={(e) => {
                onChangeFormData({ projectLocation: e.target.value });
                if (errors.projectLocation) setErrors((prev) => ({ ...prev, projectLocation: '' }));
              }}
              placeholder="e.g. Satellite, Ahmedabad 380015"
              className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border text-sm text-[#262622] placeholder-[#9E9B91] focus:outline-hidden focus:border-[#262622] transition-colors ${
                errors.projectLocation ? 'border-[#994D4D]' : 'border-[#E8E0D5]'
              }`}
            />
            {errors.projectLocation && (
              <p className="text-[11px] text-[#994D4D] mt-1">{errors.projectLocation}</p>
            )}
          </div>
        </div>

        {/* Property Type & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
              Type of Property
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => onChangeFormData({ propertyType: e.target.value as PropertyType })}
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622] focus:outline-hidden focus:border-[#262622]"
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
              Approximate Project Budget
            </label>
            <select
              value={formData.budgetRange}
              onChange={(e) => onChangeFormData({ budgetRange: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622] focus:outline-hidden focus:border-[#262622]"
            >
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferred Consultation Method */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-2">
            Preferred Consultation Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'in_person', label: 'In Person' },
              { id: 'video_call', label: 'Video Call' },
              { id: 'phone_call', label: 'Phone Call' }
            ].map((method) => {
              const isSelected = formData.consultationMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => onChangeFormData({ consultationMethod: method.id as ConsultationMethod })}
                  className={`py-2 px-3 border text-xs tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#262622] text-white border-[#262622]'
                      : 'bg-[#F7F5F0] text-[#66665E] border-[#E8E0D5] hover:border-[#7A8069]'
                  }`}
                >
                  {method.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Areas to Design Multi-select */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
            Areas to Design <span className="text-[#994D4D]">*</span>
          </label>
          <p className="text-[11px] text-[#7A8069] mb-2.5">
            Select all spaces included in your intended project scope:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableAreas.map((area) => {
              const checked = formData.designAreas.includes(area);
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className={`p-2.5 text-left border text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    checked
                      ? 'border-[#262622] bg-[#EFECE6] text-[#262622] font-medium'
                      : 'border-[#E8E0D5] bg-[#F7F5F0] text-[#66665E] hover:border-[#7A8069]'
                  }`}
                >
                  <span>{area}</span>
                  {checked && <Check className="w-3.5 h-3.5 text-[#262622] shrink-0" />}
                </button>
              );
            })}
          </div>
          {errors.designAreas && (
            <p className="text-[11px] text-[#994D4D] mt-1.5">{errors.designAreas}</p>
          )}
        </div>

        {/* Short Project Description */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#262622] font-medium mb-1.5">
            Short Project Description & Aspirations <span className="text-[#994D4D]">*</span>
          </label>
          <textarea
            rows={3}
            value={formData.projectDescription}
            onChange={(e) => {
              onChangeFormData({ projectDescription: e.target.value });
              if (errors.projectDescription) setErrors((prev) => ({ ...prev, projectDescription: '' }));
            }}
            placeholder="Tell us about the property, your preferred aesthetic references, architectural milestones, or specific challenges you wish to solve..."
            className={`w-full px-3.5 py-2.5 bg-[#F7F5F0] border text-sm text-[#262622] placeholder-[#9E9B91] focus:outline-hidden focus:border-[#262622] transition-colors resize-none ${
              errors.projectDescription ? 'border-[#994D4D]' : 'border-[#E8E0D5]'
            }`}
          />
          {errors.projectDescription && (
            <p className="text-[11px] text-[#994D4D] mt-1">{errors.projectDescription}</p>
          )}
        </div>

        {/* Privacy Note */}
        <div className="pt-2 flex items-center gap-2 text-[11px] text-[#7A8069]">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span>
            Privacy Notice: Your information is treated with strict studio confidentiality and is never shared with third parties.
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="pt-6 border-t border-[#E8E0D5] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 text-xs uppercase tracking-widest border border-[#262622] text-[#262622] hover:bg-[#E8E0D5] transition-colors cursor-pointer"
          >
            Back to Time
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Review & Confirm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
