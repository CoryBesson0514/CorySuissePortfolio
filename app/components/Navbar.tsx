"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Settings,
  QrCode,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";

const links = [
  {
    name: "À propos",
    href: "#about",
  },
  {
    name: "Points forts",
    href: "#strengths",
  },
  {
    name: "Expériences",
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
  const [copied, setCopied] = useState(false);

  const handleContact = () => {
    setOpen(false);
    setContactOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://corybesson.vercel.app/");

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Impossible de copier le lien :", error);
    }
  };

  return (
    <>
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="container-site pt-5">
          <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
            {/* ==================================================
                LOGO
            ================================================== */}

            <a
              href="#"
              data-cory-navbar-logo
              className="text-sm font-semibold tracking-tight"
            >
              CORY
              <span className="text-zinc-500">.</span>
            </a>

            {/* ==================================================
                NAVIGATION DESKTOP
            ================================================== */}

            <motion.div
              className="hidden items-center gap-7 md:flex"
              initial={{
                opacity: 0,
                x: 12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.4 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>

            {/* ==================================================
                ACTIONS DESKTOP
            ================================================== */}

            <motion.div
              className="hidden items-center gap-2 md:flex"
              initial={{
                opacity: 0,
                x: 12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* QR CODE */}

              <button
                type="button"
                onClick={() => setQrOpen(true)}
                aria-label="QR Code"
                title="QR Code"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08]"
              >
                <QrCode size={16} />
              </button>

              {/* ADMIN */}

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin";
                }}
                aria-label="Administration"
                title="Administration"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <Settings size={16} />
              </button>

              {/* CONTACT */}

              <button
                type="button"
                onClick={handleContact}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium !text-black transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
              >
                Me contacter
              </button>
            </motion.div>

            {/* ==================================================
                MENU MOBILE
            ================================================== */}

            <motion.button
              type="button"
              onClick={() => setOpen(!open)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 0.5,
              }}
              className="text-zinc-300 transition-colors duration-300 hover:text-white md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </motion.button>
          </nav>

          {/* ==================================================
              MENU MOBILE
          ================================================== */}

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass mt-2 rounded-3xl p-5 md:hidden"
              >
                <div className="flex flex-col gap-5">
                  {/* LIENS */}

                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-zinc-300 transition-colors duration-300 hover:text-white"
                    >
                      {link.name}
                    </a>
                  ))}

                  {/* SEPARATEUR */}

                  <div className="h-px bg-white/10" />

                  {/* QR */}

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setQrOpen(true);
                    }}
                    className="flex items-center gap-3 text-white transition-colors duration-300 hover:text-zinc-300"
                  >
                    <QrCode size={17} />
                    QR Code
                  </button>

                  {/* ADMIN */}

                  <a
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-zinc-400 transition-colors duration-300 hover:text-white"
                  >
                    <Settings size={17} />
                    Administration
                  </a>

                  {/* CONTACT */}

                  <button
                    type="button"
                    onClick={handleContact}
                    className="rounded-full bg-white px-4 py-3 text-sm font-medium !text-black transition-all duration-300 hover:bg-zinc-200"
                  >
                    Me contacter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ==================================================
          QR CODE
      ================================================== */}

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
              {/* FERMER */}

              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Fermer"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>

              {/* TITRE */}

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

              {/* QR */}

              <div className="overflow-hidden rounded-2xl bg-white p-4">
                <img
                  src="/qr-code.png"
                  alt="QR Code vers le site de Cory Besson"
                  className="h-auto w-full"
                />
              </div>

              {/* COPIER */}

              <motion.button
                type="button"
                onClick={handleCopyLink}
                whileTap={{
                  scale: 0.97,
                }}
                animate={{
                  scale: copied ? [1, 1.03, 1] : 1,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{
                        opacity: 0,
                        y: 4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                      }}
                      className="flex items-center gap-2"
                    >
                      <Check size={15} />
                      Copié !
                    </motion.span>
                  ) : (
                    <motion.span
                      key="link"
                      initial={{
                        opacity: 0,
                        y: 4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                      }}
                      className="flex items-center gap-2"
                    >
                      <LinkIcon size={15} />
                      Lien
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================
          CONTACT
      ================================================== */}

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
