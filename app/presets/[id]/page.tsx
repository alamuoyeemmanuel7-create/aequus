import Link from 'next/link';
import { PRESETS, getPreset } from '../../../lib/curvePresets';
import { PresetDetailContent } from '../../../components/PresetDetailContent';

export function generateStaticParams() {
  return PRESETS.map((preset) => ({
    id: preset.meta.id,
  }));
}

export default function PresetDetailPage({ params }: { params: { id: string } }) {
  const presetId = params.id;
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
            The preset "{presetId}" does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <PresetDetailContent preset={preset} />;
}
