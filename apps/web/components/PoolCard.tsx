'use client';

import Link from 'next/link';

interface PoolCardProps {
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
  status: 'active' | 'graduated' | 'completed';
}

const STATUS_CONFIG = {
  active: { color: 'emerald', label: 'Active Bonding' },
  graduated: { color: 'blue', label: 'Graduated to DAMM' },
  completed: { color: 'gray', label: 'Completed' },
};

const PRESET_COLORS: Record<string, string> = {
  'stock-discovery': 'violet',
  'rwa-steady': 'blue',
  'icm-fast': 'purple',
  'meme-classic': 'pink',
};

export function PoolCard({ 
  id, 
  name, 
  symbol, 
  preset, 
  presetLabel,
  launchDate, 
  poolAddress, 
  baseTokenPrice, 
  liquidityUsd, 
  volume24h, 
  holders,
  status 
}: PoolCardProps) {
  const statusConfig = STATUS_CONFIG[status];
  const presetColor = PRESET_COLORS[preset] || 'gray';

  return (
    <Link href={`/pools/${id}`}>
      <div className="p-5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition cursor-pointer h-full flex flex-col space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-sm text-white/60">${symbol}</p>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium bg-${presetColor}-500/15 text-${presetColor}-300`}>
              {presetLabel}
            </div>
          </div>
          <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-${statusConfig.color}-500/15 text-${statusConfig.color}-300`}>
            {statusConfig.label}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-white/50 text-xs mb-1">Price</p>
            <p className="font-mono font-semibold text-white">
              ${baseTokenPrice.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-1">Liquidity</p>
            <p className="font-mono font-semibold text-white">
              ${(liquidityUsd / 1000).toFixed(1)}k
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-1">24h Volume</p>
            <p className="font-mono font-semibold text-white">
              ${(volume24h / 1000).toFixed(1)}k
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-1">Holders</p>
            <p className="font-mono font-semibold text-white">
              {holders.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Footer */}
        <div className="space-y-2 text-xs text-white/60">
          <p>Launched: {launchDate}</p>
          <p className="font-mono text-white/40 truncate">
            {poolAddress.slice(0, 8)}...{poolAddress.slice(-8)}
          </p>
        </div>

        {/* CTA */}
        <div className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1">
          View Details
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
