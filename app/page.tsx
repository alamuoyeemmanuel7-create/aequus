import { PRESETS } from '../lib/curvePresets';

export default function HomePage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '40px' }}>Aequus</h1>
      
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Presets</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {PRESETS.map((preset) => (
          <a
            key={preset.meta.id}
            href={`/presets/${preset.meta.id}`}
            style={{
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{preset.meta.name}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '8px', fontSize: '14px' }}>
              {preset.meta.tagline}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
