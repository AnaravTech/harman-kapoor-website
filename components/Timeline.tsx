"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    num: "01",
    year: "Early 2000s",
    era: "Arrival",
    title: "Arriving\nWith a Dream",
    quote: "Some people arrive in a country. Others arrive with a mission.",
    body: "Harman Singh Kapoor crossed continents carrying nothing but ambition, values, and an unshakeable belief that Britain was a land of genuine opportunity. Those early years were defined not by comfort, but by conviction.",
    accentColor: "#C9A84C",
    image: "/images/journey-london.png",
    portrait: "/images/harman-london.png",
    stat: { value: "1", label: "City. One Dream." },
    align: "right" as const,
  },
  {
    num: "02",
    year: "2005–2010",
    era: "First Steps",
    title: "Building\na Foundation",
    quote: "Every great building begins with a single brick placed in faith.",
    body: "Through relentless effort and a deep understanding of two cultures, Harman established himself in London's hospitality industry. Every late night, every difficult decision was an investment — not just in a business, but in a community.",
    accentColor: "#D4AF37",
    image: "/images/journey-restaurant.png",
    portrait: "/images/harman-restaurant.png",
    stat: { value: "5+", label: "Years of Groundwork" },
    align: "left" as const,
  },
  {
    num: "03",
    year: "2012",
    era: "Legacy",
    title: "The Birth\nof Rangrez",
    quote: "Rangrez means 'dyer of colours.' We gave London a new colour.",
    body: "Rangrez opened its doors as a celebration of India's culinary heritage reimagined for a British audience. It quickly became not just a restaurant, but a community institution — a place where cultures met, conversations happened, and memories were made.",
    accentColor: "#E8C96A",
    image: "/images/journey-restaurant.png",
    portrait: "/images/harman-hero.png",
    stat: { value: "10K+", label: "Guests Served" },
    align: "right" as const,
  },
  {
    num: "04",
    year: "2015–2019",
    era: "Growth",
    title: "Expanding\nthe Voice",
    quote: "A business is not just walls and a menu. It is a presence in a community.",
    body: "As Rangrez flourished, Harman became more than a restaurateur. He became a connector — organising events, championing local causes, and demonstrating that entrepreneurial success and social responsibility are not opposites; they are partners.",
    accentColor: "#D4AF37",
    image: "/images/journey-london.png",
    portrait: "/images/harman-speech.png",
    stat: { value: "20+", label: "Community Events" },
    align: "left" as const,
  },
  {
    num: "05",
    year: "2020–2022",
    era: "Storm",
    title: "Navigating\nthe Storm",
    quote: "Character is not revealed in comfort. It is revealed in crisis.",
    body: "Like every entrepreneur of courage, Harman faced his darkest chapters — business pressures, public controversies, personal struggles. Rather than retreating into silence, he chose something far harder: transparency, dignity, and the continued assertion of his rights under British law.",
    accentColor: "#A07830",
    image: "/images/journey-london.png",
    portrait: "/images/harman-closeup.png",
    stat: { value: "0", label: "Days of Silence" },
    align: "right" as const,
  },
  {
    num: "06",
    year: "2023",
    era: "Voice",
    title: "Speaking\nPublicly",
    quote: "My voice is not a weapon. It is a right — and I will use it.",
    body: "Harman stepped into the public arena, delivering addresses about entrepreneurship, freedom of expression, and democratic values. His speeches resonated because they were not political performance — they were personal testimony.",
    accentColor: "#D4AF37",
    image: "/images/journey-london.png",
    portrait: "/images/harman-speech.png",
    stat: { value: "50+", label: "Public Speeches" },
    align: "left" as const,
  },
  {
    num: "07",
    year: "2024–Present",
    era: "Future",
    title: "The Journey\nContinues",
    quote: "The story is not finished. The best chapters are still being written.",
    body: "Today, Harman Singh Kapoor stands at the intersection of business, civic life, and public discourse — committed to the belief that democratic engagement is not optional for those who care about justice. His journey is an invitation for others to find their own voice.",
    accentColor: "#E8C96A",
    image: "/images/harman-hero.png",
    portrait: "/images/harman-hero.png",
    stat: { value: "∞", label: "Chapters Ahead" },
    align: "right" as const,
  },
];

