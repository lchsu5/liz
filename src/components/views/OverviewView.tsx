import { useRef } from "react";
import pinkWallPhoto from "@/assets/elizabeth-pink-wall.jpeg";
import cmuCampus from "@/assets/cmucampus.jpeg";
import { useOverviewEffects } from "./useOverviewEffects";
import { useHeroPhotoTrail } from "./useHeroPhotoTrail";
import "./OverviewView.css";

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

<section id="contact" aria-label="Get in touch">
  <div className="contact-intro"><span className="scr">Get in touch</span><p>Always open to connecting, whether it's a role, a project, or just a chat.</p></div>
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
