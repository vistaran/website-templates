import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Offerings } from "@/components/Offerings";
import { CTASection } from "@/components/CTASection";
import { GROUPS, OFFERINGS } from "@/lib/offerings";
import { waLinkFor } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ClipboardCheck, Truck, FlaskConical, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Products & Offerings",
  description:
    "Explore JS Dye Chem's product range: digital printing inks, specialised & auxiliary chemicals, silicon gel, softners, bonding agents, value addition chemicals and enzymes for fabric — supplied wholesale across India.",
};

const QUALITY = [
  {
    icon: ClipboardCheck,
    title: "Batch-Tested Quality",
    text: "Incoming stock is checked for consistency so your process doesn't have to chase variables.",
  },
  {
    icon: FlaskConical,
    title: "Sample-First Approach",
    text: "Physical samples and datasheets before you commit to bulk — evaluate on your own fabric.",
  },
  {
    icon: Truck,
    title: "Flexible Supply",
    text: "From trial quantities to regular bulk supply with dependable dispatch from Kadodara.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Handling",
    text: "Products sourced, packed and documented with safety and regulatory compliance in mind.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products & Offerings"
        title="A complete range for the textile value chain"
        subtitle="Eight product families covering pre-treatment, dyeing, printing and finishing — plus custom sourcing for specialty requirements."
      />

      {/* Grouped detail sections */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {GROUPS.map((group, gi) => {
            const items = OFFERINGS.filter((o) => o.group === group.key);
            return (
              <div key={group.key} id={group.key}>
                <Reveal>
                  <div className="mb-10 border-l-2 border-cyan/60 pl-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                      Category {String(gi + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {group.label}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{group.blurb}</p>
                  </div>
                </Reveal>

                <div className="space-y-6">
                  {items.map((o, ii) => (
                    <Reveal key={o.slug} delay={0.05 * ii}>
                      <div
                        id={o.slug}
                        className="group scroll-mt-28 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-cyan/35 sm:p-8"
                      >
                        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
                          <div>
                            <div className="flex items-start gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                                <o.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <div>
                                <h3 className="font-heading text-xl font-semibold text-ink">{o.name}</h3>
                                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-amber">
                                  {o.tagline}
                                </p>
                              </div>
                            </div>
                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
                              {o.description}
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {o.applications.map((a) => (
                                <li
                                  key={a}
                                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-muted"
                                >
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col gap-3 lg:items-end">
                            <a
                              href={waLinkFor(o.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-6 py-3 text-sm font-semibold text-[#062b16] shadow-[0_8px_26px_rgba(37,211,102,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                            >
                              <WhatsAppIcon className="h-4 w-4" />
                              Request Quote
                            </a>
                            <p className="text-xs text-muted">
                              Samples &amp; datasheets available
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quality band */}
      <section className="relative py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quality & Supply"
            title="The assurance behind every drum, bag and cartridge"
            subtitle="Industrial chemistry is judged on repeatability. Our sourcing, testing and supply practices are built around keeping your line stable."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY.map((q) => (
              <Reveal key={q.title}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                  <q.icon className="h-7 w-7 text-cyan" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">{q.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Offerings />
      <CTASection />
    </>
  );
}
