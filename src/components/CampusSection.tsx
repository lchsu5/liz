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

export default function CampusSection() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="w-full">
        <SectionHeader
          title="Campus Leadership"
          description="Involvement across product, culture, and venture at CMU."
        />

        {/* Three equal-width, equal-height cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {orgs.map((org, i) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col h-full overflow-hidden rounded-md border border-border bg-background transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.12] hover:z-20 hover:shadow-2xl"
            >
              <div className="h-56 md:h-64 shrink-0 overflow-hidden">
                <img
                  src={org.image}
                  alt={org.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <p className="font-body text-[9px] tracking-[0.16em] uppercase text-accent mb-3">
                  {org.name}
                </p>

                <div className="flex flex-col gap-1 mb-5">
                  {org.roles.map((r) => (
                    <div key={r.title} className="font-body text-[13px] text-foreground/90">
                      <span className="font-semibold">{r.title}</span>
                      <span className="text-muted-foreground"> · {r.years}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-auto flex flex-col gap-3">
                  {org.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 items-start">
                      <span className="w-1 h-1 rounded-full bg-accent opacity-70 mt-1.5 shrink-0" />
                      <span className="font-body text-[12px] text-foreground/65 leading-relaxed">
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
    </section>
  );
}
