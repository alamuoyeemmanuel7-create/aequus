# Judge Pitch: Aequus
## DBC Curve Preset Marketplace

---

## ⚡ 30-Second Elevator Pitch

**Problem:** All launchpads use the same exponential curve — optimized for memes, not for equities or RWAs.

**Solution:** Aequus provides 4 professionally-tuned bonding curve presets, each designed for a specific asset class.

**Innovation:** We repurpose DBC's RateLimiter as a price-discovery mechanism. For equity launches, fees scale with buy *size*, not time. This creates slow, fair price discovery instead of explosive volatility.

**Market:** $2B+ tokenized equities, $10B+ RWAs. All need this today.

**Status:** Production-ready, real SDK integration, ready to deploy.

---

## 🎯 Why Aequus Wins

### 1. **Solves a Real, Unaddressed Problem**
- Current state: 1 curve for all assets
- Our solution: 4 curves for 4 asset classes
- Impact: Enables serious assets (equities, RWAs) to launch fairly on Solana

### 2. **Novel DBC Innovation**
- **Discovery:** RateLimiter was designed for anti-sniping (memes)
- **Our use:** Price-discovery mechanism (equities/RWAs)
- **Why it matters:** Fees scale with buy SIZE, not time
- **Result:** Fair price discovery without explosive volatility

### 3. **Production-Ready, Not Theoretical**
- Built with real Meteora DBC SDK
- Tested curve parameters
- Live migration path to DAMM v2
- Can deploy to testnet today

### 4. **Marketplace Model**
- Premium presets (equities, RWAs) generate revenue
- Free presets (ICM, memes) drive adoption
- Sustainable ecosystem

### 5. **Extensible Infrastructure**
- Builders can add custom presets
- Reusable preset library
- Not locked to one use case

---

## 📊 The 4 Presets

### Stock Discovery — Tokenized Equities
```
Problem: Equities gap 10x in 1 block due to exponential curves
Solution: 6-checkpoint long curve + RateLimiter fees (size-based)
Result: Slow, fair price discovery over hours
Fee: 2 SOL (premium)
```

### RWA Steady — Real-World Assets
```
Problem: Treasury bills shouldn't 100x speculative curves
Solution: Nearly-flat curve + flat fees (no time-decay)
Result: NAV tracking, stable pricing
Fee: 2 SOL (premium)
```

### ICM Fast — Fast Launches
```
Problem: Some launches need speed AND anti-bot protection
Solution: Steep exponential + aggressive fee scheduler
Result: Fast launch with protection
Fee: Free
```

### Meme Classic — Reference Baseline
```
Purpose: Every preset needs a known reference
Solution: Standard exponential + fee scheduler
Result: Easy comparison and A/B testing
Fee: Free
```

---

## 💡 Technical Innovation

### The RateLimiter Innovation

**Original Purpose (from Meteora docs):**
- Anti-sniper tool for meme launches
- Fees spike when buy size exceeds reference amount
- Protects early LPs from rug pulls

**Our Repurposing:**
- Price-discovery mechanism for equities
- Fees scale with buy SIZE, not time
- Slow, fair discovery instead of explosive volatility
- Enables "serious" assets on Solana

**Why this is novel:**
- Uses DBC in a way it wasn't originally designed for
- Solves equity/RWA problem that existing curves can't
- Still works for its original purpose (anti-sniping)

---

## 🏆 How Aequus Maps to Judging Criteria

### Depth of Meteora Integration ✅
- Entire product is DBC configurations
- Uses real TS SDK: `buildCurveWithCustomSqrtPrices`
- Calls `client.partner.createConfig` and `client.creator.createPool`
- Migration targets DAMM v2 with per-preset fee settings
- Not theoretical — production-quality integration

### Originality/Taste ✅
- Repurposes RateLimiter for equity/RWA use
- Not tied to current meme cycle
- Reusable infrastructure for any launchpad builder
- Novel application of existing DBC primitives

### Technical Execution ✅
- Typed preset library (TypeScript)
- Dependency-free simulator
- Frontend charts prices without RPC round-trips
- CLI scripts mirror exact transactions
- Clean, modular architecture

