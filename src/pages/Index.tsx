import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import CoursesSection from "@/components/CoursesSection";
import HonorsSection from "@/components/HonorsSection";
import LanguagesSection from "@/components/LanguagesSection";
import CampusSection from "@/components/CampusSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <PublicationsSection />
        <CoursesSection />
        <HonorsSection />
        <LanguagesSection />
        <CampusSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
