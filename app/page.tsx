import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import SelectedWork from "@/components/SelectedWork";
import CaseStudy from "@/components/CaseStudy";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Intro />
        <CaseStudy />
        <SelectedWork />
        <Capabilities />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
