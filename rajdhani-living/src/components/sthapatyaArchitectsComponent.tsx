'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  Compass, 
  Sparkles, 
  ArrowUpRight, 
  Calendar
} from 'lucide-react';

export default function SthapatyaArchitectsComponent() {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const openPreview = (index: number) => {
    setIsImageLoading(true);
    setPreviewIndex(index);
  };

  const closePreview = () => {
    setPreviewIndex(null);
  };

  const whatsappNumber = '919909032740';

  const items = [
    {
      src: '/images/sa-1.JPG',
      alt: "The Glass Pavilion Villa",
      title: 'The Glass Pavilion Villa',
      category: 'RESIDENTIAL ARCHITECTURE',
      badge: 'Bestseller',
      description: 'A breathtaking high-end villa characterized by seamless floor-to-ceiling glass facades, natural stone massing, and open reflective pool integration.',
    },
    {
      src: '/images/sa-2.JPG',
      alt: "Horizon Corporate Headquarters",
      title: 'Horizon Corporate HQ',
      category: 'COMMERCIAL COMPLEX',
      badge: 'Award Winner',
      description: 'An eco-friendly commercial office tower designed with double-skin glass insulation, dynamic solar shades, and extensive sky-high green terraces.',
    },
    {
      src: '/images/sa-5.jpg',
      alt: "Oasis Wellness Resort",
      title: 'Oasis Wellness Resort',
      category: 'HOSPITALITY DESIGN',
      badge: 'Luxury Resort',
      description: 'A luxurious wellness destination incorporating vernacular timber frameworks, clay-tiled roofs, and tranquil indoor courts centered around water cascades.',
    },
    {
      src: '/images/sa-6.jpg',
      alt: "Zenith Residential Towers",
      title: 'Zenith Residential Towers',
      category: 'URBAN HOUSING',
      badge: 'Premium',
      description: 'High-density luxury apartment layout optimized for supreme cross-ventilation, panoramic wind scoops, and private panoramic balcony views.',
    },
    {
      src: '/images/sa-3.JPG',
      alt: "Courtyard House",
      title: 'The Double-Height Courtyard House',
      category: 'BESPOKE HOMES',
      badge: 'Craftsman',
      description: 'A modern multi-generational home designed around an open-air central courtyard, optimizing natural cooling and filling living areas with daylight.',
    },
    {
      src: '/images/sa-4.JPG',
      alt: "The Concrete Studio",
      title: 'The Brutalist Concrete Studio',
      category: 'CREATIVE WORKSPACES',
      badge: 'Minimalist',
      description: 'A striking structural workspace featuring exposed board-formed concrete walls, massive geometric volumes, and precise overhead light slots.',
    },
    {
      src: '/images/sa-7.jpg',
      alt: "Solace Public Library",
      title: 'Solace Library & Retreat',
      category: 'PUBLIC INFRASTRUCTURE',
      badge: 'Eco-Friendly',
      description: 'An adaptive public pavilion utilizing salvaged timber frames, exposed metal rods, and massive skylights to foster an inspiring atmosphere for reading.',
    },
    {
      src: '/images/sa-8.jpg',
      alt: "Vista Hillside Lodge",
      title: 'Vista Cliffside Lodge',
      category: 'ORGANIC RETREATS',
      badge: 'New Concept',
      description: 'A stunning mountain vacation retreat cantilevering off slate cliff faces, utilizing regional slate-shingles and timber to blend into the mountain slopes.',
    }
  ];


  const getWhatsAppLink = (title: string) => {
    const text = encodeURIComponent(`Hi Rajdhani Group, I am interested in "Sthapatya Architects - ${title}". Please connect me with the principal designer.`);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0c101d] transition-colors duration-300 min-h-screen">
      {/* Modern Hero Header */}
      <div className="relative overflow-hidden bg-[url('/images/sa-12.jpg')] bg-cover bg-center min-h-[55vh] md:min-h-[65vh] flex items-center justify-center py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/60 to-slate-950/90 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_100%)] z-0"></div>

        <div className="relative container mx-auto px-4 xl:px-28 z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 shadow-lg">
            <Compass className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Inspiring Architectural Masterpieces</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
            Sthapatya Architects
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 my-6 rounded-full"></div>

          <p className="max-w-2xl text-slate-300 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-8">
            Innovative, sustainable, and bespoke architectural solutions designed to reflect and elevate modern lifestyles. 
            From blueprint to final structure, we shape inspiring spaces.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Eco-Friendly Design
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Turnkey Architectural Execution
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Modern Urban Masterplans
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Heading Area */}
      <div className="container mx-auto px-4 xl:px-28 py-12">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white">
            Our Architectural Masterworks
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
            Discover modern green villas, sustainable high-rises, and creative resort masterworks.
          </p>
        </div>

        {/* Editorial Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[250px] md:auto-rows-[300px]">
          {items.map((item, index) => {
            // Asymmetrical visual layout spans
            let spans = "col-span-1 row-span-1";
            if (index === 0) {
              spans = "md:col-span-2 md:row-span-2 col-span-1 row-span-2"; // Spotlight
            } else if (index === 3) {
              spans = "md:col-span-1 md:row-span-2 col-span-1 row-span-1"; // Vertical spotlight
            } else if (index === 5) {
              spans = "md:col-span-2 md:row-span-1 col-span-1 row-span-1"; // Horizontal span
            }

            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-900 text-white shadow-lg ${spans} transition-all duration-500 cursor-pointer hover:border-amber-500/30 hover:shadow-2xl`}
                onClick={() => openPreview(index)}
              >
                {/* Background Image */}
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out z-0" 
                />

                {/* Premium Hover Frosted-Glass Overlay */}
                <div className="absolute inset-0 bg-slate-950/15 opacity-0 group-hover:opacity-100 backdrop-blur-[1.5px] transition-all duration-500 z-10 pointer-events-none" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/10 z-10 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg z-20">
                  {item.badge}
                </div>

                {/* Content Panel */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end h-3/5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase mb-1.5 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-serif leading-snug text-white mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed mb-4 line-clamp-2 md:line-clamp-3">
                    {item.description}
                  </p>

                  {/* Visible WhatsApp CTA */}
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <a
                      href={getWhatsAppLink(item.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center bg-white/10 hover:bg-amber-500 border border-white/20 hover:border-transparent backdrop-blur-md text-white transition-all duration-300 px-5 py-2.5 rounded-2xl text-xs font-semibold tracking-wider uppercase group/btn"
                    >
                      <FaWhatsapp className="mr-2 text-base text-emerald-400 group-hover/btn:text-white" />
                      WhatsApp Inquiry
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 group-hover/btn:translate-x-0 transition-all duration-300" />
                    </a>
                    
                    <span className="hidden md:inline-block text-[11px] font-bold text-white/50 tracking-wider font-mono">
                      EST. 2026
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Footer Panel */}
      <div className="container mx-auto px-4 xl:px-28 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-8 md:p-12 lg:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-bold text-white font-serif mb-4">
              Discuss Your Next Signature Building Design?
            </h3>
            <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Our award-winning architects and design strategists are available for custom consultations, schematic evaluations, and sustainable urban blueprint reviews.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 shadow-lg shadow-amber-500/10 hover:scale-105 transition-all duration-300 text-sm tracking-wide"
              >
                <FaWhatsapp className="mr-2 text-xl text-white" />
                Schedule Architectural Consult
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 border border-white/10 hover:border-white/20 transition-all duration-300 text-sm tracking-wide"
              >
                <Calendar className="mr-2 w-4 h-4 text-amber-500" />
                Book Showroom Visit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal Popup Card (When Selected) */}
      {previewIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={closePreview}
        >
          <div 
            className="relative bg-slate-950 border border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.3)] rounded-3xl overflow-hidden max-w-3xl max-h-[85vh] flex flex-col transition-all duration-500 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blurred background image for luxury aesthetic */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
              <img 
                src={items[previewIndex].src} 
                alt="" 
                className="w-full h-full object-cover blur-2xl scale-110"
              />
            </div>

            {/* Content Panel */}
            <div className="relative z-10 flex items-center justify-center p-3 bg-black/20">
              <div className={`relative flex items-center justify-center transition-all duration-300 ${isImageLoading ? 'w-[90vw] h-[50vh] md:w-[60vw] md:h-[60vh] max-w-2xl' : ''}`}>
                {isImageLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md z-20 rounded-2xl">
                    <div className="relative flex flex-col items-center">
                      {/* Premium SVG Trail Loading Spinner */}
                      <div className="relative w-14 h-14">
                        <svg className="animate-spin w-full h-full text-amber-500" viewBox="0 0 50 50">
                          <defs>
                            <linearGradient id="sa-trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Inner glowing track background */}
                          <circle cx="25" cy="25" r="20" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="3.5" fill="none" />
                          {/* The sweeping gradient trail */}
                          <circle
                            cx="25"
                            cy="25"
                            r="20"
                            stroke="url(#sa-trail-gradient)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="60 150"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                <img 
                  src={items[previewIndex].src} 
                  alt={items[previewIndex].alt}
                  className={`max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-2xl transition-opacity duration-700 ease-out ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setIsImageLoading(false)}
                />
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={closePreview}
              className="absolute top-4 right-4 z-30 p-2 bg-slate-900/80 hover:bg-amber-500 text-white rounded-full border border-white/10 hover:border-transparent transition-all duration-300 shadow-lg"
              aria-label="Close Preview"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}