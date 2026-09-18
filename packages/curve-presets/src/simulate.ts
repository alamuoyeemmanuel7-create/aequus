/**
 * Pure-math simulation of a DBC curve preset for charting purposes.
 *
 * This intentionally does NOT import the DBC SDK — it's a lightweight,
 * dependency-free model of the same numbers used to build the real config,
 * so the frontend can render an instant preview chart before a wallet is
 * even connected. It approximates DBC's segmented constant-product curve
 * (checkpoints + liquidity weights) closely enough for a preview; the
 * authoritative numbers always come from the on-chain pool + SDK quote
 * helpers once a pool exists (see lib/dbc.ts in apps/web for the real quote).
 */

import type { CurveSimInput } from './types';

export interface PricePoint {
  progress: number; // 0..1 fraction of curve consumed
  price: number; // quote per base at this point
  cumulativeBaseSold: number;
}

export interface FeePoint {
  x: number; // seconds elapsed (scheduler modes) or buy size in quote units (rate limiter)
  feeBps: number;
}

/** Interpolated price curve across N checkpoints. */
export function simulatePriceCurve(input: CurveSimInput, steps = 200): PricePoint[] {
  const { sqrtPriceCheckpoints, liquidityWeights, totalTokenSupply } = input;
  const segments = sqrtPriceCheckpoints.length - 1;
  const weightSum = liquidityWeights.reduce((a, b) => a + b, 0);

  const points: PricePoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const segmentFloat = progress * segments;
    const segIndex = Math.min(Math.floor(segmentFloat), segments - 1);
    const segFrac = segmentFloat - segIndex;

    const p0 = sqrtPriceCheckpoints[segIndex];
    const p1 = sqrtPriceCheckpoints[segIndex + 1];
    // Weight biases how quickly price moves within a segment — heavier
    // weight (more liquidity) means price moves more slowly for the same
    // amount of base token sold, which is why "Stock Discovery" front-loads
    // weight on its early segments.
    const w = liquidityWeights[segIndex] ?? 1;
    const easedFrac = Math.pow(segFrac, weightSum / (w * liquidityWeights.length));
    const price = p0 + (p1 - p0) * easedFrac;

    points.push({
      progress,
      price,
      cumulativeBaseSold: progress * totalTokenSupply,
    });
  }
  return points;
}

/** Fee-over-progress for scheduler modes, or fee-over-buy-size for rate limiter. */
export function simulateFeeCurve(input: CurveSimInput, steps = 100): FeePoint[] {
  const { baseFee } = input;
  const points: FeePoint[] = [];

  if (baseFee.mode === 'rate-limiter') {
    const {
      cliffFeeBps = 0,
      referenceAmount = 1,
      feeIncrementBps = 0,
    } = baseFee;
    // model fee as a function of buy size in units of referenceAmount ("brackets")
    const maxBrackets = 10;
    for (let i = 0; i <= steps; i++) {
      const brackets = (i / steps) * maxBrackets;
      const buySize = brackets * referenceAmount;
      const feeBps = cliffFeeBps + Math.floor(brackets) * feeIncrementBps;
      points.push({ x: buySize, feeBps });
    }
    return points;
  }

  const {
    startingFeeBps = 0,
    endingFeeBps = 0,
    totalDurationSeconds = 1,
  } = baseFee;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * totalDurationSeconds;
    const frac = totalDurationSeconds === 0 ? 1 : t / totalDurationSeconds;
    const feeBps =
      baseFee.mode === 'exponential'
        ? startingFeeBps * Math.pow(endingFeeBps / Math.max(startingFeeBps, 1), frac)
        : startingFeeBps + (endingFeeBps - startingFeeBps) * frac;
    points.push({ x: t, feeBps });
  }
  return points;
}
