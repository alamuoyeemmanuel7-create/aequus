import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Aequus Presets</h1>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PRESETS.map((preset) => (
          <a
            key={preset.meta.id}
            href={`/presets/${preset.meta.id}`}
            className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition"
          >
            <h2 className="text-xl font-bold text-white">{preset.meta.name}</h2>
            <p className="text-white/70 mt-2">{preset.meta.tagline}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
