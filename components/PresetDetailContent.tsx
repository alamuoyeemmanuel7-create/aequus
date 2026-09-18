'use client';

import Link from 'next/link';
import type { Preset } from '../lib/curvePresets';
import { CurveChart } from './CurveChart';
import { FeeChart } from './FeeChart';
import { LaunchPanel } from './LaunchPanel';

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Price Curve</h2>
          <div className="h-80 border border-white/10 rounded-lg bg-white/[0.02] p-4">
            <CurveChart sim={preset.sim} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Fee Schedule</h2>
          <div className="h-80 border border-white/10 rounded-lg bg-white/[0.02] p-4">
            <FeeChart sim={preset.sim} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-white/50">Asset Class</div>
            <div className="text-white font-medium">{preset.meta.assetClass}</div>
          </div>
          <div>
            <div className="text-white/50">Fee Mode</div>
            <div className="text-white font-medium">{preset.sim.baseFee.mode}</div>
          </div>
          <div>
            <div className="text-white/50">Total Supply</div>
            <div className="text-white font-medium">{preset.sim.totalTokenSupply}</div>
          </div>
          <div>
            <div className="text-white/50">Migration Fee</div>
            <div className="text-white font-medium">{preset.sim.migrationFeeBps} bps</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Launch</h2>
        <LaunchPanel preset={preset} />
      </div>
    </>
  );
}
