# Phase 8: API Route - Research

**Researched:** 2026-03-04
**Domain:** Next.js App Router API route + Vercel Blob SDK server-side upload
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- File: `src/app/api/submit/route.ts`
- Method: `POST` only — export named `POST` function per Next.js App Router convention
- Parsing: `request.formData()` — no third-party parser (API-01 explicit requirement)
- Validation order: fields first (name, email), then files (type, size)
- Upload: `@vercel/blob` `put()` function — already installed
- Response: `NextResponse.json(...)` with appropriate status code
- Error shape: `{ success: false, error: "message" }` with non-200 HTTP status
- HTTP status codes: 400 for validation errors, 500 for Blob upload failures
- Name sanitization: lowercase, spaces → hyphens, strip non-alphanumeric
- Blob path: `submissions/{sanitized-name}-{unix-timestamp}/dashboard.html` and `submissions/{sanitized-name}-{unix-timestamp}/memo.{ext}`
- Both files uploaded with `{ access: 'public' }`
- Success response shape (exact — Phase 9 depends on it):
  ```json
  { "success": true, "submittedAt": "ISO string", "files": { "dashboard": "url", "memo": "url" } }
  ```
- `BLOB_READ_WRITE_TOKEN` only accessed server-side via `process.env.BLOB_READ_WRITE_TOKEN`
- Validation rules:
  - `name`: present and non-empty string
  - `email`: present and non-empty string
  - `htmlFile`: extension must be `.html`; size <= 10 MB (10 * 1024 * 1024 bytes)
  - `memoFile`: extension must be `.pdf`, `.docx`, or `.md`; size <= 25 MB (25 * 1024 * 1024 bytes)

### Claude's Discretion
- Whether to validate email format (basic regex) or just presence
- Whether to sanitize the email in the Blob path or use only the name
- Error message wording (must be actionable, not just "invalid input")
- Whether to wrap Blob uploads in try/catch with specific error messaging

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.

### Testing Strategy (CRITICAL)
- **Automated tests are SKIPPED for this phase**
- `BLOB_READ_WRITE_TOKEN` is not provisioned; route cannot be tested without a real token
- Verification is manual: `curl` or Postman against the running dev server with a real token
- Phase 9 exercises the route end-to-end as part of its integration testing
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| API-01 | `POST /api/submit` route handler parses `multipart/form-data` using `request.formData()` — no third-party parser | Next.js 15 App Router natively supports `request.formData()` on `NextRequest`; `FormData.get()` returns `File | string | null` for uploaded files |
| API-02 | Server-side validation: name and email present; htmlFile is `.html` and ≤ 10 MB; memoFile is `.pdf`, `.docx`, or `.md` and ≤ 25 MB | `File` object from `formData()` exposes `.name` (filename) and `.size` (bytes); extension extracted via `path.extname()` or string split; size compared in bytes |
| API-03 | Upload `dashboard.html` to Vercel Blob at `submissions/{sanitized-name}-{unix-timestamp}/dashboard.html` | `put(pathname, body, { access: 'public' })` — verified from installed `@vercel/blob@2.3.0` types; `body` accepts `File` directly; returns `PutBlobResult` with `.url` |
| API-04 | Upload memo to Vercel Blob at `submissions/{sanitized-name}-{unix-timestamp}/memo.{ext}` | Same `put()` call; extension extracted from original filename before upload |
| API-05 | Returns JSON `{ success: true, submittedAt: ISO string, files: { dashboard: url, memo: url } }` | `NextResponse.json(data, { status: 200 })` — standard App Router pattern |
| API-06 | `BLOB_READ_WRITE_TOKEN` only referenced server-side; never exposed to client | Route file has no `'use client'` directive; `@vercel/blob` reads token automatically from `process.env.BLOB_READ_WRITE_TOKEN`; no explicit passing needed |
</phase_requirements>

## Summary

Phase 8 builds a single server-side file: `src/app/api/submit/route.ts`. All decisions are locked in CONTEXT.md — this is implementation research, not architectural exploration. The route uses Next.js 15 App Router conventions (named `POST` export), native `request.formData()` parsing, the already-installed `@vercel/blob@2.3.0` SDK `put()` function, and `NextResponse.json()` for responses.

The most important implementation fact: `@vercel/blob@2.3.0` `put()` accepts a `File` object directly as the body (confirmed from installed package type declarations). The `File` object obtained from `formData.get('htmlFile')` can be passed straight to `put()` without conversion. The SDK automatically reads `BLOB_READ_WRITE_TOKEN` from `process.env` — no explicit token handling needed.

