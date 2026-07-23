import { useEffect } from "react";

// Single warm editorial palette — off-white background, near-black text, dusty rose accent.
const PALETTE = {
  background: "40 20% 98%",
  foreground: "45 8% 9%",
  card: "0 0% 100%",
  cardForeground: "45 8% 9%",
  border: "40 10% 90%",
  muted: "40 12% 95%",
  mutedForeground: "36 4% 52%",
  accent: "342 41% 61%",
  accentForeground: "0 0% 100%",
  cursorGlow: "342 41% 55%",
};

function applyPalette() {
  const r = document.documentElement.style;
  r.setProperty("--background", PALETTE.background);
  r.setProperty("--foreground", PALETTE.foreground);
  r.setProperty("--card", PALETTE.card);
  r.setProperty("--card-foreground", PALETTE.cardForeground);
  r.setProperty("--popover", PALETTE.background);
  r.setProperty("--popover-foreground", PALETTE.foreground);
  r.setProperty("--border", PALETTE.border);
  r.setProperty("--input", PALETTE.border);
  r.setProperty("--muted", PALETTE.muted);
  r.setProperty("--muted-foreground", PALETTE.mutedForeground);
  r.setProperty("--secondary", PALETTE.card);
  r.setProperty("--secondary-foreground", PALETTE.foreground);
  r.setProperty("--accent", PALETTE.accent);
  r.setProperty("--accent-foreground", PALETTE.accentForeground);
  r.setProperty("--primary", PALETTE.foreground);
  r.setProperty("--primary-foreground", PALETTE.background);
  r.setProperty("--ring", PALETTE.accent);
  r.setProperty("--cursor-glow", PALETTE.cursorGlow);
}

/** Applies the single site-wide light palette. */
export default function ThemeController() {
  useEffect(() => {
    applyPalette();
  }, []);

  return null;
}
