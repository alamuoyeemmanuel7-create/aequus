/**
 * Helius indexer client
 * Fetches real pool and transaction data from Solana via Helius API
 * Docs: https://docs.helius.xyz
 */

import { Pool } from '../services/types';

export interface HeliusConfig {
  apiKey: string;
  rpcUrl: string;
}

class HeliusClient {
  private apiKey: string;
  private rpcUrl: string;
  private baseUrl = 'https://mainnet.helius-rpc.com/';

  constructor(config: HeliusConfig) {
    this.apiKey = config.apiKey;
    this.rpcUrl = config.rpcUrl;
  }

  private getRpcUrl(): string {
    return `${this.baseUrl}?api-key=${this.apiKey}`;
  }

  /**
   * Get token metadata and stats via DAS (Digital Asset Standard) API
   */
  async getTokenMetadata(mint: string) {
    try {
      const response = await fetch(this.getRpcUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'helius-metadata',
          method: 'getAsset',
          params: {
            id: mint,
          },
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching token metadata from Helius:', error);
      return null;
    }
  }

  /**
   * Get transaction history for a pool
   * Filters for swap/trade transactions to calculate volume
   */
  async getPoolTransactions(poolAddress: string, limit = 100) {
    try {
      const response = await fetch(this.getRpcUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'helius-transactions',
          method: 'getSignaturesForAddress',
          params: [poolAddress, { limit }],
        }),
      });

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching pool transactions from Helius:', error);
      return [];
    }
  }

  /**
   * Parse transaction to extract swap/trade info
   */
  async parseSwapTransaction(signature: string) {
    try {
      const response = await fetch(this.getRpcUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'helius-parse',
          method: 'getTransaction',
          params: [
            signature,
            {
              encoding: 'jsonParsed',
              maxSupportedTransactionVersion: 0,
            },
          ],
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error parsing transaction from Helius:', error);
      return null;
    }
  }

  /**
   * Get token holders using Helius searchAssets (requires DAS API)
   */
  async getTokenHolders(mint: string) {
    try {
      const response = await fetch(this.getRpcUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'helius-holders',
          method: 'searchAssets',
          params: {
            owner_address: mint,
            page: 1,
          },
        }),
      });

      const data = await response.json();
      return data.result?.items?.length || 0;
    } catch (error) {
      console.error('Error fetching token holders from Helius:', error);
      return 0;
    }
  }

  /**
   * Get pool creation transaction to extract initial liquidity/price
   */
  async getPoolCreationData(poolAddress: string) {
    try {
      const transactions = await this.getPoolTransactions(poolAddress, 1);
      if (!transactions.length) return null;

      const creationTx = await this.parseSwapTransaction(transactions[0].signature);
      return creationTx;
    } catch (error) {
      console.error('Error fetching pool creation data:', error);
      return null;
    }
  }
}

export const createHeliusClient = (apiKey: string, rpcUrl: string): HeliusClient => {
  return new HeliusClient({ apiKey, rpcUrl });
};