Testing is explicitly skipped (no token provisioned). The plan is a single implementation wave with no test file and no Wave 0 test infrastructure work. Verification is manual via curl/Postman after adding a real token to `.env.local`.

**Primary recommendation:** Write one clean route file that validates, uploads, and returns — no helper files, no lib/blob.ts abstraction (that level of indirection adds no value for a single route).

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/server | 15.5.12 (project) | `NextRequest`, `NextResponse` | App Router convention; typed request/response |
| @vercel/blob | 2.3.0 (installed) | Server-side file upload to Vercel Blob | Project dependency; locked decision |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none) | — | — | No additional libraries needed; `request.formData()` is built-in |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `request.formData()` | `formidable`, `multer`, `busboy` | Third-party parsers are explicitly prohibited by API-01 |
| Inline route file | `lib/blob.ts` helper | AGENT_PLAN.md suggests a helper, but CONTEXT.md says single route; for one route, the abstraction adds no value |

**Installation:** No new installs needed. `@vercel/blob` and `next` are already installed.

## Architecture Patterns

### Recommended Project Structure

```
src/app/api/
└── submit/
    └── route.ts    # The only new file this phase creates
```

No `lib/blob.ts` helper. No shared utilities. Single file, complete implementation.

### Pattern 1: Next.js App Router Route Handler

**What:** Named `export async function POST(request: NextRequest)` — the App Router convention for handling HTTP methods.

**When to use:** Always — this is the only supported pattern for API routes in Next.js App Router.

**Example:**
```typescript
// Source: Next.js App Router docs + installed next@15.5.12
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get('name');
  // ...
  return NextResponse.json({ success: true }, { status: 200 });
}
```

### Pattern 2: @vercel/blob put() Call

**What:** Upload a `File` object to Vercel Blob at a specific pathname.

**When to use:** After validation passes; once per file.

**Example:**
```typescript
// Source: @vercel/blob@2.3.0 dist/index.d.ts (installed package)
import { put } from '@vercel/blob';

const result = await put(
  'submissions/john-smith-1704067200/dashboard.html',
  fileObject,          // File from formData.get() — accepted directly as PutBody
  { access: 'public' } // Required field — locks blob to public access
);

// result.url is the publicly accessible URL returned in the response
```

**Key facts from installed package types:**
- `PutBody` type: `string | Readable | Buffer | Blob | ArrayBuffer | ReadableStream | File`
- `File` (from undici/browser) is accepted directly — no `.arrayBuffer()` conversion needed
- `access` is a required field — omitting it is a TypeScript error
- `addRandomSuffix` defaults to `false` — pathname is used exactly as provided
- `allowOverwrite` defaults to `false` — duplicate submissions to same path would throw; timestamp uniqueness prevents this
- Token: read automatically from `process.env.BLOB_READ_WRITE_TOKEN` — no explicit passing

### Pattern 3: FormData File Extraction

**What:** Get a file upload from parsed `multipart/form-data`.

**Example:**
```typescript
// Source: MDN FormData / Next.js request.formData()
const formData = await request.formData();
const htmlFile = formData.get('htmlFile');  // Returns File | string | null

// Type guard — files come back as File objects
if (!(htmlFile instanceof File)) {
  return NextResponse.json({ success: false, error: 'HTML file is required' }, { status: 400 });
}

// File properties available
htmlFile.name;  // Original filename: "dashboard.html"
htmlFile.size;  // Size in bytes
htmlFile.type;  // MIME type (unreliable — use extension instead)
```

### Pattern 4: Name Sanitization

**What:** Convert participant name to safe Blob path segment.

**Example:**
```typescript
// Implements the locked decision from CONTEXT.md
function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')        // spaces → hyphens
    .replace(/[^a-z0-9-]/g, ''); // strip all non-alphanumeric except hyphens
}

// "John Smith!" → "john-smith"
// "Anne-Marie O'Brien" → "anne-marie-obrien"
```

### Pattern 5: Extension Extraction

**What:** Get the file extension from the original filename for validation and Blob path.

**Example:**
```typescript
function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot).toLowerCase(); // ".html", ".pdf", ".docx", ".md"
}
```

Using `lastIndexOf` rather than `path.extname` avoids importing the `path` module and correctly handles filenames with multiple dots.

### Pattern 6: Validation-First Structure

**What:** Early return on first validation error; never reach upload code with invalid data.

