"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);
  const [moving, setMoving] = useState(false);

  const introLogoRef = useRef<HTMLSpanElement>(null);

  const [target, setTarget] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const introLogo = introLogoRef.current;

      const navbarLogo = document.querySelector(
        "[data-cory-navbar-logo]",
      ) as HTMLElement | null;

      if (!introLogo || !navbarLogo) {
        setShow(false);
        return;
      }

      const introRect = introLogo.getBoundingClientRect();
      const navbarRect = navbarLogo.getBoundingClientRect();

      /*
       * On récupère directement la position
       * du logo navbar dans le viewport.
       *
       * Pas de calcul avec 50%.
       * Pas de translateY.
       * Pas de décalage approximatif.
       */

      setTarget({
        left: navbarRect.left,
        top: navbarRect.top,
        width: navbarRect.width,
        height: navbarRect.height,
      });

      setMoving(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!moving) return;

    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("intro-finished"));

      setTimeout(() => {
        setShow(false);
      }, 250);
    }, 1250);

    return () => clearTimeout(timer);
  }, [moving]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* =========================================
              CORY CENTRAL
          ========================================= */}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: moving ? 0 : 1,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="text-center">
              <span
                ref={introLogoRef}
                className="block text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl"
              >
                CORY
                <span className="text-zinc-500">.</span>
              </span>

              <motion.p
                className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600"
                animate={{
                  opacity: moving ? 0 : 1,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                Portfolio · <span className="text-zinc-300">Suisse</span>
              </motion.p>
            </div>
          </motion.div>

          {/* =========================================
              CORY QUI VOYAGE
          ========================================= */}

          {moving && (
            <motion.span
              className="pointer-events-none fixed z-[100001] whitespace-nowrap text-sm font-semibold tracking-tight text-white"
              initial={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                left: target.left,
                top: target.top,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              CORY
              <span className="text-zinc-500">.</span>
            </motion.span>
          )}

          {/* =========================================
              PETIT FADE FINAL
          ========================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-[100000] bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: moving ? [0, 0, 1] : 0,
            }}
            transition={{
              duration: 0.45,
              delay: moving ? 1.05 : 0,
              ease: "easeOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
