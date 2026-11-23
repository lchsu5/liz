import type { ViewKey } from "@/lib/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

type NavigationView = ViewKey | "resume";

const items: { key: NavigationView; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "present", label: "Present" },
  { key: "past", label: "Past" },
  { key: "visionboard", label: "Future" },
  { key: "resume", label: "Resume" },
];

export default function ViewNavigation({ view, onNavigate }: {
  view: NavigationView;
  onNavigate: (view: NavigationView) => void;
}) {
  const [{ hidden, atTop }, setScrollState] = useState({ hidden: false, atTop: true });
  useLayoutEffect(() => {
    const scrollPosition = () => Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
    let anchor = scrollPosition();
    let hidden = false;
    let atTop = anchor <= 8;
    setScrollState({ hidden, atTop });

    const update = () => {
      const position = scrollPosition();
      const nextAtTop = position <= 8;
      const nextHidden = !nextAtTop && (hidden ? anchor - position < 12 : position - anchor >= 24);
      if (nextHidden !== hidden || nextAtTop) anchor = position;
      else anchor = hidden ? Math.max(anchor, position) : Math.min(anchor, position);

      if (nextHidden !== hidden || nextAtTop !== atTop) {
        hidden = nextHidden;
        atTop = nextAtTop;
        setScrollState({ hidden, atTop });
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
  return <header className="view-navigation" data-theme={view === "visionboard" ? "dark" : "light"} data-view={view} data-at-top={atTop} data-hidden={hidden}>
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
