# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** DevWithSiddharth
**Generated:** 2026-10-27 00:29:28
**Category:** Developer Tool / IDE

---

## Global Rules

### Color Palette

| Role             | Hex                     | CSS Variable             |
| ---------------- | ----------------------- | ------------------------ |
| Primary          | `oklch(0.45 0.12 202)`  | `--primary`              |
| On Primary       | `oklch(0.99 0.002 92)`  | `--primary-foreground`   |
| Secondary        | `oklch(0.96 0.008 88)`  | `--secondary`            |
| On Secondary     | `oklch(0.24 0.02 24)`   | `--secondary-foreground` |
| Accent/CTA       | `oklch(0.58 0.09 203)`  | `--cyan`                 |
| Background       | `oklch(0.99 0.008 92)`  | `--background`           |
| Foreground       | `oklch(0.2 0.02 24)`    | `--foreground`           |
| Card             | `oklch(0.997 0.006 90)` | `--card`                 |
| Muted            | `oklch(0.96 0.01 88)`   | `--muted`                |
| Muted Foreground | `oklch(0.49 0.017 24)`  | `--muted-foreground`     |
| Border           | `oklch(0.89 0.012 84)`  | `--border`               |
| Destructive      | `#EF4444`               | `--color-destructive`    |
| On Destructive   | `#000000`               | `--color-on-destructive` |
| Ring             | `#FFFFFF`               | `--color-ring`           |

**Color Notes:** Warm neutral surfaces with a muted cyan accent; the dark theme uses deep blue-gray surfaces and brighter cyan.

### Typography

- **Display and body Font:** Manrope
- **Code Font:** JetBrains Mono
- **Accent Font:** Instrument Serif
- **Mood:** friendly, technical, warm, personal
- **Google Fonts:** [Manrope + JetBrains Mono + Instrument Serif](https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap)

**CSS Import:**

```css
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap");
```

### Spacing Variables

| Token         | Value             | Usage                     |
| ------------- | ----------------- | ------------------------- |
| `--space-xs`  | `4px` / `0.25rem` | Tight gaps                |
| `--space-sm`  | `8px` / `0.5rem`  | Icon gaps, inline spacing |
| `--space-md`  | `16px` / `1rem`   | Standard padding          |
| `--space-lg`  | `24px` / `1.5rem` | Section padding           |
| `--space-xl`  | `32px` / `2rem`   | Large gaps                |
| `--space-2xl` | `48px` / `3rem`   | Section margins           |
| `--space-3xl` | `64px` / `4rem`   | Hero padding              |

### Shadow Depths

| Level         | Value                          | Usage                       |
| ------------- | ------------------------------ | --------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`   | Subtle lift                 |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)`    | Cards, buttons              |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)`  | Modals, dropdowns           |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: var(--card);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Warm developer portfolio

**Keywords:** Warm neutral, cyan accent, soft grid, subtle glow, developer terminal, rounded cards

**Best For:** Personal developer portfolio, project showcase, interactive terminal

**Key Effects:** Soft ambient gradients, gentle card lift, restrained gradient CTA, visible focus

### Page Pattern

**Pattern Name:** Personal Portfolio Showcase

- **Conversion Strategy:** Lead with the developer's focus, show real projects, and make contact easy to find.
- **CTA Placement:** Project link in the hero; collaboration CTA near the end of the page.
- **Section Order:** Intro > Interactive terminal > Selected work > About and learning > Contact CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ Light mode default
- ❌ Slow performance

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
