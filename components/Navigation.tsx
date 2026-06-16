"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#values", label: "Values" },
  { href: "#speeches", label: "Speeches" },
  { href: "#press", label: "Press" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        id="main-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(8,8,10,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#D4AF37",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}>
            Harman Singh Kapoor
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.6)",
          }}>
            Entrepreneur · Speaker · Voice
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden md:flex">
          {navLinks.map(({ href, label }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#D4AF37" : "rgba(240,237,230,0.65)",
                  transition: "color 0.3s ease",
                  position: "relative",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.target as HTMLElement).style.color = "#F0EDE6"; }}
                onMouseLeave={(e) => { if (!isActive) (e.target as HTMLElement).style.color = "rgba(240,237,230,0.65)"; }}
              >
                {label}
                {isActive && (
                  <span style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "#D4AF37",
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:inline-flex"
            style={{
              background: "transparent",
              border: "1px solid rgba(212,175,55,0.4)",
              borderRadius: "4px",
              color: "#D4AF37",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.6rem 1.25rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(212,175,55,0.1)";
              el.style.borderColor = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(212,175,55,0.4)";
            }}
          >
            Get in Touch
          </button>

          {/* Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#D4AF37",
              padding: "0.25rem",
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(8,8,10,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 600,
                color: "#F0EDE6",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4AF37"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#F0EDE6"; }}
            >
              {label}
            </button>
          ))}
          <div style={{ width: "4rem", height: "1px", background: "rgba(212,175,55,0.4)" }} />
          <button
            onClick={() => handleNavClick("#contact")}
            style={{
              background: "linear-gradient(135deg, #C9A84C, #D4AF37)",
              border: "none",
              borderRadius: "4px",
              color: "#08080A",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.875rem 2rem",
              cursor: "pointer",
            }}
          >
            Get in Touch
          </button>
        </div>
      )}
    </>
  );
}
