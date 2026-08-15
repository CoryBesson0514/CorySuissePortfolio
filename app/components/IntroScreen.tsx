"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);
  const [moving, setMoving] = useState(false);

  const introLogoRef = useRef<HTMLSpanElement>(null);

  const [logoPosition, setLogoPosition] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const introLogo = introLogoRef.current;
      const navbarLogo = document.querySelector(
        "[data-cory-navbar-logo]",
      ) as HTMLElement | null;

      if (!introLogo || !navbarLogo) {
        setShow(false);
        return;
      }

      const from = introLogo.getBoundingClientRect();
      const to = navbarLogo.getBoundingClientRect();

      const fromX = from.left + from.width / 2;
      const fromY = from.top + from.height / 2;

      const toX = to.left + to.width / 2;
      const toY = to.top + to.height / 2;

      setLogoPosition({
        x: toX - fromX,
        y: toY - fromY,
        scale: to.width / from.width,
      });

      setMoving(true);
    }, 3000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!moving) return;

    const finishTimer = setTimeout(() => {
      window.dispatchEvent(new Event("intro-finished"));
      setShow(false);
    }, 1250);

    return () => clearTimeout(finishTimer);
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
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* =========================================
              CONTENU INTRO
          ========================================= */}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: moving ? 0 : 1,
              y: moving ? -8 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="text-center">
              {/* =====================================
                  LOGO QUI VA SE DÉPLACER
              ===================================== */}

              <span
                ref={introLogoRef}
                className="block text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl"
              >
                CORY
                <span className="text-zinc-500">.</span>
              </span>

              {/* =====================================
                  SOUS-TITRE
              ===================================== */}

              <motion.p
                className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600"
                animate={{
                  opacity: moving ? 0 : 1,
                  y: moving ? -5 : 0,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                Portfolio · <span className="text-zinc-300">Suisse</span>
              </motion.p>
            </div>
          </motion.div>

          {/* =========================================
              LOGO VOLANT VERS LA NAVBAR
          ========================================= */}

          {moving && (
            <motion.span
              className="pointer-events-none fixed left-1/2 top-1/2 z-[100000] block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl"
              initial={{
                x: 0,
                y: 0,
                scale: 1,
              }}
              animate={{
                x: logoPosition.x,
                y: logoPosition.y,
                scale: logoPosition.scale,
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
            className="pointer-events-none absolute inset-0 bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: moving ? 0.15 : 0,
            }}
            transition={{
              duration: 0.6,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
