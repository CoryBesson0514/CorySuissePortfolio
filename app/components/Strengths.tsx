"use client";

import { motion } from "motion/react";

const strengths = [
  {
    name: "Responsabilités",
    level: 90,
    description:
      "Habitué à prendre des responsabilités et à assurer les missions qui me sont confiées avec sérieux.",
  },
  {
    name: "Organisation",
    level: 85,
    description:
      "Une organisation développée notamment grâce à mes expériences professionnelles et à la gestion quotidienne de différentes tâches.",
  },
  {
    name: "Autonomie",
    level: 90,
    description:
      "Capable de travailler de manière autonome, de prendre des initiatives et de trouver des solutions face aux imprévus.",
  },
  {
    name: "Adaptabilité",
    level: 95,
    description:
      "Des expériences dans des domaines très différents qui m'ont appris à m'adapter rapidement à de nouveaux environnements.",
  },
  {
    name: "Apprentissage",
    level: 95,
    description:
      "Curieux et motivé, j'aime apprendre de nouvelles choses et développer continuellement mes compétences.",
  },
];

export default function Strengths() {
  return (
    <section id="strengths" className="section relative">
      <div className="container-site">
        {/* =========================
            TITRE
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Points forts
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Ce que mes expériences
            <span className="text-zinc-500"> m'ont permis de développer.</span>
          </h2>
        </motion.div>

        {/* =========================
            INTRODUCTION
        ========================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="mb-14 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          Au fil de mes expériences professionnelles, j'ai développé des
          qualités qui me permettent aujourd'hui de m'intégrer rapidement dans
          un nouvel environnement et de travailler efficacement aussi bien en
          équipe qu’en autonomie.
        </motion.p>

        {/* =========================
            COMPÉTENCES
        ========================= */}

        <div className="max-w-4xl space-y-9">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.name}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group"
            >
              {/* Nom + niveau visuel */}

              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-medium text-zinc-200 transition-colors duration-300 group-hover:text-white md:text-lg">
                  {strength.name}
                </h3>

                <span className="text-xs text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                  0{index + 1}
                </span>
              </div>

              {/* Barre */}

              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${strength.level}%`,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.08 + 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-0 top-0 h-full rounded-full bg-white"
                />
              </div>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08 + 0.4,
                }}
                className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400"
              >
                {strength.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
