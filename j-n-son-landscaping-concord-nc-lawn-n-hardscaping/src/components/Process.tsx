import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  desc: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "In-Person Site Discovery",
    desc: "We visit your Concord or Charlotte area property to inspect soil composition, map drainage lines, take grading measurements, and discuss your visual ideas."
  },
  {
    number: "02",
    title: "Clear, Itemized Estimates",
    desc: "Within 24 hours, you receive a transparent, comprehensive cost sheet. No hidden surcharges, no surprise fees, and a clear timeline for the crew."
  },
  {
    number: "03",
    title: "Precision Execution",
    desc: "Our family-run crew coordinates machinery, grades base sand, lays sod, or shapes hedges with exceptional attention to straight lines and structural alignment."
  },
  {
    number: "04",
    title: "Final Yard Walkthrough",
    desc: "We tour the completed site together. We walk you through watering plans, care advice, and don't load our truck until you are completely thrilled."
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-brand-cream border-b border-brand-sage/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
            04. OUR PATHWAY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-soil tracking-tight mb-5 leading-tight">
            How we deliver beautiful Carolina yards.
          </h2>
          <p className="text-base text-brand-soil/75 font-normal leading-relaxed">
            A beautiful lawn or stone paver patio shouldn't come with stressful guesswork. 
            We maintain a clear, honest, family-run workflow from first sight to final walkthrough.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div 
              key={step.number} 
              className="group flex flex-col justify-between p-6 bg-white border border-brand-sage rounded-2xl hover:border-brand-leaf/30 transition-all duration-300"
            >
              <div>
                {/* Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-extrabold text-brand-clay tracking-widest">
                    STEP {step.number}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-brand-sage group-hover:text-brand-leaf transition-colors" />
                </div>

                <h3 className="text-lg font-serif font-bold text-brand-soil mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-soil/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Decorative base bar */}
              <div className="w-full h-1 bg-brand-sage/30 rounded-full mt-6 overflow-hidden">
                <div className="w-0 h-full bg-brand-leaf group-hover:w-full transition-all duration-500 ease-out" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
