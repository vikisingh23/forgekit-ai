# Logging & Observability Standards

## Log Levels

| Level | When | Example |
|-------|------|---------|
| `error` | Something broke, needs attention | DB connection failed, payment rejected |
| `warn` | Unexpected but handled | Retry attempt, deprecated API called |
| `info` | Business events | Order created, user logged in |
| `debug` | Developer troubleshooting | Query params, cache hit/miss |

**Production**: `info` and above. **Staging**: `debug` and above.

## Structured Logging

```typescript
// ✅ CORRECT — structured, searchable
logger.info('Order created', {
  orderId: 'ORD-001',
  userId: 'USR-123',
  amount: 5000,
  correlationId: req.headers['x-correlation-id'],
});

// ❌ WRONG — unstructured string
logger.info(`Order ORD-001 created by USR-123 for 5000`);
```

## Correlation ID

Every request gets a unique ID that flows through all services.

```typescript
// Middleware — generate or extract
@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req['correlationId'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);
    next();
  }
}
```

### Rules
- Generate at API gateway / first service
- Pass in `x-correlation-id` header to all downstream calls
- Include in every log entry
- Include in error responses
- Store in async local storage for automatic propagation

## What to Log

| Event | Level | Required Fields |
|-------|-------|----------------|
| Request received | `info` | method, path, correlationId |
| Request completed | `info` | method, path, statusCode, duration |
| External API call | `info` | service, endpoint, duration, status |
| Cache hit/miss | `debug` | key, hit/miss |
| DB query (slow) | `warn` | query, duration (if >500ms) |
| Auth failure | `warn` | userId, reason, IP |
| Unhandled error | `error` | stack, correlationId, request context |

## What NOT to Log

- Passwords, tokens, API keys
- PII (mask: `****1234` for PAN, phone, email)
- Full request/response bodies in production
- Health check requests (too noisy)

## Health Check Endpoint

```typescript
// GET /health — every service must have this
{
  "status": "healthy",
  "version": "1.2.0",
  "uptime": "2d 5h 30m",
  "dependencies": {
    "database": "healthy",
    "redis": "healthy",
    "externalApi": "degraded"
  }
}
```
