import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play } from "lucide-react";

const videos = [
  { title: "Restaurant Review", platform: "TikTok" },
  { title: "Recipe Walkthrough", platform: "Instagram" },
  { title: "Café Experience", platform: "YouTube" },
  { title: "Product Unboxing", platform: "TikTok" },
  { title: "Behind the Scenes", platform: "Instagram" },
  { title: "Brand Collaboration", platform: "YouTube" },
];

export default function VideoGridSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="work" className="py-24 md:py-32 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
          Portfolio
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4 text-center">
          My Work
        </h2>
        <p className="font-body text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Demonstrating high-retention editing, clean color-grading, and lifestyle pacing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="relative aspect-[9/16] bg-card border border-border overflow-hidden group cursor-pointer hover:border-warm-tan transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:bg-foreground/5 group-hover:border-foreground/40 transition-all duration-300">
                  <Play className="w-6 h-6 text-foreground/50 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-body text-sm font-medium text-foreground">{video.title}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{video.platform}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 font-body text-sm text-muted-foreground text-center">
          Replace placeholders with your YouTube, TikTok, or Instagram embed links
        </p>
      </div>
    </section>
  );
}
