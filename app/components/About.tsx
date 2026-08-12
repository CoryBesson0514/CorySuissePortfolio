"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ImageKey = "bsn";

const images = {
  bsn: {
    src: "/bsn.jpg",
    alt: "BSN — photographie et vidéo",
  },
};

export default function About() {
  const [activeImage, setActiveImage] = useState<ImageKey | null>(null);

  const [imagePosition, setImagePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLSpanElement>,
    image: ImageKey
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

  const handleMobileClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    image: ImageKey
  ) => {
    event.stopPropagation();

    setActiveImage(image);
  };

  const closeImage = () => {
    setActiveImage(null);
  };

  return (
    <section id="about" className="section relative">
      <div className="container-site">
        <div className="mb-12">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            À propos
          </p>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Un nouveau départ en Suisse,
            <span className="text-zinc-500"> avec l'envie de construire.</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-20">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
              Ma situation
            </p>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
            <p>
              <span className="text-white">Français, à 22 ans,</span> j'ai
              choisi de m'installer en{" "}
              <span className="text-white">Suisse</span> pour rejoindre une
              partie de ma famille et saisir une nouvelle opportunité
              professionnelle.
            </p>

            <p>
              Avec mon cousin, je développe également{" "}
              <span
                className="cursor-pointer text-white underline decoration-white/20 underline-offset-4 transition hover:decoration-white"
                onMouseEnter={(event) => handleMouseEnter(event, "bsn")}
                onMouseLeave={() => setActiveImage(null)}
                onClick={(event) => handleMobileClick(event, "bsn")}
              >
                BSN
              </span>
              , une entreprise spécialisée dans la photographie et la vidéo. Ce
              projet représente pour moi l'occasion de développer une activité
              entrepreneuriale et de mettre à profit ma créativité.
            </p>

            <p className="text-zinc-300">
              Aujourd'hui, je souhaite poursuivre mon évolution en Suisse,
              découvrir de nouveaux environnements professionnels et continuer à
              développer mes compétences.
            </p>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <AnimatePresence>
        {activeImage && (
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
            onClick={closeImage}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              backdrop-blur-sm
              lg:pointer-events-none
              lg:inset-auto
              lg:block
              lg:bg-transparent
              lg:backdrop-blur-none
            "
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="
                w-[calc(100vw-40px)]
                max-w-[400px]
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-black/70
                shadow-2xl
                lg:w-[400px]
                lg:bg-black/40
              "
            >
              <img
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
