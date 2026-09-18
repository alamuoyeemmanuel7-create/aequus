'use client';

import type { Preset } from '../lib/curvePresets';

export function PresetCardClient({ preset }: { preset: Preset }) {
  return (
    <a
      href={`/presets/${preset.meta.id}`}
      style={{
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'block',
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
  );
}
