"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Halo très discret */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/2
          h-[320px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/[0.035]
          blur-[120px]
        "
      />

      <div className="container-site relative z-10 py-14 md:py-20">
        {/* =================================================
            CONTENU PRINCIPAL
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(5px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            flex
            flex-col
            gap-10
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* =================================================
              SIGNATURE
          ================================================= */}

          <div>
            <p
              className="
                text-4xl
                font-semibold
                tracking-[-0.07em]
                text-white
                md:text-5xl
              "
            >
              CORY
              <span className="text-zinc-500">.</span>
            </p>

            <p className="mt-3 text-sm text-zinc-600">
              Portfolio personnel · Suisse
            </p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500">
              Disponible pour de nouvelles opportunités professionnelles,
              projets et collaborations en Suisse.
            </p>
          </div>

          {/* =================================================
              RETOUR EN HAUT
          ================================================= */}

          <a
            href="#"
            className="
              group
              flex
              w-fit
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/[0.025]
              px-5
              py-3
              text-sm
              text-zinc-400
              transition-all
              duration-300
              hover:border-white/20
              hover:bg-white
              hover:text-black
            "
          >
            Retour en haut
            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                transition-colors
                duration-300
                group-hover:border-black/10
              "
            >
              <ArrowUp
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />
            </span>
          </a>
        </motion.div>

        {/* =================================================
            SÉPARATION
        ================================================= */}

        <div className="relative mt-14 h-px bg-white/[0.06]">
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "18%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="
              absolute
              left-0
              top-0
              h-px
              bg-gradient-to-r
              from-violet-400
              via-purple-300
              to-transparent
            "
          />
        </div>

        {/* =================================================
            BAS DU FOOTER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-5
            flex
            flex-col
            gap-2
            text-xs
            text-zinc-700
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>© {new Date().getFullYear()} Cory Besson</p>

          <p>Conçu et développé par Cory.</p>
        </motion.div>
      </div>
    </footer>
  );
}
