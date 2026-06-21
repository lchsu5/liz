import SectionHeader from "./SectionHeader";
import { FileText } from "lucide-react";

const publications = [
  {
    title: "Initiating Coverage: Robinhood Markets Inc ($HOOD), HOODwinked by Volatility",
    publisher: "Consortium Research",
    date: "Aug 25, 2025",
  },
  {
    title: "Initiating Coverage: PayPal Holdings Inc ($PYPL), How PayPal is Reinventing Itself from Checkout to Crypto",
    publisher: "Consortium Research",
    date: "Jul 23, 2025",
  },
];

export default function PublicationsSection() {
  return (
    <section id="publications" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="§04" title="Publications" italicWord="Publications" />

        <div className="divide-y divide-border border-y border-border">
          {publications.map((p) => (
            <article key={p.title} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
              <div className="md:col-span-1 hidden md:block">
                <FileText size={18} className="text-accent mt-1" />
              </div>
              <div className="md:col-span-8">
                <h3 className="font-body text-[15px] text-foreground/90 leading-snug">{p.title}</h3>
                <p className="font-body text-[12px] text-muted-foreground mt-1.5">{p.publisher}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-body text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                  {p.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
