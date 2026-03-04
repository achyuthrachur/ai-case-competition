---
phase: 3
slug: home-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + React Testing Library 16.3.2 (installed in Phase 2) |
| **Config file** | `vitest.config.ts` (project root — exists) |
| **Quick run command** | `npx vitest run src/__tests__/HomePage.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/__tests__/HomePage.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 0 | HOME-01..04 | setup | `npx vitest run src/__tests__/HomePage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 3-02-01 | 02 | 1 | HOME-01, HOME-02 | unit (render + callback) | `npx vitest run src/__tests__/HomePage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 3-02-02 | 02 | 1 | HOME-03 | unit (render + hrefs) | `npx vitest run src/__tests__/HomePage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 3-02-03 | 02 | 1 | HOME-04 | unit (render) | `npx vitest run src/__tests__/HomePage.test.tsx` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/HomePage.test.tsx` — stubs/tests for HOME-01 through HOME-04
  - HOME-01: BlurText renders with the headline text
  - HOME-02: Blurb hidden initially (opacity-0), visible after `onAnimationComplete` fires
  - HOME-03: 4 cards render with correct labels and href links (/instructions, /rubric, /downloads, /submit)
  - HOME-04: Key dates section renders "Competition Opens" and "Submission Deadline" with "TBD" values

**Existing infrastructure (no new installs needed):**
- Vitest, React Testing Library, jsdom, jest-dom — all installed in Phase 2
- `src/__tests__/setup.ts` already extends jest-dom matchers

**Mock pattern for BlurText** (GSAP-dependent — must mock for jsdom):
```typescript
vi.mock('@/components/ui/blur-text', () => ({
  BlurText: ({ text, onAnimationComplete }: { text: string; onAnimationComplete?: () => void }) => (
    <h1 data-testid="blur-text" onClick={onAnimationComplete}>{text}</h1>
  ),
}));
```

**Mock pattern for iconsax-react** (SVG stub):
```typescript
vi.mock('iconsax-react', () => ({
  Document: () => <svg data-testid="icon-document" />,
  Judge: () => <svg data-testid="icon-judge" />,
  FolderOpen: () => <svg data-testid="icon-folder" />,
  Send: () => <svg data-testid="icon-send" />,
  Calendar: () => <svg data-testid="icon-calendar" />,
}));
```

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| BlurText animation renders visually (blur → sharp) | HOME-01 | GSAP animation not rendered in jsdom | Load localhost:3000, verify words blur in one-by-one |
| Blurb fades in smoothly after headline | HOME-02 | CSS transition not verifiable in jsdom | Watch blurb opacity transition on page load |
| Card hover — lift + amber glow renders correctly | HOME-03 | CSS transform/shadow not applied in jsdom | Hover each card, verify -translate-y + amber shadow |
| Full-width hero/dates sections break out of container | HOME-01, HOME-04 | Visual layout not verifiable in jsdom | Verify bands extend edge-to-edge at all breakpoints |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
