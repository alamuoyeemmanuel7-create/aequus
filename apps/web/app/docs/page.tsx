import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="text-violet-400 hover:text-violet-300 transition">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold">Documentation</h1>
      </div>

      <div className="space-y-12">
        {/* About Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What is Aequus?</h2>
          <p className="text-white/70 leading-relaxed">
            Aequus is a marketplace of named, opinionated DBC (Dynamic Bonding Curve) configurations tuned for specific asset classes. Instead of using a generic exponential curve for every token launch, Aequus lets you choose a preset curve designed for your specific asset type.
          </p>
          <p className="text-white/70 leading-relaxed">
            Each preset includes optimized curve shape, fee structure, and migration parameters — and you can preview the exact price and fee behavior before launching.
          </p>
        </section>

        {/* Presets Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">The 4 Presets</h2>

          <div className="space-y-5">
            <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-emerald-300">Stock Discovery</h3>
                <span className="text-xs font-medium text-amber-300 bg-amber-500/15 rounded-full px-2.5 py-1">2 SOL</span>
              </div>
              <p className="text-sm text-white/60 mb-3">For: Tokenized equities, stock-like assets</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Long 6-checkpoint curve for gradual price discovery</li>
                <li>• RateLimiter fee mode: fees scale with buy size (anti-whale protection)</li>
                <li>• Perfect for assets with intrinsic value that shouldn't be volatile</li>
                <li>• Migrates to DAMM v2 with 200bps fee tier</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-blue-300">RWA Steady</h3>
                <span className="text-xs font-medium text-amber-300 bg-amber-500/15 rounded-full px-2.5 py-1">2 SOL</span>
              </div>
              <p className="text-sm text-white/60 mb-3">For: Real-world assets, NAV-tracking tokens</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Nearly-flat 4-checkpoint curve for stable pricing</li>
                <li>• Consistent 50bps fee (no time-based decay)</li>
                <li>• Curve isn't a speculative instrument — ideal for reference-priced assets</li>
                <li>• Migrates to DAMM v2 with 25bps fee tier</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-purple-300">ICM Fast</h3>
                <span className="text-xs font-medium text-emerald-300 bg-emerald-500/15 rounded-full px-2.5 py-1">Free</span>
              </div>
              <p className="text-sm text-white/60 mb-3">For: Internet capital markets, fast launches</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Short 3-checkpoint steep exponential curve</li>
                <li>• Aggressive fee scheduler: 9000bps → 100bps over 60 periods</li>
                <li>• For launches that prioritize speed and momentum</li>
                <li>• Migrates to DAMM v2 with 100bps fee tier</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-pink-300">Meme Classic</h3>
                <span className="text-xs font-medium text-emerald-300 bg-emerald-500/15 rounded-full px-2.5 py-1">Free</span>
              </div>
              <p className="text-sm text-white/60 mb-3">For: Memecoins, speculative launches</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Baseline 4-checkpoint exponential curve (familiar shape)</li>
                <li>• Reference preset for comparing against new strategies</li>
                <li>• A/B test your preset against this one</li>
                <li>• Migrates to DAMM v2 with standard fee tier</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How It Works</h2>
          <ol className="space-y-4 list-decimal list-inside text-white/70 leading-relaxed">
            <li>
              <strong>Choose a preset</strong> from the marketplace based on your asset class
            </li>
            <li>
              <strong>Preview the curves</strong> — see exact price and fee behavior before committing
            </li>
            <li>
              <strong>Unlock (if premium)</strong> — pay the SOL fee to use premium presets
            </li>
            <li>
              <strong>Create a config</strong> — sign a transaction to generate your DBC config on-chain
            </li>
            <li>
              <strong>Create a pool</strong> — upload metadata, mint your token, and launch your pool
            </li>
            <li>
              <strong>Monitor live</strong> — track curve progress and fees in real-time on the detail page
            </li>
            <li>
              <strong>Migrate to DAMM v2</strong> — graduate to concentrated liquidity when ready
            </li>
          </ol>
        </section>

        {/* Pricing Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Pricing & Payment</h2>
          <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-white/70 mb-4">
              Premium presets (Stock Discovery, RWA Steady) require a one-time SOL payment to unlock. This payment goes to the Aequus treasury and enables maintenance and expansion of the preset marketplace.
            </p>
            <ul className="text-sm text-white/70 space-y-2">
              <li>• <strong>Stock Discovery:</strong> 2 SOL</li>
              <li>• <strong>RWA Steady:</strong> 2 SOL</li>
              <li>• <strong>ICM Fast:</strong> Free</li>
              <li>• <strong>Meme Classic:</strong> Free</li>
            </ul>
            <p className="text-xs text-white/50 mt-4">
              Payments are checked via recent treasury transactions. Once paid, your wallet is unlocked for that preset indefinitely.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Can I customize a preset?</h3>
              <p className="text-sm text-white/70">
                Not yet — presets are opinionated and fixed. If you need a fully custom curve, the underlying SDK is open-source. Contact us if you're interested in building custom presets.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">What happens when the curve graduates?</h3>
              <p className="text-sm text-white/70">
                Your pool automatically migrates to DAMM v2 (Meteora's concentrated liquidity AMM) when the curve completes. Each preset specifies the migration fee tier and parameters, optimized for that asset class.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Can I use this on mainnet or devnet?</h3>
              <p className="text-sm text-white/70">
                The UI will work on any Solana network you configure in your environment. Aequus was built for devnet/testnet during the hackathon, but the SDKs support mainnet.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Do you hold my keys?</h3>
              <p className="text-sm text-white/70">
                No. Aequus is a UI-only marketplace. All transactions (config creation, pool creation, token minting) are signed by your connected wallet. Aequus never manages funds.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">How are the presets built?</h3>
              <p className="text-sm text-white/70">
                Every preset is compiled using the real Meteora DBC TypeScript SDK with `buildCurveWithCustomSqrtPrices`. The source code is in `packages/curve-presets/src/presets.ts`.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Is there a programmatic API?</h3>
              <p className="text-sm text-white/70">
                The preset library (`@aequus/curve-presets`) is published as an npm package. You can import presets, use the simulator, and integrate into your own launchpad UIs.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="space-y-4 p-6 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <h2 className="text-xl font-bold text-white">Need Help?</h2>
          <p className="text-sm text-white/70">
            Check the README.md for technical details, or review the curve preset source in packages/curve-presets/src/presets.ts.
          </p>
        </section>
      </div>

      <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-white/40">
        <Link href="/" className="hover:text-white/60 transition">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
