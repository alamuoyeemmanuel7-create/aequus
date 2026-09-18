# Aequus — a DBC curve preset marketplace for new asset classes

Built for the Meteora hackathon brief: *"more innovative launchpads"* on top of
Dynamic Bonding Curve (DBC) + DAMM v2.

## The idea

Standard bonding-curve launchpads (pump.fun-style) tune everything for one
asset class: fast, speculative memecoins. That's the wrong shape for a
thinly-traded tokenized equity, or an RWA that's supposed to track an
off-chain NAV instead of running up a speculative curve.

**Aequus is a small library + marketplace of named, opinionated DBC configs,
each tuned for a specific asset class**, plus a UI where builders can preview
the exact price and fee behavior of a preset before they commit capital to
it, and pay a small SOL fee to unlock premium presets.

| Preset | Asset class | What's different from a standard meme curve |
|---|---|---|
| **Stock Discovery** | Tokenized equities | Long, 6-checkpoint curve + DBC's `RateLimiter` base fee mode (fee scales with *buy size*, not time) so a whale can't gap the opening price in one block. Migrates to DAMM v2 with a higher fixed fee tier + dynamic fees to compensate LPs for thinner post-launch volume. |
| **RWA Steady** | Real-world assets | Near-flat curve, flat low fee, no scheduler decay — the curve shouldn't be a speculative instrument for an asset with an intrinsic reference value. |
| **ICM Fast** | Internet capital markets | Standard steep exponential curve, aggressive anti-bot fee scheduler — for launches that want speed. |
| **Meme Classic** | Memes | The familiar exponential baseline, included so builders can A/B new presets against it. |

This maps directly onto two of the brief's requested tracks — **"Launch
Mechanics tuned for Equity/Stocks paired launches"** and **"DBC Config Preset
Marketplace"** — while using a genuinely novel DBC fee mode (`RateLimiter`)
for a purpose it wasn't originally designed for (anti-whale price discovery
for RWAs/equities, not just anti-sniper memecoin protection).

## How it maps to the judging criteria

- **Depth of Meteora integration** — the entire product *is* a DBC config. Every
  preset is built with `buildCurveWithCustomSqrtPrices` from the real DBC TS
  SDK, and the "launch" flow calls `client.partner.createConfig` and
  `client.creator.createPool` directly. Migration targets DAMM v2
  (`MigrationOption.MET_DAMM_V2`) with per-preset dynamic-fee settings.
- **Originality/taste** — repurposes `RateLimiter` (documented by Meteora as
  an anti-sniper tool) as an equity/RWA price-discovery primitive. This isn't
  tied to the current meme-stock cycle — it's infrastructure other launchpad
  builders can fork and reuse indefinitely.
- **Technical execution** — a typed preset library separated from the UI, a
  dependency-free simulator so the frontend can chart curve/fee behavior
  without an RPC round-trip, and CLI scripts that mirror the exact
  transactions the UI sends (useful for anyone scripting a launch instead of
  clicking through a browser).
- **Impact potential** — a preset marketplace is reusable infra: any team
  building a launchpad for a new asset class can pay to use (or fork) a
  preset instead of hand-tuning curve math from scratch.

## Repo layout

```
aequus/
├── packages/
│   ├── curve-presets/         # The core IP: DBC config builders + simulator
│   │   └── src/
│   │       ├── types.ts       # Preset/CurveSimInput types
│   │       ├── presets.ts     # The 4 presets, built with the real DBC SDK
│   │       ├── simulate.ts    # Pure-math price/fee simulator for charts
│   │       └── index.ts
│   └── damm-compounder/       # DAMM v2 auto-compounding liquidity keeper
│       └── src/compound.ts    # claimPositionFee2 → addLiquidity, using @meteora-ag/cp-amm-sdk
├── apps/web/                  # Next.js marketplace UI
│   ├── app/                   # Landing page + preset detail page
│   ├── components/            # Charts, wallet button, launch flow, live pool status
│   └── lib/
│       ├── dbc.ts             # Wallet-driven createConfig/createPool calls
│       ├── marketplace.ts     # Pay-to-unlock gate for premium presets
│       └── metadata.ts        # Irys upload for real token image + JSON metadata
└── scripts/                   # CLI: create-config.ts, create-pool.ts, compound-liquidity.ts
```

