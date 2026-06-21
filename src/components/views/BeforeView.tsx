import { motion } from "framer-motion";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";

const past = [
  {
    company: "Carnegie Mellon University",
    title: "Undergraduate Research Assistant — LLM Safety & Evaluation",
    dates: "Mar 2026 — May 2026",
    location: "Pittsburgh, PA",
    note: "Evaluated frontier LLM behavior under adversarial prompts; contributed to safety benchmark design.",
  },
  {
    company: "SuperWorld",
    title: "Product Manager Intern",
    dates: "Feb 2026 — May 2026",
    location: "",
    note: "Spec'd consumer features for a virtual-world platform; ran user interviews and prioritization.",
  },
  {
    company: "Consortium Research Group",
    title: "FIG Analyst",
    dates: "Jun 2025 — Aug 2025",
    location: "",
    note: "Published initiating-coverage reports on $HOOD and $PYPL covering the FinTech vertical.",
  },
  {
    company: "Project Destined",
    title: "Real Estate Private Equity Intern",
    dates: "May 2025 — Oct 2025",
    location: "",
    note: "Underwrote multifamily acquisitions; presented investment memos to industry mentors.",
  },
  {
    company: "EY",
    title: "Sustainability Consultant Intern",
    dates: "May 2024 — Aug 2024",
    location: "Orange County, CA",
    note: "Supported ESG disclosure modeling for a Fortune 500 client.",
  },
  {
    company: "Deloitte",
    title: "Academy Attendant",
    dates: "Jul 2024",
    location: "Costa Mesa, CA",
    note: "Selected participant — case studies, professional skills, and partner shadowing.",
  },
  {
    company: "Kumon North America",
    title: "Teacher, Receptionist & Translator",
    dates: "Feb 2023 — Apr 2025",
    location: "Tustin, CA",
    note: "Two years of one-on-one math instruction — quietly the most formative role on this list.",
  },
];

export default function BeforeView() {
  return (
    <main className="min-h-screen px-6 md:px-12 pt-32 pb-40">
      <ThemeController mode="light" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-accent mb-6">
            § Before
          </p>
          <h1 className="font-display text-[48px] md:text-[80px] leading-[0.98] tracking-tight text-foreground">
            Where I’ve <span className="italic text-accent">been</span>.
          </h1>
          <p className="font-body text-[15px] md:text-[16px] text-foreground/70 mt-6 max-w-2xl leading-relaxed">
            Past roles across research, real estate, consulting, and the
            classroom — in roughly reverse chronology.
          </p>
        </motion.div>

        <div className="mt-20">
          <SectionHeader label="§ 01" title="Past Roles" italicWord="Roles" />
          <div className="divide-y divide-border border-y border-border">
            {past.map((p) => (
              <div
                key={p.company + p.dates}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 hover:bg-card/40 transition-colors px-2 -mx-2"
              >
                <div className="md:col-span-4">
                  <h3 className="font-display text-[22px] md:text-[24px] text-foreground leading-tight">
                    {p.company}
                  </h3>
                  <p className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground mt-2">
                    {p.dates}
                    {p.location && (
                      <span className="ml-2 text-foreground/40">· {p.location}</span>
                    )}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p className="font-body text-[15px] text-foreground/90">{p.title}</p>
                  <p className="font-body text-[13px] text-foreground/65 mt-2 leading-relaxed max-w-2xl">
                    {p.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
