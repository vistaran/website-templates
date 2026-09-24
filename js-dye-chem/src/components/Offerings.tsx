"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OFFERINGS } from "@/lib/offerings";
import { waLinkFor } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";

export function Offerings() {
  return (
    <section id="offerings" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Offerings"
          title="Everything your processing line needs, from one supplier"
          subtitle="Eight focused product families covering the full textile value chain — pre-treatment to printing to finishing. Every grade sourced and quality-checked for consistent, repeatable results."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERINGS.map((o) => (
            <StaggerItem key={o.slug}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/40 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.25)]">
                <div
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan/0 blur-3xl transition-all duration-500 group-hover:bg-cyan/[0.12]"
                  aria-hidden="true"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan transition-transform duration-300 group-hover:scale-110">
                  <o.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{o.name}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-amber">{o.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{o.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {o.applications.slice(0, 2).map((a) => (
                    <span key={a} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] text-muted">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <a
                    href={waLinkFor(o.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-cyan transition-colors hover:text-amber"
                  >
                    Get Quote
                  </a>
                  <Link
                    href={`/products#${o.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink"
                  >
                    Details
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup className="mt-10">
          <StaggerItem>
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-gradient-to-r from-surface-2 to-surface px-6 py-6 sm:flex-row sm:px-8">
              <p className="text-center text-sm text-muted sm:text-left">
                <span className="font-semibold text-ink">Can't find a specific grade?</span>{" "}
                We source and supply specialty chemicals on request — tell us your requirement.
              </p>
              <Link
                href="/products"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-2.5 text-sm font-semibold text-cyan transition-all duration-300 hover:bg-cyan/20"
              >
                View Full Product Range
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
