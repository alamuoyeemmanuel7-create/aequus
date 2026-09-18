import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/pools/[id]/reviews
 * Get reviews for a specific pool
 * Query params:
 *   - sortBy: sort option (helpful, rating, recent)
 *   - limit: results per page (default: 10)
 *   - offset: pagination offset (default: 0)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get('sortBy') || 'helpful';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // TODO: Replace with real database query
    const reviews = [
      {
        id: 'review-1',
        reviewer: 'alice_trader',
        rating: 5,
        text: 'Excellent pool, very active community! The tokenomics are well thought out.',
        date: '2024-12-13',
        helpful: 23,
      },
      {
        id: 'review-2',
        reviewer: 'bob_solana',
        rating: 4,
        text: 'Good experience overall. Liquidity is solid.',
        date: '2024-12-10',
        helpful: 12,
      },
    ];

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        limit,
        offset,
        total: reviews.length,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

/**
 * POST /api/pools/[id]/reviews
 * Create a new review for a pool
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { text, rating, reviewerAddress } = body;

    // Validation
    if (!text || !rating || !reviewerAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // TODO: Save to database, verify wallet ownership
    const newReview = {
      id: `review-${Date.now()}`,
      reviewer: reviewerAddress.slice(0, 8),
      rating,
      text,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    return NextResponse.json(
      { success: true, data: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ success: false, error: 'Failed to create review' }, { status: 500 });
  }
}
