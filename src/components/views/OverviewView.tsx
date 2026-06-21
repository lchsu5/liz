import { motion } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, MapPin } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import CampusSection from "../CampusSection";

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
      <CampusSection />

      {/* CONTACT */}
      <section className="px-6 md:px-12 py-24 pb-40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="§ 04" title="Get in Touch" italicWord="Touch" />
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
