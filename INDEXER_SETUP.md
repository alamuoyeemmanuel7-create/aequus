# Real-time Indexer Setup Guide

This document explains how to integrate real Solana data into the Aequus marketplace by connecting to a real-time indexer.

## Overview

Currently, the marketplace uses **mock data** for demonstration. To fetch real pool, transaction, and holder data from Solana, you'll need to:

1. Choose an indexer provider (Helius, Magic Eden, or custom RPC)
2. Set up environment variables
3. Replace mock data calls with indexer queries
4. Deploy the updated services

## Supported Indexers

### 1. Helius (Recommended)

**Best for:** Complete real-time data, DAS API, transaction parsing

**Setup:**
```bash
# 1. Sign up at https://dashboard.helius.dev
# 2. Create an API key
# 3. Add to .env.local:

NEXT_PUBLIC_INDEXER_PROVIDER=helius
NEXT_PUBLIC_INDEXER_API_KEY=your_helius_api_key
NEXT_PUBLIC_INDEXER_ENABLED=true
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_helius_api_key
```

**Features:**
- Real-time transaction parsing
- DAS (Digital Asset Standard) API for token metadata
- Webhook support for live updates
- 1000 req/sec rate limit
- $199-999/month pricing

**Migration Steps:**
1. Install Helius SDK: `npm install @helius-labs/sdk`
2. Update `poolService.ts` to call `heliusClient.getTokenMetadata()`
3. Update transaction history parsing in `reviewService.ts`
4. Implement holder count via DAS API

### 2. Magic Eden

**Best for:** NFT/Token marketplace data, launchpad integration

**Setup:**
```bash
NEXT_PUBLIC_INDEXER_PROVIDER=magic-eden
NEXT_PUBLIC_INDEXER_API_KEY=your_magic_eden_api_key
NEXT_PUBLIC_INDEXER_ENABLED=true
```

**Features:**
- Real-time collection stats
- NFT/Token metadata enrichment
- Launchpad data integration
- Market analytics
- Custom pricing

### 3. Custom RPC Provider

**Best for:** Full control, self-hosted, or Alchemy/Triton/QuickNode

**Setup:**
```bash
NEXT_PUBLIC_INDEXER_PROVIDER=custom-rpc
NEXT_PUBLIC_SOLANA_RPC_URL=https://your-rpc-url.com
NEXT_PUBLIC_INDEXER_ENABLED=true
```

