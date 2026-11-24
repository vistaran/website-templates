"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { desVariants } from "@/utils/animations";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  const brandLogos = [
    { src: "/images/brands/logos/r-kitchen.png", alt: "R Kitchen" },
    { src: "/images/brands/logos/r-plywood.png", alt: "R Plywood" },
    { src: "/images/brands/logos/r-hardware.png", alt: "R Hardware" },
    { src: "/images/brands/logos/r-timber.png", alt: "Rajdhani Timber" },
    { src: "/images/brands/logos/R-Avirat.png", alt: "Avirat" },
    { src: "/images/brands/logos/R-Sthapatya-Arcitech-Logo.jpg", alt: "Sthapatya" },
  ];

  return (
    <motion.div
      initial="initial"
      whileInView={"animate"}
      variants={desVariants}
      viewport={{ once: true }}
    >
      <footer className="bg-background border-t border-border/40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="mx-auto w-full max-w-screen-xl p-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand Section */}
            <div className="md:col-span-12 lg:col-span-5">
              <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
                <div className="p-0.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/30 shadow-[0_0_15px_rgba(234,88,12,0.2)]">
                  <Image
                    src="/images/brands/logos/rajdhani-new-logo.png"
                    alt="Rajdhani Group Logo"
                    width={48}
                    height={48}
                    className="object-none rounded-full p-1 bg-zinc-900"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold tracking-wide text-foreground">
                  Rajdhani Group
                </h3>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                Elevating lifestyles through premium interior solutions, modular designs, and architectural excellence since our inception.
              </p>

              {/* Mini Brand Logos */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Our Brands</p>
                <div className="grid grid-cols-4 sm:flex sm:flex-nowrap gap-2 sm:gap-3 w-fit">
                  {brandLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      className="relative flex-shrink-0 group flex items-center justify-center rounded-xl bg-zinc-800 dark:bg-zinc-800 border border-border/60 hover:border-primary/50 shadow-sm transition-all duration-300 w-14 h-14 sm:w-[72px] sm:h-[72px]"
                      whileHover={{ scale: 1.05, y: -4, zIndex: 50 }}
                      title={logo.alt}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={140}
                        height={140}
                        className="object-contain w-full h-full p-2 relative z-10 drop-shadow-md group-hover:scale-[1.8] group-hover:-translate-y-2 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:pl-12">
              <div>
                <h2 className="mb-6 text-sm font-bold text-foreground uppercase tracking-widest">
                  Resources
                </h2>
                <ul className="space-y-4">
                  {[
                    { name: 'R Kitchen Gallery', href: '/kitchen' },
                    { name: 'Rajdhani Plywood', href: '/plywood' },
                    { name: 'Rajdhani Hardware', href: '/hardware' },
                    { name: 'Rajdhani Timber', href: '/timber' },
                    { name: 'Sthapatya Architects', href: '/sthapatya-architects' }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-6 text-sm font-bold text-foreground uppercase tracking-widest">
                  Legal
                </h2>
                <ul className="space-y-4">
                  <li>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>
                      Privacy Policy
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>
                      Terms of Service
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-8 border-border/40" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground text-center sm:text-left">
              © 2024{" "}
              <Link href="https://rajdhaniliving.com/" className="font-medium hover:text-primary transition-colors">
                Rajdhani Group
              </Link>
              . All Rights Reserved.
            </span>

            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1">
                <span className="sr-only">Linkedin</span>
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1">
                <span className="sr-only">Discord</span>
                <FaDiscord className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}