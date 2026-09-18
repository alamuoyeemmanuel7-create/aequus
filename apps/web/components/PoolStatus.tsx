'use client';

/**
 * Polls the real DBC pool state — curve progress and accrued fees — via the
 * SDK's read helpers. This is what turns the pre-launch simulation on the
 * preset detail page into a live view once a pool actually exists.
 */

import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { DynamicBondingCurveClient } from '@meteora-ag/dynamic-bonding-curve-sdk';
import { getConnection } from '../lib/dbc';

interface Status {
  quoteProgress: number;
  baseProgress: number;
  totalTradingQuoteFee: string;
}

export function PoolStatus({ poolAddress }: { poolAddress: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const connection = getConnection();
    const client = DynamicBondingCurveClient.create(connection, 'confirmed');
    const pool = new PublicKey(poolAddress);

    async function poll() {
      try {
        const [quoteProgress, baseProgress, feeMetrics] = await Promise.all([
          client.state.getPoolQuoteTokenCurveProgress(pool),
          client.state.getPoolBaseTokenCurveProgress(pool),
          client.state.getPoolFeeMetrics(pool),
        ]);
        if (cancelled) return;
        setStatus({
          quoteProgress: Number(quoteProgress),
          baseProgress: Number(baseProgress),
          totalTradingQuoteFee: feeMetrics.total.totalTradingQuoteFee.toString(),
        });
        setError(null);
      } catch (e: any) {
        if (!cancelled) setError('Pool not confirmed yet — retrying…');
      }
    }

    poll();
    const id = setInterval(poll, 8_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [poolAddress]);

  if (error && !status) {
    return <p className="text-sm text-white/40">{error}</p>;
  }
  if (!status) {
    return <p className="text-sm text-white/40">Loading live curve progress…</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-white/40">Quote curve progress</p>
        <p className="font-medium text-emerald-300">{(status.quoteProgress * 100).toFixed(2)}%</p>
      </div>
      <div>
        <p className="text-white/40">Base curve progress</p>
        <p className="font-medium text-emerald-300">{(status.baseProgress * 100).toFixed(2)}%</p>
      </div>
      <div>
        <p className="text-white/40">Total trading fees (quote)</p>
        <p className="font-medium text-emerald-300">{status.totalTradingQuoteFee}</p>
      </div>
    </div>
  );
}
