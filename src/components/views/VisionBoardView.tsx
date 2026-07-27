import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import visionBoard2026 from "@/assets/vision-board-2026.jpg";
import visionBoardSummer2026 from "@/assets/vision-board-summer-2026.jpg";

interface Board {
  /** Rendered as "{term} Vision Board", e.g. "Summer 2026 Vision Board" */
  term: string;
  year: string;
  /** Controls ordering within a year — newer sorts first. */
  sortKey: string;
  image: string;
}

// Add a new board here as it's made — group under its year automatically.
const boards: Board[] = [
  { term: "2026", year: "2026", sortKey: "2026-01", image: visionBoard2026 },
  { term: "Summer 2026", year: "2026", sortKey: "2026-06", image: visionBoardSummer2026 },
];

export default function VisionBoardView() {
  const [filter, setFilter] = useState<"All" | string>("All");
  const [lightbox, setLightbox] = useState<Board | null>(null);

  const years = useMemo(
    () => Array.from(new Set(boards.map((b) => b.year))).sort((a, b) => b.localeCompare(a)),
    []
  );

  const grouped = useMemo(() => {
    const filtered = filter === "All" ? boards : boards.filter((b) => b.year === filter);
    const byYear = new Map<string, Board[]>();
    for (const b of filtered) {
      if (!byYear.has(b.year)) byYear.set(b.year, []);
      byYear.get(b.year)!.push(b);
    }
    for (const list of byYear.values()) {
      list.sort((a, c) => c.sortKey.localeCompare(a.sortKey));
    }
    return Array.from(byYear.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filter]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <main className="min-h-screen px-6 md:px-12 pt-20 md:pt-24 pb-24 md:pb-32">
      <ThemeController />
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Vision Board"
            description="Seasonal boards of what's ahead — one per term, posted as they're made."
          />
        </motion.div>

        {/* Year chips — keeps the archive scannable as more boards get posted */}
        {years.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-12 -mt-4">
            {(["All", ...years] as const).map((y) => {
              const count = y === "All" ? boards.length : boards.filter((b) => b.year === y).length;
              const active = filter === y;
              return (
                <button
                  key={y}
                  onClick={() => setFilter(y)}
                  className={`font-body text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-sm transition-colors duration-150 ${
                    active
                      ? "border-transparent text-accent-foreground bg-accent"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {y} <span className={`ml-1 ${active ? "opacity-70" : "opacity-50"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-16">
          {grouped.map(([year, yearBoards]) => (
            <div key={year}>
              <p className="font-body text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                {year}
              </p>
              <div className="flex flex-col gap-6">
                {yearBoards.map((board, i) => (
                  <motion.button
                    key={board.term}
                    type="button"
                    onClick={() => setLightbox(board)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative block w-full rounded-lg border border-border overflow-hidden lift-card text-left"
                  >
                    <img
                      src={board.image}
                      alt={`${board.term} Vision Board`}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    <div className="absolute left-5 md:left-7 bottom-4 md:bottom-5 pointer-events-none">
                      <p className="font-display text-white text-[22px] md:text-[26px] leading-none">
                        {board.term} Vision Board
                      </p>
                    </div>
                    <span className="absolute right-5 top-4 font-body text-[9px] tracking-[0.14em] uppercase text-white/0 group-hover:text-white/80 transition-colors duration-200">
                      Click to expand
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for the next board — naming convention: "{Term} Vision Board" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group w-full mt-16 flex flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed border-border py-14 hover:border-accent/50 hover:bg-secondary/25 transition-colors duration-200"
        >
          <Plus size={20} strokeWidth={1.5} className="text-muted-foreground/40 group-hover:text-accent/70 transition-colors duration-200" />
          <span className="font-body text-[9px] tracking-[0.16em] uppercase text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-200">
            Next board goes here — e.g. "Fall 2026 Vision Board"
          </span>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors duration-150"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-4 max-w-full max-h-full"
            >
              <img
                src={lightbox.image}
                alt={`${lightbox.term} Vision Board`}
                className="max-w-[95vw] max-h-[82vh] w-auto h-auto object-contain rounded-md"
              />
              <p className="font-display text-white text-[18px]">{lightbox.term} Vision Board</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
