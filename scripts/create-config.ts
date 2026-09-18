/**
 * Create an on-chain DBC config from an Aequus preset.
 *
 * Usage:
 *   RPC_URL=https://api.devnet.solana.com \
 *   KEYPAIR_PATH=~/.config/solana/id.json \
 *   pnpm tsx scripts/create-config.ts stock-discovery
 *
 * Prints the new config public key. Save it — you'll pass it to
 * create-pool.ts to launch a token against this exact curve/fee shape.
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { NATIVE_MINT } from '@solana/spl-token';
import { DynamicBondingCurveClient } from '@meteora-ag/dynamic-bonding-curve-sdk';
import { CURVE_BUILDERS, PRESETS } from '../packages/curve-presets/src';

function loadKeypair(p: string): Keypair {
  const resolved = p.replace(/^~/, os.homedir());
  const raw = JSON.parse(fs.readFileSync(path.resolve(resolved), 'utf-8'));
  return Keypair.fromSecretKey(Uint8Array.from(raw));
}

async function main() {
  const presetId = process.argv[2];
  if (!presetId || !CURVE_BUILDERS[presetId]) {
    console.error(
      `Usage: pnpm tsx scripts/create-config.ts <preset-id>\nAvailable presets: ${PRESETS.map((p) => p.meta.id).join(', ')}`
    );
    process.exit(1);
  }

  const rpcUrl = process.env.RPC_URL ?? 'https://api.devnet.solana.com';
  const keypairPath = process.env.KEYPAIR_PATH ?? '~/.config/solana/id.json';

  const connection = new Connection(rpcUrl, 'confirmed');
  const payer = loadKeypair(keypairPath);
  const client = DynamicBondingCurveClient.create(connection, 'confirmed');

  const config = Keypair.generate();
  const curveConfig = CURVE_BUILDERS[presetId]();

  console.log(`Building "${presetId}" config...`);
  const createConfigTx = await client.partner.createConfig({
    config: config.publicKey,
    feeClaimer: payer.publicKey,
    leftoverReceiver: payer.publicKey,
    payer: payer.publicKey,
    quoteMint: NATIVE_MINT,
    ...curveConfig,
  });
  createConfigTx.feePayer = payer.publicKey;

  const sig = await sendAndConfirmTransaction(connection, createConfigTx, [payer, config]);

  console.log('\n✅ Config created');
  console.log('   preset :', presetId);
  console.log('   config :', config.publicKey.toBase58());
  console.log('   tx     :', sig);
  console.log('\nNext: pnpm tsx scripts/create-pool.ts', config.publicKey.toBase58(), '<TOKEN_NAME> <TOKEN_SYMBOL>');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
