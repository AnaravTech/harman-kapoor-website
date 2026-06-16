"use client";

import { useEffect, useRef } from "react";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      dotPosRef.current.x += (posRef.current.x - dotPosRef.current.x) * 0.12;
      dotPosRef.current.y += (posRef.current.y - dotPosRef.current.y) * 0.12;

      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      if (dot) {
        dot.style.transform = `translate(${dotPosRef.current.x - 20}px, ${dotPosRef.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMove, { passive: true });

    // Scale up on hover over interactive elements
    const onEnter = () => {
      if (dot) {
        dot.style.transform += " scale(2.5)";
        dot.style.opacity = "0.5";
      }
    };
    const onLeave = () => {
      if (dot) {
        dot.style.opacity = "1";
      }
    };

    const interactives = document.querySelectorAll("button, a, [data-magnetic]");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small precise dot */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#D4AF37",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "screen",
          transition: "opacity 0.2s",
        }}
      />
      {/* Large trailing ring */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.5)",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "opacity 0.3s, width 0.3s, height 0.3s",
        }}
      />
    </>
  );
}
