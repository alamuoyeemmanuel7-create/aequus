/**
 * Aequus DBC Curve Presets
 * ------------------------
 * Four opinionated, named DBC configs targeting different asset classes.
 * Each preset pairs a curve builder call (real @meteora-ag/dynamic-bonding-curve-sdk
 * usage) with the metadata + simulation numbers the marketplace UI renders.
 *
 * NOTE ON SDK FIELD NAMES: this file targets the public shape documented at
 * docs.meteora.ag/developer-guides/dbc/typescript-sdk/{examples,reference}.
 * The SDK is under active development — before shipping, diff these field
 * names against the version pinned in package.json (`pnpm ls @meteora-ag/dynamic-bonding-curve-sdk`)
 * and adjust `rateLimiterParam` / `feeSchedulerParam` field names if they've
 * changed. Everything here compiles against the documented public API as of
 * the DBC TS SDK examples page.
 */

import {
  ActivationType,
  BaseFeeMode,
  buildCurveWithCustomSqrtPrices,
  CollectFeeMode,
  createSqrtPrices,
  DammV2BaseFeeMode,
  DammV2DynamicFeeMode,
  MigratedCollectFeeMode,
  MigrationFeeOption,
  MigrationOption,
  TokenDecimal,
  TokenType,
  TokenAuthorityOption,
} from '@meteora-ag/dynamic-bonding-curve-sdk';
import type { Preset } from './types';

const BASE_DECIMALS = TokenDecimal.SIX;
const QUOTE_DECIMALS = TokenDecimal.NINE; // SOL / wSOL

/* -------------------------------------------------------------------------- */
/* 1. STOCK DISCOVERY — tokenized equities, thinly-traded newly listed names  */
/* -------------------------------------------------------------------------- */
/**
 * Problem: a freshly tokenized equity (xStocks-style) has no on-chain trading
 * history. A standard steep exponential meme curve lets the first buyer gap
 * the price away from any sane reference band in one block, and bots snipe
 * the opening tick. Equity price discovery needs to be *slow and buy-size
 * aware*, not fast and time-aware.
 *
 * Curve shape: long, gently-sloped — six checkpoints spread across the full
 * progress range instead of a hockey-stick. See simulate.ts for the plotted
 * shape; this is the "Long Curve" idea from the brief.
 *
 * Fee shape: RateLimiter, not a time scheduler. This is the key move — fee
 * scales with buy *size*, not with time since launch, so a whale trying to
 * buy 80% of the curve in one transaction pays progressively more per SOL,
 * while patient small buyers pay close to the base rate regardless of when
 * they arrive. This directly targets "who buys first AND how much" per
 * Meteora's own anti-sniper rate limiter design.
 *
 * Migration: DAMM v2 with dynamic fee enabled and a higher fixed migration
 * fee (200bps) — post-graduation liquidity for a thinly-traded name is
 * thinner than a meme pool, so LPs need more fee compensation to stay in.
 */
export function buildStockDiscoveryCurve() {
  const sqrtPrices = createSqrtPrices(
    [0.0000012, 0.0000014, 0.0000018, 0.0000026, 0.0000042, 0.000008],
    BASE_DECIMALS,
    QUOTE_DECIMALS
  );

  return buildCurveWithCustomSqrtPrices({
    token: {
      tokenType: TokenType.SPLToken,
      tokenBaseDecimal: BASE_DECIMALS,
      tokenQuoteDecimal: QUOTE_DECIMALS,
      tokenAuthorityOption: TokenAuthorityOption.PartnerUpdateAuthority,
      totalTokenSupply: 1_000_000_000,
      leftover: 1_000,
    },
    fee: {
      baseFeeParams: {
        baseFeeMode: BaseFeeMode.RateLimiter,
        // fee brackets by buy size, not by time — see rationale above
        rateLimiterParam: {
          cliffFeeBps: 100, // 1% base fee for buys up to the reference amount
          referenceAmount: 1_000_000_000, // 1 SOL (lamports) per bracket
          feeIncrementBps: 150, // +1.5% per additional SOL bracket
          maxLimiterDurationSeconds: 21_600, // limiter active for first 6h of trading
        },
      },
      dynamicFeeEnabled: true,
      collectFeeMode: CollectFeeMode.QuoteToken, // required for RateLimiter mode
      creatorTradingFeePercentage: 20,
      poolCreationFee: 1,
      enableFirstSwapWithMinFee: false,
    },
    migration: {
      migrationOption: MigrationOption.MET_DAMM_V2,
      migrationFeeOption: MigrationFeeOption.FixedBps200,
      migratedPoolFee: {
        collectFeeMode: MigratedCollectFeeMode.QuoteToken,
        dynamicFee: DammV2DynamicFeeMode.Enabled,
        poolFeeBps: 150,
        baseFeeMode: DammV2BaseFeeMode.FeeTimeSchedulerLinear,
      },
    },
    liquidityDistribution: {
      partnerLiquidityPercentage: 0,
      partnerPermanentLockedLiquidityPercentage: 100,
      creatorLiquidityPercentage: 0,
      creatorPermanentLockedLiquidityPercentage: 0,
    },
    lockedVesting: {
      totalLockedVestingAmount: 0,
      numberOfVestingPeriod: 0,
      cliffUnlockAmount: 0,
      totalVestingDuration: 0,
      cliffDurationFromMigrationTime: 0,
    },
    activationType: ActivationType.Timestamp,
    sqrtPrices,
    liquidityWeights: [3, 2, 2, 1, 1, 1],
  });
}

