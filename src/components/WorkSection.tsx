import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play } from "lucide-react";

export default function WorkSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="work" className="py-24 md:py-32 px-6">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Portfolio
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-12">
          My Work
        </h2>

        {/* Video placeholder */}
        <div className="relative aspect-video bg-card border border-border overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-foreground/30 flex items-center justify-center group-hover:bg-foreground/5 transition-colors duration-300">
              <Play className="w-8 h-8 text-foreground/60 ml-1" />
            </div>
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center font-body text-xs tracking-widest uppercase text-muted-foreground">
            Video Showreel — Coming Soon
          </p>
        </div>

        <p className="mt-6 font-body text-sm text-muted-foreground">
          Replace with your YouTube or Vimeo embed link
        </p>
      </div>
    </section>
  );
}
