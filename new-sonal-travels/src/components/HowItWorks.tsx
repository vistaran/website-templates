"use client";

import { Car, MessageCircle, FileCheck, KeyRound } from "lucide-react";
import { StaggerGroup, StaggerItem, FadeInView } from "./motion";
import { WhatsAppButton } from "./cta";
import { DEFAULT_WA_MESSAGE } from "@/lib/business";

const STEPS = [
  {
    icon: Car,
    step: "01",
    title: "Pick Your Car",
    desc: "Browse the fleet, choose your plan (12h / 24h) and your favourite car.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Send Documents",
    desc: "Share your documents on WhatsApp: RC, licence, ID proof and more.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Pay Deposit",
    desc: "Secure your booking with a fully refundable ₹10,000 deposit.",
  },
  {
    icon: KeyRound,
    step: "04",
    title: "Drive Away",
    desc: "Car delivered to your doorstep. Drive yourself or with your driver, keys in hand.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            How It Works
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            On the Road in 4 Easy Steps
          </h2>
        </FadeInView>

        <StaggerGroup className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <StaggerItem key={s.step}>
              <div className="relative flex h-full flex-col items-center rounded-2xl border border-line bg-surface/70 p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface-2/80">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/12 ring-1 ring-accent/25">
                  <s.icon className="h-7 w-7 text-accent" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent font-heading text-[11px] font-bold text-[#1a1205]">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeInView className="mt-12 text-center" delay={0.1}>
          <WhatsAppButton message={DEFAULT_WA_MESSAGE} size="lg" label="Start on WhatsApp" />
        </FadeInView>
      </div>
    </section>
  );
}
