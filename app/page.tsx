import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#0b0b0f', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '40px' }}>Aequus</h1>
      
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Presets</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {PRESETS.map((preset) => (
          <a
            key={preset.meta.id}
            href={`/presets/${preset.meta.id}`}
            style={{
              padding: '24px',
              border: '1px solid white',
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{preset.meta.name}</h3>
            <p style={{ fontSize: '14px', opacity: 0.7 }}>{preset.meta.tagline}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
