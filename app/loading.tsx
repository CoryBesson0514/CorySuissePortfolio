"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050509]">
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
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-4xl font-semibold tracking-[-0.07em] text-white"
      >
        CORY
        <span className="text-white">.</span>
      </motion.div>
    </div>
  );
}
