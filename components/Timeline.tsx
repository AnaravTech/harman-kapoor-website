"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Sprout, 
  Building2, 
  Mic, 
  Users, 
  Shield, 
  Utensils, 
  Compass,
  ArrowRight
} from "lucide-react";

// Seven chapters with matching mockup contents
const chapters = [
  {
    id: "chapter-01",
    num: "01",
    year: "2000",
    title: "ROOTS & VALUES",
    body: "The early years that shaped my foundation.",
    image: "/images/journey-london.png",
    icon: Sprout,
  },
  {
    id: "chapter-02",
    num: "02",
    year: "2005",
    title: "BUILDING A VISION",
    body: "Entrepreneurial beginnings and bold decisions.",
    image: "/images/journey-restaurant.png",
    icon: Building2,
  },
  {
    id: "chapter-03",
    num: "03",
    year: "2010",
    title: "RAISING MY VOICE",
    body: "Speaking up for fairness, freedom and values that matter.",
    image: "/images/harman-speech.png",
    icon: Mic,
  },
  {
    id: "chapter-04",
    num: "04",
    year: "2015",
    title: "SERVING COMMUNITY",
    body: "Giving back and standing with those in need.",
    image: "/images/gallery-community.png",
    icon: Users,
  },
  {
    id: "chapter-05",
    num: "05",
    year: "2015",
    title: "CHALLENGES & CONTROVERSIES",
    body: "The moments tested. The truth that endured.",
    image: "/images/harman-closeup.png",
    icon: Shield,
  },
  {
    id: "chapter-06",
    num: "06",
    year: "2020",
    title: "HOSPITALITY WITH PURPOSE",
    body: "Food, culture and experiences that bring people together.",
    image: "/images/harman-restaurant.png",
    icon: Utensils,
  },
  {
    id: "chapter-07",
    num: "07",
    year: "TODAY",
    title: "THE ROAD AHEAD",
    body: "Continuing the journey. Creating a better tomorrow.",
    image: "/images/harman-hero.png",
    icon: Compass,
  },
];

/* ────────────────────────────────────────────────────────
   Sub-component: Ambient Floating Gold Particles
──────────────────────────────────────────────────────── */
function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; r: number; speedY: number; speedX: number; opacity: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.4,
        speedY: -(Math.random() * 0.15 + 0.05),
        speedX: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    let rafId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
      });
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: "absolute", 
        inset: 0, 
        pointerEvents: "none", 
        zIndex: 1,
        opacity: 0.75
      }} 
    />
  );
}

/* ────────────────────────────────────────────────────────
   Sub-component: Handwritten Manuscript Overlay
──────────────────────────────────────────────────────── */
function HandwrittenTexture() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      opacity: 0.015,
      pointerEvents: "none",
      zIndex: 1,
      fontFamily: "'Playfair Display', Georgia, serif",
      fontStyle: "italic",
      color: "#D4AF37",
      fontSize: "2.2rem",
      lineHeight: 2.0,
      padding: "6rem",
      overflow: "hidden",
      userSelect: "none"
    }}>
    </div>
  );
}

