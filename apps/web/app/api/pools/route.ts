import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/pools
 * List all pools with optional filtering and sorting
 * Query params:
 *   - preset: filter by preset (stock-discovery, rwa-steady, icm-fast, meme-classic)
 *   - status: filter by status (active, graduated, completed)
 *   - minLiquidity: minimum liquidity in USD
 *   - maxLiquidity: maximum liquidity in USD
 *   - search: search by name or symbol
 *   - sortBy: sort option (latest, liquidity, volume, holders, price)
 *   - limit: results per page (default: 20)
 *   - offset: pagination offset (default: 0)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const preset = searchParams.get('preset');
    const status = searchParams.get('status');
    const minLiquidity = searchParams.get('minLiquidity');
    const maxLiquidity = searchParams.get('maxLiquidity');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'latest';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // TODO: Replace with real indexer query
    // For now, return mock data structure
    const pools = [
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
        status: 'active' as const,
        reviewCount: 3,
        avgRating: 4.7,
      },
    ];

    return NextResponse.json({
      success: true,
      data: pools,
      pagination: {
        limit,
        offset,
        total: pools.length,
      },
    });
  } catch (error) {
    console.error('Error fetching pools:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pools' }, { status: 500 });
  }
}
