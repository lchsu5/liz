import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ViewKey } from "@/lib/navigation";
import ViewNavigation from "@/components/ViewNavigation";
import OverviewView from "@/components/views/OverviewView";
import PresentView from "@/components/views/PresentView";
import BeforeView from "@/components/views/BeforeView";
import VisionBoardView from "@/components/views/VisionBoardView";

import ResumeView from "@/components/views/ResumeView";

const Index = () => {
  const [view, setView] = useState<ViewKey>("overview");

  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  const isResume = pathname.startsWith("/resume");
  const activeView = isResume ? "resume" : view;

  const navigate = (next: ViewKey) => {
    if (!isResume && next === view) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setView(next);
    if (isResume) navigateTo("/");
  };
  const renderView = () => {
    switch (view) {
      case "overview": return <OverviewView />;
      case "present": return <PresentView />;
      case "past": return <BeforeView />;
      case "visionboard": return <VisionBoardView />;
    }
  };
  return <div className="view-shell" data-view={activeView} data-theme={activeView === "overview" || activeView === "visionboard" ? "dark" : "light"}>
    <ViewNavigation view={activeView} onNavigate={navigate} />
    <div className="view-panel">{isResume ? <ResumeView /> : renderView()}</div>
    <footer className="site-footer">
      <span>©2026</span>
      <a href="mailto:lchsu@andrew.cmu.edu">CONTACT: LCHSU@ANDREW.CMU.EDU</a>
    </footer>
  </div>;
};
export default Index;
