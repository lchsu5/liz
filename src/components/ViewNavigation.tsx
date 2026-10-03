import type { ViewKey } from "@/lib/navigation";

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
  return <header className="view-navigation" data-theme={view === "visionboard" ? "dark" : "light"}>
    <button type="button" className="site-name" onClick={() => onNavigate("overview")}>Elizabeth Hsu</button>
    <nav aria-label="Primary">
      {items.map(item => <button type="button" key={item.key}
        aria-current={view === item.key ? "page" : undefined}
        onClick={() => onNavigate(item.key)}>{item.label}</button>)}
    </nav>
    <span>©2026</span>
  </header>;
}
