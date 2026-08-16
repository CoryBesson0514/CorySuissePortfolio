"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [checkingSession, setCheckingSession] = useState(true);

  const [error, setError] = useState("");

  const [cooldown, setCooldown] = useState(0);

  /*
   * ============================================================
   * VÉRIFICATION SESSION
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          if (!cancelled) {
            setCheckingSession(false);
          }

          return;
        }

        const data = await response.json();

        if (data.authenticated) {
          router.replace("/admin");
          return;
        }

        if (!cancelled) {
          setCheckingSession(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session :", error);

        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    };

    checkSession();

    return () => {
      cancelled = true;
    };
  }, [router]);

  /*
   * ============================================================
   * TIMER COOLDOWN
   * ============================================================
   */

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldown]);

  /*
   * ============================================================
   * CONNEXION
   * ============================================================
   */

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || cooldown > 0) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      /*
       * --------------------------------------------------------
       * COOLDOWN
       * --------------------------------------------------------
       */

      if (response.status === 429 || data?.cooldown) {
        const seconds = Math.max(1, Number(data?.remainingSeconds ?? 30));

        setCooldown(seconds);

        setError(data?.error ?? "Trop de tentatives. Veuillez patienter.");

        setLoading(false);

        return;
      }

      /*
       * --------------------------------------------------------
       * AUTRE ERREUR
       * --------------------------------------------------------
       */

      if (!response.ok) {
        setError(data?.error ?? "Identifiant ou mot de passe incorrect.");

        setLoading(false);

        return;
      }

      /*
       * --------------------------------------------------------
       * CONNEXION RÉUSSIE
       * --------------------------------------------------------
       */

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);

      setError("Impossible de contacter le serveur. Veuillez réessayer.");

      setLoading(false);
    }
  };

  /*
   * ============================================================
   * ÉCRAN DE CHARGEMENT
   * ============================================================
   */

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white" />
      </main>
    );
  }

  /*
   * ============================================================
   * LOGIN
   * ============================================================
   */

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md"
      >
        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="mb-8 text-center">
          <a href="/" className="text-sm font-semibold tracking-tight">
            CORY
            <span className="text-zinc-500">.</span>
          </a>

          <h1 className="mt-6 text-3xl font-medium tracking-tight">
            Administration
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Connectez-vous pour accéder à votre espace.
          </p>
        </div>

        {/* ==================================================
            FORMULAIRE
        ================================================== */}

        <form
          onSubmit={handleLogin}
          className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 shadow-2xl md:p-8"
        >
          {/* ==================================================
              IDENTIFIANT
          ================================================== */}

          <div>
            <label
              htmlFor="username"
              className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500"
            >
              <User size={14} />
              Identifiant
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Identifiant"
              required
              disabled={loading || cooldown > 0}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-700 outline-none transition focus:border-white/25 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* ==================================================
              MOT DE PASSE
          ================================================== */}

          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500"
            >
              <Lock size={14} />
              Mot de passe
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              required
              disabled={loading || cooldown > 0}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-700 outline-none transition focus:border-white/25 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* ==================================================
              MESSAGE
          ================================================== */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400"
            >
              <div>{error}</div>

              {cooldown > 0 && (
                <div className="mt-2 font-medium text-red-300">
                  Réessayez dans {cooldown} seconde
                  {cooldown > 1 ? "s" : ""}.
                </div>
              )}
            </motion.div>
          )}

          {/* ==================================================
              BOUTON
          ================================================== */}

          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {cooldown > 0 ? (
              <>
                <Lock size={16} />
                Réessayer dans {cooldown}s
              </>
            ) : loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                Connexion...
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* ==================================================
            RETOUR
        ================================================== */}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-300"
          >
            Retour au site
          </a>
        </div>
      </motion.div>
    </main>
  );
}
