"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Mic } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";



// Images to cycle through in the background
const heroImages = [
  { src: "/images/harman-hero.png", label: "Public Speaker" },
  { src: "/images/harman-london.png", label: "Londoner" },
  { src: "/images/harman-restaurant.png", label: "Restaurateur" },
];

function CountUp({ end, suffix = "", delay = 0 }: { end: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * end));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Rotate background images
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
      }}
    >
      {/* ── LAYER 1: Background image carousel ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === activeImage ? 1 : 0,
              transition: "opacity 1.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              sizes="100vw"
              priority={i === 0}
              quality={90}
              style={{
                objectFit: "contain",
                objectPosition: "center top",
                transform: `scale(1.08) translate(${parallaxX * -0.3}px, ${(parallaxY * -0.3) + scrollY * -0.2}px)`,
                transition: "transform 0.1s linear",
                filter: "brightness(0.45) saturate(0.8)",
              }}
            />
          </div>
        ))}

        {/* Dark vignette layers */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.7) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
          background: "linear-gradient(to top, rgba(8,8,10,1) 0%, rgba(8,8,10,0.6) 50%, transparent 100%)",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "30%",
          background: "linear-gradient(to bottom, rgba(8,8,10,0.8) 0%, transparent 100%)",
          zIndex: 2,
        }} />
        {/* Side vignettes */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(8,8,10,0.6) 0%, transparent 30%, transparent 70%, rgba(8,8,10,0.6) 100%)",
          zIndex: 3,
        }} />
      </div>

      {/* ── LAYER 2: Gold particle system (Removed) ── */}

      {/* ── LAYER 3: Cinematic letterbox bars ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "80px",
          background: "rgba(8,8,10,0.9)",
          zIndex: 4,
          transformOrigin: "left",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "80px",
          background: "rgba(8,8,10,0.9)",
          zIndex: 4,
          transformOrigin: "right",
        }}
      />

      {/* ── LAYER 4: Left accent ── */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 3vw, 3rem)",
          top: "15%", bottom: "15%",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.8) 30%, rgba(212,175,55,0.8) 70%, transparent)",
          transformOrigin: "top",
          zIndex: 5,
        }}
      />

      {/* ── LAYER 5: Portrait spotlight — the CENTERPIECE ── */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          right: "clamp(2rem, 8vw, 12%)",
          bottom: "80px",
          top: "80px",
          width: "clamp(280px, 35vw, 520px)",
          zIndex: 5,
          display: "flex",
          alignItems: "flex-end",
        }}
        className="hero-portrait-col"
      >
        {/* Portrait container */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "90%",
          overflow: "hidden",
          borderRadius: "4px 4px 0 0",
        }}>
          {/* Mouse parallax portrait */}
          <div style={{
            position: "absolute",
            inset: "-5%",
            transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
            transition: "transform 0.15s ease-out",
          }}>
            <Image
              src="/images/harman_singh.png"
              alt="Harman Singh Kapoor"
              fill
              sizes="(max-width: 900px) 0px, (max-width: 1200px) 35vw, 520px"
              priority
              quality={95}
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                filter: "contrast(1.05) saturate(0.85)",
              }}
            />
          </div>

          {/* Portrait gradient overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(8,8,10,0.8) 0%, transparent 35%)",
            zIndex: 1,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(8,8,10,0.95) 0%, transparent 40%)",
            zIndex: 1,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(8,8,10,0.5) 0%, transparent 30%)",
            zIndex: 1,
          }} />

          {/* Scanning line animation */}
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            style={{
              position: "absolute",
              left: 0, right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
              zIndex: 2,
              filter: "blur(1px)",
            }}
          />
        </div>

        {/* Portrait label */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0.75rem 1rem",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <div style={{
            width: "6px", height: "6px",
            borderRadius: "50%",
            background: "#D4AF37",
            boxShadow: "0 0 10px #D4AF37",
          }}
            className="animate-pulse-gold"
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeImage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.8)",
              }}
            >
              {heroImages[activeImage].label}
            </motion.span>
          </AnimatePresence>
          <div style={{ flex: 1, height: "1px", background: "rgba(212,175,55,0.2)" }} />
        </div>

        {/* Gold vertical bar on portrait edge */}
        <div style={{
          position: "absolute",
          left: 0, top: "10%", bottom: 0,
          width: "2px",
          background: "linear-gradient(to bottom, transparent, #D4AF37 20%, #D4AF37 80%, transparent)",
          zIndex: 3,
        }} />
      </motion.div>

      {/* ── LAYER 6: Main Text Content ── */}
      <div style={{
        position: "relative",
        zIndex: 6,
        width: "100%",
        maxWidth: "1280px",
        padding: "0 clamp(1.5rem, 5vw, 5rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingRight: "clamp(2rem, 42vw, 640px)",
        marginTop: "80px",
      }}
        className="hero-content"
      >
        {/* Giant Headline — character by character reveal */}
        <div style={{ overflow: "hidden", padding: "0.08em 0 0.1em", marginBottom: "clamp(0.1rem, 0.5vh, 0.35rem)" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: 0,
              color: "#F0EDE6",
              marginBottom: "0.3rem",
            }}
          >
            Standing for
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden", padding: "0.08em 0 0.1em", marginBottom: "clamp(0.1rem, 0.5vh, 0.35rem)" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: 0,
              fontStyle: "italic",
              background: "linear-gradient(135deg, #C9A84C 0%, #F5E4A8 45%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.3rem",
            }}
          >
            Principles.
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden", padding: "0.08em 0 0.1em", marginBottom: "clamp(0.1rem, 0.5vh, 0.35rem)" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: 0,
              color: "#F0EDE6",
              marginBottom: "0.3rem",
            }}
          >
            Speaking for
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden", padding: "0.08em 0 0.1em", marginBottom: "clamp(0.6rem, 1.5vh, 1.2rem)" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.45, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: 0,
              fontStyle: "italic",
              background: "linear-gradient(135deg, #C9A84C 0%, #F5E4A8 45%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Freedom.
          </motion.h1>
        </div>

        {/* Scramble subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",
            fontWeight: 300,
            color: "rgba(240,237,230,0.6)",
            lineHeight: 1.8,
            maxWidth: "480px",
            marginBottom: "clamp(1rem, 2.5vh, 1.8rem)",
            letterSpacing: "0.01em",
          }}
        >
          An entrepreneur&apos;s journey through challenges, resilience, and a commitment to fairness and democratic values in modern Britain.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          style={{
            display: "flex",
            gap: "0.875rem",
            flexWrap: "wrap",
            marginBottom: "clamp(1.2rem, 3vh, 2rem)",
          }}
        >
          {/* Primary CTA */}
          <button
            id="hero-watch-journey"
            onClick={() => document.querySelector("#journey")?.scrollIntoView({ behavior: "smooth" })}
            data-magnetic
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.95rem 1.75rem",
              background: "linear-gradient(135deg, #C9A84C 0%, #D4AF37 50%, #E8C96A 100%)",
              border: "none",
              borderRadius: "3px",
              color: "#08080A",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Play size={13} fill="#08080A" />
            Watch My Journey
          </button>

          <button
            id="hero-speeches"
            onClick={() => document.querySelector("#speeches")?.scrollIntoView({ behavior: "smooth" })}
            data-magnetic
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.95rem 1.75rem",
              background: "transparent",
              border: "1px solid rgba(212,175,55,0.4)",
              borderRadius: "3px",
              color: "rgba(232,201,106,0.9)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "none",
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,175,55,0.1)";
              e.currentTarget.style.borderColor = "#D4AF37";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,175,55,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Mic size={13} />
            Latest Speeches
          </button>
        </motion.div>

        {/* Stats with count-up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          style={{
            display: "flex",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { end: 20, suffix: "+", label: "Years in Business" },
            { end: 50, suffix: "+", label: "Public Speeches" },
            { end: 100, suffix: "K+", label: "Meals Served" },
          ].map(({ end, suffix, label }, i) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                background: "linear-gradient(135deg, #C9A84C, #F5E4A8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}>
                <CountUp end={end} suffix={suffix} delay={2600 + i * 200} />
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(240,237,230,0.35)",
                marginTop: "0.3rem",
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── LAYER 7: Image dots nav ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: "absolute",
          right: "clamp(1rem, 2vw, 2rem)",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          zIndex: 7,
        }}
        className="hero-dots"
      >
        {heroImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            style={{
              width: i === activeImage ? "2px" : "2px",
              height: i === activeImage ? "32px" : "12px",
              background: i === activeImage ? "#D4AF37" : "rgba(212,175,55,0.3)",
              border: "none",
              borderRadius: "1px",
              cursor: "none",
              transition: "all 0.4s ease",
              padding: 0,
            }}
            aria-label={`View ${img.label}`}
          />
        ))}
      </motion.div>

      {/* ── LAYER 8: Bottom scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "100px",
          left: "clamp(1.5rem, 3vw, 3rem)",
          zIndex: 7,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ cursor: "none" }}
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown size={18} color="rgba(212,175,55,0.6)" />
        </motion.div>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.4)",
          writingMode: "vertical-lr",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}>
          Scroll to discover
        </span>
      </motion.div>

      {/* ── LAYER 9: Bottom-left time display ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "100px",
          right: "clamp(1.5rem, 3vw, 3rem)",
          zIndex: 7,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
        className="hero-location"
      >
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.4)",
        }}>
          London, United Kingdom
        </div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "0.75rem",
          color: "rgba(240,237,230,0.25)",
          fontStyle: "italic",
        }}>
          Est. 2000 · Serving the Community
        </div>
      </motion.div>


    </section>
  );
}
