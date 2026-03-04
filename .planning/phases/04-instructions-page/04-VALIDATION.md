---
phase: 4
slug: instructions-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library (installed in Phase 2) |
| **Config file** | `vitest.config.ts` (project root — exists) |
| **Quick run command** | `npx vitest run src/__tests__/InstructionsPage.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~8 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/__tests__/InstructionsPage.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~8 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 0 | INST-01..05 | setup | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 4-02-01 | 02 | 1 | INST-01..05 | unit (render) | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/InstructionsPage.test.tsx` — tests for INST-01 through INST-05

**No mocks needed** — InstructionsPage is a pure Server Component with no hooks, router, animation, or icon dependencies. Simplest test file in the project.

**Test coverage per requirement:**
- INST-01: `getByRole('heading', { name: 'Background' })` + paragraph text
- INST-02: `getByRole('heading', { name: 'Your Dataset' })` + paragraph text
- INST-03: `getByRole('heading', { name: 'Your Deliverables' })` + both numbered items ("Standalone HTML Dashboard", "2-Page Findings Memo")
- INST-04: `getByRole('heading', { name: 'Tools You Should Use' })` + `getByRole('heading', { name: /What You Do NOT/ })` + list items
- INST-05: `getByText('Guidance')` (DOM text, not CSS uppercase) + callout quote text fragment

**No new installs needed** — Vitest, RTL, jsdom, jest-dom all installed in Phase 2.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Amber left-border on section headings renders visually | INST-01..04 | CSS border not verifiable in jsdom | Verify each heading has amber left accent bar in browser |
| Guidance callout has amber-wash bg and left border | INST-05 | CSS background/border not verifiable in jsdom | Verify callout panel styling in browser |
| Numbered badge circles render with correct indigo style | INST-03 | CSS rounded-full/bg rendering not in jsdom | Verify "1" and "2" badges display as indigo circles |
| Reading column is comfortably narrow on wide screens | All | Layout not verifiable in jsdom | Verify content stays ~768px centered on large viewport |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
