import SectionHeader from "./SectionHeader";

const clubs = [
  {
    club: "Business Technology Group",
    roles: [
      { year: "2026–2027", title: "Product Analyst & Head of Outreach" },
      { year: "2025–2026", title: "Product Analyst" },
    ],
    bullets: [
      "Selected as 1 of 2 freshmen to build CMUsed, a secondhand marketplace addressing resale friction.",
      "Led cross-functional feature development with engineers and designers, refining listing flow and search UX.",
    ],
  },
  {
    club: "Taiwanese Student Association",
    roles: [
      { year: "2026–2027", title: "Public Relations Chair" },
      { year: "2025–2026", title: "Freshman Representative" },
    ],
    bullets: [
      "Coordinated Culture Night logistics for 300+ attendees, aligning 20+ student organizations on scheduling.",
      "Planned and executed a 40+ person ski trip, managing transportation, budgeting, and logistics.",
    ],
  },
  {
    club: "Foundry by ScottyLabs",
    roles: [{ year: "2026–2027", title: "Talent Subcommittee Chair, Executive Board" }],
    bullets: [
      "Designed a 7-category framework analyzing critical venture metrics to identify high-signal builders.",
      "Facilitated founder referrals to top VCs (a16z, Sequoia, Khosla), supporting $11M raised over 8 months.",
    ],
  },
];

export default function CampusSection() {
  return (
    <section id="campus" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="§08"
          title="Campus Leadership"
          italicWord="Leadership"
          description="Involvement across product, culture, and venture at Carnegie Mellon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {clubs.map((c) => (
            <div key={c.club} className="bg-background p-6 md:p-7 flex flex-col">
              <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent mb-4">
                {c.club}
              </p>
              <div className="space-y-1 mb-5">
                {c.roles.map((r) => (
                  <div key={r.year} className="font-body text-[13px] text-foreground/85">
                    <span className="font-medium">{r.title}</span>
                    <span className="text-muted-foreground"> · {r.year}</span>
                  </div>
                ))}
              </div>
              <ul className="space-y-3 mt-auto">
                {c.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-accent flex-shrink-0 text-[11px] mt-1">—</span>
                    <span className="font-body text-[13px] text-foreground/70 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
