import { useState } from "react";
import type { ViewKey } from "@/lib/navigation";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import visionBoard2026 from "@/assets/vision-board-2026.jpg";
import visionBoardSummer2026 from "@/assets/vision-board-summer-2026.jpg";
import "./VisionBoardView.css";

const navigation: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" }, { key: "present", label: "Present" },
  { key: "past", label: "Past" }, { key: "visionboard", label: "Future" },
];
// Add future boards here; year tabs are generated from the available images.
const boards = [
  { term: "2026", year: "2026", image: visionBoard2026 },
  { term: "Summer 2026", year: "2026", image: visionBoardSummer2026 },
];
const years = [...new Set(boards.map(board => board.year))].sort().reverse();

export default function VisionBoardView({ onNavigate }: { onNavigate: (view: ViewKey) => void }) {
  const [selected, setSelected] = useState(boards[0]);
  const [expanded, setExpanded] = useState(false);
  const yearBoards = boards.filter(board => board.year === selected.year);

  return <main className="future-gallery">
    <header className="future-header">
      <button type="button" onClick={() => onNavigate("overview")}>Elizabeth Hsu™</button>
      <nav aria-label="Primary">{navigation.map(item => <button type="button" key={item.key} aria-current={item.key === "visionboard" ? "page" : undefined} onClick={() => onNavigate(item.key)}>{item.label}</button>)}</nav>
      <span>©2025-2026</span>
    </header>
    <h1 className="sr-only">Future vision boards</h1>
    <div className="future-selectors">
      <div className="future-years" role="group" aria-label="Vision board year">
        {years.map(year => <button type="button" key={year} aria-pressed={selected.year === year} onClick={() => setSelected(boards.find(board => board.year === year)!)}>{year}</button>)}
      </div>
      {yearBoards.length > 1 && <div className="future-terms" role="group" aria-label="Vision board">
        {yearBoards.map(board => <button type="button" key={board.term} aria-pressed={selected.term === board.term} onClick={() => setSelected(board)}>{board.term === board.year ? "Full year" : board.term.replace(` ${board.year}`, "")}</button>)}
      </div>}
    </div>
    <div className="future-mat">
      <button type="button" className="future-board" onClick={() => setExpanded(true)} aria-label={`Expand ${selected.term} vision board`}>
        <img src={selected.image} alt={`${selected.term} Vision Board`} />
      </button>
    </div>
    <Dialog open={expanded} onOpenChange={setExpanded}>
      <DialogContent className="max-w-[96vw] max-h-[96vh] border-0 bg-[#1a1a1a] text-[#eeebe4] p-8">
        <DialogTitle className="sr-only">{selected.term} Vision Board</DialogTitle>
        <img src={selected.image} alt={`${selected.term} Vision Board`} className="max-h-[85vh] w-full object-contain" />
      </DialogContent>
    </Dialog>
  </main>;
}
