# Incident Response Runbook

## Severity Levels

| Level | Definition | Response Time | Example |
|-------|-----------|---------------|---------|
| **P1 — Critical** | Service down, data loss, security breach | 15 min | Payment processing down, DB corruption |
| **P2 — High** | Major feature broken, significant degradation | 1 hour | Login failing, reports not generating |
| **P3 — Medium** | Minor feature broken, workaround exists | 4 hours | Export button broken, UI glitch |
| **P4 — Low** | Cosmetic, no business impact | Next sprint | Typo, minor alignment issue |

## Incident Response Steps

### 1. Detect (0-5 min)
- Alert from monitoring / user report / health check failure
- Acknowledge in team channel immediately

### 2. Assess (5-15 min)
- What's broken? Which service? Which users affected?
- Assign severity level (P1-P4)
- P1/P2: Start incident call, notify stakeholders

### 3. Mitigate (15-60 min)
- **Can we rollback?** → Rollback to last known good deploy
- **Can we disable the feature?** → Feature flag off
- **Can we scale?** → Add instances if load-related
- **Can we redirect?** → Route to backup/fallback
- Priority: restore service first, investigate later

### 4. Communicate
- Internal: Team channel updates every 15 min for P1
- Stakeholders: Status page update, email for P1/P2
- Template: "We're aware of [issue]. [X users] affected. ETA: [time]. Next update: [time]."

### 5. Resolve
- Deploy fix or confirm rollback is stable
- Verify with monitoring for 30 min
- Close incident

### 6. Post-Mortem (within 48 hours for P1/P2)
```markdown
## Incident Post-Mortem: [Title]
**Date**: YYYY-MM-DD | **Duration**: X hours | **Severity**: P1
**Impact**: X users affected, Y transactions failed

### Timeline
- HH:MM — Alert triggered
- HH:MM — Team acknowledged
- HH:MM — Root cause identified
- HH:MM — Fix deployed
- HH:MM — Service restored

### Root Cause
What actually broke and why.

### What Went Well
- Fast detection, good communication, etc.

### What Went Wrong
- Slow rollback, missing monitoring, etc.

### Action Items
- [ ] Add monitoring for X (owner, due date)
- [ ] Add circuit breaker on Y (owner, due date)
- [ ] Update runbook for Z (owner, due date)
```

## Rules

1. **No blame** — post-mortems are blameless
2. **Rollback first, investigate later** — restore service is priority #1
3. **Every P1/P2 gets a post-mortem** — no exceptions
4. **Action items must have owners and dates**
5. **Update runbooks** after every incident
