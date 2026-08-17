"use client";

import { motion } from "motion/react";
import AvailabilityBadge from "./AvailabilityBadge";
import LocationMap from "./LocationMap";
import { ArrowDown, ArrowUpRight, Car } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid-background relative flex min-h-screen items-center overflow-hidden">
      {/* =====================================================
          CONTENU
      ===================================================== */}

      <div className="container-site relative z-10 pt-28">
        {/* =================================================
            STATUT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.7,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8"
        >
          <AvailabilityBadge />
        </motion.div>

        {/* =================================================
            NOM
        ================================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 45,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-50 max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.85] tracking-[-0.07em]"
        >
          <span
            className="relative z-50 text-white"
            style={{
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
            }}
          >
            CORY
          </span>

          <br />

          <span className="relative z-50 text-gradient">BESSON.</span>
        </motion.h1>

        {/* =================================================
            INFORMATIONS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 22,
            filter: "blur(5px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-50 mt-10"
        >
          {/* =================================================
              LOCALISATION + VÉHICULE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap items-center gap-5 text-sm text-zinc-500"
          >
            <LocationMap />

            <div className="flex items-center gap-2">
              <Car size={15} />
              Véhiculé
            </div>
          </motion.div>

          {/* =================================================
              BOUTONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            {/* Découvrir */}

            <a
              href="#about"
              className="group flex w-fit items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm transition duration-300 hover:bg-white hover:text-black"
            >
              Découvrir mon parcours
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* CV */}

            <Link
              href="/cv"
              className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-zinc-300 transition duration-300 hover:bg-white hover:text-black"
            >
              Mon CV
            </Link>
          </motion.div>
        </motion.div>

        {/* =================================================
            FLÈCHE
        ================================================= */}

        <motion.a
          href="#about"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.15,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-zinc-500 transition-colors duration-300 hover:text-white md:block"
        >
          <ArrowDown className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
