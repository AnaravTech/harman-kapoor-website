"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scale, Shield, Building2, Users, Vote } from "lucide-react";

const pillars = [
  {
    icon: Scale,
    title: "Freedom of Expression",
    body: "Every citizen has the right — and often the responsibility — to speak their truth within the framework of law. Silence in the face of injustice is not peace; it is complicity.",
  },
  {
    icon: Shield,
    title: "Equal Treatment Under Law",
    body: "The rule of law means nothing if it is not applied equally. Justice must not bend to power, prejudice, or politics. Every person deserves the same legal protections.",
  },
  {
    icon: Building2,
    title: "Protection of Businesses",
    body: "Small businesses are the backbone of Britain. Entrepreneurs who build, employ, and serve their communities deserve fair legal and regulatory protection — not abandonment in their hour of need.",
  },
  {
    icon: Users,
    title: "Community Harmony",
    body: "Britain's greatest strength is its diversity. Community harmony is not built through silence — it is built through honest, respectful dialogue across every boundary of culture and belief.",
  },
  {
    icon: Vote,
    title: "Democratic Values",
    body: "Democracy is not a spectator sport. Every citizen who engages, questions, votes, and speaks is an active guardian of the freedoms that generations before us fought to secure.",
  },
];

export default function FreedomFairness() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="values"
      style={{
        background: "var(--dark-2)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial gold glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "600px",
        background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-site" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <span className="label-overline">Principles</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6", maxWidth: "700px", margin: "0 auto 1.5rem" }}>
            Freedom, Fairness &{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Rule of Law</em>
          </h2>
        </motion.div>

        {/* Central statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto 5rem",
            padding: "2.5rem 3rem",
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: "16px",
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute",
            top: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }} />
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontStyle: "italic",
            color: "#F0EDE6",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}>
            &ldquo;My belief is simple: every citizen deserves equal protection, fair treatment, and the right to express their views within the law. These are not radical ideas — they are the foundations of British democracy.&rdquo;
          </p>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A84C",
          }}>
            — Harman Singh Kapoor
          </span>
        </motion.div>

        {/* Pillars Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(212,175,55,0.1)",
                  borderRadius: "16px",
                  padding: "2rem",
                  transition: "all 0.35s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(212,175,55,0.4)";
                  el.style.background = "rgba(212,175,55,0.05)";
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(212,175,55,0.1)";
                  el.style.background = "rgba(255,255,255,0.025)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Corner accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60px",
                  height: "60px",
                  background: "radial-gradient(circle at top right, rgba(212,175,55,0.08), transparent 70%)",
                }} />

                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}>
                  <Icon size={22} color="#D4AF37" strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#F0EDE6",
                  marginBottom: "0.875rem",
                  lineHeight: 1.3,
                }}>
                  {pillar.title}
                </h3>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(240,237,230,0.6)",
                  lineHeight: 1.85,
                }}>
                  {pillar.body}
                </p>

                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
