import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/elizabeth-about.jpg";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-background">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
          Who You're Working With
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground mb-20 text-center">
          Meet <span className="italic font-light">Elizabeth</span>
        </h2>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Editorial photo composition */}
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] bg-card border border-border overflow-hidden relative z-10">
              <img
                src={heroImage}
                alt="Elizabeth Hsu portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative offset frame */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-warm-brown/40 z-0 hidden md:block" />
            <div className="absolute top-6 -left-3 hidden md:block">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground rotate-90 origin-left block whitespace-nowrap">
                Portfolio · 2025
              </span>
            </div>
          </div>

          {/* Bio + pull quote */}
          <div className="md:col-span-7 md:pl-8">
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-foreground font-light mb-10">
              <span className="text-warm-brown">“</span>
              Content that feels like a friend's recommendation —
              <span className="italic"> never an ad</span>.
              <span className="text-warm-brown">”</span>
            </blockquote>

            <div className="w-12 h-px bg-foreground mb-8" />

            <div className="space-y-5 font-body text-base md:text-[17px] text-muted-foreground leading-[1.75] font-light max-w-[60ch]">
              <p>
                Hi! I'm Elizabeth Hsu, a Carnegie Mellon business student and
                UGC creator based in LA.
              </p>
              <p>
                I create natural, high-converting content that blends seamlessly
                into a customer's feed — so it feels like a recommendation, not
                an ad.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="font-display text-3xl text-foreground">600K+</p>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  Views
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">50+</p>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  Videos
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">10+</p>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  Brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}