'use client';

import { memo, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { simulateFeeCurve } from '../lib/curvePresets';
import type { Preset } from '../lib/curvePresets';

interface FeeChartProps {
  preset: Preset;
}

function FeeChartInner({ preset }: FeeChartProps) {
  const isRateLimiter = preset.sim.baseFee.mode === 'rate-limiter';
  
  const data = useMemo(() => 
    simulateFeeCurve(preset.sim).map((p) => ({
      x: p.x,
      feeBps: p.feeBps,
      feePct: (p.feeBps / 100).toFixed(2),
    })),
    [preset.sim]
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
        <XAxis
          dataKey="x"
          stroke="#8888a0"
          tickFormatter={(v) => (isRateLimiter ? `${v} SOL` : `${v}s`)}
          label={{
            value: isRateLimiter ? 'Buy size' : 'Time since launch',
            position: 'insideBottom',
            offset: -4,
            fill: '#8888a0',
          }}
        />
        <YAxis
          stroke="#8888a0"
          tickFormatter={(v) => `${(v / 100).toFixed(0)}%`}
          width={50}
          label={{ value: 'Fee', angle: -90, position: 'insideLeft', fill: '#8888a0' }}
        />
        <Tooltip
          formatter={(v: number) => `${(v / 100).toFixed(2)}%`}
          labelFormatter={(v) => (isRateLimiter ? `Buy size: ${v} SOL` : `t = ${v}s`)}
          contentStyle={{ background: '#16161d', border: '1px solid #2a2a35' }}
        />
        <Area type="monotone" dataKey="feeBps" stroke="#ff8a5c" fill="#ff8a5c33" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const FeeChart = memo(FeeChartInner);
