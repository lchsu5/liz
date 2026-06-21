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
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-5 group hover:bg-card/40 transition-colors duration-200 px-2 -mx-2"
            >
              {/* Logo + company name — always horizontal, never stacked */}
              <div className="flex items-center gap-3 md:w-[260px] md:flex-shrink-0">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-9 h-9 object-contain rounded flex-shrink-0"
                />
                <h3 className="font-display text-[17px] md:text-[18px] text-foreground leading-snug">
                  {exp.company}
                </h3>
              </div>

              {/* Roles — indented on mobile to align under company name */}
              <div className="flex-1 space-y-2 pl-12 md:pl-0">
                {exp.roles.map((r, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="font-body text-[13px] text-foreground/85">
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
