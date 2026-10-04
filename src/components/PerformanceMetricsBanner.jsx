import React from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const CREATIVE_PERFORMANCE_BOXES = [
  {
    num: '01',
    metric: 'Hook Rate (3s View %)',
    result: '44% – 48%',
    benchmark: '20% – 30%',
    summary: 'Proves the opening 3-second visual hook, text overlay, and first frame stopped the scroll.',
    highlight: '2x above industry standard',
  },
  {
    num: '02',
    metric: 'CTR (Click-Through Rate)',
    result: '9.7% – 10.3%',
    benchmark: '1.0% – 1.5%',
    summary: 'Proves narrative momentum and the final CTA compelled viewers to click the link.',
    highlight: 'Nearly 10x direct-response baseline',
  },
  {
    num: '03',
    metric: 'Hold Rate',
    result: '38% – 41%',
    benchmark: '25% – 35%',
    summary: 'Proves rhythmic pacing, audio sync, and B-roll transitions sustained engagement deeply.',
    highlight: 'Superior mid-funnel retention',
  },
  {
    num: '04',
    metric: 'CR & Average Order Value',
    result: '6.0% CR · ₹2,752 AOV',
    benchmark: '1% – 3% CR',
    summary: 'Proves targeted creative storytelling pre-qualified high-intent purchasers.',
    highlight: 'Proven commercial buyer intent',
  },
];

export default function PerformanceMetricsBanner({ onOpenDetails }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* OUTER CONTAINER MATCHING USER SKETCH (#481B16 Terracotta / Deep Mahogany) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#481B16] border border-[#632922] p-5 sm:p-7 md:p-8 shadow-2xl text-white">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HEADER ROW: TITLE & "SHOW DETAILS" BUTTON */}
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-amber-200 border border-white/15">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Performance of Creatives
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
              Meta Ad Performance & Editor Metrics
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              Proven retention, hook, and click telemetry benchmarks across tested ad creatives.
            </p>
          </div>

          {/* "SHOW DETAILS" BUTTON AS DRAWN IN SKETCH (Crisp rounded white card button) */}
          <button
            onClick={onOpenDetails}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-stone-100 text-[#481B16] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer shrink-0 self-start sm:self-center group"
          >
            <span>Show details</span>
            <ArrowUpRight className="w-4 h-4 text-[#481B16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 SMALL BOXES GRID (2x2) AS DRAWN IN USER SKETCH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6">
          {CREATIVE_PERFORMANCE_BOXES.map((box) => (
            <div
              key={box.num}
              className="rounded-2xl bg-white p-5 sm:p-6 text-[#2A211D] shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-stone-200/80 group"
            >
              {/* Box Top: Number, Metric Title & Big Result Tag */}
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#A84E32] px-2 py-0.5 rounded-md bg-[#481B16]/5">
                      {box.num}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#2A211D]">
                      {box.metric}
                    </h3>
                  </div>

                  <span className="shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-mono font-bold bg-[#481B16] text-white shadow-xs">
                    {box.result}
                  </span>
                </div>

                {/* Box Body: What it means for an editor */}
                <p className="text-xs sm:text-sm text-[#5A483E] leading-relaxed mt-3">
                  {box.summary}
                </p>
              </div>

              {/* Box Bottom: Benchmark comparison & highlight note */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-stone-500">
                  <span>Benchmark:</span>
                  <span className="font-semibold text-stone-700">{box.benchmark}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[#933D25] font-semibold text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>{box.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ATTRIBUTION NOTE */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-stone-300">
          <span>
            Click <strong className="text-white underline cursor-pointer" onClick={onOpenDetails}>"Show details"</strong> for individual creative breakdowns and verified screenshot proof.
          </span>
          <span className="text-stone-300 italic">
            Metrics provided by brand using Trackocity
          </span>
        </div>

      </div>
    </section>
  );
}
