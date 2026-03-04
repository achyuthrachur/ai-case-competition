---
phase: 08
slug: api-route
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 08 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (installed; configured at project root) |
| **Config file** | `vitest.config.ts` (exists from Phase 2) |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds (existing 55 tests only) |

---

## Sampling Rate

- **After every task commit:** `npx vitest run` — confirms existing 55 tests remain green (no regressions)
- **After plan wave:** Manual curl test against running dev server (requires token)
- **Before `/gsd:verify-work`:** Manual curl/Postman verification with real `BLOB_READ_WRITE_TOKEN`
- **Max feedback latency:** ~10 seconds automated; manual as needed

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 08-01-01 | 01 | 1 | API-01..06 | manual | `npx vitest run` (regression only) | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test infrastructure is created in this phase. The existing Vitest setup from Phase 2 remains unchanged.

*Existing infrastructure covers all phase requirements (by manual-only verification).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| POST with valid data returns 200 + success JSON | API-01, API-03, API-04, API-05 | Requires real `BLOB_READ_WRITE_TOKEN` | `curl -X POST http://localhost:3000/api/submit -F "name=Test User" -F "email=test@example.com" -F "htmlFile=@test.html" -F "memoFile=@test.md"` — expect `{"success":true,...}` |
| POST with missing name returns 400 | API-02 | Requires running route | `curl -X POST http://localhost:3000/api/submit -F "email=test@example.com"` — expect `{"success":false,"error":"..."}` |
| POST with wrong file type returns 400 | API-02 | Requires running route | Send `.txt` as htmlFile — expect 400 |
| POST with oversized file returns 400 | API-02 | Requires running route | Send file > 10 MB — expect 400 |
| Files appear in Vercel Blob at correct path | API-03, API-04 | Requires Vercel Blob store access | Check Vercel dashboard or `vercel blob ls` after successful submit |
| `BLOB_READ_WRITE_TOKEN` absent from client bundle | API-06 | Bundle inspection | `npm run build` — verify token not in `.next/static/` outputs |

---

## Validation Sign-Off

- [ ] Route file created at `src/app/api/submit/route.ts`
- [ ] TypeScript compiles clean (`npm run typecheck`)
- [ ] Existing 55 tests still pass (`npx vitest run`)
- [ ] Manual curl tests pass (requires token provisioning)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

**Note:** Automated test skipping is intentional per CONTEXT.md decision. `BLOB_READ_WRITE_TOKEN` must be provisioned before manual verification is possible.
