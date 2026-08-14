import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Étoiles */}

          <div className="absolute inset-0">
            <div className="absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-white/40" />
            <div className="absolute left-[25%] top-[70%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[40%] top-[15%] h-1 w-1 rounded-full bg-white/50" />
            <div className="absolute left-[65%] top-[25%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[80%] top-[65%] h-1 w-1 rounded-full bg-white/50" />
            <div className="absolute left-[90%] top-[35%] h-1 w-1 rounded-full bg-white/30" />
            <div className="absolute left-[15%] top-[45%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[55%] top-[80%] h-1 w-1 rounded-full bg-white/30" />
          </div>

          {/* Contenu */}

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
      </body>
    </html>
  );
}
