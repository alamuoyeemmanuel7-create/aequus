/**
 * Compounding Liquidity keeper.
 *
 * Runs compoundPosition() once, or on a loop, against a DAMM v2 pool that
 * graduated from one of Aequus's DBC presets. Intended to run as a partner
 * keeper against the permanently-locked LP position DBC migration creates
 * (see `liquidityDistribution.partnerPermanentLockedLiquidityPercentage` in
 * packages/curve-presets/src/presets.ts).
 *
 * Usage (single run):
 *   RPC_URL=https://api.mainnet-beta.solana.com \
 *   KEYPAIR_PATH=~/.config/solana/id.json \
 *   pnpm tsx scripts/compound-liquidity.ts <DAMM_V2_POOL_PUBKEY>
 *
 * Usage (loop every 30 minutes):
 *   pnpm tsx scripts/compound-liquidity.ts <DAMM_V2_POOL_PUBKEY> --loop --interval-min=30
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { CpAmm } from '@meteora-ag/cp-amm-sdk';
import { compoundPosition } from '../packages/damm-compounder/src';

function loadKeypair(p: string): Keypair {
  const resolved = p.replace(/^~/, os.homedir());
  const raw = JSON.parse(fs.readFileSync(path.resolve(resolved), 'utf-8'));
  return Keypair.fromSecretKey(Uint8Array.from(raw));
}

function parseFlag(name: string, fallback: string): string {
  const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : fallback;
}

async function runOnce(connection: Connection, cpAmm: CpAmm, pool: PublicKey, owner: Keypair) {
  const timestamp = new Date().toISOString();
  const result = await compoundPosition(connection, cpAmm, pool, owner);
  if (result.skipped) {
    console.log(`[${timestamp}] skipped: ${result.reason}`);
  } else {
    console.log(`[${timestamp}] compounded ✅`);
    console.log(`  claim tx    : ${result.claimedFeeTxSig}`);
    console.log(`  compound tx : ${result.compoundTxSig}`);
  }
}

async function main() {
  const poolArg = process.argv[2];
  if (!poolArg || poolArg.startsWith('--')) {
    console.error('Usage: pnpm tsx scripts/compound-liquidity.ts <DAMM_V2_POOL_PUBKEY> [--loop] [--interval-min=30]');
    process.exit(1);
  }

  const loop = process.argv.includes('--loop');
  const intervalMin = Number(parseFlag('interval-min', '30'));

  const rpcUrl = process.env.RPC_URL ?? 'https://api.devnet.solana.com';
  const keypairPath = process.env.KEYPAIR_PATH ?? '~/.config/solana/id.json';

  const connection = new Connection(rpcUrl, 'confirmed');
  const owner = loadKeypair(keypairPath);
  const cpAmm = new CpAmm(connection);
  const pool = new PublicKey(poolArg);

  await runOnce(connection, cpAmm, pool, owner);

  if (loop) {
    console.log(`\nLooping every ${intervalMin} minute(s). Ctrl+C to stop.`);
    setInterval(() => {
      runOnce(connection, cpAmm, pool, owner).catch((err) => console.error('compound cycle failed:', err));
    }, intervalMin * 60 * 1000);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
