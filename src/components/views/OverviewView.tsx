import { useRef } from "react";
import pinkWallPhoto from "@/assets/optimized/elizabeth-pink-wall.jpeg";
import cmuCampus from "@/assets/cmucampus.jpeg";
import cmuLogo from "@/assets/cmu.webp";
import eyLogo from "@/assets/ey.jpg";
import { useOverviewEffects } from "./useOverviewEffects";
import { useHeroPhotoTrail } from "./useHeroPhotoTrail";
import "./OverviewView.css";

const logoPath = (name: string) => `${import.meta.env.BASE_URL}logos/${name}.png`;

const experiences = [
  {
    title: "Ambassador", company: "Google", employment: "Part-time",
    dates: "Aug 2026 – Present", logo: logoPath("google"),
    notes: ["0.003% AR", "Founding Cohort"],
  },
  {
    title: "Campus Lead", company: "Notion", employment: "",
    dates: "Aug 2026 – Present", logo: logoPath("notion"),
    notes: ["1 of 5 CMU campus leads"],
  },
  {
    title: "Sales Development", company: "Workiva", employment: "",
    dates: "Jan 2027 – May 14, 2027", logo: logoPath("workiva"),
    notes: ["Spring 2027 Intern", "Account Intelligence"],
  },
  {
    title: "Product Management Intern", company: "Workiva", employment: "Internship",
    dates: "May 2026 – Aug 2026", logo: logoPath("workiva"),
    notes: [
      "Youngest Intern @ Workiva Summer 2026",
      "AI Agentic Products under the Sustainability Strategy & Product Team, Solution Development",
      "Sole Undergraduate PM Intern",
    ],
  },
  {
    title: "Research Assistant, LLM Safety & Evaluation", company: "Carnegie Mellon University", employment: "",
    dates: "Mar 2026 – May 2026", logo: cmuLogo,
    location: "Pittsburgh, Pennsylvania, United States",
    notes: ["Paid Research Assistant Working with Professor Derek Leben on LLM Safety"],
  },
  {
    title: "Management Consulting Intern", company: "EY", employment: "Internship",
    dates: "May 2024 – Aug 2024", logo: eyLogo,
    location: "Orange County, California, United States",
    notes: ["Sustainability, Circular Economy"],
  },
];

export default function OverviewView() {
  const root = useRef<HTMLElement>(null);
  useHeroPhotoTrail(root);
  useOverviewEffects(root);
  return <main ref={root} className="overview-reference">

<div id="bar"></div>

<section id="hero"><div className="stick">
  <div id="ph"><img id="imgP" alt="Elizabeth Hsu" src={pinkWallPhoto} /><div id="ov"></div><div className="hero-photo-trail" aria-hidden="true"></div></div>
  <div className="strip" id="strip"><div className="tr" id="tr2"></div></div>
  <h1 id="hn" className="big">Elizabeth Hsu</h1>
  <div id="hs">Business + AI @ Carnegie Mellon</div>
</div></section>

<section id="experience" aria-labelledby="experience-heading">
  <div className="experience-inner">
    <h2 id="experience-heading">Experience</h2>
    <div className="experience-grid">
      {experiences.map(experience => (
        <article className="experience-entry" key={`${experience.company}-${experience.title}`}>
          <img className="experience-logo" src={experience.logo} alt={`${experience.company} logo`} width="80" height="80" loading="lazy" />
          <div className="experience-copy">
            <h3>{experience.title}</h3>
            <p className="experience-company">{experience.company}{experience.employment && ` · ${experience.employment}`}</p>
            <p className="experience-dates">{experience.dates}</p>
            {experience.location && <p className="experience-location">{experience.location}</p>}
            <div className="experience-notes">
              {experience.notes.map(note => <p key={note}>{note}</p>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

<section id="contact" aria-label="Get in touch">
  <div className="contact-intro"><span>Get in touch</span></div>
  <div className="contact-links">
    <a className="contact-link" href="mailto:lchsu@andrew.cmu.edu" aria-label="LCHSU@ANDREW.CMU.EDU"><span className="contact-title" aria-hidden="true">LCHSU@ANDREW.CMU.EDU</span></a>
    <a className="contact-link" href="https://linkedin.com/in/lizhhsu" target="_blank" rel="noopener noreferrer" aria-label="LINKEDIN / LIZHHSU"><span className="contact-title" aria-hidden="true">LINKEDIN / LIZHHSU</span></a>
    <a className="contact-link" href="https://elizabeth-hsu-portfolio.lovable.app/" target="_blank" rel="noopener noreferrer" aria-label="AMBASSADOR PORTFOLIO"><span className="contact-title" aria-hidden="true">AMBASSADOR PORTFOLIO</span></a>
  </div>
</section>

<section id="education">
  <div className="eb">
    <img id="imgC" alt="Carnegie Mellon campus" src={cmuCampus} loading="lazy" />
    <div className="sh"></div>
    <div className="gl scr et">Education</div>
    <div className="tx"><h2 className="big">Carnegie Mellon University</h2><p>Tepper School of Business · May 2028 · Pittsburgh, PA</p><p className="dg">B.S. Business Administration, minor in Artificial Intelligence.</p></div>
  </div>
</section>





</main>;
}
