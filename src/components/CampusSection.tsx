import { motion } from "framer-motion";
import btgImg from "@/assets/btg.jpeg";
import tsaImg from "@/assets/taiwanese_student_association.jpeg";
import foundryImg from "@/assets/foundry.jpeg";
import SectionHeader from "./SectionHeader";

const orgs = [
  {
    name: "Business Technology Group",
    image: btgImg,
    roles: [
      { title: "Head of Outreach", years: "2026–27" },
      { title: "Product Analyst", years: "2025–26" },
    ],
    bullets: [
      "Selected as 1 of 2 freshmen to build CMUsed, a secondhand marketplace addressing resale friction on campus.",
      "Led cross-functional feature development with engineers and designers, refining listing flow and search UX.",
    ],
  },
  {
    name: "Taiwanese Student Association",
    image: tsaImg,
    roles: [
      { title: "Public Relations Chair", years: "2026–27" },
      { title: "Freshman Representative", years: "2025–26" },
    ],
    bullets: [
      "Coordinated Culture Night logistics for 300+ attendees, aligning 20+ student organizations.",
      "Planned and executed a 40+ person ski trip, managing transportation, budgeting, and ops.",
    ],
  },
  {
    name: "Foundry by ScottyLabs",
    image: foundryImg,
    roles: [
      { title: "Talent Subcommittee Chair, Executive Board", years: "2026–27" },
    ],
    bullets: [
      "Designed a 7-category framework analyzing critical venture metrics to identify high-signal builders.",
      "Facilitated founder referrals to a16z, Sequoia, and Khosla — supporting $11M raised over 8 months.",
    ],
  },
];

const [featured, ...rest] = orgs;

export default function CampusSection() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl">
        <SectionHeader
          title="Campus Leadership"
          description="Involvement across product, culture, and venture at CMU."
        />

        {/* Bento: one large horizontal feature card + two compact stacked cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Featured — spans 7 cols, image + content side by side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="group md:col-span-7 rounded-[28px] border border-border bg-card/60 overflow-hidden lift-card grid grid-cols-1 sm:grid-cols-5"
          >
            <div className="sm:col-span-2 h-52 sm:h-full overflow-hidden">
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="sm:col-span-3 flex flex-col p-7 md:p-8">
              <p className="font-body text-[10px] tracking-[0.24em] uppercase text-accent mb-3">
                {featured.name}
              </p>
              <div className="flex flex-col gap-1 mb-5">
                {featured.roles.map((r) => (
                  <div key={r.title} className="font-body text-[13px] text-foreground/90">
                    <span className="font-medium">{r.title}</span>
                    <span className="text-muted-foreground"> · {r.years}</span>
                  </div>
                ))}
              </div>
              <ul className="mt-auto flex flex-col gap-3">
                {featured.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 items-start">
                    <span className="text-accent text-[12px] mt-0.5 shrink-0">—</span>
                    <span className="font-body text-[13px] text-foreground/65 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Secondary — stacked compact cards, 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-5">
            {rest.map((org, i) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                className="group flex-1 flex gap-4 rounded-2xl border border-border bg-card/40 overflow-hidden lift-card p-4"
              >
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-accent mb-1.5 truncate">
                    {org.name}
                  </p>
                  <div className="font-body text-[11px] text-foreground/90 mb-2">
                    {org.roles.map((r) => (
                      <div key={r.title}>
                        <span className="font-medium">{r.title}</span>
                        <span className="text-muted-foreground"> · {r.years}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {org.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 items-start">
                        <span className="text-accent text-[10px] mt-0.5 shrink-0">—</span>
                        <span className="font-body text-[11px] text-foreground/60 leading-snug">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
