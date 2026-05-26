import { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CircularIconCursor } from "./components/cursor/CircularIconCursor";
import { ScrollCubes3D } from "./components/ui/ScrollCubes3D";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Repos } from "./components/sections/Repos";
import { Contact } from "./components/sections/Contact";

import { useActiveSection } from "./hooks/useActiveSection";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useIsMobile } from "./hooks/useIsMobile";
import { useGitHub } from "./hooks/useGitHub";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const activeSection = useActiveSection();
  const isMobile = useIsMobile();
  
  // Fetch real-time GitHub data
  const github = useGitHub();
  
  // Initialize Lenis smooth scroll and GSAP ScrollTrigger synchronization
  useSmoothScroll();

  useEffect(() => {
    // Refresh ScrollTrigger on mount and resize
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(refreshTimer);
  }, []);

  return (
    <>
      {/* 3D Scroll-Driven Floating Cubes Background */}
      <ScrollCubes3D />

      {/* ✦ CIRCULAR ICON CURSOR — 8 coding icons orbit the mouse ✦ */}
      {!isMobile && <CircularIconCursor count={8} radius={52} speed={0.1} />}

      {/* Main Layout */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar activeSection={activeSection} />
        <main>
          <Hero github={github} />
          <About github={github} />
          <Skills github={github} />
          <Repos github={github} />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
