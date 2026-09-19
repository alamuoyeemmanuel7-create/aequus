export default function Page() {
  return (
    <div>
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
    </div>
  );
}
