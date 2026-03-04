---
phase: 2
slug: navigation-layout
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-03
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library |
| **Config file** | `vitest.config.ts` — Wave 0 installs |
| **Quick run command** | `npx vitest run src/__tests__/Navbar.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds (single test file) |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/__tests__/Navbar.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 0 | NAV-01..04 | setup | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-01 | 02 | 1 | NAV-01 | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-02 | 02 | 1 | NAV-01 | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-03 | 02 | 1 | NAV-02 | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-04 | 02 | 1 | NAV-02 | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-05 | 02 | 1 | NAV-03 | unit (mock usePathname) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-06 | 02 | 1 | NAV-04 | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-07 | 02 | 1 | NAV-04 | unit (interaction) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-08 | 02 | 1 | NAV-04 | unit (interaction) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/Navbar.test.tsx` — stubs for NAV-01..NAV-04 (render, active state, mobile toggle)
- [ ] `vitest.config.ts` — Vitest config with jsdom environment and React Testing Library
- [ ] Install test dependencies: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom`

**Mock pattern for `usePathname`:**
```typescript
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
}));
```

**Mock pattern for `iconsax-react`** (avoids SVG render errors in jsdom):
```typescript
vi.mock('iconsax-react', () => ({
  Home: () => <svg data-testid="icon-home" />,
  Document: () => <svg data-testid="icon-document" />,
  Judge: () => <svg data-testid="icon-judge" />,
  FolderOpen: () => <svg data-testid="icon-folder" />,
  Send: () => <svg data-testid="icon-send" />,
  HambergerMenu: () => <svg data-testid="icon-hamburger" />,
}));
```

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Navbar visually fixed at top while scrolling | NAV-01 | CSS `position: fixed` cannot be tested in jsdom | Load page, scroll down, verify navbar stays visible |
| Amber active indicator visible on correct page | NAV-03 | Visual rendering not verified by class assertion alone | Navigate to each page, verify amber highlight on correct link |
| Mobile menu animation smoothness | NAV-04 | CSS transitions not rendered in jsdom | On mobile viewport, tap hamburger, verify smooth slide |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
