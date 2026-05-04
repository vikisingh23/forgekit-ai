# Error Taxonomy

## Standard Error Response

```json
{
  "statusCode": 422,
  "message": "Validation failed",
  "errors": {
    "amount": "Minimum amount is 500",
    "email": "Invalid email format"
  },
  "correlationId": "abc-123-def",
  "timestamp": "2026-04-29T10:00:00Z"
}
```

## HTTP Status Code Usage

| Code | Meaning | When to use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST that creates |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Malformed request (invalid JSON) |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate (idempotency), concurrency conflict |
| 422 | Unprocessable | Validation errors (valid JSON, invalid data) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Error | Unexpected server error |

## Domain Exception Classes

### NestJS
```typescript
export class BusinessRuleException extends HttpException {
  constructor(message: string) { super(message, 422); }
}
export class EntityNotFoundException extends HttpException {
  constructor(entity: string, id: string) {
    super(`${entity} ${id} not found`, 404);
  }
}
export class DuplicateException extends HttpException {
  constructor(message: string) { super(message, 409); }
}
export class InsufficientPermissionException extends HttpException {
  constructor() { super('Insufficient permissions', 403); }
}
```

### .NET
```csharp
public class BusinessRuleException : Exception { }
public class EntityNotFoundException : Exception
{
    public EntityNotFoundException(string entity, object id)
        : base($"{entity} {id} not found") { }
}
public class DuplicateException : Exception { }
public class ConcurrencyException : Exception { }
```

## Rules

1. **Never expose stack traces** to clients — log them, return safe message
2. **Field-level validation errors** — return which fields failed and why
3. **Human-readable messages** — "Minimum amount is 500" not "VALIDATION_ERROR"
4. **Always include correlationId** — for support team to trace
5. **Consistent envelope** — same structure for success and error responses
6. **Don't use exceptions for flow control** — use Result pattern in services
7. **Log all 5xx errors** — with full context for debugging
8. **Don't swallow exceptions** — no empty catch blocks
