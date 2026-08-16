"use client";

import { AnimatePresence, motion } from "motion/react";

interface LoadingScreenProps {
  show: boolean;
}

export default function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99990] flex items-center justify-center bg-black"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <div className="relative">
            <motion.span
              className="block text-4xl font-semibold tracking-[-0.06em] md:text-5xl"
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, #ffffff 0%, #ffffff 32%, #a78bfa 45%, #8b5cf6 52%, #6366f1 60%, #a855f7 68%, #ffffff 82%, #ffffff 100%)",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "0% 50%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                CORY
              </motion.span>

              <span className="text-white">.</span>
            </motion.span>

            {/* =================================================
                PETITE LUMIÈRE
            ================================================= */}

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.08] blur-3xl"
              animate={{
                opacity: [0.25, 0.55, 0.25],
                scale: [0.9, 1.08, 0.9],
              }}
              transition={{
                duration: 2.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
