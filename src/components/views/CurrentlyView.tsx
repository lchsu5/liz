import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";

const roles = [
  {
    company: "Workiva",
    title: "Product Management Intern",
    dates: "Summer 2026",
    note: "Owning the product lifecycle for AI-driven features inside Workiva's financial reporting platform — from discovery through launch, shipping work that directly impacts how Fortune 500 finance teams operate.",
  },
  {
    company: "Google",
    title: "Student Ambassador",
    dates: "2025 – present",
    note: "Representing Google's developer ecosystem at Carnegie Mellon — building community, running technical workshops, and connecting students to Google Cloud opportunities at scale.",
  },
];

const honors = [
  {
    title: "Accenture Elevate to Innovate Externship",
    issuer: "Accenture",
    date: "May 2026",
  },
  {
    title: "Kohl's Leadership Summit",
    issuer: "Kohl's",
    date: "May 2026",
  },
  {
    title: "Goldman Sachs Possibilities Summit",
    issuer: "Goldman Sachs",
    date: "Apr 2026",
  },
  {
    title: "Eaton EmpowerU Leadership Summit",
    issuer: "Eaton",
    date: "Apr 2026",
  },
  {
    title: "Zappurtunity Scholar",
    issuer: "Selected from 300+ applicants",
    date: "Mar 2026",
  },
  {
    title: "Dean's List",
    issuer: "Carnegie Mellon University",
    date: "Jan 2026",
  },
  {
    title: "UCC Consulting Case Competition Finalist",
    issuer: "CMU Consulting Club",
    date: "Nov 2025",
  },
  {
    title: "2nd Place, ETF Arbitrage",
    issuer: "MSCF Trading Competition",
    date: "Sep 2025",
  },
  {
    title: "CA State Seal of Biliteracy (Mandarin)",
    issuer: "CA Dept of Education",
    date: "May 2025",
  },
];

export default function CurrentlyView() {
  return (
    <main className="min-h-screen px-6 md:px-12 pt-20 md:pt-24 pb-24 md:pb-32">
      <ThemeController />
      <div className="w-full">
        {/* Right Now — vertical timeline */}
        <div>
          <SectionHeader title="Right Now" />
          <div className="flex flex-col">
            {roles.map((r, i) => (
              <motion.div
                key={r.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                {i !== roles.length - 1 && (
                  <span className="absolute left-[5px] top-4 bottom-0 w-px bg-border" />
                )}
                <span className="absolute left-0 top-1.5 flex items-center justify-center w-[11px] h-[11px] rounded-full border-2 border-accent/40 bg-background">
                  <span className="w-[3px] h-[3px] rounded-full bg-accent" />
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-[20px] md:text-[22px] text-foreground leading-tight">
                    {r.company}
                  </h3>
                  <span className="font-body text-[12px] text-muted-foreground shrink-0">
                    {r.dates}
                  </span>
                </div>
                <p className="font-body text-[13px] text-muted-foreground mt-1">
                  {r.title}
                </p>
                <p className="font-body text-[13px] text-foreground/70 leading-[1.8] max-w-2xl mt-3">
                  {r.note}
                </p>

                <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full border border-accent/30 text-accent font-body text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Active
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Latest Build */}
        <div className="mt-20">
          <SectionHeader title="Latest Build" />
          <a
            href="https://trae4d3ed8mx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-border p-8 md:p-10 lift-card"
          >
            <div className="flex items-start justify-between gap-6 flex-wrap mb-5">
              <p className="font-body text-[10px] tracking-[0.12em] uppercase text-accent">
                SecondLook · Jan 2026
              </p>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 font-body text-[12px] text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                  Live
                </span>
                <span className="inline-flex items-center gap-1 font-body text-[12px] text-accent">
                  View Project
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                  />
                </span>
              </div>
            </div>
            <h3 className="font-display text-[26px] md:text-[30px] text-foreground leading-[1.15] mb-3">
              A vision-powered STEM tutor that catches mistakes as you make them.
            </h3>
            <p className="font-body text-[13px] text-foreground/65 leading-[1.8] max-w-2xl">
              Watches handwritten math over a live iPad screen share, pinpoints
              where reasoning breaks down, and intervenes without giving away
              the answer.
            </p>
          </a>
        </div>

        {honors.length > 0 && (
          <div className="mt-20">
            <SectionHeader title="Honors & Awards" />
            <div className="border-t border-border">
              {honors.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-center justify-between gap-4 py-4 border-b border-border"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <h3 className="font-body text-[14px] font-semibold text-foreground truncate">
                      {h.title}
                    </h3>
                  </div>
                  <span className="font-body text-[13px] text-muted-foreground shrink-0">
                    {h.issuer} · {h.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
