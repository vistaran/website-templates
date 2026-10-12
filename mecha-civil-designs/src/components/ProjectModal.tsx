import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onBookConsultation: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onBookConsultation
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonSlider, setComparisonSlider] = useState(50);

  useEffect(() => {
    setActiveImageIndex(0);
    setShowComparison(false);
    setComparisonSlider(50);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const allImages = [project.coverImage, ...(project.additionalImages || [])];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#DED6C9] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#24201D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E0D5] bg-[#FFFFFF]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8A6739] font-mono">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true" className="text-[#C5B8A5]">/</span>
              <span>{project.location}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917] tracking-tight">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onBookConsultation(project.title)}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-medium text-[#FAF8F5] bg-[#24201D] hover:bg-[#3D3732] rounded-full transition-colors cursor-pointer items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#CBB38D]" />
              <span>Inquire For My Space</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#736A5E] hover:text-[#1C1917] hover:bg-[#F5EFE6] rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Visual Showcase or 3D/Reality Comparison */}
          <div>
            {project.comparison && (
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#8C8275] uppercase tracking-wider">
                  Visual Documentation
                </span>
                <div className="flex items-center gap-1 bg-[#F5EFE6] p-1 rounded-full border border-[#DED6C9] text-xs">
                  <button
                    onClick={() => setShowComparison(false)}
                    className={`px-3.5 py-1 rounded-full transition-colors cursor-pointer ${
                      !showComparison
                        ? 'bg-[#FFFFFF] text-[#1C1917] font-medium shadow-xs'
                        : 'text-[#736A5E] hover:text-[#1C1917]'
                    }`}
                  >
                    High-Res Gallery
                  </button>
                  <button
                    onClick={() => setShowComparison(true)}
                    className={`px-3.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                      showComparison
                        ? 'bg-[#8A6739] text-[#FAF8F5] font-medium shadow-xs'
                        : 'text-[#736A5E] hover:text-[#1C1917]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-[#EFE4D2]" />
                    <span>3D Render vs Handover</span>
                  </button>
                </div>
              </div>
            )}

            {!showComparison ? (
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#DED6C9]">
                  <img
                    src={allImages[activeImageIndex]}
                    alt={`${project.title} detailed view`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#1C1917]/75 backdrop-blur-md text-xs font-mono text-white border border-white/10">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                </div>

                {/* Thumbnail strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-[#8A6739] ring-2 ring-[#8A6739]/30'
                            : 'border-[#DED6C9] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt="thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : project.comparison ? (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#DED6C9] select-none">
                  {/* Reality Image (Base layer) */}
                  <img
                    src={project.comparison.realityImage}
                    alt={project.comparison.realityTitle}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md text-xs font-mono text-[#FAF8F5] border border-white/20">
                    {project.comparison.realityTitle}
                  </div>

                  {/* 3D Blueprint Render (Clipped layer) */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${comparisonSlider}%` }}
                  >
                    <img
                      src={project.comparison.renderImage}
                      alt={project.comparison.renderTitle}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 max-w-none w-full h-full object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#8A6739]/90 backdrop-blur-md text-xs font-mono text-[#FAF8F5] border border-white/20">
                      {project.comparison.renderTitle}
                    </div>
                  </div>

                  {/* Slider Divider Bar */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-[#FAF8F5] shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                    style={{ left: `${comparisonSlider}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#24201D] border-2 border-[#FAF8F5] flex items-center justify-center text-xs text-white shadow-md">
                      ↔
                    </div>
                  </div>

                  {/* Range input overlay */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={comparisonSlider}
                    onChange={(e) => setComparisonSlider(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-pan-x"
                    aria-label="Comparison slider"
                  />
                </div>
                <p className="text-center text-xs text-[#736A5E] font-light">
                  Drag the slider left or right to compare our initial 3D architectural rendering against the executed turnkey site handover in Ahmedabad.
                </p>
              </div>
            ) : null}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-xl bg-[#FFFFFF] border border-[#E7E0D5]">
            <div>
              <div className="text-xs text-[#8C8275] font-mono">Carpet Area</div>
              <div className="font-serif text-lg sm:text-2xl font-light text-[#1C1917] tabular-nums mt-0.5">
                {project.areaSqFt.toLocaleString()} sq.ft
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8C8275] font-mono">Execution Timeline</div>
              <div className="font-serif text-lg sm:text-2xl font-light text-[#1C1917] mt-0.5">
                {project.specs.duration}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8C8275] font-mono">Project Typology</div>
              <div className="font-serif text-base sm:text-lg font-light text-[#1C1917] mt-0.5">
                {project.specs.executionType}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8C8275] font-mono">Handover Year</div>
              <div className="font-serif text-lg sm:text-2xl font-light text-[#1C1917] tabular-nums mt-0.5">
                {project.year}
              </div>
            </div>
          </div>

          {/* Architectural Concept Prose */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
              Spatial Philosophy & Architectural Narrative
            </h4>
            <p className="text-sm sm:text-base text-[#4A4239] leading-relaxed font-light">
              {project.architecturalConcept}
            </p>
          </div>

          {/* Scope of Work Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
              Executed Civil Engineering & Millwork Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.scopeOfWork.map((scope, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FFFFFF] border border-[#E7E0D5] text-xs sm:text-[13px] text-[#3D3732]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#8A6739] shrink-0 mt-0.5" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Material Palette Tags */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
              Specified Materials & Finishes
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {project.specs.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-[#F5EFE6] border border-[#DED6C9] font-mono text-[#59524A]"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Client Testimonial if present */}
          {project.review && (
            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#DED6C9] space-y-3">
              <div className="flex items-center gap-1 text-[#8A6739]">
                {[...Array(project.review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#8A6739]" />
                ))}
                <span className="text-xs font-mono ml-2 text-[#736A5E]">Verified Client Handover</span>
              </div>
              <blockquote className="font-serif text-lg sm:text-xl italic text-[#24201D] font-light leading-relaxed">
                "{project.review.quote}"
              </blockquote>
              <div className="text-xs font-medium text-[#1C1917]">
                {project.review.client} <span className="text-[#8C8275] font-light">/ {project.review.location}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-8 py-4 border-t border-[#E7E0D5] bg-[#FFFFFF]">
          <div className="text-xs text-[#736A5E] font-light text-center sm:text-left">
            Ready to craft a similar spatial ambiance for your home or office?
          </div>
          <button
            onClick={() => onBookConsultation(project.title)}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-[13px] font-medium text-[#FAF8F5] bg-[#24201D] hover:bg-[#3D3732] rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#CBB38D]" />
            <span>Consult For This Style</span>
          </button>
        </div>
      </div>
    </div>
  );
};
