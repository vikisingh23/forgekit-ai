# Architecture Decision Records (ADR)

## Template

Save as `docs/adr/NNNN-title.md` in your project.

```markdown
# ADR-NNNN: [Title]

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
**Deciders**: [names]

## Context

What is the problem? Why do we need to make a decision?

## Decision

What did we decide? Be specific.

## Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| Option A | ... | ... |
| Option B | ... | ... |
| **Chosen: Option X** | ... | ... |

## Consequences

### Positive
- What gets better?

### Negative
- What trade-offs are we accepting?

### Risks
- What could go wrong?

## References

- Links to relevant docs, RFCs, discussions
```

## When to Write an ADR

- Choosing a framework or library (React vs Angular, TypeORM vs Prisma)
- Changing architecture (monolith → microservices, REST → GraphQL)
- Choosing a database or cache strategy
- Changing auth approach
- Any decision that's hard to reverse

## Rules

1. **ADRs are immutable** — don't edit old ones, write a new one that supersedes
2. **Number sequentially** — ADR-0001, ADR-0002, etc.
3. **Keep in the repo** — version controlled with the code
4. **Short and focused** — one decision per ADR
5. **Include alternatives** — show you considered options
