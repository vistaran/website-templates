"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Timer, Fuel, UserRoundX, Car } from "lucide-react";
import { FadeInView, StaggerGroup, StaggerItem } from "./motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  FLEET_24H,
  FLEET_12H,
  PLAN_24H,
  PLAN_12H,
  inr,
  bookingMessage,
  carImage,
  type CarCategory,
} from "@/lib/cars";
import { waLink } from "@/lib/business";
import { cn } from "@/lib/cn";

type PlanKey = "24h" | "12h";

const PLANS: Record<PlanKey, { label: string; km: string; groups: CarCategory[] }> = {
  "24h": { label: PLAN_24H.label, km: PLAN_24H.km, groups: FLEET_24H },
  "12h": { label: PLAN_12H.label, km: PLAN_12H.km, groups: FLEET_12H },
};

function CarCard({
  name,
  price,
  planLabel,
}: {
  name: string;
  price: number;
  planLabel: string;
}) {
  const img = carImage(name);

  return (
    <StaggerItem className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2/40 transition-colors duration-300 hover:border-accent/50">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
          {img ? (
            <Image
              src={img}
              alt={`${name}, self-drive or with-driver rental`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
              <Car className="h-10 w-10 text-dim/50" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-80" />
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <h5 className="font-heading text-[15px] font-semibold leading-snug text-zinc-100">
            {name}
          </h5>
          <div className="mt-auto flex items-center justify-between pt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-accent">{inr(price)}</span>
              <span className="text-[11px] text-dim">/day</span>
            </div>
            <a
              href={waLink(bookingMessage(name, planLabel))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${name} on WhatsApp`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/12 text-[#25D366] ring-1 ring-[#25D366]/25 transition-all duration-200 hover:scale-110 hover:bg-[#25D366] hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

function CarGrid({ groups, planLabel }: { groups: CarCategory[]; planLabel: string }) {
  return (
    <StaggerGroup className="space-y-8">
      {groups.map((g) => (
        <div key={g.label}>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-1 px-1">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-accent">
              {g.label}
            </h4>
            {g.note && <span className="text-[12px] text-dim">{g.note}</span>}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {g.cars.map((c) => (
              <CarCard key={c.name} name={c.name} price={c.price} planLabel={planLabel} />
            ))}
          </div>
        </div>
      ))}
    </StaggerGroup>
  );
}

export function Pricing() {
  const [plan, setPlan] = useState<PlanKey>("24h");
  const active = PLANS[plan];

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-[-160px] h-[420px] w-[420px] rounded-full bg-accent/6 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            Fleet &amp; Pricing
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transparent Day Rates
          </h2>
          <p className="mt-4 text-muted">
            One rate per car per day: drive it yourself, or add a driver for
            ₹1,500/day (food included). Choose a plan, pick your car, and book
            on WhatsApp.
          </p>
        </FadeInView>

        {/* Plan switcher */}
        <FadeInView delay={0.08} className="mt-10">
          <div className="mx-auto flex w-fit max-w-full gap-1.5 rounded-full border border-line-2 bg-surface-2/80 p-1.5">
            {(["24h", "12h"] as const).map((key) => {
              const p = PLANS[key];
              const selected = plan === key;
              return (
                <button
                  key={key}
                  onClick={() => setPlan(key)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-8",
                    selected ? "text-[#1a1205]" : "text-zinc-300 hover:text-white"
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="plan-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {p.label}
                    <span className={cn("text-[12px] font-medium", selected ? "text-[#1a1205]/70" : "text-dim")}>
                      · {p.km}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </FadeInView>

        {/* Rate card note */}
        <FadeInView delay={0.14}>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Timer, text: `${active.label} rental · ${active.km} limit included` },
              { icon: Fuel, text: "Full-tank policy: return it full or pay for fuel used" },
              { icon: UserRoundX, text: "Driver add-on · ₹1,500/day with food" },
            ].map((n) => (
              <div
                key={n.text}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 px-4 py-3 text-[13px] text-zinc-300"
              >
                <n.icon className="h-4.5 w-4.5 shrink-0 text-accent" />
                {n.text}
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView delay={0.18} className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={plan}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            >
              <CarGrid groups={active.groups} planLabel={active.label} />
            </motion.div>
          </AnimatePresence>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mt-6 text-center text-[13px] text-dim">
            Prices may vary with season &amp; availability.{" "}
            <a
              href={waLink("Hi New Sonal Travels! Please share the current availability and best rates for your cars (self-drive or with a driver).")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              Message us for today&apos;s best price →
            </a>
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
