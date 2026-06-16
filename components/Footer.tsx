"use client";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "var(--black)",
        borderTop: "1px solid rgba(212,175,55,0.1)",
        padding: "4rem 0 2.5rem",
      }}
    >
      <div className="container-site">
        {/* Top section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "4rem",
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#D4AF37",
                marginBottom: "0.25rem",
              }}>
                Harman Singh Kapoor
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.5)",
              }}>
                Entrepreneur · Speaker · Voice
              </div>
            </button>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(240,237,230,0.4)",
              lineHeight: 1.85,
              marginTop: "1.25rem",
              maxWidth: "280px",
            }}>
              Standing for principles. Speaking for freedom. Committed to fairness and the democratic values that underpin a just society.
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {[
                { label: "X", href: "#" },
                { label: "YT", href: "#" },
                { label: "FB", href: "#" },
                { label: "IN", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "rgba(212,175,55,0.6)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(212,175,55,0.15)";
                    el.style.borderColor = "rgba(212,175,55,0.4)";
                    el.style.color = "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(212,175,55,0.06)";
                    el.style.borderColor = "rgba(212,175,55,0.15)";
                    el.style.color = "rgba(212,175,55,0.6)";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.6)",
              marginBottom: "1.25rem",
            }}>
              Navigate
            </h4>
            {["About", "Journey", "Values", "Speeches", "Press", "Gallery", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(240,237,230,0.45)",
                  marginBottom: "0.75rem",
                  textAlign: "left",
                  padding: "0",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4AF37"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(240,237,230,0.45)"; }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Enquiries */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.6)",
              marginBottom: "1.25rem",
            }}>
              Enquiries
            </h4>
            {[
              { label: "Media", email: "media@harmanskapoor.co.uk" },
              { label: "Speaking", email: "speaking@harmanskapoor.co.uk" },
              { label: "Business", email: "business@harmanskapoor.co.uk" },
              { label: "Community", email: "community@harmanskapoor.co.uk" },
            ].map(({ label, email }) => (
              <div key={label} style={{ marginBottom: "0.875rem" }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "rgba(240,237,230,0.35)",
                  marginBottom: "0.1rem",
                  letterSpacing: "0.06em",
                }}>
                  {label}
                </div>
                <a
                  href={`mailto:${email}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(212,175,55,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4AF37"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(212,175,55,0.55)"; }}
                >
                  {email}
                </a>
              </div>
            ))}
          </div>

          {/* About Rangrez */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.6)",
              marginBottom: "1.25rem",
            }}>
              Rangrez Restaurant
            </h4>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(240,237,230,0.4)",
              lineHeight: 1.85,
              marginBottom: "0.875rem",
            }}>
              Award-nominated Indian-British fusion dining in the heart of London. Est. 2012.
            </p>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#C9A84C",
                textDecoration: "none",
                borderBottom: "1px solid rgba(212,175,55,0.3)",
                paddingBottom: "1px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#E8C96A"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#C9A84C"; }}
            >
              Visit Rangrez →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)",
          marginBottom: "2rem",
        }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            color: "rgba(240,237,230,0.25)",
          }}>
            © {new Date().getFullYear()} Harman Singh Kapoor. All rights reserved. This website is for informational purposes and represents personal views within the law.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(240,237,230,0.25)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(212,175,55,0.6)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(240,237,230,0.25)"; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
