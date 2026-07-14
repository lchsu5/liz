import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, ArrowDown, Briefcase } from "lucide-react";
import headshotImg from "@/assets/headshot.jpg";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import CampusSection from "../CampusSection";

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

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
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

            {/* Status + contact — split into two unequal blocks instead of one inline row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-x-8 gap-y-6 max-w-xl"
            >
              {/* Currently — stacked rows, col-span-5 */}
              <div className="sm:col-span-5">
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
                  Currently
                </p>
                <div className="flex flex-col gap-2.5">
                  {currentChips.map((c) => (
                    <div key={c.org} className="flex items-baseline gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="font-display text-[16px] text-foreground leading-none">{c.org}</span>
                      <span className="font-body text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                        {c.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact — bordered vertical fact list, col-span-7 */}
              <div className="sm:col-span-7 sm:border-l sm:border-border sm:pl-8 flex flex-col gap-3">
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-muted-foreground mb-1">
                  Reach me
                </p>
                <span className="inline-flex items-center gap-2.5 font-body text-[13px] text-foreground/75">
                  <MapPin size={13} className="text-accent shrink-0" /> Irvine, CA
                </span>
                <a
                  href="mailto:lchsu@andrew.cmu.edu"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] text-foreground/75 hover:text-accent transition-colors w-fit"
                >
                  <Mail size={13} className="text-accent shrink-0" /> lchsu@andrew.cmu.edu
                </a>
                <a
                  href="https://www.linkedin.com/in/lizhhsu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] text-foreground/75 hover:text-accent transition-colors w-fit"
                >
                  <Linkedin size={13} className="text-accent shrink-0" /> linkedin.com/in/lizhhsu
                </a>
              </div>
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


      {/* EDUCATION — numeral / title / fact-sheet three-column split */}
      <section className="px-6 md:px-12 py-20">
        <div className="w-full">
          <SectionHeader title="Education" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 border-t border-border"
          >
            {/* Institution + degree */}
            <div className="md:col-span-6 py-8 md:pr-8 md:border-r border-border">
              <h3 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.05]">
                Carnegie Mellon University
              </h3>
              <p className="font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground mt-3">
                Tepper School of Business
              </p>
              <p className="font-body text-[15px] text-foreground/85 mt-5 leading-relaxed max-w-sm">
                B.S. Business Administration, concentration in Artificial Intelligence.
              </p>
            </div>

            {/* Fact sheet — labeled rows instead of paragraph flow */}
            <div className="md:col-span-6 py-8 md:pl-8 flex flex-col divide-y divide-border/70">
              <div className="flex items-baseline justify-between py-3 first:pt-0">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Graduation
                </span>
                <span className="font-body text-[13px] text-accent">Expected May 2028</span>
              </div>
              <div className="flex items-baseline justify-between py-3">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Location
                </span>
                <span className="font-body text-[13px] text-foreground/80">Pittsburgh, PA</span>
              </div>
              <div className="py-3 last:pb-0">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Coursework
                </span>
                <p className="font-body text-[13px] text-foreground/65 mt-2 leading-relaxed">
                  AI for Business Leaders, Principles of Computing, Business Computing,
                  Reasoning with Data, Multivariate Analysis, Business Science,
                  Information Systems in Organizational Milieux, Introduction to
                  Entrepreneurship, Organizational Behavior, and Business Leadership
                  Endeavor I &amp; II.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAMPUS LEADERSHIP */}
      <CampusSection />

      {/* CONTACT — headline + description, big email bar, then a row of link cards */}
      <section className="px-6 md:px-12 py-20 pb-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <SectionHeader
            title="Get in Touch"
            description="Let's chat! Open to Product Management, AI Business Development, and AI Engineering roles, as well as leadership development."
          />

          <a
            href="mailto:lchsu@andrew.cmu.edu"
            className="group flex items-center justify-center gap-3 rounded-2xl bg-accent py-6 md:py-7 transition-transform duration-300 hover:scale-[1.01]"
          >
            <Mail size={18} className="text-[hsl(var(--accent-foreground))] shrink-0" strokeWidth={1.75} />
            <span className="font-body text-[15px] md:text-[17px] tracking-[0.1em] uppercase text-[hsl(var(--accent-foreground))]">
              lchsu@andrew.cmu.edu
            </span>
          </a>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <a
              href="https://www.linkedin.com/in/lizhhsu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/40 lift-card py-8"
            >
              <Linkedin size={22} className="text-foreground/80 group-hover:text-accent transition-colors" strokeWidth={1.5} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                LinkedIn
              </span>
            </a>

            <a
              href="https://elizabeth-hsu-portfolio.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/40 lift-card py-8"
            >
              <Briefcase size={22} className="text-foreground/80 group-hover:text-accent transition-colors" strokeWidth={1.5} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                Ambassador Portfolio
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
