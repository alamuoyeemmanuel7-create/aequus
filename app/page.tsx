'use client';

import Link from 'next/link';
import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="mb-20 space-y-8">
        <div className="space-y-4">
          <div className="inline-block rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 border border-violet-500/20">
            Built on Meteora DBC + DAMM v2
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Launchpad Presets<br />for Every Asset Class
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            Stop using one-size-fits-all exponential curves. Aequus provides opinionated, tuned bonding curve configurations for tokenized equities, RWAs, ICM tokens, and memes — each shaped for its asset class, not for speculation.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="#presets"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
          >
            Browse Presets
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 mb-20">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-400">⚡</span>
            </div>
            <h3 className="font-semibold text-white">Pre-Built & Tested</h3>
          </div>
          <p className="text-sm text-white/60">4 curve presets tuned for different asset classes</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400">📊</span>
            </div>
            <h3 className="font-semibold text-white">Simulate First</h3>
          </div>
          <p className="text-sm text-white/60">Preview price and fee behavior before launching</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400">💎</span>
            </div>
            <h3 className="font-semibold text-white">Premium & Free</h3>
          </div>
          <p className="text-sm text-white/60">Mix of free and premium presets</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 rounded-lg bg-white/[0.02] border border-white/10 mb-20">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-violet-400">4</div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Curve Presets</div>
        </div>
        <div className="text-center border-l border-r border-white/10">
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400">2</div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Asset Classes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-blue-400">∞</div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Possible Launches</div>
        </div>
      </div>

      {/* Presets Grid */}
      <section id="presets" className="scroll-mt-20 mb-20">
        <h2 className="mb-8 text-3xl font-bold text-white">Featured Presets</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRESETS.map((preset) => (
            <Link
              key={preset.meta.id}
              href={`/presets/${preset.meta.id}`}
              className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">
                  {preset.meta.assetClass.replace('-', ' ')}
                </span>
                {preset.meta.premium ? (
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300">
                    {preset.meta.priceSol} SOL
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
                    Free
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{preset.meta.name}</h3>
              <p className="mt-1 text-sm text-white/60">{preset.meta.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="space-y-4 p-8 rounded-lg bg-white/[0.02] border border-white/10">
        <h3 className="text-lg font-semibold text-white">What Are Bonding Curves?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Bonding curves are price-discovery mechanisms on-chain. They programmatically set token price based on supply, enabling fair-launch tokens without traditional fundraising gatekeepers. Aequus provides tuned curves for different asset classes — equities, RWAs, fast launches, and memes — so builders get price discovery that matches their token's economics instead of a one-size-fits-all exponential.
        </p>
      </section>
    </main>
  );
}
