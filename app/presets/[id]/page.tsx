'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPreset } from '../../../lib/curvePresets';
import { CurveChart } from '../../../components/CurveChart';
import { FeeChart } from '../../../components/FeeChart';
import { LaunchPanel } from '../../../components/LaunchPanel';

export default function PresetDetailPage() {
  const params = useParams();
  const presetId = params.id as string;
  const preset = getPreset(presetId);

  if (!preset) {
    return (
      <div className="space-y-6">
        <Link href="/" className="text-violet-400 hover:text-violet-300">
          ← Back to presets
        </Link>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-2xl font-bold text-red-400">Preset not found</h1>
          <p className="mt-2 text-red-300/70">
            The preset "{presetId}" does not exist. Try one of: stock-discovery, rwa-steady, icm-fast, or meme-classic.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/" className="inline-block text-violet-400 hover:text-violet-300 transition">
          ← Back to presets
        </Link>
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold text-white">{preset.meta.name}</h1>
              <p className="mt-2 text-lg text-white/70">{preset.meta.tagline}</p>
            </div>
            <div>
              {preset.meta.premium ? (
                <div className="text-right">
                  <div className="text-xs text-amber-300/70 uppercase tracking-wider">Premium</div>
                  <div className="text-2xl font-bold text-amber-300">{preset.meta.priceSol} SOL</div>
                </div>
              ) : (
                <div className="text-right">
                  <div className="text-xs text-emerald-300/70 uppercase tracking-wider">Free</div>
                  <div className="text-2xl font-bold text-emerald-300">Free to use</div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-white/60 max-w-2xl">{preset.meta.description}</p>
        </div>
      </div>

      {/* Rationale */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 space-y-3">
        <h2 className="text-lg font-semibold text-white">Why this preset?</h2>
        <ul className="space-y-2">
          {preset.meta.rationale.map((reason, idx) => (
            <li key={idx} className="flex gap-3 text-white/70">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-semibold">
                {idx + 1}
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Price Curve</h2>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 h-80">
            <CurveChart sim={preset.sim} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Fee Schedule</h2>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 h-80">
            <FeeChart sim={preset.sim} />
          </div>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-white/50 uppercase tracking-wider text-xs mb-1">Asset Class</div>
            <div className="text-white font-medium capitalize">{preset.meta.assetClass.replace('-', ' ')}</div>
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-xs mb-1">Fee Mode</div>
            <div className="text-white font-medium capitalize">{preset.sim.baseFee.mode.replace('-', ' ')}</div>
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-xs mb-1">Total Supply</div>
            <div className="text-white font-medium">{preset.sim.totalTokenSupply.toLocaleString()} tokens</div>
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-xs mb-1">Curve Checkpoints</div>
            <div className="text-white font-medium">{preset.sim.sqrtPriceCheckpoints.length} points</div>
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-xs mb-1">Migration Fee</div>
            <div className="text-white font-medium">{preset.sim.migrationFeeBps} bps</div>
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-xs mb-1">DAMM v2 Pool Fee</div>
            <div className="text-white font-medium">{preset.sim.migratedPoolFeeBps} bps</div>
          </div>
        </div>
      </div>

      {/* Launch Panel */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Ready to launch?</h2>
        <LaunchPanel preset={preset} />
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/10 pt-6 text-sm text-white/50 space-y-2">
        <p>
          This preset compiles to a real DBC config via <code className="text-white/60">@meteora-ag/dynamic-bonding-curve-sdk</code>.
        </p>
        <p>
          All presets are stored in <code className="text-white/60">lib/curvePresets.ts</code>.
        </p>
      </div>
    </main>
  );
}
