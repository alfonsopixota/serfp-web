import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonios from "@/components/Testimonios";
import Empleabilidad from "@/components/Empleabilidad";
import Recursos from "@/components/Recursos";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonios />
        <Empleabilidad />
        <Recursos />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
