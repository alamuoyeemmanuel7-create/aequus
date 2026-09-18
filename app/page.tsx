import { HeroSection } from '../components/HeroSection';
import { PresetCard } from '../components/PresetCard';
import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section id="presets" className="scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-white">Featured Presets</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRESETS.map((preset) => (
            <PresetCard key={preset.meta.id} preset={preset} />
          ))}
        </div>
      </section>

      <section className="mt-16 space-y-4 p-6 rounded-lg bg-white/[0.02] border border-white/10">
        <h3 className="text-lg font-semibold text-white">What Are Bonding Curves?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Bonding curves are price-discovery mechanisms on-chain. They programmatically set token price based on supply, enabling fair-launch tokens without traditional fundraising gatekeepers. But one curve shape doesn't fit all assets — memecoins want speed and volatility, while RWAs need stability and slow discovery.
        </p>
        <p className="text-sm text-white/70 leading-relaxed">
          Aequus presets solve this by offering curve shapes tuned for specific asset classes. Each preset includes optimized fee structures, migration parameters, and live simulations before you launch.
        </p>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-white/40 space-y-2">
        <p>
          Every preset here compiles to a real DBC config via{' '}
          <code className="text-white/60">@meteora-ag/dynamic-bonding-curve-sdk</code>. See{' '}
          <code className="text-white/60">packages/curve-presets</code> for the source.
        </p>
        <p>
          Built as a submission to the Meteora hackathon. Learn more at{' '}
          <code className="text-white/60">README.md</code>.
        </p>
      </footer>
    </main>
  );
}
