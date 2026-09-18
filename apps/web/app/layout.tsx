import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '../components/WalletProvider';
import { Navigation } from '../components/Navigation';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Aequus — DBC Curve Preset Marketplace',
  description: 'Curve and fee presets for tokenized equities, RWAs, ICM launches and memes, built on Meteora DBC + DAMM v2.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0f] text-white antialiased">
        <WalletProvider>
          <ErrorBoundary>
            <Navigation />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">{children}</div>
          </ErrorBoundary>
        </WalletProvider>
      </body>
    </html>
  );
}
