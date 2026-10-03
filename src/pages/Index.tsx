import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ViewKey } from "@/lib/navigation";
import ViewNavigation from "@/components/ViewNavigation";
import OverviewView from "@/components/views/OverviewView";
import PresentView from "@/components/views/PresentView";
import BeforeView from "@/components/views/BeforeView";
import VisionBoardView from "@/components/views/VisionBoardView";

const Index = () => {
  const [view, setView] = useState<ViewKey>("overview");
  const reducedMotion = useReducedMotion();
  const renderView = () => {
    switch (view) {
      case "overview": return <OverviewView onNavigate={setView} />;
      case "present": return <PresentView />;
      case "past": return <BeforeView />;
      case "visionboard": return <VisionBoardView />;
    }
  };
  return <div className="view-shell" data-theme={view === "overview" || view === "visionboard" ? "dark" : "light"}>
    {view !== "overview" && <ViewNavigation view={view} onNavigate={setView} />}
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}>
      <motion.div key={view} initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: reducedMotion ? 0 : 0.24, ease: "easeOut" } }}
        exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.14, ease: "easeIn" } }}>
        {renderView()}
      </motion.div>
    </AnimatePresence>
  </div>;
};
export default Index;
