import type { ViewKey } from "@/lib/navigation";
import { useEffect, useState } from "react";
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
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit",
  }));
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit",
    })), 10000);
    return () => clearInterval(interval);
  }, []);
  return <header className="view-navigation" data-theme={view === "overview" || view === "visionboard" ? "dark" : "light"} data-view={view}>
    <button type="button" className="site-name" onClick={() => onNavigate("overview")}>Elizabeth Hsu</button>
    <LayoutGroup id="primary-navigation"><nav aria-label="Primary">
      {items.map(item => <button type="button" key={item.key}
        aria-current={view === item.key ? "page" : undefined}
        onClick={() => onNavigate(item.key)}>{item.label}
        {view === item.key && <motion.span className="nav-underline" layoutId="active-tab" aria-hidden="true"
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.7, 0, 0.3, 1] }} />}
      </button>)}
    </nav></LayoutGroup>
    <span className="location-time">Irvine, CA <span>{time}</span></span>
  </header>;
}
