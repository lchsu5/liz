import { useEffect, useRef, type RefObject } from "react";
import type { ViewKey } from "@/lib/navigation";
import photoA from "@/assets/a.jpg";
import photoB from "@/assets/b.jpg";
import photoC from "@/assets/c.jpg";
import photoD from "@/assets/d.jpg";
import photoE from "@/assets/e.jpg";
import trailPhoto1 from "@/assets/1.1.JPG?url";
import trailPhoto2 from "@/assets/1.2.jpeg";
import trailPhoto3 from "@/assets/1.3.JPG?url";
import trailPhoto4 from "@/assets/1.4.png";

const mainPhoto = "/overview-reference/elizabeth-pink-wall.jpeg";
const rotatingPhotos = [mainPhoto, photoA, photoB, photoC, photoD, photoE];
const trailPhotos = [trailPhoto1, trailPhoto2, trailPhoto3, trailPhoto4];

export function useOverviewEffects(root: RefObject<HTMLElement>, onNavigate: (view: ViewKey) => void) {
  const navigateRef = useRef<(view: ViewKey, label: string) => void>(() => {});
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const get = <T extends HTMLElement = HTMLElement>(selector: string) => page.querySelector<T>(selector)!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: (() => void)[] = [];
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const frames = new Set<number>();
    let alive = true;
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { timers.delete(id); if (alive) fn(); }, ms);
      timers.add(id);
    };
    const frame = (fn: FrameRequestCallback) => {
      const id = requestAnimationFrame(time => { frames.delete(id); if (alive) fn(time); });
      frames.add(id);
    };
    const listen = (target: EventTarget, event: string, handler: EventListener) => {
      target.addEventListener(event, handler, { passive: true });
      cleanups.push(() => target.removeEventListener(event, handler));
    };
    const animateAway = (el: HTMLElement, keyframes: Keyframe[], duration: number) => {
      const animation = el.animate(keyframes, { duration, easing: "ease-out", fill: "forwards" });
      later(() => { animation.cancel(); el.remove(); }, duration + 50);
    };
    const track = get("#tr2");
    for (let group = 0; group < 2; group++) {
      const div = document.createElement("div");
      div.className = "grp";
      for (const src of [...rotatingPhotos, ...rotatingPhotos]) {
        const img = document.createElement("img");
        img.src = src; img.alt = ""; img.loading = "lazy";
        if (src === mainPhoto) {
          img.className = "strip-portrait";
          img.loading = "eager";
        }
        div.appendChild(img);
      }
      track.appendChild(div);
    }
    cleanups.push(() => track.replaceChildren());
    const hero = get("#hero"), photo = get("#ph"), title = get("#hn"), strip = get("#strip");
    const trail = get(".hero-photo-trail");
    if (!reduced.matches && window.matchMedia("(hover: hover)").matches) {
      trailPhotos.forEach(src => { const image = new Image(); image.src = src; });
    }
    let trailIndex = 0;
    let lastTrailPoint: { x: number; y: number } | null = null;
    const clearTrail = () => { trail.replaceChildren(); lastTrailPoint = null; };
    listen(photo, "pointermove", event => {
      const pointer = event as PointerEvent;
      if (reduced.matches || pointer.pointerType !== "mouse" || strip.classList.contains("is-visible")) return;
      const bounds = photo.getBoundingClientRect();
      const x = pointer.clientX - bounds.left, y = pointer.clientY - bounds.top;
      if (lastTrailPoint && Math.hypot(x - lastTrailPoint.x, y - lastTrailPoint.y) < 65) return;
      lastTrailPoint = { x, y };
      const index = trailIndex++ % trailPhotos.length;
      const card = document.createElement("div");
      card.className = "hero-trail-card";
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.setProperty("--trail-angle", `${index % 2 ? 8 : -8}deg`);
      const image = document.createElement("img");
      image.src = trailPhotos[index];
      image.alt = "";
      image.draggable = false;
      card.appendChild(image);
      trail.appendChild(card);
      if (trail.childElementCount > 8) trail.firstElementChild?.remove();
      card.addEventListener("animationend", () => card.remove(), { once: true });
    });
    listen(photo, "pointerleave", clearTrail);
    listen(window, "scroll", clearTrail);
    listen(reduced, "change", clearTrail);
    cleanups.push(clearTrail);
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const updateHero = () => {
      const width = page.clientWidth, height = window.innerHeight;
      const progress = reduced.matches ? 0 : clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight - height), 0, 1);
      const eased = progress * progress * (3 - 2 * progress);
      const mix = (a: number, b: number) => a + (b - a) * eased;
      const smallWidth = Math.min(260, width * .5);
      // Finish shrinking before handing the portrait to its matching strip image.
      const shrinkProgress = clamp(progress / .8, 0, 1);
      const shrinkEase = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);
      const shrink = (a: number, b: number) => a + (b - a) * shrinkEase;
      const slideProgress = reduced.matches ? 0 : clamp((progress - .8) / .2, 0, 1);
      const slideOpacity = slideProgress * slideProgress * (3 - 2 * slideProgress);
      strip.style.setProperty("--slide-width", `${smallWidth}px`);
      strip.style.setProperty("--slide-height", `${smallWidth * 1.3}px`);
      strip.style.setProperty("--slide-top", `${width < 480 ? 110 : 76}px`);
      strip.style.opacity = String(slideOpacity);
      strip.classList.toggle("is-visible", slideOpacity > 0);
      strip.classList.toggle("is-rotating", progress >= 1);
      if (slideOpacity === 0) track.style.animation = "none";
      else track.style.removeProperty("animation");
      photo.style.opacity = slideOpacity === 1 ? "0" : "1";
      Object.assign(photo.style, { width: `${shrink(width, smallWidth)}px`, height: `${shrink(height, smallWidth * 1.3)}px`, top: `${shrink(0, width < 480 ? 110 : 76)}px`, left: "auto", right: `${shrink(0, 20)}px`, borderRadius: `${shrink(0, 4)}px` });
      get("#ov").style.opacity = String(shrink(.45, 0));
      title.style.fontSize = "100px";
      const large = Math.min(360, 100 * (width - 40) / Math.max(1, title.scrollWidth));
      title.style.fontSize = `${mix(large, clamp(width * .07, 30, 64))}px`;
      get("#hm").style.opacity = String(Math.max(0, 1 - eased * 2.5));
      get("#bar").style.width = `${clamp(window.scrollY / Math.max(1, document.documentElement.scrollHeight - height) * 100, 0, 100)}%`;
    };
    let scheduled = false;
    const scheduleHero = () => { if (!scheduled) { scheduled = true; frame(() => { scheduled = false; updateHero(); }); } };
    listen(window, "scroll", scheduleHero);
    listen(window, "resize", scheduleHero);
    listen(reduced, "change", scheduleHero);
    document.fonts.ready.then(() => { if (alive) scheduleHero(); });
    updateHero();

    const contact = get("#contact");
    const contactTitles = Array.from(contact.querySelectorAll<HTMLElement>(".contact-title"));
    const contactLabels = contactTitles.map(el => el.textContent || "");
    let scrambleRun = 0;
    const scrambleContact = () => {
      const run = ++scrambleRun;
      let step = 0;
      const tick = () => {
        if (run !== scrambleRun) return;
        contactTitles.forEach((el, index) => {
          const label = contactLabels[index];
          const revealed = Math.floor(step / 30 * label.length);
          el.textContent = label.split("").map((letter, position) =>
            reduced.matches || position < revealed || /[^A-Z]/.test(letter)
              ? letter : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]
          ).join("");
        });
        if (!reduced.matches && step++ < 30) later(tick, 40);
      };
      tick();
    };
    scrambleContact();
    let contactSeen = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        contact.classList.toggle("is-visible", entry.isIntersecting);
        if (entry.isIntersecting && !contactSeen) {
          contactSeen = true;
          scrambleContact();
        }
      }
    }, { threshold: .15 });
    observer.observe(contact);
    cleanups.push(() => {
      observer.disconnect();
      contact.classList.remove("is-visible");
      contactTitles.forEach((el, index) => { el.textContent = contactLabels[index]; });
    });

    page.querySelectorAll<HTMLElement>(".scr").forEach(el => {
      const original = el.textContent || "";
      let running = false;
      listen(el, "mouseenter", () => {
        if (reduced.matches || running) return;
        running = true;
        let iteration = 0;
        const tick = () => {
          iteration++;
          el.textContent = original.split("").map((letter, index) => index < iteration / 2 || /[^A-Za-z]/.test(letter) ? letter : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]).join("");
          if (iteration < original.length * 2 && !reduced.matches) later(tick, 35);
          else { el.textContent = original; running = false; }
        };
        tick();
      });
      cleanups.push(() => { el.textContent = original; });
    });

    let busy = false;
    navigateRef.current = (view, label) => {
      if (busy) return;
      const change = () => view === "overview" ? window.scrollTo({ top: 0, behavior: "instant" }) : onNavigate(view);
      if (reduced.matches) { change(); return; }
      busy = true;
      const wipe = get("#wp");
      wipe.textContent = label;
      wipe.style.visibility = "visible";
      const animation = wipe.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0)", offset: .4 }, { transform: "translateY(0)", offset: .5 }, { transform: "translateY(-100%)" }], { duration: 1200, easing: "cubic-bezier(.7,0,.2,1)" });
      if (view === "overview") later(change, 600);
      later(() => { animation.cancel(); wipe.style.visibility = "hidden"; busy = false; if (view !== "overview") change(); }, 1200);
      cleanups.push(() => animation.cancel());
    };

    listen(page, "click", event => {
      const e = event as MouseEvent;
      if (reduced.matches || (e.target as Element).closest("a, button")) return;
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div"), angle = i / 8 * Math.PI * 2;
        Object.assign(particle.style, { position: "fixed", width: "6px", height: "6px", borderRadius: "50%", background: "#ECEAE3", pointerEvents: "none", zIndex: "90", left: `${e.clientX - 3}px`, top: `${e.clientY - 3}px` });
        page.appendChild(particle);
        animateAway(particle, [{ opacity: 1, transform: "translate(0,0)" }, { opacity: 0, transform: `translate(${Math.cos(angle) * 32}px,${Math.sin(angle) * 32}px)` }], 550);
      }
    });
    const clock = () => { get("#ck").textContent = new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit" }); };
    clock();
    const interval = setInterval(clock, 10000);
    return () => {
      alive = false; clearInterval(interval);
      timers.forEach(clearTimeout); frames.forEach(cancelAnimationFrame);
      cleanups.forEach(cleanup => cleanup());
      navigateRef.current = () => {};
    };
  }, [root, onNavigate]);
  return (view: ViewKey, label: string) => navigateRef.current(view, label);
}
