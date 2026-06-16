"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, FileText, Video, MessageSquare } from "lucide-react";
import { pressArticles } from "@/data/press";

type Category = "all" | "article" | "video" | "statement";

const categoryTabs: { value: Category; label: string; icon: typeof FileText }[] = [
  { value: "all", label: "All Coverage", icon: FileText },
  { value: "article", label: "Articles", icon: FileText },
  { value: "video", label: "Video Interviews", icon: Video },
  { value: "statement", label: "Statements", icon: MessageSquare },
];

const pubColors: Record<string, string> = {
  TG: "#1A6496",
  BBC: "#B80000",
  ES: "#003580",
  ITV: "#6AB023",
  IND: "#E03A3C",
  AV: "#8B4513",
};

export default function MediaPress() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered = activeTab === "all"
    ? pressArticles
    : pressArticles.filter((a) => a.category === activeTab);

  const categoryIcon = (cat: string) => {
    if (cat === "video") return <Video size={12} />;
    if (cat === "statement") return <MessageSquare size={12} />;
    return <FileText size={12} />;
  };

  return (
    <section
      id="press"
      style={{
        background: "var(--dark-2)",
        padding: "7rem 0",
        position: "relative",
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
          <span className="label-overline">Newsroom</span>
          <div className="divider-gold" />
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F0EDE6" }}>
            Media &{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Press Coverage</em>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {categoryTabs.map(({ value, label }) => (
            <button
              key={value}
              id={`press-tab-${value}`}
              onClick={() => setActiveTab(value)}
              style={{
                padding: "0.6rem 1.25rem",
                background: activeTab === value ? "rgba(212,175,55,0.15)" : "transparent",
                border: `1px solid ${activeTab === value ? "rgba(212,175,55,0.5)" : "rgba(240,237,230,0.12)"}`,
                borderRadius: "100px",
                color: activeTab === value ? "#D4AF37" : "rgba(240,237,230,0.5)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Featured + Grid */}
        <div>
          {/* Featured articles (first 2) */}
          {activeTab === "all" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
              className="press-featured-grid"
            >
              {pressArticles.filter((a) => a.featured).map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="press-card"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {/* Featured label */}
                  <div style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    padding: "0.2rem 0.6rem",
                    background: "rgba(212,175,55,0.15)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    borderRadius: "4px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                  }}>
                    Featured
                  </div>

                  <PressCardInner article={article} categoryIcon={categoryIcon} pubColors={pubColors} large />
                </motion.article>
              ))}
            </div>
          )}

          {/* Regular grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}>
            {filtered
              .filter((a) => activeTab !== "all" || !a.featured)
              .map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                  className="press-card"
                >
                  <PressCardInner article={article} categoryIcon={categoryIcon} pubColors={pubColors} />
                </motion.article>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .press-featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function PressCardInner({
  article,
  categoryIcon,
  pubColors,
  large = false,
}: {
  article: (typeof pressArticles)[0];
  categoryIcon: (cat: string) => React.ReactNode;
  pubColors: Record<string, string>;
  large?: boolean;
}) {
  return (
    <>
      {/* Publication badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: pubColors[article.publicationAbbr] || "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "0.05em",
            flexShrink: 0,
          }}>
            {article.publicationAbbr}
          </div>
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(240,237,230,0.7)",
            }}>
              {article.publication}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(240,237,230,0.35)",
              letterSpacing: "0.05em",
            }}>
              {article.date}
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          padding: "0.2rem 0.5rem",
          background: "rgba(212,175,55,0.07)",
          borderRadius: "4px",
          color: "rgba(212,175,55,0.7)",
          fontSize: "0.65rem",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "capitalize",
        }}>
          {categoryIcon(article.category)}
          {article.category}
        </div>
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: large ? "1.15rem" : "1rem",
        fontWeight: 600,
        color: "#F0EDE6",
        marginBottom: "0.75rem",
        lineHeight: 1.4,
      }}>
        {article.headline}
      </h3>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.82rem",
        color: "rgba(240,237,230,0.5)",
        lineHeight: 1.8,
        marginBottom: "1.25rem",
      }}>
        {article.description}
      </p>

      <a
        href={article.url}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#C9A84C",
          textDecoration: "none",
          transition: "color 0.2s ease",
          paddingBottom: "1px",
          borderBottom: "1px solid rgba(212,175,55,0.3)",
        }}
        onMouseEnter={(e) => { (e.currentTarget).style.color = "#E8C96A"; }}
        onMouseLeave={(e) => { (e.currentTarget).style.color = "#C9A84C"; }}
      >
        Read More
        <ExternalLink size={12} />
      </a>
    </>
  );
}
