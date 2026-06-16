"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Canvas: ambient gold particles for preloader
───────────────────────────────────────────── */
function PreloaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    interface P {
      x: number; y: number; vx: number; vy: number;
      r: number; a: number; ta: number; life: number; max: number;
      col: string;
    }

    const COLS = ["rgba(212,175,55,","rgba(232,201,106,","rgba(245,228,168,","rgba(180,140,40,"];
    let particles: P[] = [];

    // Seed initial particles
    for (let i = 0; i < 180; i++) {
      const max = Math.random() * 500 + 150;
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.12,
        r: Math.random() * 2.5 + 0.5,
        a: 0, ta: Math.random() * 0.5 + 0.1,
        life: 0, max,
        col: COLS[Math.floor(Math.random() * COLS.length)],
      });
    }

    // Center-pull attractor (draws particles toward center)
    const cx = () => w / 2, cy = () => h / 2;
    let frame = 0;

    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Spawn
      if (frame % 4 === 0 && particles.length < 220) {
        const max = Math.random() * 600 + 200;
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.4 - 0.1,
          r: Math.random() * 2 + 0.4,
          a: 0, ta: Math.random() * 0.4 + 0.08,
          life: 0, max,
          col: COLS[Math.floor(Math.random() * COLS.length)],
        });
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,175,55,${(1 - d/90) * 0.09 * particles[i].a * particles[j].a})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles = particles.filter(p => {
        p.life++;
        const prog = p.life / p.max;
        const fi = Math.min(p.life / 25, 1);
        const fo = prog > 0.75 ? 1 - (prog - 0.75) / 0.25 : 1;
        p.a = p.ta * fi * fo;

        // Gentle pull toward center
        const dx = cx() - p.x, dy = cy() - p.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d > 60) {
          p.vx += (dx / d) * 0.008;
          p.vy += (dy / d) * 0.008;
        }

        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx; p.y += p.vy;

        if (p.a < 0.001) return false;

        // Glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `${p.col}${p.a})`);
        g.addColorStop(0.5, `${p.col}${p.a * 0.3})`);
        g.addColorStop(1, `${p.col}0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.col}${Math.min(p.a * 2.5, 1)})`; ctx.fill();

        return p.life < p.max;
      });
    };

    tick();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}

/* ─────────────────────────────────────────────
   SVG Monogram — animated stroke draw
───────────────────────────────────────────── */
function MonogramLetters({ phase }: { phase: number }) {
  const letters = ["H", "S", "K"];
  return (
    <div style={{ display: "flex", gap: "clamp(0.5rem, 3vw, 2rem)", alignItems: "flex-end" }}>
      {letters.map((letter, i) => (
        <motion.div
          key={letter}
          initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
          animate={phase >= i + 1
            ? { y: 0, opacity: 1, filter: "blur(0px)" }
            : { y: 60, opacity: 0, filter: "blur(12px)" }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          {/* The letter */}
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(5rem, 14vw, 11rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              backgroundImage: phase >= i + 1
                ? "linear-gradient(160deg, #F5E4A8 0%, #D4AF37 40%, #C9A84C 70%, #E8C96A 100%)"
                : undefined,
              WebkitBackgroundClip: phase >= i + 1 ? "text" : undefined,
              WebkitTextFillColor: phase >= i + 1 ? "transparent" : "rgba(212,175,55,0.1)",
              backgroundClip: phase >= i + 1 ? "text" : undefined,
              color: phase >= i + 1 ? undefined : "rgba(212,175,55,0.1)",
              display: "block",
              textShadow: phase >= i + 1 ? "0 0 80px rgba(212,175,55,0.3)" : "none",
            }}
          >
            {letter}
          </span>

          {/* Glow ring beneath */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= i + 1 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: -4,
              left: "10%",
              right: "10%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              transformOrigin: "left",
              filter: "blur(1px)",
              boxShadow: "0 0 12px rgba(212,175,55,0.8)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Preloader
───────────────────────────────────────────── */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.classList.add("preloader-active");

    // Phase timeline (ms delays)
    const timers = [
      setTimeout(() => setPhase(1), 300),   // H appears
      setTimeout(() => setPhase(2), 650),   // S appears
      setTimeout(() => setPhase(3), 1000),  // K appears
      setTimeout(() => setPhase(4), 1600),  // Gold line + full name
      setTimeout(() => setPhase(5), 2200),  // Tagline
      setTimeout(() => {                    // Begin exit
        setExiting(true);
        setTimeout(() => {
          document.body.classList.remove("preloader-active");
          onComplete();
        }, 900);        // Tell parent to unmount after wipe
      }, 3200),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.classList.remove("preloader-active");
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        /* ── Active preloader ── */
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "#08080A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Particle canvas (sparkles) removed per user request */}
          {/* <PreloaderCanvas /> */}

          {/* Center content */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>

            {/* Animated monogram */}
            <div style={{ marginBottom: "clamp(1rem, 3vw, 2.5rem)" }}>
              <MonogramLetters phase={phase} />
            </div>

            {/* Horizontal gold rule — draws from center */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={phase >= 4 ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.9) 20%, #D4AF37 50%, rgba(212,175,55,0.9) 80%, transparent)",
                transformOrigin: "center",
                marginBottom: "clamp(1rem, 2.5vw, 1.75rem)",
                boxShadow: "0 0 20px rgba(212,175,55,0.4)",
              }}
            />

            {/* Full name — character cascade */}
            <div style={{ overflow: "hidden", marginBottom: "0.75rem" }}>
              <motion.div
                initial={{ y: "100%" }}
                animate={phase >= 4 ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                  fontWeight: 400,
                  letterSpacing: "clamp(0.25em, 0.5vw, 0.55em)",
                  textTransform: "uppercase",
                  color: "rgba(240,237,230,0.85)",
                }}>
                  Harman Singh Kapoor
                </span>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
            >
              <div style={{ width: "1.5rem", height: "1px", background: "rgba(212,175,55,0.5)" }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.55rem, 1vw, 0.7rem)",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.65)",
              }}>
                Standing for Principles · Speaking for Freedom
              </span>
              <div style={{ width: "1.5rem", height: "1px", background: "rgba(212,175,55,0.5)" }} />
            </motion.div>
          </div>

          {/* Loading bar — bottom */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              background: "linear-gradient(90deg, #C9A84C, #F5E4A8, #D4AF37)",
              boxShadow: "0 0 12px rgba(212,175,55,0.6)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Corner accents */}
          {[
            { top: "1.5rem", left: "1.5rem", borderTop: "1px solid", borderLeft: "1px solid" },
            { top: "1.5rem", right: "1.5rem", borderTop: "1px solid", borderRight: "1px solid" },
            { bottom: "1.5rem", left: "1.5rem", borderBottom: "1px solid", borderLeft: "1px solid" },
            { bottom: "1.5rem", right: "1.5rem", borderBottom: "1px solid", borderRight: "1px solid" },
          ].map((style, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              style={{
                position: "absolute",
                width: "2rem",
                height: "2rem",
                borderColor: "rgba(212,175,55,0.25)",
                ...style,
              }}
            />
          ))}
        </motion.div>
      ) : (
        /* ── Exit: two panels wipe apart ── */
        <motion.div
          key="exit-wipe"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            pointerEvents: "none",
          }}
        >
          {/* Top panel slides up */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: "#08080A" }}
          />
          {/* Bottom panel slides down */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: "#08080A" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
