# RO’Lyfe Terminal — Project Handoff
**Updated:** 2026-10-27  
**Live app:** https://rolrichman.github.io/rolyfe-market-terminal/  
**Repository:** https://github.com/ROLRichman/rolyfe-market-terminal  
**Supabase project:** `ykmdyfbklvuoseqdjnxy`  
**Market-data function:** `market-data` — https://ykmdyfbklvuoseqdjnxy.supabase.co/functions/v1/market-data

## Purpose
Mobile-first, stock-first market research cockpit for multi-asset watchlists, provider-backed candle analysis, chart review, technical context, a cautious Sniper workflow, risk-first trade-ticket planning, and manual handoff to Thinkorswim. This is not a brokerage connection and never submits orders.

## Changes made on 2026-10-27
- Expanded the Supabase Edge Function CORS allow-header list. Deployed `market-data` version 19 with JWT verification still enabled; provider secrets were not changed.
- Removed the unnecessary `Accept: application/json` request header from the browser fetch.
- Added a visible **Retry data** control. It clears the selected symbol/timeframe's failed cached snapshot and retries through the chart loader.
- Added client-side 10-minute candle aggregation using provider-returned 5-minute OHLCV bars, because the provider endpoint does not support a native `10m` interval.
- Validated the main HTML's inline JavaScript syntax and checked for duplicate HTML IDs after these edits.

## Data integrity and signal behavior
- Technical indicators are calculated from returned OHLCV bars; missing or invalid bars must not create a signal.
- `WAIT` means the configured threshold has not triggered. It is not the same as neutral direction, and neither state means buy or sell.
- A Sniper Candidate is a review queue, not an automatic entry. Candle close, higher-timeframe context, liquidity, nearby levels, invalidation, position size and risk must be checked manually.
- The trade ticket is a worksheet only. Confirm current bid/ask, order type, quantity, expiration, contract multiplier and time-in-force in Thinkorswim before placing any order.
- The browser contains only the Supabase public/anon key required to call the function. Provider API secrets belong in Supabase Edge Function Secrets, never in GitHub Pages source.

## Current verification status
**Code-level checks passed:** JavaScript parses; no duplicate HTML IDs; the 10-minute aggregation and retry control are present; Supabase reports the function active at version 19 with JWT verification enabled.

**Live data connection is not yet confirmed after the CORS change.** The Supabase logs showed an `OPTIONS 200` preflight for the latest AAPL 5-minute request but no corresponding GET in that same request window. That pattern suggests the browser may be stopping at CORS preflight, but it does not by itself prove the exact browser-side cause. The CORS allow-header list was broadened and the redundant request header removed. A fresh page reload and a successful provider GET are still needed to confirm the fix end-to-end. Do not describe the feed as verified/live until a successful response includes a valid bar array and a plausible last-bar timestamp.

## Watchlist notes
- The **Liquid Leaders** group is the intended quick-start watchlist; other groups include the broader stock universes, crypto, forex, futures and macro symbols.
- Symbols in a group do not all have guaranteed Tickerbot coverage. Some futures, macro symbols, crypto aliases or timeframes may be unsupported by the provider. Unsupported symbols must remain `LOAD DATA` / unavailable rather than showing fabricated values.
- 10-minute bars are derived from 5-minute bars in the browser. They are not a separate native provider interval.
- Scanning is manual and page-bound; it does not continue while the page is closed. Scanner notifications use available cached analysis and should never be interpreted as an order.

## Next verification steps
1. Open the live page in a fresh tab or reload it after GitHub Pages updates.
2. Choose **Liquid Leaders**, select AAPL and 5m, then press **Retry data**.
3. Confirm the status changes to a provider response and that the returned bar count, last-bar time and calculated indicators are populated.
4. In Supabase logs, confirm a successful `GET` request to `market-data?provider=tickerbot&symbol=AAPL&interval=5m&limit=300` after the latest deployment.
5. Test one supported crypto alias and one other stock. Record unsupported symbols/timeframes explicitly rather than treating missing data as a setup.
6. Verify the embedded TradingView chart and mobile price-axis/zoom behavior separately from the Supabase signal data; these are different data/rendering paths.

## Connected RO’Lyfe workspaces
- Trading Intelligence Classroom: https://rolrichman.github.io/RO-Lyfe-Trading-Intelligence-Classroom/
- Tactical Intelligence Center — Trading Scanner: https://rolrichman.github.io/RO-Lyfe-Tactical-Intelligence-Center-/
- Tactical Intelligence Execution Center — Real Estate / Capital workflow: https://rolrichman.github.io/ro-lyfe-tactical-intelligence-execution-center/
- Auction Capital Machine — Property → Owner → Tax → Buildability: https://rolrichman.github.io/ro-lyfe-auction-capital-machine/#vault
- Trading Calculator Pro hub: https://rolrichman.github.io/ROlyfe-Trading-Calculator-Pro/

