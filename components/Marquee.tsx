"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "Entrepreneur",
  "Restaurateur",
  "Public Speaker",
  "Rangrez Founder",
  "Freedom of Expression",
  "Rule of Law",
  "Community Voice",
  "Democratic Values",
  "London, UK",
  "20+ Years",
];

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #C9A84C 0%, #D4AF37 50%, #B8962A 100%)",
        overflow: "hidden",
        padding: "0.9rem 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#08080A",
                padding: "0 2.5rem",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "rgba(8,8,10,0.4)",
                fontSize: "0.5rem",
                flexShrink: 0,
              }}
            >
              ◆
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
