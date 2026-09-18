'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AsyncErrorDisplay } from '../components/ErrorBoundary';
import { ChartSkeleton } from '../components/Skeletons';

// Mock data
const PRICE_HISTORY = [
  { time: 'Dec 3', price: 0.00015 },
  { time: 'Dec 4', price: 0.00018 },
  { time: 'Dec 5', price: 0.000145 },
  { time: 'Dec 6', price: 0.00017 },
  { time: 'Dec 7', price: 0.00016 },
  { time: 'Dec 8', price: 0.00019 },
  { time: 'Dec 9', price: 0.000185 },
  { time: 'Dec 10', price: 0.00021 },
];

const VOLUME_DATA = [
  { date: 'Dec 3-4', buy: 3500, sell: 1500 },
  { date: 'Dec 5-6', buy: 8000, sell: 2000 },
  { date: 'Dec 7-8', buy: 12000, sell: 3500 },
  { date: 'Dec 9-10', buy: 18000, sell: 5000 },
];

const FEE_DATA = [
  { date: 'Dec 3', fees: 45 },
  { date: 'Dec 5', fees: 120 },
  { date: 'Dec 7', fees: 180 },
  { date: 'Dec 9', fees: 280 },
  { date: 'Dec 11', fees: 420 },
];

const HOLDER_DISTRIBUTION = [
  { name: 'Whales (>1M)', value: 15, color: '#ec4899' },
  { name: 'Dolphins (100k-1M)', value: 25, color: '#f59e0b' },
  { name: 'Fish (10k-100k)', value: 35, color: '#3b82f6' },
  { name: 'Retail (<10k)', value: 25, color: '#10b981' },
];