**Example:**
```typescript
// Validation order per locked decision: fields first, then files
const name = formData.get('name');
const email = formData.get('email');

if (!name || typeof name !== 'string' || name.trim() === '') {
  return NextResponse.json({ success: false, error: 'Participant name is required' }, { status: 400 });
}
if (!email || typeof email !== 'string' || email.trim() === '') {
  return NextResponse.json({ success: false, error: 'Email address is required' }, { status: 400 });
}
// ... then file type and size checks ...
```

### Anti-Patterns to Avoid

- **Using `formData.get('file')` without instanceof File check:** String fields also use `.get()` — without the type guard, you'd treat a string as a file.
- **Relying on `file.type` (MIME type) for validation:** Clients can spoof MIME types. Always validate by file extension from `file.name`.
- **Sequential uploads without try/catch:** If the first upload succeeds and the second fails, you'd have an orphaned blob. Wrap both uploads in try/catch and return a 500.
- **Importing anything from `@vercel/blob/client`:** The client module exposes client-side upload helpers. Use only the root import (`from '@vercel/blob'`) in server routes.
- **Adding `'use client'` to the route file:** Route files are always server-only. The `'use client'` directive is forbidden here and would expose `process.env` to the client bundle.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File storage | Custom S3/GCS integration | `@vercel/blob` `put()` | Already installed; integrated with Vercel; handles CDN, caching headers, token auth |
| Multipart parsing | Manual `Content-Type: multipart/form-data` parser | `request.formData()` | Built into Next.js; correct per API-01 requirement |
| Path uniqueness | UUID generation | `Date.now()` millisecond timestamp | Simpler; already decided in CONTEXT.md; millisecond precision is sufficient for this use case |

**Key insight:** The entire complexity of this route is validation logic and one SDK call per file. Nothing in the problem domain justifies custom solutions.

## Common Pitfalls

### Pitfall 1: `formData.get()` Returns `string | File | null`

**What goes wrong:** TypeScript narrows `formData.get('htmlFile')` to `string | File | null`. If you call `.name` or `.size` without an `instanceof File` check, TypeScript errors and the route fails.

**Why it happens:** FormData is a generic key-value store — text fields and file fields share the same `.get()` API.

**How to avoid:** Always guard with `if (!(value instanceof File))` before accessing file properties.

**Warning signs:** TypeScript error "Property 'size' does not exist on type 'string | File | null'".

### Pitfall 2: Extension Validation via MIME Type Instead of Filename

**What goes wrong:** A user renames a `.exe` to `.html` — but if you check `file.type` it might come through as `application/octet-stream` or even `text/html` depending on the client OS. Conversely, a `.html` file might have the wrong MIME type.

**Why it happens:** MIME type is set by the client (browser or OS), not the server. It is not reliable for validation.

**How to avoid:** Always extract extension from `file.name` using `lastIndexOf('.')`. Lowercase before comparing.

**Warning signs:** Validation passes for files that shouldn't, or incorrectly rejects valid files.

### Pitfall 3: Missing try/catch Around Blob Uploads

**What goes wrong:** `put()` throws if the token is missing, the store is unavailable, or there is a rate limit. Without try/catch, the unhandled rejection propagates as a 500 with no actionable error response body.

**Why it happens:** `put()` is async and can throw `BlobError` subclasses (e.g., `BlobStoreNotFoundError`, `BlobServiceRateLimited`).

**How to avoid:** Wrap both `put()` calls in a single `try/catch`. Catch errors, return `{ success: false, error: 'Upload failed — please try again' }` with status 500.

**Warning signs:** Phase 9 form receives a raw HTML error page instead of a JSON error body.

### Pitfall 4: `addRandomSuffix` Appending to Pathname

**What goes wrong:** `@vercel/blob` `put()` has `addRandomSuffix` defaulting to `false`, but if it were `true` (e.g., from a copy-pasted example), the stored path would differ from what was specified, breaking reproducibility.

**Why it happens:** Some Vercel Blob examples use `addRandomSuffix: true` to guarantee uniqueness. The CONTEXT.md decision uses `Date.now()` timestamp instead.

**How to avoid:** Never pass `addRandomSuffix: true`. The timestamp in the path is the uniqueness mechanism.

### Pitfall 5: Client Bundle Token Exposure

**What goes wrong:** If any `import` of `@vercel/blob` lands in a `'use client'` component, the Next.js bundler may include `process.env.BLOB_READ_WRITE_TOKEN` in the client bundle.

**Why it happens:** `process.env.X` in server-only modules is fine; in client modules, Next.js either replaces with empty string or includes it (depending on usage pattern).

**How to avoid:** Route files are server-only by default. Never add `'use client'` to `route.ts`. Never import the route handler in a client component.

