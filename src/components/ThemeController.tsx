import { useEffect } from "react";

// Editorial-finance palette — quiet off-white, near-black text, deep rose accent used sparingly.
const PALETTE = {
  background: "40 16% 96%",
  foreground: "60 3% 6%",
  card: "0 0% 100%",
  cardForeground: "60 3% 6%",
  border: "40 6% 90%",
  muted: "34 19% 93%",
  mutedForeground: "30 3% 53%",
  accent: "343 39% 54%",
  accentForeground: "0 0% 100%",
  cursorGlow: "343 39% 50%",
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
