"use client";

import {
  BadgeCheck,
  Boxes,
  IndianRupee,
  Truck,
  Headset,
  FlaskConical,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";

const POINTS = [
  {
    icon: BadgeCheck,
    title: "Consistent Quality",
    text: "Every batch is checked for purity, strength and performance so your process results stay repeatable order after order.",
  },
  {
    icon: Boxes,
    title: "Wide Product Range",
    text: "Eight product families — inks, processing chemicals, finishes and bio-enzymes — under one roof, one PO, one supplier.",
  },
  {
    icon: IndianRupee,
    title: "Competitive Pricing",
    text: "As a wholesale supplier we pass on scale benefits, with pricing structured for mills, processors and printers.",
  },
  {
    icon: Truck,
    title: "Fast, Reliable Dispatch",
    text: "Located on Surat–Bardoli Road, we serve the textile belt quickly and ship across India with dependable timelines.",
  },
  {
    icon: Headset,
    title: "Hands-on Technical Support",
    text: "Dosage, parameter and troubleshooting guidance — a phone call or WhatsApp away, whenever your line needs help.",
  },
  {
    icon: FlaskConical,
    title: "Custom Sourcing",
    text: "Need a specific grade or a made-to-spec product? We source specialty chemicals on request and support trials.",
  },
];

export function WhyUs() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why JS Dye Chem"
          title="A supplier your production team can rely on"
          subtitle="Chemical supply is a trust business — inconsistent inputs ruin shade, fastness and deadlines. Here's why processing houses stick with us."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group flex h-full gap-4 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.2)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/10 text-amber transition-transform duration-300 group-hover:scale-110">
                  <p.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
