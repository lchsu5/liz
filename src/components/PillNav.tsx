import { motion } from "framer-motion";

export type ViewKey = "overview" | "present" | "past" | "visionboard";

const items: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "present", label: "Present" },
  { key: "past", label: "Past" },
  { key: "visionboard", label: "Future" },
];

export default function PillNav({
  active,
  onChange,
}: {
  active: ViewKey;
  onChange: (k: ViewKey) => void;
}) {
  return (
    <motion.nav
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-1 p-1.5 w-fit max-w-[calc(100%-2rem)] mx-auto rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-[0_8px_30px_hsl(var(--foreground)/0.05)] ring-1 ring-foreground/5"
      aria-label="Primary"
    >
      {items.map((it) => {
        const isActive = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className="relative px-3.5 py-2 font-body text-[10px] font-medium tracking-wide uppercase rounded-full transition-colors duration-200"
          >
            {isActive && (
              <motion.span
                layoutId="activeMobileNavPill"
                className="absolute inset-0 bg-accent rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                isActive ? "text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
