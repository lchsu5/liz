import { useEffect } from "react";

// Single premium light palette — soft off-white background, near-black text, muted blue accent.
const PALETTE = {
  background: "210 20% 98%",
  foreground: "222 25% 12%",
  card: "0 0% 100%",
  cardForeground: "222 25% 12%",
  border: "220 16% 88%",
  muted: "220 18% 94%",
  mutedForeground: "220 10% 42%",
  accent: "213 70% 45%",
  accentForeground: "0 0% 100%",
  cursorGlow: "213 70% 55%",
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
