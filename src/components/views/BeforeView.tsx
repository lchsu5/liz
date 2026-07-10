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
import photoGraduation from "@/assets/photo-graduation.jpg";
import photoEySummit from "@/assets/photo-ey-summit.jpeg";
import photoTieShadowDay from "@/assets/photo-tie-shadow-day.png";
import photoGroup from "@/assets/photo-group.jpeg";

const archive: { src: string; caption: string; sub: string; area: string }[] = [
  { src: photoGraduation, caption: "Beckman High School", sub: "Commencement", area: "hero" },
  { src: photoTieShadowDay, caption: "TIE Shadow Day", sub: "Avasant", area: "top-a" },
  { src: photoGroup, caption: "Industry Info Session", sub: "Group Visit", area: "top-b" },
  { src: photoEySummit, caption: "EY", sub: "Discovery Program", area: "wide" },
];

type Category = "All" | "Research" | "Product" | "Finance" | "Teaching";

const past: {
  company: string;
  title: string;
  dates: string;
  year: string;
  location?: string;
  note: string | string[];
  category: Exclude<Category, "All">;
  logo: string;
}[] = [
  {
    company: "Handshake",
    title: "LLM & Multimodal AI Research Fellow",
    dates: "Nov 2025 — Jun 2026",
    year: "2026",
    location: "San Francisco, CA",
    note: [
      "Collaborated with researchers to refine LLM capabilities by completing 100+ domain-specific evaluation tasks.",
      "Analyzed multimodal inputs (image, audio, video, text) to identify inconsistent reasoning and edge-case behavior.",
      "Delivered 150+ pieces of decision-oriented feedback by synthesizing recurring failure patterns and edge cases into actionable recommendations used across training cycles.",
    ],
    category: "Research",
    logo: handshakeLogo,
  },
  {
    company: "Carnegie Mellon University",
    title: "Undergraduate Research Assistant — LLM Safety & Evaluation",
    dates: "Mar 2026 — May 2026",
    year: "2026",
    location: "Pittsburgh, PA",
    note: [
      "Analyze results to assess the robustness of current LLM safety testing methods and find gaps in risk detection.",
      "Evaluated 5,000+ adversarial prompts across 50 LLM safety benchmarks using a structured scoring framework to assess alignment, misuse risk, and policy compliance.",
    ],
    category: "Research",
    logo: cmuLogo,
  },
  {
    company: "SuperWorld",
    title: "Product Manager Intern",
    dates: "Feb 2026 — May 2026",
    year: "2026",
    location: "Los Angeles, CA",
    note: [
      "Defined product roadmap for geospatial AI platform by analyzing user behavior across 3+ social map platforms.",
      "Conducted user interviews and behavioral analysis to prioritize features improving retention and engagement.",
      "Coordinated cross-functional development across engineering and design to ship MVP features on schedule.",
    ],
    category: "Product",
    logo: superworldLogo,
  },
  {
    company: "Consortium Research Group",
    title: "FIG Analyst",
    dates: "Jun 2025 — Aug 2025",
    year: "2025",
    location: "Irvine, CA",
    note: [
      "Modeled 5 and 10-year DCFs and comps for PYPL & HOOD, evaluating key revenue and macro sensitivity.",
      "Developed 5 theses on crypto M&A and super-app competition, supporting coverage with 10+ models.",
      "Quantified earnings sensitivity to Fed policy and regulations, stress-testing models under multiple scenarios.",
    ],
    category: "Finance",
    logo: consortiumLogo,
  },
  {
    company: "Project Destined",
    title: "Real Estate Private Equity Intern",
    dates: "May 2025 — Oct 2025",
    year: "2025",
    location: "Washington, DC",
    note: [
      "Modeled cash flows, IRR, and sensitivity for 5+ multifamily assets, identifying $2M+ in value creation potential.",
      "Built DCFs highlighting two deals with projected 15–20% IRR, supporting investment committee reviews.",
      "Synthesized market, leasing, and sponsor analysis into investor memos and presented findings to professionals.",
    ],
    category: "Finance",
    logo: projectDestinedLogo,
  },
  {
    company: "EY",
    title: "Sustainability Consultant Intern",
    dates: "May 2024 — Aug 2024",
    year: "2024",
    location: "Costa Mesa, CA",
    note: [
      "Engineered an ESG integration roadmap, mitigating a 25% noncompliance risk against global standards.",
      "Created two circular-economy product models for a fashion client that lowered client water consumption by 24%.",
      "Synthesized ESG data into 16-slide C-suite brief, securing adoption of three firmwide sustainability initiatives.",
    ],
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
    location: "Irvine, CA",
    note: [
      "Tutored 28 students in English & Math daily, increasing test scores by 18% across 5 grade levels.",
      "Managed scheduling & billing for 300+ students, streamlined processes to lower admin errors 30%.",
      "Interpreted Mandarin for 20+ families in parent meetings, improving the implementation of student plans.",
    ],
    category: "Teaching",
    logo: kumonLogo,
  },
];