### Impact Potential ✅
- Marketplace model enables ecosystem
- Builders can fork and extend
- Reusable for any new asset class
- $2B+ tokenized equities market ready
- $10B+ RWA market underserved

---

## 🚀 Live Experience

**Visit:** https://aequus-web.vercel.app/

**What you'll see:**
1. Beautiful homepage explaining the problem
2. 4 preset cards with quick stats
3. Click any preset → see full details
4. "How It Works" 5-step deployment flow
5. Wallet connection status
6. Deploy button (demo mode)
7. Success confirmation
8. Professional, responsive design

**Time to interact:** <10 seconds

---

## 📈 Market Opportunity

| Market | Size | Need |
|--------|------|------|
| Tokenized Equities | $2B+ | Slow price discovery ✅ |
| Real-World Assets | $10B+ | NAV tracking ✅ |
| DeFi Launches | Millions/week | Anti-bot protection ✅ |
| DAOs | Growing | Curve flexibility ✅ |

**Why now:** Solana needs professional, asset-class-specific infrastructure. Aequus fills that gap.

---

## 🛠️ Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Next.js 14 | Fast, SSG, production-ready |
| Language | TypeScript | Type-safe, enterprise-grade |
| Styling | Tailwind CSS | Fast, responsive design |
| Blockchain | Solana | Native Web3.js integration |
| DBC | Meteora SDK | Real, production DBC |
| Deployment | Vercel | Auto-scaling, global CDN |

---

## 💰 Monetization (for future)

1. **Premium Presets** (2 SOL each)
   - Stock Discovery
   - RWA Steady

2. **Free Presets** (community adoption)
   - ICM Fast
   - Meme Classic

3. **Custom Presets** (advanced builders)
   - Revenue share with preset creators
   - Marketplace cuts 10-15%

4. **Services**
   - Launch consulting
   - Curve optimization
   - Liquidity management

---

## 🎓 What This Proves

✅ **Deep Meteora knowledge** - RateLimiter repurposing shows real understanding  
✅ **Product thinking** - Solves a real market problem  
✅ **Technical execution** - Production-quality code and UI  
✅ **Business sense** - Marketplace model that scales  
✅ **Speed** - Built in hackathon timeframe  

---

## 🏁 Call to Action for Judges

**Try it:**
1. Visit https://aequus-web.vercel.app/
2. Click a preset card
3. See the technical config
4. Understand the problem it solves
5. Check the code: https://github.com/alamuoyeemmanuel7-create/aequus

**Questions to ask:**
- Why is RateLimiter useful for equities?
- How is this different from existing launchpads?
- What's the market opportunity?
- How would this scale?

**Answers we'll give:**
- Because fees scale with buy size, creating slow, fair discovery
- 4 specialized curves vs. 1 generic curve for all assets
- $2B+ equities + $10B+ RWAs, all underserved
- Marketplace model enables any builder to deploy presets

---

## 🎯 Our Confidence

**Strength:** This solves a real problem that no one else is addressing on Solana.

**Proof:** Visit the site, see the presets, check the code.

**Opportunity:** Massive markets ready for this infrastructure.

**Execution:** Production-ready in hackathon timeframe.

---

## 📱 One More Thing

**If you have 5 more minutes:**

Read the preset configurations in the code. Notice how fundamentally different they are:
- Stock Discovery: 6 checkpoints, RateLimiter, high migration fee
- RWA Steady: 4 checkpoints, flat fee, low migration fee  
- ICM Fast: 3 checkpoints, exponential, anti-bot scheduler
- Meme Classic: standard baseline

**This isn't one curve with different parameters.** These are 4 fundamentally different financial instruments, each optimized for a different asset class.

That's the insight. That's why we'll win.

---

## 🚀 Ready to Judge

**Status:** Production-ready  
**Deployment:** Live on Vercel  
**Code:** Public on GitHub  
**Documentation:** Complete  
**Innovation:** Novel DBC use  
**Market:** Ready for real traction  

**Let's build the future of asset launches on Solana.** 🌟

---

*Built for the Crypto World's Fair Hackathon 2026*
