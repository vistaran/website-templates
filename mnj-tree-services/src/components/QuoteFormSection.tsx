import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Shield, Calendar, Sparkles, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { QuoteFormData } from '../types';
import BookingCalendar from './BookingCalendar';

interface QuoteFormSectionProps {
  initialService?: string;
  initialMessage?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  initialService,
  initialMessage,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    zipCode: '28273',
    serviceType: initialService || 'Sod Installation',
    propertySize: '1/4 to 1/2 Acre',
    timeline: 'Within 1-2 Weeks',
    message: initialMessage || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  // Sync if initial props change (e.g. from Calculator or Service click)
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n\n${initialMessage}` : initialMessage,
      }));
    }
  }, [initialMessage]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Service property address is required.';
    }

    if (!formData.zipCode.trim() || formData.zipCode.trim().length < 5) {
      newErrors.zipCode = 'Valid 5-digit zip code required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate instant local state management or Formspree integration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      zipCode: '28273',
      serviceType: 'Sod Installation',
      propertySize: '1/4 to 1/2 Acre',
      timeline: 'Within 1-2 Weeks',
      message: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact-quote" className="py-20 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-bold text-[#6B9E4B] tracking-wider uppercase mb-2">
            Free No-Obligation Estimate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183D22] tracking-tight mb-4 font-heading">
            Get Your Free Charlotte Lawn Quote
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            Tell us about your property and lawn care needs. We will inspect your requirements and respond
            within 24 hours with an upfront, transparent estimate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Direct Call & Highlights (5 cols) */}
          <div className="md:col-span-5 bg-[#183D22] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B9E4B] bg-white/10 px-3 py-1 rounded-md uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Response
              </div>

              <h3 className="text-2xl font-bold font-heading mb-4 leading-snug">
                Prefer to speak with our crew directly?
              </h3>

              <p className="text-sm text-[#F2FAF0]/90 mb-8 leading-relaxed">
                Give us a quick call or text with your address and photos for immediate assistance during business hours.
              </p>

              {/* Direct Action Card */}
              <div className="space-y-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6B9E4B] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 font-medium uppercase">Direct Phone</div>
                    <div className="text-lg font-bold">{BUSINESS_INFO.phone}</div>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#6B9E4B] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 font-medium uppercase">Hours</div>
                    <div className="text-sm font-semibold">{BUSINESS_INFO.hours.weekdays}</div>
                  </div>
                </div>

                <a 
                  href="https://maps.google.com/?q=Charlotte,+NC+28273" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6B9E4B] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 font-medium uppercase">HQ Base</div>
                    <div className="text-sm font-semibold text-white">Charlotte, NC 28273</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/15 mt-8 flex items-center gap-2 text-xs text-emerald-200">
              <Shield className="w-4 h-4 text-[#6B9E4B] shrink-0" />
              <span>No spam. Your info is only used to schedule your quote.</span>
            </div>
          </div>

          {/* Right Column: The Lead Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-10 bg-slate-50 flex flex-col justify-center">
            <div className="mb-8 text-center sm:text-left max-w-lg mx-auto w-full">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#183D22] mb-3 font-heading tracking-tight">
                Schedule Your Free Consultation
              </h3>
              <p className="text-sm sm:text-base text-[#333333]/80 leading-relaxed">
                Pick a date and time that works best for you, and our team will come out to assess your yard and provide a custom quote.
              </p>
            </div>
            <div className="w-full flex justify-center pb-4">
              <BookingCalendar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