// Individual chapter — each one is a full-bleed cinematic card
function Chapter({ chapter }: { chapter: typeof chapters[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const isRight = chapter.align === "right";

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
      }}
    >
      {/* ── Parallax BG image ── */}
      <motion.div
        style={{ position: "absolute", inset: "-10%", y: bgY, zIndex: 0 }}
      >
        <Image
          src={chapter.image}
          alt=""
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.18) saturate(0.5)",
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: isRight
          ? "linear-gradient(to right, rgba(8,8,10,0.97) 45%, rgba(8,8,10,0.4) 100%)"
          : "linear-gradient(to left, rgba(8,8,10,0.97) 45%, rgba(8,8,10,0.4) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(8,8,10,0.5) 0%, transparent 20%, transparent 80%, rgba(8,8,10,0.8) 100%)",
      }} />

      {/* Chapter number — giant watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1 }}
        style={{
          position: "absolute",
          [isRight ? "right" : "left"]: "-2rem",
          bottom: "-3rem",
          zIndex: 2,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(10rem, 22vw, 20rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `1px rgba(212,175,55,0.08)`,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {chapter.num}
      </motion.div>

      {/* ── Main content grid ── */}
      <div className="container-site" style={{ position: "relative", zIndex: 3, width: "100%", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isRight ? "1fr 420px" : "420px 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
          className="chapter-grid"
        >
          {/* Text block */}
          <div style={{ order: isRight ? 1 : 2 }}>
            {/* Chapter meta */}
            <motion.div
              initial={{ opacity: 0, x: isRight ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: chapter.accentColor,
                opacity: 0.8,
              }}>
                Chapter {chapter.num}
              </div>
              <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${chapter.accentColor}40, transparent)` }} />
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: chapter.accentColor,
              }}>
                {chapter.year}
              </div>
            </motion.div>

            {/* Title — clip reveal */}
            <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
              <motion.h2
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#F0EDE6",
                  whiteSpace: "pre-line",
                }}
              >
                {chapter.title}
              </motion.h2>
            </div>

            {/* Quote — slide in */}
            <motion.div
              initial={{ opacity: 0, x: isRight ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{
                borderLeft: `3px solid ${chapter.accentColor}`,
                paddingLeft: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                fontStyle: "italic",
                color: chapter.accentColor,
                lineHeight: 1.65,
              }}>
                &ldquo;{chapter.quote}&rdquo;
              </p>
            </motion.div>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                color: "rgba(240,237,230,0.6)",
                lineHeight: 1.9,
                maxWidth: "520px",
                marginBottom: "2.5rem",
              }}
            >
              {chapter.body}
            </motion.p>

            {/* Stat callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.85, type: "spring", stiffness: 120 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.25rem 1.75rem",
                background: `linear-gradient(135deg, ${chapter.accentColor}12, ${chapter.accentColor}06)`,
                border: `1px solid ${chapter.accentColor}30`,
                borderRadius: "12px",
              }}
            >
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  background: `linear-gradient(135deg, ${chapter.accentColor}, #F5E4A8)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {chapter.stat.value}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,230,0.4)",
                  marginTop: "0.25rem",
                }}>
                  {chapter.stat.label}
                </div>
              </div>
              <div style={{ width: "1px", height: "3rem", background: `${chapter.accentColor}30` }} />
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: `${chapter.accentColor}80`,
              }}>
                {chapter.era}
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: isRight ? 40 : -40 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "relative",
              order: isRight ? 2 : 1,
            }}
          >
            {/* Portrait frame */}
            <div style={{
              position: "absolute",
              top: "-1rem", [isRight ? "left" : "right"]: "-1rem",
              bottom: "1rem", [isRight ? "right" : "left"]: "1rem",
              border: `1px solid ${chapter.accentColor}20`,
              borderRadius: "4px",
              zIndex: 0,
            }} />

            <motion.div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "4px",
                overflow: "hidden",
                y: portraitY,
              }}
            >
              <Image
                src={chapter.portrait}
                alt={`Harman Singh Kapoor — ${chapter.era}`}
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "contrast(1.05) saturate(0.9)",
                }}
              />
              {/* Portrait overlays */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, rgba(8,8,10,0.8) 0%, transparent 50%)`,
              }} />

              {/* Chapter era badge */}
              <div style={{
                position: "absolute",
                top: "1.25rem",
                [isRight ? "left" : "right"]: "1.25rem",
                padding: "0.4rem 0.85rem",
                background: "rgba(8,8,10,0.8)",
                border: `1px solid ${chapter.accentColor}40`,
                borderRadius: "4px",
                backdropFilter: "blur(8px)",
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: chapter.accentColor,
                }}>
                  {chapter.year}
                </span>
              </div>

              {/* Scanning line */}
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                style={{
                  position: "absolute",
                  left: 0, right: 0,
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${chapter.accentColor}60, transparent)`,
                  filter: "blur(1px)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Progress indicator — right edge */}
      <div style={{
        position: "absolute",
        right: "1.5rem",
        bottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        zIndex: 4,
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2rem",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: `1px ${chapter.accentColor}40`,
          lineHeight: 1,
        }}>
          {chapter.num}
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: `${chapter.accentColor}40`,
        }}>
          / 07
        </span>
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const [activeChapter, setActiveChapter] = useState(0);

  // Track which chapter is in view via scroll position
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.scrollHeight - window.innerHeight;
      const progress = Math.max(0, -rect.top) / sectionH;
      setActiveChapter(Math.min(chapters.length - 1, Math.floor(progress * chapters.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section id="journey" ref={sectionRef} style={{ position: "relative", background: "var(--black)" }}>

      {/* ── Sticky chapter progress rail (left edge) ── */}
      <div style={{
        position: "sticky",
        top: 0,
        height: 0,
        zIndex: 20,
        overflow: "visible",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          left: "clamp(0.5rem, 1.5vw, 2rem)",
          top: "50vh",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
          className="chapter-rail"
        >
          {/* Rail line */}
          <div style={{
            position: "absolute",
            top: 0, bottom: 0,
            width: "1px",
            background: "rgba(212,175,55,0.12)",
          }} />
          {/* Active fill */}
          <motion.div style={{
            position: "absolute",
            top: 0,
            width: "1px",
            background: "linear-gradient(to bottom, #C9A84C, #D4AF37)",
            height: progressHeight,
            boxShadow: "0 0 8px rgba(212,175,55,0.5)",
          }} />
          {/* Chapter dots */}
          {chapters.map((ch, i) => (
            <div
              key={i}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: i === activeChapter ? "#D4AF37" : "rgba(212,175,55,0.2)",
                border: i === activeChapter ? "2px solid #D4AF37" : "2px solid transparent",
                boxShadow: i === activeChapter ? "0 0 12px rgba(212,175,55,0.8)" : "none",
                transition: "all 0.4s ease",
                position: "relative",
                zIndex: 1,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── CINEMATIC SECTION HEADER ── */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          minHeight: "55vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
        }}
      >
    
        {/* Header BG
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/harman-closeup.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.12) saturate(0.4)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, rgba(8,8,10,0.98) 70%)",
          }} />
        </div> */}

        {/* Giant watermark text */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(8rem, 20vw, 18rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(212,175,55,0.05)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}>
          JOURNEY
        </div>

        {/* Header content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 2rem" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}
          >
            <div style={{ width: "3rem", height: "1px", background: "rgba(212,175,55,0.6)" ,marginTop:"70px"}} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.8)",
              marginTop:"70px"
            }}>
              My Story · Seven Chapters
            </span>
            <div style={{ width: "3rem", height: "1px", background: "rgba(212,175,55,0.6)" ,marginTop:"70px"}} />
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: "#F0EDE6",
                marginBottom: "0.2rem",
              }}
            >
              A Life Written in
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #C9A84C 0%, #F5E4A8 45%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Courage &amp; Colour.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.875rem, 1.3vw, 1.05rem)",
              color: "rgba(240,237,230,0.5)",
              maxWidth: "520px",
              margin: "1.5rem auto 2.5rem",
              lineHeight: 1.85,
            }}
          >
            Every headline has a history. Every controversy has a context. Scroll to experience the unabridged journey — chapter by chapter.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.4)",
            }}>
              Scroll to read
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{
                width: "1px",
                height: "3rem",
                background: "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)",
              }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── CHAPTER PANELS ── */}
      {chapters.map((chapter, i) => (
        <Chapter key={i} chapter={chapter} />
      ))}

      {/* ── CLOSING STATEMENT ── */}
      <div style={{
        position: "relative",
        padding: "6rem 0",
        background: "var(--dark-1)",
        borderTop: "1px solid rgba(212,175,55,0.1)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container-site" style={{ textAlign: "center", position: "relative" }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
            fontStyle: "italic",
            color: "rgba(240,237,230,0.7)",
            maxWidth: "680px",
            margin: "0 auto 1.5rem",
            lineHeight: 1.7,
          }}>
            &ldquo;The most important chapter in any story is the one the world tried to prevent you from writing.&rdquo;
          </p>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A84C",
          }}>
            — Harman Singh Kapoor
          </div>
          <div style={{
            width: "3rem",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            margin: "2rem auto 0",
          }} />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .chapter-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .chapter-rail {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
