"use client";

import { AnimatePresence, motion } from "motion/react";
import { X, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  defaultSiteConfig,
  getSiteConfig,
  type SiteConfig,
} from "../lib/siteConfig";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    if (!open) return;

    getSiteConfig()
      .then((data) => setConfig(data))
      .catch((error) =>
        console.error("Erreur de chargement du contact :", error),
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const phoneHref = `tel:${config.phone.replace(/[^+\d]/g, "")}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Me contacter"
        >
          {/* =================================================
              FOND
          ================================================= */}

          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* =================================================
              FENÊTRE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              my-auto
              w-full
              max-w-lg
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-[#090909]
              shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            "
          >
            {/* =================================================
                BOUTON FERMER
            ================================================= */}

            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                absolute
                right-5
                top-5
                z-30
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/50
                text-white
                backdrop-blur-xl
                transition-colors
                duration-300
                hover:bg-white/10
              "
            >
              <X size={18} strokeWidth={1.8} />
            </motion.button>

            {/* =================================================
                PHOTO
            ================================================= */}

            <div className="relative h-[250px] w-full overflow-hidden sm:h-[280px]">
              <motion.img
                src="/moi.jpg"
                alt="Cory Besson"
                initial={{
                  scale: 1.04,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="h-full w-full object-cover"
              />

              {/* Dégradé bas */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-transparent" />

              {/* Très léger halo violet */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  left-1/2
                  h-48
                  w-72
                  -translate-x-1/2
                  rounded-full
                  bg-violet-500/10
                  blur-[90px]
                "
              />

              {/* Ligne subtile */}
              <div className="absolute bottom-0 left-7 right-7 h-px bg-white/10" />
            </div>

            {/* =================================================
                CONTENU
            ================================================= */}

            <div className="px-6 pb-7 pt-1 sm:px-7 sm:pb-8">
              {/* Label */}

              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-zinc-500
                "
              >
                Me contacter
              </motion.p>

              {/* Nom */}

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="
                  mt-2
                  text-3xl
                  font-semibold
                  tracking-[-0.04em]
                  text-white
                "
              >
                Cory Besson
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="
                  mt-2
                  max-w-sm
                  text-sm
                  leading-relaxed
                  text-zinc-500
                "
              >
                Disponible pour de nouvelles opportunités professionnelles en
                Suisse.
              </motion.p>

              {/* =================================================
                  CONTACT
              ================================================= */}

              <div className="mt-7 space-y-3">
                {/* Téléphone */}

                <a
                  href={phoneHref}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-4
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.055]
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.045]
                      text-zinc-400
                      transition-all
                      duration-300
                      group-hover:border-violet-400/20
                      group-hover:bg-violet-500/10
                      group-hover:text-violet-200
                    "
                  >
                    <Phone size={18} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                      Téléphone
                    </p>

                    <p className="mt-1 truncate text-sm text-white">
                      {config.phone}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                      shrink-0
                      text-zinc-700
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-violet-300
                    "
                  />
                </a>

                {/* E-mail */}

                <a
                  href={`mailto:${config.email}`}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-4
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.055]
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.045]
                      text-zinc-400
                      transition-all
                      duration-300
                      group-hover:border-violet-400/20
                      group-hover:bg-violet-500/10
                      group-hover:text-violet-200
                    "
                  >
                    <Mail size={18} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                      E-mail
                    </p>

                    <p className="mt-1 truncate text-sm text-white">
                      {config.email}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                      shrink-0
                      text-zinc-700
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-violet-300
                    "
                  />
                </a>
              </div>

              {/* =================================================
                  RÉSEAUX
              ================================================= */}

              <div className="mt-3 grid grid-cols-2 gap-3">
                {/* Instagram */}

                <a
                  href="https://www.instagram.com/cory.besson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-zinc-400
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
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
                    <rect x="3" y="3" width="18" height="18" rx="5" />

                    <circle cx="12" cy="12" r="4" />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>

                  <span className="text-sm">Instagram</span>
                </a>

                {/* WhatsApp */}

                <a
                  href="https://wa.me/33609581742"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-zinc-400
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >
                  <MessageCircle
                    size={18}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span className="text-sm">WhatsApp</span>
                </a>
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <p className="mt-5 text-center text-[10px] text-zinc-700">
                © 2026 Cory Besson
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
