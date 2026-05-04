# E-Commerce Preset

> Use this preset if you're building an e-commerce platform, marketplace, D2C brand, or retail tech product.

## Setup

In `rules/domain-context.md`, set:

```yaml
industry: ecommerce
country: global  # or specific country
currency: $ (USD)  # adjust to your market
preset: ecommerce
```

## Regulatory Context (varies by country)

- **Data Privacy:** GDPR (EU), CCPA (US/California), DPDP Act (India)
- **Consumer Protection:** Right to return, refund policies, product liability
- **Payments:** PCI-DSS compliance for card data, PSD2/SCA (EU), RBI tokenization (India)
- **Tax:** GST (India), VAT (EU), Sales Tax (US — Nexus rules), customs/duties for cross-border
- **Marketplace Regulations:** FDI policy for marketplaces (India), platform liability for counterfeit goods

## Product Types

| Product | Description | Key Flows |
|---------|-------------|-----------|
| Marketplace | Multi-seller platform (Amazon/Flipkart model) | Seller onboarding → Catalog → Order → Fulfillment → Settlement |
| D2C (Direct to Consumer) | Brand-owned storefront | Catalog → Cart → Checkout → Payment → Shipping → Returns |
| Quick Commerce | 10-30 min delivery (Zepto/Blinkit model) | Dark store inventory → Order → Picker → Rider → Delivery |
| Subscription Commerce | Recurring product delivery | Plan selection → Payment → Recurring fulfillment → Skip/Pause/Cancel |
| B2B Commerce | Wholesale/bulk ordering | Catalog (tiered pricing) → RFQ → Order → Invoice → Fulfillment |
| Social Commerce | Selling via social platforms | Product link → WhatsApp/Instagram → Order → COD/Prepaid → Delivery |

## Example Service Architecture

| Service | Purpose |
|---------|---------|
| Catalog Service | Products, variants, pricing, inventory, categories, search indexing |
| Cart Service | Cart management, pricing rules, coupon application, cart recovery |
| Order Service | Order lifecycle — placed, confirmed, shipped, delivered, returned, refunded |
| Payment Service | Payment gateway integration, refunds, COD reconciliation, wallet |
| Inventory Service | Stock levels, warehouse allocation, reserved stock, reorder alerts |
| Fulfillment Service | Warehouse management, pick-pack-ship, shipping partner integration |
| Logistics Service | Shipping rate calculation, tracking, NDR (non-delivery report), RTO |
| User Service | Customer accounts, addresses, wishlists, loyalty points |
| Notification Service | Order updates, shipping tracking, promotional campaigns, abandoned cart |
| Search Service | Elasticsearch/Algolia — full-text search, filters, facets, autocomplete |
| Recommendation Engine | Collaborative filtering, frequently bought together, personalized feeds |
| Seller Service | Seller onboarding, catalog management, settlement, performance metrics |
| Review Service | Ratings, reviews, Q&A, moderation |

## Key Domain Concepts

- **SKU (Stock Keeping Unit):** Unique identifier for each product variant (size + color + style)
- **GMV (Gross Merchandise Value):** Total value of goods sold — key business metric
- **AOV (Average Order Value):** Revenue per order — drives pricing and promotion strategy
- **CAC (Customer Acquisition Cost):** Cost to acquire a new customer — must be < LTV
- **LTV (Lifetime Value):** Total revenue from a customer over their lifetime
- **RTO (Return to Origin):** Failed deliveries returned to warehouse — major cost driver in India (15-25%)
- **NDR (Non-Delivery Report):** Delivery attempt failed — triggers re-attempt or RTO
- **COD (Cash on Delivery):** Still 50-60% of orders in India — reconciliation complexity
- **Dark Store:** Micro-warehouse for quick commerce — optimized for pick-pack speed
- **Pincode Serviceability:** Delivery availability check by pincode — varies by logistics partner

## Competitor Landscape

| Tier | Companies | Model |
|------|-----------|-------|
| Horizontal Marketplaces | Amazon, Flipkart, Meesho, JioMart | Everything store, seller ecosystem |
| Quick Commerce | Zepto, Blinkit (Zomato), Swiggy Instamart, BigBasket | 10-30 min grocery/essentials |
| D2C Platforms | Shopify, WooCommerce, Dukaan, Fynd | Enable brands to sell direct |
| Fashion | Myntra, Ajio, Nykaa Fashion, Tata Cliq | Category-specific, curation |
| B2B | Udaan, IndiaMART, Moglix, Zetwerk | Wholesale, manufacturing |
| Social Commerce | Meesho, DealShare, CityMall | Reseller network, tier 2-3 cities |

## Validation Rules

- **Cart:** Max items per cart, minimum order value for free shipping, coupon stacking rules
- **Inventory:** Real-time stock check at checkout, oversell prevention, reserved stock timeout (15 min typical)
- **Address:** Pincode validation, serviceability check, address standardization
- **Payment:** PCI-DSS for card storage, tokenization, 3DS for card payments, UPI intent/collect
- **Shipping:** Weight-based or volumetric pricing, dimensional weight calculation, COD availability by pincode
- **Returns:** Return window (7-30 days), return reason categorization, quality check on receipt, refund SLA
- **Pricing:** MRP display mandatory (India), discount calculation, GST-inclusive pricing
