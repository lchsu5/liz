import { useEffect } from "react";

// Palettes expressed as "H S% L%" strings — set directly on CSS vars.
export const DARK = {
  background: "20 14% 6%",
  foreground: "35 30% 92%",
  card: "20 10% 11%",
  cardForeground: "35 30% 92%",
  border: "20 8% 18%",
  muted: "20 8% 14%",
  mutedForeground: "30 8% 62%",
  accent: "355 50% 70%",
  accentForeground: "20 14% 8%",
  cursorGlow: "355 70% 70%",
};

export const LIGHT = {
  background: "37 35% 94%",
  foreground: "0 0% 7%",
  card: "37 18% 89%",
  cardForeground: "0 0% 7%",
  border: "37 12% 84%",
  muted: "37 15% 90%",
  mutedForeground: "0 0% 45%",
  accent: "354 53% 31%",
  accentForeground: "37 35% 94%",
  cursorGlow: "354 60% 45%",
};

type Palette = typeof DARK;

function parseHSL(s: string): [number, number, number] {
  const m = s.match(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
  if (!m) return [0, 0, 0];
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpHSL(a: string, b: string, t: number) {
  const [h1, s1, l1] = parseHSL(a);
  const [h2, s2, l2] = parseHSL(b);
  return `${lerp(h1, h2, t).toFixed(1)} ${lerp(s1, s2, t).toFixed(1)}% ${lerp(l1, l2, t).toFixed(1)}%`;
}

function applyPalette(p: Palette) {
  const r = document.documentElement.style;
  r.setProperty("--background", p.background);
  r.setProperty("--foreground", p.foreground);
  r.setProperty("--card", p.card);
  r.setProperty("--card-foreground", p.cardForeground);
  r.setProperty("--popover", p.background);
  r.setProperty("--popover-foreground", p.foreground);
  r.setProperty("--border", p.border);
  r.setProperty("--input", p.border);
  r.setProperty("--muted", p.muted);
  r.setProperty("--muted-foreground", p.mutedForeground);
  r.setProperty("--secondary", p.card);
  r.setProperty("--secondary-foreground", p.foreground);
  r.setProperty("--accent", p.accent);
  r.setProperty("--accent-foreground", p.accentForeground);
  r.setProperty("--primary", p.foreground);
  r.setProperty("--primary-foreground", p.background);
  r.setProperty("--ring", p.accent);
  r.setProperty("--cursor-glow", p.cursorGlow);
}

function blended(t: number): Palette {
  return {
    background: lerpHSL(DARK.background, LIGHT.background, t),
    foreground: lerpHSL(DARK.foreground, LIGHT.foreground, t),
    card: lerpHSL(DARK.card, LIGHT.card, t),
    cardForeground: lerpHSL(DARK.cardForeground, LIGHT.cardForeground, t),
    border: lerpHSL(DARK.border, LIGHT.border, t),
    muted: lerpHSL(DARK.muted, LIGHT.muted, t),
    mutedForeground: lerpHSL(DARK.mutedForeground, LIGHT.mutedForeground, t),
    accent: lerpHSL(DARK.accent, LIGHT.accent, t),
    accentForeground: lerpHSL(DARK.accentForeground, LIGHT.accentForeground, t),
    cursorGlow: lerpHSL(DARK.cursorGlow, LIGHT.cursorGlow, t),
  };
}

/**
 * Manages the document palette per view.
 * - "overview": scroll-linked dark → light morph
 * - "light": fixed warm light palette
 * - "dark": fixed dark palette
 */
export default function ThemeController({
  mode,
  scrollRef,
}: {
  mode: "overview" | "light" | "dark";
  scrollRef?: React.RefObject<HTMLElement>;
}) {
  useEffect(() => {
    if (mode === "light") {
      applyPalette(LIGHT);
      return;
    }
    if (mode === "dark") {
      applyPalette(DARK);
      return;
    }
    // overview: scroll-linked
    const el = scrollRef?.current;
    let raf = 0;
    const compute = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Full transition over ~1.4 viewports
      const max = vh * 1.4;
      const t = Math.max(0, Math.min(1, scrollY / max));
      // Ease for nicer feel
      const eased = t * t * (3 - 2 * t);
      applyPalette(blended(eased));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode, scrollRef]);

  return null;
}
