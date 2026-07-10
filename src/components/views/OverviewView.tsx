import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, ArrowDown } from "lucide-react";
import headshotImg from "@/assets/headshot.jpg";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import CampusSection from "../CampusSection";

const languages = [
  { name: "English", level: "Native or Bilingual" },
  { name: "Chinese (Mandarin)", level: "Limited Working" },
];

const currentChips = [
  { org: "Adobe", role: "Student Ambassador" },
  { org: "Workiva", role: "PM Intern" },
];

export default function OverviewView() {
  return (
    <main className="min-h-screen">
      <ThemeController />

      {/* HERO — asymmetric editorial spread */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-24 pb-24 overflow-hidden">
        {/* Ambient accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="absolute -top-32 -right-40 w-[60vw] h-[60vw] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--accent) / 0.12), transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-[50vw] h-[50vw] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 60%)",
              filter: "blur(50px)",
            }}
          />
          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(var(--foreground) / 0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="font-display tracking-tight text-foreground text-[48px] sm:text-[64px] md:text-[84px] leading-[0.92] whitespace-nowrap"
            >
              Elizabeth Hsu
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-[13px] md:text-[14px] tracking-[0.18em] uppercase text-accent mt-7"
            >
              Business + AI @ Carnegie Mellon
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-body text-[16px] md:text-[19px] text-foreground/75 max-w-xl leading-relaxed mt-5"
            >
              I work at the intersection of product, research, and venture, currently
              shipping with Adobe and Workiva.
            </motion.p>

            {/* Quick chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {currentChips.map((c) => (
                <span
                  key={c.org}
                  className="font-body text-[10px] tracking-[0.18em] uppercase border border-accent/40 rounded-full text-foreground/80 px-3.5 py-1.5 hover:bg-accent/10 hover:border-accent transition-colors duration-300"
                >
                  <span className="text-accent">●</span> {c.org}
                  <span className="text-foreground/40 mx-1.5">/</span>
                  {c.role}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
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

          {/* RIGHT — creative photo placeholder */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[440px] md:w-[380px] md:h-[480px]"
            >
              {/* Rotated outlined frame behind */}
              <motion.div
                animate={{ rotate: [6, 8, 6] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-accent/50"
                style={{ transformOrigin: "center" }}
              />

              {/* Accent block bottom-left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent"
              />

              {/* The blob-masked photo container */}
              <div
                className="absolute inset-0 overflow-hidden border border-border"
                style={{
                  borderRadius: "62% 38% 54% 46% / 48% 56% 44% 52%",
                }}
              >
                <img
                  src={headshotImg}
                  alt="Elizabeth Hsu"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating caption card top-right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-4 -right-4 sm:-right-8 bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-[0_16px_40px_-16px_hsl(0_0%_0%/0.6)] px-4 py-3"
              >
                <p className="font-body text-[9px] tracking-[0.22em] uppercase text-accent">
                  Based in
                </p>
                <p className="font-display text-[16px] text-foreground mt-0.5">
                  Irvine, <span className="italic">CA</span>
                </p>
              </motion.div>

              {/* Floating contact badge bottom-right */}
              <motion.a
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                href="mailto:lchsu@andrew.cmu.edu"
                className="absolute -bottom-2 -right-6 sm:-right-10 bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-[0_16px_40px_-16px_hsl(0_0%_0%/0.6)] px-4 py-3 flex items-center gap-2 hover:border-accent hover:bg-accent/10 transition-colors duration-200"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/80">
                  Contact me
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50"
        >
          <span className="font-body text-[9px] tracking-[0.28em] uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </section>


      {/* EDUCATION */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Education" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card/40 p-7 md:p-10 lift-card grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          >
            <div className="md:col-span-5">
              <h3 className="font-display text-[26px] md:text-[34px] text-foreground leading-tight">
                Carnegie Mellon University
              </h3>
              <p className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground mt-3">
                Tepper School of Business · Pittsburgh, PA
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <p className="font-body text-[15px] text-foreground/90">
                  B.S. Business Administration · Concentration in Artificial Intelligence
                </p>
                <p className="font-body text-[11px] tracking-[0.14em] uppercase text-accent whitespace-nowrap">
                  Expected May 2028
                </p>
              </div>
              <p className="font-body text-[13px] text-foreground/65 mt-4 leading-relaxed">
                Coursework spanning business analytics, computer science, and applied AI.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAMPUS LEADERSHIP */}
      <CampusSection />

      {/* LANGUAGES */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Languages" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-border bg-card/40 py-8 px-7 lift-card"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[28px] text-foreground">{l.name}</span>
                  <span className="font-body text-[10px] tracking-[0.18em] uppercase text-accent">
                    {l.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-12 py-24 pb-40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Get in Touch" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:lchsu@andrew.cmu.edu"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border hover:border-accent bg-card/40 hover:bg-card/70 transition-all duration-300 px-6 py-6 lift-card"
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
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border hover:border-accent bg-card/40 hover:bg-card/70 transition-all duration-300 px-6 py-6 lift-card"
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
