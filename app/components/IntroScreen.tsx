"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);

      window.dispatchEvent(new Event("intro-finished"));
    }, 5200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* =================================================
              VAGUE DE COULEUR
          ================================================= */}

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.7,
              x: "-20%",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.7, 1.15, 1.15, 1.4],
              x: ["-20%", "0%", "20%", "40%"],
            }}
            transition={{
              duration: 3.8,
              delay: 1.7,
              ease: "easeInOut",
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30 blur-[120px]" />

            <div className="absolute left-[30%] top-[40%] h-[300px] w-[500px] rounded-full bg-violet-500/25 blur-[110px]" />

            <div className="absolute right-[20%] top-[30%] h-[280px] w-[450px] rounded-full bg-indigo-500/20 blur-[110px]" />
          </motion.div>

          {/* =================================================
              LOGO
          ================================================= */}

          <motion.div
            className="relative z-10 text-center"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="text-5xl font-semibold tracking-[-0.07em] md:text-7xl"
              animate={{
                color: [
                  "#ffffff",
                  "#ffffff",
                  "#c4b5fd",
                  "#a78bfa",
                  "#ffffff",
                  "#ffffff",
                ],
              }}
              transition={{
                duration: 5,
                times: [0, 0.35, 0.48, 0.6, 0.78, 1],
                ease: "easeInOut",
              }}
            >
              CORY
              <span className="text-zinc-500">.</span>
            </motion.div>

            <motion.p
              className="mt-3 text-[10px] uppercase tracking-[0.35em] text-zinc-600"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
            >
              Portfolio · Suisse
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
