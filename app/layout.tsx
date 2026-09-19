import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aequus',
  description: 'DBC Presets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0b0b0f', color: 'white', fontFamily: 'system-ui' }}>
        <nav style={{ backgroundColor: '#1a1a23', padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>AEQUUS</h1>
          <div>
            <a href="/#presets" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Presets</a>
            <button style={{ padding: '10px 20px', backgroundColor: '#7c3aed', color: 'white', border: 'none', cursor: 'pointer' }}>Connect</button>
          </div>
        </nav>
        
        <div style={{ padding: '40px' }}>
          <h1>Launchpad Presets for Every Asset Class</h1>
          <p>Stop using one-size-fits-all exponential curves.</p>

          <h2>Featured Presets</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <a href="/presets/stock-discovery" style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
              <h3>Stock Discovery</h3>
              <p>Tokenized Equity</p>
            </a>
            <a href="/presets/rwa-steady" style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
              <h3>RWA Steady</h3>
              <p>Real-world Assets</p>
            </a>
            <a href="/presets/icm-fast" style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
              <h3>ICM Fast</h3>
              <p>Internet Capital Markets</p>
            </a>
            <a href="/presets/meme-classic" style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
              <h3>Meme Classic</h3>
              <p>Memes</p>
            </a>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
