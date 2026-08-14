"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const pathname = usePathname();

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-white"
      animate={{
        x: position.x - 5,
        y: position.y - 5,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.2,
      }}
    />
  );
}
