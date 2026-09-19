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
      <div style={{ padding: '40px', backgroundColor: '#0b0b0f', color: 'white', minHeight: '100vh' }}>
        <Link href="/">← Back</Link>
        <h1 style={{ fontSize: '24px', color: 'red', marginTop: '40px' }}>Preset not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#0b0b0f', color: 'white', minHeight: '100vh' }}>
      <Link href="/" style={{ color: '#6b9bff' }}>← Back</Link>
      
      <h1 style={{ fontSize: '48px', marginTop: '40px', marginBottom: '16px' }}>{preset.meta.name}</h1>
      <p style={{ fontSize: '20px', opacity: 0.7, marginBottom: '40px' }}>{preset.meta.tagline}</p>
      
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>About</h2>
      <p style={{ marginBottom: '40px', lineHeight: '1.6' }}>{preset.meta.description}</p>

      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Details</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '40px' }}>
        <div>
          <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '4px' }}>Asset Class</p>
          <p>{preset.meta.assetClass}</p>
        </div>
        <div>
          <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '4px' }}>Fee Mode</p>
          <p>{preset.sim.baseFee.mode}</p>
        </div>
        <div>
          <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '4px' }}>Supply</p>
          <p>{preset.sim.totalTokenSupply}</p>
        </div>
        <div>
          <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '4px' }}>Migration Fee</p>
          <p>{preset.sim.migrationFeeBps} bps</p>
        </div>
      </div>

      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Why this preset?</h2>
      <ul style={{ marginBottom: '40px', paddingLeft: '20px' }}>
        {preset.meta.rationale.map((reason, idx) => (
          <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