### Pitfall 6: Size Limit Comparison in Wrong Units

**What goes wrong:** `file.size` is in bytes. If you compute `10 * 1024` (10 KB) instead of `10 * 1024 * 1024` (10 MB), the HTML file limit is 10,000x too strict.

**How to avoid:** Define constants explicitly:
```typescript
const MAX_HTML_SIZE = 10 * 1024 * 1024;  // 10 MB in bytes
const MAX_MEMO_SIZE = 25 * 1024 * 1024;  // 25 MB in bytes
```

## Code Examples

Verified patterns from installed package source and Next.js App Router conventions:

### Complete Route Handler Structure

```typescript
// src/app/api/submit/route.ts
// Source: Next.js App Router docs + @vercel/blob@2.3.0 types (installed)
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Size limit constants (bytes)
const MAX_HTML_SIZE = 10 * 1024 * 1024;  // 10 MB
const MAX_MEMO_SIZE = 25 * 1024 * 1024;  // 25 MB
const VALID_MEMO_EXTS = ['.pdf', '.docx', '.md'];

function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? '' : filename.slice(lastDot).toLowerCase();
}

export async function POST(request: NextRequest) {
  // 1. Parse multipart/form-data
  const formData = await request.formData();

  // 2. Validate fields first
  const name = formData.get('name');
  const email = formData.get('email');
  const htmlFile = formData.get('htmlFile');
  const memoFile = formData.get('memoFile');

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json(
      { success: false, error: 'Participant name is required' },
      { status: 400 }
    );
  }
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return NextResponse.json(
      { success: false, error: 'Email address is required' },
      { status: 400 }
    );
  }

  // 3. Validate files
  if (!(htmlFile instanceof File)) {
    return NextResponse.json(
      { success: false, error: 'HTML dashboard file is required' },
      { status: 400 }
    );
  }
  if (getExtension(htmlFile.name) !== '.html') {
    return NextResponse.json(
      { success: false, error: 'HTML file must be .html format' },
      { status: 400 }
    );
  }
  if (htmlFile.size > MAX_HTML_SIZE) {
    return NextResponse.json(
      { success: false, error: 'HTML file exceeds the 10 MB limit' },
      { status: 400 }
    );
  }

  if (!(memoFile instanceof File)) {
    return NextResponse.json(
      { success: false, error: 'Findings memo file is required' },
      { status: 400 }
    );
  }
  const memoExt = getExtension(memoFile.name);
  if (!VALID_MEMO_EXTS.includes(memoExt)) {
    return NextResponse.json(
      { success: false, error: 'Memo file must be .pdf, .docx, or .md format' },
      { status: 400 }
    );
  }
  if (memoFile.size > MAX_MEMO_SIZE) {
    return NextResponse.json(
      { success: false, error: 'Memo file exceeds the 25 MB limit' },
      { status: 400 }
    );
  }

  // 4. Build Blob path prefix
  const sanitized = sanitizeName(name.trim());
  const timestamp = Date.now();
  const prefix = `submissions/${sanitized}-${timestamp}`;

  // 5. Upload both files
  try {
    const [dashboardBlob, memoBlob] = await Promise.all([
      put(`${prefix}/dashboard.html`, htmlFile, { access: 'public' }),
      put(`${prefix}/memo${memoExt}`, memoFile, { access: 'public' }),
    ]);

    return NextResponse.json({
      success: true,
      submittedAt: new Date().toISOString(),
      files: {
        dashboard: dashboardBlob.url,
        memo: memoBlob.url,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'File upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
```

### curl Test Command (Manual Verification)

```bash
# After adding real BLOB_READ_WRITE_TOKEN to .env.local and running npm run dev:
curl -X POST http://localhost:3000/api/submit \
  -F "name=John Smith" \
  -F "email=john@example.com" \
  -F "htmlFile=@/path/to/dashboard.html" \
  -F "memoFile=@/path/to/memo.pdf"
```

### Error Response Shape

```json
{ "success": false, "error": "HTML file must be .html format" }
```
Status: 400

### Success Response Shape

```json
{
  "success": true,
  "submittedAt": "2026-03-04T14:36:07.000Z",
  "files": {
    "dashboard": "https://blob.vercel-storage.com/submissions/john-smith-1704067200/dashboard.html",
    "memo": "https://blob.vercel-storage.com/submissions/john-smith-1704067200/memo.pdf"
  }
}
```
Status: 200

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `pages/api/submit.ts` with `export default function handler` | `app/api/submit/route.ts` with named `export async function POST` | Next.js 13 (App Router GA) | Route files are per-directory; HTTP methods are named exports |
| Third-party multipart parsers (formidable, busboy) | `request.formData()` built-in | Next.js 13+ | No additional dependency needed; native Web Platform API |
| `@vercel/blob` v1 required explicit token passing | v2+ reads `BLOB_READ_WRITE_TOKEN` from `process.env` automatically | @vercel/blob v2.0 | Simpler call signature; less risk of token exposure via accidental argument logging |

