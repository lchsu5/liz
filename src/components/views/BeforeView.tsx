import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import projectDestinedLogo from "@/assets/project-destined-logo.png";

type Category = "All" | "Research" | "Product" | "Finance" | "Teaching";

const past: {
  company: string;
  title: string;
  dates: string;
  year: string;
  location?: string;
  note: string;
  category: Exclude<Category, "All">;
  logo: string | null;
}[] = [
  {
    company: "Handshake",
    title: "LLM & Multimodal AI Research Fellow",
    dates: "Nov 2025 — Jun 2026",
    year: "2026",
    note: "Applied research on multimodal models for early-career hiring signals.",
    category: "Research",
    logo: null,
  },
  {
    company: "Carnegie Mellon University",
    title: "Undergraduate Research Assistant — LLM Safety & Evaluation",
    dates: "Mar 2026 — May 2026",
    year: "2026",
    location: "Pittsburgh, PA",
    note: "Evaluated frontier LLM behavior under adversarial prompts; contributed to safety benchmark design.",
    category: "Research",
    logo: null,
  },
  {
    company: "SuperWorld",
    title: "Product Manager Intern",
    dates: "Feb 2026 — May 2026",
    year: "2026",
    note: "Spec'd consumer features for a virtual-world platform; ran user interviews and prioritization.",
    category: "Product",
    logo: null,
  },
  {
    company: "Consortium Research Group",
    title: "FIG Analyst",
    dates: "Jun 2025 — Aug 2025",
    year: "2025",
    note: "Published initiating-coverage reports on $HOOD and $PYPL covering the FinTech vertical.",
    category: "Finance",
    logo: null,
  },
  {
    company: "Project Destined",
    title: "Real Estate Private Equity Intern",
    dates: "May 2025 — Oct 2025",
    year: "2025",
    note: "Underwrote multifamily acquisitions; presented investment memos to industry mentors.",
    category: "Finance",
    logo: projectDestinedLogo,
  },
  {
    company: "EY",
    title: "Sustainability Consultant Intern",
    dates: "May 2024 — Aug 2024",
    year: "2024",
    location: "Orange County, CA",
    note: "Supported ESG disclosure modeling for a Fortune 500 client.",
    category: "Finance",
    logo: null,
  },
  {
    company: "Deloitte",
    title: "Academy Attendant",
    dates: "Jul 2024",
    year: "2024",
    location: "Costa Mesa, CA",
    note: "Selected participant — case studies, professional skills, and partner shadowing.",
    category: "Finance",
    logo: null,
  },
  {
    company: "Kumon North America",
    title: "Teacher, Receptionist & Translator",
    dates: "Feb 2023 — Apr 2025",
    year: "2023",
    location: "Tustin, CA",
    note: "Two years of one-on-one math instruction — quietly the most formative role on this list.",
    category: "Teaching",
    logo: null,
  },
];

const categories: Category[] = ["All", "Research", "Product", "Finance", "Teaching"];

export default function BeforeView() {
  const [filter, setFilter] = useState<Category>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const visible = useMemo(
    () => past.filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  return (
    <main className="min-h-screen px-6 md:px-12 pt-32 pb-40">
      <ThemeController mode="light" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Where I've Been"
            description="Past roles across research, real estate, consulting, and the classroom. Filter by track, click any row to expand."
          />
        </motion.div>

        <div className="mt-20">
          <SectionHeader title="Past Roles" />

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((c) => {
              const count =
                c === "All" ? past.length : past.filter((p) => p.category === c).length;
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`font-body text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border transition-all duration-200 ${
                    active
                      ? "border-accent text-accent bg-accent/10"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {c} <span className="opacity-50 ml-1">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="border-y border-border">
            <AnimatePresence initial={false}>
              {visible.map((p, i) => {
                const open = openIdx === i;
                return (
                  <motion.div
                    key={p.company + p.dates}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-b border-border last:border-b-0"
                  >
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full text-left grid grid-cols-12 gap-3 md:gap-6 py-5 md:py-6 group hover:bg-accent/[0.04] transition-colors px-2 -mx-2"
                    >
                      {/* Year + Logo packed tightly together */}
                      <div className="col-span-2 md:col-span-2 flex items-center gap-3 self-center">
                        <span className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground flex-shrink-0">
                          {p.year}
                        </span>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? 1 : 0.7 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="w-12 h-12 border border-border flex items-center justify-center overflow-hidden flex-shrink-0"
                        >
                          {p.logo ? (
                            <img
                              src={p.logo}
                              alt={p.company}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <span className="font-display italic text-[18px] text-accent">
                              {p.company[0]}
                            </span>
                          )}
                        </motion.div>
                      </div>

                      {/* Company + title */}
                      <div className="col-span-8 md:col-span-7 self-center">
                        <h3 className="font-display text-[20px] md:text-[24px] text-foreground leading-tight group-hover:text-accent transition-colors">
                          {p.company}
                        </h3>
                        <p className="font-body text-[12px] md:text-[13px] text-foreground/70 mt-1">
                          {p.title}
                        </p>
                      </div>

                      {/* Category + expand toggle */}
                      <div className="col-span-2 md:col-span-3 self-center flex items-center justify-end gap-3">
                        <span className="hidden md:inline font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                          {p.category}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-accent"
                        >
                          <Plus size={16} strokeWidth={1.5} />
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-12 gap-3 md:gap-6 pb-7 pt-1 px-2 -mx-2">
                            {/* Dates + note — left-aligned with company name (col 3 on desktop) */}
                            <div className="col-span-12 md:col-start-3 md:col-span-7">
                              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                                {p.dates}
                                {p.location && (
                                  <span className="ml-2 text-foreground/40">
                                    · {p.location}
                                  </span>
                                )}
                              </p>
                              <p className="font-body text-[14px] text-foreground/80 mt-3 leading-relaxed max-w-2xl">
                                {p.note}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
