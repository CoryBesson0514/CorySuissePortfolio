"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, X } from "lucide-react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

export default function LocationMap() {
  const [open, setOpen] = useState(false);

  // =========================
  // POSITION
  // =========================

  const latitude = 47.013361;
  const longitude = 6.976861;

  // =========================
  // TOKEN MAPBOX
  // =========================

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // =========================
  // OUVERTURE
  // =========================

  const handleOpen = () => {
    setOpen((value) => !value);
  };

  return (
    <div className="relative">
      {/* =========================
          BOUTON LOCALISATION
      ========================= */}

      <motion.button
        type="button"
        onClick={handleOpen}
        whileTap={{ scale: 0.97 }}
        className="group relative flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
      >
        <MapPin
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />

        <span>Neuchâtel test, Suisse</span>

        {/* Indicateur */}

        <motion.span
          animate={{
            scale: open ? 1 : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="ml-1 h-1.5 w-1.5 rounded-full bg-white"
        />
      </motion.button>

      {/* =========================
          CARTE
      ========================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              height: 300,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 top-full z-50 mt-4 h-[300px] w-[min(420px,calc(100vw-40px))] overflow-hidden rounded-3xl border border-white/10 bg-[#080808] shadow-2xl shadow-black/50"
          >
            {/* =========================
                BOUTON FERMER
            ========================= */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-zinc-400 backdrop-blur-xl transition hover:bg-white hover:text-black"
              aria-label="Fermer la carte"
            >
              <X size={15} />
            </button>

            {/* =========================
                MAPBOX
            ========================= */}

            <div className="h-[300px] w-full">
              {!mapboxToken ? (
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <div>
                    <MapPin size={22} className="mx-auto mb-3 text-zinc-600" />

                    <p className="text-sm text-zinc-400">
                      Carte temporairement indisponible
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Token Mapbox manquant
                    </p>
                  </div>
                </div>
              ) : (
                <Map
                  initialViewState={{
                    longitude,
                    latitude,
                    zoom: 15,
                    pitch: 45,
                    bearing: -15,
                  }}
                  mapboxAccessToken={mapboxToken}
                  mapStyle="mapbox://styles/j0ppi/cmsrvl54g01a801s9dxsocqj4"
                  attributionControl={false}
                  reuseMaps
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                  onLoad={(event) => {
                    requestAnimationFrame(() => {
                      event.target.resize();
                    });
                  }}
                >
                  {/* =========================
                      NAVIGATION
                  ========================= */}

                  <NavigationControl
                    position="bottom-right"
                    showCompass={false}
                  />

                  {/* =========================
                      MARKER
                  ========================= */}

                  <Marker
                    longitude={longitude}
                    latitude={latitude}
                    anchor="bottom"
                  >
                    <div className="relative">
                      {/* Halo animé */}

                      <motion.div
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.35, 0, 0.35],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                      />

                      {/* Point */}

                      <div className="relative flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-lg shadow-white/30">
                        <div className="h-1.5 w-1.5 rounded-full bg-black" />
                      </div>
                    </div>
                  </Marker>
                </Map>
              )}
            </div>

            {/* =========================
                INFOS CARTE
            ========================= */}

            <div className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                Localisation
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                Neuchâtel, Suisse
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                Région de Neuchâtel
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
