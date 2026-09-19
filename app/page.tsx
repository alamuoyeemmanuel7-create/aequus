export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mb-20 space-y-8">
        <div className="space-y-4">
          <div className="inline-block rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 border border-violet-500/20">
            Built on Meteora DBC + DAMM v2
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Launchpad Presets for Every Asset Class
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            Stop using one-size-fits-all exponential curves.
          </p>
        </div>
      </div>

      <section id="presets" className="scroll-mt-20 mb-20">
        <h2 className="mb-8 text-3xl font-bold text-white">Featured Presets</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <a href="/presets/stock-discovery" className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">Tokenized Equity</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Stock Discovery</h3>
            <p className="mt-1 text-sm text-white/60">Slow, buy-size-aware price discovery</p>
          </a>
          <a href="/presets/rwa-steady" className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">RWA</span>
            <h3 className="mt-3 text-lg font-semibold text-white">RWA Steady</h3>
            <p className="mt-1 text-sm text-white/60">Near-flat curve for NAV-tracking</p>
          </a>
          <a href="/presets/icm-fast" className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">ICM</span>
            <h3 className="mt-3 text-lg font-semibold text-white">ICM Fast</h3>
            <p className="mt-1 text-sm text-white/60">Exponential curve for fast launches</p>
          </a>
          <a href="/presets/meme-classic" className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">Meme</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Meme Classic</h3>
            <p className="mt-1 text-sm text-white/60">Standard exponential baseline</p>
          </a>
        </div>
      </section>
    </main>
  );
}
