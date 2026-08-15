"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

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
              duration: 0.8,
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
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                CORY<span className="text-zinc-500">.</span>
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
                Portfolio · <span className="text-zinc-300">Suisse</span>
              </p>
            </div>
          </motion.div>

          {/* =========================================
              DRAPEAU SUISSE
          ========================================= */}

          <motion.div
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#ff0000]"
            initial={{
              width: 6,
              height: 6,
              borderRadius: "9999px",
              opacity: 0,
            }}
            animate={{
              width: ["6px", "6px", "180vmax", "180vmax", "180vmax"],
              height: ["6px", "6px", "180vmax", "180vmax", "180vmax"],
              borderRadius: ["9999px", "9999px", "0px", "0px", "0px"],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 3.8,
              delay: 0.9,
              times: [0, 0.08, 0.42, 0.8, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Croix verticale */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              style={{
                width: "12%",
                height: "36%",
              }}
            />

            {/* Croix horizontale */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              style={{
                width: "36%",
                height: "12%",
              }}
            />
          </motion.div>

          {/* =========================================
              FLASH FINAL
          ========================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-30 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.12, 0],
            }}
            transition={{
              duration: 0.7,
              delay: 4.1,
              ease: "easeOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
