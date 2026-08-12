"use client";

import { useEffect, useState } from "react";
import {
  defaultSiteConfig,
  getSiteConfig,
  type SiteConfig,
} from "../lib/siteConfig";
import { supabase } from "../lib/supabase";

export default function AvailabilityBadge() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    // =========================
    // CHARGEMENT INITIAL
    // =========================

    async function loadConfig() {
      try {
        const data = await getSiteConfig();
        setConfig(data);
      } catch (error) {
        console.error("Erreur chargement disponibilité :", error);
        setConfig(defaultSiteConfig);
      }
    }

    loadConfig();

    // =========================
    // SYNCHRONISATION EN TEMPS RÉEL
    // =========================

    const channel = supabase
      .channel("site-config-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_config",
        },
        (payload) => {
          const data = payload.new;

          setConfig({
            id: data.id,
            phone: data.phone,
            email: data.email,
            availability: data.availability,
            availabilityLabel: data.availability_label,
            availabilityMessage: data.availability_message,
          });
        }
      )
      .subscribe();

    // =========================
    // NETTOYAGE
    // =========================

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // =========================
  // STYLES
  // =========================

  const styles = {
    available: {
      dot: "bg-emerald-400",
      border: "border-emerald-500/20",
      background: "bg-emerald-500/[0.06]",
      text: "text-emerald-400",
      message: "text-emerald-700",
    },

    soon: {
      dot: "bg-orange-400",
      border: "border-orange-500/20",
      background: "bg-orange-500/[0.06]",
      text: "text-orange-400",
      message: "text-orange-700",
    },

    unavailable: {
      dot: "bg-red-400",
      border: "border-red-500/20",
      background: "bg-red-500/[0.06]",
      text: "text-red-400",
      message: "text-red-700",
    },
  };

  const style = styles[config.availability] ?? styles.available;

  // =========================
  // AFFICHAGE
  // =========================

  return (
    <div
      className={`inline-flex max-w-xl items-start gap-2 rounded-2xl border px-3 py-2 ${style.border} ${style.background}`}
    >
      <span
        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${style.dot} ${
          config.availability === "available" ? "animate-pulse" : ""
        }`}
      />

      <div className="flex flex-col">
        <span className={`text-xs font-medium ${style.text}`}>
          {config.availabilityLabel}
        </span>

        <span className={`mt-0.5 text-xs leading-relaxed ${style.message}`}>
          {config.availabilityMessage}
        </span>
      </div>
    </div>
  );
}
