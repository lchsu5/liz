import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-background pt-36 pb-20 md:pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
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
          venture experience across enterprise software, real estate, and AI safety.
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
            <Linkedin size={14} className="text-accent" /> linkedin.com/in/lizhhsu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
