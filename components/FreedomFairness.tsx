"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scale, Shield, Building2, Users, CheckSquare, ArrowRight, Award, Mic, Star } from "lucide-react";
import Image from "next/image";

const pillars = [
  {
    icon: Scale,
    title: "Freedom of\nExpression",
    body: "The right to speak\nfreely is the first step\ntoward a stronger\ndemocracy.",
  },
  {
    icon: Shield,
    title: "Equal Treatment\nUnder Law",
    body: "Justice must be blind\nto power, prejudice,\nand politics.",
  },
  {
    icon: Building2,
    title: "Protection of\nBusinesses",
    body: "Entrepreneurs create\nopportunity. Our system\nmust protect those who\nbuild and innovate.",
  },
  {
    icon: Users,
    title: "Community\nHarmony",
    body: "Respectful dialogue\nbuilds stronger\ncommunities and a\nstronger Britain.",
  },
  {
    icon: CheckSquare,
    title: "Democratic\nValues",
    body: "Democracy thrives\nwhen citizens engage,\nquestion, and\nparticipate.",
  },
];

const stats = [
  { value: "20+", label: "YEARS OF LEADERSHIP", sublabel: "In Business & Public Life", icon: Award },
  { value: "50+", label: "PUBLIC SPEECHES", sublabel: "Across UK & International Platforms", icon: Mic },
  { value: "100K+", label: "PEOPLE REACHED", sublabel: "Through Speeches & Initiatives", icon: Users },
  { value: "5", label: "CORE PRINCIPLES", sublabel: "That Drive Every Decision", icon: Star },
];

