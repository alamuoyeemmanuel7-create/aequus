/**
 * Internal curve preset types and utilities for Aequus
 * (Standalone version to avoid workspace dependency issues in deployment)
 */

export type AssetClass =
  | 'tokenized-equity'
  | 'rwa'
  | 'icm'
  | 'meme'
  | 'custom';

export interface PresetMeta {
  id: string;
  name: string;
  tagline: string;
  assetClass: AssetClass;
  description: string;
  rationale: string[];
  premium: boolean;
  priceSol?: number;
}

export interface CurveSimInput {
  sqrtPriceCheckpoints: number[];
  liquidityWeights: number[];
  totalTokenSupply: number;
  baseFee: {
    mode: 'linear' | 'exponential' | 'rate-limiter';
    startingFeeBps?: number;
    endingFeeBps?: number;
    numberOfPeriod?: number;
    totalDurationSeconds?: number;
    cliffFeeBps?: number;
    referenceAmount?: number;
    feeIncrementBps?: number;
    maxLimiterDurationSeconds?: number;
  };
  migrationFeeBps: number;
  migratedPoolFeeBps: number;
}

export interface Preset {
  meta: PresetMeta;
  sim: CurveSimInput;
}

// Mock simulation functions
export function simulatePriceCurve(sim: CurveSimInput) {
  const points = [];
  for (let i = 0; i <= 100; i++) {
    points.push({
      progress: i / 100,
      price: sim.sqrtPriceCheckpoints[0] * (1 + (i / 100) * 0.5),
    });
  }
  return points;
}

export function simulateFeeCurve(sim: CurveSimInput) {
  const points = [];
  const maxFee = sim.baseFee.startingFeeBps || 100;
  
  for (let i = 0; i <= 100; i++) {
    if (sim.baseFee.mode === 'linear') {
      points.push({
        x: i,
        feeBps: maxFee * (i / 100),
      });
    } else if (sim.baseFee.mode === 'exponential') {
      points.push({
        x: i,
        feeBps: maxFee * Math.pow(i / 100, 2),
      });
    } else {
      points.push({
        x: i,
        feeBps: Math.min(maxFee, (sim.baseFee.cliffFeeBps || 50) + (i / 100) * 50),
      });
    }
  }
  return points;
}
