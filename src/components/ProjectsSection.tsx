import SectionHeader from "./SectionHeader";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "SecondLook",
    dates: "Jan 2026",
    href: "https://trae4d3ed8mx.vercel.app",
    description:
      "A real-time, vision-powered STEM tutor that detects conceptual mistakes as students solve problems. Watches handwritten math via live iPad screen share, identifies where reasoning breaks down, and intervenes immediately to explain the error without giving away the answer. Generates personalized review notes after each session to reinforce correct thinking.",
    tags: ["Computer Vision", "LLMs", "EdTech"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="§03" title="Selected Projects" italicWord="Projects" />

        <div className="space-y-px">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border bg-card/30 hover:bg-card/60 transition-colors duration-200 p-6 md:p-8 group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-3">
                    <h3 className="font-display text-[24px] md:text-[28px] text-foreground leading-tight">
                      {p.name}
                    </h3>
                    <span className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                      {p.dates}
                    </span>
                  </div>
                  <p className="font-body text-[14px] text-foreground/75 leading-relaxed max-w-3xl">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
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
                  size={22}
                  className="text-foreground/50 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
