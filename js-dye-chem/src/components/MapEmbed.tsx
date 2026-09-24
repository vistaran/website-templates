import { BUSINESS } from "@/lib/business";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-line ${className ?? ""}`}>
      <iframe
        title={`${BUSINESS.name} location on Google Maps`}
        src={BUSINESS.mapEmbed}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 320 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full grayscale-[35%] contrast-[1.05]"
      />
    </div>
  );
}
