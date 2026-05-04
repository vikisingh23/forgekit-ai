# Backend Rules

## Repository Pattern
- All database access through repository interfaces
- Interface + implementation separation
- No ORM context injected directly into services or controllers
- Unit of Work for multi-entity transactions

## API Design
- Consistent response envelope: `{ statusCode, message, data, timestamp }`
- Pagination on ALL list endpoints — never return unbounded collections
- Proper HTTP status codes: 201 create, 204 delete, 409 conflict, 422 validation
- API versioning: `/api/v1/` prefix

## Audit & Compliance
- ALL entities: `createdBy`, `modifiedBy`, `createdAt`, `modifiedAt`
- Soft deletes mandatory: `isDeleted`, `deletedAt`, `deletedBy`
- `decimal` for money — never `float`/`double`
- Idempotency on mutation endpoints (POST creating financial records)

## Error Handling
- Global exception filter/middleware
- Domain-specific exception types
- No swallowed exceptions (empty catch blocks)
- No sensitive data in error responses
- Human-readable validation messages
