import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PillNav, { ViewKey } from "@/components/PillNav";
import CursorGlow from "@/components/CursorGlow";
import OverviewView from "@/components/views/OverviewView";
import CurrentlyView from "@/components/views/CurrentlyView";
import BeforeView from "@/components/views/BeforeView";
import ResearchView from "@/components/views/ResearchView";
import AboutView from "@/components/views/AboutView";

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
      case "about":
        return <AboutView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <CursorGlow />

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setView("overview");
        }}
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50 font-display text-[16px] tracking-tight text-foreground/90 hover:text-accent transition-colors"
      >
        Elizabeth Hsu
      </a>

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
