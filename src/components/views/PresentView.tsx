import { useEffect, useRef, useState } from "react";
import btgPhoto from "@/assets/btg.jpg";
import tsaPhoto from "@/assets/tsa.jpg";
import foundryPhoto from "@/assets/foundry.jpg";
import collegeLife1 from "@/assets/1.1.jpeg";
import collegeLife2 from "@/assets/1.2.JPG?url";
import collegeLife3 from "@/assets/1.3.jpeg";
import collegeLife4 from "@/assets/1.4.JPG?url";
import collegeLife5 from "@/assets/1.5.JPEG?url";
import collegeLife6 from "@/assets/1.6.JPG?url";
import collegeLife7 from "@/assets/1.7.jpg";
import collegeLife8 from "@/assets/1.8.JPEG?url";
import "./PresentView.css";

const collegeLifePhotos = [collegeLife1, collegeLife2, collegeLife3, collegeLife4, collegeLife5, collegeLife6, collegeLife7, collegeLife8];

const roles = [
  { company: "Workiva", dates: "May - August 2026", title: "Product Management Intern", details: [
    "Youngest intern and sole undergraduate PM intern at Workiva, Summer 2026.",
    "Building AI agentic products on the Sustainability Strategy and Product team, within Solution Development.",
    "Owning the product lifecycle from discovery through launch for Fortune 500 finance teams.",
  ] },
  { company: "Google", dates: "August 2026 - Present", title: "Student Ambassador", details: [
    "Selected from 35,000+ applicants as 1 of 100 students in Google's first U.S. ambassador cohort.",
    "Spent three days at Google HQ in Mountain View learning from product leaders, including Chrome and Consumer Apps VPs.",
    "Creating opportunities for CMU students to build with and use Google's AI tools.",
  ] },
];
const story = [
  { label: "Problem", text: "Students often understand advanced concepts but carry foundational misconceptions that were never corrected. Many are too embarrassed to ask about things they feel they should already know, so small errors compound into long-term habits." },
  { label: "Approach", text: "Watches handwritten math over a live iPad screen share from apps like GoodNotes or Notability. A vision-language model finds the exact step where reasoning breaks down, then explains why it is wrong and what the next step should be. A second model writes review notes at the end of each session." },
  { label: "Result", text: "Built at NexHacks as a working real-time pipeline. It focuses on how students think, not only whether the answer is right, and never gives the solution. Planned next: free rollout to elementary schools, then SAT and ACT prep partners." },
];
const stack = ["React", "Vite", "Tailwind", "Python", "Gemini 2.5", "Qwen3-VL", "Overshoot", "WebRTC", "TRAE"];

export default function PresentView() {
  const [expanded, setExpanded] = useState<string[]>(["Workiva"]);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.width = `${max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0}%`;
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <main className="present-reference">
    <div className="present-progress" ref={progress} aria-hidden="true" />

    <div className="present-content">
      <section className="sec" aria-labelledby="present-now">
        <h1 className="lab" id="present-now">Right now</h1>
        <div className="body">{roles.map(role => {
          const open = expanded.includes(role.company);
          return <article className={`role ${open ? "open" : ""}`} key={role.company}>
            <button type="button" aria-expanded={open} aria-controls={`present-${role.company}`} onClick={() => setExpanded(current => open ? current.filter(company => company !== role.company) : [...current, role.company])}>
              <b>{role.company}</b><span className="yr">{role.dates}</span>
              <span className="ttl">{role.title}</span><i className="ic" aria-hidden="true" />
            </button>
            <div className="pn" id={`present-${role.company}`} aria-hidden={!open}><div><ul>{role.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div></div>
          </article>;
        })}</div>
      </section>
<section className="sec campus-leadership" aria-labelledby="present-leadership">
  <h2 className="lab" id="present-leadership">Campus leadership</h2>
  <div className="leadership-body"><p className="leadership-intro">Involvement across product, culture, and venture at CMU.</p>
  <div className="cols">
  <article className="lc"><div className="im"><img alt="BTG team" src={btgPhoto} loading="lazy" /></div><div className="bd"><div className="og">Business Technology Group</div><div className="rr"><div><b>Head of Outreach</b> <span className="gl">· 2026–27</span></div><div><b>Product Analyst</b> <span className="gl">· 2025–26</span></div></div><ul><li>Selected as 1 of 2 freshmen to build CMUsed, a secondhand marketplace addressing resale friction on campus.</li><li>Led cross-functional feature development with engineers and designers, refining listing flow and search UX.</li></ul></div></article>
  <article className="lc"><div className="im"><img alt="Taiwanese Student Association team" src={tsaPhoto} loading="lazy" /></div><div className="bd"><div className="og">Taiwanese Student Association</div><div className="rr"><div><b>Public Relations Chair</b> <span className="gl">· 2026–27</span></div><div><b>Freshman Representative</b> <span className="gl">· 2025–26</span></div></div><ul><li>Coordinated Culture Night logistics for 300+ attendees, aligning 20+ student organizations.</li><li>Planned and executed a 40+ person ski trip, managing transportation, budgeting, and ops.</li></ul></div></article>
  <article className="lc"><div className="im"><img alt="Foundry by ScottyLabs team at the CMU sign" src={foundryPhoto} loading="lazy" /></div><div className="bd"><div className="og">Foundry by ScottyLabs</div><div className="rr"><div><b>Talent Subcommittee Chair, Executive Board</b> <span className="gl">· 2026–27</span></div></div><ul><li>Designed a 7-category framework analyzing critical venture metrics to identify high-signal builders.</li><li>Facilitated founder referrals to a16z, Sequoia, and Khosla — supporting $11M raised over 8 months.</li></ul></div></article>
</div>
  </div>
</section>
      <section className="sec college-life" aria-label="College life photos">
        <div className="college-life-gallery">
          {collegeLifePhotos.map(photo => <div className="college-life-photo" key={photo}>
            <img src={photo} alt="" loading="lazy" />
          </div>)}
        </div>
      </section>
      <section className="sec" aria-labelledby="present-build">
        <h2 className="lab" id="present-build">Latest build</h2>
        <div className="proj">
          <div className="meta"><span className="gl">SecondLook · Jan 2026</span></div>
          <h2>A vision-powered STEM tutor that catches mistakes as you make them.</h2>
          <div className="demo"><div className="demo-placeholder"><strong>SecondLook</strong><p>Demo clip coming soon</p></div></div>
          <div className="tabs" role="tablist" aria-label="SecondLook story">{story.map((item, index) => <button type="button" key={item.label} ref={element => { tabs.current[index] = element; }} role="tab" id={`present-tab-${index}`} aria-selected={selected === index} aria-controls={`present-story-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
            const next = event.key === "ArrowRight" ? (index + 1) % story.length : event.key === "ArrowLeft" ? (index + story.length - 1) % story.length : event.key === "Home" ? 0 : event.key === "End" ? story.length - 1 : -1;
            if (next >= 0) { event.preventDefault(); setSelected(next); tabs.current[next]?.focus(); }
          }}>{item.label}</button>)}</div>
          {story.map((item, index) => <p key={item.label} className={`tp ${selected === index ? "in" : ""}`} id={`present-story-${index}`} role="tabpanel" aria-labelledby={`present-tab-${index}`} hidden={selected !== index} tabIndex={0}>{item.text}</p>)}
          <div className="stk">{stack.map(technology => <span key={technology}>{technology}</span>)}</div>
          <a className="vp" href="https://trae4d3ed8mx.vercel.app" target="_blank" rel="noopener noreferrer">View project</a>
        </div>
      </section>
    </div>
  </main>;
}

