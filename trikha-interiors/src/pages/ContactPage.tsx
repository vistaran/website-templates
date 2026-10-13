import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const STUDIO_EMAIL = 'contact@trikhainteriors.com';

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    scope: 'Residential Renovation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // This site is a static deployment with no backend, so there is nothing to
    // POST to. Hand the inquiry straight to the studio inbox in the visitor's
    // own mail client rather than faking a success state for an unsent message.
    const subject = `Studio inquiry \u2014 ${formData.scope} (${formData.name})`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || '\u2014'}`,
      `Project nature: ${formData.scope}`,
      '',
      formData.message
    ].join('\n');

    window.location.href =
      `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
          Connect With Us
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#262622]">
          Studio Inquiries
        </h1>
        <p className="text-base text-[#55554E] leading-relaxed font-light">
          We welcome residential, architectural, and commercial interior inquiries. Please visit our Ahmedabad studio or schedule a consultation.
        </p>
      </section>

      {/* Main Grid: Details + Inquiry Form */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#E8E0D5] p-8 sm:p-12 shadow-xs">
          {/* Studio Contact Details */}
          <div className="lg:col-span-5 space-y-8 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#E8E0D5] pb-8 lg:pb-0">
            <div>
              <h3 className="font-serif text-2xl text-[#262622] font-medium">
                Trikha Interiors Studio
              </h3>
              <p className="text-xs text-[#7A8069] mt-1">
                Shahibag · Ahmedabad
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#55554E]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7A8069] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#262622] block">Physical Studio Address</span>
                  <span>Y/8, Sujata Flats, Shahibag</span>
                  <span className="block font-medium text-[#262622]">Ahmedabad, Gujarat 380004</span>
                  <div className="pt-2">
                    <a
                      href="https://maps.app.goo.gl/PZYmV4TyLKRRoZWc6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#262622] text-[#F7F5F0] text-[11px] uppercase tracking-wider hover:bg-[#3D3D36] transition-colors"
                    >
                      <MapPin className="w-3 h-3 text-[#7A8069]" />
                      <span>Open in Google Maps ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#7A8069] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#262622] block">Studio Telephone</span>
                  <a href="tel:+919825012345" className="hover:text-[#262622] text-sm font-medium">
                    +91 98250 12345
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7A8069] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#262622] block">General & Client Correspondence</span>
                  <a href="mailto:contact@trikhainteriors.com" className="hover:text-[#262622]">
                    contact@trikhainteriors.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#7A8069] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#262622] block">Studio Operating Hours</span>
                  <span>Monday – Saturday: 9:30 AM – 7:00 PM IST</span>
                  <span className="block">Sunday: Closed for Studio Recess</span>
                </div>
              </div>
            </div>

            {/* Google Maps Visual Banner */}
            <div className="p-4 bg-[#F7F5F0] border border-[#E8E0D5] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-medium block">
                  Studio Location
                </span>
                <span className="text-[10px] text-[#7A8069]">Shahibag</span>
              </div>
              <p className="text-xs text-[#66665E] leading-relaxed">
                Located at Sujata Flats in Shahibag, Ahmedabad, accessible for client consultations and material reviews.
              </p>
              <a
                href="https://maps.app.goo.gl/PZYmV4TyLKRRoZWc6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#262622] font-medium underline hover:text-[#7A8069] inline-flex items-center gap-1"
              >
                <span>Navigate via Google Maps ↗</span>
              </a>
            </div>
              <button
                onClick={() => onNavigate('book')}
                className="pt-1 text-xs uppercase tracking-widest text-[#262622] font-medium inline-flex items-center gap-1.5 hover:text-[#7A8069] cursor-pointer"
              >
                <span>Launch Appointment Flow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#262622] font-medium">
                Send a Private Message
              </h3>
              <p className="text-xs text-[#7A8069] mt-1">
                Our client liaison typically replies within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#F2F7ED] border border-[#BBD4AC] text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#4A7A30] mx-auto" />
                <h4 className="font-serif text-xl text-[#262622]">Your Mail App Should Be Open</h4>
                <p className="text-xs text-[#55554E] max-w-sm mx-auto leading-relaxed">
                  Your inquiry is prepared and ready to send from your own email app. Nothing opened? Write to us
                  directly at{' '}
                  <a href={`mailto:${STUDIO_EMAIL}`} className="underline text-[#262622]">
                    {STUDIO_EMAIL}
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+919825012345" className="underline text-[#262622]">
                    +91 98250 12345
                  </a>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 text-xs uppercase tracking-wider border border-[#262622] text-[#262622] hover:bg-[#262622] hover:text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[#262622] font-medium mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Julianna Vance"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#262622] font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. j.vance@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[#262622] font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (212) 555-0198"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#262622] font-medium mb-1">
                      Project Nature
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622]"
                    >
                      <option value="Residential Renovation">Whole-Home Renovation</option>
                      <option value="Townhouse Restoration">Townhouse Restoration</option>
                      <option value="Kitchen and Bath">Kitchen & Bath Architecture</option>
                      <option value="Styling and Furniture">Furnishing & Styling</option>
                      <option value="Press and Media">Press / Editorial Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#262622] font-medium mb-1">
                    Your Message & Architectural Goals
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the property location, target timeline, or specific questions..."
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-sm text-[#262622] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#262622] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#3D3D36] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
