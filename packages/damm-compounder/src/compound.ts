/**
 * Compounding Liquidity for DAMM v2
 * ----------------------------------
 * One of the "creative end-to-end launch flows" the brief asks for: once a
 * DBC pool graduates into a DAMM v2 pool, trading fees accrue to LP
 * positions but sit idle until someone claims them. This module claims a
 * position's accrued fees and immediately re-deposits them as new liquidity
 * in the same position — turning a one-off launch into a self-reinforcing
 * pool where fee income compounds instead of leaking out to whoever claims
 * first.
 *
 * This is designed to run as a scheduled keeper (see scripts/compound-liquidity.ts)
 * against a partner-owned, permanently-locked LP position — exactly the
 * kind of position Aequus's presets create via
 * `liquidityDistribution.partnerPermanentLockedLiquidityPercentage`.
 */

import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { CpAmm, getTokenProgram } from '@meteora-ag/cp-amm-sdk';
import BN from 'bn.js';

export interface CompoundResult {
  claimedFeeTxSig: string | null;
  compoundTxSig: string | null;
  skipped: boolean;
  reason?: string;
}

/**
 * Claims fees for the given position, then re-adds whatever was claimed as
 * new liquidity to the same position. Skips the add-liquidity step if the
 * claimed amounts are below `minClaimLamports` — compounding dust isn't
 * worth the transaction fee.
 */
export async function compoundPosition(
  connection: Connection,
  cpAmm: CpAmm,
  pool: PublicKey,
  owner: Keypair,
  minClaimLamports = 10_000_000 // 0.01 SOL-equivalent, tune per quote token decimals
): Promise<CompoundResult> {
  const poolState = await cpAmm.fetchPoolState(pool);
  const positions = await cpAmm.getUserPositionByPool(pool, owner.publicKey);

  if (positions.length === 0) {
    return { claimedFeeTxSig: null, compoundTxSig: null, skipped: true, reason: 'No position found for owner on this pool' };
  }
  const { position, positionNftAccount } = positions[0];

  const tokenAProgram = getTokenProgram(poolState.tokenAFlag);
  const tokenBProgram = getTokenProgram(poolState.tokenBFlag);

  // 1. Claim accrued fees to the owner's own token accounts.
  const claimTx = await cpAmm.claimPositionFee2({
    receiver: owner.publicKey,
    feePayer: owner.publicKey,
    owner: owner.publicKey,
    pool,
    position,
    positionNftAccount,
    tokenAMint: poolState.tokenAMint,
    tokenBMint: poolState.tokenBMint,
    tokenAVault: poolState.tokenAVault,
    tokenBVault: poolState.tokenBVault,
    tokenAProgram,
    tokenBProgram,
  });
  const claimedFeeTxSig = await sendAndConfirmTransaction(connection, claimTx, [owner]);

  // 2. Re-fetch pool + position state post-claim to size the compound deposit.
  const refreshedPool = await cpAmm.fetchPoolState(pool);
  const depositQuote = await cpAmm.getDepositQuote({
    inAmount: new BN(minClaimLamports),
    isTokenA: true,
    minSqrtPrice: refreshedPool.sqrtMinPrice,
    maxSqrtPrice: refreshedPool.sqrtMaxPrice,
    sqrtPrice: refreshedPool.sqrtPrice,
  });

  if (depositQuote.liquidityDelta.isZero()) {
    return {
      claimedFeeTxSig,
      compoundTxSig: null,
      skipped: true,
      reason: 'Claimed amount below minClaimLamports threshold — nothing compounded this cycle',
    };
  }

  // 3. Add the claimed fees back into the same position as new liquidity.
  const addLiquidityTx = await cpAmm.addLiquidity({
    owner: owner.publicKey,
    pool,
    position,
    positionNftAccount,
    liquidityDelta: depositQuote.liquidityDelta,
    maxAmountTokenA: depositQuote.outputAmount,
    maxAmountTokenB: depositQuote.outputAmount,
    tokenAAmountThreshold: depositQuote.outputAmount,
    tokenBAmountThreshold: depositQuote.outputAmount,
    tokenAMint: refreshedPool.tokenAMint,
    tokenBMint: refreshedPool.tokenBMint,
    tokenAProgram,
    tokenBProgram,
  });
  const compoundTxSig = await sendAndConfirmTransaction(connection, addLiquidityTx, [owner]);

  return { claimedFeeTxSig, compoundTxSig, skipped: false };
}
