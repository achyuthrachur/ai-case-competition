---
phase: 07
slug: dataset-generation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 07 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Node.js child_process (integration) |
| **Config file** | `vitest.config.ts` (exists) |
| **Quick run command** | `npx vitest run src/__tests__/generate-dataset.test.js` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~30–60 seconds (includes script generation on first run) |

---

## Sampling Rate

- **After script task commit:** Run `node scripts/generate-dataset.js` manually to confirm it exits 0 and writes the file
- **After test task commit:** Run `npx vitest run src/__tests__/generate-dataset.test.js`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~60 seconds (generation + tests)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 0 | DATA-01..04 | integration | `npx vitest run src/__tests__/generate-dataset.test.js` | ❌ Wave 0 | ⬜ pending |
| 07-02-01 | 02 | 1 | DATA-01, DATA-02 | integration | `node scripts/generate-dataset.js && npx vitest run src/__tests__/generate-dataset.test.js` | ✅ W0 | ⬜ pending |
| 07-02-02 | 02 | 1 | DATA-03 | integration | `npx vitest run src/__tests__/generate-dataset.test.js` | ✅ W0 | ⬜ pending |
| 07-02-03 | 02 | 1 | DATA-04 | integration | `npx vitest run src/__tests__/generate-dataset.test.js` | ✅ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/generate-dataset.test.js` — integration tests for DATA-01, DATA-02, DATA-03, DATA-04
- [ ] `scripts/` directory — must exist before generate-dataset.js can be placed there

*Existing infrastructure: `vitest.config.ts` and `src/__tests__/setup.ts` already present.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Script prints progress to console | DATA-01 | stdout output not asserted in tests | Run `node scripts/generate-dataset.js`, verify progress lines appear and final summary shows row count + file size |
| CSV opens correctly in VS Code / Excel | DATA-02 | Rendering not testable in Vitest | Open `public/transactions.csv`, verify columns are correctly separated and readable |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
