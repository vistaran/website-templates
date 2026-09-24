"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Clock, MapPin, KeyRound } from "lucide-react";
import { WhatsAppButton, CallButton } from "./cta";
import { BUSINESS, DEFAULT_WA_MESSAGE } from "@/lib/business";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: easeOut },
});

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Luxury car backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/cars/Mercedes-GLC.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.16]"
        />
        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/75 to-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/30 to-base/70" />
      </div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-0 right-[-160px] h-[380px] w-[380px] rounded-full bg-accent-2/8 blur-[120px]" />
        {/* Road lines */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-[0.07] [background:repeating-linear-gradient(90deg,transparent_0_60px,#ffb347_60px_84px)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface-2/70 px-4 py-1.5 text-[13px] font-medium text-zinc-200 backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {BUSINESS.rating.toFixed(1)} rated · Self-Drive &amp; With Driver · Gandhinagar
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Drive Yourself.
            <br />
            <span className="bg-gradient-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent">
              Or With a Driver.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.24)}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Self-drive or with a driver: rent cars in Gandhinagar from Innova to
            Defender for 12 or 24 hours. Prefer to sit back? Add a <span className="font-semibold text-zinc-200">driver at ₹1,500/day (food included)</span>.
            Doorstep delivery, transparent rates and open 24 hours. Book on WhatsApp in minutes.
          </motion.p>

          <motion.div
            {...fadeUp(0.36)}
            className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
          >
            <WhatsAppButton
              message={DEFAULT_WA_MESSAGE}
              size="lg"
              label="Book on WhatsApp"
              className="w-full sm:w-auto"
            />
            <CallButton
              phone={BUSINESS.phones[0].tel}
              size="lg"
              label={`Call ${BUSINESS.phones[0].display}`}
              className="w-full sm:w-auto"
            />
          </motion.div>

          <motion.div
            {...fadeUp(0.48)}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" /> Open 24 Hours
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" /> Sector 19, Gandhinagar
            </span>
            <span className="inline-flex items-center gap-1.5">
              <KeyRound className="h-4 w-4 text-accent" /> Self-Drive or With Driver
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
