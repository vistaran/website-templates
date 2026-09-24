"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Droplets, Printer, Truck, FlaskConical } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/business";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const TRUST = [
  { icon: BadgeCheck, label: "Batch-to-batch consistency" },
  { icon: Truck, label: "Pan-India supply" },
  { icon: FlaskConical, label: "Technical support" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan/[0.07] blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-amber/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 -left-40 h-[380px] w-[380px] rounded-full bg-cyan/[0.04] blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        {/* Copy */}
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              {BUSINESS.category}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Textile chemicals &amp; printing inks,{" "}
            <span className="text-gradient">engineered for consistency.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            A trusted B2B partner for specialised chemicals, auxiliaries, softeners, bonding
            agents and digital printing inks — supplying processing houses and mills across India
            from the heart of Surat's textile belt.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-wa px-7 py-3.5 text-base font-semibold text-[#062b16] shadow-[0_10px_36px_rgba(37,211,102,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Get a Quote on WhatsApp
            </a>
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface-2/60 px-7 py-3.5 text-base font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-cyan/50 hover:text-cyan"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm text-muted">
                <t.icon className="h-4 w-4 text-cyan" aria-hidden="true" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface-2 to-surface">
            {/* Ink swirls */}
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-cyan/15 blur-[70px] animate-float" />
              <div className="absolute bottom-10 -right-10 h-72 w-72 rounded-full bg-amber/12 blur-[80px] animate-float-slow" />
              <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wa/[0.08] blur-[60px]" />
              {/* rings */}
              <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full opacity-60" fill="none">
                <circle cx="200" cy="250" r="150" stroke="rgba(34,211,238,0.22)" strokeWidth="1" strokeDasharray="3 7" />
                <circle cx="200" cy="250" r="105" stroke="rgba(34,211,238,0.16)" strokeWidth="1" />
                <circle cx="200" cy="250" r="60" stroke="rgba(245,158,11,0.18)" strokeWidth="1" strokeDasharray="2 6" />
              </svg>
              {/* center flask */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-cyan/30 bg-night/70 shadow-[0_0_60px_rgba(34,211,238,0.18)] backdrop-blur">
                  <FlaskConical className="h-12 w-12 text-cyan" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              className="absolute left-5 top-8 flex items-center gap-2.5 rounded-2xl border border-line bg-night/75 px-4 py-3 shadow-xl backdrop-blur animate-float"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Droplets className="h-5 w-5 text-amber" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">8+ Product Lines</p>
                <p className="text-xs text-muted">Inks · Chemicals · Finishes</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 right-5 flex items-center gap-2.5 rounded-2xl border border-line bg-night/75 px-4 py-3 shadow-xl backdrop-blur animate-float-slow"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Printer className="h-5 w-5 text-cyan" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Digital Printing Inks</p>
                <p className="text-xs text-muted">Reactive · Disperse · Pigment</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-24 left-6 flex items-center gap-2.5 rounded-2xl border border-line bg-night/75 px-4 py-3 shadow-xl backdrop-blur"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              <BadgeCheck className="h-5 w-5 text-wa" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Quality Assured</p>
                <p className="text-xs text-muted">Consistent every batch</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
