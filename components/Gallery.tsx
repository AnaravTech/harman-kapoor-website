"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    src: "/images/harman-closeup.png",
    alt: "Harman Singh Kapoor — Close-up Portrait",
    caption: "The Man Behind the Mission",
    category: "Portrait",
    tall: true,
  },
  {
    id: 2,
    src: "/images/harman-hero.png",
    alt: "Harman Singh Kapoor — Speaker at Westminster",
    caption: "Westminster Address",
    category: "Speeches",
    tall: false,
  },
  {
    id: 3,
    src: "/images/harman-speech.png",
    alt: "Harman Singh Kapoor — Community Forum Speech",
    caption: "London Community Forum",
    category: "Speeches",
    tall: false,
  },
  {
    id: 4,
    src: "/images/harman-restaurant.png",
    alt: "Harman Singh Kapoor at Rangrez Restaurant",
    caption: "At Rangrez, London",
    category: "Restaurant",
    tall: true,
  },
  {
    id: 5,
    src: "/images/harman-london.png",
    alt: "Harman Singh Kapoor on Westminster Bridge",
    caption: "Westminster Bridge",
    category: "Journey",
    tall: false,
  },
  {
    id: 6,
    src: "/images/gallery-community.png",
    alt: "London Community Gathering",
    caption: "Community Gathering",
    category: "Community",
    tall: false,
  },
];

const categories = ["All", "Portrait", "Restaurant", "Speeches", "Journey", "Community"];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      style={{
        background: "var(--dark-2)",
        padding: "7rem 0",
      }}
    >
      <div className="container-site" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span className="label-overline">Visual Story</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6" }}>
            Gallery &{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Moments</em>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.1rem",
                background: activeCategory === cat ? "rgba(212,175,55,0.15)" : "transparent",
                border: `1px solid ${activeCategory === cat ? "rgba(212,175,55,0.5)" : "rgba(240,237,230,0.1)"}`,
                borderRadius: "100px",
                color: activeCategory === cat ? "#D4AF37" : "rgba(240,237,230,0.45)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="gallery-item"
              onClick={() => setLightboxItem(item)}
              style={{ position: "relative" }}
            >
              <div style={{
                position: "relative",
                aspectRatio: item.tall ? "2/3" : "4/3",
                overflow: "hidden",
              }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                />
                {/* Overlay on hover */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,8,10,0.85) 0%, transparent 50%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.25rem",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#C9A84C",
                        marginBottom: "0.25rem",
                      }}>
                        {item.category}
                      </div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#F0EDE6",
                      }}>
                        {item.caption}
                      </div>
                    </div>
                    <ZoomIn size={18} color="#D4AF37" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(8,8,10,0.97)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative",
                maxWidth: "900px",
                maxHeight: "85vh",
                width: "100%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="lightbox-close"
                onClick={() => setLightboxItem(null)}
                style={{
                  position: "absolute",
                  top: "-3rem",
                  right: "0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#D4AF37",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Close <X size={16} />
              </button>

              <div style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.2)",
                maxHeight: "80vh",
              }}>
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  width={900}
                  height={600}
                  style={{ width: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain" }}
                />
              </div>

              <div style={{
                marginTop: "1.25rem",
                textAlign: "center",
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}>
                  {lightboxItem.category}
                </span>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#F0EDE6",
                  marginTop: "0.25rem",
                }}>
                  {lightboxItem.caption}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
