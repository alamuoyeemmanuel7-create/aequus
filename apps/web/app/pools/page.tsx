'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PoolCard } from '../../components/PoolCard';
import { PoolGridSkeleton, SearchInputSkeleton, FilterButtonsSkeleton } from '../../components/Skeletons';

// Mock pool data
const MOCK_POOLS = [
  {
    id: 'pool-1',
    name: 'xStocks Finance',
    symbol: 'xSTK',
    preset: 'stock-discovery',
    presetLabel: 'Stock Discovery',
    launchDate: 'Dec 15, 2024',
    poolAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    baseTokenPrice: 0.00012,
    liquidityUsd: 250000,
    volume24h: 45000,
    holders: 1234,
    status: 'active' as const,
  },
  {
    id: 'pool-2',
    name: 'RealEstateDAO',
    symbol: 'REAI',
    preset: 'rwa-steady',
    presetLabel: 'RWA Steady',
    launchDate: 'Dec 12, 2024',
    poolAddress: '8yNLkUq9C9yjazLZQsxHp4G4GkLFZbLvFhKwFGGFdDh',
    baseTokenPrice: 0.98,
    liquidityUsd: 180000,
    volume24h: 12000,
    holders: 456,
    status: 'active' as const,
  },
  {
    id: 'pool-3',
    name: 'SpeedRun Capital',
    symbol: 'SPRD',
    preset: 'icm-fast',
    presetLabel: 'ICM Fast',
    launchDate: 'Dec 10, 2024',
    poolAddress: '9zOmlVr0D0zkbaMMQrxIq5H5HlMGacMwGiLxGHHGeEi',
    baseTokenPrice: 0.0089,
    liquidityUsd: 420000,
    volume24h: 250000,
    holders: 5678,
    status: 'graduated' as const,
  },
  {
    id: 'pool-4',
    name: 'Pepe Reborn',
    symbol: 'PREB',
    preset: 'meme-classic',
    presetLabel: 'Meme Classic',
    launchDate: 'Dec 8, 2024',
    poolAddress: '3aPnmWs1E1alccNRTyJJr6I6InNHbdNxHjMyHIIHeIj',
    baseTokenPrice: 0.000000042,
    liquidityUsd: 85000,
    volume24h: 125000,
    holders: 9432,
    status: 'active' as const,
  },
  {
    id: 'pool-5',
    name: 'Treasury Bill Yield',
    symbol: 'TBY',
    preset: 'rwa-steady',
    presetLabel: 'RWA Steady',
    launchDate: 'Dec 5, 2024',
    poolAddress: '4bQoNxt2F2bmddOSUsyKr7J7JoNHceOyIkMzIJJJfFj',
    baseTokenPrice: 0.99,
    liquidityUsd: 520000,
    volume24h: 8000,
    holders: 234,
    status: 'active' as const,
  },
  {
    id: 'pool-6',
    name: 'Tech Stock Index',
    symbol: 'TCXI',
    preset: 'stock-discovery',
    presetLabel: 'Stock Discovery',
    launchDate: 'Dec 3, 2024',
    poolAddress: '5cRpOyuu3G3cneePS9Vvt8Wxy9Za0Bcd1Efg2Hij3Klm4Nop',
    baseTokenPrice: 0.00034,
    liquidityUsd: 180000,
    volume24h: 32000,
    holders: 678,
    status: 'graduated' as const,
  },
];

const PRESET_FILTERS = [
  { id: 'all', label: 'All Presets' },
  { id: 'stock-discovery', label: 'Stock Discovery' },
  { id: 'rwa-steady', label: 'RWA Steady' },
  { id: 'icm-fast', label: 'ICM Fast' },
  { id: 'meme-classic', label: 'Meme Classic' },
];

const STATUS_FILTERS = [
  { id: 'all', label: 'All Status' },
  { id: 'active', label: 'Active Bonding' },
  { id: 'graduated', label: 'Graduated' },
  { id: 'completed', label: 'Completed' },
];

const LIQUIDITY_RANGES = [
  { id: 'all', label: 'All Liquidity', min: 0, max: Infinity },
  { id: '0-100k', label: '$0 - $100k', min: 0, max: 100000 },
  { id: '100k-500k', label: '$100k - $500k', min: 100000, max: 500000 },
  { id: '500k-plus', label: '$500k+', min: 500000, max: Infinity },
];

const SORT_OPTIONS = [
  { id: 'latest', label: 'Latest Launched' },
  { id: 'liquidity', label: 'Highest Liquidity' },
  { id: 'volume', label: 'Highest Volume' },
  { id: 'holders', label: 'Most Holders' },
  { id: 'price', label: 'Price (High to Low)' },
];

