# Phase 2: Navigation & Layout - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a persistent top navbar component (Navbar.tsx) integrated into the root layout so it appears on every page. Delivers: wordmark display, 5 nav links with Iconsax icons, active-route highlighting, and mobile hamburger collapse. No page content — navigation shell only.

</domain>

<decisions>
## Implementation Decisions

### Navbar Background
- **Dark indigo brand bar** — use `--crowe-indigo-dark` (#011E41) as navbar background
- Text and icons in soft white (`#f6f7fa`) — matches CLAUDE.md `--color-text-inverse`
- Rationale: AGENT_PLAN.md says "dark navy/slate background"; CLAUDE.md designates `--color-surface-brand` (indigo dark) for "Hero sections, footer" — navbar as the top brand anchor fits this pattern
- The contrast between dark navbar and warm off-white page content creates clear visual hierarchy

### Active State Indicator
- Amber underline/bottom border on the active nav link — `--crowe-amber-core` (#F5A800)
- Text color shifts to amber on active; inactive links are soft white at reduced opacity (~70%)
- Thin 2px bottom border on active link (not a filled pill — keeps navbar clean)
- Rationale: Amber as the only accent on a dark indigo bar is visually striking and brand-correct

### Mobile Menu Behavior
- **Dropdown slidedown** — menu expands vertically below the fixed navbar bar
- Full-width panel in the same dark indigo background, links stacked vertically
- Hamburger icon toggles open/closed; tapping a link closes the menu
- No overlay or drawer — simpler implementation, consistent with the fixed-bar approach

### Sticky / Position
- Fixed to top (`position: fixed; top: 0`) — always visible while scrolling
- Page content gets `padding-top` equal to navbar height (e.g., `pt-16`) to avoid overlap
- Established in AGENT_PLAN.md: "Fixed top bar, full width"

### Wordmark Treatment
- Text only: "Meridian Financial — AI Case Competition" in soft white
- Small font size (text-sm or text-base), slightly bold — clean, not a large logo treatment
- AGENT_PLAN.md: "small, clean wordmark" — no icon or graphical mark beside it
- Clickable — links to `/` (home)

### Root Layout Structure
- Root layout adds `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` content wrapper
- Each page's content sits inside this container; hero/full-bleed sections can break out with negative margin or a separate full-width wrapper if needed
- Navbar itself is full-width (not constrained by container)
- Rationale: Prevents extreme stretching on ultra-wide screens; consistent with CLAUDE.md generous whitespace principle

### Icon Style
- Iconsax `Linear` variant (default thin outline) for inactive links
- Iconsax `Bold` variant for active link
- Icon color inherits from link text color
- Per CLAUDE.md Appendix A5: "Default Linear for body, Bold for CTAs/active states"

### Nav Links (locked from AGENT_PLAN.md + REQUIREMENTS.md)
- Home → Iconsax `Home`
- Instructions → Iconsax `Document`
- Rubric → Iconsax `Judge`
- Downloads → Iconsax `FolderOpen`
- Submit → Iconsax `Send`

### Claude's Discretion
- Exact transition/animation for mobile menu open/close
- Precise navbar height (likely 60–64px)
- Whether to add a subtle bottom border or shadow on the navbar for depth
- Hamburger icon choice (Iconsax `HambergerMenu` or similar)

</decisions>

<specifics>
## Specific Ideas

- AGENT_PLAN.md: "Fixed top bar, full width. Left: wordmark. Right: nav links."
- AGENT_PLAN.md: Professional but modern — not a tutorial or demo feel
- CLAUDE.md: Active states use Bold icon variant; inactive use Linear
- Amber (#F5A800) is the only accent color allowed on the dark indigo surface

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/button.tsx` — shadcn Button; could be used for mobile menu toggle but likely simpler with a plain `<button>` for the hamburger
- `src/components/ui/` — card, badge, dialog, input available but none directly needed for this phase
- `src/lib/utils.ts` — `cn()` merge utility for conditional Tailwind classes (crucial for active state toggling)
- `src/components/ui/blur-text.tsx` — GSAP BlurText; not needed for navbar

### Established Patterns
- Named exports, functional TypeScript components (no `export default` for components)
- `interface` for props, no `any` types — per CLAUDE.md Section 4.3
- Tailwind CSS with `bg-crowe-indigo-dark`, `text-crowe-amber`, `shadow-crowe-*` utilities available
- `bg-page` (#f8f9fc) already on `<body>` in `layout.tsx`

### Integration Points
- `src/app/layout.tsx` — Navbar added here, wrapping `{children}`; `pt-16` or similar added to content area
- Active route detection: use Next.js `usePathname()` hook from `next/navigation` in a `'use client'` Navbar component
- 5 app routes to create as empty shell pages: `/`, `/instructions`, `/rubric`, `/downloads`, `/submit` — Navbar phase should stub these out so active-state can be verified
- No existing routing or page structure beyond `src/app/page.tsx`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-navigation-layout*
*Context gathered: 2026-03-03*
