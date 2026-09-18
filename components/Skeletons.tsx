'use client';

/**
 * Reusable skeleton/loading components
 * Use these to show loading states while data is being fetched
 */

export function StatCardSkeleton() {
  return (
    <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.02] animate-pulse">
      <div className="h-3 bg-white/10 rounded w-24 mb-3" />
      <div className="h-8 bg-white/10 rounded w-32" />
    </div>
  );
}

export function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TokenCardSkeleton() {
  return (
    <div className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.03] animate-pulse space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="h-5 bg-white/10 rounded w-32 mb-2" />
          <div className="h-3 bg-white/10 rounded w-16" />
        </div>
        <div className="h-6 bg-white/10 rounded w-20 flex-shrink-0" />
      </div>

      {/* Price */}
      <div className="h-7 bg-white/10 rounded w-40" />

      {/* Progress bar */}
      <div>
        <div className="h-3 bg-white/10 rounded w-full mb-2" />
        <div className="h-2 bg-white/10 rounded-full w-full" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="h-2 bg-white/10 rounded w-16 mb-1" />
            <div className="h-4 bg-white/10 rounded w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TokenCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PoolCardSkeleton() {
  return (
    <div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.03] animate-pulse space-y-2 sm:space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="h-4 bg-white/10 rounded w-28 mb-1" />
          <div className="h-3 bg-white/10 rounded w-16" />
        </div>
        <div className="h-5 bg-white/10 rounded w-16 flex-shrink-0" />
      </div>

      {/* Price */}
      <div className="h-6 bg-white/10 rounded w-32" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="h-2 bg-white/10 rounded w-14 mb-1" />
            <div className="h-3 bg-white/10 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PoolGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PoolCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] animate-pulse">
      <div className="h-5 bg-white/10 rounded w-32 mb-6" />
      <div className="w-full h-64 bg-white/10 rounded" />
    </div>
  );
}

export function ChartGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <ChartSkeleton key={i} />
      ))}
    </div>
  );
}

export function PoolDetailHeaderSkeleton() {
  return (
    <div className="mb-8 space-y-4 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-4 bg-white/10 rounded w-20" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="h-8 bg-white/10 rounded w-48 mb-2" />
          <div className="h-4 bg-white/10 rounded w-32" />
        </div>
        <div className="text-right">
          <div className="h-8 bg-white/10 rounded w-32 mb-2" />
          <div className="h-4 bg-white/10 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function SearchInputSkeleton() {
  return (
    <div className="mb-8 relative">
      <div className="w-full h-10 rounded-lg border border-white/10 bg-white/10 animate-pulse" />
    </div>
  );
}

export function FilterButtonsSkeleton() {
  return (
    <div className="mb-8 space-y-3 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-40 mb-3" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 bg-white/10 rounded-lg w-24" />
        ))}
      </div>
    </div>
  );
}

export function TransactionButtomSkeleton() {
  return (
    <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 animate-pulse min-h-[40px]">
      <div className="h-4 bg-white/20 rounded w-24" />
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <PoolDetailHeaderSkeleton />
      <StatGridSkeleton count={4} />
      <ChartGridSkeleton count={4} />
    </div>
  );
}
