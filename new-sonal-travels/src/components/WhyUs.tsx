"use client";

import { Clock, ShieldCheck, Wallet, DoorOpen, KeyRound, FileCheck } from "lucide-react";
import { StaggerGroup, StaggerItem, FadeInView } from "./motion";
import { BUSINESS } from "@/lib/business";

const FEATURES = [
  {
    icon: Clock,
    title: "Open 24 × 7",
    desc: "Midnight pickup? 4 AM drop? We're awake around the clock in Gandhinagar & Ahmedabad.",
  },
  {
    icon: ShieldCheck,
    title: "Well-Maintained Fleet",
    desc: "Regularly serviced, sanitised cars with insurance. Safety never takes a backseat.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "Fixed day rates with clear extra-km charges. No hidden costs, no surprises.",
  },
  {
    icon: DoorOpen,
    title: "Doorstep Delivery",
    desc: "Car delivered to your home or office anywhere in Gandhinagar & Ahmedabad.",
  },
  {
    icon: KeyRound,
    title: "Self-Drive or With Driver",
    desc: "Drive it yourself for total freedom, or add a driver at ₹1,500/day. Your choice, every single trip.",
  },
  {
    icon: FileCheck,
    title: "Quick Paperwork",
    desc: "Verification in minutes at pickup. Bring your documents, we handle the rest.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            Why Choose Us
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Gandhinagar&apos;s Go-To Car Rental Partner
          </h2>
        </FadeInView>

        {/* Stats bar */}
        <FadeInView delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur sm:grid-cols-4 sm:p-8">
            {[
              { value: "5.0★", label: "Google Rating" },
              { value: `${BUSINESS.reviewCount}+`, label: "Reviews" },
              { value: "40+", label: "Cars in Fleet" },
              { value: "24/7", label: "Availability" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-accent sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeInView>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group flex h-full gap-4 rounded-2xl border border-line bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2/80">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 ring-1 ring-accent/25 transition-colors group-hover:bg-accent/20">
                  <f.icon className="h-5.5 w-5.5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
