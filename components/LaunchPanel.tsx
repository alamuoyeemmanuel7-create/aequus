'use client';

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { Preset } from '@aequus/curve-presets';
import { createConfigForPreset, createPoolForConfig } from '../lib/dbc';
import { unlockPreset } from '../lib/marketplace';
import { uploadTokenMetadata } from '../lib/metadata';
import { PoolStatus } from './PoolStatus';

type Step =
  | 'idle'
  | 'unlocking'
  | 'creating-config'
  | 'uploading-metadata'
  | 'creating-pool'
  | 'done'
  | 'error';

interface AdvancedParams {
  initialPrice: string;
  migrationFee: string;
  supplyCap: string;
  launchDate: string;
  useAdvanced: boolean;
}

const PRESET_DEFAULTS: Record<string, Partial<AdvancedParams>> = {
  'stock-discovery': { initialPrice: '0.001', migrationFee: '20', supplyCap: '1000000' },
  'rwa-steady': { initialPrice: '1.0', migrationFee: '25', supplyCap: '500000' },
  'icm-fast': { initialPrice: '0.0001', migrationFee: '15', supplyCap: '5000000' },
  'meme-classic': { initialPrice: '0.00001', migrationFee: '30', supplyCap: '1000000000' },
};

export function LaunchPanel({ preset }: { preset: Preset }) {
  const { meta } = preset;
  const { connection } = useConnection();
  const wallet = useWallet();

  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState<string | null>(null);
  const [configPubkey, setConfigPubkey] = useState<string | null>(null);
  const [pool, setPool] = useState<{ mint: string; pool: string } | null>(null);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Advanced parameters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const presetDefaults = PRESET_DEFAULTS[meta.id] || {};
  const [advancedParams, setAdvancedParams] = useState<AdvancedParams>({
    initialPrice: presetDefaults.initialPrice || '0.001',
    migrationFee: presetDefaults.migrationFee || '20',
    supplyCap: presetDefaults.supplyCap || '1000000',
    launchDate: '',
    useAdvanced: false,
  });

  const canSign = wallet.connected && wallet.publicKey && wallet.signTransaction;

  async function handleCreateConfig() {
    if (!canSign) return;
    setError(null);
    try {
      if (meta.premium) {
        setStep('unlocking');
        await unlockPreset(connection, meta.id, meta.priceSol ?? 0, {
          publicKey: wallet.publicKey!,
          signTransaction: wallet.signTransaction!,
        });
      }
      setStep('creating-config');
      const { configPubkey } = await createConfigForPreset(meta.id, {
        publicKey: wallet.publicKey!,
        signTransaction: wallet.signTransaction!,
      });
      setConfigPubkey(configPubkey.toBase58());
      setStep('idle');
    } catch (e: any) {
      setError(e.message ?? String(e));
      setStep('error');
    }
  }

  async function handleCreatePool() {
    if (!canSign || !configPubkey || !name || !symbol || !image) return;
    setError(null);
    try {
      setStep('uploading-metadata');
      const uri = await uploadTokenMetadata(
        { name, symbol, description, image, assetClass: meta.assetClass },
        { publicKey: wallet.publicKey!, signTransaction: wallet.signTransaction!, signMessage: (wallet as any).signMessage }
      );

      setStep('creating-pool');
      const { PublicKey } = await import('@solana/web3.js');
      const result = await createPoolForConfig(
        new PublicKey(configPubkey),
        name,
        symbol,
        uri,
        { publicKey: wallet.publicKey!, signTransaction: wallet.signTransaction! }
      );
      setPool({ mint: result.mint.toBase58(), pool: result.pool.toBase58() });
      setStep('done');
    } catch (e: any) {
      setError(e.message ?? String(e));
      setStep('error');
    }
  }

  return (
    <section className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/[0.06] p-5">
      <h2 className="mb-1 text-sm font-semibold text-white/70">Launch with this preset</h2>
      <p className="mb-4 text-sm text-white/50">
        {meta.premium
          ? `This is a premium preset (${meta.priceSol} SOL to unlock). Unlocking and config creation are two separate signed transactions.`
          : 'Free preset — creating the config is a single signed transaction.'}
      </p>

      {!wallet.connected && (
        <p className="text-sm text-amber-300">Connect a wallet above to continue.</p>
      )}

      {wallet.connected && !configPubkey && (
        <div className="space-y-3">
          {/* Advanced Parameters Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-violet-400 hover:text-violet-300 transition font-medium"
          >
            {showAdvanced ? '▼ Hide' : '▶ Show'} Advanced Parameters
          </button>

          {/* Advanced Parameters Section */}
          {showAdvanced && (
            <div className="space-y-3 p-3 rounded-lg border border-white/10 bg-black/20">
              <div className="text-xs text-white/60 mb-2">
                <p className="font-semibold mb-1">Customize launch parameters:</p>
              </div>

              {/* Initial Price */}
              <div>
                <label className="block text-xs text-white/70 mb-1">Initial Price (SOL)</label>
                <input
                  type="number"
                  step="0.00001"
                  value={advancedParams.initialPrice}
                  onChange={(e) =>
                    setAdvancedParams({ ...advancedParams, initialPrice: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
                  placeholder="0.001"
                />
                <p className="text-xs text-white/50 mt-1">
                  Default for {meta.id}: {presetDefaults.initialPrice}
                </p>
              </div>

              {/* Migration Fee */}
              <div>
                <label className="block text-xs text-white/70 mb-1">Migration Fee (bps)</label>
                <input
                  type="number"
                  step="1"
                  value={advancedParams.migrationFee}
                  onChange={(e) =>
                    setAdvancedParams({ ...advancedParams, migrationFee: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
                  placeholder="20"
                />
                <p className="text-xs text-white/50 mt-1">
                  Default: {presetDefaults.migrationFee} bps (0.{presetDefaults.migrationFee}%)
                </p>
              </div>

              {/* Supply Cap */}
              <div>
                <label className="block text-xs text-white/70 mb-1">Supply Cap</label>
                <input
                  type="number"
                  step="1000"
                  value={advancedParams.supplyCap}
                  onChange={(e) =>
                    setAdvancedParams({ ...advancedParams, supplyCap: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
                  placeholder="1000000"
                />
                <p className="text-xs text-white/50 mt-1">
                  Default: {presetDefaults.supplyCap}
                </p>
              </div>

              {/* Launch Date */}
              <div>
                <label className="block text-xs text-white/70 mb-1">Launch Date (Optional)</label>
                <input
                  type="datetime-local"
                  value={advancedParams.launchDate}
                  onChange={(e) =>
                    setAdvancedParams({ ...advancedParams, launchDate: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-violet-400"
                />
                <p className="text-xs text-white/50 mt-1">
                  Leave empty for immediate launch
                </p>
              </div>

              {/* Parameter Summary */}
              <div className="p-2 rounded bg-white/5 border border-white/5 text-xs text-white/70 space-y-1">
                <p>
                  <strong>Summary:</strong> Your pool will start at ${advancedParams.initialPrice}/token with{' '}
                  {advancedParams.migrationFee} bps fee and a {Number(advancedParams.supplyCap).toLocaleString()} token supply cap.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleCreateConfig}
            disabled={step === 'unlocking' || step === 'creating-config'}
            className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400 disabled:opacity-50 w-full"
          >
            {step === 'unlocking'
              ? 'Unlocking…'
              : step === 'creating-config'
                ? 'Creating config…'
                : meta.premium
                  ? `Unlock (${meta.priceSol} SOL) & create config`
                  : 'Create config'}
          </button>
        </div>
      )}

      {configPubkey && !pool && (
        <div className="space-y-3">
          <p className="text-sm text-emerald-300">
            Config created: <code className="text-emerald-200 text-xs break-all">{configPubkey}</code>
          </p>
          <div className="flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Token name"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-violet-400"
            />
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Symbol (e.g., SYMBOL)"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-violet-400"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (goes into the token's on-chain metadata)"
            rows={2}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-violet-400"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-white"
            />
            <button
              onClick={handleCreatePool}
              disabled={!name || !symbol || !image || step === 'uploading-metadata' || step === 'creating-pool'}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400 disabled:opacity-50 whitespace-nowrap"
            >
              {step === 'uploading-metadata'
                ? 'Uploading metadata…'
                : step === 'creating-pool'
                  ? 'Creating pool…'
                  : 'Upload metadata, create pool & mint token'}
            </button>
          </div>
        </div>
      )}

      {pool && (
        <div className="mt-4 space-y-3">
          <div className="space-y-1 text-sm text-emerald-300">
            <p>🎉 Pool live on this curve.</p>
            <p>
              Mint: <code className="text-emerald-200 text-xs break-all">{pool.mint}</code>
            </p>
            <p>
              Pool: <code className="text-emerald-200 text-xs break-all">{pool.pool}</code>
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <PoolStatus poolAddress={pool.pool} />
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </section>
  );
}
