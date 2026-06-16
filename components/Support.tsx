"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

const upcomingEvents = [
  {
    date: "July 2024",
    title: "London Business Forum",
    location: "Canary Wharf, London",
    type: "Panel",
  },
  {
    date: "August 2024",
    title: "Community Dialogue Evening",
    location: "East London",
    type: "Community",
  },
  {
    date: "September 2024",
    title: "Entrepreneurship & Law Seminar",
    location: "Manchester",
    type: "Speaking",
  },
];

export default function Support() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="support"
      style={{
        background: "var(--dark-3)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold radial glow */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        background: "radial-gradient(ellipse at bottom, rgba(212,175,55,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-site" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="label-overline">Community</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6" }}>
            Join the{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Conversation</em>
          </h2>
          <p style={{
            color: "rgba(240,237,230,0.55)",
            maxWidth: "540px",
            margin: "1.25rem auto 0",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}>
            Democracy lives in conversation. Subscribe for updates, join public meetings, and be part of the dialogue about freedom, fairness, and community.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
          className="support-grid"
        >
          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: "20px",
              padding: "2.5rem",
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}>
              <Mail size={22} color="#D4AF37" strokeWidth={1.5} />
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.35rem",
              fontWeight: 600,
              color: "#F0EDE6",
              marginBottom: "0.75rem",
            }}>
              Stay Informed
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(240,237,230,0.55)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              Receive updates on speeches, press appearances, upcoming events, and Harman&apos;s latest reflections on entrepreneurship and public life.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1.25rem",
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "12px",
                }}
              >
                <CheckCircle size={20} color="#D4AF37" />
                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#D4AF37",
                    marginBottom: "0.2rem",
                  }}>
                    Thank you, {name}!
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(240,237,230,0.55)",
                  }}>
                    You&apos;re now part of the conversation.
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  id="newsletter-name"
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-gold"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-gold"
                />
                <button
                  id="newsletter-submit"
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.9rem",
                    background: "linear-gradient(135deg, #C9A84C, #D4AF37)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#08080A",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,175,55,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Send size={14} />
                  Subscribe to Updates
                </button>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(240,237,230,0.3)",
                  textAlign: "center",
                }}>
                  No spam. Unsubscribe at any time. Your privacy is respected.
                </p>
              </form>
            )}
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.35rem",
              fontWeight: 600,
              color: "#F0EDE6",
              marginBottom: "0.5rem",
            }}>
              Upcoming Events
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(240,237,230,0.45)",
              marginBottom: "2rem",
            }}>
              Public meetings and community appearances
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {upcomingEvents.map((event, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    padding: "1.25rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,175,55,0.3)";
                    el.style.background = "rgba(212,175,55,0.04)";
                    el.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,175,55,0.1)";
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.transform = "translateX(0)";
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    padding: "0.5rem 0.75rem",
                    background: "rgba(212,175,55,0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                    border: "1px solid rgba(212,175,55,0.2)",
                  }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#D4AF37",
                      whiteSpace: "nowrap",
                    }}>
                      {event.date}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <h4 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#F0EDE6",
                      }}>
                        {event.title}
                      </h4>
                      <span style={{
                        padding: "0.1rem 0.5rem",
                        background: "rgba(212,175,55,0.08)",
                        borderRadius: "4px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#C9A84C",
                      }}>
                        {event.type}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(240,237,230,0.45)",
                    }}>
                      📍 {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="view-all-events"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                width: "100%",
                marginTop: "1.25rem",
                padding: "0.875rem",
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "10px",
                color: "rgba(240,237,230,0.5)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                e.currentTarget.style.color = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
                e.currentTarget.style.color = "rgba(240,237,230,0.5)";
              }}
            >
              Request Event Information
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .support-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
