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
    /*
     * ADMIN
     *
     * Sur l'administration, on désactive complètement
     * le curseur personnalisé et on réactive le curseur natif.
     */
    if (isAdmin) {
      document.documentElement.classList.add("admin-cursor");
      document.body.classList.add("admin-cursor");

      return () => {
        document.documentElement.classList.remove("admin-cursor");
        document.body.classList.remove("admin-cursor");
      };
    }

    /*
     * SITE
     *
     * Sur le portfolio, on cache le curseur natif
     * pour utiliser notre curseur personnalisé.
     */
    document.documentElement.classList.remove("admin-cursor");
    document.body.classList.remove("admin-cursor");

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
       * Curseurs personnalisés avec data-cursor
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
       * Éléments interactifs classiques
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

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isAdmin]);

  /*
   * Aucun curseur personnalisé sur l'administration.
   * Le curseur natif est réactivé grâce à la classe CSS.
   */
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
