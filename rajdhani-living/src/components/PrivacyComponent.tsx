"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Activity,
  Cookie,
  Compass,
  Send,
  BarChart3,
  Lock,
  Link2,
  Check,
  Copy,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
  Info
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const sections: Section[] = [
  { id: "introduction", title: "Introduction", icon: <Info className="w-4 h-4" /> },
  { id: "information-collected", title: "Information We Collect", icon: <User className="w-4 h-4" /> },
  { id: "how-we-use", title: "How We Use Information", icon: <Compass className="w-4 h-4" /> },
  { id: "data-protection", title: "Data Protection & Security", icon: <Lock className="w-4 h-4" /> },
  { id: "cookies-links", title: "Cookies & Third Parties", icon: <Cookie className="w-4 h-4" /> },
  { id: "your-rights", title: "Your Key Rights", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "contact", title: "Contact Us", icon: <Send className="w-4 h-4" /> },
];

export default function PrivacyComponent() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rajdhanigrp@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen dark:bg-background bg-slate-50 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Policies & Data Protection
          </div>
          <h1 className="h1 text-4xl sm:text-5xl lg:text-6xl text-foreground dark:text-white tracking-tight">
            Privacy <span className="lime">Policy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
            At Rajdhani Group, your trust is our most valuable asset. We are committed to safeguarding your personal information and maintaining maximum transparency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs sm:text-sm text-muted-foreground border-t border-border/40 max-w-lg mx-auto">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Last updated: May 21, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>3 min read</span>
            </div>
          </div>
        </motion.div>

        {/* Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">

          {/* Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block lg:col-span-4 sticky top-28 bg-card border border-border/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm"
          >
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 px-3">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary pl-4"
                        : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground pl-3.5"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground/70"}`}>
                        {section.icon}
                      </span>
                      <span>{section.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "transform translate-x-0 opacity-100 text-primary" : "opacity-0 -translate-x-1"
                      }`} />
                  </button>
                );
              })}
            </nav>
          </motion.div>

          {/* Privacy Content Area */}
          <div className="col-span-1 lg:col-span-8 space-y-12">

            {/* Section 1: Introduction */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="introduction"
              className="scroll-mt-28 bg-card border border-border/40 hover:border-border/80 transition-colors duration-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  1. Introduction
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4" />
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Welcome to Rajdhani Group. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, process, utilize, and secure your information when you visit our website, use our interior design services, or interact with us.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                By accessing our services or browse our platform, you acknowledge and agree to the terms described in this policy. If you have any inquiries regarding data usage, please feel free to reach out to our dedicated team.
              </p>
            </motion.section>

            {/* Section 2: Information We Collect */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="information-collected"
              className="scroll-mt-28 bg-card border border-border/40 hover:border-border/80 transition-colors duration-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  2. Information We Collect
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4" />

              <p className="text-muted-foreground text-sm sm:text-base">
                We collect essential information to deliver and enhance our premium design and architectural solutions. This collection falls into the following main categories:
              </p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
              >
                {/* Card 1: Personal Info */}
                <motion.div
                  variants={fadeInUpVariants}
                  className="bg-secondary/20 hover:bg-secondary/40 border border-border/30 rounded-xl p-5 transition-all duration-300 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-foreground">Personal Information</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Name, email address, phone number, and architectural preferences provided directly by you when initiating consultations.
                  </p>
                </motion.div>

                {/* Card 2: Usage Data */}
                <motion.div
                  variants={fadeInUpVariants}
                  className="bg-secondary/20 hover:bg-secondary/40 border border-border/30 rounded-xl p-5 transition-all duration-300 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-foreground">Usage Analytics</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Anonymized interaction data including your IP address, browser information, device specifications, and page interaction flows.
                  </p>
                </motion.div>

                {/* Card 3: Cookies */}
                <motion.div
                  variants={fadeInUpVariants}
                  className="bg-secondary/20 hover:bg-secondary/40 border border-border/30 rounded-xl p-5 transition-all duration-300 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-foreground">Cookies & Tracking</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Small text files stored locally on your device to remember user settings, sessions, and optimize layout delivery.
                  </p>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Section 3: How We Use Information */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="how-we-use"
              className="scroll-mt-28 bg-card border border-border/40 hover:border-border/80 transition-colors duration-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Compass className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  3. How We Use Information
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4" />

              <p className="text-muted-foreground text-sm sm:text-base">
                Your data is strictly processed to optimize your journey and maintain premium services. We use the information we gather to:
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/20 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary mt-1">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground mb-1">Service Customization & Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      To craft design experiences tailored to your property, respond to project applications, and establish design pipeline contracts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/20 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary mt-1">
                    <Send className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground mb-1">Fluid Communications</h4>
                    <p className="text-sm text-muted-foreground">
                      Sending system updates, aesthetic project brochures, curated newsletters, and directly responding to inquiry channels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/20 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary mt-1">
                    <BarChart3 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground mb-1">Advanced Analytics & Optimizations</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitoring traffic patterns and behavior to design future features, optimize digital loading speeds, and maximize layout performance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Data Protection */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="data-protection"
              className="scroll-mt-28 bg-card border border-border/40 hover:border-border/80 transition-colors duration-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  4. Data Protection & Security
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    We employ state-of-the-art organizational and technical measures to secure your data from unauthorized access, alteration, or disclosure. Our servers use SSL/TLS encryption for all transaction databases.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    While we take industry-standard precautions, please be aware that no security architecture on the open internet is completely impervious. We continually adapt our security layers to protect your personal identity.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative p-6 rounded-2xl bg-secondary/10 border border-primary/20 flex flex-col items-center justify-center w-full max-w-[200px] aspect-square">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl animate-pulse" />
                    <Lock className="w-12 h-12 text-primary relative z-10 mb-2" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary relative z-10">Encrypted SSL</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 5: Cookies & Third Parties */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="cookies-links"
              className="scroll-mt-28 bg-card border border-border/40 hover:border-border/80 transition-colors duration-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  5. Cookies & Third Parties
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4" />

              <div className="space-y-4 text-muted-foreground text-sm sm:text-base">
                <div className="p-4 rounded-xl bg-secondary/10 border border-border/40">
                  <h4 className="font-bold text-foreground mb-1.5 flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-primary" /> Cookie Management
                  </h4>
                  <p className="text-xs sm:text-sm">
                    You can inspect and customize cookie preferences directly via your primary browser configurations. Declining non-essential cookies remains completely functional, though some specialized layout options might behave differently.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/10 border border-border/40">
                  <h4 className="font-bold text-foreground mb-1.5 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-primary" /> Third-Party Redirects
                  </h4>
                  <p className="text-xs sm:text-sm">
                    Our platform may host redirection links to specialized external suppliers (e.g. social galleries, hardware manufacturers). We do not control and are not responsible for their independent tracking codes or policy guidelines.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 6: Your Key Rights */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="your-rights"
              className="scroll-mt-28 bg-card border border-border/40 hover:border-border/80 transition-colors duration-300 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  6. Your Key Rights
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4" />

              <p className="text-muted-foreground text-sm sm:text-base">
                We believe in providing our users with absolute clarity and command over their visual and text data. You retain the following fundamental rights:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/30 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                  <span className="h-6 w-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs mt-0.5">1</span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Right to Access</h4>
                    <p className="text-xs text-muted-foreground">Request a comprehensive copy of all stored records associated with your personal profile.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/30 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                  <span className="h-6 w-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs mt-0.5">2</span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Right to Correction</h4>
                    <p className="text-xs text-muted-foreground">Promptly rectify inaccurate, corrupted, or outdated registration properties in our active catalog.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/30 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                  <span className="h-6 w-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs mt-0.5">3</span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Right to Erasure</h4>
                    <p className="text-xs text-muted-foreground">Request total purging and destruction of your personal identity records from all our server clusters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/30 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                  <span className="h-6 w-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs mt-0.5">4</span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Right to Opt-Out</h4>
                    <p className="text-xs text-muted-foreground">Revoke marketing consent at any time and unsubscribe from newsletters or promotional offers.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Contact Us */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              id="contact"
              className="scroll-mt-28 bg-card border-2 border-primary/30 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary">
                  <Send className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                  7. Contact Our Privacy Officer
                </h2>
              </div>
              <div className="h-px bg-border/40 my-4 relative z-10" />

              <p className="text-muted-foreground text-sm sm:text-base relative z-10 mb-6">
                If you have questions about our privacy guidelines, want to exercise your legal data protection rights, or would like to submit a formal data deletion request, please reach out to our team:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-secondary/20 border border-border/40 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Send className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Privacy Inquiry Email</span>
                    <span className="text-sm sm:text-base font-bold text-foreground">rajdhanigrp@gmail.com</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md active:scale-95"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Email
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.section>

          </div>

        </div>

      </div>
    </div>
  );
}
