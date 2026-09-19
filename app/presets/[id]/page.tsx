import { PresetDetailContent } from '../../../components/PresetDetailContent';
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
      <div className="space-y-6 py-12">
        <a href="/" className="text-violet-400 hover:text-violet-300">
          ← Back to presets
        </a>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-2xl font-bold text-red-400">Preset not found</h1>
        </div>
      </div>
    );
  }

  return <PresetDetailContent preset={preset} />;
}