/* -------------------------------------------------------------------------- */
/* 2. RWA STEADY — asset-backed / NAV-tracking real-world assets              */
/* -------------------------------------------------------------------------- */
/**
 * Problem: a tokenized RWA (e.g. a T-bill wrapper, a real-estate share) isn't
 * supposed to be a speculative instrument — its price should hug an intrinsic
 * NAV band, not run up a steep curve. A "Flat Curve" (per the brief) keeps
 * slippage low and discourages using the bonding curve itself for speculation.
 *
 * Fee shape: flat, low fee throughout — no scheduler decay, because there's
 * no bot-sniping problem to solve when the curve itself is nearly flat.
 */
export function buildRwaSteadyCurve() {
  const sqrtPrices = createSqrtPrices(
    [0.000001, 0.00000102, 0.00000104, 0.00000108],
    BASE_DECIMALS,
    QUOTE_DECIMALS
  );

  return buildCurveWithCustomSqrtPrices({
    token: {
      tokenType: TokenType.SPLToken,
      tokenBaseDecimal: BASE_DECIMALS,
      tokenQuoteDecimal: QUOTE_DECIMALS,
      tokenAuthorityOption: TokenAuthorityOption.PartnerUpdateAuthority,
      totalTokenSupply: 1_000_000_000,
      leftover: 1_000,
    },
    fee: {
      baseFeeParams: {
        baseFeeMode: BaseFeeMode.FeeSchedulerLinear,
        feeSchedulerParam: {
          startingFeeBps: 50,
          endingFeeBps: 50, // flat — no decay, nothing to protect against
          numberOfPeriod: 1,
          totalDuration: 1,
        },
      },
      dynamicFeeEnabled: false,
      collectFeeMode: CollectFeeMode.QuoteToken,
      creatorTradingFeePercentage: 0,
      poolCreationFee: 1,
      enableFirstSwapWithMinFee: true,
    },
    migration: {
      migrationOption: MigrationOption.MET_DAMM_V2,
      migrationFeeOption: MigrationFeeOption.FixedBps25,
      migratedPoolFee: {
        collectFeeMode: MigratedCollectFeeMode.QuoteToken,
        dynamicFee: DammV2DynamicFeeMode.Disabled,
        poolFeeBps: 25,
        baseFeeMode: DammV2BaseFeeMode.FeeTimeSchedulerLinear,
      },
    },
    liquidityDistribution: {
      partnerLiquidityPercentage: 0,
      partnerPermanentLockedLiquidityPercentage: 100,
      creatorLiquidityPercentage: 0,
      creatorPermanentLockedLiquidityPercentage: 0,
    },
    lockedVesting: {
      totalLockedVestingAmount: 0,
      numberOfVestingPeriod: 0,
      cliffUnlockAmount: 0,
      totalVestingDuration: 0,
      cliffDurationFromMigrationTime: 0,
    },
    activationType: ActivationType.Timestamp,
    sqrtPrices,
    liquidityWeights: [1, 1, 1],
  });
}

