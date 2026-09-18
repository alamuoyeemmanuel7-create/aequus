'use client';

import { memo, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { simulatePriceCurve } from '@aequus/curve-presets';
import type { CurveSimInput } from '@aequus/curve-presets';

// Lazy load the entire chart component
const ChartContent = dynamic(
  async () => {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = await import('recharts');
    
    return {
      default: ({ data }: { data: any[] }) => (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
            <XAxis
              dataKey="progress"
              tickFormatter={(v) => `${v}%`}
              stroke="#8888a0"
              label={{ value: 'Curve progress', position: 'insideBottom', offset: -4, fill: '#8888a0' }}
            />
            <YAxis
              stroke="#8888a0"
              tickFormatter={(v) => v.toExponential(1)}
              width={70}
              label={{ value: 'Price (quote/base)', angle: -90, position: 'insideLeft', fill: '#8888a0' }}
            />
            <Tooltip
              formatter={(v: number) => v.toExponential(3)}
              labelFormatter={(v) => `${v}% sold`}
              contentStyle={{ background: '#16161d', border: '1px solid #2a2a35' }}
            />
            <Line type="monotone" dataKey="price" stroke="#7c5cff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ),
    };
  },
  { 
    ssr: false,
    loading: () => <div className="h-64 w-full bg-white/5 rounded animate-pulse" />
  }
);

interface CurveChartProps {
  sim: CurveSimInput;
}

function CurveChartInner({ sim }: CurveChartProps) {
  const data = useMemo(() => 
    simulatePriceCurve(sim).map((p) => ({
      progress: Math.round(p.progress * 100),
      price: p.price,
    })),
    [sim]
  );

  return (
    <div className="h-64 w-full">
      <Suspense fallback={<div className="h-64 w-full bg-white/5 rounded animate-pulse" />}>
        <ChartContent data={data} />
      </Suspense>
    </div>
  );
}

export const CurveChart = memo(CurveChartInner);
