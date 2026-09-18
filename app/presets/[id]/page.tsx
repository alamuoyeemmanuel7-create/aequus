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
      <div style={{ padding: '40px' }}>
        <Link href="/">← Back</Link>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b', marginTop: '40px' }}>Preset not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6b9bff', textDecoration: 'none' }}>← Back</Link>
      
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginTop: '40px', marginBottom: '16px' }}>
        {preset.meta.name}
      </h1>
      <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
        {preset.meta.tagline}
      </p>
      
      <div style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>About</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '40px', lineHeight: '1.6' }}>
          {preset.meta.description}
        </p>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '40px' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>Asset Class</p>
            <p style={{ fontWeight: 'bold' }}>{preset.meta.assetClass}</p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>Fee Mode</p>
            <p style={{ fontWeight: 'bold' }}>{preset.sim.baseFee.mode}</p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>Supply</p>
            <p style={{ fontWeight: 'bold' }}>{preset.sim.totalTokenSupply}</p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>Migration Fee</p>
            <p style={{ fontWeight: 'bold' }}>{preset.sim.migrationFeeBps} bps</p>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Why this preset?</h2>
        <ul style={{ marginBottom: '40px', paddingLeft: '20px' }}>
          {preset.meta.rationale.map((reason, idx) => (
            <li key={idx} style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px', lineHeight: '1.6' }}>
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
