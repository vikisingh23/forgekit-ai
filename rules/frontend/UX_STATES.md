# UX States Standard

Every data-driven screen MUST handle all 4 states.

## The 4 States

### 1. Loading
```
Show skeleton/shimmer loaders matching the layout shape.
Never show a blank screen or a centered spinner.
```

| Stack | Pattern |
|-------|---------|
| React | `<Skeleton />` component or shimmer |
| React Native | `<ShimmerPlaceholder />` |
| Flutter | `Shimmer` widget |

### 2. Empty
```
Show helpful message + clear CTA.
Never show "No data" or an empty table.
```

Example: "No transactions yet. Start your first SIP →"

### 3. Error
```
Show user-friendly message + retry action.
Never show raw error messages or stack traces.
Log technical details to console/monitoring.
```

Example: "Unable to load your portfolio. [Retry]"

### 4. Data (Success)
```
Render the actual content.
Format numbers, dates, currency per locale.
Handle edge cases: very long text, zero values, null fields.
```

## Implementation Pattern

### React (React Query)
```tsx
const { data, isLoading, error } = useQuery(queryOptions);

if (isLoading) return <TransactionListSkeleton />;
if (error) return <ErrorRetry message="Unable to load" onRetry={refetch} />;
if (!data?.length) return <EmptyState icon="receipt" title="No transactions yet" cta="Start SIP" />;
return <TransactionList data={data} />;
```

### Flutter (Riverpod)
```dart
ref.watch(transactionsProvider).when(
  loading: () => const TransactionListSkeleton(),
  error: (e, _) => ErrorRetry(message: 'Unable to load', onRetry: () => ref.invalidate(transactionsProvider)),
  data: (items) => items.isEmpty
    ? const EmptyState(title: 'No transactions yet')
    : TransactionList(items: items),
);
```

## Reusable Components (create once, use everywhere)

| Component | Props |
|-----------|-------|
| `Skeleton` / `ShimmerLoader` | `lines`, `hasAvatar`, `hasImage` |
| `EmptyState` | `icon`, `title`, `subtitle`, `ctaText`, `onCta` |
| `ErrorRetry` | `message`, `onRetry`, `showDetails` (dev only) |

## Rules

1. **Skeleton matches layout** — not a generic spinner
2. **Empty state has CTA** — guide the user to take action
3. **Error is recoverable** — always show retry
4. **Never show raw errors** — "NetworkError" means nothing to users
5. **Pull-to-refresh** on mobile lists (RN: `RefreshIndicator`, Flutter: `RefreshIndicator`)
6. **Offline state** — show cached data with "Last updated" timestamp
