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

// Marketplace metadata + simulation numbers
export const PRESETS: Preset[] = [
  {
    meta: {
      id: 'stock-discovery',
      name: 'Stock Discovery',
      tagline: 'Slow, buy-size-aware price discovery for tokenized equities',
      assetClass: 'tokenized-equity',
      premium: true,
      priceSol: 2,
      description:
        'A long, gently-sloped curve paired with DBC\'s RateLimiter fee mode instead of a time scheduler. Fees scale with how much you buy, not how fast you click, so a newly tokenized stock finds its price over the first few hours instead of gapping in one block.',
      rationale: [
        'Six-checkpoint long curve spreads price discovery across the full raise instead of a hockey-stick',
        'RateLimiter base fee taxes large single buys, not just early ones — anti-whale, not just anti-bot',
        'Migrates to DAMM v2 with dynamic fees + 200bps fixed migration fee to compensate LPs for thinner post-launch volume',
      ],
    },
    sim: {
      sqrtPriceCheckpoints: [0.0000012, 0.0000014, 0.0000018, 0.0000026, 0.0000042, 0.000008],
      liquidityWeights: [3, 2, 2, 1, 1, 1],
      totalTokenSupply: 1_000_000_000,
      baseFee: {
        mode: 'rate-limiter',
        cliffFeeBps: 100,
        referenceAmount: 1,
        feeIncrementBps: 150,
        maxLimiterDurationSeconds: 21_600,
      },
      migrationFeeBps: 200,
      migratedPoolFeeBps: 150,
    },
  },
  {
    meta: {
      id: 'rwa-steady',
      name: 'RWA Steady',
      tagline: 'A near-flat curve for NAV-tracking real-world assets',
      assetClass: 'rwa',
      premium: true,
      priceSol: 2,
      description:
        'Minimal slope and a flat, low fee throughout. Built for tokenized assets that should track an off-chain reference value rather than run up a speculative bonding curve.',
      rationale: [
        'Nearly-flat 4-checkpoint curve keeps slippage low across the whole raise',
        'No fee scheduler decay — there is no snipe race to defend against on a flat curve',
        'Migrates to DAMM v2 with dynamic fees disabled and the lowest fixed migration tier (25bps)',
      ],
    },
    sim: {
      sqrtPriceCheckpoints: [0.000001, 0.00000102, 0.00000104, 0.00000108],
      liquidityWeights: [1, 1, 1],
      totalTokenSupply: 1_000_000_000,
      baseFee: {
        mode: 'linear',
        startingFeeBps: 50,
        endingFeeBps: 50,
        numberOfPeriod: 1,
        totalDurationSeconds: 1,
      },
      migrationFeeBps: 25,
      migratedPoolFeeBps: 25,
    },
  },
  {
    meta: {
      id: 'icm-fast',
      name: 'ICM Fast',
      tagline: 'Exponential curve tuned for fast internet-capital-markets launches',
      assetClass: 'icm',
      premium: false,
      description:
        'A short, steep exponential curve with an aggressive anti-bot fee scheduler that decays over 60 periods — for launches that want speed over slow discovery.',
      rationale: [
        'Three-checkpoint exponential curve reaches full range quickly',
        'FeeSchedulerExponential starts at 90% and decays to 1% over 60 periods to blunt sniper bots',
        'Migrates to DAMM v2 at the 100bps fixed tier with dynamic fees enabled',
      ],
    },
    sim: {
      sqrtPriceCheckpoints: [0.0000000008, 0.000000004, 0.00000004],
      liquidityWeights: [2, 1, 1],
      totalTokenSupply: 1_000_000_000,
      baseFee: {
        mode: 'exponential',
        startingFeeBps: 9_000,
        endingFeeBps: 100,
        numberOfPeriod: 60,
        totalDurationSeconds: 60,
      },
      migrationFeeBps: 100,
      migratedPoolFeeBps: 100,
    },
  },
  {
    meta: {
      id: 'meme-classic',
      name: 'Meme Classic',
      tagline: 'The standard exponential meme curve, included as a baseline',
      assetClass: 'meme',
      premium: false,
      description:
        'A reference implementation of the classic pump-style exponential curve so builders can A/B their custom presets against the familiar default.',
      rationale: [
        'Matches the widely-used exponential curve + scheduler shape',
        'Included so the marketplace always has a known baseline to compare new presets against',
      ],
    },
    sim: {
      sqrtPriceCheckpoints: [0.000000001, 0.00000000105, 0.000000002, 0.000001],
      liquidityWeights: [2, 1, 1],
      totalTokenSupply: 1_000_000_000,
      baseFee: {
        mode: 'exponential',
        startingFeeBps: 9_000,
        endingFeeBps: 120,
        numberOfPeriod: 60,
        totalDurationSeconds: 60,
      },
      migrationFeeBps: 120,
      migratedPoolFeeBps: 120,
    },
  },
];

export function getPreset(id: string): Preset | undefined {
  return PRESETS.find((p) => p.meta.id === id);
}
