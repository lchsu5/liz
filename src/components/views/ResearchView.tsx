import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FileText } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Tooltip,
} from "recharts";
import ThemeController from "../ThemeController";
import SectionHeader from "../SectionHeader";


type Scenario = "bull" | "base" | "bear";

const SCENARIO_LABELS: Record<Scenario, string> = {
  bull: "Bull",
  base: "Base",
  bear: "Bear",
};

const SCENARIO_COLORS: Record<Scenario, string> = {
  bull: "hsl(142 60% 45%)",
  base: "hsl(var(--accent))",
  bear: "hsl(0 65% 55%)",
};

interface Report {
  ticker: string;
  title: string;
  subtitle: string;
  publisher: string;
  date: string;
  thesis: string;
  currentPrice: number;
  scenarios: Record<
    Scenario,
    {
      target: number;
      returnLabel: string;
      catalyst: string;
      metrics: { label: string; value: string }[];
    }
  >;
}

const reports: Report[] = [
  {
    ticker: "$HOOD",
    title: "HOODwinked by Volatility",
    subtitle: "Initiating Coverage: Robinhood Markets",
    publisher: "Consortium Research",
    date: "Aug 25, 2025",
    thesis:
      "HOOD's earnings are structurally tied to trading volume and crypto cycles, leaving the print exposed to volatility regimes the Street under-discounts. Coverage initiated with caution on the cycle and an eye on the platform's expanding wallet share with retail.",
    currentPrice: 24.5,
    scenarios: {
      bull: {
        target: 45,
        returnLabel: "+83.7%",
        catalyst:
          "Crypto bull cycle revival + PFOF regulatory clarity; wallet-share expansion in the 25–34 demographic accelerates Gold subscriber monetisation.",
        metrics: [
          { label: "P/E", value: "32×" },
          { label: "EV / EBITDA", value: "24×" },
          { label: "Rev. Growth", value: "+38%" },
        ],
      },
      base: {
        target: 28,
        returnLabel: "+14.3%",
        catalyst:
          "Steady retail engagement with modest crypto contribution; Gold subscriber growth supports recurring revenue diversification away from PFOF.",
        metrics: [
          { label: "P/E", value: "22×" },
          { label: "EV / EBITDA", value: "16×" },
          { label: "Rev. Growth", value: "+18%" },
        ],
      },
      bear: {
        target: 15,
        returnLabel: "−38.8%",
        catalyst:
          "Extended market downturn + crypto winter; potential PFOF ban creates structural revenue hole faster than alternative monetisation can fill.",
        metrics: [
          { label: "P/E", value: "12×" },
          { label: "EV / EBITDA", value: "9×" },
          { label: "Rev. Growth", value: "−5%" },
        ],
      },
    },
  },
  {
    ticker: "$PYPL",
    title: "Reinventing Itself from Checkout to Crypto",
    subtitle: "Initiating Coverage: PayPal Holdings",
    publisher: "Consortium Research",
    date: "Jul 23, 2025",
    thesis:
      "PYPL is repositioning from a single-rail checkout button into a multi-product wallet — branded checkout, Braintree, Venmo, and crypto on-ramps. Margin and engagement upside depend on execution against Apple Pay and Shop Pay at the merchant edge.",
    currentPrice: 71.2,
    scenarios: {
      bull: {
        target: 105,
        returnLabel: "+47.5%",
        catalyst:
          "Braintree margin expansion outpaces consensus; branded checkout holds share vs. Apple Pay; Venmo monetisation hits inflection with P2P-to-commerce conversion.",
        metrics: [
          { label: "P/E", value: "19×" },
          { label: "EV / EBITDA", value: "14×" },
          { label: "Rev. Growth", value: "+12%" },
        ],
      },
      base: {
        target: 78,
        returnLabel: "+9.6%",
        catalyst:
          "Revenue stabilises on TPV growth; incremental crypto on-ramp contribution; buyback program supports per-share metrics through the transition.",
        metrics: [
          { label: "P/E", value: "14×" },
          { label: "EV / EBITDA", value: "10×" },
          { label: "Rev. Growth", value: "+7%" },
        ],
      },
      bear: {
        target: 52,
        returnLabel: "−26.9%",
        catalyst:
          "Apple Pay and Shop Pay accelerate checkout share erosion; Braintree faces merchant-side pricing pressure; margin compression continues as TAM narrative deflates.",
        metrics: [
          { label: "P/E", value: "9×" },
          { label: "EV / EBITDA", value: "7×" },
          { label: "Rev. Growth", value: "+2%" },
        ],
      },
    },
  },
];

