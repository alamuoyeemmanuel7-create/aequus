'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const selectedPresetData = PRESETS.find(p => p.meta.id === selectedPreset);

  return (
    <main className="space-y-20">
      {/* Hero Section */}
      <section className="space-y-6 pt-8">
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/50 text-sm font-medium text-violet-300">
            🚀 Meteora DBC Preset Marketplace
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold text-white tracking-tight">
            Bonding Curves<br />for Every Asset Class
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Stop using one-size-fits-all exponential curves. Aequus provides opinionated, pre-tested DBC presets tuned for tokenized equities, RWAs, ICM launches, and memes.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => document.getElementById('presets')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
          >
            Explore Presets
          </button>
          <a
            href="https://docs.meteora.ag/developer-guides/dbc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
          >
            Read Docs
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="space-y-6 p-8 rounded-lg bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-white/10">
        <h2 className="text-3xl font-bold text-white">The Problem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-300">❌ Current State</h3>
            <p className="text-white/70">All launchpads use the same exponential curve — optimized for speculative memes, not for equities or RWAs</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-emerald-300">✅ Our Solution</h3>
            <p className="text-white/70">4 professionally-tuned DBC presets, each designed for a specific asset class and launch strategy</p>
          </div>
        </div>
      </section>

      {/* 4 Presets Showcase */}
      <section id="presets" className="space-y-8 scroll-mt-20">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">The 4 Presets</h2>
          <p className="text-lg text-white/60">Click any preset to explore details and configuration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRESETS.map((preset) => (
            <button
              key={preset.meta.id}
              onClick={() => setSelectedPreset(preset.meta.id)}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 transition hover:border-violet-500/50 hover:from-white/[0.08] hover:to-white/[0.04] text-left cursor-pointer"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
              
              <div className="relative space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition">
                      {preset.meta.name}
                    </h3>
                    <p className="text-sm text-white/50">{preset.meta.assetClass.replace('-', ' ')}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    preset.meta.premium 
                      ? 'bg-amber-500/20 text-amber-300' 
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {preset.meta.premium ? `${preset.meta.priceSol} SOL` : 'Free'}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-white/80 font-medium">{preset.meta.tagline}</p>

                {/* Description */}
                <p className="text-sm text-white/60 line-clamp-2">{preset.meta.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <div>
                    <p className="text-xs text-white/50">Fee Mode</p>
                    <p className="text-sm font-semibold text-white">{preset.sim.baseFee.mode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Supply</p>
                    <p className="text-sm font-semibold text-white">{(preset.sim.totalTokenSupply / 1_000_000_000).toFixed(0)}B</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 pt-2 text-violet-400 group-hover:text-violet-300 transition">
                  <span className="text-sm font-medium">View Details</span>
                  <span>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal for Preset Details */}
      {selectedPreset && selectedPresetData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedPreset(null)}>
          <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-violet-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedPresetData.meta.name}</h2>
                  <p className="text-white/60 mt-1">{selectedPresetData.meta.tagline}</p>
                </div>
                <button onClick={() => setSelectedPreset(null)} className="text-white/60 hover:text-white text-2xl">×</button>
              </div>

              <p className="text-white/80">{selectedPresetData.meta.description}</p>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-violet-300">Why This Preset?</h3>
                <ul className="space-y-2">
                  {selectedPresetData.meta.rationale.map((reason, i) => (
                    <li key={i} className="text-sm text-white/70 flex gap-3">
                      <span className="text-violet-400">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/50">Fee Mode</p>
                  <p className="text-sm font-bold text-white mt-1">{selectedPresetData.sim.baseFee.mode}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/50">Migration Fee</p>
                  <p className="text-sm font-bold text-white mt-1">{selectedPresetData.sim.migrationFeeBps} bps</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/presets/${selectedPresetData.meta.id}`} className="flex-1 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition text-center">
                  Full Details
                </Link>
                <button onClick={() => setSelectedPreset(null)} className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-white">How It Works</h2>
        
        <div className="space-y-4">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white">1</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Choose Your Preset</h3>
              <p className="text-white/70">Pick the preset tailored to your asset class and launch strategy — Stock Discovery, RWA Steady, ICM Fast, or Meme Classic.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white">2</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Connect Your Wallet</h3>
              <p className="text-white/70">Link your Solana wallet and authorize the DBC deployment to your launchpad.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white">3</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Deploy the Curve</h3>
              <p className="text-white/70">Aequus generates and deploys the optimized bonding curve configuration to Meteora DBC.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white">4</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Launch & Monitor</h3>
              <p className="text-white/70">Your token launches with professional curve mechanics. Monitor live performance and metrics in real-time.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white">5</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Migrate to DAMM v2</h3>
              <p className="text-white/70">When ready, seamlessly migrate to DAMM v2 for ongoing liquidity management and fee optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Each Preset */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-white">Why These 4 Presets?</h2>

        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
            <h3 className="text-lg font-bold text-white mb-2">📈 Stock Discovery</h3>
            <p className="text-white/70">
              <strong>Problem:</strong> Tokenized equities need slow, size-aware price discovery, not fast whale-gaps. <br/>
              <strong>Solution:</strong> Long 6-checkpoint curve + RateLimiter fee mode (fees scale with buy size, not time). Migrates to DAMM v2 with dynamic fees.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
            <h3 className="text-lg font-bold text-white mb-2">🏢 RWA Steady</h3>
            <p className="text-white/70">
              <strong>Problem:</strong> Real-world assets should track NAV, not run up speculative curves. <br/>
              <strong>Solution:</strong> Nearly-flat 4-checkpoint curve, flat fee, no scheduler decay. Perfect for stable asset tracking.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
            <h3 className="text-lg font-bold text-white mb-2">⚡ ICM Fast</h3>
            <p className="text-white/70">
              <strong>Problem:</strong> Fast launches need speed and anti-bot protection. <br/>
              <strong>Solution:</strong> Steep exponential curve with aggressive fee scheduler (90% → 1% over 60 periods).
            </p>
          </div>

          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
            <h3 className="text-lg font-bold text-white mb-2">🎨 Meme Classic</h3>
            <p className="text-white/70">
              <strong>Purpose:</strong> The familiar baseline so builders can A/B test new presets. <br/>
              <strong>Benefit:</strong> Standard exponential + fee scheduler, included so every preset has a known reference point.
            </p>
          </div>
        </div>
      </section>

      {/* Innovation */}
      <section className="space-y-8 p-8 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
        <h2 className="text-3xl font-bold text-white">🚀 Why Aequus Wins</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-violet-300">Novel DBC Use</h3>
            <p className="text-white/70">Repurposes RateLimiter (anti-sniper tool) as a price-discovery mechanism for equities — fees scale with buy SIZE, not time.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-violet-300">Deep Meteora Integration</h3>
            <p className="text-white/70">Every preset built with real DBC SDK. Migrations to DAMM v2. Live pool monitoring. Production-quality code.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-violet-300">Reusable Infrastructure</h3>
            <p className="text-white/70">Preset library, simulator, CLI tools. Not tied to memes — any launchpad builder can fork and extend.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-violet-300">End-to-End Flow</h3>
            <p className="text-white/70">Config creation → launch → live monitoring → DAMM v2 migration → auto-compounding liquidity keeper.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white">🛠️ Built With</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-white/60">Frontend</p>
            <p className="text-lg font-bold text-white">Next.js 14 + TypeScript</p>
            <p className="text-xs text-white/50 mt-2">App Router, SSG, Tailwind CSS</p>
          </div>

          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-white/60">Blockchain</p>
            <p className="text-lg font-bold text-white">Meteora DBC + DAMM v2</p>
            <p className="text-xs text-white/50 mt-2">Solana wallet integration, SDK</p>
          </div>

          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-white/60">Deployment</p>
            <p className="text-lg font-bold text-white">Vercel</p>
            <p className="text-xs text-white/50 mt-2">Production-ready, auto-scaling</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-4 p-8 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
        <h2 className="text-2xl font-bold text-white">Ready to Launch?</h2>
        <p className="text-white/70">
          Choose a preset, connect your wallet, and deploy. All the curve math is battle-tested and optimized for your asset class.
        </p>
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => document.getElementById('presets')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
          >
            Browse Presets
          </button>
          <a
            href="https://github.com/MeteoraAg/dynamic-bonding-curve"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Footer Info */}
      <section className="space-y-4 p-8 rounded-lg bg-white/[0.02] border border-white/5">
        <h3 className="text-lg font-semibold text-white">About Aequus</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Aequus is a DBC curve preset marketplace built on Meteora's Dynamic Bonding Curve infrastructure for the Meteora Hackathon 2026. Each preset is professionally tuned for a specific asset class — tokenized equities, RWAs, fast launches, and memes. All presets are built with the real DBC SDK and tested for production use.
        </p>
        <div className="flex gap-4 pt-4 text-sm flex-wrap">
          <a href="https://docs.meteora.ag/developer-guides/dbc" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">📚 Docs</a>
          <a href="https://discord.com/invite/meteora" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">💬 Discord</a>
          <a href="https://github.com/MeteoraAg" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">🔗 GitHub</a>
          <span className="text-white/40">Built for the Meteora Hackathon 2026</span>
        </div>
      </section>
    </main>
  );
}
