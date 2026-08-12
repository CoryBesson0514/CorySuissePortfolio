"use client";

import { motion } from "motion/react";
import AvailabilityBadge from "./AvailabilityBadge";
import { ArrowDown, ArrowUpRight, MapPin, Car } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid-background relative flex min-h-screen items-center overflow-hidden">
      {/* Lumière centrale */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="container-site relative z-10 pt-28">
        {/* Statut */}
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
          className="mb-8"
        >
          <AvailabilityBadge />
        </motion.div>

        {/* Nom */}
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
          className="max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.85] tracking-[-0.07em]"
        >
          CORY
          <br />
          <span className="text-gradient">BESSON.</span>
        </motion.h1>

        {/* Bas du Hero */}
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
            delay: 0.25,
          }}
          className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          {/* Description */}
          <div>
            <p className="max-w-xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
              Jeune professionnel à la recherche d'une nouvelle opportunité en
              Suisse.
            </p>

            {/* Localisation + véhicule */}
            <div className="mt-5 flex items-center gap-5 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin size={15} />
                Neuchâtel, Suisse
              </div>

              <div className="flex items-center gap-2">
                <Car size={15} />
                Véhiculé
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex flex-wrap items-center gap-3">
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

            <a
              href="/CV-Cory-Besson.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-zinc-300 transition duration-300 hover:bg-white hover:text-black"
            >
              Mon CV
            </a>
          </div>
        </motion.div>

        {/* Flèche */}
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
          }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-zinc-500 md:block"
        >
          <ArrowDown className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
