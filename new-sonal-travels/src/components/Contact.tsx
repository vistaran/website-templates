"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { FadeInView } from "./motion";
import { WhatsAppButton, CallButton } from "./cta";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BUSINESS, DEFAULT_WA_MESSAGE, waLink } from "@/lib/business";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-[-180px] h-[420px] w-[420px] rounded-full bg-accent/6 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            Get In Touch
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book Your Car Today
          </h2>
          <p className="mt-4 text-muted">
            We&apos;re available 24 hours, every day. Message us on WhatsApp for the
            fastest booking, or call us directly.
          </p>
        </FadeInView>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Info cards */}
          <FadeInView className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface/70 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 ring-1 ring-accent/25">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-white">Address</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{BUSINESS.address}</p>
                  <p className="mt-1 text-[12px] text-dim">Plus code: {BUSINESS.plusCode}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface/70 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 ring-1 ring-accent/25">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-sm font-semibold text-white">Call Us</h3>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {BUSINESS.phones.map((p) => (
                        <a
                          key={p.tel}
                          href={`tel:${p.tel.replace(/[^+\d]/g, "")}`}
                          className="text-sm font-medium text-zinc-200 transition-colors hover:text-accent"
                        >
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface/70 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 ring-1 ring-accent/25">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-white">Hours</h3>
                  <p className="mt-1 text-sm text-muted">
                    {BUSINESS.hours} · 7 days a week
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <WhatsAppButton
                  message={DEFAULT_WA_MESSAGE}
                  size="lg"
                  label="WhatsApp Us Now"
                  className="w-full"
                />
                <a
                  href={BUSINESS.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line-2 bg-surface-2 px-6 py-3 text-[15px] font-semibold text-zinc-100 transition-all duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <Navigation className="h-5 w-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </FadeInView>

          {/* Map */}
          <FadeInView delay={0.12} className="lg:col-span-3">
            <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-line bg-surface-2">
              <iframe
                src={BUSINESS.mapsEmbed}
                title="New Sonal Travels location map"
                className="h-full min-h-[320px] w-full border-0 grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeInView>
        </div>

        {/* Bottom CTA banner */}
        <FadeInView delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-surface-2 via-surface to-night p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-accent/12 blur-[100px]" />
            </div>
            <div className="relative">
              <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Need a car right now? <span className="text-accent">We&apos;re awake.</span>
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
                Send your documents on WhatsApp and get a car (self-drive or
                with a driver) at your doorstep within hours, any time, any day.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <WhatsAppButton
                  message={DEFAULT_WA_MESSAGE}
                  size="lg"
                  label="Chat on WhatsApp"
                  className="w-full sm:w-auto"
                />
                <CallButton
                  phone={BUSINESS.phones[0].tel}
                  size="lg"
                  label="Call Now"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
