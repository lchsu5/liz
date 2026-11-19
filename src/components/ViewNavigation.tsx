import type { ViewKey } from "@/lib/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const header = useRef<HTMLElement>(null);
  const [overHero, setOverHero] = useState(true);
  useLayoutEffect(() => {
    if (view !== "overview") return;
    const update = () => {
      const hero = document.getElementById("hero");
      setOverHero(!hero || hero.getBoundingClientRect().bottom > (header.current?.getBoundingClientRect().bottom ?? 0));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [view]);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit",
  }));
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit",
    })), 10000);
    return () => clearInterval(interval);
  }, []);
  return <header ref={header} className="view-navigation" data-theme={view === "overview" || view === "visionboard" ? "dark" : "light"} data-view={view} data-over-hero={overHero}>
    <button type="button" className="site-name" onClick={() => onNavigate("overview")}>Elizabeth Hsu</button>
    <nav aria-label="Primary">
      {items.map(item => <button type="button" key={item.key}
        aria-current={view === item.key ? "page" : undefined}
        onClick={() => onNavigate(item.key)}>{item.label}
      </button>)}
    </nav>
    <span className="location-time">Irvine, CA <span>{time}</span></span>
  </header>;
}
