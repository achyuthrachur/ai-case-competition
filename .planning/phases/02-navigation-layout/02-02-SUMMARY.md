---
phase: 02-navigation-layout
plan: "02"
subsystem: ui
tags: [navbar, navigation, iconsax-react, next-js, tailwind, tdd, vitest, react-testing-library]

# Dependency graph
requires:
  - phase: 02-navigation-layout plan 01
    provides: Vitest + React Testing Library infrastructure and 9 failing Navbar tests (TDD RED state)
  - phase: 01-foundation
    provides: Tailwind config with Crowe brand tokens (crowe-indigo-dark, crowe-amber), cn() utility, globals.css

provides:
  - Navbar.tsx client component — fixed dark indigo navbar with wordmark, 5 nav links, amber active state, mobile hamburger
  - Updated root layout.tsx integrating Navbar above all page content with pt-16 offset
  - 4 stub route pages (/instructions, /rubric, /downloads, /submit) resolving all routes without 404
  - All 9 Navbar Vitest tests passing (TDD GREEN)

affects:
  - 03-home-page
  - 04-instructions-page
  - 05-rubric-page
  - 06-downloads-page
  - 07-submission-form
  - All future phases that depend on persistent navigation shell

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Named export React client component ('use client' + export function Navbar)
    - usePathname() from next/navigation for App Router active route detection
    - Iconsax icon variant switching (Bold = active, Linear = inactive) with exact PascalCase prop
    - border-b-2 on ALL nav links (transparent when inactive) to prevent layout shift on activation
    - Mobile menu close via useEffect watching pathname + onClick on each mobile nav link
    - data-testid='mobile-nav-link' on mobile Link elements for clean test isolation
    - Stub page pattern: minimal Server Component with labeled heading for route verification

key-files:
  created:
    - src/components/layout/Navbar.tsx
    - src/app/instructions/page.tsx
    - src/app/rubric/page.tsx
    - src/app/downloads/page.tsx
    - src/app/submit/page.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "HambergerMenu (not HamburgerMenu) — intentional typo in iconsax-react@0.0.8; use exact package export name"
  - "border-b-2 must be present on ALL links (transparent when inactive) to prevent layout shift on activation"
  - "Mobile menu uses data-testid='mobile-nav-link' per Plan 01 decision note for cleaner test isolation"
  - "pt-16 content offset applied on layout.tsx wrapper div, not individual pages — applies globally once"

patterns-established:
  - "Pattern 1: Client components in src/components/layout/ use 'use client' directive and named exports"
  - "Pattern 2: Root layout.tsx remains a Server Component — only import client components, never mark layout as client"
  - "Pattern 3: Active route detection via isActive() helper using exact match for '/', prefix match for sub-routes"
  - "Pattern 4: Stub pages are minimal Server Components; real content added in their dedicated phase"

requirements-completed: [NAV-01, NAV-02, NAV-03, NAV-04]

# Metrics
duration: ~20min
completed: 2026-03-04
---

# Phase 2 Plan 02: Navigation Layout Summary

**Fixed dark indigo navbar with Iconsax icons, amber active state, and mobile hamburger — wired into root layout with 5 navigable routes all passing 9 Vitest tests**

## Performance

- **Duration:** ~20 min (estimated — continued from checkpoint)
- **Started:** 2026-03-04T03:03:30Z
- **Completed:** 2026-03-04T03:19:37Z
- **Tasks:** 3 (Tasks 1 and 2 auto, Task 3 human checkpoint — approved)
- **Files modified:** 7

## Accomplishments
- Navbar.tsx client component built matching all locked design decisions: `bg-crowe-indigo-dark`, amber active state (`text-crowe-amber border-b-2 border-crowe-amber`), inactive state (`text-[#f6f7fa]/70 border-transparent`), Iconsax icons switching between Linear/Bold variants
- Root layout.tsx updated to import and render Navbar above all content with `pt-16` offset compensating for fixed `h-16` navbar — eliminates content-behind-navbar overlap on every route
- 4 stub route pages created at /instructions, /rubric, /downloads, /submit — all routes navigable without 404s, amber active state visually verifiable per-route
- All 9 Navbar Vitest tests passed GREEN — TDD RED → GREEN cycle completed from Plan 01

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Navbar.tsx client component** - `576d699` (feat)
2. **Task 2: Update root layout and create 4 stub route pages** - `a2fda21` (feat)
3. **Task 3: Visual verification checkpoint** - Approved by human (no code commit — verification only)

## Files Created/Modified
- `src/components/layout/Navbar.tsx` — Client component: wordmark, 5 nav links with Iconsax icons, amber active state, mobile hamburger dropdown, route-change close behavior
- `src/app/layout.tsx` — Root layout integrating Navbar + `pt-16` content wrapper; metadata title set
- `src/app/page.tsx` — Placeholder home page (replaces Phase 1 smoke test; real content in Phase 3)
- `src/app/instructions/page.tsx` — Stub route: /instructions
- `src/app/rubric/page.tsx` — Stub route: /rubric
- `src/app/downloads/page.tsx` — Stub route: /downloads
- `src/app/submit/page.tsx` — Stub route: /submit

## Decisions Made
- Used `HambergerMenu` (intentional iconsax-react typo) — correct package export name, not `HamburgerMenu`
- Applied `border-b-2 border-transparent` to inactive links — prevents 2px layout shift when link activates; discovered in Plan 01 research
- Added `data-testid="mobile-nav-link"` to mobile Link elements — per Plan 01 decision note, enables clean test isolation without relying on shared label text between desktop/mobile links
- `pt-16` offset on the `div` wrapping `<main>` in layout.tsx (not on individual pages) — global fix applied once

## Deviations from Plan

None — plan executed exactly as written. All locked design decisions applied as specified. The `data-testid="mobile-nav-link"` addition was anticipated in Plan 01's decision log as "Plan 02 may add data-testid='mobile-nav-link' for cleaner isolation" — this was planned intent, not a deviation.

## Issues Encountered

None — implementation followed the research skeleton exactly. The iconsax `HambergerMenu` typo was documented in Plan 01 research and interfaces block, so it was handled correctly from the start.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- Navigation shell is complete and present on all routes — Phase 3 (Home Page) can build its hero and content sections under the navbar without any setup
- 4 stub pages exist at the correct routes — Phases 4-7 can add content to these pages directly
- All Navbar tests are GREEN — the test suite protects navbar behavior through future phases
- No blockers for Phase 3

---
*Phase: 02-navigation-layout*
*Completed: 2026-03-04*

## Self-Check: PASSED

- FOUND: `.planning/phases/02-navigation-layout/02-02-SUMMARY.md`
- FOUND: commit `576d699` (Task 1 — Navbar.tsx)
- FOUND: commit `a2fda21` (Task 2 — layout + stub pages)
