"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { TbArrowUpRight } from "react-icons/tb";
import { titleVariants, desVariants, tagVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Committment() {
  return (
    <section className="py-16 md:py-24 bg-zinc-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2 dark:bg-primary/20 transition-colors duration-500"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Container */}
        <div className="bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 md:p-12 lg:p-16 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden transition-colors duration-500">
          
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] dark:bg-primary/20 transition-colors duration-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            
            {/* Left Title Area (5 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-zinc-500 dark:text-zinc-400 tracking-[0.2em] uppercase text-xs font-bold transition-colors duration-500">Our Vision</span>
              </div>
              
              <h1 className="font-serif font-bold text-zinc-900 dark:text-white tracking-tight flex flex-col transition-colors duration-500">
                <span className="text-4xl md:text-5xl lg:text-5xl leading-tight text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
                  A Commitment
                </span>
                <span className="text-3xl md:text-4xl text-zinc-400 dark:text-zinc-500 font-light italic my-2 transition-colors duration-500">
                  to
                </span>
                <span className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 leading-none py-2 drop-shadow-sm dark:drop-shadow-none">
                  Innovation
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl text-zinc-500 dark:text-zinc-400 font-light mt-2 leading-tight transition-colors duration-500">
                  &amp; Sustainability.
                </span>
              </h1>
            </motion.div>

            {/* Right Text Area (7 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 lg:pt-8 relative"
            >
              <span className="text-[8rem] text-primary/5 dark:text-primary/10 font-serif absolute -top-12 -left-6 pointer-events-none select-none hidden lg:block transition-colors duration-500">"</span>
              
              <div className="md:columns-2 gap-8 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light transition-colors duration-500">
                <p className="mb-4">
                  Throughout its journey, Rajdhani Group has remained committed to
                  innovation and sustainability. The company continually invests in
                  research and development to stay at the forefront of industry trends
                  and advancements.
                </p>
                <p className="mb-4">
                  Whether it's through the adoption of eco-friendly
                  manufacturing processes or the development of cutting-edge products,
                  Rajdhani Group is dedicated to reducing its environmental impact and
                  contributing to a more sustainable future.
                </p>
                <p className="mb-4 break-inside-avoid">
                  In the aluminum industry, for example, the group has implemented energy-efficient practices at
                  its Avirat Metal plant to reduce energy consumption and minimize
                  waste.
                </p>
                <p className="break-inside-avoid">
                  Similarly, in its timber and plywood operations, Rajdhani
                  Group ensures that its wood products are sourced from sustainable
                  forests, aligning with its goal of responsible sourcing and
                  production.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4 pt-6 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold transition-colors duration-500">Rajdhani Group</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
