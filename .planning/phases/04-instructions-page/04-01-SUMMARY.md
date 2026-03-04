---
phase: 04-instructions-page
plan: 01
subsystem: testing
tags: [vitest, react-testing-library, tdd, instructions-page, server-component]

# Dependency graph
requires:
  - phase: 02-navigation-layout
    provides: Vitest + React Testing Library test infrastructure installed and configured
  - phase: 03-home-page
    provides: Established RTL render pattern for Server Components without mocks
provides:
  - Failing test suite for InstructionsPage covering INST-01 through INST-05 (RED state)
  - 13 tests establishing acceptance criteria before Plan 02 implementation
affects: [04-02-PLAN, any future InstructionsPage changes]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pure Server Component tests need no mocks — import directly and render with RTL"
    - "Guidance callout label uses DOM text 'Guidance' (not 'GUIDANCE') — Tailwind uppercase is CSS-only"
    - "Badge number tests (getByText('1'), getByText('2')) verify DOM presence without CSS assertions"

key-files:
  created:
    - src/__tests__/InstructionsPage.test.tsx
  modified: []

key-decisions:
  - "No mocks needed: InstructionsPage is a pure Server Component with no hooks, router, animations, or icons"
  - "Guidance callout test asserts DOM text 'Guidance' not 'GUIDANCE' — Tailwind uppercase is CSS-only and does not affect accessible text"
  - "Badge tests use getByText('1') and getByText('2') — verifies numbered deliverable badges are present in DOM"

patterns-established:
  - "Pattern: Pure Server Component test — no mocks, direct import, straightforward RTL render"
  - "Pattern: Guidance callout DOM text assertion — test for 'Guidance' not 'GUIDANCE' for CSS-uppercase components"

requirements-completed: [INST-01, INST-02, INST-03, INST-04, INST-05]

# Metrics
duration: 3min
completed: 2026-03-04
---

# Phase 4 Plan 01: Instructions Page Test Suite Summary

**13 failing RTL tests establishing acceptance criteria for all 5 InstructionsPage requirements (INST-01..05) in TDD RED state**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-04T16:34:53Z
- **Completed:** 2026-03-04T16:37:10Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Created src/__tests__/InstructionsPage.test.tsx with 13 tests covering all 5 requirements
- Confirmed all 13 tests fail (RED state) against the current 6-line stub
- Verified no regressions — Navbar and HomePage suites remain green (14 tests passing)
- Established that InstructionsPage requires no mocks since it is a pure Server Component

## Task Commits

Each task was committed atomically:

1. **Task 1: Write failing InstructionsPage test suite (RED state)** - `65f7d05` (test)

## Files Created/Modified
- `src/__tests__/InstructionsPage.test.tsx` - 13 RTL tests covering INST-01 through INST-05, all in RED state

## Decisions Made
- No mocks needed: InstructionsPage is a pure Server Component with no hooks, router calls, animation dependencies, or icon imports — simplest test file in the project
- Guidance callout label test uses exact string `'Guidance'` not `'GUIDANCE'` — Tailwind `uppercase` class is CSS-only and does not affect DOM text content or accessible queries
- Badge tests use `getByText('1')` and `getByText('2')` to verify the indigo number badges are present as DOM nodes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Test suite is in RED state and ready for Plan 02 (implementation)
- Plan 02 will implement the full InstructionsPage content, causing all 13 tests to turn GREEN
- No blockers

## Self-Check: PASSED

- FOUND: src/__tests__/InstructionsPage.test.tsx
- FOUND: commit 65f7d05 (test(04-01): add failing InstructionsPage test suite)

---
*Phase: 04-instructions-page*
*Completed: 2026-03-04*
