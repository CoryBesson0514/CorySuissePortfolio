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
          LA COULEUR RESTE STRICTEMENT À L'INTÉRIEUR DU TEXTE
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
          className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl"
        >
          <motion.span
            className="inline-block bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_38%,#ffffff_50%,#a78bfa_65%,#8b5cf6_75%,#6366f1_85%,#ffffff_100%)] bg-[length:300%_100%] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            CORY
            <span className="text-white">.</span>
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
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            opacity: {
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/60"
        >
          Chargement
        </motion.div>
      </div>

      {/* =====================================================
          LIGNE DE CHARGEMENT
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
