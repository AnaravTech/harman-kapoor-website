"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "rgba(212,175,55,",
      "rgba(232,201,106,",
      "rgba(245,228,168,",
      "rgba(201,168,76,",
      "rgba(255,215,80,",
    ];

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Create ambient background particles
    const createBackgroundParticles = () => {
      for (let i = 0; i < 120; i++) {
        const life = Math.random() * 300 + 100;
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.15,
          radius: Math.random() * 2.5 + 0.5,
          alpha: 0,
          targetAlpha: Math.random() * 0.6 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: life,
        });
      }
    };
    createBackgroundParticles();

    let frameCount = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      // Spawn trail particles near mouse
      if (frameCount % 2 === 0) {
        const count = 3;
        for (let i = 0; i < count; i++) {
          const life = Math.random() * 80 + 40;
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 30,
            y: mouseRef.current.y + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            radius: Math.random() * 3 + 1,
            alpha: 0,
            targetAlpha: Math.random() * 0.8 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: life,
          });
        }
      }

      // Replenish background particles
      if (frameCount % 8 === 0 && particlesRef.current.filter(p => p.maxLife > 100).length < 80) {
        const life = Math.random() * 400 + 200;
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.4 - 0.1,
          radius: Math.random() * 2 + 0.5,
          alpha: 0,
          targetAlpha: Math.random() * 0.4 + 0.05,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: life,
        });
      }

      // Draw connections between nearby particles
      const nearby = particlesRef.current.filter(p => p.alpha > 0.05);
      for (let i = 0; i < nearby.length; i++) {
        for (let j = i + 1; j < nearby.length; j++) {
          const dx = nearby[i].x - nearby[j].x;
          const dy = nearby[i].y - nearby[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const opacity = (1 - dist / 80) * 0.12 * nearby[i].alpha * nearby[j].alpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,175,55,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nearby[i].x, nearby[i].y);
            ctx.lineTo(nearby[j].x, nearby[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        const progress = p.life / p.maxLife;
        const fadeIn = Math.min(p.life / 20, 1);
        const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
        p.alpha = p.targetAlpha * fadeIn * fadeOut;

        // Mouse repulsion/attraction
        const mx = mouseRef.current.x - p.x;
        const my = mouseRef.current.y - p.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 120 && md > 0) {
          const force = (120 - md) / 120;
          p.vx -= (mx / md) * force * 0.08;
          p.vy -= (my / md) * force * 0.08;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha < 0.001) return false;

        // Draw glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grd.addColorStop(0, `${p.color}${p.alpha})`);
        grd.addColorStop(0.5, `${p.color}${p.alpha * 0.4})`);
        grd.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(p.alpha * 2, 1)})`;
        ctx.fill();

        return p.life < p.maxLife;
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
