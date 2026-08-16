"use client";

import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex items-center justify-center bg-[#050509]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
    >
      <motion.div
        className="relative z-[100] text-5xl font-semibold tracking-[-0.06em]"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {/* Texte blanc */}
        <span className="text-white">CORY.</span>

        {/* Vague STRICTEMENT limitée au texte */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-transparent"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 35%, #6366f1 45%, #8b5cf6 50%, #a855f7 55%, #ec4899 60%, transparent 70%, transparent 100%)",
            backgroundSize: "250% 100%",
            backgroundPosition: "200% 0",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-100% 0%"],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          CORY.
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
