import visionBoard2026 from "@/assets/vision-board-2026.jpg";
import visionBoardSummer2026 from "@/assets/vision-board-summer-2026.jpg";
import visionBoardFall2026 from "@/assets/vision-board-fall-2026.jpg";
import "./VisionBoardView.css";

// Add future boards here; each image gets a bookmark and a section on the page.
const boards = [
  { id: "board-2026-year", term: "2026 Year", image: visionBoard2026, width: 2400, height: 1396 },
  { id: "board-2026-summer", term: "2026 Summer", image: visionBoardSummer2026, width: 2400, height: 1210 },
  { id: "board-2026-fall", term: "2026 Fall", image: visionBoardFall2026, width: 6831, height: 3897 },
];

export default function VisionBoardView() {
  return <main className="future-gallery">

    <h1 className="sr-only">Future vision boards</h1>
    <nav className="future-timeline" aria-label="Vision board timeline">
      <ol>
        {boards.map(board => <li key={board.id}>
          <a href={`#${board.id}`} onClick={event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const section = document.getElementById(board.id);
            if (!section) return;
            event.preventDefault();
            section.focus({ preventScroll: true });
            section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
          }}>{board.term}</a>
        </li>)}
      </ol>
    </nav>
    <div className="future-boards">
      {boards.map((board, index) => <section key={board.id} id={board.id} className="future-section" aria-labelledby={`${board.id}-title`} tabIndex={-1}>
        <h2 id={`${board.id}-title`}>{board.term}</h2>
        <div className="future-mat">
          <img className="future-board" src={board.image} alt={`${board.term} Vision Board`} width={board.width} height={board.height} loading={index > 0 ? "lazy" : undefined} />
        </div>
      </section>)}
    </div>
  </main>;
}
