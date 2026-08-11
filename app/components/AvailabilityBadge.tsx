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
    setConfig(getSiteConfig());

    const handleStorage = () => {
      setConfig(getSiteConfig());
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const colors = {
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

  const color = colors[config.availability];

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${color.border} ${color.background}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${color.dot} shadow-[0_0_12px_currentColor]`}
      />

      <span
        className={`text-xs font-medium ${color.text}`}
      >
        {config.availabilityLabel}
      </span>
    </div>
  );
}