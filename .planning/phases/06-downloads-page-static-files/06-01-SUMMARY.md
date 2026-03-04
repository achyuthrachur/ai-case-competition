---
phase: 06-downloads-page-static-files
plan: 01
subsystem: testing
tags: [vitest, react-testing-library, tdd, downloads, downloads-page]

# Dependency graph
requires:
  - phase: 04-instructions-page
    provides: confirmed working pure Server Component test pattern (no mocks)
provides:
  - Failing DownloadsPage test suite (8 tests, RED state) covering DL-01 through DL-04
  - DownloadCard.tsx named-export stub with correct props interface
affects:
  - 06-downloads-page-static-files plan 02 (must make these 7 failing tests go GREEN)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - TDD RED state: write failing tests before implementation exists
    - Pure Server Component test pattern: no vi.mock(), no beforeEach, render-and-assert per test
    - getAllByRole + toHaveLength for multiple same-role elements (3 download links)
    - Map href array approach for asserting multiple link hrefs without ambiguity

key-files:
  created:
    - src/__tests__/DownloadsPage.test.tsx
    - src/components/DownloadCard.tsx
  modified: []

key-decisions:
  - "DownloadCard stub renders basic semantic elements (h3, p, a[download]) so tests compile and assert against real DOM — stub may produce partial GREEN but Plan 02 replaces with full Crowe-branded implementation"
  - "Test 6 uses getAllByText('< 5 KB') asserting length 2 — both data_dictionary.md and setup_guide.md share this file size string"
  - "Test 8 maps hrefs from getAllByRole links array instead of individual getByRole to avoid 'multiple elements' error"

patterns-established:
  - "DownloadsPage test pattern: mirror InstructionsPage/RubricPage — no mocks, pure Server Component, render-per-test"
  - "Multiple same-text assertions: getAllByText + toHaveLength when two cards share identical text (< 5 KB)"

requirements-completed: [DL-01, DL-02, DL-03, DL-04]

# Metrics
duration: 2min
completed: 2026-03-04
---

# Phase 6 Plan 01: Downloads Page TDD RED State Summary

**8-test failing spec suite for DownloadsPage covering file cards (DL-01..03) and download anchor attributes (DL-04), with minimal DownloadCard stub**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-04T20:18:41Z
- **Completed:** 2026-03-04T20:20:48Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments

- Created `src/__tests__/DownloadsPage.test.tsx` with 8 tests in TDD RED state (7 failing, 1 passing)
- Created `src/components/DownloadCard.tsx` stub with correct `DownloadCardProps` interface and named export
- Tests cover all three file cards (transactions.csv, data_dictionary.md, setup_guide.md) and download link behavior
- Zero import/TypeScript compilation errors — test suite is a clean executable specification for Plan 02

## Task Commits

Each task was committed atomically:

1. **Task 1: Write failing DownloadsPage test suite (RED state) + DownloadCard stub** - `10af442` (test)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified

- `src/__tests__/DownloadsPage.test.tsx` - 8-test spec: page title, 3 file card headings, descriptions/sizes, download attributes, download hrefs
- `src/components/DownloadCard.tsx` - Stub with DownloadCardProps interface (fileName, description, fileSize, href) and named export; renders basic semantic HTML for test compilation

## Decisions Made

- DownloadCard stub renders `<h3>`, `<p>`, `<a href={href} download>Download</a>` so test imports compile and selector queries run — stub does NOT need Crowe styling yet (that is Plan 02)
- Test 6 uses `getAllByText('< 5 KB')` asserting `toHaveLength(2)` — both data_dictionary.md and setup_guide.md share the same file size string; exact match distinguishes from `~150 KB`
- Test 7 uses `getAllByRole('link', { name: /download/i })` + `toHaveLength(3)` + per-link `toHaveAttribute('download')` — avoids "multiple elements found" error
- Test 8 maps href array from `getAllByRole` results rather than three individual `getByRole` calls — same ambiguity avoidance pattern

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 7 of 8 tests are failing (RED) — Plan 02 must implement the full DownloadsPage with three DownloadCard instances using proper hrefs
- DownloadCard stub is ready to be replaced with Crowe-branded card component in Plan 02
- Test 1 (page title) already passes — the existing downloads stub page has `<h1>Downloads</h1>`

---
*Phase: 06-downloads-page-static-files*
*Completed: 2026-03-04*

## Self-Check: PASSED
