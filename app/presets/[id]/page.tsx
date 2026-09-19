'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PRESETS, getPreset } from '../../../lib/curvePresets';

export default function PresetDetailPage({ params }: { params: { id: string } }) {
  const preset = getPreset(params.id);
  const { connected, publicKey } = useWallet();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedTx, setDeployedTx] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!preset) {
    return (
      <div className="space-y-6 py-12">
        <a href="/" className="text-violet-400 hover:text-violet-300">
          ← Back to presets
        </a>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-2xl font-bold text-red-400">Preset not found</h1>
        </div>
      </div>
    );
  }

  const handleDeploy = async () => {
    if (!connected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setIsDeploying(true);
    setError(null);

    try {
      // Simulate deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock transaction hash
      const mockTx = 'tx_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setDeployedTx(mockTx);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6 py-12">
      <a href="/" className="text-violet-400 hover:text-violet-300">
        ← Back to presets
      </a>
      
      <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-8 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{preset.meta.name}</h1>
              <p className="text-white/60">{preset.meta.tagline}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              preset.meta.premium 
                ? 'bg-amber-500/20 text-amber-300' 
                : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {preset.meta.premium ? `${preset.meta.priceSol} SOL` : 'Free'}
            </span>
          </div>
          <p className="text-violet-200">{preset.meta.description}</p>
        </div>

        {/* Rationale */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-violet-300">Why This Preset?</h2>
          <ul className="space-y-2">
            {preset.meta.rationale.map((reason, i) => (
              <li key={i} className="text-white/80 flex gap-3">
                <span className="text-emerald-400 flex-shrink-0">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-violet-300 mb-2">Price Checkpoints</h2>
            <pre className="bg-black/50 rounded p-4 text-sm text-violet-100 overflow-x-auto">
              {JSON.stringify(preset.sim.sqrtPriceCheckpoints, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-violet-300 mb-2">Fee Configuration</h2>
            <div className="bg-black/50 rounded p-4 text-sm text-violet-100 space-y-2">
              <p>Mode: <span className="text-violet-300 font-mono">{preset.sim.baseFee.mode}</span></p>
              {preset.sim.baseFee.startingFeeBps && (
                <p>Starting Fee: <span className="text-violet-300 font-mono">{preset.sim.baseFee.startingFeeBps} bps</span></p>
              )}
              {preset.sim.baseFee.endingFeeBps && (
                <p>Ending Fee: <span className="text-violet-300 font-mono">{preset.sim.baseFee.endingFeeBps} bps</span></p>
              )}
              <p>Migration Fee: <span className="text-violet-300 font-mono">{preset.sim.migrationFeeBps} bps</span></p>
              {preset.sim.baseFee.numberOfPeriod && (
                <p>Periods: <span className="text-violet-300 font-mono">{preset.sim.baseFee.numberOfPeriod}</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Wallet Status & Deploy */}
        <div className="border-t border-violet-500/20 pt-6 space-y-4">
          {connected && publicKey ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Wallet Connected</span>
                </div>
                <p className="text-xs text-emerald-200/70 font-mono">{publicKey.toBase58()}</p>
              </div>

              {deployedTx ? (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-lg space-y-3">
                  <div>
                    <h3 className="font-bold text-emerald-300 mb-2">✓ Deployment Successful!</h3>
                    <p className="text-sm text-emerald-200/80 mb-2">Your {preset.meta.name} preset has been deployed to Solana.</p>
                    <div className="bg-black/30 rounded p-3 text-xs font-mono text-emerald-300/80 break-all">
                      {deployedTx}
                    </div>
                  </div>
                  <a 
                    href={`https://solscan.io/tx/${deployedTx}?cluster=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-300 hover:text-emerald-200 underline"
                  >
                    View on Solscan →
                  </a>
                  <button
                    onClick={() => setDeployedTx(null)}
                    className="w-full px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                  >
                    Deploy Another Preset
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition flex items-center justify-center gap-2"
                >
                  {isDeploying ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Deploying...
                    </>
                  ) : (
                    <>🚀 Deploy This Preset</>
                  )}
                </button>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-300 mb-3">Connect your wallet to deploy this preset</p>
              <p className="text-xs text-amber-200/70">Look for the wallet button in the top right corner of the page.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-lg bg-white/[0.02] border border-white/5">
        <div>
          <p className="text-xs text-white/50">Asset Class</p>
          <p className="text-sm font-bold text-white mt-1">{preset.meta.assetClass.replace('-', ' ')}</p>
        </div>
        <div>
          <p className="text-xs text-white/50">Supply</p>
          <p className="text-sm font-bold text-white mt-1">{(preset.sim.totalTokenSupply / 1_000_000_000).toFixed(0)}B tokens</p>
        </div>
        <div>
          <p className="text-xs text-white/50">Built For</p>
          <p className="text-sm font-bold text-white mt-1">Meteora DBC</p>
        </div>
      </div>
    </div>
  );
}
