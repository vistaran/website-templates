import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { BUSINESS } from "@/lib/business";
import { MapPin, Users, Truck, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "JS Dye Chem is a wholesale supplier of textile chemicals and printing inks based in Kadodara, Surat — serving processing houses, printers and mills across India.",
};

const VALUES = [
  {
    icon: FlaskConical,
    title: "Technical Depth",
    text: "We understand textile chemistry — not just supply it. Recommendations are matched to your fabric, process and target effect.",
  },
  {
    icon: Users,
    title: "Long-Term Partnership",
    text: "We measure success in repeat orders, not one-off sales. Consistency and dependability keep mills coming back.",
  },
  {
    icon: Truck,
    title: "Speed & Availability",
    text: "Situated in the Surat textile belt, we keep fast-moving grades stocked and dispatch quickly when your line is waiting.",
  },
  {
    icon: MapPin,
    title: "Rooted in Kadodara",
    text: "We're a local business serving a global industry — processing houses all over India rely on our supply from Surat.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The chemistry behind India's textiles"
        subtitle={`${BUSINESS.name} supplies the inks and processing chemicals that keep textile mills, processors and printers running — reliably, from the heart of Surat's textile belt.`}
      />

      {/* Story */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface-2 to-surface">
                <div className="relative aspect-[4/3] p-8">
                  <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                  <div className="absolute -top-10 -right-10 h-52 w-52 rounded-full bg-cyan/12 blur-[70px]" aria-hidden="true" />
                  <div className="absolute bottom-8 -left-8 h-44 w-44 rounded-full bg-amber/10 blur-[70px]" aria-hidden="true" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan">
                      <FlaskConical className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-heading text-3xl font-bold text-ink">
                        Kadodara <span className="text-gradient">· Surat</span>
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        At the centre of India's largest textile processing and printing cluster.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Our Story</p>
                <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
                  Built by people who understand the processing floor
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
                  <p>
                    Textile processing lives or dies by its inputs. A softener that yellows, a
                    binder that cracks on stretch fabric, or an ink batch that shifts shade halfway
                    through a production run — each one costs a mill real money and deadlines.
                  </p>
                  <p>
                    That's why {BUSINESS.name} exists. From our base in Kadodara — right in the
                    middle of Surat's textile ecosystem — we supply specialised chemicals, auxiliary
                    chemicals, silicon gel, softners, bonding agents, digital printing inks, value
                    addition chemicals and enzymes for fabric, all with the consistency serious
                    production demands.
                  </p>
                  <p>
                    We're a wholesale partner, not a middleman: competitive pricing, stocked
                    fast-movers, honest technical guidance and support that actually answers when
                    your line has a problem.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { n: "8+", l: "Product Families" },
                    { n: "500+", l: "Mills & Processors Served" },
                    { n: "24–48h", l: "Typical Dispatch" },
                    { n: "6 Days", l: "Weekly Availability" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl border border-line bg-surface px-4 py-5 text-center">
                      <p className="font-heading text-2xl font-bold text-ink">{s.n}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">{s.l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-surface/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Values that show up in every delivery"
            subtitle="Four principles guide how we source, test, price and support."
          />
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40">
                  <v.icon className="h-7 w-7 text-cyan" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
}
