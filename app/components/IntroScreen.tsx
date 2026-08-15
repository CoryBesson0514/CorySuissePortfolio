"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("cory-intro-seen");

    if (hasSeenIntro) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("cory-intro-seen", "true");
      setShow(false);
    }, 4600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[10000] overflow-hidden bg-black"
        >
          {/* =========================
              CONTENU PRINCIPAL
          ========================= */}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
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
              className="relative z-10 text-center"
            >
              {/* CORY */}

              <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                CORY
                <span className="text-zinc-500">.</span>
              </p>

              {/* SUISSE */}

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
                  delay: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Portfolio ·{" "}
                  <span className="relative inline-block text-zinc-300">
                    Suisse
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* =========================
              DRAPEAU SUISSE
          ========================= */}

          <motion.div
            initial={{
              scale: 0.025,
              opacity: 0,
            }}
            animate={{
              scale: [0.025, 0.025, 1.12, 1, 1, 0.025],
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 3.7,
              delay: 0.9,
              times: [0, 0.08, 0.32, 0.42, 0.72, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[100vw] w-[100vw] min-h-[100vh] min-w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-[#ff0000]"
            style={{
              transformOrigin: "center center",
            }}
          >
            {/* =========================
                CROIX BLANCHE
            ========================= */}

            <div className="absolute left-1/2 top-1/2 h-[32%] w-[12%] -translate-x-1/2 -translate-y-1/2 bg-white" />

            <div className="absolute left-1/2 top-1/2 h-[12%] w-[32%] -translate-x-1/2 -translate-y-1/2 bg-white" />
          </motion.div>

          {/* =========================
              TEXTE AU-DESSUS DU DRAPEAU
          ========================= */}

          <motion.div
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: [1, 1, 0, 0],
            }}
            transition={{
              duration: 2.2,
              delay: 0.9,
              times: [0, 0.18, 0.5, 1],
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                CORY
                <span className="text-white/50">.</span>
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/80">
                Portfolio · Suisse
              </p>
            </div>
          </motion.div>

          {/* =========================
              PETIT FLASH FINAL
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0, 0.12, 0],
            }}
            transition={{
              duration: 1,
              delay: 3.4,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 z-40 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
