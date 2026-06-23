import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import CampusSection from "../CampusSection";
import PhotoCard from "../PhotoCard";

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
      <ThemeController mode="light" />

      {/* ─── HERO ─── photo card left · text right */}
      <section className="px-6 md:px-12 pt-32 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <PhotoCard />
          </motion.div>

          {/* Text column */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-body text-[10px] tracking-[0.32em] uppercase text-foreground/38 mb-4"
            >
              § Personal Portfolio
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="origin-left border-t border-foreground/15 mb-6"
            />

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
              className="font-display tracking-tight text-foreground text-[56px] sm:text-[70px] md:text-[86px] leading-[0.9]"
            >
              Elizabeth
              <br />
              <span className="italic text-accent" style={{ paddingLeft: "0.18em" }}>
                Hsu
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="font-body text-[12px] tracking-[0.2em] uppercase text-accent mt-7"
            >
              Business + AI @ Carnegie Mellon
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-[15px] md:text-[17px] text-foreground/60 max-w-md leading-relaxed mt-3"
            >
              Product, research, and venture — currently shipping with Adobe and Workiva.
            </motion.p>

            {/* Current role chips */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {currentChips.map((c) => (
                <span
                  key={c.org}
                  className="font-body text-[10px] tracking-[0.18em] uppercase border border-accent/30 text-foreground/65 px-3 py-1.5 hover:bg-accent/10 hover:border-accent/50 transition-colors"
                >
                  <span className="text-accent">●</span>{" "}
                  {c.org}
                  <span className="text-foreground/30 mx-1.5">/</span>
                  {c.role}
                </span>
              ))}
            </motion.div>

            {/* Contact row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-3 font-body text-[11px] tracking-[0.14em] uppercase text-foreground/42"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-accent" /> Irvine, CA
              </span>
              <a
                href="mailto:lchsu@andrew.cmu.edu"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Mail size={12} className="text-accent" /> lchsu@andrew.cmu.edu
              </a>
              <a
                href="https://www.linkedin.com/in/lizhhsu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Linkedin size={12} className="text-accent" /> linkedin.com/in/lizhhsu
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── narrow column */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[680px] mx-auto">
          <SectionHeader title="Education" />

          <div className="border-t border-foreground/10 pt-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <h3 className="font-display text-[36px] md:text-[44px] text-foreground leading-[0.95]">
                Carnegie Mellon
                <br />
                <span className="italic text-accent">University</span>
              </h3>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/35 sm:text-right flex-shrink-0 leading-loose">
                Expected<br />May 2029
              </p>
            </div>
            <p className="font-body text-[14px] text-foreground/68 leading-relaxed">
              B.S. Business Administration · Concentration in Artificial Intelligence
            </p>
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-foreground/38 mt-3">
              Tepper School of Business · Pittsburgh, PA
            </p>
          </div>

          <div className="border-t border-foreground/10" />
        </div>
      </section>

      {/* ─── CAMPUS LEADERSHIP ─── visual break (has photos) */}
      <CampusSection />

      {/* ─── LANGUAGES ─── narrow column */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[680px] mx-auto">
          <SectionHeader title="Languages" />

          {languages.map((l) => (
            <div
              key={l.name}
              className="border-t border-foreground/10 py-6 flex items-baseline justify-between gap-6"
            >
              <span className="font-display text-[28px] md:text-[32px] text-foreground">
                {l.name}
              </span>
              <span className="font-body text-[10px] tracking-[0.22em] uppercase text-foreground/35 flex-shrink-0">
                {l.level}
              </span>
            </div>
          ))}
          <div className="border-t border-foreground/10" />
        </div>
      </section>

      {/* ─── CONTACT ─── narrow column */}
      <section className="px-6 md:px-12 py-20 pb-44">
        <div className="max-w-[680px] mx-auto">
          <SectionHeader title="Get in Touch" />

          <a
            href="mailto:lchsu@andrew.cmu.edu"
            className="group border-t border-foreground/10 py-5 flex items-center justify-between"
          >
            <span className="font-body text-[15px] text-foreground/68 group-hover:text-accent transition-colors duration-200">
              lchsu@andrew.cmu.edu
            </span>
            <span className="font-body text-[10px] tracking-[0.22em] uppercase text-foreground/28 group-hover:text-accent transition-colors duration-200">
              Email →
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/lizhhsu"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-t border-foreground/10 py-5 flex items-center justify-between"
          >
            <span className="font-body text-[15px] text-foreground/68 group-hover:text-accent transition-colors duration-200">
              linkedin.com/in/lizhhsu
            </span>
            <span className="font-body text-[10px] tracking-[0.22em] uppercase text-foreground/28 group-hover:text-accent transition-colors duration-200">
              LinkedIn →
            </span>
          </a>

          <div className="border-t border-foreground/10" />
        </div>
      </section>
    </main>
  );
}
