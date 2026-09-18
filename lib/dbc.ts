'use client';

/**
 * Thin client-side wrapper around @meteora-ag/dynamic-bonding-curve-sdk,
 * used by the "Use this preset" flow in the marketplace UI. Builds
 * transactions and hands them to the connected wallet to sign — Aequus
 * never touches user keys.
 */

import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { NATIVE_MINT } from '@solana/spl-token';
import { DynamicBondingCurveClient, deriveDbcPoolAddress } from '@meteora-ag/dynamic-bonding-curve-sdk';
import { CURVE_BUILDERS } from '@aequus/curve-presets';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ?? 'https://api.devnet.solana.com';

export function getConnection() {
  return new Connection(RPC_URL, 'confirmed');
}

export interface WalletLike {
  publicKey: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAllTransactions?: (txs: Transaction[]) => Promise<Transaction[]>;
}

/**
 * Builds and sends the createConfig transaction for a preset, signed by the
 * connected wallet plus a freshly generated config keypair (config accounts
 * are single-use signers, not PDAs, per the DBC account model).
 */
export async function createConfigForPreset(presetId: string, wallet: WalletLike) {
  const builder = CURVE_BUILDERS[presetId];
  if (!builder) throw new Error(`Unknown preset: ${presetId}`);

  const connection = getConnection();
  const client = DynamicBondingCurveClient.create(connection, 'confirmed');
  const config = Keypair.generate();
  const curveConfig = builder();

  const tx = await client.partner.createConfig({
    config: config.publicKey,
    feeClaimer: wallet.publicKey,
    leftoverReceiver: wallet.publicKey,
    payer: wallet.publicKey,
    quoteMint: NATIVE_MINT,
    ...curveConfig,
  });
  tx.feePayer = wallet.publicKey;
  tx.partialSign(config);

  const signed = await wallet.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(sig, 'confirmed');

  return { configPubkey: config.publicKey, signature: sig };
}

/**
 * Builds and sends createPool against an existing config, minting a fresh
 * base token for the launch.
 */
export async function createPoolForConfig(
  configPubkey: PublicKey,
  name: string,
  symbol: string,
  uri: string,
  wallet: WalletLike
) {
  const connection = getConnection();
  const client = DynamicBondingCurveClient.create(connection, 'confirmed');
  const baseMint = Keypair.generate();

  const tx = await client.creator.createPool({
    baseMint: baseMint.publicKey,
    config: configPubkey,
    name,
    symbol,
    uri,
    payer: wallet.publicKey,
    poolCreator: wallet.publicKey,
  });
  tx.feePayer = wallet.publicKey;
  tx.partialSign(baseMint);

  const signed = await wallet.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(sig, 'confirmed');

  const pool = deriveDbcPoolAddress(NATIVE_MINT, baseMint.publicKey, configPubkey);

  return { mint: baseMint.publicKey, pool, signature: sig };
}
