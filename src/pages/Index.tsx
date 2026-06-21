import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import VideoGallery from "@/components/blocks/VideoGallery";
import type { Gallery4Item } from "@/components/blocks/VideoGallery";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import BrandsSection from "@/components/BrandsSection";
import ContactSection from "@/components/ContactSection";
import CampusSection from "@/components/CampusSection";
import Footer from "@/components/Footer";

const Divider = () => (
  <div className="px-6">
    <div className="max-w-6xl mx-auto border-t border-border" />
  </div>
);

const videoItems: Gallery4Item[] = [
  { id: "1", title: "Restaurant Review", description: "Wara Bistro, Irvine, CA", href: "#", video: "/videos/wara-bistro.MOV", audio: true, category: "Restaurant Review" },
  { id: "2", title: "Restaurant Review", description: "Press & Moka, Irvine, CA", href: "#", video: "/videos/press-moka.MOV", audio: true, category: "Restaurant Review" },
  { id: "3", title: "Catering Services", description: "syksdesserts, OC's Best Banana Pudding", href: "#", video: "/videos/skysdesserts.MOV", audio: true, category: "Catering" },
  { id: "4", title: "Lifestyle", description: "", href: "#", video: "/videos/lifestyle-1.MOV", audio: true, category: "Lifestyle" },
  { id: "5", title: "Lifestyle", description: "", href: "#", video: "/videos/lyfe.MOV", audio: true, category: "Lifestyle" },
  { id: "6", title: "Restaurant Review", description: "Ocean 48, Newport, CA", href: "#", video: "/videos/ocean-48.MOV", audio: true, category: "Restaurant Review" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Divider />
        <BrandsSection />
        <MetricsSection />
        <Divider />
        <CampusSection />
        <Divider />
        <VideoGallery
          title="My Work"
          description="Demonstrating high-retention editing, clean color-grading, and lifestyle pacing."
          items={videoItems}
        />
        <Divider />
        <ContactSection />
        <Divider />
        <PhotoGallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
