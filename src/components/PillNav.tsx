import { motion } from "framer-motion";

export type ViewKey = "overview" | "currently" | "before" | "research";

const items: { key: ViewKey; index: string; label: string }[] = [
  { key: "overview", index: "01", label: "Overview" },
  { key: "currently", index: "02", label: "Currently" },
  { key: "before", index: "03", label: "Before" },
  { key: "research", index: "04", label: "Research" },
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
      {/* Desktop — vertical index rail pinned to the left edge */}
      <motion.nav
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 flex-col items-start pl-5 pr-6 py-6 border-r border-border/70 bg-background/70 backdrop-blur-xl rounded-r-2xl"
        aria-label="Primary"
      >
        <ul className="relative flex flex-col gap-7 border-l border-border pl-5">
          {items.map((it) => {
            const isActive = it.key === active;
            return (
              <li key={it.key} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="rail-active"
                    className="absolute -left-5 top-0 bottom-0 w-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <button
                  onClick={() => onChange(it.key)}
                  className="group flex items-baseline gap-3 text-left"
                >
                  <span
                    className={`font-body text-[9px] tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                    }`}
                  >
                    {it.index}
                  </span>
                  <span
                    className={`font-display text-[15px] leading-none transition-colors duration-300 ${
                      isActive ? "text-foreground italic" : "text-muted-foreground group-hover:text-foreground/80"
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
              className={`relative flex flex-col items-center gap-1 py-3.5 font-body text-[9px] tracking-[0.14em] uppercase border-r last:border-r-0 border-border/60 transition-colors duration-300 ${
                isActive ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {it.label}
            </button>
          );
        })}
      </motion.nav>
    </>
  );
}
