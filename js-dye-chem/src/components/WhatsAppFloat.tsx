"use client";

import { motion } from "framer-motion";
import { waLink } from "@/lib/business";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with JS Dye Chem on WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-[#062b16] shadow-[0_10px_34px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 rounded-full bg-wa/60 animate-pulse-ring" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with us — we reply fast
      </span>
    </motion.a>
  );
}
