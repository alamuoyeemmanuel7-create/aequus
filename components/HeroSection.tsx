'use client';

import Link from 'next/link';
import { WalletMultiButtonWrapper } from './WalletButtonWrapper';

export function HeroSection() {
  return (
    <div className="mb-20 space-y-12">
      {/* Main Hero */}
      <div className="space-y-8">
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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="#presets"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
          >
            Browse Presets
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition"
          >
            Compare All
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white">Pre-Built & Tested</h3>
          </div>
          <p className="text-sm text-white/60">4 curve presets tuned for different asset classes and launch dynamics</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white">Simulate First</h3>
          </div>
          <p className="text-sm text-white/60">Preview exact price and fee behavior before launching with interactive charts</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white">Premium & Free</h3>
          </div>
          <p className="text-sm text-white/60">Mix of free reference presets and premium strategies with instant unlock</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 p-6 rounded-lg bg-white/[0.02] border border-white/10">
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

      {/* Wallet Button - Visible on all screen sizes */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/pools" className="text-violet-300 hover:text-violet-200 transition">
            View Launched Pools →
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/compare" className="text-violet-300 hover:text-violet-200 transition">
            Compare Presets →
          </Link>
        </div>
        <WalletMultiButtonWrapper />
      </div>
    </div>
  );
}
