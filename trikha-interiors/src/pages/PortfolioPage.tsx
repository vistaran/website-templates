import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/initialData';
import { ProjectItem } from '../types/booking';
import { X, ArrowRight, Calendar, MapPin, Layers, Sparkles } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full Residential', 'Penthouse & Loft', 'Kitchen & Bath'];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
          Studio Archive
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#262622]">
          Selected Portfolio
        </h1>
        <p className="text-base text-[#55554E] leading-relaxed font-light">
          An editorial curation of residential architectures, historic loft restorations, and bespoke kitchen sanctuaries designed across the United States.
        </p>

        {/* Fictional sample work disclosure */}
        <div className="pt-2">
          <span className="inline-block text-[11px] text-[#7A8069] bg-[#EFECE6] border border-[#E8E0D5] px-3 py-1">
            Note: All featured residences represent curated conceptual studio casework.
          </span>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E8E0D5] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#262622] text-[#F7F5F0]'
                  : 'bg-white text-[#66665E] border border-[#E8E0D5] hover:border-[#262622]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white border border-[#E8E0D5] overflow-hidden cursor-pointer hover:border-[#262622] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-4/3 overflow-hidden bg-[#262622]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#7A8069]">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#262622] font-medium group-hover:text-[#7A8069] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#66665E] leading-relaxed line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="text-xs uppercase tracking-wider text-[#262622] font-medium inline-flex items-center gap-1 group-hover:text-[#7A8069]">
                  <span>Explore Project Brief</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8E0D5] max-w-4xl w-full p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 space-y-8">
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 text-[#7A8069] hover:text-[#262622] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-12 border-b border-[#E8E0D5] pb-6">
              <div className="flex items-center gap-2 text-xs text-[#7A8069] uppercase tracking-wider">
                <span>{selectedProject.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.location}</span>
                <span aria-hidden="true">·</span>
                <span>Completed {selectedProject.year}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#262622]">
                {selectedProject.title}
              </h2>
              <p className="text-sm text-[#7A8069] italic">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-16/9 overflow-hidden">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {selectedProject.gallery.map((img, i) => (
                  <div key={i} className="aspect-4/3 overflow-hidden">
                    <img
                      src={img}
                      alt={`${selectedProject.title} view ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description & Scope */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-[#262622]">
              <div className="md:col-span-8 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-[#7A8069] font-medium">
                  Architectural Narrative
                </h4>
                <p className="text-sm text-[#55554E] leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-wider text-[#7A8069] font-medium mb-1">
                    Scope of Work
                  </h4>
                  <p className="text-xs text-[#66665E] leading-relaxed">
                    {selectedProject.scope}
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 bg-[#F7F5F0] border border-[#E8E0D5] p-5 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-[#7A8069] font-medium border-b border-[#E8E0D5] pb-2">
                  Material Palette
                </h4>
                <div className="space-y-1.5">
                  {selectedProject.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#44443E]">
                      <span className="w-1.5 h-1.5 bg-[#7A8069] rounded-full" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E8E0D5]">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onNavigate('book');
                    }}
                    className="w-full py-2.5 bg-[#262622] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#3D3D36] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Inquire for Similar Space</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
