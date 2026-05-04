---
name: NeuraForge AI Design System
version: 1.0.0
base: Material Design 3

tokens:
  colors:
    primary: "#1976D2"
    primary-light: "#42A5F5"
    primary-dark: "#1565C0"
    primary-container: "#E3F2FD"
    secondary: "#9C27B0"
    secondary-container: "#F3E5F5"
    tertiary: "#F9A212"
    tertiary-container: "#FFF3E0"
    background: "#FAFAFA"
    surface: "#FFFFFF"
    surface-variant: "#F5F5F5"
    surface-container: "#EEEEEE"
    outline: "#E0E0E0"
    outline-variant: "#BDBDBD"
    on-primary: "#FFFFFF"
    on-surface: "#212121"
    on-surface-variant: "#757575"
    error: "#D32F2F"
    error-container: "#FFEBEE"
    success: "#2E7D32"
    success-container: "#E8F5E9"
    warning: "#ED6C02"
    warning-container: "#FFF3E0"
    info: "#0288D1"
    info-container: "#E1F5FE"
    scrim: "rgba(0,0,0,0.32)"

  typography:
    font-family: "Roboto, system-ui, -apple-system, sans-serif"
    font-mono: "Roboto Mono, SF Mono, Consolas, monospace"
    scale:
      display-large: "57px / 400 / -0.25px"
      display-medium: "45px / 400"
      display-small: "36px / 400"
      headline-large: "32px / 400"
      headline-medium: "28px / 400"
      headline-small: "24px / 400"
      title-large: "22px / 400"
      title-medium: "16px / 500 / 0.15px"
      title-small: "14px / 500 / 0.1px"
      body-large: "16px / 400 / 0.5px"
      body-medium: "14px / 400 / 0.25px"
      body-small: "12px / 400 / 0.4px"
      label-large: "14px / 500 / 0.1px"
      label-medium: "12px / 500 / 0.5px"
      label-small: "11px / 500 / 0.5px"

  spacing:
    xs: "4px"
    sm: "8px"
    md: "16px"
    lg: "24px"
    xl: "32px"
    xxl: "48px"

  radius:
    none: "0"
    xs: "4px"
    sm: "8px"
    md: "12px"
    lg: "16px"
    xl: "28px"
    full: "9999px"

  elevation:
    level0: "none"
    level1: "0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)"
    level2: "0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)"
    level3: "0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)"
    level4: "0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)"
    level5: "0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)"

  motion:
    duration-short: "200ms"
    duration-medium: "300ms"
    duration-long: "500ms"
    easing-standard: "cubic-bezier(0.2, 0, 0, 1)"
    easing-emphasized: "cubic-bezier(0.2, 0, 0, 1)"
    easing-decelerate: "cubic-bezier(0, 0, 0, 1)"
    easing-accelerate: "cubic-bezier(0.3, 0, 1, 1)"

  components:
    button:
      height: "40px"
      radius: "20px"
      padding: "0 24px"
    fab:
      size: "56px"
      radius: "16px"
    card:
      radius: "12px"
      padding: "16px"
    chip:
      height: "32px"
      radius: "8px"
    text-field:
      height: "56px"
      radius: "4px 4px 0 0"
    dialog:
      radius: "28px"
    navigation-bar:
      height: "80px"
    top-app-bar:
      height: "64px"
---

## Overview

NeuraForge AI uses Material Design 3 (Material You) as its design foundation. This provides a well-documented, accessible, and widely-adopted design language that works across web, mobile, and desktop. The system uses MUI (Material UI) for React implementations and follows Material 3 guidelines for all other stacks.

