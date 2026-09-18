'use client';

import Link from 'next/link';
import { PRESETS } from '@aequus/curve-presets';

const COMPARISON_DATA = [
  {
    category: 'Asset Class',
    key: 'assetClass',
    type: 'text' as const,
  },
  {
    category: 'Pricing',
    key: 'pricing',
    type: 'pricing' as const,
  },
  {
    category: 'Curve Shape',
    key: 'curveShape',
    type: 'text' as const,
  },
  {
    category: 'Fee Mode',
    key: 'feeMode',
    type: 'text' as const,
  },
  {
    category: 'Base Fee',
    key: 'baseFee',
    type: 'text' as const,
  },
  {
    category: 'Migration Fee',
    key: 'migrationFee',
    type: 'text' as const,
  },
  {
    category: 'Migration Pool Fee',
    key: 'migrationPoolFee',
    type: 'text' as const,
  },
  {
    category: 'Use Case',
    key: 'useCase',
    type: 'text' as const,
  },
  {
    category: 'Best For',
    key: 'bestFor',
    type: 'text' as const,
  },
];

const PRESET_DATA: Record<string, Record<string, string>> = {
  'stock-discovery': {
    assetClass: 'Tokenized Equities',
    pricing: 'Premium - 2 SOL',
    curveShape: 'Long, 6-checkpoint gentle slope',
    feeMode: 'RateLimiter (buy-size aware)',
    baseFee: '1% base, +1.5% per SOL bracket',
    migrationFee: '200 bps',
    migrationPoolFee: '150 bps + dynamic',
    useCase: 'Newly listed tokenized stocks, slow price discovery, anti-whale mechanism',
    bestFor: 'Fair-launch equities where early buyers shouldn\'t gap the price',
  },
  'rwa-steady': {
    assetClass: 'Real-World Assets',
    pricing: 'Premium - 2 SOL',
    curveShape: 'Flat, 4-checkpoint minimal slope',
    feeMode: 'Linear flat fee',
    baseFee: '50 bps flat (no decay)',
    migrationFee: '25 bps',
    migrationPoolFee: '100 bps flat',
    useCase: 'NAV-tracking assets, T-bills, real estate tokens — curve isn\'t a speculative tool',
    bestFor: 'Assets with intrinsic reference value that should stay close to NAV',
  },
  'icm-fast': {
    assetClass: 'Internet Capital Markets',
    pricing: 'Free',
    curveShape: 'Short, 3-checkpoint steep exponential',
    feeMode: 'Exponential fee scheduler',
    baseFee: '9000 bps → 100 bps over 60 periods',
    migrationFee: '100 bps',
    migrationPoolFee: '100 bps + dynamic',
    useCase: 'Fast launches, aggressive fee decay, bot-resistant opening',
    bestFor: 'Tokens targeting speed and momentum, willing to accept volatility',
  },
  'meme-classic': {
    assetClass: 'Memes',
    pricing: 'Free',
    curveShape: 'Baseline, 4-checkpoint exponential',
    feeMode: 'Exponential fee scheduler',
    baseFee: 'Standard scheduler (reference)',
    migrationFee: 'Standard',
    migrationPoolFee: 'Standard',
    useCase: 'Reference preset for comparison, meme launches, familiar exponential shape',
    bestFor: 'A/B testing against this baseline or casual meme tokens',
  },
};