## Compounding Liquidity (DAMM v2)

`packages/damm-compounder` answers one of the brief's "creative end-to-end
launch flows" prompts directly: once a preset's DBC pool graduates into DAMM
v2, its partner-locked LP position accrues trading fees that otherwise just
sit there until someone remembers to claim them. `compoundPosition()` claims
those fees via `claimPositionFee2` and immediately re-deposits them into the
same position via `addLiquidity`, so the pool's own trading activity grows
its liquidity over time instead of leaking value to whoever claims first.

Run it once, or as a keeper loop:

```bash
RPC_URL=https://api.mainnet-beta.solana.com \
KEYPAIR_PATH=~/.config/solana/id.json \
pnpm compound-liquidity <DAMM_V2_POOL_PUBKEY> --loop --interval-min=30
```

## Live pool status + real metadata

Two things that make the launch flow feel finished rather than a demo:

- **`components/PoolStatus.tsx`** polls the SDK's own read helpers
  (`getPoolQuoteTokenCurveProgress`, `getPoolBaseTokenCurveProgress`,
  `getPoolFeeMetrics`) every 8s once a pool exists, so the preset detail page
  shows *live* curve progress next to the pre-launch simulation chart.
- **`lib/metadata.ts`** uploads the creator's chosen image + description to
  Arweave via Irys before `createPool` runs, so launched tokens carry real
  Metaplex-compatible metadata instead of a placeholder JSON URL.

## Running it

This was built in a sandboxed environment without network access, so it
hasn't been `pnpm install`-ed or compiled here — treat it as a complete,
reviewed source tree to pull down and run, not a tested build. Two things to
check first:

1. **SDK field names.** The DBC TS SDK is under active development. The code
   here targets the public shape documented at
   `docs.meteora.ag/developer-guides/dbc/typescript-sdk/{examples,reference}`
   as of writing (`rateLimiterParam`, `feeSchedulerParam`, the `BaseFeeMode` /
   `MigrationOption` / `DammV2*` enums, etc.). After `pnpm install`, run
   `pnpm typecheck` first — if the installed SDK version renamed a field,
   TypeScript will point at the exact line in `packages/curve-presets/src/presets.ts`.
2. **Treasury + RPC.** Copy `.env.example` to `.env.local` in `apps/web/` and
   fill in a real RPC URL and a treasury pubkey you control.

```bash
pnpm install
cp .env.example apps/web/.env.local   # then edit it
pnpm typecheck
pnpm dev                              # http://localhost:3000

# or, from the CLI, without the UI:
RPC_URL=https://api.devnet.solana.com \
KEYPAIR_PATH=~/.config/solana/id.json \
pnpm create-config stock-discovery

pnpm create-pool <CONFIG_PUBKEY> "My Tokenized Stock" MSTK
```

## What's stubbed vs. real

- **Real**: the curve/fee math in every preset; the SDK calls in `lib/dbc.ts`
  and `scripts/*.ts` (correct instruction sequence per the DBC docs: generate
  a config keypair → `createConfig` → `createPool` → derive pool address with
  `deriveDbcPoolAddress`); the price/fee simulator; the DAMM v2 compounding
  keeper (`claimPositionFee2` → `getDepositQuote` → `addLiquidity`); the Irys
  metadata upload; and the live curve-progress polling.
- **Stubbed for hackathon scope**: preset "unlock" state is checked by
  scanning recent treasury transactions for a memo rather than an
  indexer/DB; there's no revenue share back to third-party preset authors
  yet (the marketplace only ships Meteora-team-authored presets); the
  compounding keeper assumes a single owner-held position rather than
  discovering all locked partner positions across many launches.

## Next steps toward mainnet

1. Open the marketplace to third-party preset submissions with a review flow
   and a revenue split on unlock payments.
2. Add a DLMM "Conviction Pool" flow for creators who want concentrated
   liquidity instead of a DAMM v2 pool after migration — the other
   end-to-end flow idea from the brief.
3. Replace the memo-scan unlock check with a small indexer (or a Meteora-side
   webhook) so unlock state doesn't depend on scanning recent signatures.
4. Turn `compound-liquidity.ts` into a hosted keeper (cron job / Railway
   worker) that discovers every partner-locked position across all Aequus
   launches automatically, instead of taking one pool address per run.
