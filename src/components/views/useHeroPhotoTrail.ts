import { useEffect, useRef, type RefObject } from "react";
import trailPhoto1 from "@/assets/1.1.JPG?url";
import trailPhoto2 from "@/assets/1.2.jpeg";
import trailPhoto3 from "@/assets/1.3.JPG?url";
import trailPhoto4 from "@/assets/1.4.webp";

const photos = [trailPhoto1, trailPhoto2, trailPhoto3, trailPhoto4];
const poolSize = 8;
const spawnDistance = 100;
const smoothing = 0.12;
const entryDuration = 300;
const exitDuration = 1000;
const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
type Point = { x: number; y: number };

export function useHeroPhotoTrail(root: RefObject<HTMLElement>) {
  const cursor = useRef({ target: { x: 0, y: 0 }, current: { x: 0, y: 0 }, initialized: false });

  useEffect(() => {
    const photo = root.current?.querySelector<HTMLElement>("#ph");
    const trail = photo?.querySelector<HTMLElement>(".hero-photo-trail");
    const strip = root.current?.querySelector<HTMLElement>("#strip");
    if (!photo || !trail || !strip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    const pool: { card: HTMLDivElement; animation?: Animation }[] = [];
    let disposed = false;
    let ready = false;
    let preparing = false;
    let inside = false;
    let bounds: DOMRect | null = null;
    let frame: number | null = null;
    let lastTime = 0;
    let lastSpawn: Point | null = null;
    let nextCard = 0;
    let layer = 0;
    const listeners: (() => void)[] = [];
    const listen = (target: EventTarget, event: string, handler: EventListener) => {
      target.addEventListener(event, handler, { passive: true });
      listeners.push(() => target.removeEventListener(event, handler));
    };
    const enabled = () => !disposed && ready && !reduced.matches && hover.matches &&
      !document.hidden && !strip.classList.contains("is-visible");

    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = 0;
      inside = false;
      cursor.current.initialized = false;
      lastSpawn = null;
      bounds = null;
    };
    const clear = () => {
      stop();
      pool.forEach(slot => { slot.animation?.cancel(); slot.animation = undefined; });
    };

    const spawn = (point: Point) => {
      const slot = pool[nextCard];
      nextCard = (nextCard + 1) % pool.length;
      slot.animation?.cancel();
      slot.card.style.zIndex = String(++layer);
      const angle = (nextCard % 2 ? -1 : 1) * (5 + Math.random() * 5);
      // Card dimensions and anchors are static; only transform and opacity animate.
      const transform = (scale: number, drift = 0) =>
        `translate3d(${point.x}px, ${point.y + drift}px, 0) translate3d(-50%, -50%, 0) rotate(${angle}deg) scale(${scale})`;
      slot.animation = slot.card.animate([
        { opacity: 0, transform: transform(0.85), offset: 0, easing },
        { opacity: 1, transform: transform(1), offset: entryDuration / (entryDuration + exitDuration), easing },
        { opacity: 0, transform: transform(0.95, 14), offset: 1 },
      ], { duration: entryDuration + exitDuration, easing: "linear" });
      lastSpawn = { ...point };
    };

    const tick = (time: number) => {
      frame = null;
      if (!inside || !enabled()) { stop(); return; }
      const { target, current } = cursor.current;
      // Preserve the 0.12-at-60fps feel on displays with other refresh rates.
      const elapsed = lastTime ? Math.min(50, time - lastTime) : 1000 / 60;
      lastTime = time;
      const amount = 1 - Math.pow(1 - smoothing, elapsed / (1000 / 60));
      current.x += (target.x - current.x) * amount;
      current.y += (target.y - current.y) * amount;
      if (!lastSpawn || Math.hypot(current.x - lastSpawn.x, current.y - lastSpawn.y) >= spawnDistance) {
        spawn(current);
      }
      if (Math.hypot(target.x - current.x, target.y - current.y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        lastTime = 0;
      }
    };
    const schedule = () => {
      if (inside && enabled() && frame === null) frame = requestAnimationFrame(tick);
    };

    const prepare = async () => {
      if (preparing || ready || reduced.matches || !hover.matches) return;
      preparing = true;
      // Keep each pooled image's source fixed and decode before showing any cards.
      const slots = Array.from({ length: poolSize }, (_, index) => {
        const card = document.createElement("div");
        card.className = "hero-trail-card";
        const image = new Image();
        image.src = photos[index % photos.length];
        image.alt = "";
        image.draggable = false;
        card.appendChild(image);
        return { card, image };
      });
      try {
        await Promise.all(slots.map(slot => slot.image.decode()));
        if (disposed) return;
        pool.push(...slots.map(({ card }) => ({ card })));
        trail.append(...pool.map(slot => slot.card));
        ready = true;
      } catch {
        // Leave the hero intact if an image cannot be loaded or decoded.
      } finally {
        preparing = false;
      }
    };

    const move = (event: Event) => {
      const pointer = event as PointerEvent;
      if (pointer.pointerType !== "mouse" || !enabled()) return;
      // Geometry is cached for a hover session and invalidated on scroll/resize.
      bounds ??= photo.getBoundingClientRect();
      const target = { x: pointer.clientX - bounds.left, y: pointer.clientY - bounds.top };
      cursor.current.target = target;
      if (!cursor.current.initialized) {
        cursor.current.current = { ...target };
        cursor.current.initialized = true;
      }
      inside = true;
      schedule();
    };
    listen(photo, "pointermove", move);
    listen(photo, "pointerleave", stop);
    listen(window, "pointerout", event => {
      if (!(event as PointerEvent).relatedTarget) stop();
    });
    listen(window, "blur", stop);
    listen(window, "scroll", clear);
    listen(window, "resize", clear);
    listen(document, "visibilitychange", () => {
      stop();
      pool.forEach(slot => {
        if (document.hidden && slot.animation?.playState === "running") slot.animation.pause();
        else if (!document.hidden && slot.animation?.playState === "paused") slot.animation.play();
      });
    });
    const preferenceChanged = () => { clear(); void prepare(); };
    listen(reduced, "change", preferenceChanged);
    listen(hover, "change", preferenceChanged);
    void prepare();

    return () => {
      disposed = true;
      clear();
      listeners.forEach(remove => remove());
      pool.forEach(slot => slot.card.remove());
    };
  }, [root]);
}
