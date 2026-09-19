'use client';

import { HeroSection } from '../components/HeroSection';
import { PresetCard } from '../components/PresetCard';
import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Presets Grid */}
      <section id="presets" className="scroll-mt-20 mb-20">
        <h2 className="mb-8 text-3xl font-bold text-white">Featured Presets</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRESETS.map((preset) => (
            <PresetCard key={preset.meta.id} preset={preset} />
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
