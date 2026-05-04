# Security Hygiene Checklist

Run this checklist before every release and quarterly.

## Code Level

- [ ] No hardcoded secrets (API keys, passwords, tokens) in source code
- [ ] No secrets in git history (`git log -p | grep -i "password\|secret\|token\|key"`)
- [ ] All user input validated server-side (never trust client)
- [ ] Parameterized queries only — no string concatenation in SQL
- [ ] No `eval()`, `Function()`, or dynamic code execution
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] Error responses don't leak stack traces or internal paths
- [ ] PII masked in logs (`****1234` for PAN, phone, email)
- [ ] File uploads validated (type, size, content — not just extension)
- [ ] No CORS `*` in production — whitelist specific origins

## Authentication & Authorization

- [ ] JWT tokens have expiry (<15 min for access tokens)
- [ ] Refresh tokens are rotated on use (one-time use)
- [ ] Failed login attempts are rate-limited (max 10/min)
- [ ] Password reset tokens expire in 15 minutes
- [ ] Role checks on EVERY endpoint (not just UI hiding)
- [ ] Admin endpoints have additional verification
- [ ] Session invalidation on password change
- [ ] No auth tokens in URL query parameters

## Infrastructure

- [ ] HTTPS everywhere — no HTTP in production
- [ ] Security headers set (Helmet / equivalent):
  - `Strict-Transport-Security`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy`
- [ ] Database credentials are not default/weak
- [ ] Database is not publicly accessible
- [ ] Redis/cache is not publicly accessible
- [ ] SSH access uses key-based auth (no passwords)
- [ ] Firewall rules follow least-privilege

## Dependencies

- [ ] `npm audit` / `dotnet list package --vulnerable` — no critical/high
- [ ] No GPL dependencies in proprietary code
- [ ] Lock files committed (package-lock.json, pubspec.lock)
- [ ] No deprecated packages with known vulnerabilities

## API Security

- [ ] Rate limiting on all public endpoints
- [ ] Idempotency keys on financial mutation endpoints
- [ ] Request size limits configured
- [ ] API versioning in place
- [ ] Webhook signatures verified
- [ ] No sensitive data in GET query parameters

## Data Protection

- [ ] PII encrypted at rest (PAN, Aadhaar, bank account, phone)
- [ ] Backups encrypted
- [ ] Data retention policy defined and enforced
- [ ] Soft deletes for financial data (never hard delete)
- [ ] Audit trail for all sensitive operations
- [ ] GDPR/data subject rights implemented (if applicable)

## Monitoring

- [ ] Failed auth attempts logged and alerted
- [ ] Unusual API patterns detected (spike in 4xx/5xx)
- [ ] Health checks on all services
- [ ] Alerting on service downtime
- [ ] Log retention policy (min 90 days for security events)
