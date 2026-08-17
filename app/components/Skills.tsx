"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const skills = [
  {
    number: "01",
    title: "Organisation",
    description:
      "Organisation du travail, gestion des priorités et capacité à travailler de manière autonome.",
  },
  {
    number: "02",
    title: "Responsabilités",
    description:
      "Habitué à prendre des responsabilités et à assurer le bon déroulement des tâches qui me sont confiées.",
  },
  {
    number: "03",
    title: "Adaptabilité",
    description:
      "Capacité à m'adapter rapidement à de nouveaux environnements, métiers et méthodes de travail.",
  },
  {
    number: "04",
    title: "Apprentissage",
    description:
      "Curieux et motivé pour apprendre de nouvelles compétences et progresser continuellement.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section relative overflow-hidden">
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
          className="mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Compétences
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Ce que je peux apporter,
            <span className="text-zinc-500"> au-delà d'un simple CV.</span>
          </h2>
        </motion.div>

        {/* =================================================
            SKILLS
        ================================================= */}

        <div className="grid border-t border-white/10 md:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.number}
              initial={{
                opacity: 0,
                y: 35,
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
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group relative border-b border-white/10 p-8 transition-all duration-500 hover:bg-white/[0.025] md:p-10"
            >
              {/* =================================================
                  NUMÉRO + ICÔNE
              ================================================= */}

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-600 transition-colors duration-300 group-hover:text-violet-400">
                  {skill.number}
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition-all duration-500 group-hover:border-violet-400/30 group-hover:bg-violet-500/10 group-hover:text-violet-300">
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>

              {/* =================================================
                  TITRE
              ================================================= */}

              <h3 className="mt-12 text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-violet-100 md:text-3xl">
                {skill.title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400 md:text-lg">
                {skill.description}
              </p>

              {/* =================================================
                  INDICATEUR
              ================================================= */}

              <div className="mt-8 h-px w-full overflow-hidden bg-white/5">
                <div className="h-full w-0 bg-gradient-to-r from-violet-500 via-purple-400 to-transparent transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
