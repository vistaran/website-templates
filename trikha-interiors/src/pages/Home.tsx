import React from 'react';
import {
  DESIGN_PROCESS_STEPS,
  PORTFOLIO_PROJECTS,
  INITIAL_SERVICES,
  TESTIMONIALS
} from '../data/initialData';
import {
  ArrowRight,
  Calendar,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Quote
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProject?: (projectId: string) => void;
}

export const Home: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 sm:px-8 lg:px-12 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium">
              <span>Architectural Interior Studio</span>
              <span aria-hidden="true">·</span>
              <span>Ahmedabad</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#262622] leading-[1.12] font-normal tracking-tight">
              Spaces That Feel Like Home.{' '}
              <span className="italic font-light block mt-1">Designed to Inspire.</span>
            </h1>

            <p className="text-base text-[#55554E] leading-relaxed max-w-xl font-sans font-light">
              Thoughtful interior design for modern living. We create timeless, personal spaces that balance beauty, comfort, and functionality through natural materials, custom millwork, and refined stone inlay craftsmanship.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('book')}
                className="px-8 py-3.5 text-xs uppercase tracking-widest bg-[#262622] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4 opacity-80" />
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="px-8 py-3.5 text-xs uppercase tracking-widest border border-[#262622] text-[#262622] hover:bg-[#E8E0D5] transition-colors flex items-center justify-center cursor-pointer"
              >
                Explore Our Work
              </button>
            </div>

            {/* Subtle editorial trust badge */}
            <div className="pt-6 border-t border-[#E8E0D5] flex items-center gap-6 text-xs text-[#7A8069]">
              <div>
                <span className="font-serif text-lg font-medium text-[#262622] block">12+</span>
                <span>Years of Studio Craft</span>
              </div>
              <div className="h-7 w-[1px] bg-[#E8E0D5]" />
              <div>
                <span className="font-serif text-lg font-medium text-[#262622] block">120+</span>
                <span>Residential Sanctuaries</span>
              </div>
              <div className="h-7 w-[1px] bg-[#E8E0D5]" />
              <div>
                <span className="font-serif text-lg font-medium text-[#262622] block">Satellite, Ahmedabad</span>
                <span>Titanium City Center</span>
              </div>
            </div>
          </div>

          {/* Hero Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/5 w-full overflow-hidden shadow-md relative">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
                alt="Contemporary minimalist luxury living room with travertine fireplace and tailored seating"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-radial from-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Overlapping editorial card */}
            <div className="hidden sm:block absolute -bottom-6 -left-8 bg-white border border-[#E8E0D5] p-5 shadow-lg max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#7A8069] block font-medium">
                Featured Residence
              </span>
              <p className="font-serif text-base text-[#262622] font-medium mt-0.5">
                The Modern Organic Residence
              </p>
              <span className="text-[11px] text-[#7A8069] block mt-1">
                Italian Marble Inlay & Teakwood Joinery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STUDIO INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-3/4 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Atelier material study with neutral textiles, stone slabs, and brass finishes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium">
              Studio Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#262622] leading-tight font-normal">
              Designing With Intention.{' '}
              <span className="italic block">Living With Beauty.</span>
            </h2>
            <p className="text-base text-[#55554E] leading-relaxed font-light">
              At Trikha Interiors, we believe great architecture is an extension of who you are. We reject fleeting social media trends in favor of timeless proportions, honest materiality, and spaces that breathe.
            </p>
            <p className="text-sm text-[#66665E] leading-relaxed">
              Every curve of custom millwork, every honed slab of Calacatta marble, and every soft pool of illumination is composed with a single purpose: to turn your private dwelling into an enduring refuge of calm and personal inspiration.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#262622] border-b border-[#262622] pb-1 hover:text-[#7A8069] hover:border-[#7A8069] transition-colors cursor-pointer group"
              >
                <span>Read About Our Philosophy & Team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED SERVICES */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E0D5]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
              Architectural Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#262622] mt-1">
              Bespoke Design Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs uppercase tracking-widest text-[#262622] hover:text-[#7A8069] inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>View All Service Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-white border border-[#E8E0D5] p-6 sm:p-7 hover:border-[#262622] transition-colors"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden mb-5">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#7A8069] mb-2">
                  <span>0{index + 1}</span>
                  <span>{service.isFree ? 'Free Consultation' : `$${service.price}`}</span>
                </div>

                <h3 className="font-serif text-xl text-[#262622] font-medium mb-2 group-hover:text-[#7A8069] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-[#66665E] leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5] flex items-center justify-between">
                <span className="text-[11px] text-[#7A8069]">
                  {service.durationMinutes} mins · {service.consultationMethod.replace('_', ' ')}
                </span>
                <button
                  onClick={() => onNavigate('book')}
                  className="text-xs uppercase tracking-wider text-[#262622] font-medium hover:text-[#7A8069] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ASYMMETRIC PORTFOLIO SHOWCASE */}
      <section className="bg-[#EFECE6] py-24 border-y border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCD5C8]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
                Selected Commissions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#262622] mt-1">
                Featured Architecture & Interiors
              </h2>
              <span className="text-[11px] text-[#7A8069] block mt-1">
                Sample studio projects presented for client review
              </span>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-xs uppercase tracking-widest text-[#262622] hover:text-[#7A8069] inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {PORTFOLIO_PROJECTS.slice(0, 4).map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onNavigate('portfolio')}
                className={`group cursor-pointer ${idx % 2 === 1 ? 'md:mt-12' : ''}`}
              >
                <div className="aspect-4/3 overflow-hidden bg-[#262622] mb-5 shadow-sm">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 text-xs text-[#7A8069]">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#262622] font-medium group-hover:text-[#7A8069] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#66665E] leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DESIGN PROCESS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium">
            Our Method
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            The Four-Phase Design Process
          </h2>
          <p className="text-xs text-[#66665E]">
            A transparent, collaborative journey from first sketches to the day we hand over your keys.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESIGN_PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 bg-white border border-[#E8E0D5] flex flex-col justify-between space-y-4 hover:border-[#262622] transition-colors"
            >
              <div className="space-y-3">
                <span className="font-serif text-3xl text-[#7A8069] font-light block">
                  {step.step}
                </span>
                <h3 className="font-serif text-xl text-[#262622] font-medium">
                  {step.name}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#7A8069] block font-medium">
                  {step.tagline}
                </span>
                <p className="text-xs text-[#66665E] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5]/70 text-[10px] text-[#7A8069] flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#7A8069]" />
                <span>Documented milestone deliverables</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS (CLEANLY LABELED DEMO CONTENT) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium">
            Client Perspectives
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            Words from Our Patrons
          </h2>
          <span className="text-[11px] text-[#7A8069] block">
            Sample client praise provided for demonstration purposes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#E8E0D5] p-6 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <Quote className="w-5 h-5 text-[#7A8069] opacity-60" />
                <p className="text-xs text-[#44443E] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5] text-xs">
                <span className="font-medium text-[#262622] block font-serif text-sm">
                  {t.author}
                </span>
                <span className="text-[11px] text-[#7A8069] block mt-0.5">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL EDITORIAL CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-[#262622] text-[#F7F5F0] p-10 sm:p-16 lg:p-20 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A6ADA0] font-medium block">
              Begin Your Project
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal">
              Let's Create a Space That Feels Like You.
            </h2>

            <p className="text-sm text-[#C8C5BC] leading-relaxed font-light">
              Whether you are conceptualizing a historic townhouse restoration or looking for targeted spatial guidance, our studio team is here to listen.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('book')}
                className="px-8 py-3.5 text-xs uppercase tracking-widest bg-[#F7F5F0] text-[#262622] hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Your Consultation</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 text-xs uppercase tracking-widest border border-[#7A8069] text-[#F7F5F0] hover:bg-[#3D3D36] transition-colors flex items-center justify-center cursor-pointer"
              >
                Direct Studio Inquiries
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
              alt="Architectural details"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
