"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";
import { motion } from "motion/react";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Vérifie si on est sur téléphone
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) return;

    // Vérifie si le site est déjà installé comme application
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Détecte iPhone / iPad
    const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    setIsIOS(ios);

    // Petit délai avant d'afficher
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="fixed bottom-4 left-4 right-4 z-[100] md:hidden"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]/95 p-4 shadow-2xl backdrop-blur-xl">
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1 text-zinc-500 transition hover:bg-white/10 hover:text-white"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 pr-6">
          {/* Icône */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black">
            {isIOS ? <Share size={18} /> : <Download size={18} />}
          </div>

          {/* Texte */}
          <div>
            <p className="text-sm font-medium text-white">
              Ajouter CORY à votre écran d'accueil
            </p>

            {isIOS ? (
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Appuyez sur <span className="text-zinc-300">Partager</span> puis{" "}
                <span className="text-zinc-300">Sur l'écran d'accueil</span>.
              </p>
            ) : (
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Ajoutez le site à votre écran d'accueil pour y accéder
                rapidement comme une application.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
