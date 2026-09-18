/**
 * Create a DBC pool (i.e. launch a token) against an existing Aequus preset config.
 *
 * Usage:
 *   RPC_URL=https://api.devnet.solana.com \
 *   KEYPAIR_PATH=~/.config/solana/id.json \
 *   pnpm tsx scripts/create-pool.ts <CONFIG_PUBKEY> "My Tokenized Stock" MSTK https://example.com/msTK.json
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { NATIVE_MINT } from '@solana/spl-token';
import { DynamicBondingCurveClient, deriveDbcPoolAddress } from '@meteora-ag/dynamic-bonding-curve-sdk';

function loadKeypair(p: string): Keypair {
  const resolved = p.replace(/^~/, os.homedir());
  const raw = JSON.parse(fs.readFileSync(path.resolve(resolved), 'utf-8'));
  return Keypair.fromSecretKey(Uint8Array.from(raw));
}

async function main() {
  const [configArg, name, symbol, uri] = process.argv.slice(2);
  if (!configArg || !name || !symbol) {
    console.error(
      'Usage: pnpm tsx scripts/create-pool.ts <CONFIG_PUBKEY> "<NAME>" <SYMBOL> [METADATA_URI]'
    );
    process.exit(1);
  }

  const rpcUrl = process.env.RPC_URL ?? 'https://api.devnet.solana.com';
  const keypairPath = process.env.KEYPAIR_PATH ?? '~/.config/solana/id.json';

  const connection = new Connection(rpcUrl, 'confirmed');
  const creator = loadKeypair(keypairPath);
  const client = DynamicBondingCurveClient.create(connection, 'confirmed');

  const config = new PublicKey(configArg);
  const baseMint = Keypair.generate();

  const createPoolTx = await client.creator.createPool({
    baseMint: baseMint.publicKey,
    config,
    name,
    symbol,
    uri: uri ?? 'https://example.com/token.json',
    payer: creator.publicKey,
    poolCreator: creator.publicKey,
  });
  createPoolTx.feePayer = creator.publicKey;

  const sig = await sendAndConfirmTransaction(connection, createPoolTx, [creator, baseMint]);

  const pool = deriveDbcPoolAddress(NATIVE_MINT, baseMint.publicKey, config);

  console.log('\n✅ Pool created');
  console.log('   token mint :', baseMint.publicKey.toBase58());
  console.log('   pool       :', pool.toBase58());
  console.log('   tx         :', sig);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
