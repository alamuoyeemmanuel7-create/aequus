'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletMultiButtonWrapper() {
  const [isMounted, setIsMounted] = useState(false);
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-10 h-10 sm:w-auto" />;
  }

  return (
    <div className="flex items-center gap-2">
      {connected && publicKey && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-600/20 border border-violet-500/50">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono text-violet-300">
            {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}
          </span>
        </div>
      )}
      <div suppressHydrationWarning className="flex">
        <WalletMultiButton className="!rounded-lg !bg-violet-600 hover:!bg-violet-700 !text-white" />
      </div>
    </div>
  );
}
