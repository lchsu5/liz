import SectionHeader from "./SectionHeader";

const honors = [
  {
    title: "2026 Zappurtunity Scholar",
    issuer: "Zappurtunity",
    date: "Mar 2026",
    description:
      "National scholarship awarded to students demonstrating resilience and commitment to accessible technology. Selected from 300+ applicants.",
  },
  {
    title: "Dean's List",
    issuer: "Carnegie Mellon University",
    date: "Jan 2026",
  },
  {
    title: "Dean's Scholarship",
    issuer: "Northeastern University",
    date: "Apr 2025",
  },
  {
    title: "UCSC Campus Merit — Caldwell Scholarship",
    issuer: "University of California Santa Cruz",
    date: "Mar 2025",
  },
];

export default function HonorsSection() {
  return (
    <section id="awards" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="§06" title="Honors & Awards" italicWord="Awards" />

        <div className="divide-y divide-border border-y border-border">
          {honors.map((h) => (
            <div key={h.title} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
              <div className="md:col-span-8">
                <h3 className="font-display text-[19px] md:text-[21px] text-foreground leading-snug">
                  {h.title}
                </h3>
                <p className="font-body text-[12px] tracking-[0.12em] uppercase text-muted-foreground mt-2">
                  Issued by {h.issuer}
                </p>
                {h.description && (
                  <p className="font-body text-[13px] text-foreground/65 mt-3 leading-relaxed max-w-2xl">
                    {h.description}
                  </p>
                )}
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                  {h.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
