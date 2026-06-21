import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const metrics = [
  { value: "50+", label: "Videos Created" },
  { value: "600K+", label: "Total Views" },
  { value: "10+", label: "Brand Partners" },
  { value: "5.0★", label: "Avg Client Rating" },
];

export default function MetricsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="pt-10 pb-[100px] px-6 bg-background">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 justify-items-center">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-display text-5xl md:text-6xl text-foreground leading-none">
                {m.value}
              </p>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-4">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
