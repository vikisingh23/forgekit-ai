# Frontend Rules

## Data Fetching
- React: React Query mandatory for all GET requests
- React Native: React Query + typed navigation
- Flutter: Riverpod providers for all server state
- NEVER useState/setState for API data

## Component Architecture
- Data fetching at the leaf level — each component fetches its own data
- Reuse existing components — search codebase first, refactor god components
- Single responsibility: components <150 lines, screens <50 lines (Flutter)
- Composition over configuration — small focused pieces, not mega-components

## UX States (mandatory on every screen)
- Loading: skeleton loaders, never blank screens
- Empty: helpful message with CTA
- Error: user-friendly message with retry action
- Offline: graceful degradation, cached data with "Last updated"

## Accessibility
- Proper labels (aria-label, accessibilityLabel, Semantics)
- Minimum touch targets: 44x44px (iOS) / 48x48px (Material)
- Color contrast: WCAG AA minimum
- Keyboard/screen reader navigation
