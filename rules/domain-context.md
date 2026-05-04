# Domain Context

This file is automatically customized based on your installation configuration.
All agents reference this for domain-specific behavior.

## Your Configuration

- **Industry**: ${user_config.industry}
- **Country/Region**: ${user_config.country}
- **Domain Details**: ${user_config.domain_context}
- **Currency**: ${user_config.currency}

## Domain Presets

When the above values are set, agents automatically adapt:

### Financial Services (India)
- Regulatory: SEBI, RBI, AMFI guidelines
- Compliance: KYC/KRA verification, PAN validation, Aadhaar masking
- Products: Mutual Funds (SIP/STP/SWP), AIF, PMS, NPS
- Formatting: ₹ symbol, Indian comma format (₹1,23,456.78), NAV with 4 decimals
- Entities: Investor, Folio, Scheme, Transaction, Mandate, Distributor
- Idempotency: Mandatory on all payment/transaction endpoints
- Audit: Full trail required by SEBI for all financial operations

### Financial Services (US)
- Regulatory: SEC, FINRA, SOX compliance
- Compliance: SSN masking, AML/BSA, accredited investor verification
- Products: ETFs, Mutual Funds, 401(k), IRA, Brokerage accounts
- Formatting: $ symbol, US comma format ($1,234,567.89)
- Entities: Account, Portfolio, Security, Trade, Dividend
- Idempotency: Mandatory on all trade/transfer endpoints

### Financial Services (UK/EU)
- Regulatory: FCA (UK), MiFID II (EU), GDPR
- Compliance: KYC, AML, GDPR data subject rights
- Products: ISA, SIPP, UCITS funds, ETFs
- Formatting: £/€ symbol, European number format
- Entities: Client, Portfolio, Fund, Transaction, Mandate

### Healthcare
- Regulatory: HIPAA (US), GDPR (EU), DISHA (India)
- Compliance: PHI encryption, audit logging, consent management
- Products: EHR, Telehealth, Claims, Prescriptions
- Formatting: Date formats per locale, medical units
- Entities: Patient, Provider, Encounter, Claim, Prescription
- Security: PHI must be encrypted at rest and in transit

### E-Commerce
- Regulatory: PCI-DSS for payments, consumer protection laws
- Compliance: Payment card data handling, refund policies
- Products: Orders, Inventory, Payments, Shipping, Returns
- Formatting: Multi-currency support, tax calculations
- Entities: Customer, Order, Product, Cart, Payment, Shipment

### SaaS / Generic
- Regulatory: SOC 2, GDPR if serving EU
- Compliance: Data retention, user consent, audit logging
- Products: Subscriptions, Tenants, Users, Billing
- Formatting: Multi-locale support
- Entities: Tenant, User, Subscription, Invoice, Feature

## How Agents Use This

### Product Manager Agent
- References your industry's regulatory requirements when creating BRS
- Uses domain-specific terminology for user stories
- Knows your entity model (Investor vs Patient vs Customer)

### Devil's Advocate Agent
- Challenges requirements against your regulatory framework
- Flags missing compliance requirements specific to your industry
- Identifies domain-specific edge cases

### Forge Agents (Code Generation)
- Uses correct currency formatting for your locale
- Adds industry-specific audit fields and compliance patterns
- Generates domain-appropriate validation rules
- Names entities using your domain terminology

### Reviewer Agents
- Checks for industry-specific compliance violations
- Validates currency/number formatting for your locale
- Flags missing regulatory requirements
