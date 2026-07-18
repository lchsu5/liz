import bigFutureLogo from "@/assets/bigfuture-logo.png";
import projectDestinedLogo from "@/assets/project-destined-logo.png";
import redbullLogo from "@/assets/redbull-logo.svg";
import princessPollyLogo from "@/assets/princess-polly-logo.webp";
import adobeLogo from "@/assets/adobe.jpg";
import notionLogo from "@/assets/notion-logo.svg";

const brands = [
  { logo: notionLogo,          name: "Notion",           role: "Campus Leader",       href: "#" },
  { logo: adobeLogo,           name: "Adobe",            role: "Student Ambassador",  href: "#" },
  { logo: princessPollyLogo,   name: "Princess Polly",   role: "Ambassador",          href: "#" },
  { logo: bigFutureLogo,       name: "BigFuture",        role: "Ambassador",          href: "#" },
  { logo: projectDestinedLogo, name: "Project Destined", role: "Ambassador",          href: "#" },
  { logo: redbullLogo,         name: "Red Bull",         role: "Student Marketeer (Pending)",   href: "#" },
];

export default function BrandsSection() {
  return (
    <section id="brands" className="pt-[100px] pb-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-3">
            Ambassador Programs
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl text-[15px]">
            Selected to represent and promote top brands across tech, fashion, and academic spaces. I partner with brands that align with my lifestyle, giving my 100% to every event.
          </p>
        </div>

        {/* Row cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              onClick={(e) => e.preventDefault()}
              className="group"
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Logo box */}
              <div style={{ width: "100px", height: "56px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{ maxWidth: "100px", maxHeight: "56px", objectFit: "contain", objectPosition: "center" }}
                />
              </div>

              {/* Vertical divider */}
              <div style={{ width: "1px", height: "40px", background: "#e8e4dc", flexShrink: 0 }} />

              {/* Brand text */}
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#181818", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>
                  {brand.name}
                </p>
                <p style={{ fontSize: "10px", color: "#6b0909", letterSpacing: "0.09em", textTransform: "uppercase", marginTop: "4px", marginBottom: 0 }}>
                  {brand.role}
                </p>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