export default function PoolsPage() {
  const [presetFilter, setPresetFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [liquidityFilter, setLiquidityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoadingPools, setIsLoadingPools] = useState(false);

  const filteredAndSortedPools = useMemo(() => {
    let result = MOCK_POOLS.filter((pool) => {
      // Preset filter
      if (presetFilter !== 'all' && pool.preset !== presetFilter) return false;
      // Status filter
      if (statusFilter !== 'all' && pool.status !== statusFilter) return false;
      // Liquidity filter
      const liquidityRange = LIQUIDITY_RANGES.find((r) => r.id === liquidityFilter);
      if (liquidityRange && (pool.liquidityUsd < liquidityRange.min || pool.liquidityUsd > liquidityRange.max)) {
        return false;
      }
      // Search filter
      if (
        searchTerm &&
        !pool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pool.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'liquidity':
          return b.liquidityUsd - a.liquidityUsd;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'holders':
          return b.holders - a.holders;
        case 'price':
          return b.baseTokenPrice - a.baseTokenPrice;
        case 'latest':
        default:
          return 0;
      }
    });

    return result;
  }, [presetFilter, statusFilter, liquidityFilter, searchTerm, sortBy]);

  const hasActiveFilters = presetFilter !== 'all' || statusFilter !== 'all' || liquidityFilter !== 'all' || searchTerm;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 sm:mb-10 space-y-3 sm:space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Link href="/" className="text-violet-400 hover:text-violet-300 transition text-sm sm:text-base">
            ← Back
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold">Launched Pools</h1>
        </div>
        <p className="text-white/70 max-w-2xl text-sm sm:text-base">
          Explore pools launched using Aequus presets. Track their progress from bonding curve through migration to DAMM v2.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-white/40 focus:border-violet-500 focus:outline-none transition text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
        {/* Main Filters */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-semibold text-white/70">Filter by Preset</label>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-violet-400 hover:text-violet-300 transition"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setPresetFilter(filter.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                  presetFilter === filter.id ? 'bg-violet-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2 sm:space-y-3">
          <label className="text-xs sm:text-sm font-semibold text-white/70">Filter by Status</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                  statusFilter === filter.id ? 'bg-violet-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.02]">
            {/* Liquidity Range */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-semibold text-white/70">Liquidity Range</label>
              <div className="flex flex-wrap gap-2">
                {LIQUIDITY_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setLiquidityFilter(range.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                      liquidityFilter === range.id ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-semibold text-white/70">Sort By</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                      sortBy === option.id ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-white/80">
            {isLoadingPools ? (
              <span className="inline-flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
                Loading pools...
              </span>
            ) : (
              `${filteredAndSortedPools.length} ${filteredAndSortedPools.length === 1 ? 'Pool' : 'Pools'} Found`
            )}
          </h2>
          {hasActiveFilters && !isLoadingPools && (
            <button
              onClick={() => {
                setPresetFilter('all');
                setStatusFilter('all');
                setLiquidityFilter('all');
                setSearchTerm('');
                setSortBy('latest');
              }}
              className="text-xs sm:text-sm text-violet-400 hover:text-violet-300 transition text-left sm:text-right"
            >
              Clear filters
            </button>
          )}
        </div>

        {isLoadingPools ? (
          <PoolGridSkeleton count={6} />
        ) : filteredAndSortedPools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredAndSortedPools.map((pool) => (
              <PoolCard key={pool.id} {...pool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-lg border border-white/10 bg-white/[0.02]">
            <p className="text-white/60 mb-4 text-sm sm:text-base">No pools found matching your filters.</p>
            <button
              onClick={() => {
                setPresetFilter('all');
                setStatusFilter('all');
                setLiquidityFilter('all');
                setSearchTerm('');
                setSortBy('latest');
              }}
              className="text-violet-400 hover:text-violet-300 text-xs sm:text-sm font-medium transition"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg bg-white/[0.02] border border-white/10">
        <div className="text-center">
          <div className="text-xl sm:text-3xl font-bold text-emerald-400">{MOCK_POOLS.length}</div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Total Pools</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-3xl font-bold text-blue-400">
            {MOCK_POOLS.filter((p) => p.status === 'active').length}
          </div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Active</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-3xl font-bold text-violet-400">
            ${(MOCK_POOLS.reduce((acc, p) => acc + p.liquidityUsd, 0) / 1_000_000).toFixed(2)}M
          </div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Total Liquidity</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-3xl font-bold text-pink-400">
            {MOCK_POOLS.reduce((acc, p) => acc + p.holders, 0).toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-white/60 mt-1">Total Holders</div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white">Ready to Launch?</h3>
        <p className="text-sm sm:text-base text-white/80">Choose a preset and launch your token:</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/#presets"
            className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition text-sm sm:text-base min-h-[40px]"
          >
            Browse Presets
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition text-sm sm:text-base min-h-[40px]"
          >
            Compare All
          </Link>
        </div>
      </div>

      <footer className="mt-12 sm:mt-16 border-t border-white/10 pt-6 text-xs sm:text-sm text-white/40 pb-8">
        <Link href="/" className="hover:text-white/60 transition">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
