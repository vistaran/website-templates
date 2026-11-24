"use client";

import React from "react";
import { Button } from "./ui/button";
import { TbArrowUpRight } from "react-icons/tb";
import Image from "next/image";
import { titleVariants, desVariants, tagVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import CookiesPopup from "./cookies-popup";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();

  const handleBookNowClick = () => {
    router.push("/contact");
  };

  return (
    <div className="lg:py-17 px-4 mx-auto text-center xl:px-28 lg:flex lg:justify-center items-center relative">
      <div className="py-20 md:py-60 ">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl lg:leading-[0.9] text-white font-serif font-bold tracking-tight"
        >
          Transform Your Space
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href={"https://wa.me/919909032740"}>
            <Button
              onClick={handleBookNowClick}
              className="w-full md:w-1/4 inline-flex justify-center rounded-full px-10 py-6 my-10 gap-2 shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 ring-offset-2 text-center text-lg font-medium tracking-wide"
            >
              Contact Us Now <TbArrowUpRight />
            </Button>
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:w-3/4 text-white/90 mx-auto text-lg leading-relaxed font-light backdrop-blur-sm bg-black/10 p-6 rounded-2xl border border-white/10"
          >
            At Rajdhani Group, we specialize in innovative interior design that reflects your style. We offer premium plywood, hardware, and materials to transform residential and commercial spaces with quality craftsmanship and creative concepts. Whether renovating, redecorating, or building from scratch, trust us to elevate the aesthetics and functionality of your space.
          </motion.p>
        </motion.div>
      </div>

      <CookiesPopup />
    </div>
  );
};

export default HeroSection;
