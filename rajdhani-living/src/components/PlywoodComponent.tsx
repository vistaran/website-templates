'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  Calendar
} from 'lucide-react';

export default function PlywoodComponent() {
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
      src: '/images/rajdhani-plywood-image-1.jpeg',
      alt: "Club Prime Plywood",
      title: 'Club Prime Waterproof Ply',
      category: 'MARINE PLYWOOD',
      badge: 'Bestseller',
      description: 'Superlative BWP (Boiling Water Proof) grade plywood featuring calibrated thickness, superior termite-proofing, and high density for eternal durability.',
    },
    {
      src: '/images/rajdhani-plywood-image-2.jpeg',
      alt: "Decorative Veneer Panels",
      title: 'Exotic Natural Veneers',
      category: 'PREMIUM VENEERS',
      badge: 'Luxury',
      description: 'Handpicked exotic wood veneer panels showcasing rich, organic grains. The premium choice for signature wardrobes, headboards, and executive wall paneling.',
    },
    {
      src: '/images/rajdhani-plywood-image-3.jpg',
      alt: "Acrylic High-Gloss Laminates",
      title: 'Acrylic High-Gloss Laminates',
      category: 'DESIGNER LAMINATES',
      badge: 'Modern',
      description: 'Stunning scratch-resistant decorative sheets with unmatched gloss depth, color fastness, and effortless cleanup. Ideal for sleek contemporary furniture.',
    },
    {
      src: '/images/rajdhani-plywood-image-4.jpg',
      alt: "Flexi-Curve Curved Panels",
      title: 'Flexible & Curved Panels',
      category: 'FLEXI-PLYWOOD',
      badge: 'Innovative',
      description: 'Highly malleable engineered flexible plywood sheets designed for creating smooth circular pillars, elegant curved receptions, and wavy furniture silhouettes.',
    }
  ];

  const getWhatsAppLink = (title: string) => {
    const text = encodeURIComponent(`Hi Rajdhani Group, I am interested in "Rajdhani Plywood - ${title}". Please provide pricing and catalog details.`);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0c101d] transition-colors duration-300 min-h-screen">
      {/* Modern Hero Header */}
      <div className="relative overflow-hidden bg-[url('/images/plybg.jpeg')] bg-cover bg-center min-h-[55vh] md:min-h-[65vh] flex items-center justify-center py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/60 to-slate-950/90 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_100%)] z-0"></div>

        <div className="relative container mx-auto px-4 xl:px-28 z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 shadow-lg">
            <Layers className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Foundation of Structural Excellence</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
            Rajdhani Plywood
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 my-6 rounded-full"></div>

          <p className="max-w-2xl text-slate-300 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-8">
            Engineered wood of superlative quality, crafted for high durability, moisture resistance, and unyielding strength. 
            The definitive choice for elegant bespoke furniture.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Termite Resistant
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              All-Weather Proof
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Calibrated Thickness
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Heading Area */}
      <div className="container mx-auto px-4 xl:px-28 py-12">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white">
            Our Plywood & Laminate Catalog
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
            Discover heavy-duty waterproof plywoods, premium natural veneers, and custom laminates.
          </p>
        </div>

        {/* Editorial Masonry Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[250px] md:auto-rows-[300px]">
          {items.map((item, index) => {
            // High-end asymmetrical spans for 4 items
            let spans = "col-span-1 row-span-1";
            if (index === 0) {
              spans = "md:col-span-2 md:row-span-2 col-span-1 row-span-2"; // Large feature item
            } else if (index === 3) {
              spans = "md:col-span-2 md:row-span-1 col-span-1 row-span-1"; // Wide bottom feature item
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
              Need Heavy-Duty Materials for Your Construction?
            </h3>
            <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Our material specialists can help you calculate quantities and suggest the exact calibrated plywood grades suitable for your interior architecture.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 shadow-lg shadow-amber-500/10 hover:scale-105 transition-all duration-300 text-sm tracking-wide"
              >
                <FaWhatsapp className="mr-2 text-xl text-white" />
                Inquire Material Prices
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
                            <linearGradient id="plywood-trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                            stroke="url(#plywood-trail-gradient)"
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
