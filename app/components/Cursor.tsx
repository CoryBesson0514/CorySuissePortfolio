"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type CursorType = "default" | "hover" | "view" | "open";

export default function Cursor() {
  const pathname = usePathname();

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [enabled, setEnabled] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      setEnabled(false);
      document.documentElement.classList.remove("custom-cursor");
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";

      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();

    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin || !enabled) return;

    const html = document.documentElement;
    const body = document.body;

    html.classList.add("custom-cursor");

    html.style.cursor = "";
    body.style.cursor = "";

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const target = event.target as HTMLElement | null;

      if (!target) {
        setCursorType("default");
        return;
      }

      /*
       * Éléments avec un comportement spécifique
       */

      const cursorElement = target.closest("[data-cursor]");

      if (cursorElement) {
        const type = cursorElement.getAttribute("data-cursor");

        if (type === "view" || type === "open" || type === "hover") {
          setCursorType(type);
          return;
        }
      }

      /*
       * Liens / boutons classiques
       */

      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        setCursorType("hover");
        return;
      }

      setCursorType("default");
    };

    const handleMouseLeave = () => {
      setCursorType("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );

      html.classList.remove("custom-cursor");
    };
  }, [isAdmin, enabled]);

  if (isAdmin || !enabled) {
    return null;
  }

  /*
   * Taille du curseur
   */

  const size = cursorType === "default" ? 9 : cursorType === "hover" ? 18 : 58;

  const label =
    cursorType === "view" ? "VIEW" : cursorType === "open" ? "OPEN" : "";

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full bg-white text-[8px] font-semibold tracking-[0.14em] text-black"
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
        width: size,
        height: size,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 35,
        mass: 0.18,
      }}
    >
      {label}
    </motion.div>
  );
}
