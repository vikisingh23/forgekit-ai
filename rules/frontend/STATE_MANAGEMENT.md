# State Management Guide

## Decision Tree

```
Is it from an API?
  └─ YES → React Query / Riverpod FutureProvider (MANDATORY)
  └─ NO → Is it shared across multiple components?
            └─ YES → Is it complex (many fields, derived state)?
            │         └─ YES → Zustand / BLoC / StateNotifier
            │         └─ NO → React Context / Riverpod Provider
            └─ NO → useState / setState (local state)
```

## State Categories

| Category | Example | Solution |
|----------|---------|----------|
| **Server state** | API data, user profile, transactions | React Query / Riverpod |
| **UI state** | Modal open, tab selected, sidebar collapsed | `useState` / local state |
| **Form state** | Input values, validation errors | React Hook Form / flutter_form_builder |
| **Global app state** | Theme, locale, auth status | Context / Zustand / Riverpod |
| **URL state** | Filters, pagination, search query | URL params (router) |

## Rules

### Server State (React Query / Riverpod)
```
✅ useQuery() for all GET requests
✅ useMutation() for all POST/PUT/DELETE
✅ Invalidate cache after mutations
✅ staleTime for data that doesn't change often
❌ NEVER useState + useEffect for API data
❌ NEVER duplicate server state in local state
```

### Local State
```
✅ useState for UI toggles, form inputs
✅ useReducer for complex local state (multiple related fields)
❌ NEVER lift state up just to share — use React Query or Context
❌ NEVER put everything in global state
```

### Global State (only when needed)
```
✅ Auth status (logged in user, token)
✅ Theme preference (dark/light)
✅ Locale / language
❌ NEVER put API data in global state — use React Query
❌ NEVER put form data in global state
```

## Anti-Patterns

```typescript
// ❌ Fetching in useEffect + storing in useState
const [data, setData] = useState(null);
useEffect(() => { fetchData().then(setData); }, []);

// ✅ React Query handles everything
const { data } = useQuery(queryOptions);

// ❌ Prop drilling through 3+ levels
<App> → <Dashboard> → <Panel> → <Chart data={data}>

// ✅ Each component fetches its own data
<Chart /> // internally calls useQuery()

// ❌ Global state for everything
store.setTransactions(data); // Why? React Query already caches this

// ✅ Global state only for app-level concerns
store.setTheme('dark');
```
