import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin } from "lucide-react";

function PhotoCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative select-none"
      style={{ width: 320, height: 370 }}
    >
      {/* Halftone dot circle — rearmost layer */}
      <div
        className="absolute rounded-full"
        style={{
          width: 210,
          height: 210,
          top: 48,
          left: 10,
          backgroundImage:
            "radial-gradient(circle, #7A253328 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
        }}
      />

      {/* Small solid oxblood square — bottom-right, behind frame */}
      <div
        className="absolute rounded-[5px] z-10"
        style={{
          width: 60,
          height: 60,
          bottom: 20,
          right: 14,
          background: "#7A2531",
        }}
      />

      {/* Oxblood outline rectangle — rotated opposite way, peeking behind frame */}
      <div
        className="absolute rounded-[18px] z-10"
        style={{
          width: 258,
          height: 258,
          top: 74,
          left: 46,
          border: "2px solid #7A2531",
          transform: "rotate(2.5deg)",
        }}
      />

      {/* Main photo frame */}
      <div
        className="absolute rounded-[18px] overflow-hidden z-20 cursor-pointer"
        style={{
          width: 258,
          height: 258,
          top: 58,
          left: 30,
          transform: "rotate(-2.5deg)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
          background: "#FAF8F5",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((p) => !p)}
      >
        {/* PRO placeholder */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-[250ms]"
          style={{
            background: "linear-gradient(140deg, #E8E3DD 0%, #D5CFC8 100%)",
            opacity: hovered ? 0 : 1,
          }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-500 mb-2">
            Professional
          </span>
          <span className="text-4xl font-bold text-neutral-300 tracking-[0.15em]">
            PRO
          </span>
        </div>

        {/* SOCIAL placeholder */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-[250ms]"
          style={{
            background: "linear-gradient(140deg, #F5E8DC 0%, #EDD5B8 100%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase mb-2"
            style={{ color: "#7A253166" }}
          >
            Social
          </span>
          <span
            className="text-4xl font-bold tracking-[0.15em]"
            style={{ color: "#7A253166" }}
          >
            SOCIAL
          </span>
        </div>

        {/* Caption pill — inside frame so it inherits the rotation */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-10">
          <div
            className="rounded-full px-4 py-1.5"
            style={{
              background: "rgba(255,255,255,0.84)",
              backdropFilter: "blur(6px)",
              minWidth: 172,
            }}
          >
            <div className="relative" style={{ height: "1.2em" }}>
              <span
                className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold whitespace-nowrap transition-opacity duration-[250ms]"
                style={{ color: "#7A2531", opacity: hovered ? 0 : 1 }}
              >
                Hi, nice to meet you!
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold whitespace-nowrap transition-opacity duration-[250ms]"
                style={{ color: "#7A2531", opacity: hovered ? 1 : 0 }}
              >
                I'm Liz Hsu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "BASED IN" tag — top-right, above frame */}
      <div className="absolute z-30" style={{ top: 26, right: 0 }}>
        <div
          className="rounded-full px-3 py-1.5 shadow-sm"
          style={{
            background: "rgba(255,255,255,0.93)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <span className="block text-[8px] uppercase tracking-[0.2em] text-neutral-400 leading-tight">
            Based in
          </span>
          <span
            className="text-[11px] font-semibold"
            style={{ color: "#7A2531" }}
          >
            Irvine, CA
          </span>
        </div>
      </div>

      {/* Status pill — bottom, left side */}
      <div className="absolute z-30" style={{ bottom: 14, left: 20 }}>
        <div
          className="rounded-full px-3 py-1 shadow-sm flex items-center gap-1.5"
          style={{
            background: "rgba(255,255,255,0.93)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-[11px] font-medium text-neutral-600">
            Open to roles
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="w-full bg-background pt-36 pb-20 md:pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Photo card — left on desktop, top on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0 mx-auto md:mx-0"
        >
          <PhotoCard />
        </motion.div>

        {/* Text content — right on desktop */}
        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] tracking-[0.28em] uppercase text-accent mb-6"
          >
            § Personal Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display tracking-tight text-foreground text-[44px] sm:text-[60px] md:text-[78px] leading-[1.02]"
          >
            Elizabeth <span className="italic text-accent">Hsu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-body text-[15px] md:text-[17px] text-foreground/75 mt-6 max-w-2xl leading-relaxed"
          >
            Business + AI at Carnegie Mellon University. Product, research, and
            venture experience across enterprise software, real estate, and AI
            safety.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-body text-[13px] text-foreground/70"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> Irvine, California
            </span>
            <a
              href="mailto:lchsu@andrew.cmu.edu"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={14} className="text-accent" /> lchsu@andrew.cmu.edu
            </a>
            <a
              href="https://www.linkedin.com/in/lizhhsu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Linkedin size={14} className="text-accent" />{" "}
              linkedin.com/in/lizhhsu
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