export function ComparisonTable() {
  return (
    <div className="space-y-8">
      {/* Mobile-friendly comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:hidden">
        {PRESETS.map((preset) => (
          <Link
            key={preset.meta.id}
            href={`/presets/${preset.meta.id}`}
            className="p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-white">{preset.meta.name}</h3>
                {preset.meta.premium ? (
                  <span className="text-xs font-medium text-amber-300 bg-amber-500/15 rounded px-2 py-0.5">
                    {preset.meta.priceSol} SOL
                  </span>
                ) : (
                  <span className="text-xs font-medium text-emerald-300 bg-emerald-500/15 rounded px-2 py-0.5">
                    Free
                  </span>
                )}
              </div>
              <p className="text-xs text-white/60">{preset.meta.tagline}</p>
            </div>
            <div className="space-y-2 text-xs text-white/70">
              <p>
                <strong className="text-white/90">Asset:</strong> {PRESET_DATA[preset.meta.id]?.assetClass}
              </p>
              <p>
                <strong className="text-white/90">Fee:</strong> {PRESET_DATA[preset.meta.id]?.feeMode}
              </p>
              <p>
                <strong className="text-white/90">For:</strong> {PRESET_DATA[preset.meta.id]?.bestFor}
              </p>
            </div>
            <div className="text-xs text-violet-400 hover:text-violet-300">View Details →</div>
          </Link>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 font-semibold text-white/80">Comparison</th>
              {PRESETS.map((preset) => (
                <th key={preset.meta.id} className="text-left px-4 py-3 font-semibold text-white min-w-max">
                  <Link
                    href={`/presets/${preset.meta.id}`}
                    className="hover:text-violet-400 transition flex flex-col gap-1"
                  >
                    <span>{preset.meta.name}</span>
                    <span className="font-normal text-xs text-white/60">{preset.meta.tagline}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {/* Asset Class */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="px-4 py-3 font-medium text-white/70">Asset Class</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80">
                  <span className="inline-block px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 text-xs font-medium">
                    {PRESET_DATA[preset.meta.id]?.assetClass}
                  </span>
                </td>
              ))}
            </tr>

            {/* Pricing */}
            <tr className="hover:bg-white/[0.02] transition bg-white/[0.01]">
              <td className="px-4 py-3 font-medium text-white/70">Pricing</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80">
                  {preset.meta.premium ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-medium">
                      {preset.meta.priceSol} SOL
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-medium">
                      Free
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Curve Shape */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="px-4 py-3 font-medium text-white/70">Curve Shape</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm">
                  {PRESET_DATA[preset.meta.id]?.curveShape}
                </td>
              ))}
            </tr>

            {/* Fee Mode */}
            <tr className="hover:bg-white/[0.02] transition bg-white/[0.01]">
              <td className="px-4 py-3 font-medium text-white/70">Fee Mode</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm">
                  <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20">
                    {PRESET_DATA[preset.meta.id]?.feeMode}
                  </span>
                </td>
              ))}
            </tr>

            {/* Base Fee */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="px-4 py-3 font-medium text-white/70">Base Fee</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm">
                  {PRESET_DATA[preset.meta.id]?.baseFee}
                </td>
              ))}
            </tr>

            {/* Migration Fee */}
            <tr className="hover:bg-white/[0.02] transition bg-white/[0.01]">
              <td className="px-4 py-3 font-medium text-white/70">Migration Fee</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm font-mono">
                  {PRESET_DATA[preset.meta.id]?.migrationFee}
                </td>
              ))}
            </tr>

            {/* Migration Pool Fee */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="px-4 py-3 font-medium text-white/70">DAMM v2 Pool Fee</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm font-mono">
                  {PRESET_DATA[preset.meta.id]?.migrationPoolFee}
                </td>
              ))}
            </tr>

            {/* Use Case */}
            <tr className="hover:bg-white/[0.02] transition bg-white/[0.01]">
              <td className="px-4 py-3 font-medium text-white/70">Primary Use Case</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm">
                  {PRESET_DATA[preset.meta.id]?.useCase}
                </td>
              ))}
            </tr>

            {/* Best For */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="px-4 py-3 font-medium text-white/70">Best For</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3 text-white/80 text-sm">
                  {PRESET_DATA[preset.meta.id]?.bestFor}
                </td>
              ))}
            </tr>

            {/* Action */}
            <tr className="hover:bg-white/[0.02] transition bg-white/[0.01] border-t-2 border-white/10">
              <td className="px-4 py-3 font-medium text-white/70">Action</td>
              {PRESETS.map((preset) => (
                <td key={preset.meta.id} className="px-4 py-3">
                  <Link
                    href={`/presets/${preset.meta.id}`}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition"
                  >
                    View Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Guide */}
      <div className="mt-12 p-6 rounded-lg border border-white/10 bg-white/[0.02] space-y-4">
        <h3 className="text-lg font-semibold text-white">How to Choose a Preset</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white">Identify your asset class</h4>
                <p className="text-sm text-white/70">Is it a stock, RWA, ICM token, or meme?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white">Check the fee mode</h4>
                <p className="text-sm text-white/70">Do you need anti-whale protection (RateLimiter) or fast fee decay?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white">Review migration parameters</h4>
                <p className="text-sm text-white/70">What DAMM v2 fee tier and duration fits your post-launch plan?</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-semibold text-sm">
                4
              </div>
              <div>
                <h4 className="font-semibold text-white">Preview the curves</h4>
                <p className="text-sm text-white/70">Click "View Details" to see interactive price and fee charts</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-semibold text-sm">
                5
              </div>
              <div>
                <h4 className="font-semibold text-white">Unlock (if premium)</h4>
                <p className="text-sm text-white/70">Pay 2 SOL for premium presets, or use free ones immediately</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                6
              </div>
              <div>
                <h4 className="font-semibold text-white">Launch your token</h4>
                <p className="text-sm text-white/70">Create config, upload metadata, and mint your pool</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
