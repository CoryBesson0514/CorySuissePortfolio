"use client";

import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex items-center justify-center overflow-hidden bg-[#050509]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* =====================================================
          FOND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/*
          Halo principal.
          Beaucoup plus petit et moins opaque.
          Il ne doit PAS donner l'impression d'un nuage.
        */}

        <motion.div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-1/2
            h-[150px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(ellipse,rgba(139,92,246,0.13)_0%,rgba(139,92,246,0.055)_35%,transparent_68%)]
            blur-[45px]
          "
          animate={{
            x: ["-180px", "180px", "-120px", "140px", "-180px"],
            scaleX: [1, 1.08, 0.98, 1.06, 1],
            opacity: [0.5, 0.8, 0.55, 0.72, 0.5],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/*
          Petite lumière blanche qui traverse le violet.
          Très discrète pour garder le fond sombre.
        */}

        <motion.div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-1/2
            h-[70px]
            w-[280px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(ellipse,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.035)_38%,transparent_72%)]
            blur-[35px]
          "
          animate={{
            x: ["140px", "-140px", "100px", "-100px", "140px"],
            opacity: [0.25, 0.5, 0.3, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="relative z-20 flex flex-col items-center">
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
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            text-4xl
            font-semibold
            leading-none
            tracking-[-0.06em]
            text-white
            md:text-6xl
          "
        >
          {/* Blanc BRUT */}
          <span className="text-[#ffffff]">CORY</span>
          <span className="text-[#ffffff]">.</span>
        </motion.div>

        {/* Chargement */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            opacity: {
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          className="
            mt-4
            text-[10px]
            font-medium
            uppercase
            tracking-[0.35em]
            text-white
          "
        >
          Chargement
        </motion.div>
      </div>

      {/* =====================================================
          INDICATEUR
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[18%]
          left-1/2
          h-px
          w-[180px]
          -translate-x-1/2
          overflow-hidden
          bg-white/[0.05]
        "
      >
        <motion.div
          className="
            h-full
            w-[55px]
            bg-gradient-to-r
            from-transparent
            via-white/60
            to-transparent
          "
          animate={{
            x: ["-70px", "190px"],
          }}
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
}
