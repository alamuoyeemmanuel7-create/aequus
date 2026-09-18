/**
 * Indexer configuration
 * Supports multiple indexer providers: Helius, Magic Eden, or custom RPC
 */

export type IndexerProvider = 'helius' | 'magic-eden' | 'custom-rpc';

export interface IndexerConfig {
  provider: IndexerProvider;
  apiKey?: string;
  rpcUrl?: string;
  enabled: boolean;
}

// Get configuration from environment variables
export const getIndexerConfig = (): IndexerConfig => {
  const provider = (process.env.NEXT_PUBLIC_INDEXER_PROVIDER || 'custom-rpc') as IndexerProvider;
  const apiKey = process.env.NEXT_PUBLIC_INDEXER_API_KEY;
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
  const enabled = process.env.NEXT_PUBLIC_INDEXER_ENABLED === 'true';

  return {
    provider,
    apiKey,
    rpcUrl,
    enabled,
  };
};

export const INDEXER_DOCS = {
  helius: {
    name: 'Helius',
    url: 'https://docs.helius.xyz',
    setup: `
1. Sign up at https://dashboard.helius.dev
2. Create an API key
3. Set NEXT_PUBLIC_INDEXER_PROVIDER=helius
4. Set NEXT_PUBLIC_INDEXER_API_KEY=your_api_key
5. Helius RPC: https://mainnet.helius-rpc.com/?api-key=your_api_key
    `,
    features: [
      'Real-time transaction parsing',
      'DAS (Digital Asset Standard) API',
      'Token metadata enrichment',
      'Webhook support',
      'Rate limits: 1000 req/sec',
    ],
  },
  'magic-eden': {
    name: 'Magic Eden',
    url: 'https://developers.magiceden.io',
    setup: `
1. Sign up at https://developers.magiceden.io
2. Create an API key
3. Set NEXT_PUBLIC_INDEXER_PROVIDER=magic-eden
4. Set NEXT_PUBLIC_INDEXER_API_KEY=your_api_key
    `,
    features: [
      'Real-time collection stats',
      'NFT/Token metadata',
      'Launchpad data',
      'Market analytics',
    ],
  },
  'custom-rpc': {
    name: 'Custom RPC Provider',
    url: 'https://solana.com/docs/rpc',
    setup: `
1. Set up your own Solana validator or use a provider like Alchemy, Triton, etc.
2. Set NEXT_PUBLIC_INDEXER_PROVIDER=custom-rpc
3. Set NEXT_PUBLIC_SOLANA_RPC_URL=your_rpc_url
    `,
    features: [
      'Full control',
      'Custom parsing',
      'Manual transaction tracking',
      'Rate limits vary by provider',
    ],
  },
};
