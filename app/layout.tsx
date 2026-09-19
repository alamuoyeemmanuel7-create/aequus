import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aequus',
  description: 'DBC Presets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background-color: #0b0b0f; color: white; font-family: system-ui; }
          nav { background-color: #1a1a23; padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
          nav h1 { margin: 0; }
          nav div { display: flex; gap: 20px; align-items: center; }
          nav a { color: white; text-decoration: none; }
          nav button { padding: 10px 20px; background-color: #7c3aed; color: white; border: none; cursor: pointer; border-radius: 4px; }
          .content { padding: 40px; max-width: 1200px; margin: 0 auto; }
          h1 { margin-bottom: 16px; font-size: 32px; }
          h2 { margin: 32px 0 16px 0; font-size: 24px; }
          p { margin-bottom: 16px; color: rgba(255,255,255,0.8); }
          .presets-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 40px; }
          .preset-card { padding: 20px; border: 1px solid #333; border-radius: 8px; text-decoration: none; color: white; display: block; }
          .preset-card:hover { background-color: rgba(255,255,255,0.05); }
          .preset-card h3 { margin-bottom: 8px; }
          .preset-card p { margin: 0; font-size: 14px; color: rgba(255,255,255,0.6); }
        `}</style>
      </head>
      <body>
        <nav>
          <h1>AEQUUS</h1>
          <div>
            <a href="/#presets">Presets</a>
            <button>Connect</button>
          </div>
        </nav>
        
        <div className="content">
          <h1>Launchpad Presets for Every Asset Class</h1>
          <p>Stop using one-size-fits-all exponential curves.</p>

          <h2>Featured Presets</h2>
          <div className="presets-grid">
            <a href="/presets/stock-discovery" className="preset-card">
              <h3>Stock Discovery</h3>
              <p>Tokenized Equity</p>
            </a>
            <a href="/presets/rwa-steady" className="preset-card">
              <h3>RWA Steady</h3>
              <p>Real-world Assets</p>
            </a>
            <a href="/presets/icm-fast" className="preset-card">
              <h3>ICM Fast</h3>
              <p>Internet Capital Markets</p>
            </a>
            <a href="/presets/meme-classic" className="preset-card">
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
