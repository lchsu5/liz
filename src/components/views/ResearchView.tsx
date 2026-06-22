import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const data = (["bear", "base", "bull"] as Scenario[]).map((s) => ({
    name: SCENARIO_LABELS[s],
    target: report.scenarios[s].target,
    scenario: s,
  }));

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          type="number"
          tickFormatter={(v) => `$${v}`}
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          formatter={(val: number) => [`$${val}`, "Price Target"]}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 0,
            fontSize: 11,
            fontFamily: "Inter",
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
            fontFamily: "Inter",
          }}
        />
        <Bar dataKey="target" radius={0} maxBarSize={24}>
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
  );
}

function ReportCard({ report }: { report: Report }) {
  const [scenario, setScenario] = useState<Scenario>("base");
  const active = report.scenarios[scenario];

  return (
    <article className="border border-border bg-card/30">
      {/* Header */}
      <div className="p-7 md:p-9 border-b border-border">
        <div className="flex items-start justify-between gap-6 mb-5">
          <div className="flex items-baseline gap-4">
            <FileText size={20} className="text-accent" strokeWidth={1.5} />
            <span className="font-display text-[36px] md:text-[44px] text-foreground leading-none italic">
              {report.ticker}
            </span>
          </div>
          <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap">
            {report.date}
          </p>
        </div>
        <h3 className="font-display text-[24px] md:text-[30px] text-foreground leading-tight max-w-3xl">
          {report.title}
        </h3>
        <p className="font-body text-[12px] tracking-[0.14em] uppercase text-muted-foreground mt-3">
          {report.subtitle} · {report.publisher}
        </p>
        <div className="mt-5 border-t border-border pt-5">
          <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent mb-2">
            Thesis
          </p>
          <p className="font-body text-[14px] text-foreground/80 leading-relaxed max-w-3xl">
            {report.thesis}
          </p>
        </div>
      </div>

      {/* Scenario selector */}
      <div className="p-7 md:p-9">
        <div className="flex items-center justify-between mb-6">
          <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent">
            Scenario Analysis
          </p>
          <div className="flex gap-1">
            {(["bull", "base", "bear"] as Scenario[]).map((s) => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={`font-body text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 border transition-all duration-200 ${
                  scenario === s
                    ? "border-accent text-accent bg-accent/10"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {SCENARIO_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Valuation chart */}
          <div>
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
              Price Targets by Scenario
            </p>
            <ValuationChart report={report} activeScenario={scenario} />
          </div>

          {/* Active scenario detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="font-display text-[42px] leading-none"
                  style={{ color: SCENARIO_COLORS[scenario] }}
                >
                  ${active.target}
                </span>
                <span
                  className="font-body text-[13px] tracking-[0.12em]"
                  style={{ color: SCENARIO_COLORS[scenario] }}
                >
                  {active.returnLabel}
                </span>
              </div>

              <div className="flex gap-4 mb-5">
                {active.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-body text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
                      {m.label}
                    </p>
                    <p className="font-body text-[14px] text-foreground mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>

              <p className="font-body text-[13px] text-foreground/75 leading-relaxed">
                {active.catalyst}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

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
          <SectionHeader
            title="Equity Coverage"
            description="Initiating-coverage reports published with Consortium Research's FIG vertical. Toggle scenarios to explore valuation ranges."
          />
        </motion.div>

        <div className="mt-20">
          <SectionHeader title="Published Reports" />
          <div className="space-y-px">
            {reports.map((r) => (
              <ReportCard key={r.ticker} report={r} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
