import { motion } from "framer-motion";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";

const languages = [
  { name: "English", level: "Native or Bilingual" },
  { name: "Chinese", level: "Limited Working" },
];

const courses = [
  "Prompt Engineering & AI Fundamentals",
  "JLL Data Centers Workshop Series",
  "Real Estate Capital Markets Workshop",
  "ICSC Retail Real Estate Bridge Program",
  "Commercial Real Estate Fundamentals Certificate",
];

export default function AboutView() {
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
            § About
          </p>
          <h1 className="font-display text-[48px] md:text-[80px] leading-[0.98] tracking-tight text-foreground">
            The <span className="italic text-accent">essentials</span>.
          </h1>
        </motion.div>

        {/* EDUCATION */}
        <div className="mt-20">
          <SectionHeader label="§ 01" title="Education" italicWord="Education" />
          <div className="border-y border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
            <div className="md:col-span-5">
              <h3 className="font-display text-[26px] md:text-[34px] text-foreground leading-tight">
                Carnegie Mellon University
              </h3>
              <p className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground mt-3">
                Tepper School of Business · Pittsburgh, PA
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <p className="font-body text-[15px] text-foreground/90">
                  B.S. Business Administration · Concentration in AI
                </p>
                <p className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground whitespace-nowrap">
                  Expected May 2029
                </p>
              </div>
              <p className="font-body text-[13px] text-foreground/65 mt-4 leading-relaxed">
                Coursework spanning business analytics, computer science, and applied AI.
                Dean's List, January 2026.
              </p>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="mt-24">
          <SectionHeader label="§ 02" title="Languages" italicWord="Languages" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {languages.map((l) => (
              <div
                key={l.name}
                className="bg-background py-7 px-7 flex items-baseline justify-between gap-4"
              >
                <span className="font-display text-[28px] text-foreground">{l.name}</span>
                <span className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COURSES */}
        <div className="mt-24">
          <SectionHeader
            label="§ 03"
            title="Courses & Certificates"
            italicWord="Certificates"
          />
          <ul className="border-y border-border">
            {courses.map((c, i) => (
              <li
                key={c}
                className="flex items-baseline gap-6 py-5 border-b border-border/60 last:border-b-0"
              >
                <span className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[15px] text-foreground/85">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
