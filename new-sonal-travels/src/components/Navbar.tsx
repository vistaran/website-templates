"use client";

import { useEffect, useState } from "react";
import { Car, Menu, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppButton } from "./cta";
import { BUSINESS, DEFAULT_WA_MESSAGE } from "@/lib/business";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-us", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/70 bg-night/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/30">
            <Car className="h-5 w-5 text-accent" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[15px] font-bold tracking-tight text-white">
              New Sonal Travels
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Star className="h-3 w-3 fill-accent text-accent" />
              {BUSINESS.rating.toFixed(1)} · Self-Drive &amp; With Driver
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <WhatsAppButton message={DEFAULT_WA_MESSAGE} size="sm" label="Book Now" />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-200 hover:bg-surface-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="overflow-hidden border-b border-line bg-night/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-zinc-200 hover:bg-surface-2 hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 px-3 pb-1">
                <WhatsAppButton message={DEFAULT_WA_MESSAGE} label="Book on WhatsApp" className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
