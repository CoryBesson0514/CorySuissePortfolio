"use client";

import { motion } from "motion/react";

export default function SectionDivider() {
  return (
    <div className="relative mx-auto h-px w-full max-w-7xl overflow-hidden">
      {/* Ligne de base */}

      <div className="absolute inset-0 bg-white/[0.06]" />

      {/* Lumière violette */}

      <motion.div
        initial={{
          left: "-20%",
          opacity: 0,
        }}
        whileInView={{
          left: "120%",
          opacity: [0, 1, 1, 0],
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-0
          h-px
          w-[25%]
          bg-gradient-to-r
          from-transparent
          via-violet-400
          to-transparent
        "
      />

      {/* Petit point lumineux */}

      <motion.div
        initial={{
          left: "0%",
          opacity: 0,
        }}
        whileInView={{
          left: "100%",
          opacity: [0, 0.8, 0],
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-[1px]
          h-[3px]
          w-12
          rounded-full
          bg-violet-300
          blur-[2px]
        "
      />
    </div>
  );
}
