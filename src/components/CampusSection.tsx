import btgImg from "@/assets/btg.jpeg";
import tsaImg from "@/assets/taiwanese_student_association.jpeg";
import foundryImg from "@/assets/foundry.jpeg";
import SectionHeader from "./SectionHeader";

const CRIMSON = "#6b0909";

const orgs = [
  {
    name: "Business Technology Group",
    image: btgImg,
    roles: [
      { title: "Head of Outreach", years: "2026–27" },
      { title: "Product Analyst", years: "2025–26" },
    ],
    bullets: [
      "Selected as 1 of 2 freshmen to build CMUsed, a secondhand marketplace addressing resale friction on campus.",
      "Led cross-functional feature development with engineers and designers, refining listing flow and search UX.",
    ],
  },
  {
    name: "Taiwanese Student Association",
    image: tsaImg,
    roles: [
      { title: "Public Relations Chair", years: "2026–27" },
      { title: "Freshman Representative", years: "2025–26" },
    ],
    bullets: [
      "Coordinated Culture Night logistics for 300+ attendees, aligning 20+ student organizations.",
      "Planned and executed a 40+ person ski trip, managing transportation, budgeting, and ops.",
    ],
  },
  {
    name: "Foundry by ScottyLabs",
    image: foundryImg,
    roles: [
      { title: "Talent Subcommittee Chair, Executive Board", years: "2026–27" },
    ],
    bullets: [
      "Designed a 7-category framework analyzing critical venture metrics to identify high-signal builders.",
      "Facilitated founder referrals to a16z, Sequoia, and Khosla — supporting $11M raised over 8 months.",
    ],
  },
];

export default function CampusSection() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        <SectionHeader
          title="Campus Leadership"
          description="Involvement across product, culture, and venture at CMU."
        />

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orgs.map((org) => (
            <div
              key={org.name}
              className="relative"
              style={{ transition: "transform 300ms ease-out", zIndex: 1 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.zIndex = "10";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.zIndex = "1";
              }}
            >
              {/* Card inner — overflow-hidden keeps image inside rounded corners */}
              <div
                className="flex flex-col h-full"
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {/* Photo */}
                <div style={{ height: 200, flexShrink: 0 }}>
                  <img
                    src={org.image}
                    alt={org.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Content */}
                <div
                  className="flex flex-col flex-1"
                  style={{ padding: 24 }}
                >
                  {/* Organization name */}
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: CRIMSON,
                      marginBottom: 8,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {org.name}
                  </p>

                  {/* Roles */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      marginBottom: 20,
                    }}
                  >
                    {org.roles.map((r) => (
                      <div
                        key={r.title}
                        style={{ fontFamily: "Inter, sans-serif", fontSize: 11 }}
                      >
                        <span style={{ fontWeight: 600, color: "#181818" }}>
                          {r.title}
                        </span>
                        <span style={{ color: "#aaa" }}> · {r.years}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {org.bullets.map((b, i) => (
                      <li
                        key={i}
                        style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                      >
                        <span
                          style={{
                            color: CRIMSON,
                            fontSize: 12,
                            flexShrink: 0,
                            marginTop: 1,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          —
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#555",
                            lineHeight: 1.6,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
