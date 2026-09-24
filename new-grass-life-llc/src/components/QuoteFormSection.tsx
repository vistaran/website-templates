import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Shield, Calendar, Sparkles, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { QuoteFormData } from '../types';

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
    zipCode: '28262',
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
      zipCode: '28262',
      serviceType: 'Sod Installation',
      propertySize: '1/4 to 1/2 Acre',
      timeline: 'Within 1-2 Weeks',
      message: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact-quote" className="py-20 bg-[#F9FBFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-bold text-[#55AD4B] tracking-wider uppercase mb-2">
            Free No-Obligation Estimate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D5A27] tracking-tight mb-4 font-heading">
            Get Your Free Charlotte Lawn Quote
          </h2>
          <p className="text-base sm:text-lg text-[#4A4238] leading-relaxed">
            Tell us about your property and lawn care needs. We will inspect your requirements and respond
            within 24 hours with an upfront, transparent estimate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Direct Call & Highlights (5 cols) */}
          <div className="md:col-span-5 bg-[#2D5A27] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55AD4B] bg-white/10 px-3 py-1 rounded-md uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Response
              </div>

              <h3 className="text-2xl font-bold font-heading mb-4 leading-snug">
                Prefer to speak with our crew directly?
              </h3>

              <p className="text-sm text-[#EBF7E9]/90 mb-8 leading-relaxed">
                Give us a quick call or text with your address and photos for immediate assistance during business hours.
              </p>

              {/* Direct Action Card */}
              <div className="space-y-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#55AD4B] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 font-medium uppercase">Direct Phone</div>
                    <div className="text-lg font-bold">{BUSINESS_INFO.phone}</div>
                  </div>
                </a>

                <div className="p-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#55AD4B] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 font-medium uppercase">Hours</div>
                    <div className="text-sm font-semibold">{BUSINESS_INFO.hours.weekdays}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#55AD4B] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 font-medium uppercase">HQ Base</div>
                    <div className="text-sm font-semibold">Charlotte, NC 28262</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/15 mt-8 flex items-center gap-2 text-xs text-emerald-200">
              <Shield className="w-4 h-4 text-[#55AD4B] shrink-0" />
              <span>No spam. Your info is only used to schedule your quote.</span>
            </div>
          </div>

          {/* Right Column: The Lead Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#EBF7E9] text-[#2D5A27] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#55AD4B]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#2D5A27] font-heading mb-3">
                  Quote Request Received!
                </h3>
                <p className="text-base text-[#4A4238] max-w-md mx-auto mb-6 leading-relaxed">
                  <strong>Thank you! We'll be in touch within 24 hours to schedule your estimate.</strong>
                </p>
                <p className="text-xs text-[#4A4238]/70 max-w-xs mb-8">
                  For emergency inquiries or urgent sod laying schedules, feel free to call us directly at{' '}
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-bold text-[#2D5A27] underline">
                    {BUSINESS_INFO.phone}
                  </a>.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Another Project
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="border-b border-gray-100 pb-3 mb-2">
                  <h4 className="font-bold text-lg text-[#2D5A27] font-heading">
                    Project & Property Information
                  </h4>
                  <span className="text-xs text-[#4A4238]/70">
                    Fill out the details below for a customized written proposal.
                  </span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                          : 'border-gray-300 focus:ring-[#2D5A27]'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. (980) 555-0123"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                          : 'border-gray-300 focus:ring-[#2D5A27]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                    Email Address (Optional for written quote)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>

                {/* Service Address & Zip Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                      Service Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address in Charlotte area"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        errors.address
                          ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                          : 'border-gray-300 focus:ring-[#2D5A27]'
                      }`}
                    />
                    {errors.address && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="28262"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                  </div>
                </div>

                {/* Service Type Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                    Primary Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} {s.isSpecialty ? '★ (Signature Specialty)' : ''}
                      </option>
                    ))}
                    <option value="Full Yard Makeover">Full Yard Makeover (Sod + Mulch + Design)</option>
                    <option value="Other Custom Request">Other Custom Lawn Service</option>
                  </select>
                </div>

                {/* Property Size & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                      Approximate Yard Size
                    </label>
                    <select
                      value={formData.propertySize}
                      onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    >
                      <option value="Townhouse / Small Yard (Under 1,500 sq ft)">Townhouse / Compact (Under 1,500 sq ft)</option>
                      <option value="1/4 to 1/2 Acre">Standard Suburban (1/4 to 1/2 Acre)</option>
                      <option value="1/2 to 1 Acre">Medium Property (1/2 to 1 Acre)</option>
                      <option value="1+ Acre Estate">Large Estate (1+ Acre)</option>
                      <option value="Not Sure">Not Sure (Need Assessment)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    >
                      <option value="ASAP / This Week">ASAP / Urgent</option>
                      <option value="Within 1-2 Weeks">Within 1–2 Weeks</option>
                      <option value="Next Month / Planning Ahead">Next Month / Planning Ahead</option>
                      <option value="Flexible">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                {/* Message / Project Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4238] mb-1">
                    Project Details / Yard Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about existing shade, red clay soil conditions, gate widths, or specific goals..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2D5A27] hover:bg-[#1F3F1B] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Free Quote Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
