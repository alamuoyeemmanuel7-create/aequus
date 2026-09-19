'use client';

import Link from 'next/link';
import type { Preset } from '../lib/curvePresets';
import { LaunchPanel } from './LaunchPanel';
import { CurveChart } from './CurveChart';
import { FeeChart } from './FeeChart';

export function PresetDetailContent({ preset }: { preset: Preset }) {
  return (
    <>
      <div className="mb-6">
        <Link href="/" className="inline-block text-violet-400 hover:text-violet-300 transition">
          ← Back to presets
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">{preset.meta.name}</h1>
        <p className="mt-2 text-lg text-white/70">{preset.meta.tagline}</p>
        <p className="mt-4 text-white/60">{preset.meta.description}</p>
      </div>

      {/* Rationale */}
      <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Why this preset?</h2>
        <ul className="space-y-2">
          {preset.meta.rationale.map((reason, idx) => (
            <li key={idx} className="flex gap-3 text-white/70 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-semibold">
                {idx + 1}
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Price Curve</h2>
          <div className="h-64 w-full">
            <CurveChart preset={preset} />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Fee Schedule</h2>
          <div className="h-64 w-full">
            <FeeChart preset={preset} />
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Configuration</h2>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div>
            <div className="text-white/50 uppercase text-xs tracking-wider">Asset Class</div>
            <div className="text-white font-medium mt-1 capitalize">{preset.meta.assetClass.replace('-', ' ')}</div>
          </div>
          <div>
            <div className="text-white/50 uppercase text-xs tracking-wider">Fee Mode</div>
            <div className="text-white font-medium mt-1 capitalize">{preset.sim.baseFee.mode.replace('-', ' ')}</div>
          </div>
          <div>
            <div className="text-white/50 uppercase text-xs tracking-wider">Total Supply</div>
            <div className="text-white font-medium mt-1">{preset.sim.totalTokenSupply.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-white/50 uppercase text-xs tracking-wider">Migration Fee</div>
            <div className="text-white font-medium mt-1">{preset.sim.migrationFeeBps} bps</div>
          </div>
        </div>
      </div>

      {/* Launch Panel */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">Launch</h2>
        <LaunchPanel preset={preset} />
      </div>
    </>
  );
}
