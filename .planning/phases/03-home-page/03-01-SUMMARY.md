---
phase: 03-home-page
plan: 01
subsystem: testing
tags: [vitest, react-testing-library, tdd, jsdom, blur-text, iconsax-react]

requires:
  - phase: 02-navigation-layout
    provides: Vitest + React Testing Library test infrastructure, mock patterns for next/link and iconsax-react

provides:
  - "src/__tests__/HomePage.test.tsx: 5 failing tests establishing behavioral contract for HOME-01 through HOME-04"

affects:
  - 03-home-page/03-02

tech-stack:
  added: []
  patterns:
    - "BlurText mock pattern: render as h1 stub with data-testid='blur-text', onClick proxies onAnimationComplete for animation-state testing in jsdom"
    - "GSAP avoidance in tests: mock @/components/ui/blur-text at module level so GSAP never loads in jsdom environment"

key-files:
  created:
    - src/__tests__/HomePage.test.tsx
  modified: []

key-decisions:
  - "BlurText mock uses onClick to proxy onAnimationComplete — allows testing opacity transition state changes without triggering GSAP in jsdom"
  - "Blurb text matched via /transaction dataset/i — sufficiently unique to avoid collision with other page text"
  - "Quick-link hrefs tested via getByRole('link', { name }) — role-based query is more semantically correct than getByText + closest"

patterns-established:
  - "Animation state testing: mock animation component with onClick proxy for onAnimationComplete callback; fireEvent.click simulates completion"

requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-04]

duration: 2min
completed: 2026-03-04
---

# Phase 3 Plan 01: HomePage TDD RED — Failing Test Suite

**5 failing tests establishing the behavioral contract for HOME-01 through HOME-04 before any implementation exists**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-04T15:13:54Z
- **Completed:** 2026-03-04T15:15:35Z
- **Tasks:** 1 (TDD RED)
- **Files modified:** 1

## Accomplishments

- Wrote 5 failing tests covering all four HOME-0x requirements
- Established BlurText mock pattern that proxies onAnimationComplete via onClick — allows opacity transition testing without GSAP in jsdom
- Confirmed RED state: all 5 tests fail against current stub page.tsx
- Confirmed no regressions: all 9 existing Navbar tests continue to pass

## Task Commits

1. **TDD RED: add failing HomePage tests** - `fe86d3e` (test)

## Files Created/Modified

- `src/__tests__/HomePage.test.tsx` - 5 failing tests for HomePage component (TDD RED)

## Decisions Made

- BlurText mock renders as `<h1 data-testid="blur-text">` with `onClick={onAnimationComplete}` so `fireEvent.click` can simulate animation completion — avoids GSAP initialization in jsdom
- Blurb paragraph matched via `/transaction dataset/i` regex — specific enough to be unique, flexible enough to survive minor wording changes
- Quick-link cards tested via `getByRole('link', { name: /Label/i })` + `toHaveAttribute('href', ...)` — semantically correct, matches actual anchor role

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — mock patterns established in Phase 2 (Navbar.test.tsx) translated directly to this test file with minor additions (BlurText mock, Calendar icon).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `src/__tests__/HomePage.test.tsx` ready for Plan 02 to make green
- All 4 card hrefs, blurb opacity behavior, BlurText usage, and key dates format are locked in
- Plan 02 must implement: BlurText headline, opacity-0/opacity-100 blurb state, 4 quick-link cards, Key Dates section with two TBD entries

---
*Phase: 03-home-page*
*Completed: 2026-03-04*
