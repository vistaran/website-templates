"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { titleVariants, desVariants, tagVariants } from "@/utils/animations";
import { motion, useTransform, useScroll } from "framer-motion";
import Timeline from "./Timeline";

export default function AboutContent() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <div className="">
      {/* Main Content */}

      <Timeline />

      <div className="py-8 md:py-16 bg-orange-200 dark:bg-tertiary text-center">
        <div className="mx-auto w-5/6 h-auto xl:px-28 pb-10">
          <div>
            <motion.h1
              initial="initial"
              whileInView={"animate"}
              variants={titleVariants}
              className="text-xl md:text-5xl py-4 "
            >
              Looking Ahead: The Future of Rajdhani Group
            </motion.h1>
          </div>
          <motion.div
            initial="initial"
            whileInView={"animate"}
            variants={tagVariants}
            className=""
          >
            <p className="my-10">
              As Rajdhani Group looks to the future, its vision remains focused
              on growth, innovation, and sustainability. With a diversified
              portfolio of businesses and a strong foundation built over
              decades, the company is well-positioned to capitalize on new
              opportunities in both domestic and international markets. Whether
              it's through expanding its product lines, entering new industries,
              or exploring global partnerships, Rajdhani Group is poised to
              continue its legacy of excellence for generations to come.
            </p>

            <p>
              In conclusion, Rajdhani Group's journey from a small timber
              business to a multi-industry conglomerate is a remarkable story of
              vision, hard work, and dedication. With a commitment to quality,
              innovation, and sustainability, the group has become a trusted
              name across various sectors, making a lasting impact on the
              industries it serves and the communities it operates in. With this strategic move, Rajdhani Group is set to become a holistic player in the construction and interior industry, meeting every aspect of design, materials, and implementation under one roof.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
