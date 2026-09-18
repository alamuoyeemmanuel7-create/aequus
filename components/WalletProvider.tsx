'use client';

import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as AdapterWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ?? 'https://api.devnet.solana.com';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => {
    // Defer wallet adapter imports to reduce initial bundle size
    // Only import when actually needed (when wallet modal is opened)
    return [];
  }, []);

  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <AdapterWalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </AdapterWalletProvider>
    </ConnectionProvider>
  );
}
