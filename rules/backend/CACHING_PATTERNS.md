# Caching Patterns

## Cache Strategy

| Data Type | Strategy | TTL | Example |
|-----------|----------|-----|---------|
| Static reference data | Cache-aside, long TTL | 1 hour | Scheme list, bank list |
| User-specific data | Cache-aside, short TTL | 5 min | Portfolio, holdings |
| Session data | Write-through | Session duration | Auth tokens, user context |
| Computed/aggregated | Cache-aside, medium TTL | 15 min | Dashboard stats, reports |
| Real-time data | No cache | — | Live prices, order status |

## Cache-Aside Pattern

### NestJS
```typescript
@Injectable()
export class SchemeService {
  constructor(
    private readonly schemeRepo: SchemeRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getSchemes(): Promise<Scheme[]> {
    const cached = await this.cache.get<Scheme[]>('schemes:all');
    if (cached) return cached;

    const schemes = await this.schemeRepo.findAll();
    await this.cache.set('schemes:all', schemes, 3600); // 1 hour
    return schemes;
  }

  async updateScheme(id: string, dto: UpdateSchemeDto): Promise<void> {
    await this.schemeRepo.update(id, dto);
    await this.cache.del('schemes:all'); // Invalidate
  }
}
```

### .NET
```csharp
public async Task<List<Scheme>> GetSchemesAsync(CancellationToken ct)
{
    return await _cache.GetOrCreateAsync("schemes:all", async entry =>
    {
        entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
        return await _schemeRepo.GetAllAsync(ct);
    });
}
```

## Cache Key Naming

```
{domain}:{entity}:{identifier}:{variant}

schemes:all
schemes:detail:SCH001
portfolio:investor:INV001
dashboard:stats:daily:2026-04-29
```

## Cache Invalidation Rules

1. **Write-through**: Update cache on every write
2. **TTL-based**: Set appropriate expiry, accept staleness
3. **Event-driven**: Invalidate on domain events
4. **Never cache**: Financial transactions in progress, real-time prices

## Redis Configuration

```typescript
// NestJS
CacheModule.register({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: 6379,
  ttl: 300, // Default 5 min
  max: 1000, // Max items
})
```

## Rules

1. **Cache reads, not writes** — never cache mutation results
2. **Always set TTL** — no infinite caches
3. **Invalidate on mutation** — stale data is worse than no cache
4. **Cache at service layer** — not in controllers or repositories
5. **Monitor hit rates** — below 80% means wrong caching strategy
6. **Graceful degradation** — if Redis is down, fall through to DB
7. **No sensitive data** — don't cache PII, tokens, or passwords in shared cache

## Cache Key Builder Pattern

Standardize key construction across all services:

```python
CACHE_KEY_SEPARATOR = "_"
DEFAULT_TIMEOUT = 21600  # 6 hours

def build_cache_key(identifier: str, prefix: str) -> str:
    """Build standardized cache key: prefix_identifier"""
    return CACHE_KEY_SEPARATOR.join((prefix, identifier))

def build_cache_keys(identifiers: list, prefix: str) -> list:
    """Build multiple cache keys"""
    return [build_cache_key(id, prefix) for id in identifiers]

# Usage
key = build_cache_key("SCH001", "scheme_nav")  # → "scheme_nav_SCH001"
keys = build_cache_keys(["INV001", "INV002"], "portfolio")  # → ["portfolio_INV001", "portfolio_INV002"]
```

### Key Naming Convention
```
{service}_{entity}_{identifier}

scheme_nav_SCH001
portfolio_holdings_INV001
notification_template_WELCOME_EMAIL
```
