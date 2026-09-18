import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/pools/[id]
 * Get detailed information about a specific pool
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with real indexer query
    // For now, return mock data structure
    const pool = {
      id,
      name: 'xStocks Finance',
      symbol: 'xSTK',
      preset: 'Stock Discovery',
      presetId: 'stock-discovery',
      launchDate: '2024-12-15',
      poolAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
      creatorAddress: '7xMKoTq8B8xjezLZQsxGo3F3FkHEYakUeGjVEFHFcCg',
      creator: 'xStocks Inc',
      status: 'active',
      description: 'A tokenized representation of a curated basket of US tech stocks on Solana.',
      baseTokenPrice: 0.00012,
      priceChange24h: 3.5,
      liquidityUsd: 250000,
      volume24h: 45000,
      holders: 1234,
      curveProgress: 45,
      reviewCount: 3,
      avgRating: 4.7,
    };

    if (!pool) {
      return NextResponse.json({ success: false, error: 'Pool not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: pool,
    });
  } catch (error) {
    console.error('Error fetching pool:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pool' }, { status: 500 });
  }
}
