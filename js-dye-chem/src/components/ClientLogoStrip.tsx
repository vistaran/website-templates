"use client";

import { Reveal } from "@/components/Reveal";

/**
 * Sample client logo placeholders.
 * Replace the monogram tiles below with real client logos when available.
 * Design: muted grayscale tiles that light up on hover, marquee auto-scroll.
 */

const CLIENTS = [
  { name: "Texron Mills", tag: "Processing House" },
  { name: "Surya Texprints", tag: "Digital Printing" },
  { name: "Nova Knits", tag: "Knit Fabric" },
  { name: "Aarav Fabrics", tag: "Dyeing Unit" },
  { name: "Indigo Fab Works", tag: "Denim Processing" },
  { name: "SurTex Processing", tag: "Fabric Finishing" },
  { name: "Krishna Prints", tag: "Screen Printing" },
  { name: "Pratik Textiles", tag: "Garment Mills" },
];

function ClientTile({ client }: { client: (typeof CLIENTS)[number] }) {
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="mx-3 flex items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-4 opacity-60 grayscale transition-all duration-300 hover:border-cyan/40 hover:opacity-100 hover:grayscale-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/25 to-amber/15 font-heading text-xs font-bold text-ink ring-1 ring-line">
        {initials}
      </span>
      <span>
        <span className="block font-heading text-sm font-semibold text-ink">{client.name}</span>
        <span className="block text-[11px] uppercase tracking-wider text-muted">{client.tag}</span>
      </span>
    </div>
  );
}

export function ClientLogoStrip() {
  return (
    <section className="relative border-y border-line bg-surface/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Trusted by processing houses, printers &amp; mills across India
          </p>
        </Reveal>
      </div>
      <div
        className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-label="Client logos"
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0" aria-hidden={set === 1}>
              {CLIENTS.map((c) => (
                <ClientTile key={`${set}-${c.name}`} client={c} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
