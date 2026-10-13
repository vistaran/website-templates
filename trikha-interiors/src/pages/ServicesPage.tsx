import React from 'react';
import { INITIAL_SERVICES } from '../data/initialData';
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  HelpCircle
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the difference between an Initial Consultation and Full-Service Design?',
      a: 'The Initial Consultation is an exploratory 30 to 60-minute meeting to discuss your scope, budget, architectural priorities, and determine if our studio is the right fit. Full-Service Design is our turnkey commitment where we oversee every aspect—from architectural drawings and contractor coordination to custom millwork fabrication and white-glove installation.'
    },
    {
      q: 'Do you work with projects outside of Ahmedabad?',
      a: 'Yes. We frequently undertake residential commissions across Gujarat (Gandhinagar, Vadodara, Surat) and metro cities nationwide. For remote clients seeking targeted advice, our Virtual Design Consultations provide comprehensive floorplan reviews and curated sourcing recommendations.'
    },
    {
      q: 'How does your studio handle procurement and trade pricing?',
      a: 'We maintain relationships with world-class artisans, stone quarries, and bespoke workrooms. When we procure furnishings, lighting, and textiles, we pass along substantial trade discounts, providing full transparency on all invoices with zero hidden markups.'
    },
    {
      q: 'Can the consultation fee be applied toward my project fee?',
      a: 'Yes. If you schedule a paid Virtual or In-Home Consultation and subsequently engage our studio for Full-Service Design or a multi-room renovation package, your consultation fee is credited 100% against your project retainer.'
    }
  ];

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] space-y-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
          Studio Practices
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#262622]">
          Our Services & Architecture
        </h1>
        <p className="text-base text-[#55554E] leading-relaxed font-light">
          From turnkey whole-home renovations to focused material studies, we offer calibrated design packages crafted to honor your residence and daily rituals.
        </p>
      </section>

      {/* Services Detailed List */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {INITIAL_SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              className={`bg-white border border-[#E8E0D5] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs ${
                isEven ? '' : ''
              }`}
            >
              {/* Image */}
              <div className={`lg:col-span-5 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Text & Deliverables */}
              <div className={`lg:col-span-7 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069]">
                    Package 0{index + 1} · {service.category}
                  </span>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-medium text-[#262622]">
                      {service.isFree ? 'Free' : `$${service.price}`}
                    </span>
                    <span className="text-[10px] text-[#7A8069] block">
                      {service.isFree ? 'Introductory Session' : 'Consultation Fee'}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#262622] font-medium">
                    {service.name}
                  </h2>
                  <p className="text-xs text-[#7A8069] mt-1 italic">{service.tagline}</p>
                </div>

                <p className="text-sm text-[#55554E] leading-relaxed">
                  {service.description}
                </p>

                {/* Scope & deliverables */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs uppercase tracking-wider text-[#262622] font-medium block">
                    What We Deliver:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#66665E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8069] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#7A8069]">
                    <span>Duration: <strong>{service.durationMinutes} mins</strong></span>
                    <span className="mx-2">·</span>
                    <span className="capitalize">Method: <strong>{service.consultationMethod.replace('_', ' ')}</strong></span>
                  </div>

                  <button
                    onClick={() => onNavigate('book')}
                    className="px-6 py-2.5 bg-[#262622] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#3D3D36] transition-colors flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book This Service</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Studio FAQ */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            Working with Trikha Interiors
          </h2>
        </div>

        <div className="space-y-4 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E8E0D5] transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-lg text-[#262622] font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A8069] shrink-0 transform transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#55554E] leading-relaxed border-t border-[#E8E0D5]/50 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6 pt-6">
        <div className="p-8 sm:p-12 bg-[#EFECE6] border border-[#E8E0D5] space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#262622]">
            Have an Upcoming Architectural Project?
          </h3>
          <p className="text-xs text-[#66665E] max-w-md mx-auto leading-relaxed">
            Schedule a complimentary 30-minute discovery consultation to discuss your floor plan and timeline.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="px-8 py-3 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
