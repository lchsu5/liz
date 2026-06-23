import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import handshakeLogo from "@/assets/handshake.jpg";
import cmuLogo from "@/assets/cmu.png";
import superworldLogo from "@/assets/superworld.jpg";
import consortiumLogo from "@/assets/consortium.jpg";
import projectDestinedLogo from "@/assets/project-destined-logo.png";
import eyLogo from "@/assets/ey.jpg";
import deloitteLogo from "@/assets/deliotte.jpg";
import kumonLogo from "@/assets/kumon.jpg";

type Category = "All" | "Research" | "Product" | "Finance" | "Teaching";

const past: {
  company: string;
  title: string;
  dates: string;
  year: string;
  location?: string;
  note: string;
  category: Exclude<Category, "All">;
  logo: string;
}[] = [
  {
    company: "Handshake",
    title: "LLM & Multimodal AI Research Fellow",
    dates: "Nov 2025 — Jun 2026",
    year: "2026",
    note: "Applied research on multimodal models for early-career hiring signals.",
    category: "Research",
    logo: handshakeLogo,
  },
  {
    company: "Carnegie Mellon University",
    title: "Undergraduate Research Assistant — LLM Safety & Evaluation",
    dates: "Mar 2026 — May 2026",
    year: "2026",
    location: "Pittsburgh, PA",
    note: "Evaluated frontier LLM behavior under adversarial prompts; contributed to safety benchmark design.",
    category: "Research",
    logo: cmuLogo,
  },
  {
    company: "SuperWorld",
    title: "Product Manager Intern",
    dates: "Feb 2026 — May 2026",
    year: "2026",
    note: "Spec'd consumer features for a virtual-world platform; ran user interviews and prioritization.",
    category: "Product",
    logo: superworldLogo,
  },
  {
    company: "Consortium Research Group",
    title: "FIG Analyst",
    dates: "Jun 2025 — Aug 2025",
    year: "2025",
    note: "Published initiating-coverage reports on $HOOD and $PYPL covering the FinTech vertical.",
    category: "Finance",
    logo: consortiumLogo,
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
    logo: eyLogo,
  },
  {
    company: "Deloitte",
    title: "Academy Attendant",
    dates: "Jul 2024",
    year: "2024",
    location: "Costa Mesa, CA",
    note: "Selected participant — case studies, professional skills, and partner shadowing.",
    category: "Finance",
    logo: deloitteLogo,
  },
  {
    company: "Kumon North America",
    title: "Teacher, Receptionist & Translator",
    dates: "Feb 2023 — Apr 2025",
    year: "2023",
    location: "Tustin, CA",
    note: "Two years of one-on-one math instruction — quietly the most formative role on this list.",
    category: "Teaching",
    logo: kumonLogo,
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
    <main className="min-h-screen px-6 md:px-12 pt-24 md:pt-32 pb-28 md:pb-40">
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
                  className={`relative font-body text-[10px] tracking-[0.18em] uppercase px-3.5 py-2 border rounded-full transition-all duration-200 active:scale-95 ${
                    active
                      ? "border-accent text-[hsl(var(--accent-foreground))] bg-accent shadow-[0_4px_12px_-4px_hsl(var(--accent)/0.5)]"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-card/40"
                  }`}
                >
                  {c} <span className={`ml-1 ${active ? "opacity-70" : "opacity-50"}`}>{count}</span>
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
                    {/* Header row — always visible */}
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full text-left grid grid-cols-12 gap-3 md:gap-6 py-5 md:py-6 group hover:bg-accent/[0.04] transition-colors px-2 -mx-2"
                    >
                      {/* Date in year position */}
                      <div className="col-span-3 md:col-span-2 self-center">
                        <span className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                          {p.dates}
                        </span>
                      </div>

                      {/* Logo — real image, no border box */}
                      <div className="col-span-2 md:col-span-2 self-center">
                        <motion.img
                          src={p.logo}
                          alt={p.company}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? 1 : 0.7 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="w-14 h-14 object-contain"
                        />
                      </div>

                      {/* Company + title */}
                      <div className="col-span-5 md:col-span-6 self-center">
                        <h3 className="font-display text-[18px] md:text-[22px] text-foreground leading-tight group-hover:text-accent transition-colors">
                          {p.company}
                        </h3>
                        <p className="font-body text-[11px] md:text-[13px] text-foreground/70 mt-1">
                          {p.title}
                        </p>
                      </div>

                      {/* Category + expand toggle */}
                      <div className="col-span-2 md:col-span-2 self-center flex items-center justify-end gap-3">
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

                    {/* Expanded panel — description only (date lives in header row) */}
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
                            <div className="col-span-12 md:col-start-5 md:col-span-7">
                              <p className="font-body text-[14px] text-foreground/80 leading-relaxed max-w-2xl">
                                {p.note}
                              </p>
                              {p.location && (
                                <p className="font-body text-[10px] tracking-[0.14em] uppercase text-foreground/40 mt-2">
                                  {p.location}
                                </p>
                              )}
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
