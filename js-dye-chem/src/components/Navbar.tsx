"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { BUSINESS, waLink, telHref } from "@/lib/business";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label="JS Dye Chem — home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/25 to-cyan/5 ring-1 ring-cyan/40 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 2.5c3.6 4.4 6 7.6 6 10.6a6 6 0 1 1-12 0c0-3 2.4-6.2 6-10.6Z" strokeLinejoin="round" />
          <path d="M12 9.5v6.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-heading text-base font-bold tracking-wide text-ink">
          JS DYE <span className="text-cyan">CHEM</span>
        </span>
        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          Textile Chemicals &amp; Inks
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-night/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8" aria-label="Main">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "text-cyan" : "text-muted hover:text-ink"
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-px bg-cyan/70"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref}
            className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <Phone className="h-4 w-4 text-cyan" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-[#062b16] shadow-[0_8px_28px_rgba(37,211,102,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Get a Quote
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-line bg-night/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-base font-medium",
                      pathname === l.href ? "bg-surface-2 text-cyan" : "text-muted hover:bg-surface-2 hover:text-ink"
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-3 pt-3">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-3 text-sm font-semibold text-[#062b16]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink"
                >
                  <Phone className="h-4 w-4 text-cyan" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
