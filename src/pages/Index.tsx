import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PillNav, { ViewKey } from "@/components/PillNav";
import CursorGlow from "@/components/CursorGlow";
import OverviewView from "@/components/views/OverviewView";
import CurrentlyView from "@/components/views/CurrentlyView";
import BeforeView from "@/components/views/BeforeView";
import ResearchView from "@/components/views/ResearchView";

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

      {/* Sticky wordmark bar — solid bg so it never collides with content */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("overview");
            }}
            className="font-display text-[15px] md:text-[17px] tracking-[0.04em] uppercase text-foreground hover:text-accent transition-colors"
          >
            Elizabeth <span className="italic text-accent">Hsu</span>
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
