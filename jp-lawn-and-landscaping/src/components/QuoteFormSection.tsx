import React, { useState, useEffect } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data/content';
import { Send, CheckCircle2, Phone, Sparkles, Upload, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface QuoteFormSectionProps {
  prefilledService?: string;
  prefilledNotes?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  prefilledService,
  prefilledNotes,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [timeline, setTimeline] = useState('As soon as possible');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      if (!selectedServices.includes(prefilledService)) {
        setSelectedServices(prev => [...prev, prefilledService]);
      }
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledNotes) {
      setNotes(prev => prev ? `${prev}\n${prefilledNotes}` : prefilledNotes);
    }
  }, [prefilledNotes]);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter(s => s !== title));
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please enter your name, phone number, and address.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section id="quote-section" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Trust & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast & 100% Free Estimates</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Get Your Custom Estimate in Hours
            </h2>

            <p className="text-stone-300 text-base leading-relaxed">
              Tell us about your property goals in Kannapolis, Concord, or nearby towns. We will review your address and send an itemized estimate or reach out to schedule an on-site visit.
            </p>

            {/* Quick Guarantees */}
            <div className="space-y-4 pt-4 border-t border-stone-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Same-Day Quote Turnaround</h4>
                  <p className="text-xs text-stone-400">Most lawn mowing and mulch requests are estimated the same day.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Zero High-Pressure Sales</h4>
                  <p className="text-xs text-stone-400">Honest advice from local NC landscapers. No hidden fees or recurring traps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Prefer to talk directly?</h4>
                  <p className="text-xs text-stone-400">
                    Call or text us anytime at <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-emerald-400 font-bold hover:underline">{BUSINESS_INFO.phone}</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-950 p-6 sm:p-9 rounded-3xl border border-stone-800 shadow-2xl">
              
              {isSubmitted ? (
                /* Success Screen */
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">
                      Quote Request Received!
                    </h3>
                    <p className="text-sm text-stone-300 max-w-md mx-auto">
                      Thank you, <strong>{name}</strong>! We've received your request for <strong>{address}</strong>. Our estimator will review your yard measurements and get back to you shortly at <strong>{phone}</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 max-w-sm mx-auto text-xs text-stone-400">
                    Questions right now? Call or text Joel at <br />
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-emerald-400 font-bold text-sm inline-block mt-1">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedServices([]);
                      setName('');
                      setPhone('');
                      setAddress('');
                      setNotes('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Service Multi-Select */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                      Select Services Needed (Click all that apply):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => {
                        const isSelected = selectedServices.includes(s.title);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleService(s.title)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-emerald-500 text-stone-950 font-bold shadow'
                                : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800'
                            }`}
                          >
                            <span>{s.title}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => toggleService('Other Custom Project')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedServices.includes('Other Custom Project')
                            ? 'bg-emerald-500 text-stone-950 font-bold'
                            : 'bg-stone-900 text-stone-300 border border-stone-800'
                        }`}
                      >
                        Other / Custom Project
                      </button>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(704) 490-1161"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Property Street Address (Kannapolis/Concord) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123 Main St, Kannapolis, NC"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Email Address (For itemized proposal)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Preferred Project Timeline:
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white focus:outline-none focus:border-emerald-500 text-sm"
                    >
                      <option value="As soon as possible">As soon as possible (Ready to start)</option>
                      <option value="Within the next 1-2 weeks">Within the next 1-2 weeks</option>
                      <option value="Next month">Next month / Planning ahead</option>
                      <option value="Just budgeting / curious">Just budgeting / gathering quotes</option>
                    </select>
                  </div>

                  {/* Notes / Yard Specs */}
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Project Notes, Yard Size or Special Instructions:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Back yard approximately 1,500 sq ft, want fresh Bermuda sod and 4 tree limbs trimmed away from the roof."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-stone-950 font-extrabold text-base shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Me My Free Estimate</span>
                  </button>

                  <p className="text-[11px] text-stone-400 text-center">
                    🔒 We respect your privacy. No spam. We only use your information to contact you regarding your lawn care request.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
