import Link from 'next/link';
import type { Preset } from '../lib/curvePresets';

const ASSET_CLASS_LABEL: Record<string, string> = {
  'tokenized-equity': 'Tokenized Equity',
  rwa: 'RWA',
  icm: 'ICM',
  meme: 'Meme',
  custom: 'Custom',
};

export function PresetCard({ preset }: { preset: Preset }) {
  return (
    <Link
      href={`/presets/${preset.meta.id}`}
      className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">
          {ASSET_CLASS_LABEL[preset.meta.assetClass]}
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
  );
}
