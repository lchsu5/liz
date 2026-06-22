import SectionHeader from "./SectionHeader";
import adobeLogo from "../assets/adobe.jpg";
import workivaLogo from "../assets/workiva.avif";
import btgLogo from "../assets/btg.jpeg";
import foundryLogo from "../assets/foundry.jpeg";
import handshakeLogo from "../assets/handshake.jpg";
import cmuLogo from "../assets/cmu.png";
import superworldLogo from "../assets/superworld.jpg";
import projectDestinedLogo from "../assets/project-destined-logo.png";
import consortiumLogo from "../assets/consortium.jpg";
import kumonLogo from "../assets/kumon.jpg";
import eyLogo from "../assets/ey.jpg";
import deloitteLogo from "../assets/deliotte.jpg";

type Role = {
  title: string;
  dates: string;
  location?: string;
  type?: string;
};

type Experience = {
  company: string;
  logo: string;
  roles: Role[];
};

const experiences: Experience[] = [
  {
    company: "Adobe",
    logo: adobeLogo,
    roles: [{ title: "Student Ambassador", dates: "Jun 2026 — Present" }],
  },
  {
    company: "Workiva",
    logo: workivaLogo,
    roles: [{ title: "Product Manager Intern", dates: "May 2026 — Present", type: "Internship" }],
  },
  {
    company: "CMU Business Technology Group",
    logo: btgLogo,
    roles: [
      { title: "Head of Outreach", dates: "Apr 2026 — Present" },
      { title: "Product Analyst", dates: "Sep 2025 — Present" },
    ],
  },
  {
    company: "Foundry by ScottyLabs",
    logo: foundryLogo,
    roles: [{ title: "Talent Subcommittee Chair, Executive Board", dates: "Apr 2026 — Present" }],
  },
  {
    company: "Handshake",
    logo: handshakeLogo,
    roles: [{ title: "LLM & Multimodal AI Research Fellow", dates: "Nov 2025 — Jun 2026" }],
  },
  {
    company: "Carnegie Mellon University",
    logo: cmuLogo,
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
    logo: superworldLogo,
    roles: [{ title: "Product Manager Intern", dates: "Feb 2026 — May 2026", type: "Internship" }],
  },
  {
    company: "Project Destined",
    logo: projectDestinedLogo,
    roles: [{ title: "Real Estate Private Equity Intern", dates: "May 2025 — Oct 2025" }],
  },
  {
    company: "Consortium Research Group",
    logo: consortiumLogo,
    roles: [{ title: "FIG Analyst", dates: "Jun 2025 — Aug 2025" }],
  },
  {
    company: "Kumon North America, Inc.",
    logo: kumonLogo,
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
    logo: eyLogo,
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
    logo: deloitteLogo,
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
              className="flex items-start gap-4 py-5 group hover:bg-card/40 transition-colors duration-200 px-2 -mx-2"
            >
              {/* Dates column */}
              <div className="flex flex-col gap-0.5 w-28 flex-shrink-0 mt-0.5">
                {exp.roles.map((r, i) => (
                  <div key={i} className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground whitespace-nowrap">
                    {r.dates}
                  </div>
                ))}
              </div>

              {/* Separator */}
              <div className="w-px self-stretch bg-border flex-shrink-0" />

              {/* Logo square */}
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-10 h-10 object-contain rounded flex-shrink-0 mt-0.5"
              />

              {/* Separator */}
              <div className="w-px self-stretch bg-border flex-shrink-0" />

              {/* Company + roles */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-[16px] md:text-[17px] text-foreground leading-snug mb-1">
                  {exp.company}
                </h3>
                <div className="space-y-0.5">
                  {exp.roles.map((r, i) => (
                    <div key={i} className="font-body text-[12px] text-foreground/60">
                      {r.title}
                      {r.type && <span className="text-foreground/40"> · {r.type}</span>}
                      {r.location && <span className="text-foreground/40"> · {r.location}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
