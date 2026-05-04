# Financial Services — India Preset

> Use this preset if you're building for an Indian AMC, wealth management, or fintech company.

## Setup

In `rules/domain-context.md`, set:

```yaml
industry: financial-services
country: india
currency: ₹ (INR)
preset: financial-services-india
```

## Regulatory Context

- **Primary Regulator:** SEBI (Securities and Exchange Board of India)
- **Key Regulations:** SEBI Mutual Fund Regulations, SEBI AIF Regulations, SEBI PMS Regulations
- **Tax Framework:** Income Tax Act (TDS on MF redemptions), FEMA (NRI investments), PMLA (AML/KYC)
- **Compliance:** FATCA/CRS reporting, KYC requirements, AMFI guidelines
- **RTA Providers:** KFintech (KBOLT platform), CAMS, MFCentral (cross-RTA)
- **Exchange Integration:** BSE Star MF, NSE NMF-II
- **Payment Gateways:** Razorpay, Billdesk, NACH/eMandate, UPI Autopay

## Product Types

| Product | Description | Key Flows |
|---------|-------------|-----------|
| Mutual Funds (MF) | Open-ended schemes — equity, debt, hybrid, index, ETF | Purchase, SIP, Redemption, Switch, STP, SWP |
| Alternative Investment Funds (AIF) | Category I/II/III — PE, VC, hedge funds | Subscription, Drawdown, Capital Call, eSign |
| Portfolio Management Services (PMS) | Discretionary/non-discretionary portfolio management | TopUp, Switch, STP, Redemption, SEBI Consent |
| Distributor/IFA | Intermediary platform for MF/AIF/PMS distribution | Transaction initiation, approval workflows, commission tracking |

## Example Service Architecture

A typical Indian AMC digital platform may include:

| Service | Purpose |
|---------|---------|
| Order Service | Transaction lifecycle — cart, order, payment, RTA submission |
| User Service | Investor onboarding, KYC, bank mandates, folio creation |
| Content Service | Scheme/fund master data, NAV, fund factsheets |
| Portfolio Service | Holdings, returns, asset allocation, capital gains |
| Notification Service | Email, SMS, push, OTP, templates |
| Distributor Service | Distributor portal, commissions, AUM tracking |
| Report Service | Statements, tax reports, portfolio analytics |

## Competitor Landscape (for Product Manager agent)

When the Product Manager agent is active with this preset, it should be aware of the Indian AMC competitive landscape:

### Top AMCs by AUM (approximate)
1. SBI Mutual Fund (~₹10L+ Cr)
2. HDFC Mutual Fund (~₹7L+ Cr)
3. ICICI Prudential (~₹7L+ Cr)
4. Nippon India (~₹5L+ Cr)
5. Kotak Mahindra (~₹4L+ Cr)
6. Axis Mutual Fund (~₹2.7L Cr)
7. Mirae Asset (~₹1.8L Cr)
8. DSP Mutual Fund (~₹1.5L Cr)

### Digital Platform Benchmarks
- **Groww, Zerodha Coin, Paytm Money** — consumer fintech platforms with MF distribution
- **KFintech, CAMS** — RTA platforms with investor-facing apps
- **MFCentral** — cross-RTA platform by AMFI

## Validation Rules (common)

- **Cut-off time:** 3:00 PM for equity, 1:30 PM for debt (liquid: 12:30 PM)
- **Minimum SIP:** ₹500 (most schemes), ₹100 (select schemes)
- **Minimum lumpsum:** ₹1,000 - ₹5,000 (scheme-dependent)
- **KYC mandatory:** PAN-based KYC via KRA (KFintech, CAMS, NDML, Karvy, DotEx)
- **Nomination:** Mandatory opt-in/opt-out since SEBI circular Oct 2023
- **Bank verification:** Penny drop or cancelled cheque for bank addition
- **Mandate:** Required for SIP — UPI Autopay, NACH, eMandate

## Devil's Advocate — India-Specific Checks

When reviewing product specs in this domain, the Devil's Advocate should additionally check:

1. **SEBI circular accuracy** — Are circular numbers and dates correct? Has it been superseded?
2. **FEMA compliance** — NRI investment restrictions, repatriation rules
3. **TDS accuracy** — Current rates post Finance Act, surcharge + cess calculations
4. **DTAA treatment** — India-US, India-UK, India-Singapore treaty specifics
5. **RTA feasibility** — Is this implementable with KFintech KBOLT / CAMS current APIs?
6. **MFCentral** — Cross-RTA scenarios for investors with folios at multiple AMCs
7. **SID/SAI/KIM** — Does the feature require scheme document amendments and trustee approval?
8. **SCORES** — Estimated complaint volume impact
