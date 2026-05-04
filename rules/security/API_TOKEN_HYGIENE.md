# API Token & Permission Hygiene

## Principle of Least Privilege

Every token, service account, and API key should have the MINIMUM permissions needed.

## Token Scoping Rules

| Token Type | Scope | Max Lifetime | Storage |
|-----------|-------|-------------|---------|
| User JWT | User's own data only | 15 min access, 7 day refresh | HttpOnly cookie / secure storage |
| Service-to-service | Specific endpoints only | 1 hour, auto-rotate | Vault / Secret Manager |
| CI/CD pipeline | Deploy only, no read prod data | Per-pipeline (ephemeral) | Pipeline variables (masked) |
| Third-party API keys | Read-only where possible | 90 days, rotate quarterly | Vault / Secret Manager |
| Database credentials | Per-service, per-environment | 90 days | Vault, never in code |
| Figma/GitLab tokens | Scoped to specific projects | 90 days | Env vars, never committed |

## Over-Privileged Token Checklist

Review every token for these red flags:

```
❌ Admin token used for read-only operations
❌ Production token used in development
❌ Single token shared across multiple services
❌ Token with write access when only read is needed
❌ Token that never expires
❌ Token stored in code, config file, or git history
❌ Token with access to all repos when only one is needed
❌ Database user with DROP/ALTER when only SELECT/INSERT needed
```

## Token Audit

### GitLab Tokens
```
✅ Use project-level tokens, not personal tokens for CI/CD
✅ Scope: api → read_api (if only reading)
✅ Scope: read_repository (not full api) for clone-only
✅ Set expiry date — never "no expiration"
```

### Database Users
```
✅ App user: SELECT, INSERT, UPDATE only — no DELETE, DROP, ALTER
✅ Migration user: ALTER, CREATE — used only during deploys
✅ Read replica user: SELECT only
✅ Never use sa/root/postgres superuser in application code
```

### Cloud / AWS / Azure
```
✅ IAM roles over access keys
✅ Per-service roles with specific resource ARNs
✅ No wildcard (*) permissions in production
✅ Temporary credentials (STS AssumeRole) over long-lived keys
```

## Token Rotation Schedule

| Token | Rotation | How |
|-------|----------|-----|
| JWT signing key | 90 days | Deploy new key, keep old for grace period |
| API keys (third-party) | 90 days | Generate new, update config, revoke old |
| Database passwords | 90 days | Vault auto-rotation |
| Service account tokens | 90 days | Automated via CI/CD |
| SSH keys | 180 days | Generate new, update authorized_keys |

## Revocation Checklist (when someone leaves)

- [ ] Revoke personal GitLab/GitHub tokens
- [ ] Remove from all service accounts
- [ ] Rotate any shared secrets they had access to
- [ ] Remove SSH keys from servers
- [ ] Remove from cloud IAM
- [ ] Audit recent access logs for anomalies
- [ ] Remove from VPN/network access
