"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center overflow-hidden bg-black">
      {/* =================================================
          LUMIÈRE
      ================================================= */}

      <motion.div
        className="pointer-events-none absolute h-[500px] w-[900px] rounded-full bg-purple-600/20 blur-[140px]"
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: [0, 1, 0.7],
          scale: [0.6, 1.1, 1],
        }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
      />

      {/* =================================================
          LOGO
      ================================================= */}

      <motion.div
        className="relative z-10 text-4xl font-semibold tracking-[-0.07em] text-white md:text-6xl"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        CORY
        <span className="text-zinc-500">.</span>
      </motion.div>
    </div>
  );
}
