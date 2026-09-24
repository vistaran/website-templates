"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/business";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_34px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-pulse-ring" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