## Safety / scope
Educational decision support only. Not financial, investment, legal, tax, lending or trading advice. No guarantees, no broker order routing, and no automated execution. The user makes all final decisions and places any order in their brokerage platform.


## Expanded indicator + scan-alert update (feature branch, 2026-10-28)
- Added an HMA(31/32) reading, locally calculated PPS-style HMA-cross markers, and a configurable pullback proxy to the Terminal's indicator lab and scan candidate context.
- Captured the user's RL_Pull_Back_V4_5_13 reference settings: length 50, multiplier 1.5, buy EMA 1, sell EMA 13, volume-change thresholds +100% / −100%, spread limit 0.09, labels enabled, arrow placement UP. The local pullback is an explicitly labeled approximation, not a claim to replicate the proprietary Thinkorswim script.
- Added IV, optional IV Rank/Percentile, position intent (buy/sell), expiration/DTE, premium debit/credit and expiration breakeven worksheet. Values must be entered from a current options chain; this page does not fetch a live options chain or infer IV from stock candles.
- Repositioned scanner status as a viewport-pinned mobile-safe toast. Every completed valid scan shows an on-screen outcome; a directional setup may trigger a richer scan toast that includes HMA/PPS-style/pullback context.
- Optional browser/phone notifications are opt-in, require the user's click and browser permission, and only notify when directional context is bullish or bearish. They are not background monitoring when the tab is closed and never submit orders.
- Existing RTIC score logic remains unchanged by the added HMA, PPS-style and pullback rows. These rows are contextual, non-scoring indicators. Scores, stale/missing data and unverified quotes are not trade instructions.
- Review branch: `feature/expanded-indicators-oct-2026`. Changes are not live on the default branch until reviewed and merged.
- Validation note: the source changes were inspected for insertion points and expected feature markers; the live provider/CORS connection and real phone notification delivery still require in-browser testing after review.


## Main chart + linked visual indicator suite (2026-10-28)
- Moved the main chart workspace to immediately below the compact selected-symbol status strip so users reach the chart before the lower watchlist, signal-school and trade-planning sections.
- Added ten expandable visual graph panels directly beneath the main TradingView chart: EMA 5/10/20/50/200 overlays, timestamp-day VWAP proxy, RSI, MACD line/signal/histogram (12/26/9 defaults), Stochastic %K/%D (14/3), CCI, an explicitly approximate TTM Squeeze/momentum proxy, HMA plus local PPS-style cross markers, the RL pullback ATR-band setup and volume versus its 20-bar mean.
- Graphs recalculate from the matching selected symbol/timeframe's Tickerbot historical candles returned through the RO'Lyfe Supabase data service. Chart range (6M/1Y/All) changes the TradingView display range; selected timeframe controls scanner bars. A separate Multi Chart is labelled independent and does not drive the main scan.
- Moved Favorite Indicators controls and the HMA/PPS-style/pullback/option learning panel below the chart inside the chart-linked controls accordion.
- Disabled independent symbol changes inside the main TradingView widget so the top symbol selector remains the source of truth. Added a provider returned-symbol guard; a mismatched response (e.g. requested SPY but provider says AAPL) is rejected and no indicator graphs are shown for that response.
- Mobile styling keeps graphs within screen width with SVG plots. The graphs are source-checked for JavaScript syntax; actual browser rendering/provider data freshness still requires manual testing.


## Multi Chart fullscreen workflow (2026-10-28)
- Preserved the main chart and its ten chart-linked indicator graphs unchanged.
- The secondary chart remains explicitly independent of the main scan. Added a labelled independent-symbol selector, refresh action, and compact chart-height slider.
- Added a full-viewport Multi Chart workspace with its own TradingView chart, adjustable chart-height slider, reset, refresh, close/Escape behavior, and collapsible controls row to reclaim vertical space.
- Fullscreen Multi Chart loads the current enabled chart studies plus RSI, MACD, and Stochastic in the TradingView widget. Chart zoom/crosshair/timeframe/drawing interactions are provided by TradingView; the Terminal slider changes the chart viewing height.
- Fullscreen symbol selection is seeded from the independent Multi Chart selector and does not change the main scan symbol. The multi-chart refresh reloads the independent chart only.
- Validation: inline JavaScript syntax checked after changes. Full live-browser interaction and TradingView symbol/widget entitlement still require manual confirmation.
