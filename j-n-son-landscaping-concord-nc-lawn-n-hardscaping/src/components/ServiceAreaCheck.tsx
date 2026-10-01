import React, { useState } from "react";
import { MapPin, CheckCircle, AlertCircle, Phone } from "lucide-react";
import { BUSINESS_INFO } from "../data/content";

export const ServiceAreaCheck: React.FC = () => {
  const [zipInput, setZipInput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "outside">("idle");
  const [resolvedCity, setResolvedCity] = useState<string>("");

  const handleCheckArea = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    // Check if the ZIP is explicitly served
    const servedZips = BUSINESS_INFO.zipCodes;
    const isServed = servedZips.includes(cleanZip);

    if (isServed) {
      // Resolve a likely city based on the ZIP code for premium detail
      let city = "Concord";
      if (["28031", "28036", "28078"].includes(cleanZip)) {
        city = "Huntersville / Davidson";
      } else if (["28081", "28082", "28083"].includes(cleanZip)) {
        city = "Kannapolis";
      } else if (["28269", "28262"].includes(cleanZip)) {
        city = "North Charlotte";
      } else if (cleanZip === "28075") {
        city = "Harrisburg";
      }
      setResolvedCity(city);
      setStatus("success");
    } else {
      setStatus("outside");
    }
  };

  return (
    <section className="py-20 bg-brand-cream border-b border-brand-sage/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-brand-sage rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          
          <div className="w-12 h-12 rounded-full bg-brand-leaf/10 text-brand-leaf flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-soil tracking-tight mb-4">
            Do we service your Cabarrus or Mecklenburg neighborhood?
          </h3>
          <p className="text-sm sm:text-base text-brand-soil/75 max-w-xl mx-auto mb-8">
            We are based in Concord, NC and service a 20-mile radius across the north Charlotte area. 
            Enter your ZIP code below to see if we've got you covered.
          </p>

          <form onSubmit={handleCheckArea} className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => {
                  setZipInput(e.target.value.replace(/\D/g, "")); // Numbers only
                  setStatus("idle");
                }}
                placeholder="Enter 5-digit ZIP code (e.g. 28027)"
                className="flex-1 px-5 py-3.5 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none font-mono text-sm tracking-widest text-center sm:text-left"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-brand-leaf hover:bg-brand-moss text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0"
              >
                Check Coverage
              </button>
            </div>
          </form>

          {/* Interactive Status Alerts */}
          {status === "success" && (
            <div className="max-w-md mx-auto p-5 bg-brand-leaf/5 border border-brand-leaf/20 rounded-2xl text-left flex gap-4 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-brand-leaf shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-soil">Yes! You're in our active area</h4>
                <p className="text-xs text-brand-soil/75 mt-1 leading-relaxed">
                  J &amp; Son Landscaping regularly maintains lawns and designs patios in{" "}
                  <strong className="font-semibold text-brand-moss">{resolvedCity}</strong> ({zipInput}). 
                  We can schedule an in-person site discovery this week!
                </p>
              </div>
            </div>
          )}

          {status === "outside" && (
            <div className="max-w-md mx-auto p-5 bg-brand-clay/5 border border-brand-clay/20 rounded-2xl text-left flex gap-4 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-brand-clay shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-soil">Just outside our main loop</h4>
                <p className="text-xs text-brand-soil/75 mt-1 leading-relaxed">
                  We don't have weekly routes in your specific ZIP code yet, but if you're bordering Concord or Kannapolis, 
                  give us a call at <strong className="font-semibold">{BUSINESS_INFO.phone}</strong>. 
                  We often accommodate larger hardscaping and clearing projects outside our typical area.
                </p>
              </div>
            </div>
          )}

          {/* Service Area Map */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-brand-sage/60 shadow-sm relative h-[350px]">
            <iframe
              src="https://maps.google.com/maps?q=J%20%26%20Son%20Landscaping%20Concord%20NC&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="J & Son Landscaping Service Area Map"
              className="absolute inset-0"
            ></iframe>
          </div>

          {/* Muted list of primary cities served (Zero-Pill Discipline: unboxed text meta) */}
          <div className="pt-8 border-t border-brand-sage/60 mt-12">
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-soil/45 block mb-3">
              PRIMARY TOWNS &amp; TOWNSHIPS SERVED
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-brand-soil/70 font-medium">
              {BUSINESS_INFO.regions.map((region, idx) => (
                <React.Fragment key={region}>
                  <span>{region}</span>
                  {idx < BUSINESS_INFO.regions.length - 1 && (
                    <span aria-hidden="true" className="text-brand-clay">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
