"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const strengths = [
  {
    number: "01",
    name: "Responsabilités",
    description:
      "Habitué à prendre des responsabilités et à assurer les missions qui me sont confiées avec sérieux.",
  },
  {
    number: "02",
    name: "Organisation",
    description:
      "Une organisation développée notamment grâce à mes expériences professionnelles et à la gestion quotidienne de différentes tâches.",
  },
  {
    number: "03",
    name: "Autonomie",
    description:
      "Capable de travailler de manière autonome, de prendre des initiatives et de trouver des solutions face aux imprévus.",
  },
  {
    number: "04",
    name: "Adaptabilité",
    description:
      "Des expériences dans des domaines très différents qui m'ont appris à m'adapter rapidement à de nouveaux environnements.",
  },
  {
    number: "05",
    name: "Apprentissage",
    description:
      "Curieux et motivé, j'aime apprendre de nouvelles choses et développer continuellement mes compétences.",
  },
];

export default function Strengths() {
  return (
    <section id="strengths" className="section relative overflow-hidden">
      <div className="container-site">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(6px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mb-14"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Points forts
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Ce que mes expériences
            <span className="text-zinc-500"> m'ont permis de développer.</span>
          </h2>
        </motion.div>

        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="mb-16 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          Au fil de mes expériences professionnelles, j'ai développé des
          qualités qui me permettent aujourd'hui de m'intégrer rapidement dans
          un nouvel environnement et de travailler efficacement aussi bien en
          équipe qu’en autonomie.
        </motion.p>

        {/* =================================================
            POINTS FORTS
        ================================================= */}

        <div className="border-t border-white/10">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.number}
              initial={{
                opacity: 0,
                y: 25,
                filter: "blur(5px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              className="group relative border-b border-white/10 py-8 md:py-10"
            >
              <div className="grid gap-6 md:grid-cols-[80px_1fr_auto] md:items-start">
                {/* NUMÉRO */}

                <span className="text-sm font-medium text-zinc-600 transition-colors duration-300 group-hover:text-violet-400">
                  {strength.number}
                </span>

                {/* CONTENU */}

                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-violet-100 md:text-3xl">
                    {strength.name}
                  </h3>

                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400 md:text-lg">
                    {strength.description}
                  </p>
                </div>

                {/* ICÔNE */}

                <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition-all duration-500 group-hover:border-violet-400/30 group-hover:bg-violet-500/10 group-hover:text-violet-300 md:flex">
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>

              {/* LIGNE VIOLETTE */}

              <div className="mt-7 h-px w-full overflow-hidden bg-white/[0.04]">
                <motion.div
                  className="h-full w-0 bg-gradient-to-r from-violet-500 via-purple-400 to-transparent"
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                />

                <div className="h-full w-0 bg-gradient-to-r from-violet-500 via-purple-400 to-transparent transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
