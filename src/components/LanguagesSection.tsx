import SectionHeader from "./SectionHeader";

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Chinese", level: "Bilingual" },
];

export default function LanguagesSection() {
  return (
    <section id="languages" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="§07" title="Languages" italicWord="Languages" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-border py-2">
          {languages.map((l) => (
            <div
              key={l.name}
              className="py-5 flex items-baseline justify-between gap-4 border-b border-border/60 last:border-b-0 md:border-b-0"
            >
              <span className="font-display text-[22px] text-foreground">{l.name}</span>
              <span className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                {l.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
