import { Review, PaginatedResponse, ServiceOptions } from './types';

/**
 * Review service - handles all review data operations
 */

const MOCK_REVIEWS: Record<string, Review[]> = {
  'pool-1': [
    {
      id: 'review-1',
      reviewer: 'alice_trader',
      rating: 5,
      text: 'Excellent pool, very active community! The tokenomics are well thought out and the team is responsive to questions.',
      date: '2024-12-13',
      helpful: 23,
    },
    {
      id: 'review-2',
      reviewer: 'bob_solana',
      rating: 4,
      text: 'Good experience overall. Liquidity is solid. Would appreciate more frequent updates from the team.',
      date: '2024-12-10',
      helpful: 12,
    },
    {
      id: 'review-3',
      reviewer: 'charlie_defi',
      rating: 5,
      text: 'Professional team, transparent communication, and great community. This is how token launches should be done!',
      date: '2024-12-05',
      helpful: 45,
    },
  ],
};

class ReviewService {
  async getPoolReviews(
    poolId: string,
    options: ServiceOptions = {}
  ): Promise<PaginatedResponse<Review>> {
    // TODO: Switch to API call
    // const response = await fetch(
    //   `/api/pools/${poolId}/reviews?limit=${options.limit || 10}&offset=${options.offset || 0}&sortBy=${options.sortBy || 'helpful'}`
    // );
    // const data = await response.json();
    // return data;

    const reviews = MOCK_REVIEWS[poolId] || [];
    const { limit = 10, offset = 0, sortBy = 'helpful' } = options;

    // Sort reviews
    const sorted = [...reviews].sort((a, b) => {
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    const paginated = sorted.slice(offset, offset + limit);

    return {
      data: paginated,
      total: reviews.length,
      limit,
      offset,
    };
  }

  async getAverageRating(poolId: string): Promise<number> {
    const reviews = MOCK_REVIEWS[poolId] || [];
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  async createReview(
    poolId: string,
    review: Omit<Review, 'id' | 'helpful'>
  ): Promise<Review> {
    // TODO: Switch to API call
    // const response = await fetch(`/api/pools/${poolId}/reviews`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(review),
    // });
    // const data = await response.json();
    // return data.data;

    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      helpful: 0,
    };

    if (!MOCK_REVIEWS[poolId]) {
      MOCK_REVIEWS[poolId] = [];
    }

    MOCK_REVIEWS[poolId].push(newReview);
    return newReview;
  }

  async markHelpful(poolId: string, reviewId: string): Promise<void> {
    // TODO: Switch to API call
    // await fetch(`/api/pools/${poolId}/reviews/${reviewId}/helpful`, {
    //   method: 'POST',
    // });

    const reviews = MOCK_REVIEWS[poolId];
    if (reviews) {
      const review = reviews.find((r) => r.id === reviewId);
      if (review) {
        review.helpful += 1;
      }
    }
  }
}

export const reviewService = new ReviewService();
