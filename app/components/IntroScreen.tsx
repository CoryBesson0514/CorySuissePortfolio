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
       * Position EXACTE du centre du logo navbar.
       */

      const introCenterX = introRect.left + introRect.width / 2;
      const introCenterY = introRect.top + introRect.height / 2;

      const navbarCenterX = navbarRect.left + navbarRect.width / 2;
      const navbarCenterY = navbarRect.top + navbarRect.height / 2;

      setTarget({
        left: navbarCenterX - introCenterX,
        top: navbarCenterY - introCenterY,
      });

      setMoving(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!moving) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 1350);

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
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* =========================================
              CORY AU CENTRE
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
              CORY QUI REJOINT LA NAVBAR
          ========================================= */}

          {moving && (
            <motion.span
              className="pointer-events-none fixed left-1/2 top-1/2 z-[100000] whitespace-nowrap text-sm font-semibold tracking-tight text-white"
              initial={{
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                x: `calc(-50% + ${target.left}px)`,
                y: `calc(-50% + ${target.top}px)`,
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
