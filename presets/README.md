# Domain Presets

Presets configure NeuraForge AI agents with industry-specific knowledge — regulations, terminology, validation rules, and competitive context.

## Available Presets

| Preset | File | Industry |
|--------|------|----------|
| Financial Services (India) | `financial-services-india.md` | AMC, Wealth Management, Fintech — SEBI regulated |
| Stock Broking (India) | `stock-broking-india.md` | Stock Broking, Trading, Demat — SEBI/Exchange regulated |
| Lending (India) | `lending-india.md` | NBFC, Digital Lending, P2P, Bank Lending — RBI regulated |
| E-Commerce | `ecommerce.md` | Marketplace, D2C, Quick Commerce, B2B — global |

## Coming Soon

- Financial Services (US) — SEC, FINRA
- Financial Services (UK/EU) — FCA, MiFID II
- Healthcare (US) — HIPAA
- Healthcare (EU) — GDPR
- SaaS — generic
- Insurance (India) — IRDAI

## How to Use

1. Copy the preset content relevant to your domain
2. Update `rules/domain-context.md` with your industry, country, and currency
3. Agents will automatically adapt their output

## Contributing a Preset

1. Create `presets/your-industry-country.md`
2. Include: regulatory context, product types, service architecture examples, validation rules
3. Submit a PR
