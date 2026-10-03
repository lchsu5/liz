import type { ViewKey } from "@/lib/navigation";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";

const items: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "present", label: "Present" },
  { key: "past", label: "Past" },
  { key: "visionboard", label: "Future" },
];

export default function ViewNavigation({ view, onNavigate }: {
  view: ViewKey;
  onNavigate: (view: ViewKey) => void;
}) {
  const reducedMotion = useReducedMotion();
  return <header className="view-navigation" data-theme={view === "overview" || view === "visionboard" ? "dark" : "light"} data-view={view}>
    <button type="button" className="site-name" onClick={() => onNavigate("overview")}>Elizabeth Hsu</button>
    <LayoutGroup id="primary-navigation"><nav aria-label="Primary">
      {items.map(item => <button type="button" key={item.key}
        aria-current={view === item.key ? "page" : undefined}
        onClick={() => onNavigate(item.key)}>{item.label}
        {view === item.key && <motion.span className="nav-underline" layoutId="active-tab" aria-hidden="true"
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} />}
      </button>)}
    </nav></LayoutGroup>
    <span>©2026</span>
  </header>;
}
