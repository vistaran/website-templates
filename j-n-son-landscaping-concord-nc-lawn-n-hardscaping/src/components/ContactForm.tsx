import React, { useState, useEffect } from "react";
import { Send, CheckCircle, AlertTriangle, Phone, Calendar } from "lucide-react";
import { BUSINESS_INFO, SERVICES } from "../data/content";

interface ContactFormProps {
  initialService?: string;
  prefilledArea?: number;
  prefilledAmount?: number;
  onClose?: () => void;
  isModal?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = "Precision Lawn Care & Maintenance",
  prefilledArea,
  prefilledAmount,
  onClose,
  isModal = false
}) => {
  // Input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState("");
  const [yardArea, setYardArea] = useState(prefilledArea ? prefilledArea.toString() : "");

  // Form submission states
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync prefilled data if it changes
  useEffect(() => {
    if (initialService) setService(initialService);
    if (prefilledArea) setYardArea(prefilledArea.toString());
    
    // Auto-append a helpful note to message if calculator amounts are passed
    if (prefilledArea && prefilledAmount) {
      setMessage(
        `Hi J & Son, I calculated my yard requirements using your online Sod Calculator:\n- Material: ${initialService}\n- Estimated Yard Area: ${prefilledArea} sq. ft.\n- Estimated Material Needed: ${prefilledAmount} units.`
      );
    }
  }, [initialService, prefilledArea, prefilledAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    // Validation
    const errors: string[] = [];
    if (!name.trim()) errors.push("Please enter your name.");
    if (!phone.trim()) errors.push("Please enter your phone number.");
    if (!email.trim() || !email.includes("@")) errors.push("Please enter a valid email address.");
    if (!service) errors.push("Please select a service type.");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit mock handler simulation (simulates network latency for perfect UI feel)
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className={`text-left ${isModal ? "p-0" : "bg-white border border-brand-sage rounded-3xl p-8 shadow-sm"}`}>
      {isSuccess ? (
        // SUCCESS STATE CARD
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-brand-leaf/10 text-brand-leaf flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-soil tracking-tight mb-4">
            Estimate request received!
          </h3>
          <p className="text-sm sm:text-base text-brand-soil/75 max-w-md mx-auto mb-8 leading-relaxed">
            Thank you, <strong className="font-semibold text-brand-moss">{name}</strong>. J. or his son will call you 
            shortly at <strong className="font-mono text-brand-leaf font-bold">{phone}</strong> to coordinate your free 
            in-person yard inspection.
          </p>

          <div className="w-full max-w-sm p-5 bg-brand-sage/20 border border-brand-sage rounded-2xl text-left mb-8">
            <h4 className="text-xs font-mono font-bold text-brand-soil/55 uppercase mb-3">
              YOUR SERVICE SUMMARY
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-brand-soil/85">
              <div className="flex justify-between">
                <span>Contact Name</span>
                <span className="font-semibold text-brand-moss">{name}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Service</span>
                <span className="font-semibold text-brand-moss text-right">{service}</span>
              </div>
              {yardArea && (
                <div className="flex justify-between">
                  <span>Estimated Yard Area</span>
                  <span className="font-mono font-bold text-brand-leaf">{yardArea} SQ. FT.</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Preferred Location</span>
                <span className="font-semibold text-brand-moss">Concord area</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex-1 py-3 border border-brand-leaf/30 text-brand-leaf font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-brand-sage/20 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call J &amp; Son Now</span>
            </a>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-brand-soil text-brand-cream font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brand-moss transition-colors"
              >
                Close Window
              </button>
            )}
          </div>
        </div>
      ) : (
        // FORM INPUT STATE
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Validation Error Banner */}
          {formErrors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 text-left">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-red-800 uppercase tracking-wide">
                  Please resolve the following:
                </h4>
                <ul className="list-disc pl-4 mt-1.5 text-xs text-red-700 flex flex-col gap-1">
                  {formErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Name & Phone in 1 row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Miller"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none text-sm text-brand-soil"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. (704) 555-0199"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none text-sm text-brand-soil font-mono"
              />
            </div>
          </div>

          {/* Email and Optional Yard Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none text-sm text-brand-soil"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                Estimated Yard Area (Optional Sq. Ft.)
              </label>
              <input
                type="number"
                value={yardArea}
                onChange={(e) => setYardArea(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none text-sm text-brand-soil font-mono"
              />
            </div>
          </div>

          {/* Service Dropdown Selector */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
              Select Your Landscaping Needs *
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none text-sm text-brand-soil font-medium"
            >
              <option value="Precision Lawn Care & Maintenance">Precision Lawn Care &amp; Maintenance</option>
              <option value="Premium Stone & Paver Hardscaping">Premium Stone &amp; Paver Hardscaping</option>
              <option value="Tree Services, Pruning & Hedging">Tree Services, Pruning &amp; Hedging</option>
              <option value="Sod Installation & Fall Seeding">Sod Installation &amp; Fall Seeding</option>
              <option value="Advanced Drainage & Grading Solutions">Advanced Drainage &amp; Grading Solutions</option>
              <option value="Custom Overall Landscape Design">Custom Overall Landscape Design</option>
            </select>
          </div>

          {/* Message / Details */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
              Tell us about your project or yard challenges
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Backyard has a steep incline causing mud pools near the fence. Interested in French drain solutions and fresh sod."
              className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none text-sm text-brand-soil resize-none leading-relaxed"
            />
          </div>

          {/* Submit button with submission state */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-2 bg-brand-leaf hover:bg-brand-moss text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Calendar className="w-4 h-4 animate-spin" />
                <span>Scheduling Estimate Request...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Submit Estimate Request</span>
              </>
            )}
          </button>

          <span className="text-[10px] font-mono text-brand-soil/45 text-center mt-2 block">
            J &amp; SON PRIVACY GUARANTEE: WE NEVER SHARE YOUR DATA.
          </span>

        </form>
      )}
    </div>
  );
};
