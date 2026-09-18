'use client';

import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletMultiButtonWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-10 h-10 sm:w-auto" />;
  }

  return (
    <div suppressHydrationWarning>
      <WalletMultiButton />
    </div>
  );
}
