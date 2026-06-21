import btgPhoto from "@/assets/btg.jpeg";
import tsaPhoto from "@/assets/taiwanese_student_association.jpeg";
import foundryPhoto from "@/assets/foundry.jpeg";

const clubs = [
  {
    photo: btgPhoto,
    photoAlt: "Business Technology Group",
    club: "Business Technology Group",
    roles: [
      { year: "2025–2026", title: "Product Analyst" },
      { year: "2026–2027", title: "Product Analyst & Co-Head of Outreach" },
    ],
    bullets: [
      "Selected as 1 of 2 freshmen to build CMUsed, a secondhand marketplace platform addressing resale friction.",
      "Led cross-functional feature development with engineers and designers, refining listing flow and search UX.",
    ],
  },
  {
    photo: tsaPhoto,
    photoAlt: "Taiwanese Student Association",
    club: "Taiwanese Student Association",
    roles: [
      { year: "2025–2026", title: "Freshman Representative" },
      { year: "2026–2027", title: "Public Relations Chair" },
    ],
    bullets: [
      "Coordinated Culture Night logistics for 300+ attendees, aligning 20+ student organizations on scheduling.",
      "Planned and executed a 40+ person ski trip, managing transportation, budgeting, sign-ups, and logistics for first-years.",
    ],
  },
  {
    photo: foundryPhoto,
    photoAlt: "Foundry by ScottyLabs",
    club: "Foundry by ScottyLabs",
    roles: [
      { year: "2026–2027", title: "Talent Subcommittee Chair, Executive Board" },
    ],
    bullets: [
      "Designed a 7-category framework analyzing critical venture metrics to identify high-signal builders.",
      "Facilitated founder referrals to top VCs (a16z, Sequoia, Khosla), supporting $11M raised over 8 months.",
    ],
  },
];

export default function CampusSection() {
  return (
    <section id="campus" className="py-[100px] px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-3">
            Campus Leadership
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl text-[15px]">
            Involvement across product, culture, and venture at CMU.
          </p>
        </div>

        {/* 3-column equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clubs.map((c) => (
            <div
              key={c.club}
              className="rounded-2xl overflow-hidden flex flex-col relative transition-transform duration-300 ease-out hover:scale-[1.4] hover:z-10"
              style={{ background: "white" }}
            >
              {/* Photo */}
              <div style={{ height: "200px", flexShrink: 0 }}>
                <img
                  src={c.photo}
                  alt={c.photoAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                {/* Club name */}
                <p
                  className="font-body"
                  style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6b0909", marginBottom: "8px" }}
                >
                  {c.club}
                </p>

                {/* Roles */}
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "3px" }}>
                  {c.roles.map((r) => (
                    <div key={r.year}>
                      <span className="font-body" style={{ fontSize: "11px", color: "#181818", fontWeight: 600 }}>
                        {r.title}
                      </span>
                      <span className="font-body" style={{ fontSize: "11px", color: "#aaa" }}>
                        {" "}· {r.year}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                  {c.bullets.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "#6b0909", flexShrink: 0, marginTop: "1px", fontSize: "12px" }}>—</span>
                      <span className="font-body" style={{ fontSize: "12px", color: "#555", lineHeight: 1.6 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
