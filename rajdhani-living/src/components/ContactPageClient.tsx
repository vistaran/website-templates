'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Sparkles,
  Compass,
  Building2,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronDown
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const contacts = [
  {
    name: 'R Kitchen Gallery',
    specialty: 'Premium Modular Kitchens & Luxury Appliances',
    image: '/images/kitchen1.jpg',
    address: 'Shop No.-5,6, Pratik Mall, Gandhinagar-Koba Highway, Kudasan, Gujarat 382421',
    phone: '097129 43740',
    mapLink: 'https://maps.app.goo.gl/7brAxNgGeG4RCFc96',
    hours: '10:00 AM - 8:00 PM',
  },
  {
    name: 'Rajdhani Plywood',
    specialty: 'Premium Plywood, Designer Veneers & Laminates',
    image: '/images/imageplywood.jpg',
    address: 'Plot No. 380/1, Near R-world 16, Besides Trupti Ice-Cream, Opp. Axis Bank, Sector 16, Gandhinagar, Gujarat 382016',
    phone: '099090 32740',
    mapLink: 'https://maps.app.goo.gl/LLVZj4ZLx7AzcPt16',
    hours: '10:00 AM - 8:00 PM',
  },
  {
    name: 'Rajdhani Hardware',
    specialty: 'Designer Architectural Hardware & Fittings',
    image: '/images/imagehardware.jpg',
    address: 'G-10, Meghamalhar, Sector 11, Gandhinagar, Gujarat 382011',
    phone: '098795 11342',
    mapLink: 'https://maps.app.goo.gl/rfLJwZ4TDNzQjeu59',
    hours: '10:00 AM - 8:00 PM',
  },
];

const whatsappNumber = '919909032740';

export default function ContactPageClient() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', branch: 'Kitchen', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', branch: 'Kitchen', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-20 overflow-hidden relative selection:bg-primary selection:text-white">

      {/* Decorative Radial glow spots */}
      <div className="absolute top-[30%] -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[60%] -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cover bg-center bg-[url('/images/backgroundproject.jpg')] min-h-[50vh] md:min-h-[55vh] flex items-center justify-center py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-background z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.1)_0%,transparent_80%)] z-0"></div>

        <div className="relative container mx-auto px-4 xl:px-28 z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>Connect With Our Experts</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md font-serif"
          >
            Let's Shape Your <span className="italic text-primary font-serif">Dream Space</span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-primary my-6 rounded-full"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-white/90 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-8"
          >
            Have a project in mind, need professional consultations, or want to explore our world-class design materials?
            Reach out to our experts or visit one of our luxury experience showrooms in Gandhinagar.
          </motion.p>

          {/* Micro badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm"
          >
            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 backdrop-blur-sm shadow-md">
              <ShieldCheck className="w-4 h-4 text-primary" />
              100% Genuine Quality
            </span>
            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 backdrop-blur-sm shadow-md">
              <Award className="w-4 h-4 text-primary" />
              Premium Aesthetics
            </span>
            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 backdrop-blur-sm shadow-md">
              <Compass className="w-4 h-4 text-primary" />
              Personalized Consultation
            </span>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 xl:px-28 -mt-10 relative z-10">

        {/* Experience Studios Heading */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase mb-2">
            <Building2 className="w-4 h-4" />
            <span>Showrooms & Experience Centres</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Visit Our Nearest Experience Studios
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl">
            Step in to experience live setups, touch premium materials, and co-create with our designers.
          </p>
        </div>

        {/* Showrooms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24"
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group flex flex-col h-full bg-card/50 dark:bg-card/30 backdrop-blur-md rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={contact.image}
                  alt={contact.name}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-primary/90 text-primary-foreground">
                    {contact.name.includes('Kitchen') ? 'Kitchen' : contact.name.includes('Plywood') ? 'Plywood' : 'Hardware'}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-serif mt-1">{contact.name}</h3>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground font-medium italic -mt-1 leading-relaxed">
                    {contact.specialty}
                  </p>

                  <div className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:animate-bounce" />
                    <span>{contact.address}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{contact.hours} <span className="text-xs text-muted-foreground">(Mon-Sat)</span></span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border/40">
                  <a
                    href={contact.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors w-full justify-between"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lower Section: Form and Live Support */}
        <div className="w-full">

          {/* Direct Support & WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full gap-8 grid grid-cols-1 lg:grid-cols-2 items-stretch"
          >
            {/* WhatsApp Premium Widget */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent dark:from-green-600/10 dark:via-green-500/2 rounded-3xl p-6 md:p-8 border border-green-500/20 shadow-xl flex-grow flex flex-col justify-between">

              {/* Pulsing online indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold text-green-500 uppercase tracking-wider">
                    Design Desk Active Now
                  </span>
                </div>
                <FaWhatsapp className="text-3xl text-green-500" />
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3">
                  Instant Support via WhatsApp
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  Want to skip forms? Connect with us on WhatsApp. Share layouts, view our catalogs instantly, or book an onsite home visit directly with our team.
                </p>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-[0_4px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.45)] transition-all duration-300 transform active:scale-[0.98]"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat Instantly with Experts</span>
              </a>
            </div>

            {/* General Corporate Contacts */}
            <div className="bg-card/40 dark:bg-card/20 backdrop-blur-md border border-border/70 rounded-3xl p-6 md:p-8 shadow-xl">
              <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-4">
                Corporate Communications
              </h4>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex items-center justify-between py-2 border-b border-border/30">
                  <span className="text-muted-foreground">General Queries</span>
                  <a href="mailto:rajdhanigrp@gmail.com" className="font-semibold text-primary hover:underline">
                    rajdhanigrp@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/30">
                  <span className="text-muted-foreground">Call Main Office</span>
                  <a href="tel:+919909032740" className="font-semibold text-foreground hover:text-primary transition-colors">
                    +91 99090 32740
                  </a>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Support Hours</span>
                  <span className="font-semibold text-foreground/80">
                    10 AM - 8 PM (GMT +5:30)
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
