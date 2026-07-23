import { motion } from "framer-motion";

export type ViewKey = "overview" | "currently" | "before" | "research";

const items: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "currently", label: "Currently" },
  { key: "before", label: "Before" },
  { key: "research", label: "Research" },
];

export default function PillNav({
  active,
  onChange,
}: {
  active: ViewKey;
  onChange: (k: ViewKey) => void;
}) {
  return (
    <>
      {/* Desktop — horizontal index nav pinned to the top-right edge */}
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex fixed top-0 right-0 z-50 h-16 md:h-20 items-center pl-8 pr-5 md:pr-10 border-l border-border/70 bg-background/70 backdrop-blur-xl"
        aria-label="Primary"
      >
        <ul className="flex items-center gap-1">
          {items.map((it) => {
            const isActive = it.key === active;
            return (
              <li key={it.key}>
                <button
                  onClick={() => onChange(it.key)}
                  className={`group flex items-baseline gap-2 rounded-sm px-3 py-1.5 transition-colors duration-150 ${
                    isActive ? "bg-accent" : "hover:bg-secondary"
                  }`}
                >
                  <span
                    className={`font-body text-[11px] tracking-[0.04em] uppercase transition-colors duration-150 ${
                      isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {it.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Mobile — compact bottom bar with hard-edged segments */}
      <motion.nav
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-border bg-background/90 backdrop-blur-xl"
        aria-label="Primary"
      >
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`flex flex-col items-center gap-1 py-3.5 font-body text-[9px] tracking-[0.14em] uppercase border-r last:border-r-0 border-border/60 transition-colors duration-150 ${
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </motion.nav>
    </>
  );
}
