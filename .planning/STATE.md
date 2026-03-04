---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: planning
stopped_at: Completed 06-downloads-page-static-files 06-02-PLAN.md
last_updated: "2026-03-04T20:36:56.508Z"
last_activity: 2026-03-04 — Phase 4 complete — InstructionsPage implemented as pure Server Component with full case brief content; all INST-01..05 tests passing
progress:
  total_phases: 10
  completed_phases: 6
  total_plans: 12
  completed_plans: 12
  percent: 30
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-03)

**Core value:** Participants can find everything they need — instructions, dataset, rubric — and submit their work in one place without friction.
**Current focus:** Phase 5 — Rubric Page

## Current Position

Phase: 5 of 10 (Rubric Page)
Plan: 0 of 2 in current phase
Status: Ready to plan
Last activity: 2026-03-04 — Phase 4 complete — InstructionsPage implemented as pure Server Component with full case brief content; all INST-01..05 tests passing

Progress: [███░░░░░░░] 30%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: — min
- Total execution time: 0.0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01-foundation P01 | 19 | 3 tasks | 16 files |
| Phase 01-foundation P02 | 3 | 3 tasks | 5 files |
| Phase 02-navigation-layout P01 | 4 | 2 tasks | 4 files |
| Phase 02-navigation-layout P02 | 20 | 3 tasks | 7 files |
| Phase 03-home-page P01 | 2 | 1 tasks | 1 files |
| Phase 03-home-page P02 | 5 | 1 tasks | 1 files |
| Phase 03-home-page P02 | 5 | 2 tasks | 1 files |
| Phase 04-instructions-page P01 | 3 | 1 tasks | 1 files |
| Phase 04-instructions-page P02 | 7 | 1 tasks | 1 files |
| Phase 04-instructions-page P02 | 7 | 2 tasks | 1 files |
| Phase 05-rubric-page P01 | 6 | 1 tasks | 1 files |
| Phase 05-rubric-page P02 | 10 | 2 tasks | 1 files |
| Phase 06-downloads-page-static-files P01 | 2 | 1 tasks | 2 files |
| Phase 06-downloads-page-static-files P02 | 6 | 2 tasks | 4 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- React Bits + 21st.dev over Anime.js/Framer Motion — per project spec for polished, non-generic look
- Crowe Indigo + Amber palette under Meridian Financial branding — no Crowe wordmarks or logos
- Dataset 50k–100k rows — user explicitly requested for richer analysis opportunity
- Vercel Blob for file storage — integrated with Vercel, no separate service needed
- Single-page HTML deliverable for participants — no server/deploy requirement
- [Phase 01-foundation]: Tailwind v4 downgraded to v3: create-next-app@15.5.12 installs Tailwind v4 by default but shadcn@2.3.0 requires v3 for HSL CSS variable compatibility
- [Phase 01-foundation]: BlurText manually implemented: React Bits registry URL unavailable via corporate Crowe SSL proxy — implemented using same GSAP pattern from documentation
- [Phase 01-foundation]: NODE_TLS_REJECT_UNAUTHORIZED=0 required for all shadcn CLI registry calls in Crowe network environment
- [Phase 01-foundation]: tailwind.config.ts stripped to token-only config — removed shadcn default color extensions and tailwindcss-animate plugin; components use CSS variables from globals.css directly
- [Phase 01-foundation]: Font applied via body inline style — no next/font/local since no licensed Helvetica Now .woff2 files; Arial/Helvetica Neue fallback stack used throughout
- [Phase 02-navigation-layout P01]: vitest.config.ts @/* alias uses path.resolve(__dirname, './src') to match tsconfig.json — required for Vite to resolve same paths as tsc
- [Phase 02-navigation-layout P01]: Mobile menu close-on-link-click test uses close button as proxy — desktop/mobile links share text; Plan 02 may add data-testid='mobile-nav-link' for cleaner isolation
- [Phase 02-navigation-layout P01]: typecheck exits with 1 expected error (TS2307 missing Navbar module) in Wave 0 — resolves when Plan 02 creates Navbar.tsx
- [Phase 02-navigation-layout]: HambergerMenu (not HamburgerMenu) — intentional typo in iconsax-react@0.0.8; must use exact package export name
- [Phase 02-navigation-layout]: border-b-2 must be present on ALL nav links (transparent when inactive) to prevent 2px layout shift on activation
- [Phase 02-navigation-layout]: data-testid='mobile-nav-link' added to mobile Link elements for clean test isolation without relying on shared label text
- [Phase 03-home-page]: BlurText mock uses onClick to proxy onAnimationComplete — allows opacity transition state testing without GSAP in jsdom
- [Phase 03-home-page]: Animation state testing pattern: mock animation component with onClick proxy; fireEvent.click simulates onAnimationComplete
- [Phase 03-home-page]: Blurb text uses 'a regional bank' instead of 'Meridian Financial' to avoid getByText collision in Test 1
- [Phase 03-home-page]: opacity-0/opacity-100 toggle (not conditional rendering) for layout-stable blurb visibility
- [Phase 03-home-page]: opacity-0/opacity-100 toggle for blurb (not conditional rendering) — layout-stable animation reveal pattern
- [Phase 03-home-page]: Full-width breakout via -mx-4 sm:-mx-6 lg:-mx-8 with inner max-w-4xl mx-auto px-4 for hero/key-dates sections
- [Phase 04-instructions-page]: No mocks needed: InstructionsPage is a pure Server Component with no hooks, router, animations, or icons
- [Phase 04-instructions-page]: Guidance callout test asserts DOM text 'Guidance' not 'GUIDANCE' — Tailwind uppercase is CSS-only and does not affect accessible text
- [Phase 04-instructions-page]: Deliverable 2 description and Dataset section wording adjusted to avoid duplicate getByText regex matches in InstructionsPage tests — minimal change, semantic meaning preserved
- [Phase 04-instructions-page]: Pure Server Component with no 'use client' for InstructionsPage — no interactivity required; simpler rendering path
- [Phase 05-rubric-page]: RubricPage test mirrors InstructionsPage pattern exactly: no vi.mock(), no beforeEach, pure render-and-assert
- [Phase 05-rubric-page]: 15% collision safety: Memo Quality renders '15%'; Extra Credit renders 'up to 15%' — getByText exact match distinguishes them
- [Phase 05-rubric-page]: Hardcoded literal w-[40%]/w-[35%]/w-[15%] class strings required for Tailwind JIT scanner to compile arbitrary width utilities
- [Phase 06-downloads-page-static-files]: DownloadCard stub renders basic semantic elements so tests compile; Plan 02 replaces with full Crowe-branded implementation
- [Phase 06-downloads-page-static-files]: Test 6 uses getAllByText('< 5 KB') asserting length 2 — both data_dictionary.md and setup_guide.md share identical file size string
- [Phase 06-downloads-page-static-files]: Map href array from getAllByRole results to assert multiple link hrefs without ambiguity error
- [Phase 06-downloads-page-static-files]: transactions.csv href wired to /transactions.csv without disabled/coming-soon state — Phase 7 will create the file; locked decision per CONTEXT.md
- [Phase 06-downloads-page-static-files]: DOWNLOAD_CARDS as-const array pattern for declarative card data — avoids JSX repetition, single-location content updates

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 8 (API Route) requires `BLOB_READ_WRITE_TOKEN` to be provisioned from Vercel Blob store before local testing is possible
- Phase 7 (Dataset Generation) targets 50k–100k rows per REQUIREMENTS.md but AGENT_PLAN.md spec examples reference ~800 rows — roadmap follows REQUIREMENTS.md (larger dataset)

## Session Continuity

Last session: 2026-03-04T20:29:50.976Z
Stopped at: Completed 06-downloads-page-static-files 06-02-PLAN.md
Resume file: None
