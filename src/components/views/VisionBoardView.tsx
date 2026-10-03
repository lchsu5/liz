import type { ViewKey } from "@/lib/navigation";
import visionBoard2026 from "@/assets/vision-board-2026.jpg";
import visionBoardSummer2026 from "@/assets/vision-board-summer-2026.jpg";
import visionBoardFall2026 from "@/assets/Fall 2026 Vision Board.png";
import "./VisionBoardView.css";

const navigation: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" }, { key: "present", label: "Present" },
  { key: "past", label: "Past" }, { key: "visionboard", label: "Future" },
];
// Add future boards here; each image gets a bookmark and a section on the page.
const boards = [
  { id: "board-2026-year", term: "2026 Year", image: visionBoard2026 },
  { id: "board-2026-summer", term: "2026 Summer", image: visionBoardSummer2026 },
  { id: "board-2026-fall", term: "2026 Fall", image: visionBoardFall2026 },
];

export default function VisionBoardView({ onNavigate }: { onNavigate: (view: ViewKey) => void }) {
  return <main className="future-gallery">
    <header className="future-header">
      <button type="button" onClick={() => onNavigate("overview")}>Elizabeth Hsu™</button>
      <nav aria-label="Primary">{navigation.map(item => <button type="button" key={item.key} aria-current={item.key === "visionboard" ? "page" : undefined} onClick={() => onNavigate(item.key)}>{item.label}</button>)}</nav>
      <span>©2025-2026</span>
    </header>
    <h1 className="sr-only">Future vision boards</h1>
    <div className="future-selectors" role="group" aria-label="Vision board">
      {boards.map(board => <button type="button" key={board.id} aria-controls={board.id} onClick={() => document.getElementById(board.id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })}>{board.term}</button>)}
    </div>
    <div className="future-boards">
      {boards.map(board => <section key={board.id} id={board.id} className="future-section" aria-labelledby={`${board.id}-title`}>
        <h2 id={`${board.id}-title`}>{board.term}</h2>
        <div className="future-mat">
          <img className="future-board" src={board.image} alt={`${board.term} Vision Board`} />
        </div>
      </section>)}
    </div>
  </main>;
}
