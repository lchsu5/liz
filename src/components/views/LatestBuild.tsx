import { useRef, useState } from "react";
import "./LatestBuild.css";

const story = [
  { label: "Problem", text: "Students often understand advanced concepts but carry foundational misconceptions that were never corrected. Many are too embarrassed to ask about things they feel they should already know, so small errors compound into long-term habits." },
  { label: "Approach", text: "Watches handwritten math over a live iPad screen share from apps like GoodNotes or Notability. A vision-language model finds the exact step where reasoning breaks down, then explains why it is wrong and what the next step should be. A second model writes review notes at the end of each session." },
  { label: "Result", text: "Built at NexHacks as a working real-time pipeline. It focuses on how students think, not only whether the answer is right, and never gives the solution. Planned next: free rollout to elementary schools, then SAT and ACT prep partners." },
];
const stack = ["React", "Vite", "Tailwind", "Python", "Gemini 2.5", "Qwen3-VL", "Overshoot", "WebRTC", "TRAE"];
const cmusedStory = [
  { label: "Problem", text: <>Carnegie Mellon students lack a trusted, centralized marketplace for buying and selling secondhand items. Existing platforms like Facebook Marketplace and Instagram aren't designed for campus transactions, making it harder to find affordable essentials, sell unwanted belongings, and coordinate convenient local pickups.</> },
  { label: "Approach", text: <>Led 0-to-1 product strategy and cross-functional execution within CMU's Business Technology Group. Directed design and engineering teams through technical PRDs to build a campus-exclusive marketplace with CMU-authenticated accounts, personalized discovery feeds, searchable listings, seller profiles, and built-in messaging. Developed go-to-market strategies targeting incoming students, campus organizations, and local resale communities.</> },
  { label: "Result", text: <>Launched CMUsed to <strong>2,000+ users in its first week</strong>, scaling cumulative gross merchandise value to <strong>$22K</strong> while sustaining an approximately <strong>50% sell-through rate</strong>. Established a campus-focused resale platform that helps students save money, extend the life of secondhand goods, and connect directly with trusted buyers and sellers.</> },
];
const cmusedStack = ["Product Strategy", "Product Management", "UI/UX", "GTM", "Firebase", "Firestore", "Algolia", "Expo", "React Native"];

export default function LatestBuild() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [cmusedSelected, setCmusedSelected] = useState(0);
  const cmusedTabs = useRef<(HTMLButtonElement | null)[]>([]);
  return <section id="latest-build" className="overview-section latest-build" aria-labelledby="overview-build">
        <div className="overview-section-inner">
        <h2 className="overview-section-heading" id="overview-build">Projects</h2>
        <div className="build-projects">
        <article className="proj">
          <div className="meta"><span className="gl">CMUsed · Sep 2025 – Present</span></div>
          <h2>A campus-exclusive marketplace making secondhand buying and selling easier, safer, and more accessible.</h2>
          <div className="demo"><div className="demo-placeholder"><strong>CMUsed</strong><p>Product demo coming soon</p></div></div>
          <div className="tabs" role="tablist" aria-label="CMUsed story">{cmusedStory.map((item, index) => <button type="button" key={item.label} ref={element => { cmusedTabs.current[index] = element; }} role="tab" id={`cmused-tab-${index}`} aria-selected={cmusedSelected === index} aria-controls={`cmused-story-${index}`} tabIndex={cmusedSelected === index ? 0 : -1} onClick={() => setCmusedSelected(index)} onKeyDown={event => {
            const next = event.key === "ArrowRight" ? (index + 1) % cmusedStory.length : event.key === "ArrowLeft" ? (index + cmusedStory.length - 1) % cmusedStory.length : event.key === "Home" ? 0 : event.key === "End" ? cmusedStory.length - 1 : -1;
            if (next >= 0) { event.preventDefault(); setCmusedSelected(next); cmusedTabs.current[next]?.focus(); }
          }}>{item.label}</button>)}</div>
          {cmusedStory.map((item, index) => <p key={item.label} className={`tp ${cmusedSelected === index ? "in" : ""}`} id={`cmused-story-${index}`} role="tabpanel" aria-labelledby={`cmused-tab-${index}`} hidden={cmusedSelected !== index} tabIndex={0}>{item.text}</p>)}
          <div className="stk">{cmusedStack.map(technology => <span key={technology}>{technology}</span>)}</div>
        </article>
        <div className="proj">
          <div className="meta"><span className="gl">SecondLook · Jan 2026</span></div>
          <h2>A vision-powered STEM tutor that catches mistakes as you make them.</h2>
          <div className="demo"><div className="demo-placeholder"><strong>SecondLook</strong><p>Demo clip coming soon</p></div></div>
          <div className="tabs" role="tablist" aria-label="SecondLook story">{story.map((item, index) => <button type="button" key={item.label} ref={element => { tabs.current[index] = element; }} role="tab" id={`secondlook-tab-${index}`} aria-selected={selected === index} aria-controls={`secondlook-story-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
            const next = event.key === "ArrowRight" ? (index + 1) % story.length : event.key === "ArrowLeft" ? (index + story.length - 1) % story.length : event.key === "Home" ? 0 : event.key === "End" ? story.length - 1 : -1;
            if (next >= 0) { event.preventDefault(); setSelected(next); tabs.current[next]?.focus(); }
          }}>{item.label}</button>)}</div>
          {story.map((item, index) => <p key={item.label} className={`tp ${selected === index ? "in" : ""}`} id={`secondlook-story-${index}`} role="tabpanel" aria-labelledby={`secondlook-tab-${index}`} hidden={selected !== index} tabIndex={0}>{item.text}</p>)}
          <div className="stk">{stack.map(technology => <span key={technology}>{technology}</span>)}</div>
          <a className="vp" href="https://trae4d3ed8mx.vercel.app" target="_blank" rel="noopener noreferrer">View project</a>
        </div>
        </div>
        </div>
      </section>;
}
