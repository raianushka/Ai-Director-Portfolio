import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Play,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

const TRACKOCITY_CREATIVES = [
  {
    id: 'brand-reel-3',
    youtubeId: 'HZXTg53oPao',
    title: 'Love of India: Real Customer Testimonials & Social Proof',
    format: '9:16 AI Dialogue Reel',
    videoUrl: 'https://youtube.com/shorts/HZXTg53oPao?feature=share',
    hookStrategy: 'Multi-Persona UGC & Rapid City Cuts (Pune, Delhi, Bengaluru, Mumbai)',
    campaignFlight: 'Paid Meta Video Creative Test · D2C Funnel',
    screenshot: '/trac5.jpeg',
    metrics: [
      { label: 'Hook Rate (3s %)', value: '48.05%', highlight: true, note: 'vs 20-30% benchmark' },
      { label: 'CTR (Link Clicks)', value: '9.77%', highlight: true, note: '120 clicks' },
      { label: 'Hold Rate', value: '33.54%', highlight: false, note: 'Deep retention' },
    ],
    detailedProof: {
      ctr: '9.77%',
      hookRate: '48.05%',
      holdRate: '33.54%',
      keyInsight: 'Hook stopped 48% of users immediately, generating nearly 10x the standard direct-response CTR (0.9-1.2%).',
    },
  },
  {
    id: 'simple-3',
    youtubeId: 'FNrXFAqYfAw',
    title: 'Love of India: Ganpati Special 16-Item Festive Hamper',
    format: '9:16 Unboxing & Bundle Offer',
    videoUrl: 'https://youtube.com/shorts/FNrXFAqYfAw?feature=share',
    hookStrategy: 'Dynamic Festive Counter SFX & Rapid-Fire Hamper Unboxing Cut',
    campaignFlight: 'Ganesh Utsav Festive Offer Test · D2C Funnel',
    screenshot: '/trac2.jpeg',
    metrics: [
      { label: 'CTR (Link Clicks)', value: '2.93', highlight: true, note: '148 clicks' },
      { label: 'Hook Rate (3s %)', value: '17.65%', highlight: true, note: 'vs 20-30% benchmark' },
      { label: 'Hold Rate', value: '38.54%', highlight: false, note: 'High engagement' },
    ],
    detailedProof: {
      ctr: '2.93',
      hookRate: '17.65%',
      holdRate: '38.54%',
      keyInsight: 'Peak click-through performance across all tested creatives at 2.93 CTR, proving strong pricing & bundle clarity.',
    },
  },
  {
    id: 'simple-2',
    youtubeId: 'uZu-kdf81f8',
    title: 'Love of India: The Ancient Bilona Method Explained',
    format: '9:16 Organic Process Documentary',
    videoUrl: 'https://youtube.com/shorts/uZu-kdf81f8?feature=share',
    campaignFlight: 'Product Education & Craftsmanship Top-of-Funnel',
    screenshot: '/trac3.jpeg',
    metrics: [
      { label: 'Hold Rate', value: '41.81%', highlight: true, note: '7,675 Sec30 views' },
      { label: 'Hook Rate (3s %)', value: '24.05%', highlight: false, note: 'Strong organic hook' },
      { label: 'CTR', value: '3.34%', highlight: false, note: 'Educational funnel' },
    ],
    detailedProof: {
      ctr: '3.34%',
      hookRate: '24.05%',
      holdRate: '41.81%',
      keyInsight: 'Sustained over 20,000 3-second viewers with 7,675 watching past 30 seconds, demonstrating high retention on craft B-roll.',
    },
  },
  {
    id: 'simple-4',
    youtubeId: 'rcP1u_TiQQI',
    title: 'Love of India: ₹2,999 Combo Offer Promo")',
    format: '9:16 Direct-Response Offer Creative',
    videoUrl: 'https://youtube.com/shorts/rcP1u_TiQQI?feature=share',
    campaignFlight: 'Direct Conversion Offer Scaling Campaign',
    screenshot: '/trac1.jpeg',
     metrics: [
      { label: 'Hold Rate', value: '39.26%', highlight: true, note: '7,675 Sec30 views' },
      { label: 'Hook Rate (3s %)', value: '15.1%', highlight: false, note: 'Strong organic hook' },
      { label: 'CTR', value: '1.59%', highlight: false, note: 'Educational funnel' },
    ],
    detailedProof: {
      ctr: '1.59%',
      hold: '39.26%',
      hookRate: '15.1%',
      keyInsight: 'Delivered an exceptional BOF Ad Reel with ₹2,752 AOV, proving the creative successfully pre-qualified purchasers.',
    },
  },
  {
    id: 'brand-reel-4',
    youtubeId: 'Kx9KlRhGI6M',
    title: 'Love of India: Can Diabetics Eat Honey? | Founder Q&A',
    format: '9:16 AI Objection-Handling Reel',
    videoUrl: 'https://youtube.com/shorts/Kx9KlRhGI6M?feature=share',
    hookStrategy: 'Real Consumer Comment-Reply Screen Grab & Science-Backed Ingredient Visuals',
    campaignFlight: 'Customer Objection & Trust Building Test Flight',
    screenshot: '/trac4.jpeg',
    metrics: [
      { label: 'Hook Rate (3s %)', value: '44.18%', highlight: false, note: 'Strong curiosity hook' },
      { label: 'Hold Rate', value: '28.7%', highlight: true, note: 'Objection-clearing' },
      { label: 'CTR', value: '10.3%', highlight: false, note: 'Educational CTA' },
    ],
    detailedProof: {
      ctr: '10.3%',
      hookRate: '44.18%',
      holdRate: '28.7%',
      keyInsight: '28.7% hold rate confirms high viewer trust and engagement when using transparent comment-reply framing.',
    },
  },
];