**Deprecated/outdated:**
- `pages/api/` pattern: Still works in Next.js 15 but is the Pages Router approach — not used in this project.
- `formidable` / `multer`: Valid in Pages Router `api/` handlers with `bodyParser: false`; not applicable in App Router.

## Open Questions

1. **Sequential vs parallel uploads**
   - What we know: `Promise.all()` runs both uploads in parallel, which is faster
   - What's unclear: If one fails mid-upload, the other may succeed creating an orphaned blob
   - Recommendation: Use `Promise.all()` for speed; accept that on error, one blob may already be stored (no cleanup needed for this competition use case — submissions are one-way writes)

2. **Email validation depth**
   - What we know: CONTEXT.md gives discretion on whether to use basic regex or just presence check
   - What's unclear: Over-aggressive regex may reject valid emails
   - Recommendation: Use presence check only (`email.trim() !== ''`). The competition context does not require deliverable verification by email; the email is for organizer reference only.

3. **`sanitizeName` output when name is all special characters**
   - What we know: `"!!!"` would produce an empty string after sanitization
   - What's unclear: An empty prefix would create a degenerate path like `submissions/-1704067200/dashboard.html`
   - Recommendation: After sanitization, if result is empty, use `'participant'` as fallback.

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` — this section is included. However, per the locked decision in CONTEXT.md, **automated tests are SKIPPED for this phase**. The Validation Architecture section documents this explicitly.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest (installed; configured at project root) |
| Config file | `vitest.config.ts` (exists from Phase 2) |
| Quick run command | `npm test -- --run` |
| Full suite command | `npm test -- --run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| API-01 | Parses `multipart/form-data` via `request.formData()` | integration | SKIPPED — no token | N/A |
| API-02 | Server-side validation returns 400 for bad fields/files | integration | SKIPPED — no token | N/A |
| API-03 | Uploads dashboard to correct Blob path | integration | SKIPPED — no token | N/A |
| API-04 | Uploads memo to correct Blob path | integration | SKIPPED — no token | N/A |
| API-05 | Returns correct success JSON shape | integration | SKIPPED — no token | N/A |
| API-06 | Token never in client bundle | manual-only | `npm run build` + bundle inspection | N/A |

**Justification for skipping:** Testing this route requires a real Vercel Blob token. Mocking the `@vercel/blob` SDK would test the mock, not the real SDK behavior. `BLOB_READ_WRITE_TOKEN` is not provisioned for this phase. Phase 9 exercises the route end-to-end with a real token.

### Sampling Rate

- **Per task commit:** No automated tests — skip
- **Per wave merge:** Manual curl test only
- **Phase gate:** Manual verification with curl/Postman before marking phase complete

### Wave 0 Gaps

None — no test infrastructure is created in this phase. The existing Vitest setup from Phase 2 remains unchanged.

## Sources

### Primary (HIGH confidence)

- `node_modules/@vercel/blob/dist/index.d.ts` — `put()` signature, `PutBlobResult` type, `PutBody` union type, `PutCommandOptions` interface
- `node_modules/@vercel/blob/dist/create-folder-D-Qslm5_.d.ts` — `CommonCreateBlobOptions`, `BlobAccessType`, `BlobCommandOptions` (token auto-read from env)
- `node_modules/@vercel/blob/package.json` — version 2.3.0 confirmed
- Next.js App Router docs pattern — named export `POST` function, `request.formData()` on `NextRequest`
- `.planning/phases/08-api-route/08-CONTEXT.md` — all locked decisions

### Secondary (MEDIUM confidence)

- `node_modules/next/package.json` — Next.js 15.5.12 confirmed installed
- MDN Web Docs — `FormData.get()` returns `File | string | null`; `File.name`, `File.size` properties

### Tertiary (LOW confidence)

- None required — all critical details verified from installed package source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — `@vercel/blob@2.3.0` and Next.js 15.5.12 verified from installed packages
- Architecture: HIGH — all decisions locked in CONTEXT.md; patterns verified from type declarations
- Pitfalls: HIGH — derived from TypeScript types and known Web Platform behavior

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable APIs; @vercel/blob and Next.js App Router conventions are stable)
