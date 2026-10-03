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
type TrailSlot = { card: HTMLDivElement; effect: KeyframeEffect; animation: Animation };

export function useHeroPhotoTrail(root: RefObject<HTMLElement>) {
  const cursor = useRef({ target: { x: 0, y: 0 }, current: { x: 0, y: 0 }, initialized: false });

  useEffect(() => {
    const photo = root.current?.querySelector<HTMLElement>("#ph");
    const trail = photo?.querySelector<HTMLElement>(".hero-photo-trail");
    const strip = root.current?.querySelector<HTMLElement>("#strip");
    if (!photo || !trail || !strip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    const pool: TrailSlot[] = [];
    let disposed = false;
    let ready = false;
    let preparing = false;
    let inside = false;
    let outsideWindow = false;
    let paused = false;
    let bounds: DOMRect | null = null;
    let frame: number | null = null;
    let lastTime = 0;
    let distanceSinceSpawn = 0;
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
      distanceSinceSpawn = 0;
      bounds = null;
    };
    const clear = () => {
      stop();
      pool.forEach(slot => slot.animation.cancel());
      paused = false;
    };
    const pause = () => {
      stop();
      paused = true;
      pool.forEach(slot => {
        if (slot.animation.playState === "running") slot.animation.pause();
      });
    };
    const resume = () => {
      if (!paused) return;
      paused = false;
      pool.forEach(slot => {
        if (slot.animation.playState === "paused") slot.animation.play();
      });
    };

    const spawn = (point: Point) => {
      const slot = pool[nextCard];
      nextCard = (nextCard + 1) % pool.length;
      slot.animation.cancel();
      slot.card.style.zIndex = String(++layer);
      const angle = (nextCard % 2 ? -1 : 1) * (5 + Math.random() * 5);
      // Card dimensions and anchors are static; only transform and opacity animate.
      const transform = (scale: number, drift = 0) =>
        `translate3d(${point.x}px, ${point.y + drift}px, 0) translate3d(-50%, -50%, 0) rotate(${angle}deg) scale(${scale})`;
      slot.effect.setKeyframes([
        { opacity: 0, transform: transform(0.85), offset: 0, easing },
        { opacity: 1, transform: transform(1), offset: entryDuration / (entryDuration + exitDuration), easing },
        { opacity: 0, transform: transform(0.95, 14), offset: 1 },
      ]);
      slot.animation.play();
    };

    const tick = (time: number) => {
      frame = null;
      if (!inside || !enabled()) { stop(); return; }
      const { target, current } = cursor.current;
      // Read geometry on the animation frame, never in a pointer event.
      bounds ??= photo.getBoundingClientRect();
      if (!cursor.current.initialized) {
        current.x = target.x;
        current.y = target.y;
        cursor.current.initialized = true;
        spawn({ x: current.x - bounds.left, y: current.y - bounds.top });
      }
      // Preserve the 0.12-at-60fps feel on displays with other refresh rates.
      const elapsed = lastTime ? Math.min(50, time - lastTime) : 1000 / 60;
      lastTime = time;
      const amount = 1 - Math.pow(1 - smoothing, elapsed / (1000 / 60));
      const previousX = current.x;
      const previousY = current.y;
      const dx = (target.x - current.x) * amount;
      const dy = (target.y - current.y) * amount;
      current.x += dx;
      current.y += dy;
      const distance = Math.hypot(dx, dy);
      // Carry distance across frames and corners. Sample each 100px crossing
      // along the smoothed path, including fast moves that cross several gaps.
      let nextDistance = spawnDistance - distanceSinceSpawn;
      while (nextDistance <= distance) {
        const progress = nextDistance / distance;
        spawn({
          x: previousX + dx * progress - bounds.left,
          y: previousY + dy * progress - bounds.top,
        });
        nextDistance += spawnDistance;
      }
      distanceSinceSpawn = spawnDistance - (nextDistance - distance);
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
        image.decoding = "async";
        card.appendChild(image);
        return { card, image };
      });
      try {
        await Promise.all(slots.map(slot => slot.image.decode()));
        if (disposed) return;
        pool.push(...slots.map(({ card }) => {
          const effect = new KeyframeEffect(card, [], {
            duration: entryDuration + exitDuration, easing: "linear",
          });
          return { card, effect, animation: new Animation(effect, document.timeline) };
        }));
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
      // Events only update the target; all movement and spawning run in RAF.
      cursor.current.target.x = pointer.clientX;
      cursor.current.target.y = pointer.clientY;
      outsideWindow = false;
      resume();
      inside = true;
      schedule();
    };
    listen(photo, "pointermove", move);
    listen(photo, "pointerleave", stop);
    listen(window, "pointerout", event => {
      if (!(event as PointerEvent).relatedTarget) { outsideWindow = true; pause(); }
    });
    listen(window, "blur", () => { outsideWindow = true; pause(); });
    listen(window, "scroll", clear);
    listen(window, "resize", clear);
    listen(document, "visibilitychange", () => {
      if (document.hidden) pause();
      else if (!outsideWindow) resume();
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
