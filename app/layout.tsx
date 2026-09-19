import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aequus — DBC Curve Preset Marketplace',
  description: 'Curve and fee presets for tokenized equities, RWAs, ICM launches and memes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0f] text-white">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-[#0b0b0f]">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 font-bold text-white">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Ⓐ</span>
                </div>
                <span>Aequus</span>
              </a>
              <a href="/#presets" className="text-white/70 hover:text-white">
                Presets
              </a>
              <button className="px-4 py-2 bg-violet-600 text-white rounded">
                Connect
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="px-4 py-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
