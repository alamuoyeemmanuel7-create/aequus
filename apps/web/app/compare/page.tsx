import Link from 'next/link';
import { ComparisonTable } from '../../components/ComparisonTable';

export default function ComparePage() {
  return (
    <main className="max-w-full">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="text-violet-400 hover:text-violet-300 transition">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold">Preset Comparison</h1>
      </div>

      <div className="space-y-8">
        {/* Intro Section */}
        <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] space-y-4">
          <p className="text-lg text-white/80 leading-relaxed">
            All four Aequus presets are built using the real <code className="text-violet-300 bg-white/5 px-2 py-1 rounded text-sm">@meteora-ag/dynamic-bonding-curve-sdk</code>, but each is shaped for a different asset class and launch dynamic.
          </p>
          <p className="text-white/70 leading-relaxed">
            Compare curve shapes, fee modes, migration parameters, and use cases below. Click <strong>View Details</strong> on any preset to preview exact price and fee behavior with interactive charts before committing capital.
          </p>
        </div>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Key Differences Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-3">
            <h3 className="text-lg font-semibold text-emerald-300">Stock Discovery</h3>
            <p className="text-sm text-white/70">
              The differentiator: <strong>RateLimiter fee mode</strong> scales fees with buy size, not time. Perfect for equities where early whales shouldn't gap the price.
            </p>
            <div className="text-xs text-emerald-300/70 font-mono bg-black/30 p-2 rounded">
              6 checkpoints • RateLimiter • 200bps migration
            </div>
          </div>

          <div className="p-6 rounded-lg border border-blue-500/20 bg-blue-500/5 space-y-3">
            <h3 className="text-lg font-semibold text-blue-300">RWA Steady</h3>
            <p className="text-sm text-white/70">
              The flat curve: nearly-flat pricing keeps slippage minimal. Fee doesn't decay because there's no sniper problem when the curve itself resists speculation.
            </p>
            <div className="text-xs text-blue-300/70 font-mono bg-black/30 p-2 rounded">
              4 checkpoints • Flat 50bps • 25bps migration
            </div>
          </div>

          <div className="p-6 rounded-lg border border-purple-500/20 bg-purple-500/5 space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">ICM Fast</h3>
            <p className="text-sm text-white/70">
              The aggressive option: steep curve + aggressive fee decay (9000bps → 100bps). For launches that want momentum and are okay with volatility.
            </p>
            <div className="text-xs text-purple-300/70 font-mono bg-black/30 p-2 rounded">
              3 checkpoints • Exponential • Free to launch
            </div>
          </div>

          <div className="p-6 rounded-lg border border-pink-500/20 bg-pink-500/5 space-y-3">
            <h3 className="text-lg font-semibold text-pink-300">Meme Classic</h3>
            <p className="text-sm text-white/70">
              The reference: baseline exponential curve. Use this to A/B test your preset against, or for straightforward meme launches.
            </p>
            <div className="text-xs text-pink-300/70 font-mono bg-black/30 p-2 rounded">
              4 checkpoints • Exponential • Free reference
            </div>
          </div>

          <div className="p-6 rounded-lg border border-orange-500/20 bg-orange-500/5 space-y-3">
            <h3 className="text-lg font-semibold text-orange-300">Why Multiple Fee Modes?</h3>
            <p className="text-sm text-white/70">
              Different assets need different protections. Equities need size-aware fees (RateLimiter). RWAs need flat fees. Fast launches need aggressive decay. One size doesn't fit all.
            </p>
            <Link href="/docs" className="text-xs text-orange-300 hover:text-orange-200 transition inline-block">
              Learn more in docs →
            </Link>
          </div>

          <div className="p-6 rounded-lg border border-cyan-500/20 bg-cyan-500/5 space-y-3">
            <h3 className="text-lg font-semibold text-cyan-300">Free vs. Premium</h3>
            <p className="text-sm text-white/70">
              ICM Fast and Meme Classic are free — reference implementations. Stock Discovery and RWA Steady are premium (2 SOL each) to fund marketplace maintenance.
            </p>
            <Link href="/docs#pricing" className="text-xs text-cyan-300 hover:text-cyan-200 transition inline-block">
              Pricing details →
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-8 rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 space-y-4">
          <h3 className="text-xl font-bold text-white">Ready to Launch?</h3>
          <p className="text-white/80">
            Browse the full preset marketplace, preview curves, and launch your first token:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#presets"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
            >
              View All Presets
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-white/40">
        <Link href="/" className="hover:text-white/60 transition">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
