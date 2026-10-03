import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ViewKey } from "@/lib/navigation";
import OverviewView from "@/components/views/OverviewView";
import PresentView from "@/components/views/PresentView";
import BeforeView from "@/components/views/BeforeView";
import VisionBoardView from "@/components/views/VisionBoardView";

const Index = () => {
  const [view, setView] = useState<ViewKey>("overview");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [view]);
  const renderView = () => {
    switch (view) {
      case "overview": return <OverviewView onNavigate={setView} />;
      case "present": return <PresentView onNavigate={setView} />;
      case "past": return <BeforeView onNavigate={setView} />;
      case "visionboard": return <VisionBoardView onNavigate={setView} />;
    }
  };
  return <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
    <AnimatePresence mode="wait">
      <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
        {renderView()}
      </motion.div>
    </AnimatePresence>
  </div>;
};
export default Index;
