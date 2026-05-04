# Security Rules

## Input Validation
- Validate ALL request DTOs (server-side, never trust client)
- Parameterized queries only — no string concatenation in SQL
- Whitelist validation where possible (enums, known values)

## Authentication & Authorization
- JWT with proper expiry, refresh flow, and revocation
- Role-based + claim-based authorization
- Rate limiting on public and auth endpoints

## Data Protection
- Encrypt sensitive fields at rest (PII, financial data)
- No PII in log messages — mask sensitive data
- No secrets in code, config, or error responses
- CORS configured per environment

## Common Vulnerabilities
- SQL injection: parameterized queries only
- XSS: sanitize all user input, escape output
- CSRF: anti-forgery tokens on state-changing endpoints
- Hardcoded secrets: use environment variables / secret managers
