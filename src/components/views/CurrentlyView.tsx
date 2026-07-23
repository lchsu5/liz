import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import adobeLogo from "@/assets/adobe.jpg";
import workivaLogo from "@/assets/workiva.avif";

const roles = [
  {
    company: "Adobe",
    title: "Student Ambassador",
    dates: "Jun 2026 — Present",
    note: "Representing Adobe on campus; connecting students with the creative & AI toolchain.",
    logo: adobeLogo as string | null,
  },
  {
    company: "Workiva",
    title: "Product Manager Intern",
    dates: "May 2026 — Present",
    note: "Internship on a product team building enterprise reporting workflows.",
    logo: workivaLogo as string | null,
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
    title: "Eaton empowerU Leadership Summit",
    issuer: "Eaton",
    date: "Apr 2026",
  },
  {
    title: "Zappurtunity Scholar",
    issuer: "Zappurtunity — selected from 300+ applicants",
    date: "Mar 2026",
  },
  {
    title: "Dean's List",
    issuer: "Carnegie Mellon University",
    date: "Jan 2026",
  },
  {
    title: "UCC Consulting Academy Case Competition Finalist",
    issuer: "CMU Undergraduate Consulting Club",
    date: "Nov 2025",
  },
  {
    title: "2nd Place, ETF Arbitrage",
    issuer: "MSCF Trading Competition",
    date: "Sep 2025",
  },
  {
    title: "California State Seal of Biliteracy (Mandarin)",
    issuer: "California Department of Education",
    date: "May 2025",
  },
];

export default function CurrentlyView() {
  return (
    <main className="min-h-screen px-6 md:px-12 pt-20 md:pt-24 pb-24 md:pb-32">
      <ThemeController />
      <div className="w-full">
        {/* Active Roles */}
        <div>
          <SectionHeader title="Active Roles" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roles.map((r, i) => (
              <motion.div
                key={r.company}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative border border-border overflow-hidden lift-card p-7 rounded-md"
              >
                <div className="flex items-center gap-3 mb-5">
                  {r.logo && (
                    <div className="shrink-0 w-11 h-11 rounded-md border border-border bg-background flex items-center justify-center overflow-hidden">
                      <img
                        src={r.logo}
                        alt={r.company}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-[22px] text-foreground leading-tight">
                      {r.company}
                    </h3>
                    <p className="font-body text-[10px] tracking-[0.1em] uppercase text-accent mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-accent mr-2" />
                      {r.dates}
                    </p>
                  </div>
                </div>

                <p className="font-body text-[13px] font-semibold text-foreground/90 mb-2">
                  {r.title}
                </p>
                <p className="font-body text-[12px] text-foreground/65 leading-relaxed">
                  {r.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Latest Build — near-black editorial card */}
        <div className="mt-20">
          <SectionHeader title="Latest Build" />
          <a
            href="https://trae4d3ed8mx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-1 md:grid-cols-12 rounded-lg overflow-hidden bg-primary transition-colors duration-150 hover:bg-primary/95"
          >
            <div className="md:col-span-8 p-8 md:p-10">
              <p className="font-body text-[9px] tracking-[0.12em] uppercase text-accent mb-3">
                SecondLook · Jan 2026
              </p>
              <h3 className="font-display text-[26px] md:text-[32px] text-primary-foreground leading-[1.1] mb-4">
                A vision-powered STEM tutor that catches mistakes as you make them.
              </h3>
              <p className="font-body text-[13px] text-primary-foreground/60 font-light leading-[1.7] max-w-lg">
                Watches handwritten math over a live iPad screen share,
                pinpoints where reasoning breaks down, and intervenes
                without giving away the answer.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between p-8 md:p-10 border-t md:border-t-0 md:border-l border-white/10">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/40 mb-1">
                    Type
                  </p>
                  <p className="font-body text-[13px] text-primary-foreground/80">Personal build</p>
                </div>
                <div>
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/40 mb-1">
                    Status
                  </p>
                  <p className="font-body text-[13px] text-primary-foreground/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    Live
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between font-body text-[10px] tracking-[0.16em] uppercase text-accent">
                View project
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                />
              </div>
            </div>
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
                  className="grid grid-cols-12 gap-4 md:gap-8 items-baseline py-3.5 border-b border-border"
                >
                  <div className="col-span-8 md:col-span-9">
                    <h3 className="font-body text-[13px] font-semibold text-foreground leading-tight">
                      {h.title}
                    </h3>
                    <p className="font-body text-[11px] text-muted-foreground mt-1 tracking-[0.02em]">
                      {h.issuer}
                    </p>
                  </div>
                  <span className="col-span-4 md:col-span-3 text-right font-body text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                    {h.date}
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
