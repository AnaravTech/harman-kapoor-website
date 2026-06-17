"use client";

import { useEffect, useRef } from "react";

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: -100, y: -100 };
    const lastMouse = { x: -100, y: -100 };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
      opacity: number;
      color: string;
      isStar: boolean;

      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 15;
        this.y = y + (Math.random() - 0.5) * 15;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5; // slight upward drift
        this.maxLife = Math.random() * 40 + 20;
        this.life = this.maxLife;
        this.opacity = 1;
        this.isStar = Math.random() > 0.8;
        
        // Subtle gold/yellow/white colors
        const colors = ["#D4AF37", "#E8C96A", "#FFFFFF", "#C9A84C"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.opacity = Math.max(0, this.life / this.maxLife);
        this.size = Math.max(0, this.size - 0.01);
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        if (this.isStar) {
          // Draw a tiny star shape
          ctx.translate(this.x, this.y);
          ctx.rotate(this.life * 0.05);
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, -this.size * 2);
            ctx.lineTo(this.size * 0.5, -this.size * 0.5);
            ctx.rotate(Math.PI / 2);
          }
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          // Draw a circle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Calculate distance moved
      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Add particles based on distance to fill the gaps
      if (dist > 0 && lastMouse.x !== -100) {
        const particlesToAdd = Math.min(Math.floor(dist / 5), 5); // Limit max particles per frame
        for (let i = 0; i < particlesToAdd; i++) {
          const px = lastMouse.x + (dx * i) / particlesToAdd;
          const py = lastMouse.y + (dy * i) / particlesToAdd;
          particles.push(new Particle(px, py));
        }
      } else {
        // Just add one if moving very slowly
        if (Math.random() > 0.5) {
          particles.push(new Particle(mouse.x, mouse.y));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0 || particles[i].size <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999, // Ensure it's on top of everything
      }}
    />
  );
}
