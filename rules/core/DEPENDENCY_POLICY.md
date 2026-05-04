# Dependency Policy

## Before Adding a Dependency

Ask these questions:

1. **Do we really need it?** Can we write 20 lines instead of adding a package?
2. **Is it maintained?** Last commit <6 months, issues responded to
3. **Is it popular?** >1000 weekly downloads, >100 GitHub stars
4. **Is the license compatible?** See allowed licenses below
5. **What's the size impact?** Check with `bundlephobia.com`
6. **Are there known vulnerabilities?** Check `npm audit` / `snyk`

## Allowed Licenses

| License | Status | Notes |
|---------|--------|-------|
| MIT | ✅ Allowed | Most permissive |
| Apache 2.0 | ✅ Allowed | Patent protection |
| BSD (2/3 clause) | ✅ Allowed | Permissive |
| ISC | ✅ Allowed | Equivalent to MIT |
| MPL 2.0 | ⚠️ Review | File-level copyleft |
| LGPL | ⚠️ Review | Library-level copyleft |
| GPL | ❌ Blocked | Full copyleft — infects your code |
| AGPL | ❌ Blocked | Network copyleft — even stricter |
| Unlicensed | ❌ Blocked | No legal right to use |

## Version Pinning

```json
// ✅ CORRECT — exact versions in production
"dependencies": {
  "express": "4.18.2",
  "@nestjs/core": "10.3.0"
}

// ❌ WRONG — open ranges
"dependencies": {
  "express": "^4.18.2",
  "@nestjs/core": "~10.3.0"
}
```

- **Lock files** (`package-lock.json`, `pubspec.lock`) MUST be committed
- **Renovate/Dependabot** for automated update PRs
- **Update quarterly** — don't let deps go stale

## Banned Packages

| Package | Why | Alternative |
|---------|-----|-------------|
| `moment` | Huge, deprecated | `date-fns` or `dayjs` |
| `lodash` (full) | 70KB for one function | `lodash-es` or native |
| `request` | Deprecated | `axios` or `node-fetch` |
| `node-uuid` | Deprecated | `uuid` |

## Audit Schedule

- **Weekly**: `npm audit` in CI (auto)
- **Monthly**: Review outdated deps (`npm outdated`)
- **Quarterly**: Full dependency review — remove unused, update major versions
- **On incident**: If a vulnerability is exploited, patch within 24 hours

## Rules

1. **Minimal dependencies** — every dep is a liability
2. **Pin exact versions** — no surprises in production
3. **Commit lock files** — reproducible builds
4. **No GPL in proprietary code** — legal risk
5. **Audit in CI** — fail on critical vulnerabilities
6. **Remove unused deps** — dead deps are attack surface
