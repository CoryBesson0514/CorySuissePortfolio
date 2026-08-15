"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
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
              CONTENU
          ========================================= */}

          <motion.div
            className="text-center"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* NOM */}

            <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
              CORY
              <span className="text-zinc-500">.</span>
            </p>

            {/* SOUS-TITRE */}

            <motion.p
              className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600"
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Portfolio · <span className="text-zinc-300">Suisse</span>
            </motion.p>
          </motion.div>

          {/* =========================================
              LÉGER FADE FINAL
          ========================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0, 0.15, 0],
            }}
            transition={{
              duration: 1.1,
              delay: 3.2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
