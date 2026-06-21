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
    <motion.nav
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      aria-label="Primary"
    >
      <ul className="flex items-center gap-1 rounded-full border border-[hsl(var(--foreground)/0.14)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl px-1.5 py-1.5 shadow-[0_10px_40px_-10px_hsl(0_0%_0%/0.35)]">
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <li key={it.key} className="relative">
              <button
                onClick={() => onChange(it.key)}
                className={`relative z-10 px-4 sm:px-5 py-2 rounded-full font-body text-[11px] sm:text-[12px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-[hsl(var(--accent-foreground))]"
                    : "text-[hsl(var(--foreground)/0.7)] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill-active"
                    className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
