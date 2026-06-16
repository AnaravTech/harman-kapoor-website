"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { legalEvents } from "@/data/press";
import { Briefcase, Users, Scale, ArrowRight } from "lucide-react";

const typeConfig = {
  business: { icon: Briefcase, color: "#8B6914", label: "Business" },
  public: { icon: Users, color: "#4A7A8A", label: "Public" },
  legal: { icon: Scale, color: "#6A5ACD", label: "Legal" },
  future: { icon: ArrowRight, color: "#2E7D32", label: "Future" },
};

export default function LegalJourney() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="legal"
      style={{
        background: "var(--dark-1)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "400px",
        height: "400px",
        background: "radial-gradient(ellipse at top right, rgba(212,175,55,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-site" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <span className="label-overline">Events That Shaped My Journey</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6" }}>
            The{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Legal Journey</em>
          </h2>
        </motion.div>

        {/* Important disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            maxWidth: "680px",
            margin: "0 auto 4rem",
            padding: "1.25rem 1.75rem",
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderLeft: "3px solid rgba(212,175,55,0.5)",
            borderRadius: "0 12px 12px 0",
            textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(240,237,230,0.55)",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}>
            This section presents a factual account of events in neutral, objective language. No accusations are made. All individuals and institutions are referred to with full respect for the legal process and the presumption of innocence.
          </p>
        </motion.div>

        {/* Horizontal scroll timeline */}
        <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
          <div style={{
            display: "flex",
            gap: "0",
            minWidth: "fit-content",
            position: "relative",
            padding: "3rem 2rem",
          }}>
            {/* Connecting line */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "2rem",
              right: "2rem",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4) 10%, rgba(212,175,55,0.4) 90%, transparent)",
              transform: "translateY(-50%)",
            }} />

            {legalEvents.map((event, i) => {
              const config = typeConfig[event.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.25rem",
                    minWidth: "240px",
                    maxWidth: "260px",
                    position: "relative",
                  }}
                >
                  {/* Year above */}
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#D4AF37",
                  }}>
                    {event.year}
                  </div>

                  {/* Center dot */}
                  <div style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: config.color,
                    border: "3px solid var(--dark-1)",
                    boxShadow: `0 0 0 3px ${config.color}60, 0 0 20px ${config.color}40`,
                    flexShrink: 0,
                    zIndex: 1,
                    position: "relative",
                  }} />

                  {/* Card below */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "14px",
                    padding: "1.5rem",
                    width: "100%",
                    transition: "all 0.3s ease",
                  }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(212,175,55,0.3)";
                      el.style.background = "rgba(212,175,55,0.04)";
                      el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(212,175,55,0.1)";
                      el.style.background = "rgba(255,255,255,0.03)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.75rem",
                    }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: `${config.color}20`,
                        border: `1px solid ${config.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={14} color={config.color} strokeWidth={1.5} />
                      </div>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: config.color,
                      }}>
                        {config.label}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#F0EDE6",
                      marginBottom: "0.625rem",
                      lineHeight: 1.35,
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240,237,230,0.55)",
                      lineHeight: 1.8,
                    }}>
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            fontStyle: "italic",
            color: "rgba(240,237,230,0.6)",
            maxWidth: "580px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            &ldquo;I believe in the British legal system. I trust in due process. And I will continue to engage with it transparently, as every citizen has both the right and the responsibility to do.&rdquo;
          </p>
          <div style={{
            marginTop: "1rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#C9A84C",
          }}>
            — Harman Singh Kapoor
          </div>
        </motion.div>
      </div>
    </section>
  );
}
