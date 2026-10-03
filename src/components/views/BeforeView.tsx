import { useState } from "react";
import type { ViewKey } from "@/lib/navigation";
import "./BeforeView.css";
import handshakeLogo from "@/assets/handshake.jpg";
import cmuLogo from "@/assets/cmu.png";
import superworldLogo from "@/assets/superworld.jpg";
import consortiumLogo from "@/assets/consortium.jpg";
import projectDestinedLogo from "@/assets/project-destined-logo.png";
import eyLogo from "@/assets/ey.jpg";
import deloitteLogo from "@/assets/deliotte.jpg";
import kumonLogo from "@/assets/kumon.jpg";
import photoGraduation from "@/assets/photo-graduation.jpg";
import photoEaton from "@/assets/eaton.jpg";
import photoTieShadowDay from "@/assets/photo-tie-shadow-day.png";
import photoGroup from "@/assets/photo-group.jpeg";

const archive: { src: string; caption: string; sub: string; area: string }[] = [
  { src: photoGraduation, caption: "Beckman High School", sub: "Commencement", area: "hero" },
  { src: photoTieShadowDay, caption: "TIE Shadow Day", sub: "Avasant", area: "top-a" },
  { src: photoGroup, caption: "Industry Info Session", sub: "Group Visit", area: "top-b" },
  { src: photoEaton, caption: "Eaton", sub: "emPOWER U Leadership Summit", area: "wide" },
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

const navigation: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" }, { key: "present", label: "Present" },
  { key: "past", label: "Past" }, { key: "visionboard", label: "Future" },
];

export default function BeforeView({ onNavigate }: { onNavigate: (view: ViewKey) => void }) {
  const [filter, setFilter] = useState<Category>("All");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const visible = past.filter(role => filter === "All" || role.category === filter);

  return <main className="past-reference">
    <header className="past-header">
      <button type="button" onClick={() => onNavigate("overview")}>Elizabeth Hsu™</button>
      <nav aria-label="Primary">{navigation.map(item => <button type="button" key={item.key} aria-current={item.key === "past" ? "page" : undefined} onClick={() => onNavigate(item.key)}>{item.label}</button>)}</nav>
      <span>©2025–2026</span>
    </header>
    <div className="past-content">
      <section aria-labelledby="past-moments">
        <h1 className="past-label" id="past-moments">Moments</h1>
        <div className="past-bento" data-active={activePhoto ?? "none"}>
          {archive.map((photo, index) => <figure key={photo.caption} className={`past-photo past-photo-${photo.area} ${activePhoto === index ? "is-active" : ""}`} tabIndex={0}
            onMouseEnter={() => setActivePhoto(index)} onMouseLeave={() => setActivePhoto(null)}
            onFocus={() => setActivePhoto(index)} onBlur={() => setActivePhoto(null)}>
            <img src={photo.src} alt={`${photo.caption} — ${photo.sub}`} />
            <figcaption><span>{photo.sub}</span><p>{photo.caption}</p></figcaption>
          </figure>)}
        </div>
      </section>
      <section className="past-roles" aria-labelledby="past-roles-heading">
        <h2 className="past-label" id="past-roles-heading">Past Roles</h2>
        <div className="past-filters" role="group" aria-label="Filter past roles">
          {categories.map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => { setFilter(category); setOpenKey(null); }}>
            {category} <span>{category === "All" ? past.length : past.filter(role => role.category === category).length}</span>
          </button>)}
        </div>
        <div className="past-role-list">
          {visible.map((role, index) => {
            const open = openKey === role.company;
            const panelId = `past-role-${past.indexOf(role)}`;
            return <article key={role.company} className={`past-role ${open ? "is-open" : ""}`} style={{ animationDelay: `${index * 45}ms` }}>
              <button type="button" className="past-role-trigger" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenKey(open ? null : role.company)}>
                <img className="past-role-logo" src={role.logo} alt="" />
                <span className="past-role-copy"><span className="past-company">{role.company}</span><span className="past-title">{role.title}</span></span>
                <span className="past-role-meta"><span>{role.dates}</span><span className="past-role-icon" aria-hidden="true" /></span>
              </button>
              <div className="past-role-panel" id={panelId} aria-hidden={!open}><div>
                <div className="past-role-details">
                  <ul>{(Array.isArray(role.note) ? role.note : [role.note]).map(note => <li key={note}>{note}</li>)}</ul>
                  {role.location && <p className="past-location">{role.location}</p>}
                </div>
              </div></div>
            </article>;
          })}
        </div>
      </section>
    </div>
  </main>;
}
