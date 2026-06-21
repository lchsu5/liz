import { Linkedin, Mail } from "lucide-react";
import SectionHeader from "./SectionHeader";

const links = [
  { label: "Email", value: "lchsu@andrew.cmu.edu", href: "mailto:lchsu@andrew.cmu.edu", icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/lizhhsu", href: "https://www.linkedin.com/in/lizhhsu", icon: Linkedin },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="§09"
          title="Get in Touch"
          italicWord="Touch"
          description="Open to internships, research opportunities, and collaborations in product, AI, and venture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border border-border hover:border-accent bg-card/30 hover:bg-card/60 transition-all duration-200 px-6 py-6"
            >
              <div className="flex items-center gap-4">
                <Icon size={20} className="text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">
                    {label}
                  </p>
                  <p className="font-body text-[14px] text-foreground">{value}</p>
                </div>
              </div>
              <span className="font-body text-[11px] tracking-[0.18em] uppercase text-foreground/40 group-hover:text-accent transition-colors">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
