"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import FreedomFairness from "@/components/FreedomFairness";
import Speeches from "@/components/Speeches";
import MediaPress from "@/components/MediaPress";
import LegalJourney from "@/components/LegalJourney";
import Support from "@/components/Support";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Dynamically import preloader — client only, no SSR
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  useEffect(() => {
    // Show preloader only once per browser session
    const seen = sessionStorage.getItem("hsk-preloader-seen");
    if (seen) {
      const timer = setTimeout(() => {
        setShowPreloader(false);
        setSiteVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      sessionStorage.setItem("hsk-preloader-seen", "1");
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setSiteVisible(true);
  };

  return (
    <>
      {/* Preloader — shown on first visit */}
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Main site — fades in after preloader exits */}
      <main
        style={{
          opacity: siteVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        <Navigation />
        <Hero />
        <Marquee />
        <About />
        <Timeline />
        <FreedomFairness />
        <Speeches />
        <MediaPress />
        <LegalJourney />
        <Support />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
