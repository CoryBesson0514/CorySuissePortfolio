import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
          {/* =========================
              ÉTOILES
          ========================= */}

          <div className="absolute inset-0">
            {/* Étoiles fixes */}

            <div className="absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-white/40" />
            <div className="absolute left-[25%] top-[70%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[40%] top-[15%] h-1 w-1 rounded-full bg-white/50" />
            <div className="absolute left-[65%] top-[25%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[80%] top-[65%] h-1 w-1 rounded-full bg-white/50" />
            <div className="absolute left-[90%] top-[35%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[15%] top-[45%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[55%] top-[80%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[72%] top-[82%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[35%] top-[88%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[5%] top-[55%] h-1 w-1 rounded-full bg-white/30" />

            {/* Étoiles filantes */}

            <div className="shooting-star shooting-star-1" />
            <div className="shooting-star shooting-star-2" />
            <div className="shooting-star shooting-star-3" />
          </div>

          {/* =========================
              CONTENU
          ========================= */}

          <div className="relative z-10 px-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-600">
              Perdu dans l'espace
            </p>

            <h1 className="mt-5 text-[clamp(6rem,18vw,12rem)] font-semibold leading-none tracking-[-0.08em]">
              404
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-zinc-500">
              Cette page a probablement décidé de partir en orbite.
              <br />
              Moi non plus, je ne sais pas où elle est.
            </p>

            <a
              href="/"
              className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-zinc-300 transition duration-300 hover:bg-white hover:text-black"
            >
              Retour au portfolio
            </a>
          </div>
        </main>

        {/* =========================
            ANIMATIONS
        ========================= */}

        <style>{`
          .shooting-star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 9999px;
            opacity: 0;
            transform: rotate(-45deg);
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          }

          .shooting-star::after {
             content: "";
            position: absolute;
            left: 0;
             top: 50%;
             width: 90px;
             height: 1px;
            transform: translateY(-50%);
            background: linear-gradient(
             to right,
             rgba(255, 255, 255, 0.6),
             transparent
            );
}

          .shooting-star-1 {
            top: 18%;
            left: 75%;
            animation: shooting-star 7s linear infinite;
          }

          .shooting-star-2 {
            top: 35%;
            left: 25%;
            animation: shooting-star 9s linear infinite 3s;
          }

          .shooting-star-3 {
            top: 65%;
            left: 80%;
            animation: shooting-star 11s linear infinite 6s;
          }

          @keyframes shooting-star {
            0% {
              opacity: 0;
              transform: translate(0, 0) rotate(-45deg);
            }

            5% {
              opacity: 0.8;
            }

            15% {
              opacity: 0.8;
            }

            25% {
              opacity: 0;
              transform: translate(-180px, 180px) rotate(-45deg);
            }

            100% {
              opacity: 0;
              transform: translate(-180px, 180px) rotate(-45deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .shooting-star {
              animation: none;
              opacity: 0;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
