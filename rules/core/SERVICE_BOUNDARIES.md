# Service Boundaries & Domain Separation

## Boundary Rules

### 1. Each Service Owns Its Data

```
✅ OrderService → orders DB (only OrderService reads/writes)
✅ UserService → users DB (only UserService reads/writes)

❌ OrderService directly queries users DB
❌ Shared database between services
```

- Services communicate via APIs, not shared databases
- If you need user data in OrderService, call UserService API
- Exception: read replicas for reporting (read-only)

### 2. API Boundaries

```
┌─────────────┐     API call      ┌─────────────┐
│ OrderService │ ───────────────→  │ UserService  │
│              │                   │              │
│ orders DB   │                   │ users DB     │
└─────────────┘                   └─────────────┘

❌ OrderService → users DB (direct DB access across boundary)
```

### 3. Module Boundaries (Monolith)

Even in a monolith, maintain logical boundaries:

```typescript
// ✅ CORRECT — module communicates via exported service
@Module({
  imports: [UserModule],  // Import the module
  providers: [OrderService],
})
export class OrderModule {}

// OrderService injects UserService (from UserModule)
constructor(private readonly userService: UserService) {}

// ❌ WRONG — reaching into another module's internals
constructor(
  @InjectRepository(User) private userRepo: Repository<User>, // Not your entity!
) {}
```

### 4. Frontend Boundaries

```
✅ Each feature module owns its:
   - Components (not shared unless in /shared)
   - Hooks / Providers
   - Services (API calls)
   - Types

❌ Feature A imports Feature B's internal component
❌ Shared component depends on feature-specific logic
```

## Shared vs Owned

| Layer | Shared | Owned by feature |
|-------|--------|-----------------|
| UI components (Button, Card, Modal) | ✅ Shared | — |
| Business components (TransactionList) | — | ✅ Feature owns |
| API service files | — | ✅ Feature owns |
| Hooks / Providers | — | ✅ Feature owns |
| Types / DTOs | ✅ Shared (common) | ✅ Feature-specific |
| Utils (formatCurrency, formatDate) | ✅ Shared | — |
| Auth, theme, config | ✅ Shared (core) | — |

## Cross-Cutting Concerns

These are the ONLY things that should cross boundaries:

| Concern | How |
|---------|-----|
| Authentication | Middleware/Guard — applied globally |
| Logging | Interceptor — applied globally |
| Error handling | Exception filter — applied globally |
| Correlation ID | Middleware — propagated automatically |
| Audit trail | Event-driven — services emit events |
| Caching | Service-level — each service caches its own data |

## Anti-Patterns

```
❌ God service that imports 10 other services
   → Split into orchestrator + focused services

❌ Circular dependency: A → B → A
   → Use events: A emits event, B listens

❌ Feature A reaches into Feature B's folder
   → Extract shared piece to /shared, or expose via API

❌ Direct database access across service boundaries
   → Call the owning service's API

❌ Shared mutable state between services
   → Use message queue or event bus
```

## Dependency Direction

```
UI Layer (screens, components)
    ↓ depends on
Application Layer (hooks, providers, services)
    ↓ depends on
Domain Layer (entities, business rules)
    ↓ depends on
Infrastructure Layer (DB, HTTP, cache)

❌ Never depend upward
❌ Domain layer must not know about HTTP or UI
```
