"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" style={{ background: "var(--dark-1)", padding: "7rem 0 6rem" }}>
      <div className="container-site" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span className="label-overline">About Harman</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6", maxWidth: "640px", margin: "0 auto" }}>
            Behind Every Headline Is a{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Human Story</em>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
          className="grid-cols-about"
        >
          {/* Portrait */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "absolute",
              top: "-1rem",
              left: "-1rem",
              right: "-1rem",
              bottom: "-1rem",
              border: "1px solid rgba(212,175,55,0.25)",
              borderRadius: "16px",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "3/4",
              zIndex: 1,
            }}>
              <Image
                src="/images/about-harman.png"
                alt="Harman Singh Kapoor — UK Entrepreneur & Public Speaker"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                quality={90}
              />
              {/* Cinematic colour grade overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,10,0.4) 100%)",
                mixBlendMode: "multiply",
              }} />
            </div>

            {/* Gold badge */}
            <div style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-1rem",
              background: "linear-gradient(135deg, #C9A84C, #D4AF37)",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              zIndex: 2,
              boxShadow: "0 8px 32px rgba(212,175,55,0.4)",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#08080A",
                lineHeight: 1,
              }}>20+</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(8,8,10,0.7)",
                marginTop: "0.25rem",
              }}>Years Building</div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="label-overline" style={{ marginBottom: "1.25rem", display: "block" }}>
              Entrepreneur · Restaurateur · Public Voice
            </span>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              color: "#F0EDE6",
              marginBottom: "1.5rem",
              lineHeight: 1.3,
            }}>
              Harman Singh Kapoor is not just a businessman.
            </h3>

            <p style={{ color: "rgba(240,237,230,0.7)", marginBottom: "1.25rem", lineHeight: 1.9 }}>
              He is a story — of ambition carried across continents, of years spent building a restaurant that became a community institution, and of a person who chose to stand and speak when silence would have been easier.
            </p>

            <p style={{ color: "rgba(240,237,230,0.7)", marginBottom: "1.25rem", lineHeight: 1.9 }}>
              As the founder of <strong style={{ color: "#D4AF37" }}>Rangrez</strong> — one of London&apos;s celebrated Indian-British fusion restaurants — Harman spent two decades serving his community, creating employment, and contributing to the cultural fabric of the city he calls home.
            </p>

            <p style={{ color: "rgba(240,237,230,0.7)", marginBottom: "2rem", lineHeight: 1.9 }}>
              When life presented its harshest chapters, he emerged not with silence but with a voice — one calling for fairness, the protection of democratic rights, and the belief that every person deserves to be heard with dignity.
            </p>

            {/* Quote block */}
            <div className="quote-block">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.125rem",
                fontStyle: "italic",
                color: "#F0EDE6",
                lineHeight: 1.7,
              }}>
                I did not choose controversy. But I chose not to be silenced by it. My story belongs to every person who has ever been told their voice doesn&apos;t matter.
              </p>
              <div style={{
                marginTop: "1rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}>
                — Harman Singh Kapoor
              </div>
            </div>

            {/* Key attributes */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "2.5rem",
            }}>
              {[
                { icon: "🏛️", text: "Constitutional Advocate" },
                { icon: "🍽️", text: "Rangrez Founder" },
                { icon: "🎤", text: "Public Speaker" },
                { icon: "🇬🇧", text: "British Entrepreneur" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{icon}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "rgba(240,237,230,0.7)",
                  }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
