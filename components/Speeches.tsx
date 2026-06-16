"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Play, MapPin, Calendar, Tag } from "lucide-react";
import { speeches } from "@/data/speeches";

export default function Speeches() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section
      id="speeches"
      style={{
        background: "var(--dark-1)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-site" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="label-overline">Public Voice</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6" }}>
            Speeches &{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Public Appearances</em>
          </h2>
          <p style={{
            color: "rgba(240,237,230,0.55)",
            maxWidth: "560px",
            margin: "1.25rem auto 0",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}>
            Harman Singh Kapoor speaks not for attention, but for accountability — to himself, to his community, and to the values that make a just society possible.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.75rem",
        }}>
          {speeches.map((speech, i) => (
            <motion.div
              key={speech.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="video-card"
              style={{
                background: "var(--dark-3)",
                border: "1px solid rgba(212,175,55,0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.35s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(212,175,55,0.4)";
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(212,175,55,0.1)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Video Thumbnail / Embed */}
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                {activeVideo === speech.id ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${speech.videoId}?autoplay=1&rel=0`}
                    title={speech.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, border: "none" }}
                  />
                ) : (
                  <>
                    {/* Harman portrait thumbnail */}
                    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                      <Image
                        src={i % 2 === 0 ? "/images/harman-speech.png" : "/images/harman-hero.png"}
                        alt={speech.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        style={{ objectFit: "cover", objectPosition: "center top", filter: "brightness(0.55) saturate(0.7)" }}
                      />
                    </div>

                    {/* Dark overlay */}
                    <div className="video-overlay" />

                    {/* Play button */}
                    <button
                      id={`play-speech-${speech.id}`}
                      className="video-play-btn"
                      onClick={() => setActiveVideo(speech.id)}
                      aria-label={`Play: ${speech.title}`}
                    >
                      <Play size={22} color="#08080A" fill="#08080A" style={{ marginLeft: "3px" }} />
                    </button>

                    {/* Gradient bottom bar */}
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #C9A84C, #D4AF37, #E8C96A)",
                      opacity: 0.6,
                    }} />
                  </>
                )}
              </div>

              {/* Card Content */}
              <div style={{ padding: "1.5rem" }}>
                <div style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginBottom: "0.875rem",
                }}>
                  {speech.tags.map((tag) => (
                    <span key={tag} style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.2rem 0.6rem",
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.2)",
                      borderRadius: "4px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                    }}>
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#F0EDE6",
                  marginBottom: "0.75rem",
                  lineHeight: 1.4,
                }}>
                  {speech.title}
                </h3>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(240,237,230,0.55)",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                }}>
                  {speech.description}
                </p>

                <div style={{
                  display: "flex",
                  gap: "1.25rem",
                  flexWrap: "wrap",
                  borderTop: "1px solid rgba(212,175,55,0.1)",
                  paddingTop: "1rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Calendar size={12} color="#C9A84C" />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(240,237,230,0.5)",
                    }}>{speech.date}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <MapPin size={12} color="#C9A84C" />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(240,237,230,0.5)",
                    }}>{speech.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "rgba(240,237,230,0.45)",
            marginBottom: "1.25rem",
          }}>
            For speaking invitations and public appearance requests:
          </p>
          <button
            id="speeches-contact-btn"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "transparent",
              border: "1px solid rgba(212,175,55,0.4)",
              borderRadius: "4px",
              color: "#D4AF37",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,175,55,0.08)";
              e.currentTarget.style.borderColor = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
            }}
          >
            Invite Harman to Speak
          </button>
        </motion.div>
      </div>
    </section>
  );
}
