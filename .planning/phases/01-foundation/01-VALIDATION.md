---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-03
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Phase 1 is scaffold-only; structural validation via build/type-check |
| **Config file** | none — Wave 0 does not install test framework |
| **Quick run command** | `npm run typecheck && npm run lint` |
| **Full suite command** | `npm run build && npm run lint && npm run typecheck` |
| **Estimated runtime** | ~30–60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run typecheck && npm run lint`
- **After every plan wave:** Run `npm run build && npm run lint && npm run typecheck`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| scaffold | 01 | 1 | FOUND-01 | smoke | `npm run build` | ⬜ pending |
| typecheck | 01 | 1 | FOUND-01 | structural | `npm run typecheck` | ⬜ pending |
| deps | 01 | 1 | FOUND-02 | type-check | `npm run typecheck` (after import-check.ts) | ⬜ pending |
| tokens | 01 | 1 | FOUND-03 | structural | `npm run build` (Tailwind purge) | ⬜ pending |
| font-vars | 01 | 1 | FOUND-04 | structural | `grep "font-display" src/app/globals.css` | ⬜ pending |
| env-files | 01 | 1 | FOUND-05 | structural | `ls .env.example && git check-ignore -v .env.local` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/import-check.ts` — smoke import file to verify FOUND-02 (deleted after phase verification)
- [ ] Verify `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }` post-scaffold

*Note: No test framework config needed for Phase 1. Structural verification only.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Font fallback stack renders on page | FOUND-04 | Font rendering cannot be verified by build tools | Open `http://localhost:3000`, inspect element → computed font-family should show Arial or Helvetica Neue |
| `npm run dev` loads default page in browser | FOUND-01 | Dev server browser check | Run `npm run dev`, open `http://localhost:3000`, confirm page loads without console errors |

---

## Per-Requirement Verification Commands

```bash
# FOUND-01: Project compiles and type-checks
npm run build
npm run typecheck

# FOUND-02: Dependencies importable without TypeScript errors
# File: src/lib/import-check.ts
# import { useDropzone } from 'react-dropzone';
# import { put } from '@vercel/blob';
# import { Home } from 'iconsax-react';
# void useDropzone; void put; void Home;
npm run typecheck

# FOUND-03: Crowe color tokens produce valid Tailwind classes
# Add to any .tsx: <div className="bg-crowe-indigo-dark shadow-crowe-card text-crowe-amber" />
npm run build

# FOUND-04: Font variables declared in globals.css
grep "font-display" src/app/globals.css
grep "Helvetica" src/app/globals.css

# FOUND-05: Environment files
ls .env.example
git check-ignore -v .env.local
grep "BLOB_READ_WRITE_TOKEN" .env.example
```

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
