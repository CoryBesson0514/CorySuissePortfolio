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

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const html = document.documentElement;

    /* =========================
       ADMIN
    ========================= */

    if (isAdmin) {
      html.classList.remove("custom-cursor");
      return;
    }

    /* =========================
       SITE PUBLIC
    ========================= */

    html.classList.add("custom-cursor");

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

      const cursorElement = target.closest("[data-cursor]");

      if (cursorElement) {
        const type = cursorElement.getAttribute("data-cursor");

        if (type === "view" || type === "open" || type === "hover") {
          setCursorType(type);
          return;
        }
      }

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

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      html.classList.remove("custom-cursor");
    };
  }, [isAdmin]);

  /* Aucun curseur personnalisé dans l'admin */

  if (isAdmin) {
    return null;
  }

  const size = cursorType === "default" ? 10 : cursorType === "hover" ? 18 : 54;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full bg-white text-[9px] font-medium tracking-[0.12em] text-black"
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
        width: size,
        height: size,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.2,
      }}
    >
      {cursorType === "view" && "VIEW"}
      {cursorType === "open" && "OPEN"}
    </motion.div>
  );
}
