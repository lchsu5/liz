import { useEffect, type RefObject } from "react";
import mainPhoto from "@/assets/optimized/elizabeth-pink-wall.jpeg";
import photoA from "@/assets/optimized/a.jpg";
import photoB from "@/assets/optimized/b.jpg";
import photoC from "@/assets/optimized/c.jpg";
import photoD from "@/assets/optimized/d.jpg";
import photoE from "@/assets/optimized/e.jpg";

const rotatingPhotos = [mainPhoto, photoA, photoB, photoC, photoD, photoE];

export function useOverviewEffects(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const get = <T extends HTMLElement = HTMLElement>(selector: string) => page.querySelector<T>(selector)!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: (() => void)[] = [];
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let alive = true;
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { timers.delete(id); if (alive) fn(); }, ms);
      timers.add(id);
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
        img.src = src; img.alt = ""; img.loading = "eager"; img.decoding = "async";
        void img.decode().catch(() => {});
        if (src === mainPhoto) {
          img.className = "strip-portrait";
          img.loading = "eager";
        }
        div.appendChild(img);
      }
      track.appendChild(div);
    }
    const hero = get("#hero"), photo = get("#ph"), title = get("#hn"), strip = get("#strip");
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const overlay = get("#ov"), bar = get("#bar");
    const portrait = get<HTMLImageElement>("#imgP");
    let portraitHeight = 1;
    let width = 0, height = 0, heroStart = 0, heroDistance = 1, scrollDistance = 1;
    let largeTitle = 100;
    let targetProgress = 0, currentProgress = 0;
    let animationFrame: number | null = null;
    let lastTime = 0;
    const openingParent = photo.parentElement!;
    const portraitSlot = document.createElement("div");
    portraitSlot.className = "portrait-slot";
    track.querySelector(".strip-portrait")!.replaceWith(portraitSlot);
    let inStrip = false;
    cleanups.push(() => {
      openingParent.insertBefore(photo, strip);
      track.replaceChildren();
    });
    const measure = () => {
      width = page.clientWidth;
      height = window.innerHeight;
      portraitHeight = portrait.naturalWidth ? width * portrait.naturalHeight / portrait.naturalWidth : height;
      Object.assign(photo.style, { width: `${width}px`, height: `${height}px`, top: "0px", right: "0px" });
      Object.assign(portrait.style, { width: `${width}px`, height: `${portraitHeight}px` });
      heroStart = hero.getBoundingClientRect().top + window.scrollY;
      heroDistance = Math.max(1, (hero.offsetHeight - height) * .65);
      scrollDistance = Math.max(1, document.documentElement.scrollHeight - height);
      // Measure text only when the viewport or font changes, never while scrolling.
      title.style.fontSize = "100px";
      largeTitle = Math.min(360, 100 * (width - 40) / Math.max(1, title.scrollWidth));
      title.style.fontSize = `${largeTitle}px`;
      const smallWidth = Math.min(260, width * .5);
      strip.style.setProperty("--slide-width", `${smallWidth}px`);
      strip.style.setProperty("--slide-height", `${smallWidth * 1.3}px`);
      strip.style.setProperty("--slide-top", `${width < 480 ? 110 : 76}px`);
    };
    const renderHero = (progress: number) => {
      const smallWidth = Math.min(260, width * .5);
      const shrinkProgress = clamp(progress / .8, 0, 1);
      const shrinkEase = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);
      const shrink = (a: number, b: number) => a + (b - a) * shrinkEase;
      const slideProgress = clamp((progress - .65) / .15, 0, 1);
      const slideOpacity = slideProgress * slideProgress * (3 - 2 * slideProgress);
      strip.style.opacity = String(slideOpacity);
      strip.classList.toggle("is-visible", slideOpacity > 0);
      // Move the actual opening portrait into the rightmost slot without fading it.
      const handedOff = progress >= .8;
      if (handedOff !== inStrip) {
        if (handedOff) portraitSlot.appendChild(photo);
        else openingParent.insertBefore(photo, strip);
        inStrip = handedOff;
      }
      strip.classList.toggle("is-rotating", handedOff && !reduced.matches);
      photo.style.opacity = "1";
      // Fixed layout boxes: all scroll motion uses compositor transforms.
      const photoWidth = shrink(width, smallWidth), photoHeight = shrink(height, smallWidth * 1.3);
      const scaleX = photoWidth / width, scaleY = photoHeight / height;
      photo.style.transform = `translate3d(${inStrip ? 0 : -20 * shrinkEase}px, ${inStrip ? 0 : (width < 480 ? 110 : 76) * shrinkEase}px, 0) scale(${scaleX}, ${scaleY})`;
      // Counter-scale the image so the portrait keeps its proportions and cover crop.
      const cover = Math.max(photoWidth / width, photoHeight / portraitHeight);
      const imageX = (photoWidth - width * cover) * .5 / scaleX;
      const imageY = (photoHeight - portraitHeight * cover) * .3 / scaleY;
      portrait.style.transform = `translate3d(${imageX}px, ${imageY}px, 0) scale(${cover / scaleX}, ${cover / scaleY})`;
      overlay.style.opacity = String(shrink(.45, 0));
      const smallTitle = clamp(width * .07, 30, 64);
      title.style.transform = `scale(${(largeTitle + (smallTitle - largeTitle) * shrinkEase) / largeTitle})`;
    };
    const tickHero = (time: number) => {
      animationFrame = null;
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 1000 / 60;
      lastTime = time;
      const amount = reduced.matches ? 1 : 1 - Math.exp(-elapsed / 40);
      currentProgress += (targetProgress - currentProgress) * amount;
      if (Math.abs(targetProgress - currentProgress) < .0001) currentProgress = targetProgress;
      renderHero(currentProgress);
      if (currentProgress !== targetProgress) animationFrame = requestAnimationFrame(tickHero);
      else lastTime = 0;
    };
    const scheduleHero = () => {
      targetProgress = reduced.matches ? 0 : clamp((window.scrollY - heroStart) / heroDistance, 0, 1);
      bar.style.transform = `scaleX(${clamp(window.scrollY / scrollDistance, 0, 1)})`;
      if (animationFrame === null) animationFrame = requestAnimationFrame(tickHero);
    };
    const resizeHero = () => { measure(); scheduleHero(); };
    listen(window, "scroll", scheduleHero);
    listen(window, "resize", resizeHero);
    listen(reduced, "change", resizeHero);
    listen(portrait, "load", resizeHero);
    document.fonts.ready.then(() => { if (alive) resizeHero(); });
    measure();
    targetProgress = reduced.matches ? 0 : clamp((window.scrollY - heroStart) / heroDistance, 0, 1);
    currentProgress = targetProgress;
    renderHero(currentProgress);
    scheduleHero();
    cleanups.push(() => { if (animationFrame !== null) cancelAnimationFrame(animationFrame); });

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
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      cleanups.forEach(cleanup => cleanup());
    };
  }, [root]);
}
