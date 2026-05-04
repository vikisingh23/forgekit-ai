# Lending — India Preset

> Use this preset if you're building for an Indian NBFC, digital lending platform, P2P lending, or bank lending product.

## Setup

In `rules/domain-context.md`, set:

```yaml
industry: lending
country: india
currency: ₹ (INR)
preset: lending-india
```

## Regulatory Context

- **Primary Regulators:** RBI (Reserve Bank of India), SEBI (for securitization)
- **Key Regulations:** RBI Master Directions on NBFC, Digital Lending Guidelines (Sep 2022), Fair Practices Code, FLDG (First Loss Default Guarantee) norms
- **Compliance:** KYC/CKYC, PMLA/AML, CIBIL/credit bureau checks, Aadhaar eKYC, Video KYC
- **Reporting:** RBI returns (NBS-7, ALM), CRILC (Central Repository), credit bureau reporting
- **Interest Rate:** Annualized rate disclosure mandatory, no hidden charges, key fact statement (KFS) mandatory

## Product Types

| Product | Description | Key Flows |
|---------|-------------|-----------|
| Personal Loan | Unsecured consumer lending | Application → Bureau check → Underwriting → Disbursal → Repayment → Closure |
| Business Loan | MSME/SME lending | Application → GST/ITR analysis → Collateral → Sanction → Disbursal |
| Loan Against Securities (LAS) | Pledge-based lending against MF/equity | Pledge → LTV calculation → Disbursal → Margin call → Top-up/Sell |
| Loan Against Property (LAP) | Mortgage-backed lending | Property valuation → Legal check → Sanction → Disbursal → EMI |
| P2P Lending | Marketplace lending (RBI registered) | Lender registration → Borrower application → Matching → Disbursal → Collection |
| Buy Now Pay Later (BNPL) | Short-term credit at point of sale | Pre-approved limit → Purchase → Repayment (no-cost EMI / pay later) |
| Co-Lending | Bank + NBFC partnership (CLM) | Origination → 80:20 split → Co-lending agreement → Reporting |
| Gold Loan | Secured lending against gold | Gold valuation → Pledge → Disbursal → Interest servicing → Release |

## Example Service Architecture

| Service | Purpose |
|---------|---------|
| Loan Origination System (LOS) | Application intake, document collection, workflow management |
| Credit Decision Engine | Bureau pull, scorecard, rule engine, ML-based underwriting |
| Loan Management System (LMS) | Disbursement, repayment schedule, EMI tracking, closure |
| Collection Service | DPD tracking, dunning, recovery workflows, legal notices |
| Payment Service | NACH/eMandate registration, auto-debit, payment reconciliation |
| Document Service | eSign (Aadhaar/DSC), eStamp, agreement generation, KYC docs |
| Notification Service | EMI reminders, overdue alerts, disbursement confirmation |
| Reporting Service | RBI returns, bureau reporting, MIS, NPA classification |

## Key Domain Concepts

- **LTV (Loan to Value):** Max lending ratio against collateral — varies by product (e.g., 50% for equity, 75% for property)
- **NPA Classification:** SMA-0 (1-30 DPD), SMA-1 (31-60), SMA-2 (61-90), NPA (90+ DPD)
- **FLDG:** First Loss Default Guarantee — max 5% of loan portfolio, regulated by RBI
- **KFS (Key Fact Statement):** Mandatory disclosure of APR, fees, charges before loan sanction
- **Digital Lending Guidelines:** Loan must be disbursed to borrower's bank account (no pool accounts), LSP disclosure mandatory
- **Cooling-off Period:** Borrower can exit within look-up period without penalty
- **Penal Charges:** RBI circular — no penal interest, only reasonable penal charges on overdue
- **Securitization:** PTC (Pass Through Certificates), DA (Direct Assignment) — SEBI/RBI regulated

## Competitor Landscape

| Tier | Companies | Focus |
|------|-----------|-------|
| Digital-First NBFCs | Lendingkart, Capital Float, KreditBee, MoneyTap, Navi | Instant personal/business loans, app-first |
| P2P Platforms | LenDenClub, Faircent, Liquiloans, 12% Club | Marketplace lending, RBI P2P license |
| Large NBFCs | Bajaj Finance, Muthoot, Manappuram, Poonawalla | Scale, diversified products, branch network |
| Bank Digital Lending | HDFC Bank (10-sec loan), ICICI (iMobile), SBI YONO | Pre-approved, existing customer base |
| Embedded Lending | Slice, Uni, LazyPay, Simpl | BNPL, credit lines at checkout |

## Validation Rules

- **Bureau score:** Minimum CIBIL score threshold (typically 650-700 for unsecured)
- **Income verification:** Bank statement analysis (12 months), ITR, GST returns
- **Debt-to-income:** Max 50-60% FOIR (Fixed Obligation to Income Ratio)
- **Age:** Minimum 21, maximum 60 (salaried) / 65 (self-employed)
- **eSign:** Aadhaar eSign or DSC mandatory for loan agreement
- **NACH:** Mandatory for EMI auto-debit, registration before first disbursal
- **Disbursement:** Only to verified bank account in borrower's name
