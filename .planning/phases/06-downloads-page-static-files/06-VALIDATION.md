---
phase: 06
slug: downloads-page-static-files
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 06 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library |
| **Config file** | `vitest.config.ts` (exists) |
| **Quick run command** | `npx vitest run src/__tests__/DownloadsPage.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/__tests__/DownloadsPage.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 0 | DL-01..04 | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 06-02-01 | 02 | 1 | DL-01 | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ✅ W0 | ⬜ pending |
| 06-02-02 | 02 | 1 | DL-02, DL-03 | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ✅ W0 | ⬜ pending |
| 06-02-03 | 02 | 1 | DL-04 | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ✅ W0 | ⬜ pending |
| 06-02-04 | 02 | 1 | STATIC-01 | manual | `ls public/data_dictionary.md` | ❌ Wave 0 | ⬜ pending |
| 06-02-05 | 02 | 1 | STATIC-02 | manual | `ls public/setup_guide.md` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/DownloadsPage.test.tsx` — stubs covering DL-01, DL-02, DL-03, DL-04
- [ ] `src/components/DownloadCard.tsx` — stub component required by test imports

*Existing infrastructure covers framework setup — `vitest.config.ts` and `src/__tests__/setup.ts` already present.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `public/data_dictionary.md` exists with full 12-column table | STATIC-01 | Vitest runs in jsdom — cannot assert filesystem presence | `ls public/data_dictionary.md` + open file and verify column table present |
| `public/setup_guide.md` exists with step-by-step content | STATIC-02 | Vitest runs in jsdom — cannot assert filesystem presence | `ls public/setup_guide.md` + open file and verify numbered steps present |
| Browser download triggered on click | DL-04 | Native browser `download` attribute behavior not testable in jsdom | Open `/downloads` in browser, click any Download button, verify save dialog appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