const categories: Category[] = ["All", "Research", "Product", "Finance", "Teaching"];

export default function BeforeView() {
  const [filter, setFilter] = useState<Category>("All");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const visible = useMemo(
    () => past.filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  // Category label is only shown when a specific filter is active — "All" renders a flat list.
  const activeCategoryLabel = filter !== "All" ? filter : null;

  const renderRow = (p: (typeof past)[number]) => {
    const rowKey = p.company + p.dates;
    const open = openKey === rowKey;
    return (
      <motion.div
        key={rowKey}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="border-b border-border last:border-b-0"
      >
        {/* Row — split into meta zone (dates+logo) and content zone */}
        <button
          onClick={() => setOpenKey(open ? null : rowKey)}
          className="w-full text-left flex items-center gap-5 md:gap-8 py-5 group hover:bg-accent/[0.04] transition-colors px-4 md:px-6"
        >
          <div className="w-14 shrink-0 flex flex-col items-center gap-2">
            <motion.img
              src={p.logo}
              alt={p.company}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? 1 : 0.7 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-12 h-12 rounded-xl object-contain"
            />
          </div>

          <div className="flex-1 min-w-0 border-l border-border/70 pl-5 md:pl-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-[19px] md:text-[23px] text-foreground leading-tight group-hover:text-accent transition-colors">
                {p.company}
              </h3>
              <span className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                {p.dates}
              </span>
            </div>
            <p className="font-body text-[12px] md:text-[13px] text-foreground/65 mt-1">
              {p.title}
            </p>
          </div>

          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-accent shrink-0"
          >
            <Plus size={16} strokeWidth={1.5} />
          </motion.span>
        </button>

        {/* Expanded panel — indented under the content zone, same rail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="flex gap-5 md:gap-8 pb-7 pt-1 px-4 md:px-6">
                <div className="w-14 shrink-0" />
                <div className="flex-1 border-l border-border/70 pl-5 md:pl-7">
                  {Array.isArray(p.note) ? (
                    <ul className="space-y-1.5 max-w-2xl">
                      {p.note.map((line, ni) => (
                        <li
                          key={ni}
                          className="font-body text-[14px] text-foreground/80 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="font-body text-[14px] text-foreground/80 leading-relaxed max-w-2xl">
                      {p.note}
                    </p>
                  )}
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
  };

  return (
    <main className="min-h-screen pl-6 pr-6 md:pl-44 md:pr-12 lg:pl-52 pt-24 md:pt-32 pb-28 md:pb-40">
      <ThemeController />
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-5 md:h-[560px]"
        >
          {archive.map((p, i) => {
            const placement =
              p.area === "hero"
                ? "md:col-[1/7] md:row-[1/3]"
                : p.area === "top-a"
                ? "md:col-[7/10] md:row-[1/2]"
                : p.area === "top-b"
                ? "md:col-[10/13] md:row-[1/2]"
                : "md:col-[7/13] md:row-[2/3]";
            return (
              <motion.div
                key={p.caption}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={`relative overflow-hidden rounded-2xl border border-border aspect-[4/5] md:aspect-auto ${placement}`}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute left-4 bottom-3.5 pointer-events-none">
                  <p className="font-display text-[16px] md:text-[18px] text-white leading-tight">
                    {p.caption}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/70 mt-0.5">
                    {p.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-20">
          <SectionHeader title="Past Roles" />

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
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

          {activeCategoryLabel ? (
            /* A specific category is selected — show its label above the flat list */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-2">
                <p className="font-display italic text-[22px] text-accent">
                  {activeCategoryLabel}
                </p>
                <p className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                  {visible.length} role{visible.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="md:col-span-10 flex flex-col">
                <AnimatePresence initial={false}>{visible.map(renderRow)}</AnimatePresence>
              </div>
            </div>
          ) : (
            /* "All" — flat list, no category labels */
            <div className="rounded-2xl border border-border overflow-hidden">
              <AnimatePresence initial={false}>{visible.map(renderRow)}</AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
