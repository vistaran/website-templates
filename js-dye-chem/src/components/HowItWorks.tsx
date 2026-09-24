"use client";

import { MessageSquare, Search, FlaskConical, Truck, Wrench } from "lucide-react";
import { waLink } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Share Your Requirement",
    text: "WhatsApp or call us with your fabric type, process and target effect. If you're not sure what you need, our team will help you define it.",
  },
  {
    icon: Search,
    title: "Product Recommendation & Samples",
    text: "We shortlist the right chemicals or inks from our range and send physical samples with technical datasheets and dosage guidance.",
  },
  {
    icon: FlaskConical,
    title: "Trial & Evaluation",
    text: "Run lab or machine trials on your fabric with our support. We help you fine-tune parameters for the best shade, hand-feel and fastness.",
  },
  {
    icon: Truck,
    title: "Order & Bulk Supply",
    text: "Place your order — we supply in your preferred pack sizes with consistent batch-to-batch quality and reliable dispatch timelines.",
  },
  {
    icon: Wrench,
    title: "Ongoing Technical Support",
    text: "Our team stays available for troubleshooting, re-ordering and formulation tweaks as your production needs evolve.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative border-y border-line bg-surface/50 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="From enquiry to delivery — a simple, transparent process"
          subtitle="We keep the sourcing process straightforward so you spend less time coordinating and more time producing."
        />

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-[26px] right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-cyan/10 via-cyan/40 to-amber/20 lg:block"
            aria-hidden="true"
          />
          <StaggerGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title} className="relative">
                <div className="relative flex flex-col items-start">
                  <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-cyan/30 bg-surface text-cyan shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="mt-4 font-heading text-xs font-bold tracking-[0.2em] text-amber">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal delay={0.1} className="mt-14 text-center">
          <a
            href={waLink("Hello JS Dye Chem! I'd like to start an enquiry about textile chemicals / inks.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-wa px-7 py-3.5 text-base font-semibold text-[#062b16] shadow-[0_10px_36px_rgba(37,211,102,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Start With Step 1 — Message Us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
