import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PillNav, { ViewKey } from "@/components/PillNav";
import CursorGlow from "@/components/CursorGlow";
import OverviewView from "@/components/views/OverviewView";
import CurrentlyView from "@/components/views/CurrentlyView";
import BeforeView from "@/components/views/BeforeView";
import ResearchView from "@/components/views/ResearchView";

const VIEW_META: Record<ViewKey, { index: string; label: string }> = {
  overview: { index: "01", label: "Overview" },
  currently: { index: "02", label: "Currently" },
  before: { index: "03", label: "Before" },
  research: { index: "04", label: "Research" },
};

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
      <CursorGlow />

      {/* Header — split two-zone bar: wordmark left, live section index right */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/70">
        <div className="px-5 md:px-10 h-16 md:h-20 flex items-stretch justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("overview");
            }}
            className="flex items-center font-display text-[16px] md:text-[19px] tracking-[0.04em] uppercase text-foreground hover:text-accent transition-colors duration-300"
          >
            Elizabeth <span className="italic text-accent">Hsu</span>
          </a>

          <div className="hidden sm:flex items-center gap-5 pl-6 border-l border-border/70">
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              {VIEW_META[view].index} <span className="text-foreground/30 mx-1">/</span> 04
            </span>
            <span className="font-display text-[15px] text-accent italic">
              {VIEW_META[view].label}
            </span>
          </div>
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
