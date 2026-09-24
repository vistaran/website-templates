import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { BUSINESS, waLink, telHref } from "@/lib/business";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact JS Dye Chem for textile chemicals and printing inks — WhatsApp +91 97129 22210, call us, or visit our office in Kadodara, Surat, Gujarat.",
};

const CARDS = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp (Fastest)",
    lines: [BUSINESS.phoneDisplay, "We typically reply within business hours"],
    href: waLink(),
    cta: "Chat Now",
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [BUSINESS.phoneDisplay, "Mon – Sat · 10 AM – 6:30 PM"],
    href: telHref,
    cta: "Call Now",
    external: false,
  },
  {
    icon: Mail,
    title: "Email",
    lines: [BUSINESS.email, "For formal quotations & documentation"],
    href: `mailto:${BUSINESS.email}`,
    cta: "Send Email",
    external: false,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [BUSINESS.address],
    href: BUSINESS.directions,
    cta: "Get Directions",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk about your chemistry needs"
        subtitle="WhatsApp, call or drop by — our team is ready to help you find the right products, samples and pricing."
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Contact cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={0.05 * i}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.2)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan transition-transform duration-300 group-hover:scale-110">
                    <c.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 font-heading text-lg font-semibold text-ink">{c.title}</h2>
                  <div className="mt-2 flex-1 space-y-1">
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm leading-relaxed text-muted">
                        {l}
                      </p>
                    ))}
                  </div>
                  <span className="mt-4 text-sm font-semibold text-cyan transition-colors group-hover:text-amber">
                    {c.cta} →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Form + Map */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink">
                Send us your requirement
              </h2>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-muted">
                Fill in the form and your enquiry opens in WhatsApp, pre-filled — nothing stored on
                this website.
              </p>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink">
                Find us in Kadodara
              </h2>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-muted">
                B/h Poonam Hotel, 93, Jalaram Nagar Society, Surat–Bardoli Road, Kadodara, Gujarat
                394327.
              </p>
              <MapEmbed className="h-[420px]" />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4 text-cyan" aria-hidden="true" />
                  {BUSINESS.hours} · {BUSINESS.hoursNote}
                </div>
                <a
                  href={BUSINESS.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-amber"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
