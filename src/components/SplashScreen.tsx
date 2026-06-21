import { useState, useEffect, useMemo } from "react";
import { useScrambleText } from "@/hooks/useScrambleText";

const BG_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&|~";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [scrambledName, isDone] = useScrambleText("Liz Hsu");
  const [bgVisible, setBgVisible] = useState(true);
  const [splashOpacity, setSplashOpacity] = useState(1);
  const [unmounted, setUnmounted] = useState(false);

  // Generate background particles once, avoiding the center zone where the name sits
  const bgChars = useMemo(() => {
    return Array.from({ length: 320 }, (_, i) => {
      let x: number, y: number;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (x > 28 && x < 72 && y > 33 && y < 67);
      return {
        id: i,
        x,
        y,
        char: BG_CHARS[Math.floor(Math.random() * BG_CHARS.length)],
        fadeDelay: Math.random() * 0.25,
      };
    });
  }, []);

  useEffect(() => {
    if (!isDone) return;
    // Phase 1: background chars fade out
    const t1 = setTimeout(() => setBgVisible(false), 250);
    // Phase 2: whole splash fades out
    const t2 = setTimeout(() => setSplashOpacity(0), 600);
    // Phase 3: remove from DOM and notify parent
    const t3 = setTimeout(() => {
      setUnmounted(true);
      onComplete();
    }, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isDone, onComplete]);

  if (unmounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{
        opacity: splashOpacity,
        transition: splashOpacity === 0 ? "opacity 0.5s ease-out" : "none",
        pointerEvents: isDone ? "none" : "all",
      }}
    >
      {/* Background matrix chars — avoid the center clear zone */}
      <div className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {bgChars.map((p) => (
          <span
            key={p.id}
            className="absolute font-mono leading-none text-foreground"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: "13px",
              opacity: bgVisible ? 0.22 : 0,
              transition: bgVisible
                ? "none"
                : `opacity 0.35s ease ${p.fadeDelay}s`,
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Centered name — monospace during scramble, snaps to display font on resolve */}
      <div className="relative z-10 select-none text-center">
        {/* Invisible Sunday Masthead placeholder keeps the container stable so the
            monospace scramble text doesn't shift the layout on font switch */}
        <span
          className="font-display text-foreground"
          style={{
            fontSize: "clamp(72px, 14vw, 190px)",
            lineHeight: 1,
            visibility: "hidden",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          Liz Hsu
        </span>

        <span
          className="text-foreground"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(72px, 14vw, 190px)",
            lineHeight: 1,
            fontFamily: "ui-monospace, 'Courier New', monospace",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          {scrambledName}
        </span>
      </div>
    </div>
  );
}
