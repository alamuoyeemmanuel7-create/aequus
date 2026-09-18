'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Creator {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  website?: string;
  twitter?: string;
  discord?: string;
  tokensLaunched: number;
  totalLiquidity: number;
  totalVolume: number;
  totalHolders: number;
  avgPerformance: number;
  joinedDate: string;
  verificationStatus: 'verified' | 'pending' | 'none';
}

interface CreatorToken {
  id: string;
  name: string;
  symbol: string;
  launchDate: string;
  status: 'active' | 'graduated' | 'completed';
  liquidityUsd: number;
  volume24h: number;
  holders: number;
  performance: number;
}

interface CreatorReview {
  id: string;
  reviewer: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

// Mock data
const CREATOR_DATA: Record<string, Creator> = {
  '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg': {
    address: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    name: 'xStocks Finance',
    bio: 'Tokenized equities on Solana. Building the future of democratic finance.',
    avatar: '🎯',
    website: 'https://xstocks.finance',
    twitter: 'https://twitter.com/xstocks',
    discord: 'https://discord.gg/xstocks',
    tokensLaunched: 12,
    totalLiquidity: 2_850_000,
    totalVolume: 15_200_000,
    totalHolders: 18_456,
    avgPerformance: 145,
    joinedDate: 'September 2024',
    verificationStatus: 'verified',
  },
};

const CREATOR_TOKENS: CreatorToken[] = [
  {
    id: 'pool-1',
    name: 'xStocks Finance',
    symbol: 'xSTK',
    launchDate: 'Dec 15, 2024',
    status: 'active',
    liquidityUsd: 250_000,
    volume24h: 45_000,
    holders: 1_234,
    performance: 180,
  },
  {
    id: 'pool-2',
    name: 'Tech Index',
    symbol: 'TCXI',
    launchDate: 'Dec 10, 2024',
    status: 'active',
    liquidityUsd: 420_000,
    volume24h: 89_000,
    holders: 5_678,
    performance: 125,
  },
  {
    id: 'pool-3',
    name: 'Growth Equities',
    symbol: 'GRTH',
    launchDate: 'Dec 5, 2024',
    status: 'graduated',
    liquidityUsd: 1_200_000,
    volume24h: 156_000,
    holders: 9_876,
    performance: 240,
  },
];

const CREATOR_REVIEWS: CreatorReview[] = [
  {
    id: 'review-1',
    reviewer: 'alice_solana',
    rating: 5,
    text: 'Excellent launch experience. Clear communication and professional team. Highly recommend!',
    date: 'Dec 10, 2024',
    helpful: 42,
  },
  {
    id: 'review-2',
    reviewer: 'bob_trader',
    rating: 4,
    text: 'Good tokenomics, solid project. Would appreciate more frequent updates.',
    date: 'Dec 8, 2024',
    helpful: 28,
  },
  {
    id: 'review-3',
    reviewer: 'charlie_defi',
    rating: 5,
    text: 'Professional team, transparent roadmap, and great community. Perfect execution!',
    date: 'Dec 5, 2024',
    helpful: 35,
  },
];

interface CreatorProfilePageProps {
  params: {
    address: string;
  };
}

export default function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const creator = CREATOR_DATA[params.address];
  const [sortBy, setSortBy] = useState('liquidity');

