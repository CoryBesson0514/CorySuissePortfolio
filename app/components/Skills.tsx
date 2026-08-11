"use client";

import { motion } from "motion/react";

const skills = [
  {
    number: "01",
    title: "Organisation",
    description:
      "Organisation du travail, gestion des priorités et capacité à travailler de manière autonome.",
  },
  {
    number: "02",
    title: "Responsabilité",
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
    <section id="skills" className="section">
      <div className="container-site">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Compétences
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Ce que je peux apporter,
            <span className="text-zinc-500">
              {" "}au-delà d'un simple CV.
            </span>
          </h2>
        </div>

        {/* Skills */}
        <div className="grid border-t border-white/10 md:grid-cols-2">

          {skills.map((skill, index) => (
            <motion.div
              key={skill.number}
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
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group border-b border-white/10 p-8 transition-colors duration-300 hover:bg-white/[0.03] md:p-10"
            >

              <div className="flex items-start justify-between gap-6">

                <span className="text-sm text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                  {skill.number}
                </span>

                <span className="text-xs uppercase tracking-[0.15em] text-zinc-700 transition-colors duration-300 group-hover:text-zinc-500">
                  0{index + 1}
                </span>

              </div>

              <h3 className="mt-10 text-2xl font-medium text-white md:text-3xl">
                {skill.title}
              </h3>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-500 md:text-lg">
                {skill.description}
              </p>

              <div className="mt-8 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}