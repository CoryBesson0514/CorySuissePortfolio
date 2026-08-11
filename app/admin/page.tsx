"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Lock,
  LogOut,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";

import {
  defaultSiteConfig,
  getSiteConfig,
  saveSiteConfig,
  type AvailabilityStatus,
  type SiteConfig,
} from "../lib/siteConfig";

export default function AdminPage() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [config, setConfig] =
    useState<SiteConfig>(defaultSiteConfig);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem(
      "cory-admin-session"
    );

    if (session === "true") {
      setLoggedIn(true);
      setConfig(getSiteConfig());
    }
  }, []);

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      username === "admin" &&
      password === "@Gruissan11"
    ) {
      sessionStorage.setItem(
        "cory-admin-session",
        "true"
      );

      setLoggedIn(true);
      setError("");
      setConfig(getSiteConfig());

      return;
    }

    setError(
      "Identifiant ou mot de passe incorrect."
    );
  };

  const handleLogout = () => {
    // Supprime la session administrateur
    sessionStorage.removeItem(
      "cory-admin-session"
    );

    // Nettoie les champs
    setLoggedIn(false);
    setUsername("");
    setPassword("");

    // Retour à la page principale
    router.push("/");
  };

  const handleSave = () => {
    saveSiteConfig(config);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const updateConfig = (
    key: keyof SiteConfig,
    value: string
  ) => {
    setConfig((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const changeAvailability = (
    status: AvailabilityStatus
  ) => {
    const presets = {
      available: {
        label: "Disponible",
        message:
          "Disponible pour de nouvelles opportunités professionnelles et de nouveaux projets en Suisse.",
      },

      soon: {
        label: "Disponible prochainement",
        message:
          "Disponible prochainement pour de nouvelles opportunités professionnelles en Suisse.",
      },

      unavailable: {
        label: "Indisponible",
        message:
          "Actuellement indisponible pour de nouvelles opportunités.",
      },
    };

    setConfig((current) => ({
      ...current,
      availability: status,
      availabilityLabel: presets[status].label,
      availabilityMessage:
        presets[status].message,
    }));
  };

  /* =========================
     PAGE DE CONNEXION
  ========================= */

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="flex min-h-screen items-center justify-center px-5">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="w-full max-w-md"
          >

            <div className="mb-8 text-center">
              <p className="text-sm font-semibold tracking-tight">
                CORY
                <span className="text-zinc-500">
                  .
                </span>
              </p>

              <h1 className="mt-6 text-3xl font-medium tracking-tight">
                Administration
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Accès réservé à l'administrateur.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 shadow-2xl backdrop-blur-xl">

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >

                {/* Identifiant */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Identifiant
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      type="text"
                      value={username}
                      onChange={(event) =>
                        setUsername(
                          event.target.value
                        )
                      }
                      placeholder="Identifiant"
                      autoComplete="username"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/25 focus:bg-white/[0.05]"
                    />

                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                    Mot de passe
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      placeholder="Mot de passe"
                      autoComplete="current-password"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/25 focus:bg-white/[0.05]"
                    />

                  </div>
                </div>

                {/* Erreur */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Connexion */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-medium text-black transition hover:scale-[1.01] hover:bg-zinc-200 active:scale-[0.99]"
                >
                  Se connecter

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </form>

            </div>

          </motion.div>

        </div>
      </main>
    );
  }

  /* =========================
     ADMIN CONNECTÉ
  ========================= */

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold tracking-tight">
              CORY
              <span className="text-zinc-500">
                .
              </span>
            </p>

            <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
              Administration
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Gérez les informations affichées sur votre site.
            </p>

          </div>

          {/* Déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
          >
            <LogOut size={16} />

            <span className="hidden sm:inline">
              Déconnexion
            </span>
          </button>

        </div>

        {/* Informations */}
        <section className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">

          <div className="mb-8">

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Informations
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Coordonnées
            </h2>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Téléphone */}
            <div>

              <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Phone size={14} />
                Téléphone
              </label>

              <input
                type="text"
                value={config.phone}
                onChange={(event) =>
                  updateConfig(
                    "phone",
                    event.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25"
              />

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
                <Mail size={14} />
                E-mail
              </label>

              <input
                type="email"
                value={config.email}
                onChange={(event) =>
                  updateConfig(
                    "email",
                    event.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25"
              />

            </div>

          </div>

        </section>

        {/* Disponibilité */}
        <section className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">

          <div className="mb-8">

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Statut
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Disponibilité
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Cette information apparaîtra sur votre site.
            </p>

          </div>

          {/* Choix statut */}
          <div className="grid gap-3 md:grid-cols-3">

            {/* Disponible */}
            <button
              type="button"
              onClick={() =>
                changeAvailability("available")
              }
              className={`rounded-2xl border p-4 text-left transition ${
                config.availability === "available"
                  ? "border-emerald-500/40 bg-emerald-500/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >

              <div className="flex items-center gap-3">

                <span className="h-3 w-3 rounded-full bg-emerald-400" />

                <span className="text-sm font-medium">
                  Disponible
                </span>

                {config.availability ===
                  "available" && (
                  <Check
                    size={16}
                    className="ml-auto text-emerald-400"
                  />
                )}

              </div>

            </button>

            {/* Prochainement */}
            <button
              type="button"
              onClick={() =>
                changeAvailability("soon")
              }
              className={`rounded-2xl border p-4 text-left transition ${
                config.availability === "soon"
                  ? "border-orange-500/40 bg-orange-500/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >

              <div className="flex items-center gap-3">

                <span className="h-3 w-3 rounded-full bg-orange-400" />

                <span className="text-sm font-medium">
                  Prochainement
                </span>

                {config.availability === "soon" && (
                  <Check
                    size={16}
                    className="ml-auto text-orange-400"
                  />
                )}

              </div>

            </button>

            {/* Indisponible */}
            <button
              type="button"
              onClick={() =>
                changeAvailability("unavailable")
              }
              className={`rounded-2xl border p-4 text-left transition ${
                config.availability === "unavailable"
                  ? "border-red-500/40 bg-red-500/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >

              <div className="flex items-center gap-3">

                <span className="h-3 w-3 rounded-full bg-red-400" />

                <span className="text-sm font-medium">
                  Indisponible
                </span>

                {config.availability ===
                  "unavailable" && (
                  <Check
                    size={16}
                    className="ml-auto text-red-400"
                  />
                )}

              </div>

            </button>

          </div>

          {/* Textes personnalisables */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                Texte de la pastille
              </label>

              <input
                type="text"
                value={config.availabilityLabel}
                onChange={(event) =>
                  updateConfig(
                    "availabilityLabel",
                    event.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25"
              />

            </div>

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-zinc-500">
                Message
              </label>

              <input
                type="text"
                value={config.availabilityMessage}
                onChange={(event) =>
                  updateConfig(
                    "availabilityMessage",
                    event.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25"
              />

            </div>

          </div>

        </section>

        {/* Enregistrer */}
        <div className="mt-6 flex justify-end">

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105 hover:bg-zinc-200 active:scale-95"
          >

            {saved ? (
              <>
                <Check size={17} />
                Enregistré
              </>
            ) : (
              <>
                <Save size={17} />
                Enregistrer
              </>
            )}

          </button>

        </div>

      </div>
    </main>
  );
}
