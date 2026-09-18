'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { AsyncErrorDisplay } from '../components/ErrorBoundary';
import { StatGridSkeleton, TokenGridSkeleton } from '../components/Skeletons';

interface UserToken {
  id: string;
  name: string;
  symbol: string;
  preset: string;
  presetLabel: string;
  launchDate: string;
  poolAddress: string;
  baseTokenPrice: number;
  liquidityUsd: number;
  volume24h: number;
  holders: number;
  curveProgress: number;
}

// Mock user tokens - in production, fetch from indexer
const MOCK_USER_TOKENS: Record<string, UserToken[]> = {
  'default': [
    {
      id: 'token-1',
      name: 'My Stock Token',
      symbol: 'MST',
      preset: 'stock-discovery',
      presetLabel: 'Stock Discovery',
      launchDate: 'Dec 15, 2024',
      poolAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
      baseTokenPrice: 0.00015,
      liquidityUsd: 125000,
      volume24h: 22500,
      holders: 567,
      curveProgress: 45,
    },
    {
      id: 'token-2',
      name: 'RWA Yield Token',
      symbol: 'RWAI',
      preset: 'rwa-steady',
      presetLabel: 'RWA Steady',
      launchDate: 'Dec 10, 2024',
      poolAddress: '8yNLkUq9C9yjazLZQsxHp4G4GkLFZbLvFhKwFGGFdDh',
      baseTokenPrice: 0.99,
      liquidityUsd: 95000,
      volume24h: 5000,
      holders: 234,
      curveProgress: 78,
    },
  ],
};

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const [userTokens, setUserTokens] = useState<UserToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (connected && publicKey) {
          setUserTokens(MOCK_USER_TOKENS['default']);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load tokens'));
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [connected, publicKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Trigger useEffect again
    setTimeout(() => {
      try {
        if (connected && publicKey) {
          setUserTokens(MOCK_USER_TOKENS['default']);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load tokens'));
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  if (!connected) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Link href="/" className="text-violet-400 hover:text-violet-300 transition text-sm sm:text-base">
            ← Back
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold">Dashboard</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-16 sm:py-20 rounded-lg border border-white/10 bg-white/[0.02] space-y-4 px-4">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Connect Your Wallet</h2>
          <p className="text-sm sm:text-base text-white/60 max-w-md text-center">
            Connect your Solana wallet to view your launched tokens and track performance.
          </p>
          <p className="text-xs sm:text-sm text-white/40 text-center">
            Use the Connect Wallet button at the top of the page to get started.
          </p>
        </div>

        <footer className="mt-12 sm:mt-16 border-t border-white/10 pt-6 text-xs sm:text-sm text-white/40 pb-8">
          <Link href="/" className="hover:text-white/60 transition">
            ← Back to home
          </Link>
        </footer>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <Link href="/" className="text-violet-400 hover:text-violet-300 transition text-sm sm:text-base">
            ← Back
          </Link>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">Your Dashboard</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">Track your launched tokens and performance</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {loading ? (
        <StatGridSkeleton count={4} />
      ) : (
        <div className="mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Tokens Launched</p>
            <p className="text-2xl sm:text-3xl font-bold text-violet-400">{userTokens.length}</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Total Liquidity</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
              ${(userTokens.reduce((acc, t) => acc + t.liquidityUsd, 0) / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">24h Volume</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">
              ${(userTokens.reduce((acc, t) => acc + t.volume24h, 0) / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Total Holders</p>
            <p className="text-2xl sm:text-3xl font-bold text-pink-400">
              {userTokens.reduce((acc, t) => acc + t.holders, 0).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Launch New Token CTA */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">Ready to Launch Another Token?</h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1">Choose a preset and launch your next project</p>
        </div>
        <Link
          href="/#presets"
          className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition text-sm sm:text-base min-h-[40px] whitespace-nowrap"
        >
          Launch Token
        </Link>
      </div>

      {/* Your Tokens */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Your Launched Tokens</h2>

        {/* Error display */}
        <AsyncErrorDisplay error={error} isLoading={loading} onRetry={handleRetry} />

        {loading ? (
          <TokenGridSkeleton count={2} />
        ) : userTokens.length === 0 ? (
          <div className="text-center py-12 rounded-lg border border-white/10 bg-white/[0.02] px-4">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v6m3-3H9m-9 0a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            <p className="text-white/60 mb-4 text-sm sm:text-base">You haven't launched any tokens yet</p>
            <Link
              href="/#presets"
              className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition text-xs sm:text-sm min-h-[40px]"
            >
              Launch Your First Token
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {userTokens.map((token) => (
              <Link key={token.id} href={`/pools/${token.id}`}>
                <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition space-y-3 sm:space-y-4 h-full cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">{token.name}</h3>
                      <p className="text-xs sm:text-sm text-white/60">${token.symbol}</p>
                    </div>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 whitespace-nowrap flex-shrink-0">
                      {token.presetLabel}
                    </span>
                  </div>

                  {/* Price & Change */}
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl font-bold text-white font-mono">${token.baseTokenPrice.toFixed(8)}</div>
                    <div className="text-xs sm:text-sm text-emerald-400">+12.5% (7d)</div>
                  </div>

                  {/* Curve Progress */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="text-white/60">Curve Progress</span>
                      <span className="text-white font-mono">{token.curveProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${token.curveProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-white/5">
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Liquidity</p>
                      <p className="text-xs sm:text-sm font-mono font-semibold text-white">
                        ${(token.liquidityUsd / 1000).toFixed(1)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">24h Volume</p>
                      <p className="text-xs sm:text-sm font-mono font-semibold text-white">
                        ${(token.volume24h / 1000).toFixed(1)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Holders</p>
                      <p className="text-xs sm:text-sm font-mono font-semibold text-white">
                        {token.holders.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Launched</p>
                      <p className="text-xs sm:text-sm font-mono font-semibold text-white">{token.launchDate}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 pt-1 sm:pt-2">
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 border-t border-white/10 pt-6 text-xs sm:text-sm text-white/40 space-y-2 pb-8">
        <p>Dashboard data refreshes automatically every 30 seconds</p>
        <Link href="/" className="hover:text-white/60 transition inline-block">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
