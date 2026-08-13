"use client";

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Download } from "lucide-react";
import Link from "next/link";

export default function CVPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* =========================
          HEADER
      ========================= */}

      <motion.header
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Retour */}

          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span>Retour</span>
          </Link>

          {/* Titre */}

          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-sm font-medium tracking-tight">
              CORY <span className="text-zinc-500">.</span>
            </span>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-2">
            {/* Ouvrir */}

            <a
              href="/CV-Cory-Besson.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:bg-white hover:text-black"
              aria-label="Ouvrir le CV"
            >
              <ExternalLink size={15} />
            </a>

            {/* Télécharger */}

            <a
              href="/CV-Cory-Besson.pdf"
              download="CV-Cory-Besson.pdf"
              className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs text-zinc-400 transition hover:bg-white hover:text-black sm:flex"
            >
              <Download size={14} />
              Télécharger
            </a>
          </div>
        </div>
      </motion.header>

      {/* =========================
          CONTENU
      ========================= */}

      <section className="flex min-h-screen justify-center px-3 pb-8 pt-24 md:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50 md:rounded-3xl"
        >
          <iframe
            src="/CV-Cory-Besson.pdf"
            title="CV de Cory Besson"
            className="h-[calc(100vh-120px)] min-h-[700px] w-full"
          />
        </motion.div>
      </section>
    </main>
  );
}
