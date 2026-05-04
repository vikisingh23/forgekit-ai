# Performance Budget

## API Response Times

| Endpoint Type | Target | Max | Action if exceeded |
|---------------|--------|-----|-------------------|
| Simple CRUD (GET by ID) | <100ms | 200ms | Check N+1 queries, add index |
| List with pagination | <300ms | 500ms | Check query plan, add caching |
| Complex aggregation | <1s | 2s | Add caching, consider pre-computation |
| File upload/download | <5s | 10s | Stream, don't buffer |
| Report generation | Async | — | Use queue, return job ID |

## Frontend Bundle Size

| Metric | Target | Max | Tool |
|--------|--------|-----|------|
| Initial JS bundle | <200KB gzipped | 300KB | `vite-bundle-visualizer` |
| Per-route chunk | <50KB gzipped | 100KB | Code splitting |
| First Contentful Paint | <1.5s | 2.5s | Lighthouse |
| Time to Interactive | <3s | 5s | Lighthouse |
| Largest Contentful Paint | <2.5s | 4s | Lighthouse |
| Cumulative Layout Shift | <0.1 | 0.25 | Lighthouse |

## Database Query Performance

| Query Type | Target | Max | Action |
|-----------|--------|-----|--------|
| Simple SELECT by PK | <5ms | 10ms | — |
| SELECT with WHERE + index | <20ms | 50ms | Check index usage |
| JOIN (2 tables) | <50ms | 100ms | Check join strategy |
| Aggregation | <200ms | 500ms | Consider materialized view |
| Full table scan | ❌ Never | — | Always use WHERE + index |

## Mobile Performance (RN / Flutter)

| Metric | Target | Max |
|--------|--------|-----|
| App startup (cold) | <2s | 3s |
| Screen transition | <300ms | 500ms |
| List scroll FPS | 60fps | 45fps minimum |
| Memory usage | <150MB | 200MB |
| App size (APK/IPA) | <30MB | 50MB |

## Rules

1. **Measure before optimizing** — profile first, don't guess
2. **Budget in CI** — fail build if bundle exceeds limit
3. **No unbounded queries** — always paginate, always LIMIT
4. **Lazy load** — routes, images, heavy components
5. **Cache hot data** — see CACHING_PATTERNS.md
6. **Monitor in production** — track p50, p95, p99 latencies
7. **Alert on degradation** — if p95 doubles, investigate
