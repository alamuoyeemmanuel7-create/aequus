import Link from 'next/link';
import { PRESETS, getPreset } from '../../../lib/curvePresets';

export function generateStaticParams() {
  return PRESETS.map((preset) => ({
    id: preset.meta.id,
  }));
}

export default function PresetDetailPage({ params }: { params: { id: string } }) {
  const preset = getPreset(params.id);

  if (!preset) {
    return (
      <div className="p-8">
        <Link href="/">← Back</Link>
        <h1 className="text-2xl font-bold text-red-500 mt-8">Preset not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/" className="text-blue-400 hover:text-blue-300">← Back</Link>
      
      <h1 className="text-5xl font-bold mt-8 mb-4">{preset.meta.name}</h1>
      <p className="text-xl text-white/70 mb-8">{preset.meta.tagline}</p>
      
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-white/80 mb-8">{preset.meta.description}</p>

        <h2 className="text-2xl font-bold mb-4">Details</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-white/50">Asset Class</p>
            <p className="font-bold">{preset.meta.assetClass}</p>
          </div>
          <div>
            <p className="text-white/50">Fee Mode</p>
            <p className="font-bold">{preset.sim.baseFee.mode}</p>
          </div>
          <div>
            <p className="text-white/50">Supply</p>
            <p className="font-bold">{preset.sim.totalTokenSupply}</p>
          </div>
          <div>
            <p className="text-white/50">Migration Fee</p>
            <p className="font-bold">{preset.sim.migrationFeeBps} bps</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Why this preset?</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          {preset.meta.rationale.map((reason, idx) => (
            <li key={idx} className="text-white/80">{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
