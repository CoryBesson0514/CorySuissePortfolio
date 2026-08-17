"use client";

import { motion } from "motion/react";
import { GraduationCap, ArrowUpRight } from "lucide-react";

const education = [
  {
    period: "01/2020 — 07/2020",
    duration: "7 mois",
    title: "Bac Pro Systèmes Numériques",
    shortTitle: "SN",
    school: "Lycée Pierre-Mendès-France",
    location: "Veynes, Hautes-Alpes",
    description:
      "Une première orientation vers les systèmes numériques, l'informatique et les technologies électroniques.",
  },
  {
    period: "09/2020 — 12/2022",
    duration: "2 ans",
    title:
      "Bac Pro Métiers de l'Électricité et de ses Environnements Connectés",
    shortTitle: "MELEC",
    school: "Lycée des Métiers Alpes Durance",
    location: "Embrun, Hautes-Alpes",
    description:
      "Une formation orientée vers l'électricité, les installations électriques et les environnements connectés.",
  },
];

export default function Education() {
  return (
    <section id="education" className="section relative overflow-hidden">
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
            Formation
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Un parcours technique,
            <span className="text-zinc-500">
              {" "}
              avant l'expérience professionnelle.
            </span>
          </h2>
        </motion.div>

        {/* =================================================
            FORMATIONS
        ================================================= */}

        <div className="space-y-5">
          {education.map((item, index) => (
            <motion.div
              key={item.shortTitle}
              initial={{
                opacity: 0,
                y: 30,
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
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.035] md:p-9"
            >
              {/* Effet violet */}

              <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-[100px] transition-opacity duration-500 group-hover:bg-violet-500/[0.12]" />

              <div className="relative">
                {/* Ligne supérieure */}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-violet-400/20 group-hover:bg-violet-500/10 group-hover:text-violet-300">
                      <GraduationCap size={18} />
                    </div>

                    <span className="text-sm font-medium text-zinc-500">
                      {item.shortTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600">
                      {item.duration}
                    </span>

                    <span className="text-sm text-zinc-400">{item.period}</span>
                  </div>
                </div>

                {/* Contenu */}

                <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <h3 className="max-w-3xl text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-violet-100 md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-zinc-400">{item.school}</p>

                    <p className="mt-1 text-sm text-zinc-600">
                      {item.location}
                    </p>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition-all duration-500 group-hover:border-violet-400/30 group-hover:bg-violet-500/10 group-hover:text-violet-300">
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                {/* Barre */}

                <div className="mt-8 h-px w-full overflow-hidden bg-white/5">
                  <div className="h-full w-0 bg-gradient-to-r from-violet-500 via-purple-400 to-transparent transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
