# Database Migration Strategy

## Rules

1. **Forward-only** — never edit or delete a published migration
2. **Backward-compatible** — old code must work with new schema during deploy
3. **No data loss** — never drop columns/tables without deprecation period
4. **Tested** — run migration on staging copy of production data before deploying
5. **Reversible** — every migration should have a rollback plan documented

## Safe Migration Patterns

### ✅ Safe (zero-downtime)
- Add new column (nullable or with default)
- Add new table
- Add new index (CONCURRENTLY in Postgres)
- Rename with alias (add new, copy, drop old in next release)

### ❌ Unsafe (requires downtime or careful coordination)
- Drop column — old code may still reference it
- Rename column — breaks existing queries
- Change column type — may lose data
- Add NOT NULL without default — fails on existing rows

## Two-Phase Migration (for breaking changes)

```
Release 1: Add new column (nullable)
  → Deploy code that writes to BOTH old and new columns
  → Backfill new column from old column

Release 2: Code reads from new column only
  → Drop old column (or mark deprecated)
```

## TypeORM Migration

```bash
# Generate from entity changes
npx typeorm migration:generate -n AddOrderStatus

# Run
npx typeorm migration:run

# Revert last
npx typeorm migration:revert
```

## EF Core Migration

```bash
# Generate
dotnet ef migrations add AddOrderStatus

# Apply
dotnet ef database update

# Revert
dotnet ef database update PreviousMigrationName
```

## Index Strategy

| Column | Index? | Why |
|--------|--------|-----|
| Primary key | Auto | — |
| Foreign key | ✅ Always | JOIN performance |
| Frequently filtered | ✅ Yes | WHERE clause performance |
| Frequently sorted | ✅ Yes | ORDER BY performance |
| Unique constraint | ✅ Yes | Data integrity |
| Rarely queried | ❌ No | Write overhead |

## Rules for Financial Data

- Never delete financial records — soft delete only
- Audit log for all schema changes
- Migration must be reviewed by DBA for production
- Always test with production-scale data volume
