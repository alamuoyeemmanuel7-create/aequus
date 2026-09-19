import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aequus — DBC Curve Preset Marketplace',
  description: 'Curve and fee presets for tokenized equities, RWAs, ICM launches and memes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0f] text-white antialiased">
        {/* Simple Navigation - No client components yet */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 text-base sm:text-lg font-bold text-white hover:text-violet-400 transition flex-shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">Ⓐ</span>
                </div>
                <span className="hidden sm:inline">Aequus</span>
              </a>

              {/* Presets Link */}
              <div className="hidden lg:flex items-center gap-6">
                <a href="/#presets" className="text-white/70 hover:text-white transition text-sm">
                  Presets
                </a>
              </div>

              {/* Placeholder for wallet button */}
              <div className="w-32 h-10 bg-white/10 rounded-lg" />
            </div>
          </div>
        </nav>

        <main className="w-full">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
