import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aequus — DBC Curve Preset Marketplace',
  description: 'Curve and fee presets for tokenized equities, RWAs, ICM launches and memes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0b0b0f', color: 'white' }}>
        {/* Navigation - using inline styles */}
        <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0b0b0f', padding: '16px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #a855f7, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>Ⓐ</span>
              </div>
              <span>Aequus</span>
            </a>
            <a href="/#presets" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Presets</a>
            <button style={{ padding: '8px 16px', backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Connect
            </button>
          </div>
        </nav>

        {/* Main Content - using inline styles */}
        <main style={{ padding: '40px 16px', maxWidth: '1280px', margin: '0 auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