**Popular RPC Providers:**
- [Alchemy](https://www.alchemy.com/solana) - $199-999/month
- [QuickNode](https://www.quicknode.com/) - $50-1000/month
- [Triton](https://triton.one/) - Enterprise pricing
- [Solana Mainnet](https://docs.solana.com/developing/clients/jsonrpc-api) - Free (rate limited)

## Implementation Guide

### Step 1: Enable Indexer in Services

Update `lib/services/poolService.ts`:

```typescript
import { getIndexerConfig } from '@/lib/indexer/indexerConfig';
import { createHeliusClient } from '@/lib/indexer/heliusClient';

class PoolService {
  private indexerConfig = getIndexerConfig();
  private heliusClient = this.indexerConfig.enabled 
    ? createHeliusClient(
        this.indexerConfig.apiKey!,
        this.indexerConfig.rpcUrl!
      )
    : null;

  async listPools(options: ServiceOptions = {}): Promise<PaginatedResponse<Pool>> {
    if (!this.indexerConfig.enabled || !this.heliusClient) {
      // Fall back to API/mock
      return this.listPoolsFromAPI(options);
    }

    // Query indexer for real pools
    return this.listPoolsFromIndexer(options);
  }

  private async listPoolsFromIndexer(options: ServiceOptions) {
    // TODO: Query Solana indexer for real DAMM/DBC pools
    // Filter by program ID: MEFNoi1AxMeF8gHwvEz7YXV51FvKt9yj9qNQoSx8bhe
    // For each pool, get:
    //   - Mint address (token)
    //   - Liquidity (token reserves * price)
    //   - Volume (sum of last 24h swaps)
    //   - Holder count (token supply holders)
  }
}
```

### Step 2: Update API Routes

Update `app/api/pools/route.ts`:

```typescript
import { getIndexerConfig } from '@/lib/indexer/indexerConfig';
import { createHeliusClient } from '@/lib/indexer/heliusClient';

export async function GET(request: NextRequest) {
  const config = getIndexerConfig();
  
  if (config.enabled) {
    // Query real indexer
    const helius = createHeliusClient(config.apiKey!, config.rpcUrl!);
    const pools = await helius.getTokenMetadata(/* ... */);
    // Process and return pools
  }
  
  // Fall back to mock data
  return NextResponse.json({ success: true, data: MOCK_POOLS });
}
```

### Step 3: Cache & Polling

Implement caching to reduce API calls:

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // milliseconds
}

class IndexerCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttlSeconds = 300) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
}
```

## Environment Variables

Create `.env.local`:

```bash
# Indexer Configuration
NEXT_PUBLIC_INDEXER_PROVIDER=helius  # helius | magic-eden | custom-rpc
NEXT_PUBLIC_INDEXER_API_KEY=your_api_key_here
NEXT_PUBLIC_INDEXER_ENABLED=true
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=...

# Optional: Custom program IDs to track
NEXT_PUBLIC_DBC_PROGRAM_ID=MEFNoi1AxMeF8gHwvEz7YXV51FvKt9yj9qNQoSx8bhe
NEXT_PUBLIC_DAMM_PROGRAM_ID=94Q3mHAKvVHBqLqoNCbPbJBVchWPpLtv6vHHBLKiHF8P
```

## Key Solana Programs

These are the main programs you'll query to get pool data:

| Program | Purpose | ID |
|---------|---------|-----|
| Meteora DBC | Bonding curve creation/management | MEFNoi1AxMeF8gHwvEz7YXV51FvKt9yj9qNQoSx8bhe |
| Meteora DAMM v2 | Automated market maker | 94Q3mHAKvVHBqLqoNCbPbJBVchWPpLtv6vHHBLKiHF8P |
| Token Program | SPL token transfers | TokenkegQfeZyiNwAJsyFbPVwwQQftsLr987AmpuccA |

## Monitoring & Alerts

Set up monitoring for:

1. **API Rate Limits**: Track Helius API calls and implement backoff
2. **Data Freshness**: Monitor lag between on-chain events and UI
3. **Error Rates**: Alert if indexer queries fail >5% of the time

```typescript
// Example monitoring
class IndexerMonitor {
  async trackLatency(operation: string, durationMs: number) {
    console.log(`[INDEXER] ${operation} took ${durationMs}ms`);
    if (durationMs > 5000) {
      // Alert: slow query
    }
  }
}
```

## Cost Estimation

**Monthly costs** (estimated for 10k DAU):

- **Helius**: $199-999/month
- **Magic Eden**: Custom pricing
- **Alchemy**: $199-999/month
- **QuickNode**: $50-500/month
- **Self-hosted**: Infrastructure costs (EC2, etc.)

## Testing the Integration

```bash
# 1. Set environment variables
export NEXT_PUBLIC_INDEXER_PROVIDER=helius
export NEXT_PUBLIC_INDEXER_API_KEY=your_key

# 2. Run dev server
npm run dev

# 3. Check API response
curl http://localhost:3001/api/pools

# 4. Monitor logs for indexer queries
```

## Rollback Plan

If indexer integration breaks:

1. Check `.env.local` configuration
2. Verify API key is valid and hasn't expired
3. Check rate limits haven't been exceeded
4. Fall back to mock data by setting `NEXT_PUBLIC_INDEXER_ENABLED=false`
5. Investigate logs for specific error

## Next Steps

1. **Phase 5**: Set up database (PostgreSQL/MongoDB) for caching + analytics
2. **Phase 6**: Implement webhooks for real-time pool updates
3. **Phase 7**: Add historical data storage for charting/analytics
4. **Phase 8**: Implement multi-indexer redundancy (fallback providers)

## Resources

- [Solana RPC API Docs](https://docs.solana.com/developing/clients/jsonrpc-api)
- [Helius Documentation](https://docs.helius.xyz)
- [Magic Eden API](https://developers.magiceden.io)
- [Meteora SDK](https://github.com/MeteoraDev/meteora-sdk)
- [Solana Program Library](https://spl.solana.com/)