  if (!creator) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/pools" className="text-violet-400 hover:text-violet-300 transition text-sm sm:text-base">
          ← Back to Pools
        </Link>
        <div className="text-center py-20 rounded-lg border border-white/10 bg-white/[0.02] space-y-4">
          <h1 className="text-2xl font-bold text-white">Creator Not Found</h1>
          <p className="text-white/60">This creator profile doesn't exist.</p>
        </div>
      </main>
    );
  }

  const avgRating = (CREATOR_REVIEWS.reduce((acc, r) => acc + r.rating, 0) / CREATOR_REVIEWS.length).toFixed(1);

  const sortedTokens = [...CREATOR_TOKENS].sort((a, b) => {
    switch (sortBy) {
      case 'liquidity':
        return b.liquidityUsd - a.liquidityUsd;
      case 'holders':
        return b.holders - a.holders;
      case 'performance':
        return b.performance - a.performance;
      case 'recent':
      default:
        return 0;
    }
  });

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Navigation */}
      <Link href="/pools" className="text-violet-400 hover:text-violet-300 transition text-sm sm:text-base mb-8 inline-block">
        ← Back to Pools
      </Link>

      {/* Header */}
      <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl sm:text-5xl flex-shrink-0">
            {creator.avatar}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-4xl font-bold text-white">{creator.name}</h1>
              {creator.verificationStatus === 'verified' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0" title="Verified">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-white/70 mb-3 max-w-md text-sm sm:text-base">{creator.bio}</p>
            <p className="text-xs sm:text-sm text-white/50 mb-4">Joined {creator.joinedDate}</p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {creator.website && (
                <a
                  href={creator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                >
                  🌐 Website
                </a>
              )}
              {creator.twitter && (
                <a
                  href={creator.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                >
                  𝕏 Twitter
                </a>
              )}
              {creator.discord && (
                <a
                  href={creator.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                >
                  💬 Discord
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4 sm:text-right">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{creator.tokensLaunched}</p>
            <p className="text-xs sm:text-sm text-white/60">Tokens Launched</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">
              ${(creator.totalLiquidity / 1_000_000).toFixed(1)}M
            </p>
            <p className="text-xs sm:text-sm text-white/60">Total Liquidity</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="mb-8 sm:mb-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">24h Volume</p>
          <p className="text-xl sm:text-2xl font-bold text-violet-400">
            ${(creator.totalVolume / 1_000_000).toFixed(1)}M
          </p>
        </div>
        <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Total Holders</p>
          <p className="text-xl sm:text-2xl font-bold text-pink-400">
            {(creator.totalHolders / 1000).toFixed(1)}k
          </p>
        </div>
        <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Avg Performance</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400">+{creator.avgPerformance}%</p>
        </div>
        <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Community Rating</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-400">{avgRating}/5 ⭐</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Created Pools</h2>

        {/* Sort */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'recent', label: 'Recent' },
            { id: 'liquidity', label: 'Highest Liquidity' },
            { id: 'holders', label: 'Most Holders' },
            { id: 'performance', label: 'Best Performance' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                sortBy === option.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Tokens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sortedTokens.map((token) => (
            <Link key={token.id} href={`/pools/${token.id}`}>
              <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition space-y-3 sm:space-y-4 h-full cursor-pointer">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">{token.name}</h3>
                    <p className="text-xs sm:text-sm text-white/60">${token.symbol}</p>
                  </div>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                      token.status === 'active'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : token.status === 'graduated'
                          ? 'bg-blue-500/15 text-blue-300'
                          : 'bg-gray-500/15 text-gray-300'
                    }`}
                  >
                    {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                  </span>
                </div>

                {/* Performance */}
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">+{token.performance}%</div>
                  <p className="text-xs sm:text-sm text-white/60">Performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Liquidity</p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-white">
                      ${(token.liquidityUsd / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">24h Vol</p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-white">
                      ${(token.volume24h / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Holders</p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-white">
                      {(token.holders / 1000).toFixed(1)}k
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 pt-2">
                  View Pool
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Reviews */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Community Reviews</h2>

        <div className="space-y-4 sm:space-y-6">
          {CREATOR_REVIEWS.map((review) => (
            <div key={review.id} className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02]">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">@{review.reviewer}</p>
                  <p className="text-xs sm:text-sm text-white/50">{review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <span key={i} className="text-white/20">★</span>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-white/80 mb-4">{review.text}</p>

              {/* Helpful */}
              <button className="text-xs text-white/50 hover:text-white/70 transition flex items-center gap-1">
                👍 Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>

        {/* Write Review CTA */}
        <div className="mt-8 p-6 rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10">
          <h3 className="font-bold text-white mb-2">Share Your Experience</h3>
          <p className="text-sm text-white/70 mb-4">Help other traders by leaving a review of this creator's tokens.</p>
          <button className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition text-sm min-h-[40px]">
            Write Review
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-6 text-xs sm:text-sm text-white/40 pb-8">
        <Link href="/pools" className="hover:text-white/60 transition">
          ← Back to Pools
        </Link>
      </footer>
    </main>
  );
}
