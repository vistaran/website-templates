"use client";

import { Phone } from "lucide-react";
import { BUSINESS, waLink, telHref } from "@/lib/business";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-gradient-to-br from-surface-2 via-surface to-night px-6 py-14 text-center sm:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-cyan/[0.09] blur-[100px]" />
              <div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-amber/[0.07] blur-[90px]" />
              <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            </div>

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
                {BUSINESS.category}
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                Ready to upgrade your processing chemistry?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Tell us what you're processing and we'll recommend the right products — samples,
                pricing and technical support included.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-8 py-4 text-base font-semibold text-[#062b16] shadow-[0_10px_36px_rgba(37,211,102,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp Us Now
                </a>
                <a
                  href={telHref}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-line bg-surface-2/70 px-8 py-4 text-base font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-cyan/50 hover:text-cyan sm:w-auto"
                >
                  <Phone className="h-5 w-5 text-cyan" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </a>
              </div>

              <p className="mt-6 text-sm text-muted">
                Mon – Sat · 10:00 AM – 6:30 PM &nbsp;·&nbsp; {BUSINESS.city}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
