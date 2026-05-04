# Testing Strategy

## Test Pyramid

```
        /  E2E  \          Few, slow, expensive
       /----------\
      / Integration \      Some, medium speed
     /----------------\
    /    Unit Tests     \  Many, fast, cheap
   /____________________\
```

| Layer | Coverage Target | Speed | What to test |
|-------|----------------|-------|-------------|
| Unit | 80%+ | <5s per test | Services, hooks, utils, pure functions |
| Integration | Key flows | <30s per test | API endpoints, DB queries |
| E2E | Critical paths | <2min per test | Login, payment, core user flows |

## What to Test Per Layer

### Backend — Service Layer (unit)
- Happy path — CRUD succeeds
- Not found — entity missing → proper error
- Validation — invalid input rejected
- Business rules — domain logic enforced
- Audit fields — createdBy/modifiedBy populated
- Soft delete — isDeleted flag set, not hard delete
- Idempotency — duplicate request handled

### Backend — Controller Layer (integration)
- Correct HTTP status codes (201/204/404/409/422)
- Response envelope structure
- Auth — 401 without token, 403 wrong role
- Pagination — boundaries, defaults
- Validation — field-level errors returned

### Frontend — Components (unit)
- Loading state visible
- Data renders correctly
- Empty state with CTA
- Error state with retry
- Financial formatting (currency, decimals)
- Form validation on blur
- Submit disabled during API call

### Frontend — E2E (critical paths only)
- Login → Dashboard → View portfolio
- Create transaction → Confirm → Success
- Search → Filter → Paginate

## Test Naming

```
// Pattern: MethodName_Scenario_ExpectedResult

// .NET
GetByIdAsync_WhenExists_ReturnsTransaction()
GetByIdAsync_WhenNotFound_ReturnsFailure()
CreateAsync_WithInvalidAmount_ReturnsValidationError()

// NestJS / React
it('should return paginated transactions')
it('should throw NotFoundException for missing transaction')
it('shows loading skeleton initially')
it('shows empty state when no data')
```

## Rules

1. **Mock external dependencies** — never hit real APIs/DB in unit tests
2. **Test behavior, not implementation** — don't test private methods
3. **No snapshot tests** for dynamic content
4. **Accessibility queries first** — `getByRole`, `getByLabelText` over `getByTestId`
5. **Each test is independent** — no shared state between tests
6. **Test the contract** — inputs and outputs, not internal state
7. **CI must run tests** — no merge with failing tests
8. **New code = new tests** — every PR must include tests for changes
