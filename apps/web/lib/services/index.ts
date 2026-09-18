/**
 * Data services barrel export
 * Use these services to access all data throughout the app
 *
 * Example usage:
 * import { poolService, creatorService, reviewService } from '@/lib/services';
 *
 * const pools = await poolService.listPools();
 * const creator = await creatorService.getCreator(address);
 * const reviews = await reviewService.getPoolReviews(poolId);
 */

export { poolService } from './poolService';
export { creatorService } from './creatorService';
export { reviewService } from './reviewService';
export type { Pool, PoolDetail, Creator, Review, PaginatedResponse, SearchResult } from './types';
