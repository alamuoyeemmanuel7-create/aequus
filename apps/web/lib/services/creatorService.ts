import { Creator, PaginatedResponse, ServiceOptions } from './types';

/**
 * Creator service - handles all creator data operations
 */

const MOCK_CREATORS: Record<string, Creator> = {
  '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg': {
    address: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
    name: 'xStocks Finance',
    bio: 'Tokenized equities on Solana. Building the future of democratic finance.',
    avatar: '🎯',
    website: 'https://xstocks.finance',
    twitter: 'https://twitter.com/xstocks',
    discord: 'https://discord.gg/xstocks',
    tokensLaunched: 12,
    totalLiquidity: 2_850_000,
    totalVolume: 15_200_000,
    totalHolders: 18_456,
    avgPerformance: 145,
    joinedDate: 'September 2024',
    verificationStatus: 'verified',
  },
};

class CreatorService {
  async getCreator(address: string): Promise<Creator | null> {
    // TODO: Switch to API call
    // const response = await fetch(`/api/creators/${address}`);
    // if (!response.ok) return null;
    // const data = await response.json();
    // return data.data;

    return MOCK_CREATORS[address] || null;
  }

  async searchCreators(query: string, options: ServiceOptions = {}): Promise<Creator[]> {
    // TODO: Switch to real search endpoint
    // const response = await fetch(`/api/search?q=${query}&type=creators`);
    // const data = await response.json();
    // return data.data.creators || [];

    return Object.values(MOCK_CREATORS).filter(
      (creator) =>
        creator.name.toLowerCase().includes(query.toLowerCase()) ||
        creator.address.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getCreatorStats(address: string) {
    // TODO: Query indexer for real stats
    const creator = await this.getCreator(address);
    if (!creator) return null;

    return {
      address,
      tokensLaunched: creator.tokensLaunched,
      totalLiquidity: creator.totalLiquidity,
      totalVolume: creator.totalVolume,
      totalHolders: creator.totalHolders,
      avgPerformance: creator.avgPerformance,
    };
  }

  async verifyCreator(address: string): Promise<boolean> {
    // TODO: Implement verification logic (check wallet ownership, reputation, etc.)
    const creator = await this.getCreator(address);
    return creator?.verificationStatus === 'verified';
  }
}

export const creatorService = new CreatorService();
