"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Tv, Mic, Briefcase, MessageCircle, Send, CheckCircle } from "lucide-react";

const enquiryTypes = [
  {
    id: "media",
    icon: Tv,
    title: "Media Enquiries",
    description: "For journalists, broadcasters, and media professionals seeking comment, interview, or background information.",
    email: "media@harmanskapoor.co.uk",
  },
  {
    id: "speaking",
    icon: Mic,
    title: "Speaking Invitations",
    description: "For event organisers wishing to invite Harman to speak at conferences, panels, or public forums.",
    email: "speaking@harmanskapoor.co.uk",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Enquiries",
    description: "For business collaborations, partnerships, and commercial opportunities related to Rangrez and associated ventures.",
    email: "business@harmanskapoor.co.uk",
  },
  {
    id: "community",
    icon: MessageCircle,
    title: "Community Discussions",
    description: "For community leaders, civic organisations, and members of the public wishing to engage in constructive dialogue.",
    email: "community@harmanskapoor.co.uk",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", type: "media", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--dark-1)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "-200px",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
        transform: "translateY(-50%)",
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
          <span className="label-overline">Get in Touch</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6" }}>
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Contact</em> Harman
          </h2>
          <p style={{
            color: "rgba(240,237,230,0.55)",
            maxWidth: "520px",
            margin: "1.25rem auto 0",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}>
            All enquiries are welcomed and responded to professionally. Please select the most appropriate category below.
          </p>
        </motion.div>

        {/* Enquiry type cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.25rem",
          marginBottom: "4rem",
        }}>
          {enquiryTypes.map((type, i) => {
            const Icon = type.icon;
            const isSelected = formData.type === type.id;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                onClick={() => setFormData({ ...formData, type: type.id })}
                style={{
                  background: isSelected ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isSelected ? "rgba(212,175,55,0.45)" : "rgba(212,175,55,0.1)"}`,
                  borderRadius: "16px",
                  padding: "1.75rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isSelected ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isSelected ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                    e.currentTarget.style.background = "rgba(212,175,55,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  }
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: isSelected ? "rgba(212,175,55,0.2)" : "rgba(212,175,55,0.08)",
                  border: `1px solid ${isSelected ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.15)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  transition: "all 0.3s ease",
                }}>
                  <Icon size={18} color="#D4AF37" strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: isSelected ? "#D4AF37" : "#F0EDE6",
                  marginBottom: "0.5rem",
                  transition: "color 0.3s ease",
                }}>
                  {type.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(240,237,230,0.5)",
                  lineHeight: 1.75,
                  marginBottom: "0.875rem",
                }}>
                  {type.description}
                </p>
                <a
                  href={`mailto:${type.email}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: "#C9A84C",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {type.email}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: "20px",
            padding: "3rem",
          }}
        >
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "#F0EDE6",
            marginBottom: "2rem",
            textAlign: "center",
          }}>
            Send a Message
          </h3>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <CheckCircle size={48} color="#D4AF37" style={{ margin: "0 auto 1.25rem" }} />
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                color: "#D4AF37",
                marginBottom: "0.75rem",
              }}>
                Message Received
              </h4>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(240,237,230,0.6)",
                lineHeight: 1.8,
              }}>
                Thank you for reaching out. All messages are read personally and responded to with the respect and care your enquiry deserves.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="contact-name" style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(240,237,230,0.5)",
                  }}>
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-gold"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="contact-email" style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(240,237,230,0.5)",
                  }}>
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="input-gold"
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="contact-message" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,230,0.5)",
                }}>
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Please describe the nature of your enquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="input-gold"
                  style={{ resize: "vertical", fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  background: "linear-gradient(135deg, #C9A84C, #D4AF37)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#08080A",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,175,55,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>


    </section>
  );
}
