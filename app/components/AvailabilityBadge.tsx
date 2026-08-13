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
      label: "#6ee7b7",
      message: "rgba(167, 243, 208, 0.55)",
    },

    soon: {
      dot: "#fb923c",
      glow: "rgba(251, 146, 60, 0.35)",
      border: "rgba(251, 146, 60, 0.20)",
      background: "rgba(251, 146, 60, 0.06)",
      label: "#fdba74",
      message: "rgba(254, 215, 170, 0.55)",
    },

    unavailable: {
      dot: "#f87171",
      glow: "rgba(248, 113, 113, 0.35)",
      border: "rgba(248, 113, 113, 0.20)",
      background: "rgba(248, 113, 113, 0.06)",
      label: "#fca5a5",
      message: "rgba(254, 202, 202, 0.55)",
    },
  };

  const colors = statusColors[config.availability] ?? statusColors.unavailable;

  // =========================
  // VITESSE DE L'ANIMATION
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
      className="inline-flex max-w-xl"
    >
      {/* =========================
          PASTILLE
      ========================= */}

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
        className="relative rounded-2xl border px-4 py-3 backdrop-blur-xl"
      >
        {/* =========================
            STATUT PRINCIPAL
        ========================= */}

        <div className="flex items-center gap-2.5">
          {/* Halo */}

          <motion.span
            className="absolute left-4 top-[19px] h-2 w-2 rounded-full"
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

          {/* Point */}

          <motion.span
            className="relative h-2 w-2 shrink-0 rounded-full"
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

          {/* Texte principal */}

          <motion.span
            className="text-sm font-medium tracking-tight"
            animate={{
              color: colors.label,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          >
            {config.availabilityLabel}
          </motion.span>
        </div>

        {/* =========================
            MESSAGE
        ========================= */}

        {config.availabilityMessage && (
          <motion.p
            key={config.availabilityMessage}
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
              color: colors.message,
            }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-1.5 pl-[19px] text-xs leading-relaxed"
          >
            {config.availabilityMessage}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
