import React, { useState } from "react";
import { Sprout, Hammer, TreePine, Droplet, Shovel, Landmark } from "lucide-react";

interface ImageFallbackProps {
  src?: string;
  type?: "lawn" | "hardscape" | "tree" | "garden" | "hero" | "drainage" | "curb-appeal" | "contact" | "patio-before" | "patio-after" | "lawn-before" | "lawn-after";
  title?: string;
  badge?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({ 
  src,
  type = "lawn", 
  title, 
  badge,
  alt,
  className = "" 
}) => {
  const [imageError, setImageError] = useState(false);

  // Map image types to verified downloaded real photography
  const getRealImagePath = () => {
    if (src) return src;
    switch (type) {
      case "hero":
      case "curb-appeal":
        return "/images/curb-appeal.jpg";
      case "lawn":
        return "/images/lawn.jpg";
      case "hardscape":
        return "/images/hardscape.jpg";
      case "tree":
        return "/images/tree.jpg";
      case "garden":
        return "/images/garden.jpg";
      case "drainage":
        return "/images/drainage.jpg";
      case "patio-before":
        return "/images/patio-before.jpg";
      case "patio-after":
        return "/images/patio-after.jpg";
      case "lawn-before":
        return "/images/lawn-before.jpg";
      case "lawn-after":
        return "/images/lawn-after.jpg";
      default:
        return "/images/lawn.jpg";
    }
  };

  const realPath = getRealImagePath();

  // If real image path exists and has not errored, render the real photo!
  if (realPath && !imageError) {
    return (
      <div className={`relative w-full h-full overflow-hidden rounded-2xl group ${className}`}>
        <img
          src={realPath}
          alt={alt || title || "J & Son Landscaping Concord NC"}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Elegant visual scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-soil/85 via-brand-soil/25 to-transparent pointer-events-none" />

        {/* Optional Title / Badge overlay */}
        {(title || badge) && (
          <div className="absolute bottom-3 left-3 right-3 bg-brand-soil/90 backdrop-blur-md rounded-xl p-3 border border-white/10 text-brand-cream text-left z-10 shadow-sm">
            {badge && (
              <span className="text-[9px] uppercase font-mono tracking-widest text-brand-clay font-bold block mb-0.5">
                {badge}
              </span>
            )}
            {title && (
              <h4 className="text-xs sm:text-sm font-serif font-bold text-white tracking-tight leading-snug">
                {title}
              </h4>
            )}
          </div>
        )}
      </div>
    );
  }

  // Graceful fallback icons if an image ever encounters an error
  const getIcon = () => {
    switch (type) {
      case "lawn":
        return <Sprout className="w-10 h-10 text-brand-leaf" strokeWidth={1.5} />;
      case "hardscape":
        return <Hammer className="w-10 h-10 text-brand-clay" strokeWidth={1.5} />;
      case "tree":
        return <TreePine className="w-10 h-10 text-brand-leaf" strokeWidth={1.5} />;
      case "garden":
        return <Shovel className="w-10 h-10 text-brand-clay" strokeWidth={1.5} />;
      case "hero":
      case "curb-appeal":
        return <Landmark className="w-12 h-12 text-brand-clay" strokeWidth={1} />;
      default:
        return <Droplet className="w-10 h-10 text-brand-leaf" strokeWidth={1.5} />;
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none rounded-2xl bg-brand-sage/30 border border-brand-sage ${className}`}>
      <div className="p-4 rounded-full bg-white shadow-sm mb-2">
        {getIcon()}
      </div>
      {title && (
        <h4 className="text-sm font-serif font-bold text-brand-soil">
          {title}
        </h4>
      )}
      <span className="text-[10px] uppercase font-mono text-brand-soil/50 mt-1">
        J &amp; SON LANDSCAPING • CONCORD, NC
      </span>
    </div>
  );
};
