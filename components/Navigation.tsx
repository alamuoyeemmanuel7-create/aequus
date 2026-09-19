'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const WalletMultiButtonWrapper = dynamic(() => import('./WalletButtonWrapper').then(mod => ({ default: mod.WalletMultiButtonWrapper })), {
  ssr: false,
  loading: () => <div className="w-10 h-10 sm:w-12 sm:h-12" />,
});

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0b0b0f]/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-base sm:text-lg font-bold text-white hover:text-violet-400 transition flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">Ⓐ</span>
            </div>
            <span className="hidden sm:inline">Aequus</span>
          </Link>

          {/* Center - Presets link */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/#presets" className="text-white/70 hover:text-white transition text-sm">
              Presets
            </Link>
          </div>

          {/* Wallet Button */}
          <div className="flex-shrink-0">
            <WalletMultiButtonWrapper />
          </div>
        </div>
      </div>
    </nav>
  );
}
