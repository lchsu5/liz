import { useState } from "react";
import type { ViewKey } from "@/lib/navigation";
import ViewNavigation from "@/components/ViewNavigation";
import OverviewView from "@/components/views/OverviewView";
import PresentView from "@/components/views/PresentView";
import BeforeView from "@/components/views/BeforeView";
import VisionBoardView from "@/components/views/VisionBoardView";

const Index = () => {
  const [view, setView] = useState<ViewKey>("overview");

  const navigate = (next: ViewKey) => {
    if (next === view) return;
    window.scrollTo({ top: 0, behavior: "instant" });
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
  return <div className="view-shell" data-view={view} data-theme={view === "overview" || view === "visionboard" ? "dark" : "light"}>
    <ViewNavigation view={view} onNavigate={navigate} />
    <div className="view-panel">{renderView()}</div>
    <footer className="site-footer">
      <span>©2026</span>
      <a href="mailto:lchsu@andrew.cmu.edu">CONTACT: LCHSU@ANDREW.CMU.EDU</a>
    </footer>
  </div>;
};
export default Index;
