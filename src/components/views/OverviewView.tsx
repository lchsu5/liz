import { useRef } from "react";
import cmuCampus from "@/assets/cmucampus.jpg";
import type { ViewKey } from "@/lib/navigation";
import { useOverviewEffects } from "./useOverviewEffects";
import "./OverviewView.css";

export default function OverviewView({ onNavigate }: { onNavigate: (view: ViewKey) => void }) {
  const root = useRef<HTMLElement>(null);
  useOverviewEffects(root, onNavigate);
  return <main ref={root} className="overview-reference">

<div id="bar"></div>

<section id="hero"><div className="stick">
  <div id="ph"><img id="imgP" alt="Elizabeth Hsu" src="/overview-reference/elizabeth-pink-wall.jpeg" /><div id="ov"></div><div className="hero-photo-trail" aria-hidden="true"></div></div>
  <div className="strip" id="strip"><div className="tr" id="tr2"></div></div>
  <div id="hm"><span>Based in Irvine, CA</span><span>Business + AI, Carnegie Mellon</span></div>
  <h1 id="hn" className="big">Elizabeth Hsu</h1>
  <div id="hs">Currently shipping with Workiva and Google</div>
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
    <img id="imgC" alt="Carnegie Mellon campus" src={cmuCampus} />
    <div className="sh"></div>
    <div className="gl scr et">Education</div>
    <div className="tx"><h2 className="big">Carnegie Mellon University</h2><p>Tepper School of Business · Expected May 2028 · Pittsburgh, PA</p><p className="dg">B.S. Business Administration, minor in Artificial Intelligence.</p></div>
  </div>
</section>

<section id="lead">
  <div className="top"><div className="gl scr">Campus leadership</div><p>Involvement across product, culture, and venture at CMU.</p></div>
  <div className="cols">
  <article className="lc"><div className="im"><img alt="BTG team" src="/overview-reference/photo-2.jpg" /></div><div className="bd"><div className="og">Business Technology Group</div><div className="rr"><div><b>Head of Outreach</b> <span className="gl">· 2026–27</span></div><div><b>Product Analyst</b> <span className="gl">· 2025–26</span></div></div><ul><li>Selected as 1 of 2 freshmen to build CMUsed, a secondhand marketplace addressing resale friction on campus.</li><li>Led cross-functional feature development with engineers and designers, refining listing flow and search UX.</li></ul></div></article>
  <article className="lc"><div className="im"><img alt="Taiwanese Student Association team" src="/overview-reference/photo-3.jpg" /></div><div className="bd"><div className="og">Taiwanese Student Association</div><div className="rr"><div><b>Public Relations Chair</b> <span className="gl">· 2026–27</span></div><div><b>Freshman Representative</b> <span className="gl">· 2025–26</span></div></div><ul><li>Coordinated Culture Night logistics for 300+ attendees, aligning 20+ student organizations.</li><li>Planned and executed a 40+ person ski trip, managing transportation, budgeting, and ops.</li></ul></div></article>
  <article className="lc"><div className="im"><img alt="Foundry by ScottyLabs team at the CMU sign" src="/overview-reference/photo-4.jpg" /></div><div className="bd"><div className="og">Foundry by ScottyLabs</div><div className="rr"><div><b>Talent Subcommittee Chair, Executive Board</b> <span className="gl">· 2026–27</span></div></div><ul><li>Designed a 7-category framework analyzing critical venture metrics to identify high-signal builders.</li><li>Facilitated founder referrals to a16z, Sequoia, and Khosla — supporting $11M raised over 8 months.</li></ul></div></article>
</div>
</section>

<footer id="overview-footer">
  <div className="ft gl"><span>Irvine, CA <span id="ck"></span></span><span>©2026</span></div>
</footer>
<div id="wp" className="big"></div>


</main>;
}
