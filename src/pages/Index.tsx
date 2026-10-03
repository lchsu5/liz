import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useAnimationControls, usePresence, usePresenceData, useReducedMotion } from "framer-motion";
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
const reducedMotionDuration = 0.15;
type Direction = 1 | -1;
type ViewTransition = { direction: Direction; reducedMotion: boolean };
type NavigationState = {
  view: ViewKey;
  displayedView: ViewKey;
  direction: Direction;
  isExiting: boolean;
  pageInstance: number;
};
const variants: Variants = {
  enter: ({ direction, reducedMotion }: ViewTransition) => ({
    opacity: 0, x: reducedMotion ? 0 : direction * slideDistance,
  }),
  visible: ({ reducedMotion }: ViewTransition) => ({
    opacity: 1, x: 0,
    pointerEvents: "auto",
    transition: { duration: reducedMotion ? reducedMotionDuration : enterDuration, ease: [0.2, 0.8, 0.2, 1] },
  }),
  leave: ({ direction, reducedMotion }: ViewTransition) => ({
    opacity: 0,
    x: reducedMotion ? 0 : direction * -slideDistance,
    pointerEvents: "none" as const,
    transition: { duration: reducedMotion ? reducedMotionDuration : exitDuration, ease: "easeIn" },
  }),
};

function PagePanel({ children, custom }: { children: ReactNode; custom: ViewTransition }) {
  const [isPresent, safeToRemove] = usePresence();
  const transition = (usePresenceData() as ViewTransition | undefined) ?? custom;
  const { direction, reducedMotion } = transition;
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    // Explicit completion lets the latest custom direction retarget an exit.
    // Framer Motion's automatic exit freezes its target once it has started.
    controls.start(isPresent ? "visible" : "leave").then(() => {
      if (!cancelled && !isPresent) safeToRemove?.();
    });
    return () => { cancelled = true; };
  }, [controls, isPresent, direction, reducedMotion, safeToRemove]);

  return <motion.div className="view-panel" custom={transition} variants={variants}
    initial="enter" animate={controls}>
    {children}
  </motion.div>;
}

const Index = () => {
  const [{ view, displayedView, direction, isExiting, pageInstance }, setNavigation] = useState<NavigationState>({
    view: "overview", displayedView: "overview", direction: 1, isExiting: false, pageInstance: 0,
  });
  const reducedMotion = useReducedMotion();
  const viewTransition: ViewTransition = { direction, reducedMotion: !!reducedMotion };
  const navigate = (next: ViewKey) => {
    setNavigation(current => {
      if (next === current.view) return current;
      return {
        ...current,
        view: next,
        direction: viewOrder.indexOf(next) > viewOrder.indexOf(current.displayedView) ? 1 : -1,
        // Keep the outgoing page removed until its exit completes, even if
        // another click selects it again. Only the latest destination mounts.
        isExiting: true,
      };
    });
  };
  const renderView = () => {
    switch (displayedView) {
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
        setNavigation(current => ({
          ...current, displayedView: current.view, isExiting: false,
          // A fresh key also replays enter when the latest click returns to
          // the page that just exited.
          pageInstance: current.pageInstance + 1,
        }));
      }}>
      {!isExiting && <PagePanel key={`${displayedView}-${pageInstance}`} custom={viewTransition}>
        {renderView()}
      </PagePanel>}
    </AnimatePresence>
  </div>;
};
export default Index;
