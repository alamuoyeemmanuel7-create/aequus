import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold mb-12">Aequus</h1>
      
      <h2 className="text-2xl font-bold mb-6">Presets</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {PRESETS.map((preset) => (
          <a
            key={preset.meta.id}
            href={`/presets/${preset.meta.id}`}
            className="p-6 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5"
          >
            <h3 className="text-xl font-bold">{preset.meta.name}</h3>
            <p className="text-white/60 mt-2">{preset.meta.tagline}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
