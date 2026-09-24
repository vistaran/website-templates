"use client";

import {
  Route,
  Fuel,
  UserRound,
  IndianRupee,
  FileText,
  CreditCard,
  BadgeCheck,
  Receipt,
  Zap,
  GraduationCap,
  Briefcase,
  Banknote,
} from "lucide-react";
import { StaggerGroup, StaggerItem, FadeInView } from "./motion";

const TERMS = [
  {
    icon: Route,
    title: "Extra KM Charges",
    desc: "₹10/km beyond the plan limit for 7-seaters, SUVs & sedans. ₹25/km for premium & luxury cars.",
  },
  {
    icon: Fuel,
    title: "Fuel Policy",
    desc: "Cars are handed over with a full tank. Return it full, or pay for the fuel consumed at standard pump rates. No fuel card hassles.",
  },
  {
    icon: UserRound,
    title: "Driver (Optional)",
    desc: "Want to sit back? Add a driver for ₹1,500 per day, food included. Otherwise, enjoy pure self-drive freedom.",
  },
  {
    icon: IndianRupee,
    title: "Security Deposit",
    desc: "Refundable deposit of ₹10,000 at booking. Refunded within 7 days of return, subject to vehicle condition.",
  },
];

const DOCUMENTS = [
  { icon: FileText, label: "RC Book" },
  { icon: CreditCard, label: "Aadhaar Card" },
  { icon: BadgeCheck, label: "Driving Licence" },
  { icon: Receipt, label: "PAN Card" },
  { icon: Zap, label: "Electricity Bill" },
  { icon: GraduationCap, label: "College ID Card" },
  { icon: Briefcase, label: "Business ID Card" },
  { icon: Banknote, label: "2 Cheques" },
];

export function Terms() {
  return (
    <section id="terms" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 right-[-160px] h-[420px] w-[420px] rounded-full bg-accent/6 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            Terms &amp; Documents
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple, No-Surprise Policies
          </h2>
          <p className="mt-4 text-muted">
            Everything you need to know before you hit the road: clear
            charges and a short document list.
          </p>
        </FadeInView>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TERMS.map((t) => (
            <StaggerItem key={t.title}>
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 ring-1 ring-accent/25">
                  <t.icon className="h-5.5 w-5.5 text-accent" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-white">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Documents */}
        <FadeInView delay={0.1} className="mt-14">
          <div className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-10">
            <div className="text-center">
              <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Documents Required at Pickup
              </h3>
              <p className="mt-2 text-sm text-muted">
                Keep these handy. We verify in 5 minutes and hand over the keys.
              </p>
            </div>
            <StaggerGroup className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DOCUMENTS.map((d) => (
                <StaggerItem key={d.label}>
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-4 py-3.5 transition-colors hover:border-accent/35">
                    <d.icon className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-[13px] font-medium text-zinc-200">{d.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
