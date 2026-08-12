"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type ImageKey = "sophie" | "frj" | "vaianni";

const images: Record<
  ImageKey,
  {
    photos: string[];
    alt: string;
  }
> = {
  sophie: {
    photos: ["/sophie.jpg", "/sophie2.jpg", "/sophie3.jpg"],
    alt: "Sophie LeBreuilly — Boulangerie",
  },

  frj: {
    photos: ["/frj.jpg", "/frj2.jpg"],
    alt: "FRJ Location — Hertz",
  },

  vaianni: {
    photos: ["/vaianni.jpg"],
    alt: "Garage Richard Vaianni — Mécanique automobile",
  },
};

export default function Experience() {
  const [activeImage, setActiveImage] = useState<ImageKey | null>(null);
  const [gallery, setGallery] = useState<ImageKey | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const [imagePosition, setImagePosition] = useState({
    x: 0,
    y: 0,
  });

  // =========================
  // IMAGE AU SURVOL
  // =========================

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLSpanElement>,
    image: ImageKey,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const imageWidth = 400;
    const imageHeight = 300;
    const gap = 30;

    const spaceOnRight = window.innerWidth - rect.right;

    let x;

    if (spaceOnRight >= imageWidth + gap) {
      x = rect.right + gap;
    } else {
      x = rect.left - imageWidth - gap;
    }

    x = Math.max(20, Math.min(x, window.innerWidth - imageWidth - 20));

    let y = rect.top + rect.height / 2 - imageHeight / 2;

    y = Math.max(20, Math.min(y, window.innerHeight - imageHeight - 20));

    setImagePosition({
      x,
      y,
    });

    setActiveImage(image);
  };

  // =========================
  // OUVRIR LA GALERIE
  // =========================

  const openGallery = (image: ImageKey) => {
    setActiveImage(null);
    setGallery(image);
    setCurrentPhoto(0);
  };

  // =========================
  // FERMER LA GALERIE
  // =========================

  const closeGallery = () => {
    setGallery(null);
    setCurrentPhoto(0);
  };

  // =========================
  // PHOTO SUIVANTE
  // =========================

  const nextPhoto = () => {
    if (!gallery) return;

    const photos = images[gallery].photos;

    setCurrentPhoto((current) => (current + 1) % photos.length);
  };

  // =========================
  // PHOTO PRÉCÉDENTE
  // =========================

  const previousPhoto = () => {
    if (!gallery) return;

    const photos = images[gallery].photos;

    setCurrentPhoto((current) => (current - 1 + photos.length) % photos.length);
  };

  // =========================
  // TOUCHES CLAVIER
  // =========================

  useEffect(() => {
    if (!gallery) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }

      if (event.key === "ArrowLeft") {
        previousPhoto();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [gallery]);

  return (
    <section id="experience" className="section relative">
      <div className="container-site">
        {/* =========================
            TITRE
        ========================= */}

        <div className="mb-20">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Expériences
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Des expériences différentes,
            <span className="text-zinc-500"> une même envie d'apprendre.</span>
          </h2>
        </div>

        {/* =========================
            TIMELINE
        ========================= */}

        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-[7px] top-2 bottom-0 w-px bg-white/10 md:left-[119px]" />

          <div className="space-y-16">
            {/* =========================
                SOPHIE
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
                duration: 0.6,
              }}
              className="relative grid gap-6 md:grid-cols-[120px_1fr]"
            >
              {/* Année */}
              <div className="relative pl-8 md:pl-0">
                <p className="text-sm font-medium text-zinc-400">2023 — 2025</p>
              </div>

              {/* Point */}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-[#050505] md:left-[112px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Contenu */}
              <div className="pl-8 md:pl-10">
                <h3 className="text-2xl font-medium text-white md:text-3xl">
                  Responsable boulangerie
                </h3>

                <p className="mt-2 text-zinc-500">
                  <span
                    className="cursor-pointer text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
                    onMouseEnter={(event) => handleMouseEnter(event, "sophie")}
                    onMouseLeave={() => setActiveImage(null)}
                    onClick={() => openGallery("sophie")}
                  >
                    Sophie LeBreuilly
                  </span>
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  Une première expérience professionnelle importante dans
                  laquelle j'ai évolué jusqu'au poste de responsable de
                  boulangerie. J'y ai développé mon sens des responsabilités,
                  mon organisation et ma rigueur au quotidien.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Responsabilités
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Organisation
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Rigueur
                  </span>
                </div>
              </div>
            </motion.div>

            {/* =========================
                FRJ
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
                duration: 0.6,
              }}
              className="relative grid gap-6 md:grid-cols-[120px_1fr]"
            >
              {/* Année */}
              <div className="relative pl-8 md:pl-0">
                <p className="text-sm font-medium text-zinc-400">2025 — 2026</p>
              </div>

              {/* Point */}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-[#050505] md:left-[112px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Contenu */}
              <div className="pl-8 md:pl-10">
                <h3 className="text-2xl font-medium text-white md:text-3xl">
                  Préparateur automobile
                </h3>

                <p className="mt-2 text-zinc-500">
                  <span
                    className="cursor-pointer text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
                    onMouseEnter={(event) => handleMouseEnter(event, "frj")}
                    onMouseLeave={() => setActiveImage(null)}
                    onClick={() => openGallery("frj")}
                  >
                    FRJ Location — Hertz
                  </span>
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  Une expérience dans le secteur de la location automobile, où
                  j'étais principalement chargé de préparer et nettoyer les
                  véhicules avant leur remise aux clients. J'ai également
                  réalisé des contrats de location et participé à la gestion
                  quotidienne de la flotte.
                </p>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  J'ai également eu l'occasion de créer un site internet dédié à
                  la vente des anciens véhicules de la flotte et d'effectuer des
                  missions de convoyage de véhicules.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Automobile
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Gestion
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Création web
                  </span>
                </div>
              </div>
            </motion.div>

            {/* =========================
                VAIANNI
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
                duration: 0.6,
              }}
              className="relative grid gap-6 md:grid-cols-[120px_1fr]"
            >
              {/* Année */}
              <div className="relative pl-8 md:pl-0">
                <p className="text-sm font-medium text-zinc-400">2026</p>
              </div>

              {/* Point */}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-[#050505] md:left-[112px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Contenu */}
              <div className="pl-8 md:pl-10">
                <h3 className="text-2xl font-medium text-white md:text-3xl">
                  Préparateur automobile
                </h3>

                <p className="mt-2 text-zinc-500">
                  <span
                    className="cursor-pointer text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
                    onMouseEnter={(event) => handleMouseEnter(event, "vaianni")}
                    onMouseLeave={() => setActiveImage(null)}
                    onClick={() => openGallery("vaianni")}
                  >
                    Garage Richard Vaianni
                  </span>
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  Après Hertz, j'ai choisi de me réorienter vers la mécanique
                  automobile. Une expérience de cinq mois qui m'a permis de
                  développer de nouvelles compétences techniques et d'aborder un
                  environnement professionnel complètement différent.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Mécanique
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Technique
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                    Automobile
                  </span>
                </div>
              </div>
            </motion.div>

            {/* =========================
                SUISSE
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
                duration: 0.6,
              }}
              className="relative grid gap-6 md:grid-cols-[120px_1fr]"
            >
              {/* Année */}
              <div className="relative pl-8 md:pl-0">
                <p className="text-sm font-medium text-emerald-400">
                  2026 — aujourd'hui
                </p>
              </div>

              {/* Point actuel */}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-[#050505] md:left-[112px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>

              {/* Contenu */}
              <div className="pl-8 md:pl-10">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-medium text-white md:text-3xl">
                    Nouvelle aventure en Suisse
                  </h3>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-xs font-medium text-emerald-400">
                    Actuellement
                  </span>
                </div>

                <p className="text-zinc-500">Installation & nouveaux projets</p>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  Après ces différentes expériences, j'ai choisi de m'installer
                  en Suisse afin de rejoindre ma famille et de construire une
                  nouvelle étape de mon parcours professionnel et personnel.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================
          IMAGE AU SURVOL
      ========================= */}

      <AnimatePresence>
        {activeImage && !gallery && (
          <motion.div
            key={activeImage}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            style={{
              left: imagePosition.x,
              top: imagePosition.y,
            }}
            className="pointer-events-none fixed z-50 hidden w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl lg:block"
          >
            <img
              src={images[activeImage].photos[0]}
              alt={images[activeImage].alt}
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          GALERIE PLEIN ÉCRAN
      ========================= */}

      <AnimatePresence>
        {gallery && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm"
            onClick={closeGallery}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
              }}
              className="relative flex max-h-[85vh] max-w-[calc(100vw-100px)] items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              {/* IMAGE */}

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhoto}
                  src={images[gallery].photos[currentPhoto]}
                  alt={images[gallery].alt}
                  initial={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="max-h-[85vh] max-w-[calc(100vw-100px)] rounded-2xl object-contain shadow-2xl"
                />
              </AnimatePresence>

              {/* BOUTON FERMER */}

              <button
                type="button"
                onClick={closeGallery}
                className="absolute -right-5 -top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-2xl text-white backdrop-blur-xl transition hover:bg-white/10"
                aria-label="Fermer"
              >
                ×
              </button>

              {/* FLÈCHE GAUCHE */}

              {images[gallery].photos.length > 1 && (
                <button
                  type="button"
                  onClick={previousPhoto}
                  className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-2xl text-white backdrop-blur-xl transition hover:bg-white/10"
                  aria-label="Photo précédente"
                >
                  ←
                </button>
              )}

              {/* FLÈCHE DROITE */}

              {images[gallery].photos.length > 1 && (
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-0 top-1/2 z-20 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-2xl text-white backdrop-blur-xl transition hover:bg-white/10"
                  aria-label="Photo suivante"
                >
                  →
                </button>
              )}

              {/* COMPTEUR */}

              {images[gallery].photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
                  {currentPhoto + 1} / {images[gallery].photos.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
