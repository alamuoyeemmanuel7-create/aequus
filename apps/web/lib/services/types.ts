/**
 * Shared types for data services
 */

export interface Pool {
  id: string;
  name: string;
  symbol: string;
  preset: string;
  presetLabel: string;
  launchDate: string;
  poolAddress: string;
  baseTokenPrice: number;
  liquidityUsd: number;
  volume24h: number;
  holders: number;
  status: 'active' | 'graduated' | 'completed';
  reviewCount?: number;
  avgRating?: number;
  creatorAddress?: string;
}

export interface PoolDetail extends Pool {
  creator: string;
  description: string;
  priceChange24h: number;
  curveProgress: number;
}

export interface Creator {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  website?: string;
  twitter?: string;
  discord?: string;
  tokensLaunched: number;
  totalLiquidity: number;
  totalVolume: number;
  totalHolders: number;
  avgPerformance: number;
  joinedDate: string;
  verificationStatus: 'verified' | 'pending' | 'none';
}

export interface Review {
  id: string;
  reviewer: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface SearchResult {
  pools?: Pool[];
  creators?: Creator[];
}

export interface ServiceOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
}
