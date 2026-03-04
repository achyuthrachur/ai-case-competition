---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [tailwind, css-variables, design-tokens, crowe-brand, shadcn, next.js]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 15.5.12 scaffolded with Tailwind v3 and shadcn — base project this plan configures
provides:
  - Full Crowe brand token set in tailwind.config.ts (colors, shadows, backgroundColor, fontFamily)
  - Crowe HSL shadcn theme in globals.css (:root overridden with CLAUDE.md §4.2 values)
  - Font CSS variables (--font-display, --font-body, --font-mono) with Helvetica/Arial fallback
  - Root layout with warm bg-page background and Helvetica inline fontFamily
  - Token smoke-test page.tsx using bg-crowe-indigo-dark, shadow-crowe-card, tint-700
  - .env.example committed with BLOB_READ_WRITE_TOKEN= key
  - .env.local created (gitignored) with placeholder value
affects: [all future phases — all UI components depend on crowe.* Tailwind utilities]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Crowe brand tokens via tailwind.config.ts extend block — crowe.* color utilities available globally"
    - "shadcn CSS variables overridden in globals.css @layer base :root — HSL format, no oklch"
    - "Font applied via inline style on body (no next/font/local — no .woff2 license files)"
    - ".env.example committed, .env.local gitignored by .env*.local pattern"

key-files:
  created:
    - .env.example
    - .env.local (gitignored)
  modified:
    - tailwind.config.ts
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "tailwind.config.ts plugins: [] — removed tailwindcss-animate and shadcn default color extensions (border/input/ring/background/foreground/primary/etc.) to keep config minimal and token-only"
  - "globals.css .dark block retained — plan specified to leave it in place even if unused"
  - "Font applied via body inline style — no next/font/local call since no .woff2 license files available"

patterns-established:
  - "Crowe color pattern: use crowe.* namespace (crowe-indigo-dark, crowe-amber) — never raw hex in className"
  - "Background pattern: bg-page for warm off-white page backgrounds, bg-section/section-warm for alternating sections"
  - "Shadow pattern: shadow-crowe-card for floating cards — indigo-tinted rgba, not pure black"

requirements-completed: [FOUND-03, FOUND-04, FOUND-05]

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 1 Plan 02: Crowe Brand Design System Summary

**Full Crowe brand token set wired into Tailwind v3 and shadcn — bg-crowe-indigo-dark, shadow-crowe-card, tint-700, and all palette utilities available globally with passing build and typecheck**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T23:55:51Z
- **Completed:** 2026-03-03T23:59:21Z
- **Tasks:** 3
- **Files modified:** 5 (tailwind.config.ts, globals.css, layout.tsx, page.tsx, .env.example)

## Accomplishments
- Replaced tailwind.config.ts with full Crowe palette: 7 color namespaces (crowe.amber/indigo/teal/cyan/blue/violet/coral), tint scale, fontFamily, 7 shadow utilities, 4 backgroundColor extensions
- Overrode globals.css shadcn :root block with Crowe HSL theme from CLAUDE.md §4.2; added --font-display/--font-body/--font-mono CSS variables with Helvetica/Arial fallback stack; no oklch values remain
- Updated layout.tsx with correct metadata title, bg-page class, and Helvetica inline fontFamily on body
- Replaced create-next-app default page.tsx with Crowe token smoke test validating bg-crowe-indigo-dark, shadow-crowe-card, tint-700
- Created .env.example (committed) and .env.local (gitignored) with BLOB_READ_WRITE_TOKEN key

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace tailwind.config.ts with full Crowe brand token set** - `123f5cf` (chore)
2. **Task 2: Override globals.css with Crowe HSL vars + update layout and page** - `0e2241b` (feat)
3. **Task 3: Create environment files and verify gitignore coverage** - `52f8b5e` (chore)

**Plan metadata:** (docs commit — added after SUMMARY.md)

## Files Created/Modified
- `tailwind.config.ts` - Full Crowe token set: colors, shadows, backgroundColor, fontFamily
- `src/app/globals.css` - Crowe HSL shadcn overrides + font CSS variables; .dark block retained
- `src/app/layout.tsx` - Updated title, bg-page, Helvetica inline fontFamily
- `src/app/page.tsx` - Crowe token smoke test using crowe-indigo-dark, shadow-crowe-card, tint-700
- `.env.example` - Committed env template with BLOB_READ_WRITE_TOKEN= key

## Decisions Made
- Removed tailwindcss-animate plugin and shadcn's default color extensions (border/input/ring/background/etc.) from tailwind.config.ts — the plan specified a minimal token-only config; shadcn components use CSS variables directly from globals.css, not Tailwind mappings
- Retained .dark block in globals.css as specified in the plan even though it's currently unused
- Applied font via `body` inline style rather than next/font/local — no licensed .woff2 files available in this project

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None. All three tasks executed cleanly. npm run build and npm run typecheck both exit code 0.

## User Setup Required
None - no external service configuration required at this stage. BLOB_READ_WRITE_TOKEN will be provisioned when Phase 8 (API Route) is implemented.

## Next Phase Readiness
- All Crowe brand Tailwind utilities (bg-crowe-indigo-dark, text-crowe-amber, shadow-crowe-card, bg-page, etc.) are available globally
- shadcn CSS variables overridden with Crowe HSL values — all shadcn components will inherit Crowe branding automatically
- Phase 2+ can use Crowe tokens immediately without any additional configuration

## Self-Check: PASSED

All files verified present, all task commits verified in git log.

- FOUND: tailwind.config.ts
- FOUND: src/app/globals.css
- FOUND: src/app/layout.tsx
- FOUND: src/app/page.tsx
- FOUND: .env.example
- FOUND: .env.local (gitignored)
- FOUND: .planning/phases/01-foundation/01-02-SUMMARY.md
- FOUND commit: 123f5cf (Task 1)
- FOUND commit: 0e2241b (Task 2)
- FOUND commit: 52f8b5e (Task 3)

---
*Phase: 01-foundation*
*Completed: 2026-03-03*
