import { PRESETS } from '../lib/curvePresets';
import { PresetCardClient } from '../components/PresetCardClient';

export default function HomePage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '40px' }}>Aequus</h1>
      
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Presets</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {PRESETS.map((preset) => (
          <PresetCardClient key={preset.meta.id} preset={preset} />
        ))}
      </div>
    </div>
  );
}
