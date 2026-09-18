/**
 * Aequus curve preset types.
 *
 * A "preset" bundles:
 *  - metadata for the marketplace UI (name, asset class, description, why it's shaped this way)
 *  - the exact DBC curve/fee/migration config, built with @meteora-ag/dynamic-bonding-curve-sdk
 *  - simulation hints so the frontend can chart price + fee behavior without hitting an RPC
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
  /** Why this curve/fee shape suits the asset class — shown on the detail page. */
  rationale: string[];
  /** Whether this preset requires a marketplace unlock payment before use. */
  premium: boolean;
  /** SOL price to unlock, if premium. */
  priceSol?: number;
}

/**
 * Inputs used purely for client-side simulation/charting.
 * These mirror the numbers passed into the real SDK curve builder so the
 * chart the user sees before signing anything matches what actually gets
 * submitted on-chain.
 */
export interface CurveSimInput {
  sqrtPriceCheckpoints: number[]; // human-readable prices (quote per base), ascending
  liquidityWeights: number[]; // weight per segment between checkpoints
  totalTokenSupply: number;
  baseFee: {
    mode: 'linear' | 'exponential' | 'rate-limiter';
    // scheduler modes
    startingFeeBps?: number;
    endingFeeBps?: number;
    numberOfPeriod?: number;
    totalDurationSeconds?: number;
    // rate limiter mode
    cliffFeeBps?: number;
    referenceAmount?: number; // in quote token units
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
