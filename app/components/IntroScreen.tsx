"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* TEXTE */}

      <div className="relative z-10 text-center">
        <p className="text-5xl font-semibold tracking-[-0.06em] text-white">
          CORY<span className="text-zinc-500">.</span>
        </p>

        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
          Portfolio · <span className="text-white">Suisse</span>
        </p>
      </div>

      {/* DRAPEAU */}

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-[#ff0000]"
        initial={{
          width: 0,
          height: 0,
          borderRadius: "50%",
          opacity: 0,
        }}
        animate={{
          width: "160vmax",
          height: "160vmax",
          borderRadius: "0%",
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          delay: 1,
          times: [0, 0.15, 0.45, 0.85, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* CROIX VERTICALE */}

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
          style={{
            width: "12%",
            height: "36%",
          }}
        />

        {/* CROIX HORIZONTALE */}

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
          style={{
            width: "36%",
            height: "12%",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
