"use client";

import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Settings, QrCode } from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";

const links = [
  {
    name: "À propos",
    href: "#about",
  },
  {
    name: "Expérience",
    href: "#experience",
  },
  {
    name: "Compétences",
    href: "#skills",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const handleContact = () => {
    setOpen(false);
    setContactOpen(true);
  };

  return (
    <>
      {/* Navbar */}
      <motion.header
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div className="container-site pt-5">
          <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
            {/* Logo */}
            <a href="#" className="text-sm font-semibold tracking-tight">
              CORY
              <span className="text-zinc-500">.</span>
            </a>

            {/* Navigation desktop */}
            <div className="hidden items-center gap-7 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Actions desktop */}
            <div className="hidden items-center gap-2 md:flex">
              {/* QR Code */}
              <button
                onClick={() => setQrOpen(true)}
                aria-label="QR Code"
                title="QR Code"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <QrCode size={16} />
              </button>

              {/* Admin */}
              <a
                href="/admin"
                aria-label="Administration"
                title="Administration"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <Settings size={16} />
              </a>

              {/* Contact */}
              <button
                onClick={handleContact}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium !text-black transition hover:scale-105 hover:bg-zinc-200"
              >
                Me contacter
              </button>
            </div>

            {/* Menu mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="text-zinc-300 transition hover:text-white md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </nav>

          {/* Menu mobile */}
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.2,
              }}
              className="glass mt-2 rounded-3xl p-5 md:hidden"
            >
              <div className="flex flex-col gap-5">
                {/* Liens */}
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-zinc-300 transition hover:text-white"
                  >
                    {link.name}
                  </a>
                ))}

                {/* Séparateur */}
                <div className="h-px bg-white/10" />

                {/* QR Code mobile */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setQrOpen(true);
                  }}
                  className="flex items-center gap-3 text-zinc-400 transition hover:text-white"
                >
                  <QrCode size={17} />
                  QR Code
                </button>

                {/* Admin mobile */}
                <a
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-zinc-400 transition hover:text-white"
                >
                  <Settings size={17} />
                  Administration
                </a>

                {/* Contact mobile */}
                <button
                  onClick={handleContact}
                  className="rounded-full bg-white px-4 py-3 text-sm font-medium !text-black transition hover:bg-zinc-200"
                >
                  Me contacter
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Fenêtre QR Code */}
      <AnimatePresence>
        {qrOpen && (
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
              duration: 0.2,
            }}
            onClick={() => setQrOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm rounded-[28px] border border-white/10 bg-[#111]/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              {/* Fermer */}
              <button
                onClick={() => setQrOpen(false)}
                aria-label="Fermer"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>

              {/* Titre */}
              <div className="mb-6 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Scanner
                </p>

                <h2 className="mt-2 text-2xl font-medium text-white">
                  Portfolio
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Scannez ce code pour accéder rapidement à mon portfolio.
                </p>
              </div>

              {/* QR Code */}
              <div className="overflow-hidden rounded-2xl bg-white p-4">
                <img
                  src="/qr-code.png"
                  alt="QR Code vers le site de Cory Besson"
                  className="h-auto w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fenêtre de contact */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
