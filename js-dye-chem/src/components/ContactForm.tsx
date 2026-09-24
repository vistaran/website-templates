"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: "", company: "", phone: "", email: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Requirement: ${form.message || "General enquiry"}`,
    ].filter(Boolean);
    const text = encodeURIComponent(
      `Hello ${BUSINESS.name}! New enquiry from the website:\n\n${lines.join("\n")}`
    );
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-surface-2/70 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-cyan/60 focus:outline-none";

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex min-h-[380px] flex-col items-center justify-center text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-wa/15 text-wa">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-semibold text-ink">Enquiry ready!</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              We've opened WhatsApp with your enquiry pre-filled. Just press{" "}
              <span className="font-semibold text-ink">Send</span> and our team will get back to
              you shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(EMPTY);
                setSent(false);
              }}
              className="mt-6 text-sm font-semibold text-cyan transition-colors hover:text-amber"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Full Name *
                </label>
                <input id="cf-name" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="cf-company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Company
                </label>
                <input id="cf-company" value={form.company} onChange={set("company")} placeholder="Company / mill name" className={inputCls} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Phone / WhatsApp *
                </label>
                <input id="cf-phone" required type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 ..." className={inputCls} />
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </label>
                <input id="cf-email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                Requirement *
              </label>
              <textarea
                id="cf-message"
                required
                rows={4}
                value={form.message}
                onChange={set("message")}
                placeholder="e.g. Need reactive digital printing inks for cotton + a softener for knit fabrics..."
                className={`${inputCls} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-7 py-3.5 text-base font-semibold text-[#062b16] shadow-[0_10px_32px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Send via WhatsApp
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-center text-xs text-muted">
              Submitting opens WhatsApp with your enquiry pre-filled — no data is stored on this
              website.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
