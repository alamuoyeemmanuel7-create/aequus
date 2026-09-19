import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aequus',
  description: 'DBC Presets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ backgroundColor: '#0b0b0f', color: 'white', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <nav style={{ backgroundColor: '#1a1a23', padding: '20px', borderBottom: '1px solid #333' }}>
            <h1>AEQUUS</h1>
            <a href="/#presets" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Presets</a>
            <button style={{ marginLeft: 'auto', display: 'block', padding: '10px 20px', backgroundColor: '#7c3aed', color: 'white', border: 'none', cursor: 'pointer' }}>Connect</button>
          </nav>
          
          <main style={{ padding: '40px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
