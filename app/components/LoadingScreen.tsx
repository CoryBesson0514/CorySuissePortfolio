"use client";

import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex items-center justify-center overflow-hidden bg-[#050509]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="relative z-10 flex flex-col items-center">
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
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden text-4xl font-semibold leading-none tracking-[-0.06em] md:text-6xl"
        >
          {/* =================================================
              TEXTE BLANC DE BASE
          ================================================= */}

          <span className="relative z-10 text-white">CORY.</span>

          {/* =================================================
              VAGUE DE COULEUR
              La couleur est CLIPPÉE dans le texte.
          ================================================= */}

          <motion.span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              text-transparent
              bg-clip-text
              [-webkit-background-clip:text]
              bg-[linear-gradient(110deg,transparent_0%,transparent_30%,#6366f1_40%,#8b5cf6_48%,#a855f7_54%,#ec4899_60%,#8b5cf6_66%,#6366f1_72%,transparent_82%,transparent_100%)]
            "
            animate={{
              backgroundPosition: ["-180% 0%", "180% 0%"],
            }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.2,
            }}
            style={{
              backgroundSize: "220% 100%",
            }}
          >
            CORY.
          </motion.span>
        </motion.div>

        {/* =====================================================
            CHARGEMENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
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
          PETIT INDICATEUR
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
            via-purple-300/70
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
