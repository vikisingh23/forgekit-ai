# Stock Broking — India Preset

> Use this preset if you're building for an Indian stock broking, trading, or wealth management platform.

## Setup

In `rules/domain-context.md`, set:

```yaml
industry: stock-broking
country: india
currency: ₹ (INR)
preset: stock-broking-india
```

## Regulatory Context

- **Primary Regulator:** SEBI (Securities and Exchange Board of India)
- **Exchanges:** NSE, BSE, MCX (commodities), NCDEX
- **Depositories:** NSDL, CDSL
- **Key Regulations:** SEBI (Stock Brokers) Regulations, SEBI (DP) Regulations, PFUTP Regulations, Margin Trading Framework
- **Compliance:** KYC (KRA), UCC (Unique Client Code), PMLA/AML, Client Fund Segregation, Risk Management Framework
- **Settlement:** T+1 for equities, T+1 for F&O premium, daily MTM settlement

## Product Types

| Product | Description | Key Flows |
|---------|-------------|-----------|
| Equity (Cash) | Buy/sell stocks on NSE/BSE | Order placement, modification, cancellation, settlement, corporate actions |
| F&O (Derivatives) | Futures & Options trading | Margin calculation, MTM, expiry, exercise, assignment |
| Commodities | MCX/NCDEX trading | Commodity-specific margins, delivery, physical settlement |
| Currency | Currency derivatives | USD/INR, EUR/INR pairs, RBI regulations |
| Mutual Funds | MF distribution via BSE Star/NSE NMF | Purchase, SIP, redemption, switch (see financial-services-india preset) |
| IPO/NFO | Primary market subscriptions | ASBA, UPI mandate, allotment, refund |
| Margin Trading (MTF) | Leveraged equity positions | Pledge/unpledge, margin shortfall, square-off |
| SLB | Securities Lending & Borrowing | Lend/borrow, recall, early return |

## Example Service Architecture

| Service | Purpose |
|---------|---------|
| Order Management System (OMS) | Order routing, matching, modification, cancellation |
| Risk Management System (RMS) | Pre-trade risk checks, margin computation, position limits |
| Portfolio Service | Holdings, positions, P&L, corporate actions |
| Onboarding Service | eKYC, Aadhaar, DigiLocker, PAN verification, NSDL/CDSL DP account |
| Ledger Service | Client fund balances, pay-in/pay-out, bank transfers |
| Market Data Service | Real-time quotes, depth, historical data, indices |
| Notification Service | Trade confirmations, margin calls, contract notes |
| Backoffice Service | Settlement, reconciliation, regulatory reporting |

## Key Domain Concepts

- **Margin Framework:** SPAN + Exposure margin for F&O, VaR + ELM for equity
- **Peak Margin:** Intraday margin snapshots reported to exchange (4 random snapshots)
- **Pledge/Unpledge:** Collateral management via CDSL/NSDL for margin
- **DDPI:** Demat Debit and Pledge Instruction (replaced POA)
- **Contract Note:** Mandatory trade confirmation with brokerage, STT, GST, stamp duty, SEBI turnover fees
- **Corporate Actions:** Dividends, bonus, splits, rights, buyback, mergers — impact on holdings and cost basis
- **Circuit Breakers:** Upper/lower circuit limits, market-wide circuit breakers (10%/15%/20%)

## Competitor Landscape

| Tier | Companies | Differentiators |
|------|-----------|----------------|
| Discount Brokers | Zerodha, Groww, Angel One, Upstox, 5paisa | Low cost, tech-first, mobile-first |
| Full-Service | ICICI Direct, HDFC Securities, Kotak Securities, YourOrg | Research, advisory, banking integration |
| New-Age | Dhan, INDmoney, Fisdom, Kuvera | UX innovation, wealth management, goal-based |

## Validation Rules

- **Trading hours:** Equity 9:15 AM - 3:30 PM, F&O 9:15 AM - 3:30 PM, Commodity 9:00 AM - 11:30 PM
- **Order types:** Market, Limit, SL, SL-M, AMO (After Market Order), GTT (Good Till Triggered)
- **Lot sizes:** F&O lot sizes per exchange circular, minimum order value for equity
- **DIS slip:** Required for off-market transfers, DDPI for broker-initiated
- **Margin shortfall:** T+1 penalty by exchange, auto square-off rules