function ValuationChart({
  report,
  activeScenario,
}: {
  report: Report;
  activeScenario: Scenario;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-40px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const data = (["bear", "base", "bull"] as Scenario[]).map((s) => ({
    name: SCENARIO_LABELS[s],
    target: report.scenarios[s].target * progress,
    scenario: s,
  }));

  const maxTarget = Math.max(
    ...(["bear", "base", "bull"] as Scenario[]).map((s) => report.scenarios[s].target)
  );

  return (
    <div ref={wrapRef}>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            domain={[0, Math.ceil(maxTarget * 1.05)]}
            tickFormatter={(v) => `$${Math.round(v)}`}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            formatter={(val: number) => [`$${Math.round(val)}`, "Price Target"]}
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 6,
              fontSize: 11,
              fontFamily: "DM Sans",
              color: "hsl(var(--foreground))",
            }}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <ReferenceLine
            x={report.currentPrice}
            stroke="hsl(var(--foreground) / 0.35)"
            strokeDasharray="4 3"
            label={{
              value: `Current $${report.currentPrice}`,
              position: "insideTopRight",
              fontSize: 9,
              fill: "hsl(var(--muted-foreground))",
              fontFamily: "DM Sans",
            }}
          />
          <Bar dataKey="target" radius={2} maxBarSize={14} isAnimationActive={false}>
            {data.map((entry) => (
              <Cell
                key={entry.scenario}
                fill={
                  entry.scenario === activeScenario
                    ? SCENARIO_COLORS[entry.scenario]
                    : "hsl(var(--border))"
                }
                fillOpacity={entry.scenario === activeScenario ? 1 : 0.55}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


function ReportCard({ report }: { report: Report }) {
  const [scenario, setScenario] = useState<Scenario>("base");
  const active = report.scenarios[scenario];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border border-border rounded-lg overflow-hidden lift-card grid grid-cols-1 lg:grid-cols-12"
    >
      {/* Left panel — ticker, title, thesis. Own background, sticky on scroll. */}
      <div className="lg:col-span-5 bg-card/60 p-7 md:p-9 lg:border-r border-border flex flex-col">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div className="flex items-baseline gap-3">
            <FileText size={16} className="text-accent" strokeWidth={1.5} />
            <span className="font-display text-[26px] md:text-[28px] tracking-[-0.01em] text-foreground leading-none">
              {report.ticker}
            </span>
          </div>
        </div>
        <p className="font-body text-[9px] tracking-[0.06em] uppercase text-muted-foreground mb-4">
          {report.date}
        </p>
        <h3 className="font-body text-[12px] font-semibold text-foreground leading-snug">
          {report.title}
        </h3>
        <p className="font-body text-[10px] tracking-[0.06em] uppercase text-muted-foreground mt-3">
          {report.subtitle} · {report.publisher}
        </p>
        <div className="mt-6 pt-6 border-t border-border">
          <p className="font-body text-[9px] tracking-[0.18em] uppercase text-accent mb-2">
            Thesis
          </p>
          <p className="font-body text-[12px] text-foreground/80 leading-[1.8]">
            {report.thesis}
          </p>
        </div>
      </div>

      {/* Right panel — scenario controls, chart, detail */}
      <div className="lg:col-span-7 p-7 md:p-9 bg-background/40">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="font-body text-[9px] tracking-[0.18em] uppercase text-accent">
            Scenario Analysis
          </p>
          <div className="flex gap-1">
            {(["bull", "base", "bear"] as Scenario[]).map((s) => {
              const isActive = scenario === s;
              return (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`font-body text-[9px] font-medium tracking-[0.08em] uppercase px-2.5 py-1 rounded-sm border transition-colors duration-150 ${
                    isActive
                      ? "border-transparent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {SCENARIO_LABELS[s]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active scenario detail — headline stat block above the chart, not beside it */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-md border border-border bg-secondary/50 p-5 md:p-6 mb-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display text-[28px] md:text-[30px] leading-none"
                  style={{ color: SCENARIO_COLORS[scenario] }}
                >
                  ${active.target}
                </span>
                <span
                  className="font-body text-[12px] tracking-[0.1em]"
                  style={{ color: SCENARIO_COLORS[scenario] }}
                >
                  {active.returnLabel}
                </span>
              </div>
              <div className="flex gap-4">
                {active.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-body text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
                      {m.label}
                    </p>
                    <p className="font-body text-[12px] font-semibold text-foreground mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-body text-[12px] text-foreground/75 leading-relaxed mt-4 pt-4 border-t border-border/70">
              {active.catalyst}
            </p>
          </motion.div>
        </AnimatePresence>

        <p className="font-body text-[9px] tracking-[0.14em] uppercase text-muted-foreground mb-4">
          Price Targets by Scenario
        </p>
        <ValuationChart report={report} activeScenario={scenario} />
      </div>
    </motion.article>
  );
}

export default function ResearchView() {
  return (
    <main className="min-h-screen px-6 md:px-12 pt-20 md:pt-24 pb-24 md:pb-32">

      <ThemeController />
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Equity Coverage"
            description="Initiating-coverage reports published with Consortium Research's FIG vertical. Toggle scenarios to explore valuation ranges."
          />
        </motion.div>

        <div className="mt-20">
          <SectionHeader title="Published Reports" />
          <div className="space-y-6 md:space-y-8">
            {reports.map((r) => (
              <ReportCard key={r.ticker} report={r} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
