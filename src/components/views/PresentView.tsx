import { useEffect, useRef } from "react";
import cmuCampus from "@/assets/cmucampus.jpeg";
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
import psbtg from "@/assets/psbtg.jpeg";
import btgBoard from "@/assets/btgboard.jpeg";
import "./PresentView.css";

const collegeLifePhotos = [collegeLife1, collegeLife2, collegeLife3, collegeLife4, collegeLife5, collegeLife6, collegeLife7, collegeLife8, psbtg, btgBoard];

const roles = [
  { company: "Google", dates: "August 2026 - Present", title: "Student Ambassador", team: "Campus Innovation & Developer Engagement", focus: "Google AI · Campus Engagement · Product Adoption", details: [
    "Selected from 35,000+ applicants as 1 of 100 students in Google's first U.S. ambassador cohort.",
    "Spent three days at Google HQ in Mountain View learning from product leaders, including Chrome and Consumer Apps VPs.",
    "Creating opportunities for CMU students to build with and use Google's AI tools.",
  ] },
  { company: "Workiva", dates: "January 2027 - May 2027", title: "Incoming Sales Development Intern", team: "Account Intelligence & Sales Development", focus: "Account Research · Prospect Insights · Engagement Strategy", details: [
    "Joining Workiva's Sales Development team remotely for Spring 2027.",
    "Will research current and prospective accounts to identify key contacts, business needs, and new business opportunities.",
    "Will organize account intelligence and collaborate on engagement strategies, supporting outreach campaigns and sales pipeline growth with accurate data and insights.",
    "Will build knowledge of Workiva's products and market dynamics to strengthen account research.",
  ] },
  { company: "Carnegie Mellon University", dates: "September 8 - December 6, 2026", title: "Brand and Marketing Ambassador", team: "Division of Enrollment Management", details: [
    "Part-time student position for the Fall 2026 semester.",
  ] },
  { company: "Canva", dates: "August 2026 - May 15, 2027", title: "Campus Canvassador", team: "Campus Canvassadors Program (United States)", focus: "Campus Engagement / Design Education / Community Building", details: [
    "1 of 2 ambassadors at CMU.",
    "Campus outreach focuses on Canva workshops, student events, promotional materials, and creative collaborations with student organizations.",
    "Program participation includes opportunities to share tutorials and resources, exchange feedback with the Canva team, and propose campus events for Canva Community Fund support.",
  ] },
  { company: "Adobe", dates: "August 2026 - Present", title: "Ambassador", details: ["First Adobe ambassador at CMU."] },
  { company: "Notion", dates: "August 2026 - Present", title: "Campus Lead", details: [
    "1 of 5 CMU campus leads.",
  ] },
];
export default function PresentView() {
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
      <section className="sec appointments" aria-labelledby="present-now">
        <h1 className="lab" id="present-now">Experience</h1>
        <div className="body">{roles.map(role => (
          <article className="role" key={`${role.company}-${role.title}`}>
            <header className="role-header">
              <h2 className="role-company">{role.company}</h2>
              {role.dates && <span className="yr">{role.dates}</span>}
              <p className="role-title">{role.title}</p>
            </header>
            {"team" in role && <p className="role-team">{role.team}</p>}
            {role.details.length > 0 && <p className="role-details">{role.details.join(" ")}</p>}
            {"focus" in role && <p className="role-focus">Focus: {role.focus}</p>}
          </article>
        ))}</div>
      </section>
<section id="education" className="sec education" aria-labelledby="education-heading">
  <h2 id="education-heading" className="lab">Education</h2>
  <div className="eb">
    <img id="imgC" alt="Carnegie Mellon campus" src={cmuCampus} loading="lazy" />
    <div className="sh"></div>
    <div className="tx"><h2 className="big">Carnegie Mellon University</h2><p>Tepper School of Business · May 2028 · Pittsburgh, PA</p><p className="dg">B.S. Business Administration, minor in Artificial Intelligence.</p></div>
  </div>
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
      <section className="sec college-life" aria-labelledby="present-community">
        <h2 className="lab" id="present-community">Community @CMU</h2>
        <div className="college-life-gallery">
          {collegeLifePhotos.map(photo => <div className="college-life-photo" key={photo}>
            <img src={photo} alt="" loading="lazy" />
          </div>)}
        </div>
      </section>

    </div>
  </main>;
}

