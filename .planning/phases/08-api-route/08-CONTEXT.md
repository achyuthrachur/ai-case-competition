# Phase 8: API Route - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build `src/app/api/submit/route.ts` — the `POST /api/submit` Next.js App Router route handler. It receives multipart form data, validates all fields and files server-side, uploads both files to Vercel Blob, and returns a JSON response. No UI — this phase is API-only, independently testable. Requirements: API-01, API-02, API-03, API-04, API-05, API-06.

</domain>

<decisions>
## Implementation Decisions

### Testing Strategy
- **Skip automated tests for this phase** — no test file will be written
- Reason: `BLOB_READ_WRITE_TOKEN` is not yet provisioned; the route cannot be meaningfully tested without either a real token or a mock that obscures real SDK behavior
- Verification is manual: after Phase 8 executes, test with `curl` or Postman against the running dev server with a real token
- Phase 9 (Submission Form) will exercise the route end-to-end as part of its integration testing

### Error Response Shape
- **`{ success: false, error: "message" }` with non-200 HTTP status**
- Mirrors the success shape — Phase 9 form can check `response.success` consistently for both outcomes
- HTTP status codes: 400 for validation errors, 500 for Blob upload failures
- Error messages are actionable (e.g., "HTML file must be .html format", "File exceeds 10 MB limit")

### Name Sanitization
- **Lowercase, spaces → hyphens, strip all non-alphanumeric characters**
- Example: `"John Smith!"` → `"john-smith"`
- Blob path format: `submissions/{sanitized-name}-{unix-timestamp}/`
- e.g., `submissions/john-smith-1704067200/dashboard.html`
- `unix-timestamp` = `Date.now()` in milliseconds (ensures uniqueness even for same name)

### Route Architecture (from REQUIREMENTS.md — fully locked)
- File: `src/app/api/submit/route.ts`
- Method: `POST` only — export named `POST` function per Next.js App Router convention
- Parsing: `request.formData()` — no third-party parser (API-01 explicit requirement)
- Validation order: fields first (name, email), then files (type, size)
- Upload: `@vercel/blob` `put()` function — already installed
- Response: `NextResponse.json(...)` with appropriate status code

### Validation Rules (locked from API-02)
- `name`: present and non-empty string
- `email`: present and non-empty string
- `htmlFile`: extension must be `.html`; size ≤ 10 MB (10 * 1024 * 1024 bytes)
- `memoFile`: extension must be `.pdf`, `.docx`, or `.md`; size ≤ 25 MB (25 * 1024 * 1024 bytes)

### Blob Upload Paths (locked from API-03, API-04)
- Dashboard: `submissions/{sanitized-name}-{unix-timestamp}/dashboard.html`
- Memo: `submissions/{sanitized-name}-{unix-timestamp}/memo.{ext}`
- Both uploaded with `{ access: 'public' }` so URLs are directly accessible

### Success Response (locked from API-05)
```json
{
  "success": true,
  "submittedAt": "2026-03-04T14:36:07Z",
  "files": {
    "dashboard": "https://blob.vercel-storage.com/...",
    "memo": "https://blob.vercel-storage.com/..."
  }
}
```

### Token Security (locked from API-06)
- `BLOB_READ_WRITE_TOKEN` is accessed only via `process.env.BLOB_READ_WRITE_TOKEN` inside the route handler
- Never imported or referenced in any client component or shared utility
- The `@vercel/blob` SDK reads it automatically from environment — no explicit passing needed

### Claude's Discretion
- Whether to validate email format (basic regex) or just presence
- Whether to sanitize the email in the Blob path or use only the name
- Error message wording (must be actionable, not just "invalid input")
- Whether to wrap Blob uploads in try/catch with specific error messaging

</decisions>

<specifics>
## Specific Ideas

- The `.env.local` currently has `BLOB_READ_WRITE_TOKEN=` (empty) — this will need to be filled with a real Vercel Blob token before the route works end-to-end. Phase 8 builds the route; provisioning the token is a separate step.
- AGENT_PLAN.md specifies the exact JSON response shapes — the route must match these exactly since Phase 9 depends on parsing them
- `@vercel/blob` is already installed (Phase 1 foundation dependency)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `@vercel/blob` — installed at project root, provides `put()` function for uploading
- `next/server` — `NextResponse` for JSON responses; `NextRequest` for typed request parameter
- No existing API routes — this is the first `app/api/` directory

### Established Patterns
- Named exports (`export async function POST`) — App Router convention, consistent with project code style
- TypeScript throughout — route handler must be typed
- No `'use client'` — server-only file
- `process.env.BLOB_READ_WRITE_TOKEN` — exists in `.env.local` (empty value, needs real token)

### Integration Points
- `src/app/api/submit/route.ts` — new file, new directory tree (`src/app/api/submit/`)
- Phase 9 (`src/app/submit/page.tsx`) will POST to `/api/submit` — JSON response shape must be stable
- `@vercel/blob` token: `.env.local` has the key defined; value needs provisioning

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-api-route*
*Context gathered: 2026-03-04*
