import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import FloatingShapes from "@/components/FloatingShapes";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FloatingShapes />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  );
}
