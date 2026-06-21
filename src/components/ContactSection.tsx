import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lizhhsu/",
    icon: <Instagram size={28} strokeWidth={1.5} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lizhhsu",
    icon: <Linkedin size={28} strokeWidth={1.5} />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@lizhhsu",
    icon: <Youtube size={28} strokeWidth={1.5} />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@user8655827344228",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-[100px] px-6">
      <div className="max-w-6xl mx-auto">
        {/* Headline block */}
        <div className="mb-14">
          <h2 className="font-display text-[36px] md:text-[42px] leading-tight text-[#181818] mt-3">
            Contact
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl text-[15px]">
            Let's chat! Open to brand partnerships, creator collaborations, and ambassador opportunities.
          </p>
        </div>

        {/* Email button */}
        <a
          href="mailto:lchsu@andrew.cmu.edu"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            height: "64px",
            backgroundColor: "#6b0909",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "background 0.2s ease",
            marginBottom: "40px",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#181818")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6b0909")}
        >
          <Mail size={20} color="white" />
          lchsu@andrew.cmu.edu
        </a>

        {/* Social icon tiles — 4-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: "100%",
                padding: "24px 16px",
                background: "transparent",
                border: "1.5px solid #181818",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                color: "#181818",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#181818";
                e.currentTarget.style.color = "#F2EFE9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#181818";
              }}
            >
              {icon}
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "inherit",
                }}
              >
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
