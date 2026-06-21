import SectionHeader from "./SectionHeader";

type Role = {
  title: string;
  dates: string;
  location?: string;
  type?: string;
};

type Experience = {
  company: string;
  roles: Role[];
};

const experiences: Experience[] = [
  {
    company: "Adobe",
    roles: [{ title: "Student Ambassador", dates: "Jun 2026 — Present" }],
  },
  {
    company: "Workiva",
    roles: [{ title: "Product Manager Intern", dates: "May 2026 — Present", type: "Internship" }],
  },
  {
    company: "CMU Business Technology Group",
    roles: [
      { title: "Head of Outreach", dates: "Apr 2026 — Present" },
      { title: "Product Analyst", dates: "Sep 2025 — Present" },
    ],
  },
  {
    company: "Foundry by ScottyLabs",
    roles: [{ title: "Talent Subcommittee Chair, Executive Board", dates: "Apr 2026 — Present" }],
  },
  {
    company: "Handshake",
    roles: [{ title: "LLM & Multimodal AI Research Fellow", dates: "Nov 2025 — Jun 2026" }],
  },
  {
    company: "Carnegie Mellon University",
    roles: [
      {
        title: "Undergraduate Research Assistant, LLM Safety & Evaluation",
        dates: "Mar 2026 — May 2026",
        location: "Pittsburgh, PA",
      },
    ],
  },
  {
    company: "SuperWorld",
    roles: [{ title: "Product Manager Intern", dates: "Feb 2026 — May 2026", type: "Internship" }],
  },
  {
    company: "Project Destined",
    roles: [{ title: "Real Estate Private Equity Intern", dates: "May 2025 — Oct 2025" }],
  },
  {
    company: "Consortium Research Group",
    roles: [{ title: "FIG Analyst", dates: "Jun 2025 — Aug 2025" }],
  },
  {
    company: "Kumon North America, Inc.",
    roles: [
      {
        title: "Teacher, Receptionist, and Translator",
        dates: "Feb 2023 — Apr 2025",
        location: "Tustin, CA",
        type: "Part-time",
      },
    ],
  },
  {
    company: "EY",
    roles: [
      {
        title: "Sustainability Consultant Intern",
        dates: "May 2024 — Aug 2024",
        location: "Orange County, CA",
        type: "Internship",
      },
    ],
  },
  {
    company: "Deloitte",
    roles: [
      {
        title: "Academy Attendant",
        dates: "Jul 2024",
        location: "Costa Mesa, CA",
      },
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="§01"
          title="Experience"
          italicWord="Experience"
        />

        <div className="divide-y divide-border border-y border-border">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 group hover:bg-card/40 transition-colors duration-200 px-2 -mx-2"
            >
              <div className="md:col-span-4">
                <h3 className="font-display text-[20px] md:text-[22px] text-foreground leading-tight">
                  {exp.company}
                </h3>
              </div>
              <div className="md:col-span-8 space-y-3">
                {exp.roles.map((r, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="font-body text-[14px] text-foreground/85">
                      {r.title}
                      {r.type && (
                        <span className="text-foreground/45 font-normal"> · {r.type}</span>
                      )}
                      {r.location && (
                        <span className="text-foreground/45 font-normal"> · {r.location}</span>
                      )}
                    </div>
                    <div className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground whitespace-nowrap">
                      {r.dates}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