interface PoolReview {
  id: string;
  reviewer: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

const POOL_REVIEWS: PoolReview[] = [
  {
    id: 'review-1',
    reviewer: 'alice_trader',
    rating: 5,
    text: 'Excellent pool, very active community! The tokenomics are well thought out and the team is responsive to questions.',
    date: '2 days ago',
    helpful: 23,
  },
  {
    id: 'review-2',
    reviewer: 'bob_solana',
    rating: 4,
    text: 'Good experience overall. Liquidity is solid. Would appreciate more frequent updates from the team.',
    date: '5 days ago',
    helpful: 12,
  },
  {
    id: 'review-3',
    reviewer: 'charlie_defi',
    rating: 5,
    text: 'Professional team, transparent communication, and great community. This is how token launches should be done!',
    date: '1 week ago',
    helpful: 45,
  },
];

interface PoolDetailPageProps {
  params: {
    id: string;
  };
}

const POOL_DETAILS: Record<string, any> = {
  'pool-1': {
    name: 'xStocks Finance',
    symbol: 'xSTK',
    preset: 'Stock Discovery',
    presetId: 'stock-discovery',
    launchDate: 'December 15, 2024',
    poolAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    creatorAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    creator: 'xStocks Inc',
    status: 'active',
    description: 'A tokenized representation of a curated basket of US tech stocks on Solana.',
    baseTokenPrice: 0.00012,
    priceChange24h: 3.5,
    liquidityUsd: 250000,
    volume24h: 45000,
    holders: 1234,
    curveProgress: 45,
    reviewCount: 3,
    avgRating: 4.7,
  },
};

export default function PoolDetailPage({ params }: PoolDetailPageProps) {
  const [chartError, setChartError] = useState<Error | null>(null);
  const [chartsLoading, setChartsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('helpful');
  const pool = POOL_DETAILS[params.id];

  const retryCharts = () => {
    setChartError(null);
  };

  const sortedReviews = [...POOL_REVIEWS].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (!pool) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/pools" className="text-violet-400 hover:text-violet-300 transition mb-8 inline-block text-sm sm:text-base">
          ← Back to Pools
        </Link>
        <div className="text-center py-12 rounded-lg border border-white/10 bg-white/[0.02]">
          <h1 className="text-2xl font-bold text-white mb-2">Pool Not Found</h1>
          <p className="text-white/60 mb-4">This pool doesn't exist or has been removed.</p>
          <Link
            href="/pools"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
          >
            View All Pools
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Navigation */}
      <div className="mb-8 flex items-center gap-4">
        <Link href="/pools" className="text-violet-400 hover:text-violet-300 transition text-sm sm:text-base">
          ← Back to Pools
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{pool.name}</h1>
            <p className="text-white/70 text-sm sm:text-base">Launched {pool.launchDate}</p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold text-white">${pool.baseTokenPrice.toFixed(8)}</div>
            <p className="text-sm font-medium text-emerald-400">+{pool.priceChange24h.toFixed(2)}% (24h)</p>
          </div>
        </div>
        <p className="text-white/70 max-w-2xl text-sm sm:text-base">{pool.description}</p>
      </div>

      {/* Quick Stats */}
      <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1">Liquidity</p>
          <p className="text-lg sm:text-2xl font-bold text-white">${(pool.liquidityUsd / 1000).toFixed(1)}k</p>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1">24h Volume</p>
          <p className="text-lg sm:text-2xl font-bold text-white">${(pool.volume24h / 1000).toFixed(1)}k</p>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1">Holders</p>
          <p className="text-lg sm:text-2xl font-bold text-white">{pool.holders.toLocaleString()}</p>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-white/60 text-xs sm:text-sm mb-1">Curve Progress</p>
          <p className="text-lg sm:text-2xl font-bold text-white">{pool.curveProgress}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-12 space-y-8">
        {/* Show error if charts fail */}
        <AsyncErrorDisplay error={chartError} onRetry={retryCharts} />

        {chartsLoading ? (
          <ChartSkeleton />
        ) : (
          <>
            {/* Price History Chart */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white mb-6">Price History</h2>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={PRICE_HISTORY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0b0b0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Volume Chart */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white mb-6">Trading Volume</h2>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={VOLUME_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0b0b0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
                    <Bar dataKey="buy" fill="#10b981" name="Buy Volume" />
                    <Bar dataKey="sell" fill="#ef4444" name="Sell Volume" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fee Accrual Chart */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white mb-6">Fee Accrual Over Time</h2>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={FEE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0b0b0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => `$${value}`}
                    />
                    <Area type="monotone" dataKey="fees" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Holder Distribution Chart */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white mb-6">Holder Distribution</h2>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <div className="flex-1 w-full min-w-0">
                  <div className="w-full overflow-x-auto">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={HOLDER_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {HOLDER_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0b0b0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                          formatter={(value) => `${value}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {HOLDER_DISTRIBUTION.map((dist) => (
                    <div key={dist.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded flex-shrink-0" style={{ backgroundColor: dist.color }} />
                      <span className="text-sm text-white/70">
                        {dist.name}: <strong>{dist.value}%</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Additional Info */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-lg font-semibold text-white">Pool Information</h3>
          <div className="space-y-2 text-xs sm:text-sm">
            <p>
              <strong className="text-white/70">Status:</strong> {pool.status}
            </p>
            <p>
              <strong className="text-white/70">Preset:</strong> {pool.preset}
            </p>
            <p className="break-all">
              <strong className="text-white/70">Address:</strong>{' '}
              <code className="text-violet-300 text-xs">{pool.poolAddress.slice(0, 10)}...{pool.poolAddress.slice(-10)}</code>
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-lg font-semibold text-white">Creator</h3>
          <div className="space-y-2 text-xs sm:text-sm">
            <p>
              <strong className="text-white/70">Name:</strong> {pool.creator}
            </p>
            <Link
              href={`/creators/${pool.creatorAddress}`}
              className="inline-block text-violet-400 hover:text-violet-300 font-medium transition text-xs sm:text-sm"
            >
              View Creator Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* Community Reviews Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Community Reviews</h2>
            <p className="text-white/60 text-sm mt-1">
              {pool.reviewCount} reviews • <span className="text-yellow-400">{pool.avgRating}</span> ⭐ average rating
            </p>
          </div>
          <button className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition text-sm min-h-[40px] whitespace-nowrap">
            Write Review
          </button>
        </div>

        {/* Sort Options */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'helpful', label: 'Most Helpful' },
            { id: 'rating', label: 'Highest Rated' },
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

        {/* Reviews List */}
        <div className="space-y-4 sm:space-y-6">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02]">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">@{review.reviewer}</p>
                    <p className="text-xs sm:text-sm text-white/50">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <span key={i} className="text-white/20 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-white/80 mb-4">{review.text}</p>

                {/* Helpful Button */}
                <button className="text-xs text-white/50 hover:text-white/70 transition flex items-center gap-1 font-medium">
                  👍 Helpful ({review.helpful})
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 rounded-lg border border-white/10 bg-white/[0.02]">
              <p className="text-white/60 text-sm sm:text-base">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 space-y-4">
        <h3 className="text-lg font-bold text-white">Want to Launch Your Own Pool?</h3>
        <Link
          href="/#presets"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
        >
          Browse Presets
        </Link>
      </div>

      <footer className="mt-16 border-t border-white/10 pt-6 text-xs sm:text-sm text-white/40 pb-8">
        <Link href="/pools" className="hover:text-white/60 transition">
          ← Back to pools
        </Link>
      </footer>
    </main>
  );
}
