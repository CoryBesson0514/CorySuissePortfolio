import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Strengths from "./components/Strengths";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main>
      <IntroScreen />
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}

const [saved, setSaved] = useState(false);
const [loading, setLoading] = useState(true);

// =========================
// CURSEUR NORMAL SUR L'ADMIN
// =========================

useEffect(() => {
  document.body.classList.add("admin-page");

  return () => {
    document.body.classList.remove("admin-page");
  };
}, []);
