import React, { useState, useEffect } from 'react';
import { businessDetails } from '../data/content';
import { CheckCircle2, Send, Phone, Calendar, MapPin, Receipt, ShieldCheck, Clock } from 'lucide-react';

interface QuoteFormSectionProps {
  initialService?: string;
  calculatorData?: {
    sqFt: number;
    materialType: string;
    palletsOrYards: number;
    estimatedCost: string;
  } | null;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  initialService,
  calculatorData
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [billingPreference, setBillingPreference] = useState<'quickbooks' | 'monthly' | 'annual'>('quickbooks');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'hoa'>('residential');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: 'Charlotte',
    zip: '28214',
    notes: '',
    preferredTime: 'morning'
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedServices(prev => prev.includes(initialService) ? prev : [...prev, initialService]);
    }
  }, [initialService]);

  useEffect(() => {
    if (calculatorData) {
      if (!selectedServices.includes('sod-installation')) {
        setSelectedServices(prev => [...prev, 'sod-installation']);
      }
      setFormData(prev => ({
        ...prev,
        notes: `[Sod Calculator Estimate]: ${calculatorData.materialType} | Area: ${calculatorData.sqFt} sq ft | Est. Range: ${calculatorData.estimatedCost}`
      }));
    }
  }, [calculatorData]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate instantaneous local processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="quote" className="py-20 bg-white text-[#1a241e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">
            Free On-Site Property Assessment
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c2317] tracking-tight mt-1">
            Request Your Free Quote
          </h2>
          <p className="text-base text-neutral-600 mt-2 leading-relaxed">
            Provide your property details below. An experienced Charlotte landscaping supervisor will evaluate your property and provide an itemized written proposal.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#0c2317] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-emerald-900 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-700/40 text-amber-400 mx-auto flex items-center justify-center border-2 border-amber-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Estimate Request Received
              </span>
              <h3 className="font-display text-3xl font-bold">
                Thank you, {formData.name || 'valued client'}!
              </h3>
              <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                We have registered your property in the Charlotte dispatch queue. A team supervisor will contact you at <strong className="text-white">{formData.phone || '(704) 918-0398'}</strong> within 24 business hours to confirm your on-site measurement.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-white/10 rounded-2xl p-4 text-xs text-left space-y-2 border border-white/15">
              <div className="flex justify-between">
                <span className="text-neutral-400">Property:</span>
                <span className="font-semibold text-white">{formData.street || 'Charlotte, NC'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Billing Preference:</span>
                <span className="font-semibold text-amber-400 uppercase">{billingPreference} Billing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Company Hotline:</span>
                <span className="font-semibold text-white">(704) 918-0398</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Submit another request
              </button>
              <a
                href={`tel:${businessDetails.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0c2317] font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Dispatch Directly: (704) 918-0398</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-md">
            
            {calculatorData && (
              <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900 block">
                    Calculated Yard Estimate Included:
                  </span>
                  <span className="text-emerald-800">
                    {calculatorData.materialType} · Est. Total: {calculatorData.estimatedCost}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Select Services Needed */}
              <div>
                <label className="block text-sm font-bold text-[#0c2317] mb-2">
                  1. Select Service(s) Required
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'precision-mowing', label: 'Precision Lawn Mowing', desc: 'Weekly/bi-weekly diamond striping' },
                    { id: 'designer-landscaping', label: 'Designer Landscaping', desc: 'Custom beds, retaining walls & plants' },
                    { id: 'sod-installation', label: 'Lawn Installation / Sod', desc: 'Fescue, Bermuda & Zoysia rolls' },
                    { id: 'aeration-seeding', label: 'Core Aeration & Overseeding', desc: 'Compacted Carolina clay rejuvenation' },
                    { id: 'mulch-pine-straw', label: 'Mulch & Longleaf Pine Straw', desc: 'Fresh organic bed groundcover' },
                    { id: 'commercial-grounds', label: 'Commercial & HOA Contracts', desc: 'Turnkey grounds management' }
                  ].map((s) => {
                    const isChecked = selectedServices.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked 
                            ? 'bg-[#0c2317] text-white border-[#0c2317] shadow-sm' 
                            : 'bg-white text-neutral-800 hover:border-neutral-300 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{s.label}</span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${isChecked ? 'bg-amber-400 text-[#0c2317]' : 'border border-neutral-300'}`}>
                            {isChecked && '✓'}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-1 ${isChecked ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {s.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Billing & Property Arrangement (Highlighting Map Info!) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                <div>
                  <label className="block text-sm font-bold text-[#0c2317] mb-2">
                    2. Invoicing & Payment Preference
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'quickbooks', title: 'QuickBooks Online Auto-Pay', desc: 'Electronic invoice with 1-click card/bank payment' },
                      { id: 'monthly', title: 'Itemized Monthly Statements', desc: 'Flexible monthly billing by email or mail' },
                      { id: 'annual', title: 'Yearly Service Contract', desc: 'Predictable 12-month locked contract rate' }
                    ].map((b) => (
                      <label
                        key={b.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          billingPreference === b.id 
                            ? 'border-[#0c2317] bg-white ring-2 ring-[#0c2317]/10' 
                            : 'border-neutral-200 bg-white/70 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="billing"
                          checked={billingPreference === b.id}
                          onChange={() => setBillingPreference(b.id as any)}
                          className="mt-1 text-emerald-800 focus:ring-emerald-700"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-neutral-900">{b.title}</div>
                          <div className="text-neutral-500 text-[11px]">{b.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0c2317] mb-2">
                    3. Property Classification
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { id: 'residential', label: 'Residential' },
                      { id: 'commercial', label: 'Commercial' },
                      { id: 'hoa', label: 'HOA Grounds' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPropertyType(p.id as any)}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                          propertyType === p.id
                            ? 'bg-[#0c2317] text-white border-[#0c2317]'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Preferred On-Site Estimate Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-800 focus:ring-2 focus:ring-[#0c2317]/20"
                  >
                    <option value="morning">Morning (7:30 AM – 11:30 AM)</option>
                    <option value="afternoon">Early Afternoon (12:00 PM – 3:30 PM)</option>
                    <option value="evening">Late Afternoon / Evening (3:30 PM – 6:30 PM)</option>
                    <option value="saturday">Saturday Morning Consultation</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Contact & Charlotte Property Location */}
              <div className="pt-4 border-t border-neutral-200">
                <label className="block text-sm font-bold text-[#0c2317] mb-3">
                  4. Contact & Charlotte Property Address
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Thomas Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(704) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="thomas@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10915 Delsing Ct"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Notes, Property Details or Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe problem areas, gate codes, pet alerts, or specific landscape goals..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#0c2317] hover:bg-[#184632] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {submitting ? (
                    <span>Submitting Your Estimate Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Free On-Site Quote Request</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-neutral-500 mt-2">
                  🔒 We respect your privacy. No spam. You will only be contacted regarding your lawn care estimate.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
