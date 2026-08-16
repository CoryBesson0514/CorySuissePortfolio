"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);
  const [moving, setMoving] = useState(false);
  const [wave, setWave] = useState(false);

  const introLogoRef = useRef<HTMLSpanElement>(null);

  const [target, setTarget] = useState({
    x: 0,
    y: 0,
  });

  /*
   * =========================================================
   * ANIMATION DU LOGO
   * =========================================================
   *
   * 0s → 2s
   * Blanc pur
   *
   * 2s → 3.2s
   * Vague violette / bleue
   *
   * 3.2s → 5s
   * Retour progressif au blanc
   *
   * 5s
   * Départ vers la navbar
   */

  useEffect(() => {
    const waveTimer = setTimeout(() => {
      setWave(true);
    }, 2000);

    const moveTimer = setTimeout(() => {
      const introLogo = introLogoRef.current;

      const navbarLogo = document.querySelector(
        "[data-cory-navbar-logo]",
      ) as HTMLElement | null;

      if (!introLogo || !navbarLogo) {
        window.dispatchEvent(new Event("intro-finished"));
        setShow(false);
        return;
      }

      const introRect = introLogo.getBoundingClientRect();
      const navbarRect = navbarLogo.getBoundingClientRect();

      /*
       * Centre du logo de l'intro.
       */
      const introCenterX = introRect.left + introRect.width / 2;

      const introCenterY = introRect.top + introRect.height / 2;

      /*
       * Centre du logo de la navbar.
       */
      const navbarCenterX = navbarRect.left + navbarRect.width / 2;

      const navbarCenterY = navbarRect.top + navbarRect.height / 2;

      /*
       * Distance exacte jusqu'à la navbar.
       */
      setTarget({
        x: navbarCenterX - introCenterX,
        y: navbarCenterY - introCenterY,
      });

      setMoving(true);
    }, 5000);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(moveTimer);
    };
  }, []);

  /*
   * =========================================================
   * FIN DU DÉPLACEMENT
   * =========================================================
   */

  useEffect(() => {
    if (!moving) return;

    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("intro-finished"));

      setShow(false);
    }, 1250);

    return () => clearTimeout(timer);
  }, [moving]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
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
              LOGO CENTRAL
          ================================================= */}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: moving ? 0 : 1,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
          >
            <div className="text-center">
              {/* =================================================
                  CORY.
              ================================================= */}

              <span
                ref={introLogoRef}
                className="block text-4xl font-semibold tracking-[-0.06em] md:text-6xl"
              >
                <motion.span
                  animate={{
                    backgroundPosition: wave
                      ? ["0% 50%", "100% 50%", "0% 50%"]
                      : "0% 50%",
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, #ffffff 0%, #ffffff 35%, #a78bfa 45%, #8b5cf6 52%, #6366f1 60%, #a855f7 68%, #ffffff 82%, #ffffff 100%)",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "0% 50%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  CORY
                  <span
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    .
                  </span>
                </motion.span>
              </span>

              {/* =================================================
                  SOUS-TITRE
              ================================================= */}

              <motion.p
                className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600"
                animate={{
                  opacity: moving ? 0 : 1,
                }}
                transition={{
                  duration: 0.15,
                }}
              >
                Portfolio · <span className="text-zinc-300">Suisse</span>
              </motion.p>
            </div>
          </motion.div>

          {/* =================================================
              LOGO QUI REJOINT LA NAVBAR
          ================================================= */}

          <AnimatePresence>
            {moving && (
              <motion.span
                className="pointer-events-none fixed left-1/2 top-1/2 z-[100000] whitespace-nowrap text-sm font-semibold tracking-tight text-white"
                initial={{
                  x: "-50%",
                  y: "-50%",
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: `calc(-50% + ${target.x}px)`,
                  y: `calc(-50% + ${target.y}px)`,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                CORY
                <span className="text-zinc-500">.</span>
              </motion.span>
            )}
          </AnimatePresence>

          {/* =================================================
              PETIT FADE FINAL
          ================================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-[99998] bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: moving ? 0.15 : 0,
            }}
            transition={{
              duration: 0.35,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
