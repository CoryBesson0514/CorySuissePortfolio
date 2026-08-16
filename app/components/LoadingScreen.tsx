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
          FOND 100% NOIR
          LA VAGUE EXISTE UNIQUEMENT DANS "CORY"
      ===================================================== */}

      <div className="relative z-10 text-center">
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
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative text-4xl font-semibold tracking-[-0.06em] md:text-6xl"
        >
          {/* Texte blanc de base */}
          <span className="relative text-white">
            CORY
            <span className="text-white">.</span>
          </span>

          {/* =================================================
              COUCHE DE COULEUR
              MASQUÉE UNIQUEMENT PAR LE TEXTE
          ================================================= */}

          <motion.span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_25%,#8b5cf6_42%,#a855f7_50%,#6366f1_58%,#ffffff_75%,#ffffff_100%)]
              bg-[length:250%_100%]
              bg-clip-text
              text-transparent
            "
            animate={{
              backgroundPosition: ["120% 50%", "-20% 50%", "120% 50%"],
            }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            CORY
            <span>.</span>
          </motion.span>
        </motion.div>

        {/* =====================================================
            TEXTE CHARGEMENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/60"
        >
          Chargement
        </motion.div>
      </div>

      {/* =====================================================
          PETITE BARRE
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-[18%] left-1/2 h-px w-[180px] -translate-x-1/2 overflow-hidden bg-white/[0.06]">
        <motion.div
          className="
            h-full
            w-[60px]
            bg-gradient-to-r
            from-transparent
            via-purple-300/70
            to-transparent
          "
          animate={{
            x: ["-80px", "200px"],
          }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
}
