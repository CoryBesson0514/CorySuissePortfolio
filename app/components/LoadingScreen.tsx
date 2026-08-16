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
          HALO — ARRIÈRE-PLAN UNIQUEMENT
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Halo principal */}

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-[420px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(ellipse,rgba(139,92,246,0.20)_0%,rgba(168,85,247,0.10)_35%,rgba(99,102,241,0.04)_55%,transparent_75%)]
            blur-[70px]
          "
          animate={{
            x: ["-20%", "20%", "-12%", "18%", "-20%"],
            scale: [1, 1.08, 1.03, 1.07, 1],
            opacity: [0.65, 0.9, 0.75, 0.85, 0.65],
          }}
          transition={{
            duration: 9,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Lumière blanche très subtile */}

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-[180px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(ellipse,rgba(255,255,255,0.10)_0%,rgba(196,181,253,0.05)_30%,transparent_70%)]
            blur-[55px]
          "
          animate={{
            x: ["18%", "-18%", "10%", "-15%", "18%"],
            scaleX: [1, 1.12, 0.96, 1.08, 1],
            opacity: [0.45, 0.7, 0.5, 0.65, 0.45],
          }}
          transition={{
            duration: 7,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Petit halo violet secondaire */}

        <motion.div
          className="
            absolute
            left-1/2
            top-[42%]
            h-[220px]
            w-[220px]
            -translate-x-1/2
            rounded-full
            bg-purple-500/[0.10]
            blur-[80px]
          "
          animate={{
            x: ["-140px", "140px", "-80px", "110px", "-140px"],
            y: ["0px", "-20px", "10px", "-15px", "0px"],
          }}
          transition={{
            duration: 11,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      {/* =====================================================
          LOGO
          TOUJOURS AU-DESSUS DU HALO
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
          className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl"
        >
          CORY
          <span className="text-white">.</span>
        </motion.div>

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
          PETITE LIGNE DE LUMIÈRE
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
