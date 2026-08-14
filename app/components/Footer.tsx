"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-site py-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          {/* Signature */}

          <div>
            <p className="text-2xl font-medium tracking-[-0.04em]">
              CORY<span className="text-zinc-500">.</span>
            </p>

            <p className="mt-2 text-sm text-zinc-600">
              Portfolio personnel · Suisse
            </p>
          </div>

          {/* Retour en haut */}

          <a
            href="#"
            className="group flex w-fit items-center gap-2 text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
          >
            Retour en haut
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Ligne finale */}

        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-xs text-zinc-700 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Cory Besson</p>

          <p>Conçu et développé par Cory.</p>
        </div>
      </div>
    </footer>
  );
}
