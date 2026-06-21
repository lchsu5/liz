import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Linkedin, MapPin } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const honors = [
  {
    title: "Zappurtunity Scholar",
    issuer: "Zappurtunity — selected from 300+ applicants",
    date: "Mar 2026",
  },
  {
    title: "Dean’s List",
    issuer: "Carnegie Mellon University",
    date: "Jan 2026",
  },
];

const clubs = [
  {
    name: "Business Technology Group",
    role: "Product Analyst '25–26 · Head of Outreach '26–27",
    note: "1 of 2 freshmen selected to build CMUsed — a campus secondhand marketplace. Led cross-functional feature development with engineers and designers.",
  },
  {
    name: "Taiwanese Student Association",
    role: "Freshman Rep '25–26 · PR Chair '26–27",
    note: "Culture Night logistics for 300+ attendees across 20+ orgs; organised a 40+ person ski trip.",
  },
  {
    name: "Foundry by ScottyLabs",
    role: "Talent Subcommittee Chair, Executive Board '26–27",
    note: "Built a 7-category venture-metrics framework; founder referrals to a16z, Sequoia, and Khosla — supporting $11M raised over 8 months.",
  },
];

export default function OverviewView() {
  const ref = useRef<HTMLElement>(null);

  return (
    <main ref={ref} className="min-h-screen">
      <ThemeController mode="overview" scrollRef={ref} />

      {/* Ambient animated background — visible mostly in dark */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[55vw] h-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.14), transparent 60%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-32">
        <div className="max-w-6xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-[11px] tracking-[0.32em] uppercase text-accent mb-8"
          >
            § 01 — Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-display tracking-tight text-foreground text-[56px] sm:text-[88px] md:text-[128px] leading-[0.95]"
          >
            Elizabeth
            <br />
            <span className="italic text-accent">Hsu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body text-[13px] md:text-[15px] tracking-[0.18em] uppercase text-accent mt-8 mb-4"
          >
            Business + AI @ Carnegie Mellon
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-[16px] md:text-[20px] text-foreground/80 max-w-2xl leading-relaxed"
          >
            I work at the seam of product, research, and venture — currently
            shipping with Adobe, Workiva, and Handshake.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-body text-[12px] tracking-[0.14em] uppercase text-foreground/65"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={13} className="text-accent" /> Irvine, CA
            </span>
            <a
              href="mailto:lchsu@andrew.cmu.edu"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={13} className="text-accent" /> lchsu@andrew.cmu.edu
            </a>
            <a
              href="https://www.linkedin.com/in/lizhhsu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Linkedin size={13} className="text-accent" /> linkedin.com/in/lizhhsu
            </a>
          </motion.div>
        </div>
      </section>

      {/* HONORS */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="§ 02" title="Honors & Awards" italicWord="Awards" />
          <div className="divide-y divide-border border-y border-border">
            {honors.map((h) => (
              <div
                key={h.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6"
              >
                <div className="md:col-span-8">
                  <h3 className="font-display text-[22px] md:text-[26px] text-foreground leading-tight">
                    {h.title}
                  </h3>
                  <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground mt-2">
                    {h.issuer}
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right self-center">
                  <p className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                    {h.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS LEADERSHIP */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="§ 03"
            title="Campus Leadership"
            italicWord="Leadership"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {clubs.map((c) => (
              <TiltCard
                key={c.name}
                className="bg-background p-7 flex flex-col"
                maxDeg={4}
              >
                <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent mb-4">
                  {c.role}
                </p>
                <h3 className="font-display text-[22px] text-foreground leading-tight mb-4">
                  {c.name}
                </h3>
                <p className="font-body text-[13px] text-foreground/70 leading-relaxed mt-auto">
                  {c.note}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECONDLOOK HIGHLIGHT */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="§ 04" title="Latest Build" italicWord="Build" />
          <TiltCard maxDeg={3}>
            <a
              href="https://trae4d3ed8mx.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block group border border-border bg-card/40 hover:bg-card/70 transition-colors duration-300 p-8 md:p-12"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="font-body text-[11px] tracking-[0.18em] uppercase text-accent mb-3">
                    SecondLook · Jan 2026
                  </p>
                  <h3 className="font-display text-[34px] md:text-[48px] text-foreground leading-[1.05] mb-4">
                    A vision-powered{" "}
                    <span className="italic text-accent">STEM tutor</span> that
                    catches mistakes as you make them.
                  </h3>
                  <p className="font-body text-[15px] text-foreground/75 leading-relaxed max-w-2xl">
                    Watches handwritten math over a live iPad screen share,
                    pinpoints where reasoning breaks down, and intervenes
                    without giving away the answer.
                  </p>
                </div>
                <ArrowUpRight
                  size={28}
                  className="text-foreground/50 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                />
              </div>
            </a>
          </TiltCard>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-12 py-24 pb-40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="§ 05" title="Get in Touch" italicWord="Touch" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:lchsu@andrew.cmu.edu"
              className="group flex items-center justify-between gap-4 border border-border hover:border-accent bg-card/30 hover:bg-card/60 transition-all duration-200 px-6 py-6"
            >
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">
                    Email
                  </p>
                  <p className="font-body text-[14px] text-foreground">
                    lchsu@andrew.cmu.edu
                  </p>
                </div>
              </div>
              <span className="font-body text-[11px] text-foreground/40 group-hover:text-accent transition-colors">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/lizhhsu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border border-border hover:border-accent bg-card/30 hover:bg-card/60 transition-all duration-200 px-6 py-6"
            >
              <div className="flex items-center gap-4">
                <Linkedin size={20} className="text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">
                    LinkedIn
                  </p>
                  <p className="font-body text-[14px] text-foreground">
                    linkedin.com/in/lizhhsu
                  </p>
                </div>
              </div>
              <span className="font-body text-[11px] text-foreground/40 group-hover:text-accent transition-colors">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
