import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ViewKey } from "@/lib/navigation";
import ViewNavigation from "@/components/ViewNavigation";
import OverviewView from "@/components/views/OverviewView";
import PresentView from "@/components/views/PresentView";
import BeforeView from "@/components/views/BeforeView";
import VisionBoardView from "@/components/views/VisionBoardView";

const viewOrder: ViewKey[] = ["overview", "present", "past", "visionboard"];
const slideDistance = 36;
const exitDuration = 0.25;
const enterDuration = 0.4;
type ViewTransition = { direction: number; reducedMotion: boolean };
const variants: Variants = {
  enter: ({ direction }: ViewTransition) => ({ opacity: 0, x: direction * slideDistance }),
  visible: ({ reducedMotion }: ViewTransition) => ({
    opacity: 1, x: 0,
    pointerEvents: "auto",
    transition: { duration: reducedMotion ? 0 : enterDuration, ease: [0.22, 1, 0.36, 1] },
  }),
  leave: ({ direction, reducedMotion }: ViewTransition) => ({
    opacity: 0,
    x: direction * -slideDistance,
    pointerEvents: "none" as const,
    transition: { duration: reducedMotion ? 0 : exitDuration, ease: [0.4, 0, 1, 1] },
  }),
};

const Index = () => {
  const [view, setView] = useState<ViewKey>("overview");
  const [displayedView, setDisplayedView] = useState<ViewKey>("overview");
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const viewTransition = { direction: reducedMotion ? 0 : direction, reducedMotion: !!reducedMotion };
  const navigate = (next: ViewKey) => {
    if (next === view) return;
    setDirection(viewOrder.indexOf(next) > viewOrder.indexOf(displayedView) ? 1 : -1);
    setView(next);
  };
  const renderView = () => {
    switch (view) {
      case "overview": return <OverviewView />;
      case "present": return <PresentView />;
      case "past": return <BeforeView />;
      case "visionboard": return <VisionBoardView />;
    }
  };
  return <div className="view-shell" data-theme={displayedView === "overview" || displayedView === "visionboard" ? "dark" : "light"}>
    <ViewNavigation view={view} onNavigate={navigate} />
    <AnimatePresence initial={false} mode="wait" custom={viewTransition}
      onExitComplete={() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setDisplayedView(view);
      }}>
      <motion.div key={view} className="view-panel" custom={viewTransition} variants={variants}
        initial="enter" animate="visible" exit="leave">
        {renderView()}
      </motion.div>
    </AnimatePresence>
  </div>;
};
export default Index;
