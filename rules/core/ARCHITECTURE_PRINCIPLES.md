# Architecture Principles

Universal principles enforced across all stacks (.NET, NestJS, React, RN, Flutter).

## 1. Layered Architecture

```
Controller / Screen          ← HTTP / UI only (<150 lines)
    ↓
Service / Hook / Provider    ← Business logic (<300 lines)
    ↓
Repository / Query Options   ← Data access (<200 lines)
    ↓
Entity / Model / DTO         ← Data structures (<100 lines)
```

- Dependencies flow DOWN only
- Never skip layers (no DB calls from controllers)
- Each layer has a single responsibility

## 2. Data Fetching at the Leaf Level

Each component/widget fetches its own data. Parent screens compose, not fetch.

- **React**: Each component calls `useQuery()` — React Query deduplicates
- **Flutter**: Each widget calls `ref.watch(provider)` — Riverpod deduplicates
- **Backend**: Services call repositories, not other services' repositories

**Why**: Eliminates prop drilling, makes components independently testable and reusable.

## 3. Reuse Decision Tree

Before creating anything new:

1. **Search codebase** — does something similar exist?
2. **Use as-is** — if it fits
3. **Extend** — add a prop/parameter, don't fork
4. **Refactor** — if existing is a god class (>150 lines), break it down first
5. **Create new** — only as last resort

## 4. No God Classes

| Component | Max Lines | Action if exceeded |
|-----------|-----------|-------------------|
| Controllers / Screens | 150 | Split by resource or compose sub-components |
| Services / Hooks | 300 | Extract by domain concern |
| Repositories | 200 | Partial classes or query objects |
| Components / Widgets | 150 | Extract sub-components |
| Entities / Models | 100 | Use value objects |

## 5. Composition Over Inheritance

```
❌ BaseService → FinancialService → MutualFundService → SIPService
✅ SIPService(schemeRepo, paymentService, validationService)
```

- Max 1 level of inheritance (base class only)
- Prefer DI composition
- Use interfaces/abstractions, not concrete dependencies

## 6. Single Responsibility

- One controller per resource/entity
- One service per domain concern
- One repository per entity
- One component per visual concern
- One hook/provider per data source

## 7. Consistent Error Handling

| Layer | Pattern |
|-------|---------|
| Controller | Return standard envelope, never throw raw |
| Service | Return Result/OperationResult, throw domain exceptions |
| Repository | Let DB exceptions bubble, wrap in domain exceptions |
| Component | `.when(loading, error, data)` or try/catch with user-friendly message |

## 8. Audit Everything

ALL entities must have:
- `createdBy`, `modifiedBy` — who
- `createdAt`, `modifiedAt` — when
- `isDeleted`, `deletedAt`, `deletedBy` — soft delete (never hard delete)
- `version` / `rowVersion` — optimistic concurrency (financial entities)

## 9. Pagination Everywhere

- ALL list endpoints must paginate
- Default: 20 items, max: 100
- Return: `{ items, totalCount, page, pageSize, totalPages }`
- Never return unbounded collections

## 10. Idempotency on Mutations

- POST endpoints creating financial/payment records MUST accept idempotency key
- Duplicate requests return 409 with original response
- Use Redis or DB-backed duplicate detection

## Customizing Thresholds

These limits are defaults. Adjust for your team:

```yaml
# Example: your-project/.neuraforge.yml (future)
thresholds:
  controller_max_lines: 150   # default: 150
  service_max_lines: 300      # default: 300
  component_max_lines: 150    # default: 150
  repository_max_lines: 200   # default: 200
  min_review_score: 90        # default: 90
  ui_match_threshold: 85      # default: 85%
  test_coverage_min: 80       # default: 80%
```

Until config file support is added, modify the thresholds directly in the agent prompts (`agents/*.md`).
