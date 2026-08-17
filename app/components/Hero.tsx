"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Car } from "lucide-react";
import Link from "next/link";
import AvailabilityBadge from "./AvailabilityBadge";
import LocationMap from "./LocationMap";

export default function Hero() {
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 500], [0, 70]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section className="grid-background relative flex min-h-screen items-center overflow-hidden">
      {/* =====================================================
          AMBIANCE — TRÈS SUBTILE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Halo principal */}

        <motion.div
          className="
            absolute
            left-1/2
            top-[-220px]
            h-[600px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-purple-600/[0.055]
            blur-[150px]
          "
          animate={{
            x: ["-50%", "-46%", "-54%", "-50%"],
            y: [0, 20, -10, 0],
            scale: [1, 1.04, 0.98, 1],
          }}
          transition={{
            duration: 14,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Lumière gauche */}

        <motion.div
          className="
            absolute
            left-[-180px]
            top-[38%]
            h-[380px]
            w-[380px]
            rounded-full
            bg-violet-500/[0.025]
            blur-[130px]
          "
          animate={{
            x: [0, 40, 10, 0],
            y: [0, -25, 15, 0],
          }}
          transition={{
            duration: 16,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Lumière droite */}

        <motion.div
          className="
            absolute
            right-[-150px]
            top-[20%]
            h-[340px]
            w-[340px]
            rounded-full
            bg-indigo-500/[0.025]
            blur-[130px]
          "
          animate={{
            x: [0, -30, 10, 0],
            y: [0, 20, -15, 0],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
        className="container-site relative z-10 pt-28"
      >
        {/* =================================================
            STATUT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
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
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-50 max-w-6xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.85] tracking-[-0.07em]"
        >
          {/* CORY — BLANC PUR */}

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

          {/* BESSON — DÉGRADÉ */}

          <span className="relative z-50 text-gradient">BESSON.</span>
        </motion.h1>

        {/* =================================================
            INFORMATIONS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            delay: 0.35,
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
              delay: 0.45,
            }}
            className="flex flex-wrap items-center gap-5 text-sm text-zinc-500"
          >
            <LocationMap />

            <motion.div
              className="flex items-center gap-2"
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Car size={15} />
              Véhiculé
            </motion.div>
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
              delay: 0.55,
            }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            {/* Découvrir */}

            <motion.a
              href="#about"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                px-5
                py-3
                text-sm
                transition
                duration-300
                hover:border-white/20
                hover:bg-white
                hover:text-black
              "
            >
              Découvrir mon parcours
              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </motion.a>

            {/* CV */}

            <motion.div
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Link
                href="/cv"
                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-5
                  py-3
                  text-sm
                  text-zinc-300
                  transition
                  duration-300
                  hover:border-white/20
                  hover:bg-white
                  hover:text-black
                "
              >
                Mon CV
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* =================================================
            INDICATION SCROLL
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
            delay: 1.2,
            duration: 0.8,
          }}
          whileHover={{
            y: 4,
          }}
          className="
            absolute
            bottom-10
            left-1/2
            hidden
            -translate-x-1/2
            text-zinc-500
            transition-colors
            duration-300
            hover:text-zinc-300
            md:block
          "
        >
          <motion.div
            animate={{
              y: [0, 7, 0],
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <ArrowDown size={20} strokeWidth={1.5} />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
