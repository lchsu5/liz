import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";

const reports = [
  {
    ticker: "$HOOD",
    title: "HOODwinked by Volatility",
    subtitle: "Initiating Coverage: Robinhood Markets Inc",
    publisher: "Consortium Research",
    date: "Aug 25, 2025",
    thesis:
      "HOOD's earnings are structurally tied to trading volume and crypto cycles, leaving the print exposed to volatility regimes the Street under-discounts. Coverage initiated with caution on the cycle and an eye on the platform's expanding wallet share with retail.",
  },
  {
    ticker: "$PYPL",
    title: "How PayPal is Reinventing Itself from Checkout to Crypto",
    subtitle: "Initiating Coverage: PayPal Holdings Inc",
    publisher: "Consortium Research",
    date: "Jul 23, 2025",
    thesis:
      "PYPL is repositioning from a single-rail checkout button into a multi-product wallet — branded checkout, Braintree, Venmo, and crypto on-ramps. Margin and engagement upside depend on execution against Apple Pay and Shop Pay at the merchant edge.",
  },
];

export default function ResearchView() {
  return (
    <main className="min-h-screen px-6 md:px-12 pt-32 pb-40">
      <ThemeController mode="light" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-[11px] tracking-[0.32em] uppercase text-accent mb-6">
            § Research
          </p>
          <h1 className="font-display text-[48px] md:text-[80px] leading-[0.98] tracking-tight text-foreground">
            Equity <span className="italic text-accent">coverage</span>.
          </h1>
          <p className="font-body text-[15px] md:text-[16px] text-foreground/70 mt-6 max-w-2xl leading-relaxed">
            Initiating-coverage reports published with Consortium Research's FIG vertical.
          </p>
        </motion.div>

        <div className="mt-20">
          <SectionHeader label="§ 01" title="Published Reports" italicWord="Reports" />
          <div className="space-y-px">
            {reports.map((r) => (
              <article
                key={r.ticker}
                className="border border-border bg-card/30 p-7 md:p-9 hover:bg-card/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-6 mb-5">
                  <div className="flex items-baseline gap-4">
                    <FileText size={20} className="text-accent" strokeWidth={1.5} />
                    <span className="font-display text-[36px] md:text-[44px] text-foreground leading-none italic">
                      {r.ticker}
                    </span>
                  </div>
                  <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap">
                    {r.date}
                  </p>
                </div>
                <h3 className="font-display text-[24px] md:text-[30px] text-foreground leading-tight max-w-3xl">
                  {r.title}
                </h3>
                <p className="font-body text-[12px] tracking-[0.14em] uppercase text-muted-foreground mt-3">
                  {r.subtitle} · {r.publisher}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent mb-2">
                    Thesis
                  </p>
                  <p className="font-body text-[14px] text-foreground/80 leading-relaxed max-w-3xl">
                    {r.thesis}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
