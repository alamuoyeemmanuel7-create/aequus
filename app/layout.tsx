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
        <nav className="border-b border-white/10 bg-[#0b0b0f]">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <a href="/" className="font-bold text-white">
              Aequus
            </a>
          </div>
        </nav>
        <div className="mx-auto max-w-5xl px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