export default function Timeline() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <section 
      id="journey" 
      style={{ 
        background: "#08080A", 
        position: "relative",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      {/* ── UNIFIED BACKGROUND ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Single Full Background */}
        <Image
          src="/images/harman-restaurant.png"
          alt="Harman Singh Kapoor at Singh's Dining"
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.35) saturate(0.8)",
          }}
        />
        {/* Gradients to darken edges and bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(8,8,10,0.95) 0%, rgba(8,8,10,0.5) 40%, transparent 80%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,10,0.85) 75%, rgba(8,8,10,1) 100%)",
        }} />
      </div>

      <BackgroundParticles />
      <HandwrittenTexture />

      {/* ── SECTION 1: HERO STORY INTRO ── */}
      <div 
        style={{
          position: "relative",
          zIndex: 5,
          paddingTop: "clamp(3rem, 10vh, 15vh)",
          paddingBottom: "clamp(0.5rem, 1vh, 2vh)",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div className="container-site" style={{ width: "100%" }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ maxWidth: "550px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
              <div style={{ width: "30px", height: "1px", background: "#D4AF37" }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}>
                MY STORY • SEVEN CHAPTERS
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.00,
              color: "#F0EDE6",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em"
            }}>
              A Life <br/>
              Written in <br/>
              <span style={{ color: "#D4AF37", fontStyle: "italic", fontWeight: 700 }}>
                Courage &amp; Colour.
              </span>
            </h1>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 300,
              color: "rgba(240,237,230,0.7)",
              lineHeight: 1.7,
              maxWidth: "450px"
            }}>
              Every headline has a history. Every controversy has a context. <br/>
              Scroll to experience the unabridged journey — chapter by chapter.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 2 & 3: TIMELINE & CARDS ── */}
      <div className="container-site" style={{ position: "relative", zIndex: 5, paddingBottom: "clamp(0.5rem, 1vh, 2rem)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          
          <div className="timeline-cards-container">
            {/* Continuous Background Timeline Line */}
            <div style={{
              position: "absolute",
              top: "calc(2rem + 4px)", // 2rem padding + 4px to center in 10px dot
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(212,175,55,0.25)",
              zIndex: 0
            }} />
            
            {/* Arrow at end of line */}
            <div style={{
              position: "absolute",
              top: "calc(2rem - 2px)",
              right: "-5px",
              color: "rgba(212,175,55,0.5)"
            }}>
               <ArrowRight size={14} />
            </div>

            {chapters.map((ch, idx) => (
              <div key={ch.num} style={{ flex: "1 1 0", minWidth: 0, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                
                {/* Timeline Node & Year */}
                <div style={{ height: "4.5rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                  {/* Dot */}
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#D4AF37",
                    boxShadow: "0 0 10px rgba(212,175,55,0.6)",
                  }} />
                  {/* Year */}
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#C9A84C",
                    marginTop: "1.2rem",
                    letterSpacing: "0.05em"
                  }}>
                    {ch.year}
                  </span>
                </div>

                {/* The Card */}
                <ChapterCard chapter={ch} onInView={(id) => setActiveSection(id)} />
              </div>
            ))}
          </div>

        {/* Scroll to Read Indicator
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(201,168,76,0.6)",
            textTransform: "uppercase"
          }}>
            SCROLL TO READ
          </span>
          <div style={{ width: "1px", height: "20px", background: "rgba(201,168,76,0.3)", margin: "0.5rem auto 0" }} />
        </div> */}
      </div>


    </section>
  );
}

/* ────────────────────────────────────────────────────────
   Sub-component: Glassmorphic Chapter Card
──────────────────────────────────────────────────────── */
interface ChapterCardProps {
  chapter: typeof chapters[0];
  onInView: (id: string) => void;
}

function ChapterCard({ chapter, onInView }: ChapterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { margin: "-25% 0px -25% 0px" });
  const Icon = chapter.icon;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      onInView(chapter.id);
    }
  }, [inView, chapter.id, onInView]);

  return (
    <motion.div
      ref={cardRef}
      id={chapter.id}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        width: "100%",
        height: "clamp(250px, 35vh, 320px)",
        borderRadius: "4px",
        border: `1px solid ${isHovered ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212,175,55,0.15)'}`,
        background: "linear-gradient(to bottom, rgba(13,13,15,0.8), rgba(8,8,10,0.95))",
        padding: "clamp(1rem, 2vh, 1.5rem) clamp(0.75rem, 1vw, 1.25rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
      }}
    >
      {/* Background Image Overlay */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${chapter.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 0.15 : 0.08,
          mixBlendMode: "luminosity",
          zIndex: 0,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: "opacity 0.4s ease, transform 0.6s ease",
        }} 
      />

      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Chapter Number Badge */}
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.25rem",
          fontWeight: 400,
          color: "#D4AF37",
          lineHeight: 1,
          marginBottom: "1.25rem",
        }}>
          {chapter.num}
        </span>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "#F0EDE6",
          marginBottom: "0.75rem",
          lineHeight: 1.3
        }}>
          {chapter.title}
        </h3>

        {/* Description Body */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
          color: "rgba(240,237,230,0.6)",
          lineHeight: 1.5,
          fontWeight: 300,
        }}>
          {chapter.body}
        </p>
      </div>

      {/* Gold Icon */}
      <div style={{ position: "relative", zIndex: 2, marginTop: "auto", paddingTop: "1rem" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D4AF37",
          background: "rgba(8,8,10,0.8)",
        }}>
          <Icon size={16} />
        </div>
      </div>
    </motion.div>
  );
}
