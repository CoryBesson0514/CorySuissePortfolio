"use client";
import { motion } from "motion/react";
import {
  Menu,
  X,
  Settings,
} from "lucide-react";
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
            <a
              href="#"
              className="text-sm font-semibold tracking-tight"
            >
              CORY
              <span className="text-zinc-500">
                .
              </span>
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
              {open ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
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
      {/* Fenêtre de contact */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}