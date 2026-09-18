import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/search
 * Search across pools, creators, and tokens
 * Query params:
 *   - q: search query (required)
 *   - type: filter by type (pools, creators, all) (default: all)
 *   - limit: results per page (default: 10)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // TODO: Replace with real search index (Meilisearch, Elasticsearch, etc.)
    const results = {
      pools: [
        {
          id: 'pool-1',
          name: 'xStocks Finance',
          symbol: 'xSTK',
          type: 'pool',
          liquidityUsd: 250000,
          volume24h: 45000,
        },
      ],
      creators: [
        {
          address: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
          name: 'xStocks Finance',
          type: 'creator',
          tokensLaunched: 12,
          totalLiquidity: 2_850_000,
        },
      ],
    };

    const filtered =
      type === 'pools'
        ? { pools: results.pools }
        : type === 'creators'
          ? { creators: results.creators }
          : results;

    return NextResponse.json({
      success: true,
      data: filtered,
      query,
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 });
  }
}
