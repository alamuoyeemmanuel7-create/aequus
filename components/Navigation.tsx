'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButtonWrapper } from './WalletButtonWrapper';

export function Navigation() {
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only render wallet-dependent content after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: '/#presets', label: 'Presets' },
  ];

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

          {/* Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/70 hover:text-white transition text-sm">
                {link.label}
              </Link>
            ))}
            {isMounted && connected && (
              <Link href="/dashboard" className="text-white/70 hover:text-white transition text-sm font-medium">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {isMounted && connected && (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition min-h-[40px]"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            <WalletMultiButtonWrapper />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            {isMounted && connected && (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                title="Dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </Link>
            )}
            <div className="md:hidden">
              <WalletMultiButtonWrapper />
            </div>
          </div>
        </div>

        {/* Mobile Menu - Links */}
        <div className="lg:hidden mt-3 pb-3 border-t border-white/5 pt-3 flex flex-wrap gap-4 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/70 hover:text-white transition">
              {link.label}
            </Link>
          ))}
          {isMounted && connected && (
            <Link href="/dashboard" className="text-violet-400 hover:text-violet-300 transition font-medium">
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
