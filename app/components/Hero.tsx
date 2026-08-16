"use client";

import { motion } from "motion/react";
import AvailabilityBadge from "./AvailabilityBadge";
import LocationMap from "./LocationMap";
import { ArrowDown, ArrowUpRight, Car } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid-background relative isolate flex min-h-screen items-center overflow-hidden">
      {/* =====================================================
          FOND LUMINEUX
          IMPORTANT :
          z-0 = derrière
          contenu = z-20
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Glow principal */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-1/2 top-[-220px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/[0.11] blur-[150px]"
        />

        {/* Glow gauche */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 2,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="absolute left-[5%] top-[28%] h-[350px] w-[350px] rounded-full bg-indigo-500/[0.045] blur-[130px]"
        />

        {/* Glow droite */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 2,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="absolute right-[3%] top-[18%] h-[320px] w-[320px] rounded-full bg-violet-500/[0.04] blur-[130px]"
        />
      </div>

      {/* =====================================================
          CONTENU
          z-20 = TOUJOURS devant le fond
      ===================================================== */}

      <div className="container-site relative z-20 pt-28">
        {/* =================================================
            STATUT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative z-20 mb-8"
        >
          <AvailabilityBadge />
        </motion.div>

        {/* =================================================
            NOM
        ================================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
          className="relative z-20 max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.85] tracking-[-0.07em]"
        >
          <span className="text-white">CORY</span>
          <br />
          <span className="text-gradient">BESSON.</span>
        </motion.h1>

        {/* =================================================
            INFORMATIONS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="relative z-20 mt-10"
        >
          {/* Localisation + véhicule */}

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
              delay: 0.4,
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
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
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
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.6,
          }}
          className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 text-zinc-500 md:block"
        >
          <ArrowDown className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
