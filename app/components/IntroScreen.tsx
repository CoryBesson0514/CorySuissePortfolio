"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5200);

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
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* =========================================
              TEXTE
          ========================================= */}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl"
              >
                CORY
                <span className="text-zinc-500">.</span>
              </motion.p>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
                Portfolio ·{" "}
                {/* =====================================
                    SUISSE = ORIGINE DU DRAPEAU
                ===================================== */}
                <span className="relative inline-block">
                  {/* Le mot Suisse */}
                  <motion.span
                    className="relative z-20 inline-block"
                    initial={{
                      color: "#a1a1aa",
                    }}
                    animate={{
                      color: [
                        "#a1a1aa",
                        "#d4d4d8",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                      ],
                    }}
                    transition={{
                      duration: 2.2,
                      delay: 0.9,
                      times: [0, 0.3, 0.45, 0.7, 1],
                    }}
                  >
                    Suisse
                  </motion.span>

                  {/* ===================================
                      LE MOT DEVIENT LE DRAPEAU
                  =================================== */}

                  <motion.span
                    className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff0000]"
                    initial={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "4px",
                    }}
                    animate={{
                      width: ["100%", "120%", "260%", "100vw", "180vmax"],
                      height: ["100%", "120%", "260%", "100vh", "180vmax"],
                      borderRadius: ["4px", "6px", "18px", "0px", "0px"],
                    }}
                    transition={{
                      duration: 3.2,
                      delay: 1.15,
                      times: [0, 0.12, 0.28, 0.58, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Croix verticale */}
                    <motion.span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: [0, 0, 1, 1],
                      }}
                      transition={{
                        duration: 1,
                        delay: 1.75,
                        times: [0, 0.35, 0.65, 1],
                        ease: "easeOut",
                      }}
                      style={{
                        width: "12%",
                        height: "36%",
                      }}
                    />

                    {/* Croix horizontale */}
                    <motion.span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: [0, 0, 1, 1],
                      }}
                      transition={{
                        duration: 1,
                        delay: 1.75,
                        times: [0, 0.35, 0.65, 1],
                        ease: "easeOut",
                      }}
                      style={{
                        width: "36%",
                        height: "12%",
                      }}
                    />
                  </motion.span>
                </span>
              </p>
            </div>
          </div>

          {/* =========================================
              FADE FINAL
          ========================================= */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-50 bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0, 0, 1],
            }}
            transition={{
              duration: 1,
              delay: 4.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
