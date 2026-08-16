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
            <div className="relative text-5xl font-semibold tracking-[-0.07em] md:text-7xl">
              {/* =================================================
                  CORY BLANC
              ================================================= */}

              <span className="relative z-0 text-white">
                CORY
                <span className="text-zinc-500">.</span>
              </span>

              {/* =================================================
                  VAGUE VIOLETTE
                  UNIQUEMENT DANS LES LETTRES
              ================================================= */}

              <motion.span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-10
                  bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,#8b5cf6_45%,#c084fc_50%,#6366f1_55%,#ffffff_70%,#ffffff_100%)]
                  bg-[length:300%_100%]
                  bg-clip-text
                  text-transparent
                "
                animate={{
                  backgroundPosition: ["120% 50%", "0% 50%", "-120% 50%"],
                }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              >
                CORY
                <span>.</span>
              </motion.span>
            </div>

            {/* =================================================
                SOUS-TITRE
            ================================================= */}

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
