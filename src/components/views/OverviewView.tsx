import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Briefcase } from "lucide-react";
import headshotImg from "@/assets/headshot.jpg";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";
import CampusSection from "../CampusSection";

const currentChips = [
  { org: "Workiva", role: "PM Intern" },
  { org: "Google", role: "Student Ambassador" },
];

export default function OverviewView() {
  return (
    <main className="min-h-screen">
      <ThemeController />

      {/* HERO — quiet editorial spread */}
      <section className="px-6 md:px-12 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* LEFT — copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-display tracking-[-0.02em] text-foreground text-[40px] sm:text-[48px] md:text-[56px] leading-[0.98]"
            >
              Elizabeth Hsu
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-[11px] tracking-[0.06em] uppercase text-accent mt-4"
            >
              Business + AI @ Carnegie Mellon
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-body text-[14px] md:text-[15px] font-normal text-foreground/75 max-w-xl leading-[1.9] mt-4"
            >
              I work at the intersection of product, research, and venture, currently
              shipping with Workiva and Google.
            </motion.p>

            {/* Status + contact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-x-8 gap-y-5 max-w-xl"
            >
              <div className="sm:col-span-5">
                <p className="font-body text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                  Currently
                </p>
                <div className="flex flex-col gap-2.5">
                  {currentChips.map((c) => (
                    <div key={c.org} className="flex items-center gap-2.5">
                      <span className="w-0.5 h-3 rounded-sm bg-accent opacity-50 shrink-0" />
                      <span className="font-body text-[13px] font-semibold text-foreground leading-none">{c.org}</span>
                      <span className="font-body text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                        {c.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-7 sm:border-l sm:border-border sm:pl-8 flex flex-col gap-3">
                <p className="font-body text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-1">
                  Reach me
                </p>
                <span className="inline-flex items-center gap-2.5 font-body text-[13px] text-foreground/75">
                  <MapPin size={13} className="text-accent shrink-0" /> Irvine, CA
                </span>
                <a
                  href="mailto:lchsu@andrew.cmu.edu"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] text-foreground/75 hover:text-accent transition-colors duration-150 w-fit"
                >
                  <Mail size={13} className="text-accent shrink-0" /> lchsu@andrew.cmu.edu
                </a>
                <a
                  href="https://www.linkedin.com/in/lizhhsu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] text-foreground/75 hover:text-accent transition-colors duration-150 w-fit"
                >
                  <Linkedin size={13} className="text-accent shrink-0" /> linkedin.com/in/lizhhsu
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — clean editorial photo frame */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-[220px] h-[280px] sm:w-[250px] sm:h-[320px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-lg border border-border">
                <img
                  src={headshotImg}
                  alt="Elizabeth Hsu"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="absolute -top-3 -right-3 sm:-right-6 bg-card border border-border rounded-md px-3.5 py-2.5">
                <p className="font-body text-[9px] tracking-[0.18em] uppercase text-accent">
                  Based in
                </p>
                <p className="font-body text-[13px] text-foreground mt-0.5">Irvine, CA</p>
              </div>

              <a
                href="mailto:lchsu@andrew.cmu.edu"
                className="absolute -bottom-3 -right-4 sm:-right-8 bg-card border border-border rounded-md px-3.5 py-2.5 flex items-center gap-2 hover:border-accent transition-colors duration-150"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-body text-[10px] tracking-[0.14em] uppercase text-foreground/80">
                  Contact me
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* EDUCATION — bordered card, fact-sheet split */}
      <section className="px-6 md:px-12 py-16">
        <div className="w-full">
          <SectionHeader title="Education" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 border border-border rounded-md overflow-hidden"
          >
            <div className="md:col-span-6 p-7 md:p-8 md:border-r border-border">
              <h3 className="font-display text-[22px] text-foreground leading-[1.05]">
                Carnegie Mellon University
              </h3>
              <p className="font-body text-[10px] tracking-[0.16em] uppercase text-muted-foreground mt-3">
                Tepper School of Business
              </p>
              <p className="font-body text-[13px] text-foreground/85 mt-5 leading-relaxed max-w-sm">
                B.S. Business Administration, minor in Artificial Intelligence.
              </p>
            </div>

            <div className="md:col-span-6 p-7 md:p-8 bg-secondary/50 flex flex-col divide-y divide-border/70">
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

      <div className="border-t border-border" />

      {/* CAMPUS LEADERSHIP */}
      <CampusSection />

      <div className="border-t border-border" />

      {/* CONTACT — headline + description, near-black email bar, link cards */}
      <section className="px-6 md:px-12 py-16 pb-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <SectionHeader
            title="Get in Touch"
            description="Let's chat! Open to Product Management, AI Business Development, and AI Engineering roles, as well as leadership development."
          />

          <a
            href="mailto:lchsu@andrew.cmu.edu"
            className="group flex items-center justify-center gap-3 rounded-md bg-primary py-6 md:py-7 transition-colors duration-150 hover:bg-primary/90"
          >
            <Mail size={18} className="text-primary-foreground shrink-0" strokeWidth={1.75} />
            <span className="font-body text-[13px] md:text-[14px] tracking-[0.1em] uppercase text-primary-foreground">
              lchsu@andrew.cmu.edu
            </span>
          </a>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <a
              href="https://www.linkedin.com/in/lizhhsu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-md border border-border bg-secondary/50 lift-card py-8"
            >
              <Linkedin size={22} className="text-foreground/80 group-hover:text-accent transition-colors duration-150" strokeWidth={1.5} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                LinkedIn
              </span>
            </a>

            <a
              href="https://elizabeth-hsu-portfolio.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-md border border-border bg-secondary/50 lift-card py-8"
            >
              <Briefcase size={22} className="text-foreground/80 group-hover:text-accent transition-colors duration-150" strokeWidth={1.5} />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                Ambassador Portfolio
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