**Key Characteristics:**
- Clean, light surfaces with subtle elevation for hierarchy
- Blue primary (#1976D2) for trust and professionalism
- Purple secondary (#9C27B0) for AI/intelligence associations
- Amber tertiary (#F9A212) for highlights and attention
- Roboto font family — the Material standard
- 8px spacing grid
- Rounded shapes following M3 shape scale
- Motion with Material easing curves

## Colors

### Primary (Blue)
- **Primary** (#1976D2) — Main interactive elements: buttons, links, active states, FABs. Conveys reliability and trust.
- **Primary Container** (#E3F2FD) — Tonal backgrounds for selected states, chips, badges.

### Secondary (Purple)
- **Secondary** (#9C27B0) — AI-related elements, agent badges, skill indicators. Associates with intelligence and creativity.
- **Secondary Container** (#F3E5F5) — Tonal backgrounds for secondary elements.

### Tertiary (Amber)
- **Tertiary** (#F9A212) — Highlights, warnings, premium features, attention-drawing elements.

### Surfaces
- **Background** (#FAFAFA) — Page background. Slightly warm gray, not pure white.
- **Surface** (#FFFFFF) — Cards, dialogs, sheets. Pure white for maximum elevation contrast.
- **Surface Variant** (#F5F5F5) — Alternate sections, input backgrounds.
- **Outline** (#E0E0E0) — Borders, dividers. Subtle separation.

### Status
- **Error** (#D32F2F) — Validation errors, failed states, destructive actions
- **Success** (#2E7D32) — Passing tests, successful operations, positive metrics
- **Warning** (#ED6C02) — Caution states, pending actions
- **Info** (#0288D1) — Informational messages, tips

## Typography

**Roboto** — Material Design's standard typeface. Clean, neutral, excellent readability at all sizes.
**Roboto Mono** — For code blocks, terminal output, technical data.

Follow the M3 type scale exactly. Key mappings:
- Page titles → `headline-large` (32px)
- Section headers → `headline-small` (24px)
- Card titles → `title-large` (22px)
- Body text → `body-large` (16px)
- Buttons → `label-large` (14px, weight 500)
- Captions → `body-small` (12px)

## Components

### Buttons (M3 spec)
- **Filled:** Primary color background, white text, 20px radius (pill-like), 40px height
- **Outlined:** Transparent background, primary border, primary text
- **Text:** No background, no border, primary text — for low-emphasis actions
- **FAB:** 56px square, 16px radius, primary container color, elevation level 3
- **Touch target:** Minimum 48px (M3 accessibility requirement)

### Cards (M3 spec)
- **Filled:** Surface color, 12px radius, elevation level 1
- **Outlined:** Surface color, 12px radius, 1px outline border, no elevation
- **Elevated:** Surface color, 12px radius, elevation level 2
- **Padding:** 16px internal

### Text Fields (M3 spec)
- **Filled:** Surface variant background, 4px top radius, bottom border
- **Outlined:** Transparent background, 4px radius, full border
- **Height:** 56px
- **Label:** Floats above on focus (Material animation)
- **Error:** Red border + red helper text below

### Navigation
- **Top App Bar:** 64px height, surface color, title in headline-small
- **Navigation Bar (bottom):** 80px height, 3-5 destinations, active item in primary
- **Navigation Rail (desktop):** 80px width, vertical icons + labels
- **Tabs:** 48px height, active tab has primary indicator

### Dialogs
- 28px radius (M3's largest shape)
- Scrim overlay (rgba(0,0,0,0.32))
- Title in headline-small, body in body-medium
- Actions right-aligned: text buttons

### Chips
- 32px height, 8px radius
- **Assist:** Outlined, for suggestions
- **Filter:** Tonal, for active filters with checkmark
- **Input:** Outlined with trailing X for removable items

## Layout

### Responsive Breakpoints (M3)
- **Compact:** 0-599px (phone) — single column, bottom nav
- **Medium:** 600-839px (tablet) — 2 columns, navigation rail
- **Expanded:** 840px+ (desktop) — 3+ columns, navigation rail or drawer

### Spacing
- Base unit: 8px
- Component padding: 16px
- Section spacing: 24-48px
- Page margins: 16px (compact), 24px (medium), 32px+ (expanded)

### Content Width
- Max: 1200px centered on expanded
- Cards: fill available width in grid

## Motion

Follow M3 motion guidelines:
- **Standard easing** for most transitions: `cubic-bezier(0.2, 0, 0, 1)`
- **Duration:** 200ms for small changes, 300ms for medium, 500ms for large
- **Enter:** Decelerate easing (fast start, slow end)
- **Exit:** Accelerate easing (slow start, fast end)
- **Shared axis:** For navigation transitions (forward/backward)

## Do's and Don'ts

### Do
- Use the M3 type scale exactly — don't invent custom sizes
- Use elevation (shadows) for hierarchy, not borders
- Use tonal colors (containers) for selected/active states
- Follow the 8px spacing grid
- Use Roboto for all UI text
- Use filled buttons for primary actions, outlined for secondary
- Minimum 48px touch targets

### Don't
- Don't use custom shadows — use the 5-level elevation scale
- Don't use sharp corners — minimum 4px radius on everything
- Don't mix font families — Roboto for UI, Roboto Mono for code
- Don't use color alone to convey meaning — add icons/text for accessibility
- Don't skip motion — transitions make the UI feel responsive
- Don't use more than 3 colors prominently on one screen
