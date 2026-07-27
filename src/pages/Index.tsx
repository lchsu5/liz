import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PillNav, { ViewKey } from "@/components/PillNav";
import logo from "@/assets/logo.png";
import OverviewView from "@/components/views/OverviewView";
import CurrentlyView from "@/components/views/CurrentlyView";
import BeforeView from "@/components/views/BeforeView";
import VisionBoardView from "@/components/views/VisionBoardView";

const NAV_ITEMS: { key: ViewKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "present", label: "Present" },
  { key: "past", label: "Past" },
  { key: "visionboard", label: "Vision Board" },
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
      case "present":
        return <CurrentlyView />;
      case "past":
        return <BeforeView />;
      case "visionboard":
        return <VisionBoardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Floating glass editorial header */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-6 right-6 z-50 hidden md:flex items-center justify-between h-14 max-w-5xl mx-auto px-2 pl-6 pr-2 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl shadow-[0_8px_30px_hsl(var(--foreground)/0.05)] ring-1 ring-foreground/5"
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
          <span className="relative block h-9 w-9 overflow-hidden rounded-md">
            <img
              src={logo}
              alt="Elizabeth Hsu"
              className="absolute max-w-none"
              style={{ width: 70, height: 70, top: -13, left: -17 }}
            />
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
            <span className="relative block h-8 w-8 overflow-hidden rounded-md">
              <img
                src={logo}
                alt="Elizabeth Hsu"
                className="absolute max-w-none"
                style={{ width: 62, height: 62, top: -11, left: -15 }}
              />
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
          className="pb-24 md:pb-0"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>

      <PillNav active={view} onChange={setView} />
    </div>
  );
};

export default Index;
