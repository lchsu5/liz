import { motion } from "framer-motion";
import { ImagePlus, Target, Quote, Flag, Plus } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";

type VisionItemType = "image" | "goal" | "quote" | "milestone";

interface VisionItem {
  type: VisionItemType;
  span: string;
}

interface Board {
  /** e.g. "Summer 2026" — rendered as "{term} Vision Board" */
  term: string;
  items: VisionItem[];
}

// Add a new board by pushing { term: "...", items: [...] } — grid fills itself in.
const boards: Board[] = [
  {
    term: "Summer 2026",
    items: [
      { type: "image", span: "col-span-2 row-span-2" },
      { type: "goal", span: "col-span-1 row-span-1" },
      { type: "quote", span: "col-span-1 row-span-1" },
      { type: "image", span: "col-span-1 row-span-1" },
      { type: "milestone", span: "col-span-1 row-span-1" },
      { type: "image", span: "col-span-2 row-span-1" },
      { type: "goal", span: "col-span-1 row-span-1" },
    ],
  },
];

const ICONS: Record<VisionItemType, typeof ImagePlus> = {
  image: ImagePlus,
  goal: Target,
  quote: Quote,
  milestone: Flag,
};

const LABELS: Record<VisionItemType, string> = {
  image: "Add Image",
  goal: "Add Goal",
  quote: "Add Quote",
  milestone: "Add Milestone",
};

function VisionCard({ item, index }: { item: VisionItem; index: number }) {
  const Icon = ICONS[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed border-border bg-secondary/25 hover:border-accent/50 hover:bg-secondary/40 transition-colors duration-200 ${item.span}`}
    >
      <Icon size={20} strokeWidth={1.5} className="text-muted-foreground/40 group-hover:text-accent/70 transition-colors duration-200" />
      <span className="font-body text-[9px] tracking-[0.16em] uppercase text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-200">
        {LABELS[item.type]}
      </span>
    </motion.div>
  );
}

function VisionBoard({ board, index }: { board: Board; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={index > 0 ? "mt-20" : ""}
    >
      <SectionHeader
        title={`${board.term} Vision Board`}
        description="A working board of images, goals, and intentions for this season — fill in the placeholders below."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[130px] md:auto-rows-[150px] gap-3 md:gap-4">
        {board.items.map((item, i) => (
          <VisionCard key={i} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function VisionBoardView() {
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
            description="Seasonal boards of what's ahead — one set per term, filled in as goals take shape."
          />
        </motion.div>

        {boards.map((board, i) => (
          <VisionBoard key={board.term} board={board} index={i} />
        ))}

        {/* Placeholder for the next board — naming convention: "{Term} Vision Board", e.g. Summer 2026 Vision Board */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group w-full mt-20 flex flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed border-border py-14 hover:border-accent/50 hover:bg-secondary/25 transition-colors duration-200"
        >
          <Plus size={20} strokeWidth={1.5} className="text-muted-foreground/40 group-hover:text-accent/70 transition-colors duration-200" />
          <span className="font-body text-[9px] tracking-[0.16em] uppercase text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-200">
            New Vision Board — e.g. "Summer 2026 Vision Board"
          </span>
        </motion.button>
      </div>
    </main>
  );
}
