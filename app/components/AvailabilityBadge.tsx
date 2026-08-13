"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getSiteConfig, type SiteConfig } from "../lib/siteConfig";

export default function AvailabilityBadge() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getSiteConfig();
        setConfig(data);
      } catch (error) {
        console.error("Erreur lors du chargement de la disponibilité :", error);
      }
    };

    loadConfig();
  }, []);

  if (!config) {
    return null;
  }

  // =========================
  // COULEURS SELON LE STATUT
  // =========================

  const statusColors = {
    available: {
      dot: "#34d399",
      glow: "rgba(52, 211, 153, 0.35)",
      border: "rgba(52, 211, 153, 0.20)",
      background: "rgba(52, 211, 153, 0.06)",
      text: "#6ee7b7",
    },

    soon: {
      dot: "#fb923c",
      glow: "rgba(251, 146, 60, 0.35)",
      border: "rgba(251, 146, 60, 0.20)",
      background: "rgba(251, 146, 60, 0.06)",
      text: "#fdba74",
    },

    unavailable: {
      dot: "#f87171",
      glow: "rgba(248, 113, 113, 0.35)",
      border: "rgba(248, 113, 113, 0.20)",
      background: "rgba(248, 113, 113, 0.06)",
      text: "#fca5a5",
    },
  };

  const colors = statusColors[config.availability] ?? statusColors.unavailable;

  // =========================
  // ANIMATION SELON LE STATUT
  // =========================

  const pulseDuration =
    config.availability === "available"
      ? 2
      : config.availability === "soon"
        ? 2.8
        : 3.5;

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-flex"
    >
      <motion.div
        layout
        animate={{
          borderColor: colors.border,
          backgroundColor: colors.background,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="group relative flex items-center gap-2.5 rounded-full border px-3.5 py-2 backdrop-blur-xl"
      >
        {/* =========================
            HALO
        ========================= */}

        <motion.span
          className="absolute left-3.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.35, 0, 0.35],
            backgroundColor: colors.dot,
          }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            boxShadow: `0 0 18px ${colors.glow}`,
          }}
        />

        {/* =========================
            POINT CENTRAL
        ========================= */}

        <motion.span
          className="relative h-2 w-2 rounded-full"
          animate={{
            backgroundColor: colors.dot,
            boxShadow: [
              `0 0 0px ${colors.glow}`,
              `0 0 10px ${colors.glow}`,
              `0 0 0px ${colors.glow}`,
            ],
          }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =========================
            TEXTE
        ========================= */}

        <motion.span
          className="text-xs font-medium tracking-tight"
          animate={{
            color: colors.text,
          }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        >
          {config.availabilityLabel}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
