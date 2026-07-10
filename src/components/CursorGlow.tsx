import { useEffect, useRef } from "react";

/**
 * Soft glowing radial halo that follows the cursor with gentle trailing.
 * Renders into a fixed full-viewport layer. Hidden on touch devices.
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef<number | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    // Skip on coarse pointers (touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current && dotRef.current) {
        dotRef.current.style.opacity = "1";
        visible.current = true;
      }
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      visible.current = false;
    };

    const tick = () => {
      // Easing for trailing motion
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 250}px, ${pos.current.y - 250}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] opacity-0 transition-opacity duration-500 mix-blend-multiply"
      style={{
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, hsl(var(--cursor-glow) / 0.18) 0%, hsl(var(--cursor-glow) / 0.1) 22%, hsl(var(--cursor-glow) / 0.04) 45%, transparent 70%)",
        filter: "blur(28px)",
        willChange: "transform",
      }}
    />
  );
}
