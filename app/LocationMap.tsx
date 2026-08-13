"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { AnimatePresence, motion } from "motion/react";
import { X, MapPin } from "lucide-react";

import "mapbox-gl/dist/mapbox-gl.css";

const HAUTERIVE: [number, number] = [6.9707, 47.0167];

export default function LocationMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [open, setOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // =========================
  // OUVRIR LA CARTE
  // =========================

  const openMap = () => {
    setOpen(true);
  };

  // =========================
  // FERMER LA CARTE
  // =========================

  const closeMap = () => {
    setOpen(false);
  };

  // =========================
  // INITIALISER MAPBOX
  // =========================

  useEffect(() => {
    if (!open || !mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      console.error("NEXT_PUBLIC_MAPBOX_TOKEN est manquant dans .env.local");
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,

      style: "mapbox://styles/mapbox/dark-v11",

      center: [6.93, 47.02],

      zoom: 10,

      pitch: 20,

      bearing: -10,

      attributionControl: false,

      dragRotate: false,

      touchZoomRotate: true,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
        showZoom: false,
      }),
      "bottom-right",
    );

    map.current.on("load", () => {
      setMapReady(true);

      // =========================
      // MARQUEUR
      // =========================

      const markerElement = document.createElement("div");

      markerElement.className = "location-marker";

      markerElement.innerHTML = `
        <div class="location-marker-pulse"></div>
        <div class="location-marker-dot"></div>
      `;

      new mapboxgl.Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat(HAUTERIVE)
        .addTo(map.current!);

      // =========================
      // ANIMATION CAMÉRA
      // =========================

      setTimeout(() => {
        map.current?.flyTo({
          center: HAUTERIVE,

          zoom: 13.8,

          pitch: 48,

          bearing: -18,

          duration: 1800,

          essential: true,

          curve: 1.4,
        });
      }, 150);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }

      setMapReady(false);
    };
  }, [open]);

  return (
    <>
      {/* =========================
          BOUTON / LOCALISATION
      ========================= */}

      <button
        type="button"
        onMouseEnter={openMap}
        onClick={openMap}
        className="group flex items-center gap-2 text-left text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
        aria-label="Afficher ma localisation"
      >
        <MapPin
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />

        <span className="relative">
          Neuchâtel, Suisse
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
        </span>
      </button>

      {/* =========================
          CARTE
      ========================= */}

      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY MOBILE */}

            <motion.button
              type="button"
              aria-label="Fermer la carte"
              onClick={closeMap}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]"
            />

            {/* CARTE */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseLeave={closeMap}
              className="fixed bottom-6 left-1/2 z-[100] w-[calc(100vw-32px)] max-w-[520px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] shadow-2xl md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:w-[500px] md:-translate-y-1/2 md:translate-x-0"
            >
              {/* HEADER */}

              <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-5 pb-12 pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Localisation
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    Hauterive · Neuchâtel
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMap}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-zinc-400 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* MAP */}

              <div
                ref={mapContainer}
                className="h-[320px] w-full md:h-[360px]"
              />

              {/* FOOTER */}

              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 pb-5 pt-14">
                <div>
                  <p className="text-xs text-zinc-500">
                    Suisse · Canton de Neuchâtel
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    Une partie de mon parcours commence ici.
                  </p>
                </div>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: mapReady ? 1 : 0,
                    scale: mapReady ? 1 : 0.5,
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 0.4,
                  }}
                  className="hidden h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] sm:block"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================
          STYLE DU MARKER
      ========================= */}

      <style jsx global>{`
        .location-marker {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .location-marker-pulse {
          position: absolute;
          width: 42px;
          height: 42px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.15);
          animation: locationPulse 2s ease-out infinite;
        }

        .location-marker-dot {
          position: relative;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: white;
          border: 3px solid rgba(0, 0, 0, 0.7);
          box-shadow:
            0 0 0 4px rgba(255, 255, 255, 0.12),
            0 0 20px rgba(255, 255, 255, 0.8);
        }

        @keyframes locationPulse {
          0% {
            transform: scale(0.4);
            opacity: 0.8;
          }

          70% {
            transform: scale(1.4);
            opacity: 0;
          }

          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .mapboxgl-ctrl-group {
          background: rgba(0, 0, 0, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .mapboxgl-ctrl-group button {
          filter: invert(1);
        }

        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
      `}</style>
    </>
  );
}
