import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Shield, Calendar, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';

interface QuoteFormSectionProps {
  initialService?: string;
  initialMessage?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  initialService = 'Routine Lawn Mowing & Striping',
  initialMessage = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(initialService);
  const [notes, setNotes] = useState(initialMessage);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) setNotes(initialMessage);
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and phone number so we can reach you.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Hand the enquiry to the crew's inbox. This previously only flipped a local
    // "submitted" flag, so the visitor saw a success message while the request
    // reached nobody.
    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      email.trim() ? `Email: ${email}` : '',
      `Service needed: ${service}`,
      address.trim() ? `Property address: ${address}` : '',
      notes.trim() ? `Details: ${notes}` : '',
      '',
      'Sent from the G & T Lawn Care website quote form.',
    ].filter(Boolean).join('\n');

    const mailto =
      `mailto:${BUSINESS_INFO.email}` +
      `?subject=${encodeURIComponent(`Free lawn quote request — ${name}`)}` +
      `&body=${encodeURIComponent(lines)}`;

    window.location.href = mailto;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact-quote" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            Free No-Obligation Estimate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022c22] tracking-tight mb-4 font-heading">
            Get Your Free Gastonia Lawn Quote
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tell us about your property and lawn mowing needs. We inspect your yard and respond promptly with a fair, upfront price.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-emerald-900/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Direct Call & Highlights (5 cols) */}
          <div className="lg:col-span-5 bg-[#022c22] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-md uppercase tracking-wider mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                Prompt Response
              </div>

              <h3 className="text-2xl font-black font-heading mb-4 leading-snug">
                Prefer to speak with our crew directly?
              </h3>

              <p className="text-sm text-emerald-100/90 mb-8 leading-relaxed">
                Give us a quick call or text with your address for immediate route scheduling during business hours.
              </p>

              {/* Direct Action Cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Direct Phone</div>
                    <div className="text-lg font-black text-white">{BUSINESS_INFO.phone}</div>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Operating Hours</div>
                    <div className="text-sm font-bold text-white">{BUSINESS_INFO.hours.display}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Base Location</div>
                    <div className="text-sm font-bold text-white">{BUSINESS_INFO.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-emerald-800/80 mt-8 flex items-center gap-2 text-xs text-emerald-200/80">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>No spam. Your contact info is strictly used to coordinate your estimate.</span>
            </div>
          </div>

          {/* Right Column: The Lead Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 bg-[#f8fafc] flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-black text-[#022c22] font-heading mb-2">
                  Estimate Request Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{name}</strong>. G & T Lawn Care will review your yard details and contact you at <strong className="text-emerald-800 font-bold">{phone}</strong> shortly.
                </p>

                <div className="p-4 bg-white rounded-2xl border border-emerald-200/80 text-left max-w-sm mx-auto mb-6 text-xs text-slate-700 space-y-1.5 shadow-2xs">
                  <div><strong>Selected Service:</strong> {service}</div>
                  {address && <div><strong>Property Address:</strong> {address}</div>}
                  <div><strong>Status:</strong> Route Scheduled for Review</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="btn-vibrant btn-primary py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call G & T Now: {BUSINESS_INFO.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setNotes('');
                    }}
                    className="py-3 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-[#022c22] mb-1 font-heading tracking-tight">
                    Schedule Your Free Estimate
                  </h3>
                  <p className="text-sm text-slate-600">
                    Fill out the form below or call us for same-day scheduling.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Miller"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(704) 555-0199"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Property Address or Neighborhood
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 940 Etta Pl or Gastonia / Belmont"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Service Needed
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] text-sm text-slate-900 font-medium"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Tell Us About Your Yard Needs
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Front and backyard mowing, need sidewalk blade edging, or interested in a spring yard cleanup..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] text-sm text-slate-900 resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-vibrant btn-primary w-full py-4 rounded-xl text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Free Quote Request</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-slate-500 pt-1 font-medium">
                    Or call/text <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-bold text-emerald-800 underline">{BUSINESS_INFO.phone}</a> for immediate service.
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