export default function TrackocityMetricsModal({ isOpen, onClose }) {
  const [selectedProof, setSelectedProof] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSelectedProof(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={() => {
        if (selectedProof) {
          setSelectedProof(null);
        } else {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e1017] border border-amber-500/25 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {selectedProof ? 'Trackocity Verified Creative Proof' : 'Trackocity Ad Performance Breakdown'}
              </h3>
              <p className="text-xs text-stone-400">
                {selectedProof ? selectedProof.campaignFlight : 'Individual creative metrics from tested direct-response ad sets'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {!selectedProof ? (
            /* ======================================================== */
            /* 1. LIST VIEW OF ALL 5 TESTED CREATIVES                  */
            /* ======================================================== */
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-300">
                <span className="font-semibold text-amber-300 block mb-1">
                  Verified Ad Test Cohort (Love of India Brand Campaign)
                </span>
                Click on any creative below to inspect its audited hook rate, click-through rate, and Trackocity screenshot proof.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {TRACKOCITY_CREATIVES.map((creative) => (
                  <div
                    key={creative.id}
                    onClick={() => setSelectedProof(creative)}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {creative.format}
                        </span>
                        <span className="text-[11px] text-stone-400 group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                          Inspect Proof &rarr;
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                        {creative.title}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                        {creative.hookStrategy}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5">
                      {creative.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                          <span className="text-[10px] text-stone-400 block truncate">{m.label}</span>
                          <span className={`text-sm font-bold font-mono ${m.highlight ? 'text-amber-300' : 'text-stone-200'}`}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Attribution */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center gap-2.5 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Note: These are metrics provided by the brand using Trackocity.
                </span>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* 2. DETAILED SINGLE CREATIVE PROOF VIEW                   */
            /* ======================================================== */
            <div className="space-y-5">
              {/* Back button */}
              <button
                onClick={() => setSelectedProof(null)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                &larr; Back to all creatives
              </button>

              {/* Creative Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {selectedProof.format}
                  </span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-white mt-1.5">
                    {selectedProof.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {selectedProof.hookStrategy}
                  </p>
                </div>

                <a
                  href={selectedProof.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Trackocity Dashboard Recreation Card */}
              <div className="rounded-xl border border-amber-500/25 bg-[#08090e] p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-stone-300 font-semibold">
                      TRACKOCITY CREATIVE INSIGHTS
                    </span>
                  </div>
                 /* <span className="px-2 py-0.5 rounded bg-white/5 text-stone-400 text-[10px] font-mono">
                    Audited Meta Ads
                 </span>*/
                </div>

                {/* Telemetry Numbers Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">CTR (Link Clicks)</span>
                    <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">
                      {selectedProof.detailedProof.ctr}
                    </span>
                    <span className="text-[10px] text-stone-400">{selectedProof.detailedProof.linkClicks} total clicks</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">Hook Rate (3s View)</span>
                    <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">
                      {selectedProof.detailedProof.hookRate}
                    </span>
                    <span className="text-[10px] text-stone-400">First 3s retention</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">Hold Rate</span>
                    <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">
                      {selectedProof.detailedProof.holdRate || selectedProof.detailedProof.conversionRate}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {selectedProof.detailedProof.conversionRate ? 'Conversion Rate (CR)' : '3s to finish ratio'}
                    </span>
                  </div>

                </div>

                {/* Key Telemetry Takeaway */}
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-stone-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-300 block mb-0.5">
                      Creative Impact
                    </span>
                    {selectedProof.detailedProof.keyInsight}
                  </div>
                </div>

                {/* Trackocity Screenshot Proof */}
                {selectedProof.screenshot && (
                  <div className="pt-3 border-t border-white/10">
                    <img
                      src={selectedProof.screenshot.startsWith('./') ? selectedProof.screenshot.slice(1) : selectedProof.screenshot}
                      alt={`${selectedProof.title} - Trackocity Screenshot Proof`}
                      className="w-full h-auto rounded-xl border border-white/15 shadow-lg object-contain max-h-[550px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Footnote */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center gap-2.5 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Note: These are metrics provided by the brand using Trackocity.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            Trackocity Audited Campaign Proof
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
