---
# DESIGN.md — NeuraForge AI Visual Identity
# Google Stitch / design.md specification (Apache 2.0)
# https://github.com/google-labs-code/design.md

name: NeuraForge AI
version: 1.0.0

tokens:
  colors:
    primary: "#2E2A94"
    primary-dark: "#1A1744"
    accent: "#F9A212"
    background: "#0F0C2E"
    surface: "#1A1550"
    surface-elevated: "rgba(255,255,255,0.04)"
    border: "rgba(255,255,255,0.08)"
    text-primary: "#FFFFFF"
    text-secondary: "#B8B5E0"
    text-muted: "#8886B0"
    text-dim: "#6C63A0"
    success: "#4CAF50"
    error: "#EF5350"
    warning: "#F9A212"
    info: "#4FC3F7"

  typography:
    font-family: "Inter, system-ui, -apple-system, sans-serif"
    font-mono: "SF Mono, Fira Code, Consolas, monospace"
    scale:
      display: "72px / 800"
      h1: "48px / 800"
      h2: "36px / 700"
      h3: "24px / 700"
      body: "18px / 400"
      small: "14px / 400"
      caption: "12px / 600"
    letter-spacing:
      label: "3px uppercase"
      heading: "0"
      body: "0"

  spacing:
    xs: "4px"
    sm: "8px"
    md: "16px"
    lg: "24px"
    xl: "40px"
    xxl: "80px"

  radius:
    sm: "8px"
    md: "12px"
    lg: "16px"
    pill: "9999px"

  shadows:
    card: "0 2px 8px rgba(0,0,0,0.2)"
    elevated: "0 8px 32px rgba(0,0,0,0.5)"
    glow-accent: "0 0 80px rgba(249,162,18,0.06)"
    glow-primary: "0 0 60px rgba(46,42,148,0.15)"
---

## Overview

NeuraForge AI uses a dark, professional visual identity inspired by developer tooling and terminal aesthetics. The design conveys technical authority while remaining approachable. Deep purple gradients create depth, amber accent draws attention to key actions and data, and generous whitespace prevents cognitive overload.

**Key Characteristics:**
- Dark-first design — deep purple gradient backgrounds, never white
- Terminal-inspired code blocks with syntax highlighting
- Amber accent used sparingly for CTAs, badges, and key metrics
- Clean data presentation with cards and tables
- Generous spacing creating breathing room between sections
- Professional, engineering-focused tone

## Colors

### Primary Foundation
- **Deep Space Purple** (#0F0C2E → #1A1550 → #2A1F6E) — Gradient background. Creates depth and visual hierarchy. The 135° gradient moves from near-black to rich purple.
- **Surface** (#1A1550) — Card backgrounds and elevated surfaces. Slightly lighter than background for subtle separation.
- **Surface Elevated** (rgba(255,255,255,0.04)) — Cards, code blocks, interactive elements. Barely-there lightening that creates layers without breaking the dark theme.

### Accent & Interactive
- **Amber Gold** (#F9A212) — The sole warm accent. Used for: primary CTAs, stat numbers, badges, labels, active states, and the NeuraForge logo mark. Creates focal points against the cool purple foundation.

### Text Hierarchy
- **Pure White** (#FFFFFF) — Headlines, stat numbers, primary content. Maximum contrast for key information.
- **Lavender** (#B8B5E0) — Body text, descriptions, secondary content. Readable without competing with headlines.
- **Muted Purple** (#8886B0) — Tertiary text, tech stack details, timestamps. Present but recessive.
- **Dim Purple** (#6C63A0) — Footnotes, URLs, least important text. Barely visible but accessible.

### Functional States
- **Success Green** (#4CAF50) — Passing tests, working servers, positive metrics, "after" column in comparisons
- **Error Red** (#EF5350) — Failed tests, broken servers, "before" column in comparisons
- **Info Blue** (#4FC3F7) — Links, informational highlights

## Typography

**Primary Font:** Inter — clean, modern, excellent for both UI and long-form reading.
**Monospace Font:** SF Mono / Fira Code — for code blocks, terminal output, install commands.

### Hierarchy
- **Display** (72px, weight 800): Brand name "NeuraForge AI" only. Used once per page/slide.
- **H1** (48px, weight 800): Slide/section titles. "8-Stage Pipeline", "Before vs After".
- **H2** (36px, weight 700): Sub-section headers within slides.
- **H3** (24px, weight 700): Card titles, stat labels.
- **Body** (18px, weight 400): Descriptions, explanations, list items. Line-height 1.6.
- **Small** (14px, weight 400): Tech details, footnotes, URLs.
- **Caption/Label** (12px, weight 600): Uppercase labels with 3px letter-spacing. "COVERAGE", "IMPACT", "HOW IT WORKS".

## Layout

### Grid
- **Max width:** 1080px for content (presentations), 900px for text-heavy pages
- **Padding:** 60-80px on slides/pages
- **Card gap:** 14-20px
- **Section spacing:** 40-60px between major sections

### Cards
- **Background:** {tokens.colors.surface-elevated}
- **Border:** 1px solid {tokens.colors.border}
- **Radius:** {tokens.radius.md} (12px)
- **Padding:** 20-28px
- **Hover:** Subtle shadow appears, no color change

### Code Blocks
- **Background:** rgba(0,0,0,0.3)
- **Border:** 1px solid {tokens.colors.border}
- **Radius:** {tokens.radius.md}
- **Font:** {tokens.typography.font-mono}
- **Prompt symbol:** {tokens.colors.accent} (❯)
- **Commands:** {tokens.colors.success} (green)
- **Comments:** {tokens.colors.text-dim}

## Components

### Stat Counter
```
[large number in white, weight 800]
[label in amber, uppercase, letter-spacing 2px]
```
Used for: agent count, MCP server count, skill count, stack count. Always in a horizontal row with 30-50px gap.

### Pipeline Stage Card
```
[amber numbered badge, 36px square, radius 8px]
[stage name in white, weight 700]
[agent name in muted purple]
[amber badge for key constraint: "Human approves", "Score 90+"]
```

### Before/After Table
```
[task column in white]
[before column in error red]
[after column in success green, weight 700]
```

### Section Label
```
[amber text, 14px, uppercase, letter-spacing 3px, weight 700]
```
Always appears above section title. Examples: "THE PROBLEM", "IMPACT", "COVERAGE".

## Shapes & Effects

### Glow Orbs
Decorative background elements creating ambient depth:
- **Accent glow:** 400px circle, {tokens.colors.accent} at 6% opacity, blur 80-100px
- **Primary glow:** 300px circle, {tokens.colors.primary} at 15% opacity, blur 60px
- Positioned at corners, never centered

### Slide Transitions
- **Clip-path reveal:** `inset(0 100% 0 0)` → `inset(0 0 0 0)` with spring physics
- **Content entry:** Fade + translateY(30px→0) with staggered delays per element
- **Scale-in:** For stat counters and stack cards, spring damping 12-14

## Do's and Don'ts

### Do
- Use the gradient background on every surface — never white
- Use amber sparingly — only for CTAs, stats, labels, and the logo
- Keep code blocks dark with syntax-colored text
- Use generous spacing — when in doubt, add more whitespace
- Stagger animations — each element enters 5-10 frames after the previous

### Don't
- Don't use amber for large background areas — it's an accent, not a surface
- Don't use pure black (#000) — use the deep purple (#0F0C2E) instead
- Don't mix font families — Inter for UI, monospace for code, nothing else
- Don't use borders heavier than 1px — the design relies on subtle separation
- Don't center-align body text — left-align for readability, center only for headlines
