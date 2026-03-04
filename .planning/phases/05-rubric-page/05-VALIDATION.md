---
phase: 5
slug: rubric-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 1.x + React Testing Library |
| **Config file** | `vitest.config.ts` (root) |
| **Quick run command** | `npx vitest run src/__tests__/RubricPage.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/__tests__/RubricPage.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 0 | RUB-01, RUB-02, RUB-03 | unit (RED) | `npx vitest run src/__tests__/RubricPage.test.tsx` | ❌ W0 | ⬜ pending |
| 5-02-01 | 02 | 1 | RUB-01, RUB-02, RUB-03 | unit (GREEN) | `npx vitest run src/__tests__/RubricPage.test.tsx` | ✅ after W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/RubricPage.test.tsx` — 11 failing tests covering RUB-01, RUB-02, RUB-03

*Note: vitest.config.ts, testing infrastructure, and all helper utilities already installed in Phase 2. No new framework setup needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Fill bar visual width (40%, 35%, 15%) | RUB-01 | Tailwind JIT CSS not evaluated in jsdom | Open `/rubric` in browser; verify each bar fills proportionally to its percentage |
| Card hover shadow lift | RUB-01 | CSS transitions not testable in jsdom | Hover over each card; verify subtle lift + shadow change |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
