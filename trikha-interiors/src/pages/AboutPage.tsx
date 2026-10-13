import React from 'react';
import { ArrowRight, Calendar, Compass, Feather, Sparkles, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const teamMembers = [
    {
      name: 'Julianna Vance',
      role: 'Founder & Principal Designer',
      bio: 'Trained at Rhode Island School of Design with 16 years leading high-profile residential transformations across New York and California. Her vision unites architectural clarity with textural warmth.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Henri Lindqvist',
      role: 'Director of Architecture & Millwork',
      bio: 'Originally from Stockholm, Henri brings Scandinavian minimalism and relentless millimeter precision to custom cabinetry, stone transitions, and structural space planning.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Clara Zhao',
      role: 'Senior Stylist & Art Curator',
      bio: 'Specializing in mid-century French antiques, rare ceramic forms, and tactile textiles. Clara bridges the relationship between historical collectibles and modern residential life.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const publications = [
    { outlet: 'Architectural Digest', feature: 'Top 100 Residential Studios', year: '2025' },
    { outlet: 'Elle Decor', feature: 'The Modern Organic Home Feature', year: '2024' },
    { outlet: 'Interior Design Magazine', feature: 'Best of Year: Historic Loft Restoration', year: '2025' },
    { outlet: 'Dwell Magazine', feature: 'Quiet Living: Spatial Studies', year: '2024' }
  ];

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] space-y-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
          About the Studio
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#262622]">
          Crafted With Intention
        </h1>
        <p className="text-base text-[#55554E] leading-relaxed font-light">
          Based in Shahibag, Ahmedabad, Trikha Interiors is an architectural interior design studio dedicated to cultivating serene, soulful domestic and commercial spaces.
        </p>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
              Honoring Space, Silence, and Natural Matter
            </h2>
            <p className="text-sm text-[#55554E] leading-relaxed">
              Trikha Interiors began as an antidote to disposable interior trends. We believe that true luxury is not defined by excess ornament, but by the quiet confidence of natural stone, handcrafted teak joinery, and light dancing across textured walls.
            </p>
            <p className="text-sm text-[#66665E] leading-relaxed">
              Over the last decade, our studio has guided discerning clients through private bungalows, luxury apartment residences, and penthouse sanctuaries across Gujarat and nationwide. We treat each residence as a singular architectural portrait—reflecting how you recharge, entertain, and find peace.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E8E0D5]">
              <div>
                <span className="font-serif text-2xl text-[#262622] block">Tactile First</span>
                <span className="text-xs text-[#7A8069]">Raw stones, unlacquered metals, and bespoke textiles.</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#262622] block">Client Intimacy</span>
                <span className="text-xs text-[#7A8069]">Limiting annual commissions to ensure absolute devotion.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Trikha Interiors studio workspace with materials and sketches"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Studio Team */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
            Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            The Studio Principals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-[#E8E0D5] p-6 space-y-4 hover:border-[#262622] transition-colors"
            >
              <div className="aspect-square overflow-hidden bg-[#262622]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#262622] font-medium">
                  {member.name}
                </h3>
                <span className="text-xs text-[#7A8069] block mt-0.5">
                  {member.role}
                </span>
              </div>

              <p className="text-xs text-[#66665E] leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Press & Publications */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A8069] font-medium">
            Recognition
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
            Editorial Features
          </h2>
          <span className="text-[11px] text-[#7A8069] block">
            Sample architectural journal publications
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {publications.map((pub, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E0D5] p-5 flex items-center justify-between"
            >
              <div>
                <span className="font-serif text-lg text-[#262622] font-medium block">
                  {pub.outlet}
                </span>
                <span className="text-xs text-[#7A8069]">{pub.feature}</span>
              </div>
              <span className="text-xs font-mono text-[#8C8C80]">{pub.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-4">
        <div className="p-8 sm:p-12 bg-[#262622] text-[#F7F5F0] space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl">
            Meet With Our Design Directors
          </h3>
          <p className="text-xs text-[#C8C5BC] max-w-md mx-auto leading-relaxed">
            Reserve an initial consultation to review your property blueprints and outline your architectural timeline.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="px-8 py-3 text-xs uppercase tracking-widest bg-[#F7F5F0] text-[#262622] hover:bg-white transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Studio Consultation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
