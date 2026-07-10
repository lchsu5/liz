import { useEffect } from "react";

// Single premium dark palette — deep charcoal, off-white text, muted blue accent.
const PALETTE = {
  background: "222 22% 7%",
  foreground: "210 24% 95%",
  card: "222 20% 11%",
  cardForeground: "210 24% 95%",
  border: "222 16% 20%",
  muted: "222 16% 15%",
  mutedForeground: "216 12% 63%",
  accent: "213 62% 58%",
  accentForeground: "0 0% 100%",
  cursorGlow: "213 80% 66%",
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

/** Applies the single site-wide dark palette. */
export default function ThemeController() {
  useEffect(() => {
    applyPalette();
  }, []);

  return null;
}
