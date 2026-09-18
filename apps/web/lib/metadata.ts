'use client';

/**
 * Uploads a token image + metadata JSON to Arweave via Irys, returning the
 * metadata URI that gets passed into client.creator.createPool(). Without
 * this, every launched token would ship with the same placeholder
 * https://example.com/token.json — fine for devnet testing, not for a real
 * launch that shows up in wallets and explorers.
 *
 * Irys is used here because it's the standard pay-per-upload path to
 * permanent storage from the browser with a connected Solana wallet (no
 * separate API key), and it's what most Solana token launchers already use
 * for Metaplex-compatible metadata.
 */

import { WebIrys } from '@irys/sdk';
import type { WalletLike } from './dbc';

export interface TokenMetadataInput {
  name: string;
  symbol: string;
  description: string;
  image: File; // raw image file from an <input type="file">
  externalUrl?: string;
  assetClass?: string; // e.g. "tokenized-equity", "rwa" — stored as an attribute
}

async function getWebIrys(wallet: WalletLike & { signMessage?: (msg: Uint8Array) => Promise<Uint8Array> }) {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL ?? 'https://api.devnet.solana.com';
  const network = rpcUrl.includes('devnet') ? 'devnet' : 'mainnet';

  const webIrys = new WebIrys({
    network,
    token: 'solana',
    wallet: { rpcUrl, name: 'solana', provider: wallet },
  });
  await webIrys.ready();
  return webIrys;
}

/** Uploads the raw image file, returning its permanent Arweave/Irys URL. */
async function uploadImage(webIrys: WebIrys, image: File): Promise<string> {
  const buffer = Buffer.from(await image.arrayBuffer());
  const receipt = await webIrys.upload(buffer, {
    tags: [{ name: 'Content-Type', value: image.type || 'image/png' }],
  });
  return `https://gateway.irys.xyz/${receipt.id}`;
}

/** Uploads Metaplex-compatible JSON metadata, returning its URI. */
export async function uploadTokenMetadata(
  input: TokenMetadataInput,
  wallet: WalletLike & { signMessage?: (msg: Uint8Array) => Promise<Uint8Array> }
): Promise<string> {
  const webIrys = await getWebIrys(wallet);
  const imageUrl = await uploadImage(webIrys, input.image);

  const metadata = {
    name: input.name,
    symbol: input.symbol,
    description: input.description,
    image: imageUrl,
    external_url: input.externalUrl ?? '',
    attributes: input.assetClass ? [{ trait_type: 'Asset Class', value: input.assetClass }] : [],
    properties: {
      files: [{ uri: imageUrl, type: input.image.type || 'image/png' }],
      category: 'image',
    },
  };

  const receipt = await webIrys.upload(JSON.stringify(metadata), {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://gateway.irys.xyz/${receipt.id}`;
}