export default function FreedomFairness() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="values" style={{ background: "#060608", overflow: "hidden", position: "relative" }}>
      {/* Import Signature Font */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}} />

      {/* SECTION 1: HERO VALUES SECTION */}
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingTop: "4rem",
      }}>
        {/* Full Background Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/values-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          zIndex: 0,
        }} />
        
        {/* Tint & Gradients over background */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #060608 30%, transparent 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center right, rgba(212,175,55,0.1) 0%, #060608 80%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to top, #060608 0%, transparent 100%)",
          zIndex: 2,
        }} />

        <div className="container-site" style={{ position: "relative", zIndex: 10, width: "100%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: "relative", zIndex: 10, paddingBottom: "2rem" }}
            >
              {/* Overline */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#D4AF37",
                }}>
                  PRINCIPLES
                </span>
                <div style={{ width: "40px", height: "1px", background: "#D4AF37" }} />
              </div>

              {/* Main Heading */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                color: "#FAFAFA",
                marginBottom: "2.5rem",
                lineHeight: 1.1,
              }}>
                Freedom, Fairness<br />
                & <em style={{ color: "#D4AF37", fontStyle: "italic", marginLeft: "0.25rem" }}>Rule of Law</em>
              </h2>

              {/* Quote Card */}
              <div style={{
                background: "linear-gradient(135deg, rgba(16,16,18,0.7) 0%, rgba(212,175,55,0.08) 100%)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "12px",
                padding: "3rem",
                position: "relative",
                maxWidth: "600px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}>
                {/* Glowing edge highlights */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "150px",
                  height: "1px",
                  background: "#D4AF37",
                  boxShadow: "0 0 15px 2px rgba(212,175,55,0.8)",
                }} />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "150px",
                  height: "1px",
                  background: "#D4AF37",
                  boxShadow: "0 0 15px 2px rgba(212,175,55,0.8)",
                }} />

                <span style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.5rem",
                  fontFamily: "Georgia, serif",
                  fontSize: "4rem",
                  fontWeight: 700,
                  color: "#D4AF37",
                  lineHeight: 0,
                  opacity: 0.9,
                }}>
                  &ldquo;
                </span>

                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  color: "#F0EDE6",
                  lineHeight: 2,
                  marginBottom: "2rem",
                  paddingLeft: "2.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "0.5rem",
                }}>
                  My belief is simple: every citizen deserves<br/>
                  equal protection, fair treatment, and the<br/>
                  right to express their views within the law.<br/>
                  These are not radical ideas — they are the<br/>
                  foundations of British democracy.
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "2.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "24px", height: "1px", background: "#D4AF37" }} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#D4AF37",
                    }}>
                      HARMAN SINGH KAPOOR
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "4rem",
                    fontWeight: 700,
                    color: "#D4AF37",
                    lineHeight: 0,
                    opacity: 0.9,
                    transform: "translateY(1rem)",
                  }}>
                    &rdquo;
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex"
              style={{ position: "absolute", right: "-5%", bottom: 0, height: "90%", width: "55%", alignItems: "flex-end", justifyContent: "center", zIndex: 5, pointerEvents: "none" }}
            >
               <Image
                 src="/images/values-portrait.png"
                 alt="Harman Singh Kapoor"
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 style={{
                   objectFit: "contain",
                   objectPosition: "bottom center",
                   filter: "drop-shadow(-20px 20px 40px rgba(0,0,0,0.8))",
                 }}
                 priority
               />
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CORE VALUES */}
      <div style={{ padding: "4rem 0 1.5rem 0", position: "relative", zIndex: 10 }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "40px", height: "1px", background: "#D4AF37" }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#D4AF37",
              }}>
                THE CORE VALUES
              </span>
              <div style={{ width: "40px", height: "1px", background: "#D4AF37" }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.5rem)", color: "#FAFAFA", margin: "0 auto" }}>
              Principles That Guide Every Step
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: "rgba(10, 10, 12, 0.4)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    borderRadius: "12px",
                    padding: "2.5rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "360px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,175,55,0.5)";
                    el.style.background = "rgba(212,175,55,0.08)";
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,175,55,0.15)";
                    el.style.background = "rgba(10, 10, 12, 0.4)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Subtle gold radial glow behind the icon */}
                  <div style={{
                    position: "absolute",
                    top: "2.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 60%)",
                    zIndex: 0,
                  }} />

                  <div style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    <Icon size={30} color="#D4AF37" strokeWidth={1.5} />
                  </div>
                  
                  {/* The small gold dividing line beneath the icon */}
                  <div style={{
                    width: "24px",
                    height: "1px",
                    background: "#D4AF37",
                    marginBottom: "1.5rem",
                    opacity: 0.8,
                    position: "relative",
                    zIndex: 1,
                  }} />
                  
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#FAFAFA",
                    marginBottom: "1rem",
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {pillar.title}
                  </h3>
                  
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(240,237,230,0.5)",
                    lineHeight: 1.7,
                    flexGrow: 1,
                    whiteSpace: "pre-line",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {pillar.body}
                  </p>

                  <div style={{
                    marginTop: "1.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#D4AF37",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    Learn More <ArrowRight size={14} strokeWidth={2} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: ACHIEVEMENT BAR */}
      <div style={{ padding: "1.5rem 0 4rem 0", position: "relative", zIndex: 10 }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(10, 10, 12, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: "12px",
              padding: "2.5rem 1.5rem",
              position: "relative",
            }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 relative z-10">
              {stats.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} style={{
                    textAlign: "center",
                    position: "relative",
                  }}
                  className={i < stats.length - 1 ? "lg:border-r lg:border-[rgba(212,175,55,0.15)]" : ""}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <StatIcon size={26} color="#D4AF37" strokeWidth={1.5} />
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2.25rem",
                        fontWeight: 700,
                        color: "#FAFAFA",
                        lineHeight: 1,
                      }}>
                        {stat.value}
                      </span>
                    </div>
                    
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#D4AF37",
                      marginBottom: "0.5rem",
                    }}>
                      {stat.label}
                    </div>
                    
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(240,237,230,0.6)",
                      maxWidth: "80%",
                      margin: "0 auto",
                    }}>
                      {stat.sublabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 4: WHY THESE VALUES MATTER */}
      <div style={{ padding: "1rem 0 3rem 0", position: "relative", zIndex: 10 }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: "relative", width: "100%", maxWidth: "380px", margin: "0 auto lg:ml-auto lg:mr-0" }}
            >
              <div style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.2)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                aspectRatio: "4/5",
                zIndex: 1,
              }}>
                <Image
                  src="/images/about-harman.png"
                  alt="Building a fairer Britain"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(6,6,8,0.4) 0%, transparent 30%)",
                }} />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#D4AF37",
                }}>
                  WHY THESE VALUES MATTER
                </span>
                <div style={{ width: "40px", height: "1px", background: "#D4AF37" }} />
              </div>
              
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.25rem, 4vw, 3rem)",
                color: "#FAFAFA",
                marginBottom: "2rem",
                lineHeight: 1.15,
              }}>
                Building a Fairer,<br />
                Stronger Britain
              </h2>
              
              <div style={{ maxWidth: "550px" }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240,237,230,0.7)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}>
                  Britain&apos;s strength has always come from its commitment to fairness, freedom, and the rule of law. But progress is never automatic — it requires leadership, courage, and the willingness to stand up for what is right, even when it is not easy.
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240,237,230,0.7)",
                  lineHeight: 1.8,
                  marginBottom: "2.5rem",
                }}>
                  These values are not just ideals; they are the practical foundation for a country where people can live with dignity, work with opportunity, and speak with confidence.
                </p>
                
                <a href="#about" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 2rem",
                  background: "linear-gradient(to right, #E8C96A, #C9A84C)",
                  color: "#060608",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 20px rgba(212,175,55,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(212,175,55,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(212,175,55,0.2)";
                }}
                >
                  Learn More About My Journey <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
