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
    }, 3000); // 3 secondes temps d'affichage de l'écran d'introduction

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
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center"
          >
            <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
              CORY<span className="text-zinc-500">.</span>
            </p>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.35,
              }}
              className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600"
            >
              Portfolio · Suisse
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
