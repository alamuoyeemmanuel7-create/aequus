export default function HomePage() {
  return (
    <main>
      <div style={{ marginBottom: '80px', display: 'grid', gap: '32px' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'inline-block', borderRadius: '9999px', backgroundColor: 'rgba(139, 85, 255, 0.1)', padding: '8px 16px', fontSize: '14px', fontWeight: '500', color: '#ddd6fe', border: '1px solid rgba(139, 85, 255, 0.2)', width: 'fit-content' }}>
            Built on Meteora DBC + DAMM v2
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: 'white', lineHeight: '1.2', maxWidth: '800px' }}>
            Launchpad Presets for Every Asset Class
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: '1.6' }}>
            Stop using one-size-fits-all exponential curves. Aequus provides opinionated, tuned bonding curve configurations for tokenized equities, RWAs, ICM tokens, and memes.
          </p>
        </div>
      </div>

      <section id="presets" style={{ marginBottom: '80px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '32px' }}>Featured Presets</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <a href="/presets/stock-discovery" style={{ display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}>
            <span style={{ display: 'inline-block', borderRadius: '9999px', backgroundColor: 'rgba(139, 85, 255, 0.15)', padding: '6px 12px', fontSize: '12px', fontWeight: '500', color: '#ddd6fe' }}>Tokenized Equity</span>
            <h3 style={{ marginTop: '12px', fontSize: '18px', fontWeight: '600', color: 'white' }}>Stock Discovery</h3>
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Slow, buy-size-aware price discovery</p>
          </a>
          <a href="/presets/rwa-steady" style={{ display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ display: 'inline-block', borderRadius: '9999px', backgroundColor: 'rgba(139, 85, 255, 0.15)', padding: '6px 12px', fontSize: '12px', fontWeight: '500', color: '#ddd6fe' }}>RWA</span>
            <h3 style={{ marginTop: '12px', fontSize: '18px', fontWeight: '600', color: 'white' }}>RWA Steady</h3>
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Near-flat curve for NAV-tracking</p>
          </a>
          <a href="/presets/icm-fast" style={{ display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ display: 'inline-block', borderRadius: '9999px', backgroundColor: 'rgba(139, 85, 255, 0.15)', padding: '6px 12px', fontSize: '12px', fontWeight: '500', color: '#ddd6fe' }}>ICM</span>
            <h3 style={{ marginTop: '12px', fontSize: '18px', fontWeight: '600', color: 'white' }}>ICM Fast</h3>
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Exponential curve for fast launches</p>
          </a>
          <a href="/presets/meme-classic" style={{ display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ display: 'inline-block', borderRadius: '9999px', backgroundColor: 'rgba(139, 85, 255, 0.15)', padding: '6px 12px', fontSize: '12px', fontWeight: '500', color: '#ddd6fe' }}>Meme</span>
            <h3 style={{ marginTop: '12px', fontSize: '18px', fontWeight: '600', color: 'white' }}>Meme Classic</h3>
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Standard exponential baseline</p>
          </a>
        </div>
      </section>
    </main>
  );
}
