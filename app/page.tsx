import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <main>
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
            Stop using one-size-fits-all exponential curves. Aequus provides opinionated, tuned bonding curve configurations for tokenized equities, RWAs, ICM tokens, and memes.
          </p>
        </div>
      </div>

      {/* Presets */}
      <section id="presets" className="scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-white">Featured Presets</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRESETS.map((preset) => (
            <a
              key={preset.meta.id}
              href={`/presets/${preset.meta.id}`}
              className="p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition cursor-pointer h-full flex flex-col space-y-4"
            >
              <div>
                <h3 className="text-xl font-bold text-white">{preset.meta.name}</h3>
                <p className="text-sm text-white/70 mt-2">{preset.meta.tagline}</p>
              </div>
              <p className="text-sm text-white/60 flex-grow">{preset.meta.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-white/50 uppercase">Asset Class</span>
                <span className="text-sm text-white font-medium">{preset.meta.assetClass}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Info */}
      <section className="mt-16 space-y-4 p-6 rounded-lg bg-white/[0.02] border border-white/10">
        <h3 className="text-lg font-semibold text-white">What Are Bonding Curves?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Bonding curves are price-discovery mechanisms on-chain. They programmatically set token price based on supply, enabling fair-launch tokens without traditional fundraising gatekeepers. But one curve shape doesn't fit all assets.
        </p>
      </section>
    </main>
  );
}
