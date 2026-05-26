import { useEffect, useRef } from "react";
import { COLORS, CONTACTS, CONTACT_ICONS } from "../../config/data";
import { Container } from "../layout/Container";
import { SectionHeading } from "../layout/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide in
      gsap.from(".contact-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Stagger entrance of cards
      gsap.from(".contact-card-wrapper", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <Container>
        <div className="contact-header">
          <SectionHeading title="Hubungi Saya" sub="Get In Touch" />
        </div>

        {/* Contacts Grid */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 48,
          }}
        >
          {CONTACTS.map((c) => {
            const isWA = c.label === "WhatsApp";
            const hoverColor = isWA ? "#25D366" : COLORS.accent;
            const btnClass = isWA ? "btn-wa" : "";

            return (
              <div
                key={c.label}
                className="contact-card-wrapper"
              >
                <TiltCard maxTilt={5} scale={1.02}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`contact-card glass-panel glass-panel-3d ${btnClass}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      borderRadius: 14,
                      padding: "20px",
                      textDecoration: "none",
                      border: `1px solid ${COLORS.border}`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = hoverColor;
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = `0 6px 20px ${hoverColor}22`;
                      const icon = e.currentTarget.querySelector(".contact-icon");
                      if (icon) icon.style.color = hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = COLORS.border;
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                      const icon = e.currentTarget.querySelector(".contact-icon");
                      if (icon) icon.style.color = COLORS.muted;
                    }}
                  >
                    <div
                      className="contact-icon"
                      style={{
                        color: COLORS.muted,
                        transition: "color 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {CONTACT_ICONS[c.label]}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: COLORS.muted,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          marginBottom: 2,
                        }}
                      >
                        {c.label}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: COLORS.text,
                          wordBreak: "break-all",
                        }}
                      >
                        {c.value}
                      </div>
                    </div>
                  </a>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