/* -------------------------------------------------------------------------- */
/* 3. ICM FAST — internet capital markets / fast speculative launches        */
/* -------------------------------------------------------------------------- */
export function buildIcmFastCurve() {
  const sqrtPrices = createSqrtPrices(
    [0.0000000008, 0.000000004, 0.00000004],
    BASE_DECIMALS,
    QUOTE_DECIMALS
  );

  return buildCurveWithCustomSqrtPrices({
    token: {
      tokenType: TokenType.SPLToken,
      tokenBaseDecimal: BASE_DECIMALS,
      tokenQuoteDecimal: QUOTE_DECIMALS,
      tokenAuthorityOption: TokenAuthorityOption.PartnerUpdateAuthority,
      totalTokenSupply: 1_000_000_000,
      leftover: 1_000,
    },
    fee: {
      baseFeeParams: {
        baseFeeMode: BaseFeeMode.FeeSchedulerExponential,
        feeSchedulerParam: {
          startingFeeBps: 9_000,
          endingFeeBps: 100,
          numberOfPeriod: 60,
          totalDuration: 60,
        },
      },
      dynamicFeeEnabled: true,
      collectFeeMode: CollectFeeMode.QuoteToken,
      creatorTradingFeePercentage: 0,
      poolCreationFee: 1,
      enableFirstSwapWithMinFee: false,
    },
    migration: {
      migrationOption: MigrationOption.MET_DAMM_V2,
      migrationFeeOption: MigrationFeeOption.FixedBps100,
      migratedPoolFee: {
        collectFeeMode: MigratedCollectFeeMode.QuoteToken,
        dynamicFee: DammV2DynamicFeeMode.Enabled,
        poolFeeBps: 100,
        baseFeeMode: DammV2BaseFeeMode.FeeTimeSchedulerExponential,
      },
    },
    liquidityDistribution: {
      partnerLiquidityPercentage: 0,
      partnerPermanentLockedLiquidityPercentage: 100,
      creatorLiquidityPercentage: 0,
      creatorPermanentLockedLiquidityPercentage: 0,
    },
    lockedVesting: {
      totalLockedVestingAmount: 0,
      numberOfVestingPeriod: 0,
      cliffUnlockAmount: 0,
      totalVestingDuration: 0,
      cliffDurationFromMigrationTime: 0,
    },
    activationType: ActivationType.Timestamp,
    sqrtPrices,
    liquidityWeights: [2, 1, 1],
  });
}

/* -------------------------------------------------------------------------- */
/* 4. MEME CLASSIC — baseline reference curve                                */
/* -------------------------------------------------------------------------- */
export function buildMemeClassicCurve() {
  const sqrtPrices = createSqrtPrices(
    [0.000000001, 0.00000000105, 0.000000002, 0.000001],
    BASE_DECIMALS,
    QUOTE_DECIMALS
  );

  return buildCurveWithCustomSqrtPrices({
    token: {
      tokenType: TokenType.SPLToken,
      tokenBaseDecimal: BASE_DECIMALS,
      tokenQuoteDecimal: QUOTE_DECIMALS,
      tokenAuthorityOption: TokenAuthorityOption.PartnerUpdateAuthority,
      totalTokenSupply: 1_000_000_000,
      leftover: 1_000,
    },
    fee: {
      baseFeeParams: {
        baseFeeMode: BaseFeeMode.FeeSchedulerExponential,
        feeSchedulerParam: {
          startingFeeBps: 9_000,
          endingFeeBps: 120,
          numberOfPeriod: 60,
          totalDuration: 60,
        },
      },
      dynamicFeeEnabled: true,
      collectFeeMode: CollectFeeMode.QuoteToken,
      creatorTradingFeePercentage: 0,
      poolCreationFee: 1,
      enableFirstSwapWithMinFee: false,
    },
    migration: {
      migrationOption: MigrationOption.MET_DAMM_V2,
      migrationFeeOption: MigrationFeeOption.Customizable,
      migrationFee: {
        feePercentage: 10,
        creatorFeePercentage: 50,
      },
      migratedPoolFee: {
        collectFeeMode: MigratedCollectFeeMode.QuoteToken,
        dynamicFee: DammV2DynamicFeeMode.Enabled,
        poolFeeBps: 120,
        baseFeeMode: DammV2BaseFeeMode.FeeTimeSchedulerLinear,
      },
    },
    liquidityDistribution: {
      partnerLiquidityPercentage: 0,
      partnerPermanentLockedLiquidityPercentage: 100,
      creatorLiquidityPercentage: 0,
      creatorPermanentLockedLiquidityPercentage: 0,
    },
    lockedVesting: {
      totalLockedVestingAmount: 0,
      numberOfVestingPeriod: 0,
      cliffUnlockAmount: 0,
      totalVestingDuration: 0,
      cliffDurationFromMigrationTime: 0,
    },
    activationType: ActivationType.Timestamp,
    sqrtPrices,
    liquidityWeights: [2, 1, 1],
  });
}

/* -------------------------------------------------------------------------- */
/* Marketplace metadata + simulation numbers (kept in sync with the builders  */
/* above by hand — see the README for a note on keeping these consistent).   */
/* -------------------------------------------------------------------------- */

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

export const CURVE_BUILDERS: Record<string, () => ReturnType<typeof buildCurveWithCustomSqrtPrices>> = {
  'stock-discovery': buildStockDiscoveryCurve,
  'rwa-steady': buildRwaSteadyCurve,
  'icm-fast': buildIcmFastCurve,
  'meme-classic': buildMemeClassicCurve,
};

export function getPreset(id: string): Preset | undefined {
  return PRESETS.find((p) => p.meta.id === id);
}
