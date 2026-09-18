import { Pool, PoolDetail, PaginatedResponse, ServiceOptions } from './types';

/**
 * Pool service - handles all pool data operations
 * Can be switched between mock, API, or indexer implementations
 */

const MOCK_POOLS: Pool[] = [
  {
    id: 'pool-1',
    name: 'xStocks Finance',
    symbol: 'xSTK',
    preset: 'stock-discovery',
    presetLabel: 'Stock Discovery',
    launchDate: '2024-12-15',
    poolAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    baseTokenPrice: 0.00012,
    liquidityUsd: 250000,
    volume24h: 45000,
    holders: 1234,
    status: 'active',
    reviewCount: 3,
    avgRating: 4.7,
    creatorAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
  },
];

const MOCK_POOL_DETAILS: Record<string, PoolDetail> = {
  'pool-1': {
    id: 'pool-1',
    name: 'xStocks Finance',
    symbol: 'xSTK',
    preset: 'stock-discovery',
    presetLabel: 'Stock Discovery',
    launchDate: '2024-12-15',
    poolAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    baseTokenPrice: 0.00012,
    liquidityUsd: 250000,
    volume24h: 45000,
    holders: 1234,
    status: 'active',
    reviewCount: 3,
    avgRating: 4.7,
    creatorAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    creator: 'xStocks Inc',
    description: 'A tokenized representation of a curated basket of US tech stocks on Solana.',
    priceChange24h: 3.5,
    curveProgress: 45,
  },
};

class PoolService {
  async listPools(options: ServiceOptions = {}): Promise<PaginatedResponse<Pool>> {
    // TODO: Switch to API call
    // const response = await fetch(`/api/pools?limit=${options.limit || 20}&offset=${options.offset || 0}`);
    // const data = await response.json();
    // return data;

    // For now, return mock data
    const { limit = 20, offset = 0 } = options;
    const paginated = MOCK_POOLS.slice(offset, offset + limit);

    return {
      data: paginated,
      total: MOCK_POOLS.length,
      limit,
      offset,
    };
  }

  async getPool(id: string): Promise<PoolDetail | null> {
    // TODO: Switch to API call
    // const response = await fetch(`/api/pools/${id}`);
    // if (!response.ok) return null;
    // const data = await response.json();
    // return data.data;

    return MOCK_POOL_DETAILS[id] || null;
  }

  async searchPools(query: string, options: ServiceOptions = {}): Promise<Pool[]> {
    // TODO: Switch to real search endpoint
    // const response = await fetch(`/api/search?q=${query}&type=pools`);
    // const data = await response.json();
    // return data.data.pools || [];

    return MOCK_POOLS.filter(
      (pool) =>
        pool.name.toLowerCase().includes(query.toLowerCase()) ||
        pool.symbol.toLowerCase().includes(query.toLowerCase())
    );
  }

  async filterPools(filters: Record<string, any>, options: ServiceOptions = {}): Promise<Pool[]> {
    // TODO: Switch to API call with filter params
    // const params = new URLSearchParams({
    //   preset: filters.preset || '',
    //   status: filters.status || '',
    //   minLiquidity: filters.minLiquidity || '',
    //   maxLiquidity: filters.maxLiquidity || '',
    // });
    // const response = await fetch(`/api/pools?${params}`);
    // const data = await response.json();
    // return data.data;

    return MOCK_POOLS.filter((pool) => {
      if (filters.preset && pool.preset !== filters.preset) return false;
      if (filters.status && pool.status !== filters.status) return false;
      if (filters.minLiquidity && pool.liquidityUsd < filters.minLiquidity) return false;
      if (filters.maxLiquidity && pool.liquidityUsd > filters.maxLiquidity) return false;
      return true;
    });
  }

  async getPoolsByCreator(creatorAddress: string): Promise<Pool[]> {
    // TODO: Switch to API call
    // const response = await fetch(`/api/creators/${creatorAddress}/pools`);
    // const data = await response.json();
    // return data.data;

    return MOCK_POOLS.filter((pool) => pool.creatorAddress === creatorAddress);
  }
}

export const poolService = new PoolService();
