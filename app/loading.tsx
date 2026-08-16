"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050509]">
      {/* Halo très léger derrière le logo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.07] blur-[80px]"
        animate={{
          x: ["-80px", "80px", "-40px", "60px", "-80px"],
          opacity: [0.35, 0.6, 0.4, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 text-4xl font-semibold tracking-[-0.07em] text-white"
      >
        <span className="text-white">CORY</span>
        <span className="text-white">.</span>
      </motion.div>
    </div>
  );
}
