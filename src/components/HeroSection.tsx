import { motion } from "framer-motion";
import heroPortrait from "@/assets/elizabeth-about.jpg";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] w-full bg-background pt-36 pb-24 md:pb-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left — 60% headline + currently list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 relative"
        >
          <h1 className="font-display tracking-tight text-foreground">
            <span className="block text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] leading-[1.02]">
              Liz Hsu
            </span>
            <span className="block italic text-accent leading-[1.3] mt-2">
              <span className="block text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px]">
                Business + AI with experience in product, culture, and venture
              </span>
              <span className="block text-[22px] sm:text-[27px] md:text-[32px] lg:text-[36px]">
                @Carnegie Mellon University
              </span>
            </span>
            <span className="block text-[22px] sm:text-[27px] md:text-[32px] lg:text-[36px] leading-[1.15] mt-1">
              Based in Irvine, California
            </span>
          </h1>
        </motion.div>

        {/* Right — abstract collage with portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 relative h-[420px] md:h-[520px] lg:h-[560px]"
        >
          {/* Soft blobs */}
          <div className="absolute top-6 right-10 w-48 h-48 rounded-full bg-accent/25 blur-2xl" />
          <div className="absolute bottom-10 left-2 w-40 h-40 rounded-full bg-warm-tan/40 blur-2xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-card" />

          {/* Portrait — rounded organic mask */}
          <div className="absolute inset-x-6 inset-y-8 overflow-hidden rounded-[40%_60%_55%_45%/50%_45%_55%_50%] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
            <img
              src={heroPortrait}
              alt="Elizabeth Hsu, food and lifestyle UGC creator"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative dot */}
          <span className="absolute top-4 left-6 font-display text-3xl text-accent">✦</span>
        </motion.div>
      </div>
    </section>
  );
}