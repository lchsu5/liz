import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";
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
    title: "Zappurtunity Scholar",
    issuer: "Zappurtunity — selected from 300+ applicants",
    date: "Mar 2026",
  },
  {
    title: "Dean's List",
    issuer: "Carnegie Mellon University",
    date: "Jan 2026",
  },
];

export default function CurrentlyView() {
  return (
    <main className="min-h-screen pl-6 pr-6 md:pl-44 md:pr-12 lg:pl-52 pt-24 md:pt-32 pb-28 md:pb-40">
      <ThemeController />
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="What I'm Doing Now"
            description="Active roles across product, research, and venture — plus the projects I'm shipping in parallel."
          />
        </motion.div>

        {/* Active Roles — offset asymmetric pairing, not equal cards */}
        <div className="mt-20">
          <SectionHeader title="Active Roles" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {roles.map((r, i) => {
              const featured = i === 0;
              return (
                <motion.div
                  key={r.company}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group relative border border-border bg-card/40 overflow-hidden lift-card ${
                    featured
                      ? "md:col-span-7 p-8 md:p-10 rounded-[28px]"
                      : "md:col-span-5 md:mt-10 p-6 rounded-2xl"
                  }`}
                >
                  {/* corner number */}
                  <span className={`absolute top-4 right-5 font-display italic text-muted-foreground/70 ${featured ? "text-[18px]" : "text-[13px]"}`}>
                    0{i + 1}
                  </span>

                  <div className="flex items-center gap-3 mb-6">
                    {r.logo && (
                      <div className={`shrink-0 rounded-xl border border-border bg-background flex items-center justify-center overflow-hidden ${featured ? "w-14 h-14" : "w-10 h-10"}`}>
                        <img
                          src={r.logo}
                          alt={r.company}
                          className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className={`font-display text-foreground leading-tight ${featured ? "text-[30px] md:text-[34px]" : "text-[20px]"}`}>
                        {r.company}
                      </h3>
                      <p className="font-body text-[10px] tracking-[0.18em] uppercase text-accent mt-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
                        {r.dates}
                      </p>
                    </div>
                  </div>

                  <p className={`font-body text-foreground/90 mb-3 ${featured ? "text-[16px]" : "text-[13px]"}`}>
                    {r.title}
                  </p>
                  {featured && (
                    <p className="font-body text-[13px] text-foreground/65 leading-relaxed max-w-md">
                      {r.note}
                    </p>
                  )}
                  {!featured && (
                    <p className="font-body text-[11px] text-foreground/55 leading-relaxed">
                      {r.note}
                    </p>
                  )}

                  {/* hover underline */}
                  <div className="mt-6 h-px bg-border overflow-hidden">
                    <div className="h-full w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Latest Build — true two-panel split: headline block + separate meta panel */}
        <div className="mt-28">
          <SectionHeader title="Latest Build" />
          <TiltCard maxDeg={2}>
            <a
              href="https://trae4d3ed8mx.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 md:grid-cols-12 border border-border rounded-[28px] overflow-hidden lift-card"
            >
              <div className="md:col-span-8 p-8 md:p-12 bg-card/40">
                <p className="font-body text-[11px] tracking-[0.18em] uppercase text-accent mb-3">
                  SecondLook · Jan 2026
                </p>
                <h3 className="font-display text-[32px] md:text-[46px] text-foreground leading-[1.05] mb-5">
                  A vision-powered{" "}
                  <span className="italic text-accent">STEM tutor</span> that
                  catches mistakes as you make them.
                </h3>
                <p className="font-body text-[15px] text-foreground/75 leading-relaxed max-w-lg">
                  Watches handwritten math over a live iPad screen share,
                  pinpoints where reasoning breaks down, and intervenes
                  without giving away the answer.
                </p>
              </div>

              {/* Meta panel — distinct container, own background */}
              <div className="md:col-span-4 flex flex-col justify-between p-8 md:p-10 bg-background/60 border-t md:border-t-0 md:border-l border-border">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      Type
                    </p>
                    <p className="font-body text-[13px] text-foreground/85">Personal build</p>
                  </div>
                  <div>
                    <p className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      Status
                    </p>
                    <p className="font-body text-[13px] text-foreground/85">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
                      Live
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between font-body text-[11px] tracking-[0.2em] uppercase text-foreground/50 group-hover:text-accent transition-colors">
                  View project
                  <ArrowUpRight
                    size={20}
                    className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </a>
          </TiltCard>

        </div>

        {honors.length > 0 && (
          <div className="mt-28">
            <SectionHeader title="Honors & Awards" />
            {/* Editorial row list with oversized ordinals — not a card grid */}
            <div className="border-t border-border">
              {honors.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline py-7 border-b border-border hover:bg-accent/[0.04] transition-colors px-2 -mx-2"
                >
                  <span className="col-span-3 md:col-span-2 font-display italic text-[40px] md:text-[56px] text-accent/25 leading-none group-hover:text-accent/50 transition-colors">
                    0{i + 1}
                  </span>
                  <div className="col-span-9 md:col-span-7">
                    <h3 className="font-display text-[22px] md:text-[26px] text-foreground leading-tight">
                      {h.title}
                    </h3>
                    <p className="font-body text-[12px] text-foreground/60 mt-2 leading-relaxed">
                      {h.issuer}
                    </p>
                  </div>
                  <span className="hidden md:block md:col-span-3 text-right font-body text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
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
