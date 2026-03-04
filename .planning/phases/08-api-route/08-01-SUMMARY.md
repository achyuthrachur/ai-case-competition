---
phase: 08-api-route
plan: 01
subsystem: api
tags: [nextjs, vercel-blob, multipart, file-upload, server-route]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js App Router project structure, TypeScript config
provides:
  - POST /api/submit handler with multipart parsing, validation, and Vercel Blob uploads
  - JSON response contract { success, submittedAt, files: { dashboard, memo } } for Phase 9
affects: [09-submission-form, end-to-end-testing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server-only API route (no 'use client') using NextRequest/NextResponse
    - BLOB_READ_WRITE_TOKEN auto-read by @vercel/blob SDK — never referenced explicitly in source
    - Extension detection via lastIndexOf('.') instead of path.extname (avoids Node import)
    - Parallel blob upload with Promise.all for performance
    - try/catch wrapping blob uploads maps to 500 error response

key-files:
  created:
    - src/app/api/submit/route.ts
  modified: []

key-decisions:
  - "Import from '@vercel/blob' root (not '@vercel/blob/client') to keep token server-only"
  - "Validate fields before files — fail fast on missing name/email before processing uploads"
  - "Promise.all for parallel uploads — acceptable orphaned blob risk for competition use case"
  - "VALID_MEMO_EXTS as const tuple for type-safe includes() check"

patterns-established:
  - "Pattern 1: Field validation before file validation — fail fast on cheapest checks first"
  - "Pattern 2: sanitizeName fallback to 'participant' on empty result after stripping special chars"
  - "Pattern 3: getExtension via lastIndexOf handles multiple dots correctly without path module"

requirements-completed: [API-01, API-02, API-03, API-04, API-05, API-06]

# Metrics
duration: 3min
completed: 2026-03-04
---

# Phase 8 Plan 01: API Route Summary

**POST /api/submit route handler with multipart validation, parallel Vercel Blob uploads, and typed JSON contract for Phase 9 submission form**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-04T21:49:43Z
- **Completed:** 2026-03-04T21:52:23Z
- **Tasks:** 1 of 2 (Task 2 is a human-verify checkpoint — paused)
- **Files modified:** 1

## Accomplishments
- Created `src/app/api/submit/route.ts` — server-only Next.js 15 route handler
- Multipart form data parsing with field and file validation in correct order (fields first, then files)
- Parallel Vercel Blob uploads via `Promise.all` with try/catch for 500 error mapping
- All 55 existing tests continue to pass (no regressions)
- TypeScript compiles clean (0 errors)

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement POST /api/submit route handler** - `66896f0` (feat)

**Plan metadata:** (pending after checkpoint approval)

## Files Created/Modified
- `src/app/api/submit/route.ts` - POST handler: multipart parsing, field/file validation, dual Vercel Blob uploads, JSON responses

## Decisions Made
- Import from `@vercel/blob` root (NOT `@vercel/blob/client`) — client module is for browser uploads and would risk token exposure in the bundle
- Validate fields before files — fail fast on cheapest checks first (name, email) before processing binary file data
- `Promise.all` for parallel blob uploads — faster; orphaned blob on partial failure is acceptable for a competition use case
- `VALID_MEMO_EXTS as const` tuple for type-safe `.includes()` check with explicit cast
- BLOB_READ_WRITE_TOKEN not referenced in the file — @vercel/blob SDK reads it automatically from `process.env`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None - route compiled and all tests passed on first attempt.

## User Setup Required
**External services require manual configuration before Task 2 (human-verify checkpoint):**
- Add `BLOB_READ_WRITE_TOKEN` to `.env.local` (Vercel Dashboard > your project > Storage > Blob store > copy token)
- Run `npm run dev`
- Run the 6 curl tests described in the checkpoint

## Self-Check: PASSED
- route.ts: FOUND at src/app/api/submit/route.ts
- SUMMARY.md: FOUND at .planning/phases/08-api-route/08-01-SUMMARY.md
- commit 66896f0: FOUND in git log

## Next Phase Readiness
- `POST /api/submit` route is implemented and TypeScript-clean
- Awaiting human verification with real BLOB_READ_WRITE_TOKEN and curl tests
- Once approved, Phase 9 (submission form) can wire up to this endpoint using the contract: `{ success, submittedAt, files: { dashboard, memo } }`

---
*Phase: 08-api-route*
*Completed: 2026-03-04*
