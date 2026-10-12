import React, { useState, useMemo } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject } from '../types';
import { ProjectModal } from './ProjectModal';
import { Sparkles, ArrowUpRight, Search } from 'lucide-react';

interface PortfolioGalleryProps {
  onBookConsultation: (projectTitle?: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onBookConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'residential', label: 'Private Residences' },
    { id: 'commercial', label: 'Executive Workspaces' },
    { id: 'retail', label: 'Boutiques & Retail' },
    { id: 'civil-renovation', label: 'Civil Restorations' }
  ];

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.specs.materials.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-20 lg:py-28 border-b border-[#E7E0D5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-2">
              Curated Spatial Monograph · 2014–2026
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
              Selected Works & Living Spaces
            </h2>
            <p className="text-sm sm:text-base text-[#59524A] mt-2 max-w-xl font-light">
              Explore bespoke residential duplexes, executive suites, and luxury showrooms engineered and styled across Ahmedabad.
            </p>
          </div>

          {/* Search box with interior design styling */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by marble, teak, locality..."
              className="w-full bg-[#FFFFFF] border border-[#DED6C9] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#24201D] placeholder-[#A3998C] focus:outline-none focus:border-[#8A6739] transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C8275] hover:text-[#1C1917]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#24201D] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#59524A] hover:text-[#1C1917] hover:bg-[#F5EFE6] border border-[#DED6C9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Bento Box & Masonry Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#DED6C9] rounded-2xl bg-[#FFFFFF]">
            <p className="text-[#736A5E] text-sm font-light">No interior projects found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-[#8A6739] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7">
            {filteredProjects.map((project, idx) => {
              const isLarge = project.featured && (idx === 0 || idx === 1);
              const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`${colSpan} group cursor-pointer relative bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5B8A5] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md`}
                >
                  {/* Image Container with editorial zoom */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#F5EFE6]">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-[#1C1917]/15 to-transparent" />

                    {/* Top tags */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="text-[11px] font-mono tracking-wider text-[#FAF8F5] bg-[#1C1917]/75 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                        {project.categoryLabel}
                      </span>

                      {project.comparison && (
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#FAF8F5] bg-[#8A6739]/90 px-3 py-1 rounded-full backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-[#EFE4D2]" />
                          <span>3D vs Reality</span>
                        </span>
                      )}
                    </div>

                    {/* Hover expand indicator */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-md">
                      <ArrowUpRight className="w-4 h-4 text-[#8A6739]" />
                    </div>
                  </div>

                  {/* Card Content & Zero-Pill Unboxed Metadata */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata with separators */}
                      <div className="flex items-center gap-2 text-xs text-[#8C8275] mb-2 font-mono">
                        <span>{project.location}</span>
                        <span aria-hidden="true" className="text-[#D5CABB]">·</span>
                        <span className="tabular-nums">{project.areaSqFt.toLocaleString()} sq.ft</span>
                        <span aria-hidden="true" className="text-[#D5CABB]">·</span>
                        <span className="tabular-nums">{project.year}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-light text-[#1C1917] group-hover:text-[#8A6739] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#59524A] mt-1.5 line-clamp-2 font-light leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Key materials hairline footer */}
                    <div className="mt-5 pt-3.5 border-t border-[#EFEAE2] flex items-center justify-between text-xs text-[#736A5E]">
                      <span className="truncate max-w-[240px] font-mono text-[11px]">
                        {project.specs.materials.slice(0, 2).join(' · ')}
                      </span>
                      <span className="text-[#8A6739] font-medium group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
                        View Study →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Inquire CTA strip */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#F5EFE6] border border-[#DED6C9] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917]">
              Envisioning your space in Ahmedabad?
            </h4>
            <p className="text-xs sm:text-sm text-[#59524A] mt-1.5 max-w-xl font-light leading-relaxed">
              Bring your builder floor plans or villa blueprints to our Chandkheda atelier at Orange Mall for a complimentary spatial review and material briefing.
            </p>
          </div>
          <button
            onClick={() => onBookConsultation()}
            className="px-6 py-3.5 text-xs sm:text-[13px] font-medium tracking-wide text-[#FAF8F5] bg-[#24201D] hover:bg-[#3D3732] rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-[#24201D]/10 active:scale-95"
          >
            Schedule Atelier Consultation
          </button>
        </div>
      </div>

      {/* Project Detail Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookConsultation={(title) => {
          setSelectedProject(null);
          onBookConsultation(title);
        }}
      />
    </section>
  );
};
