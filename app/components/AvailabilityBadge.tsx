"use client";

import { useEffect, useState } from "react";
import {
  defaultSiteConfig,
  getSiteConfig,
  type SiteConfig,
} from "../lib/siteConfig";

export default function AvailabilityBadge() {
  const [config, setConfig] =
    useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await getSiteConfig();
        setConfig(data);
      } catch (error) {
        console.error(
          "Erreur chargement disponibilité :",
          error
        );

        setConfig(defaultSiteConfig);
      }
    }

    loadConfig();
  }, []);

  const styles = {
    available: {
      dot: "bg-emerald-400",
      border: "border-emerald-500/20",
      background: "bg-emerald-500/[0.06]",
      text: "text-emerald-400",
    },

    soon: {
      dot: "bg-orange-400",
      border: "border-orange-500/20",
      background: "bg-orange-500/[0.06]",
      text: "text-orange-400",
    },

    unavailable: {
      dot: "bg-red-400",
      border: "border-red-500/20",
      background: "bg-red-500/[0.06]",
      text: "text-red-400",
    },
  };

  const style =
    styles[config.availability] ??
    styles.available;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${style.border} ${style.background}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${style.dot} ${
          config.availability === "available"
            ? "animate-pulse"
            : ""
        }`}
      />

      <span
        className={`text-xs font-medium ${style.text}`}
      >
        {config.availabilityLabel}
      </span>
    </div>
  );
}