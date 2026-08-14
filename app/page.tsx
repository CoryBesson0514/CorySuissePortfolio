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

export default function Home() {
  return (
    <main>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Strengths />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
