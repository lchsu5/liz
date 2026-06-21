import SectionHeader from "./SectionHeader";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="§02" title="Education" italicWord="Education" />

        <div className="border-y border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-8">
            <div className="md:col-span-4">
              <h3 className="font-display text-[22px] md:text-[26px] text-foreground leading-tight">
                Carnegie Mellon University
              </h3>
              <p className="font-body text-[12px] tracking-[0.14em] uppercase text-muted-foreground mt-2">
                Pittsburgh, Pennsylvania
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <p className="font-body text-[15px] text-foreground/85">
                  B.S. in Business Administration, Concentration in Artificial Intelligence
                </p>
                <p className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground whitespace-nowrap">
                  Expected May 2029
                </p>
              </div>
              <p className="font-body text-[13px] text-foreground/65 mt-3 leading-relaxed">
                Tepper School of Business. Coursework spanning business analytics, computer science,
                and applied AI. Dean's List, 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
