import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const roles = [
  {
    company: "Adobe",
    title: "Student Ambassador",
    dates: "Jun 2026 — Present",
    note: "Representing Adobe on campus; connecting students with the creative & AI toolchain.",
    logo: null as string | null,
  },
  {
    company: "Workiva",
    title: "Product Manager Intern",
    dates: "May 2026 — Present",
    note: "Internship on a product team building enterprise reporting workflows.",
    logo: null as string | null,
  },
];

const ventures = [
  {
    name: "SecondLook",
    tag: "Project · Jan 2026",
    href: "https://trae4d3ed8mx.vercel.app",
    body: "Real-time, vision-powered STEM tutor. Detects conceptual mistakes as students solve problems via live iPad screen share, intervenes without giving the answer away, and generates personalized review notes after each session.",
    tags: ["Computer Vision", "LLMs", "EdTech"],
  },
  {
    name: "Depop Storefront",
    tag: "Founder venture · ongoing",
    href: "https://www.depop.com/",
    body: "Independent resale storefront — sourcing, photography, pricing, and customer ops. A small studio in fashion commerce, run end-to-end.",
    tags: ["Resale", "Brand", "Ops"],
  },
];

export default function CurrentlyView() {
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
            § Currently
          </p>
          <h1 className="font-display text-[48px] md:text-[80px] leading-[0.98] tracking-tight text-foreground">
            What I'm <span className="italic text-accent">doing</span> now.
          </h1>
          <p className="font-body text-[15px] md:text-[16px] text-foreground/70 mt-6 max-w-2xl leading-relaxed">
            Active roles across product, research, and venture — plus the projects
            I'm shipping in parallel.
          </p>
        </motion.div>

        <div className="mt-20">
          <SectionHeader label="§ 01" title="Active Roles" italicWord="Roles" />
          <div className="divide-y divide-border border-y border-border">
            {roles.map((r) => (
              <div
                key={r.company}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-8"
              >
                <div className="md:col-span-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center mb-3 overflow-hidden">
                    {r.logo ? (
                      <img src={r.logo} alt={r.company} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="font-body text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
                        {r.company[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-[24px] md:text-[28px] text-foreground leading-tight">
                    {r.company}
                  </h3>
                  <p className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground mt-2">
                    {r.dates}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p className="font-body text-[15px] text-foreground/90">{r.title}</p>
                  <p className="font-body text-[13px] text-foreground/65 mt-2 leading-relaxed max-w-2xl">
                    {r.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeader label="§ 02" title="Latest Build" italicWord="Build" />
          <TiltCard maxDeg={3}>
            <a
              href="https://trae4d3ed8mx.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block group border border-border bg-card/40 hover:bg-card/70 transition-colors duration-300 p-8 md:p-12"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="font-body text-[11px] tracking-[0.18em] uppercase text-accent mb-3">
                    SecondLook · Jan 2026
                  </p>
                  <h3 className="font-display text-[34px] md:text-[48px] text-foreground leading-[1.05] mb-4">
                    A vision-powered{" "}
                    <span className="italic text-accent">STEM tutor</span> that
                    catches mistakes as you make them.
                  </h3>
                  <p className="font-body text-[15px] text-foreground/75 leading-relaxed max-w-2xl">
                    Watches handwritten math over a live iPad screen share,
                    pinpoints where reasoning breaks down, and intervenes
                    without giving away the answer.
                  </p>
                </div>
                <ArrowUpRight
                  size={28}
                  className="text-foreground/50 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                />
              </div>
            </a>
          </TiltCard>
        </div>

        <div className="mt-24">
          <SectionHeader label="§ 03" title="Projects & Ventures" italicWord="Ventures" />
          <div className="space-y-px">
            {ventures.map((v) => (
              <a
                key={v.name}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-border bg-card/30 hover:bg-card/60 transition-colors duration-200 p-7 md:p-9 group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent mb-3">
                      {v.tag}
                    </p>
                    <h3 className="font-display text-[28px] md:text-[34px] text-foreground leading-tight">
                      {v.name}
                    </h3>
                    <p className="font-body text-[14px] text-foreground/75 leading-relaxed max-w-3xl mt-4">
                      {v.body}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {v.tags.map((t) => (
                        <span
                          key={t}
                          className="font-body text-[10px] tracking-[0.16em] uppercase text-accent border border-accent/30 px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="text-foreground/50 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
