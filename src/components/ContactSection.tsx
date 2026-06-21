import { Linkedin, Mail } from "lucide-react";
import SectionHeader from "./SectionHeader";

const links = [
  { label: "Email", href: "mailto:lchsu@andrew.cmu.edu", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lizhhsu", icon: Linkedin },
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

        <div className="flex items-center gap-6">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-accent hover:text-black transition-colors duration-300"
            >
              <Icon size={28} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
