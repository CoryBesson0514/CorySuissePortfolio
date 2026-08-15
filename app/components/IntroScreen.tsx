"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* =========================================
              TEXTE
          ========================================= */}

          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                CORY
                <span className="text-zinc-500">.</span>
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
                Portfolio · <span className="text-zinc-300">Suisse</span>
              </p>
            </div>
          </motion.div>

          {/* =========================================
              ORIGINE DU DRAPEAU
              Positionnée exactement autour de "Suisse"
          ========================================= */}

          <motion.div
            className="absolute z-20 overflow-hidden bg-[#ff0000]"
            style={{
              left: "50%",
              top: "calc(50% + 25px)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              width: 0,
              height: 0,
              borderRadius: "9999px",
              opacity: 0,
            }}
            animate={{
              width: ["0px", "18px", "18px", "160vmax"],
              height: ["0px", "18px", "18px", "160vmax"],
              borderRadius: ["9999px", "9999px", "9999px", "0px"],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              duration: 2.8,
              delay: 1.15,
              times: [0, 0.15, 0.35, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Croix verticale */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.05,
                duration: 0.35,
              }}
              style={{
                width: "12%",
                height: "36%",
              }}
            />

            {/* Croix horizontale */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.05,
                duration: 0.35,
              }}
              style={{
                width: "36%",
                height: "12%",
              }}
            />
          </motion.div>

          {/* =========================================
              RÉVÉLATION DU SITE
          ========================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-30 bg-black"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.15, 0],
            }}
            transition={{
              duration: 1.1,
              delay: 3.9,
              ease: "easeInOut",
            }}
          />

          {/* =========================================
              FADE FINAL
          ========================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0, 1],
            }}
            transition={{
              duration: 1,
              delay: 4.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
