import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PillNav, { ViewKey } from "@/components/PillNav";
import OverviewView from "@/components/views/OverviewView";
import CurrentlyView from "@/components/views/CurrentlyView";
import BeforeView from "@/components/views/BeforeView";
import ResearchView from "@/components/views/ResearchView";

const NAV_ITEMS: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "currently", label: "Currently" },
  { key: "before", label: "Before" },
  { key: "research", label: "Research" },
];

const Index = () => {
  const [view, setView] = useState<ViewKey>("overview");

  // Reset scroll to top whenever the active view changes (tab-like behavior).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [view]);

  const renderView = () => {
    switch (view) {
      case "overview":
        return <OverviewView />;
      case "currently":
        return <CurrentlyView />;
      case "before":
        return <BeforeView />;
      case "research":
        return <ResearchView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Floating glass editorial header */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center justify-between h-14 w-[calc(100%-3rem)] max-w-5xl px-2 pl-6 pr-2 rounded-full border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_8px_30px_hsl(var(--foreground)/0.04)] ring-1 ring-foreground/5"
      >
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setView("overview");
          }}
          className="group flex items-center gap-2.5 select-none"
        >
          <span className="font-display text-xl tracking-tight text-foreground">
            Elizabeth Hsu
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
        </a>

        {/* Pill nav */}
        <nav className="flex items-center gap-1 p-1 rounded-full bg-foreground/5" aria-label="Primary">
          {NAV_ITEMS.map((it) => {
            const isActive = it.key === view;
            return (
              <button
                key={it.key}
                onClick={() => setView(it.key)}
                className="relative px-4 py-1.5 font-body text-[13px] font-medium rounded-full transition-colors duration-200"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-accent rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {it.label}
                </span>
              </button>
            );
          })}
        </nav>
      </motion.header>

      {/* Mobile wordmark bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/70">
        <div className="px-5 h-14 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("overview");
            }}
            className="flex items-center gap-2"
          >
            <span className="font-display text-lg tracking-tight text-foreground">
              Elizabeth Hsu
            </span>
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1 w-1 bg-accent" />
            </span>
          </a>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>

      <PillNav active={view} onChange={setView} />
    </div>
  );
};

export default Index;
