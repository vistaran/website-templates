import React, { useState } from "react";
import { GALLERY_PROJECTS, GalleryProject } from "../data/content";
import { MapPin, ArrowRight, Eye, X } from "lucide-react";

interface GalleryProps {
  onSelectProject: (projectTitle: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);

  const filteredProjects = filter === "all"
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-24 bg-brand-cream border-b border-brand-sage/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
              02. REAL PROJECT PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-soil tracking-tight leading-tight">
              Recent outdoor transformations across Cabarrus &amp; Mecklenburg.
            </h2>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-brand-sage/40 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === "all"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              All Work ({GALLERY_PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter("hardscape")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === "hardscape"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Hardscapes
            </button>
            <button
              onClick={() => setFilter("lawn")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === "lawn"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Lawn &amp; Sod
            </button>
            <button
              onClick={() => setFilter("trees")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === "trees"
                  ? "bg-white text-brand-moss shadow-sm"
                  : "text-brand-soil/70 hover:text-brand-soil"
              }`}
            >
              Tree Care
            </button>
          </div>
        </div>

        {/* Gallery Grid of Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-brand-sage rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame with hover zoom & interactive click */}
              <div 
                className="relative h-64 w-full overflow-hidden cursor-pointer bg-brand-soil"
                onClick={() => setActiveModalProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-soil/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-brand-soil/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-brand-cream text-xs font-mono font-medium flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3 h-3 text-brand-clay" />
                  <span>{project.location}</span>
                </div>

                {/* Hover Eye Inspection Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 rounded-xl bg-brand-soil/90 text-brand-cream font-mono text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-brand-clay" />
                    Enlarge Photo
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 text-left flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-clay font-bold block mb-1.5">
                    {project.categoryLabel}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-brand-soil tracking-tight mb-2 group-hover:text-brand-leaf transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-soil/70 leading-relaxed mb-6">
                    {project.details}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-brand-sage/60 flex items-center justify-between mt-auto">
                  <span className="text-xs font-mono text-brand-soil/55 font-semibold">
                    Concord Area
                  </span>
                  <button
                    onClick={() => onSelectProject(project.title)}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-leaf hover:text-brand-clay transition-colors"
                  >
                    <span>Request Similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Photo Lightbox Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-soil/70 backdrop-blur-sm animate-fade-in">
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setActiveModalProject(null)} 
            />
            <div className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full z-10 shadow-2xl border border-brand-sage text-left animate-scale-up">
              
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-soil/80 hover:bg-brand-soil text-white transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-res Image View */}
              <div className="relative h-[320px] sm:h-[480px] w-full bg-brand-soil">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Details Bar */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-clay font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeModalProject.location}</span>
                    <span>•</span>
                    <span>{activeModalProject.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-soil tracking-tight">
                    {activeModalProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-soil/75 mt-1 max-w-xl">
                    {activeModalProject.details}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const title = activeModalProject.title;
                    setActiveModalProject(null);
                    onSelectProject(title);
                  }}
                  className="px-6 py-3.5 bg-brand-leaf hover:bg-brand-moss text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
