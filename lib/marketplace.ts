'use client';

/**
 * Minimal "pay-to-use" gate for premium presets — the DBC Config Preset
 * Marketplace mechanic from the brief.
 *
 * Design: a premium preset (e.g. "Stock Discovery") requires a one-time SOL
 * payment to the marketplace treasury before a wallet is allowed to run
 * createConfigForPreset for it. Unlock state is recorded on-chain implicitly
 * by checking transaction history to the treasury from that wallet with a
 * matching memo — no separate database required for a hackathon-scope build.
 *
 * For production, swap `hasUnlocked` for a proper indexer/DB lookup and add
 * per-preset pricing tiers, revenue share back to preset authors, etc.
 */

import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import type { WalletLike } from './dbc';

const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export function getTreasuryAddress(): PublicKey {
  const addr = process.env.NEXT_PUBLIC_MARKETPLACE_TREASURY;
  if (!addr) {
    throw new Error('NEXT_PUBLIC_MARKETPLACE_TREASURY is not set — see .env.example');
  }
  return new PublicKey(addr);
}

function memoForPreset(presetId: string) {
  return `aequus:unlock:${presetId}`;
}

export async function unlockPreset(
  connection: Connection,
  presetId: string,
  priceSol: number,
  wallet: WalletLike
) {
  const treasury = getTreasuryAddress();
  const lamports = Math.round(priceSol * 1_000_000_000);

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: treasury,
      lamports,
    }),
    new TransactionInstruction({
      keys: [],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(memoForPreset(presetId), 'utf-8'),
    })
  );
  tx.feePayer = wallet.publicKey;
  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;

  const signed = await wallet.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(sig, 'confirmed');
  return sig;
}

/** Checks recent treasury-bound transfers from this wallet for a matching unlock memo. */
export async function hasUnlocked(
  connection: Connection,
  presetId: string,
  walletPubkey: PublicKey
): Promise<boolean> {
  const treasury = getTreasuryAddress();
  const sigs = await connection.getSignaturesForAddress(treasury, { limit: 50 });

  for (const s of sigs) {
    const tx = await connection.getTransaction(s.signature, { maxSupportedTransactionVersion: 0 });
    if (!tx) continue;
    const memoIx = tx.transaction.message.compiledInstructions?.find(() => true);
    const logs = tx.meta?.logMessages ?? [];
    const paidByThisWallet = tx.transaction.message.staticAccountKeys.some((k) =>
      k.equals(walletPubkey)
    );
    const memoMatch = logs.some((l) => l.includes(memoForPreset(presetId)));
    if (paidByThisWallet && memoMatch) return true;
  }
  return false;
}
