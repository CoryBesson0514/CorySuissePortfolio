"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({
  open,
  onClose,
}: ContactModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fond */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Fenêtre */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] shadow-2xl"
          >
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white"
            >
              <X size={19} />
            </button>

            {/* Photo */}
            <div className="relative h-[280px] w-full overflow-hidden">
              <img
                src="/moi.jpg"
                alt="Cory Besson"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            </div>

            {/* Contenu */}
            <div className="px-7 pb-8 pt-1">
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                Me contacter
              </p>

              <h2 className="mt-2 text-3xl font-medium tracking-tight text-white">
                Cory Besson
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
                Disponible pour de nouvelles opportunités professionnelles en Suisse.
              </p>

              {/* Informations de contact */}
              <div className="mt-7 space-y-3">

                {/* Téléphone */}
                <div className="group flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <Phone size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-red-400">
                        Téléphone
                      </p>

                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-red-400">
                        Indisponible
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-zinc-400">
                      +33 6 09 58 17 42
                    </p>

                    <p className="mt-1 text-xs text-red-400/70">
                      Ligne temporairement suspendue
                    </p>
                  </div>
                </div>

                {/* E-mail */}
                <a
                  href="mailto:corybesson14@icloud.com"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-zinc-400 transition group-hover:text-white">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-600">
                      E-mail
                    </p>

                    <p className="mt-1 text-sm text-white">
                      corybesson14@icloud.com
                    </p>
                  </div>
                </a>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/cory.besson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-zinc-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>

                  <span className="text-sm">
                    Instagram
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/33609581742"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-zinc-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  <MessageCircle
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="text-sm">
                    WhatsApp
                  </span>
                </a>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}