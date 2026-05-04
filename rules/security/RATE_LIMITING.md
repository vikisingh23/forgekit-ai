# Rate Limiting & Throttling

## Default Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Public API | 100 req | per minute |
| Authenticated API | 300 req | per minute |
| Auth endpoints (login/register) | 10 req | per minute |
| File upload | 5 req | per minute |
| Webhook receivers | 1000 req | per minute |
| Health check | No limit | — |

## NestJS Implementation

```typescript
// Global throttle
@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
  ],
})

// Per-endpoint override
@Throttle({ default: { ttl: 60, limit: 10 } })
@Post('auth/login')
async login() { }

// Skip for specific endpoints
@SkipThrottle()
@Get('health')
async health() { }
```

## .NET Implementation

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("default", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 100;
        opt.QueueLimit = 10;
    });
    options.AddFixedWindowLimiter("auth", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 10;
    });
    options.RejectionStatusCode = 429;
});
```

## Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1714400000
Retry-After: 30
```

## Rules

1. **Always return 429** with `Retry-After` header
2. **Rate limit by user** (authenticated) or **by IP** (public)
3. **Stricter on auth endpoints** — prevent brute force
4. **Skip health checks** — monitoring shouldn't be rate limited
5. **Log rate limit hits** — detect abuse patterns
6. **Distributed rate limiting** — use Redis for multi-instance deployments
