# Phase 5: Rubric Page - Research

**Researched:** 2026-03-04
**Domain:** Next.js Server Component — static content page with CSS fill bar and amber callout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Category Card Layout**
- 2x2 grid of cards — 2 across on desktop (`grid-cols-2`), single column on mobile (`grid-cols-1`)
- Each of the 4 categories gets its own card: Data Analysis Depth (40%), Dashboard UI Quality (35%), Memo Quality (15%), Extra Credit (up to 15%)
- Cards use the established white-card-on-warm-bg pattern: `bg-white shadow-crowe-card rounded-xl`
- All 4 Extra Credit card is the same style as other categories — no visual distinction

**Visual Weight Indicator (Fill Bar)**
- Percentage text + fill bar — both shown, not bar alone
- Literal fill: bar fills to the exact percentage (40% → 40% fill, 35% → 35% fill, 15% → 15% fill)
- Color: Indigo (`bg-crowe-indigo-dark`) fill bar on a light indigo-tinted track (`bg-tint-100` or `bg-tint-200`)
- Position: Below the category title, above the description text — layout per card:
  1. Category title (`h3`, bold, `text-crowe-indigo-dark`)
  2. Percentage text + fill bar (indigo, literal fill)
  3. "What We're Looking For" description paragraph

**Grading Notes Callout**
- Reuse the established amber-wash callout pattern from Phase 4 (Instructions page Guidance block)
- Styling: `bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5`
- Label above the text: "Grading Notes" in `text-sm font-semibold text-crowe-amber uppercase tracking-wide`
- Quote text: italic, `text-tint-900`, standard body size
- Content (verbatim): *"Grading is field-and-feel based. There is no formula. We're looking for evidence of critical thinking, intentional design decisions, and genuine engagement with the data — not just the volume of output."*

**Page Layout**
- Same narrow reading column as Instructions page: `max-w-3xl mx-auto py-12 sm:py-16`
- Page title block at top: `h1` "Rubric" + subtitle "Grading Criteria"
- Section order (top to bottom):
  1. Page title block
  2. 2x2 category card grid
  3. Grading Notes callout block

**Content (Locked — from AGENT_PLAN.md)**
| Category | Weight | Description |
|---|---|---|
| Data Analysis Depth | 40% | Did they go beyond listing anomalous rows? Are there trend analyses, pattern clusters, time-series observations, or forward-looking insights? |
| Dashboard UI Quality | 35% | Does the dashboard look polished and intentional? Did they use UI libraries, animations, or charts that go beyond default AI-generated output? |
| Memo Quality | 15% | Is the written narrative clear, accurate, and actionable? Does it read like a real compliance memo or like a summary of what the code does? |
| Extra Credit | up to 15% | Did they go above and beyond? Unique chart types, external data context, custom animations, creative layout, unexpected insight? |

### Claude's Discretion
- Exact padding/spacing within cards (follow 8px grid from CLAUDE.md)
- Fill bar height (likely `h-2` or `h-1.5`)
- Whether to add a `transition-all duration-500` width animation on the fill bar
- Exact font sizes for category title vs description
- Whether to add a subtle section heading ("Grading Categories") above the grid

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| RUB-01 | Four scoring categories displayed with visual weight indicators (Data Analysis Depth 40%, Dashboard UI Quality 35%, Memo Quality 15%, Extra Credit up to 15%) | Card grid pattern with Tailwind `w-[40%]` fill bar; no JS needed — static Server Component |
| RUB-02 | "What We're Looking For" description for each category | Static text rendered inside each card below the fill bar |
| RUB-03 | Grading Notes rendered as a styled callout block | Direct reuse of Phase 4 Guidance callout pattern: `bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5` |
</phase_requirements>

---

## Summary

Phase 5 is a pure presentation phase. The content is fully specified and locked. The implementation challenge is applying established Crowe brand patterns to a new layout: a 2x2 grid of scoring category cards with indigo fill bars, followed by an amber callout.

The page is a pure Server Component — no `'use client'` directive, no hooks, no animation libraries, no external data fetching. This makes it identical in structure to the Instructions page (Phase 4), which is now the canonical reference implementation. Every visual pattern needed already exists in the codebase.

The only genuinely new element is the fill bar (progress/weight indicator). This is a two-div pattern: an outer track div with `bg-tint-100 rounded-full` and an inner fill div with `bg-crowe-indigo-dark rounded-full` sized via a Tailwind arbitrary value `w-[40%]`. No external library is needed; Tailwind handles the arbitrary percentage widths directly. The `transition-all duration-500` animation on the fill bar is at Claude's discretion and is trivially addable.

**Primary recommendation:** Implement as a pure Server Component following the Instructions page template exactly. Use the fill bar two-div pattern with Tailwind arbitrary widths. Test suite mirrors InstructionsPage.test.tsx structure — no mocks, `render` + `screen.getBy*` only.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 14+ (installed) | Server Component page at `src/app/rubric/page.tsx` | Project foundation — already running |
| Tailwind CSS | v3 (installed) | All styling including arbitrary width values for fill bar | Project standard — Crowe tokens already configured |
| TypeScript | (installed) | Named export, typed component | Project standard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Vitest + React Testing Library | (installed) | TDD test suite for RUB-01..03 | Plan 01 writes RED tests; Plan 02 makes them GREEN |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind arbitrary `w-[40%]` fill bar | shadcn Progress component | shadcn Progress uses `--radius` var and adds unnecessary wrapper complexity; plain Tailwind is simpler and already sufficient |
| Plain `div` fill bar | Anime.js animated width | Animation is at Claude's discretion; plain div works for Plan 02 and animation can be layered if chosen |

**Installation:** No new packages needed. Everything required is already installed.

---

## Architecture Patterns

### Recommended Project Structure
No new directories needed. This phase touches exactly two files:

```
src/
├── __tests__/
│   └── RubricPage.test.tsx        # Plan 01 — RED test suite
└── app/
    └── rubric/
        └── page.tsx               # Plan 02 — replace 6-line stub with full implementation
```

### Pattern 1: Pure Server Component Page
**What:** `export default function RubricPage()` with no `'use client'`, no hooks, no dynamic imports
**When to use:** Any page that is static content with no interactivity (same as InstructionsPage)
**Example:**
```tsx
// Mirrors src/app/instructions/page.tsx exactly
export default function RubricPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      {/* PAGE TITLE BLOCK */}
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Rubric</h1>
        <p className="text-tint-700 mt-2 text-lg">Grading Criteria</p>
      </div>
      {/* ...rest */}
    </div>
  );
}
```

### Pattern 2: 2×2 Responsive Card Grid
**What:** CSS grid that is 2 columns on desktop and 1 column on mobile
**When to use:** 4 equal-weight cards, reading priority left-to-right
**Example:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Four category cards */}
</div>
```

### Pattern 3: Category Card with Fill Bar
**What:** White card (established pattern) containing title, percentage + fill bar, description
**When to use:** Every one of the 4 scoring category cards
**Example:**
```tsx
<div className="bg-white shadow-crowe-card rounded-xl p-6">
  {/* 1. Category title */}
  <h3 className="text-lg font-bold text-crowe-indigo-dark">Data Analysis Depth</h3>

  {/* 2. Percentage text + fill bar */}
  <div className="mt-3">
    <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">40%</p>
    {/* Track */}
    <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
      {/* Fill — arbitrary Tailwind width matches exact percentage */}
      <div className="h-full w-[40%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
    </div>
  </div>

  {/* 3. "What We're Looking For" description */}
  <p className="mt-4 text-tint-700 leading-relaxed text-sm">
    Did they go beyond listing anomalous rows? Are there trend analyses, pattern clusters,
    time-series observations, or forward-looking insights?
  </p>
</div>
```

**Key insight on fill bar:** Tailwind's JIT engine compiles arbitrary values like `w-[40%]`, `w-[35%]`, `w-[15%]` at build time — no runtime JS needed. Each card hardcodes its own fill div width.

### Pattern 4: Amber-Wash Callout (Established — Reuse from Phase 4)
**What:** Left-border amber block with label + italic quote
**When to use:** "Grading Notes" block — direct copy of Guidance callout from Instructions page
**Example:**
```tsx
<div className="mt-10 sm:mt-12 bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5">
  <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
    Grading Notes
  </p>
  <p className="italic text-tint-900 leading-relaxed">
    Grading is field-and-feel based. There is no formula. We&apos;re looking for evidence of
    critical thinking, intentional design decisions, and genuine engagement with the data &mdash;
    not just the volume of output.
  </p>
</div>
```

**Note on class:** The Instructions page uses `bg-section-amber` (a Tailwind `backgroundColor` extension token for `#fff8eb`). The CONTEXT.md specifies `bg-[#fff8eb]` (arbitrary value). Both resolve to the same hex. `bg-section-amber` is the cleaner option as it's already a named token in `tailwind.config.ts`.

### Anti-Patterns to Avoid
- **Adding `'use client'`:** Not needed — no state, no effects, no browser APIs. Adding it unnecessarily bypasses Server Component rendering.
- **Importing a Progress component:** shadcn's Progress component uses a different API (`value` prop + CSS variable) and adds overhead. The two-div pattern is simpler and fully sufficient.
- **Using a JS object/array to map categories:** Tempting for DRY, but makes tests harder (no unique text handles). Inline card JSX is clearer and more test-friendly for a 4-item list.
- **Animating fill bar width on mount with JS:** Fill bar animation is CSS-only via `transition-all duration-500`; no JS animation library needed for this effect. If animation is omitted, simply remove the `transition-all` class.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fill bar / progress indicator | Custom SVG arc or JS-calculated width | `div` with `w-[40%]` Tailwind arbitrary width | Tailwind JIT handles arbitrary percentages natively; no computation needed |
| Callout block styling | New component or CSS module | Copy-paste of established Phase 4 Guidance pattern | Already battle-tested in codebase; consistency is the goal |
| Grid responsive breakpoint | Custom media query CSS | Tailwind `grid-cols-1 sm:grid-cols-2` | Already in project Tailwind config; zero config needed |

**Key insight:** This phase is entirely composition of existing patterns. Nothing genuinely new needs to be invented.

---

## Common Pitfalls

### Pitfall 1: Uppercase CSS vs DOM Text in Tests
**What goes wrong:** Test asserts `screen.getByText('GRADING NOTES')` and fails even though the callout label appears correct visually
**Why it happens:** Tailwind `uppercase` is a CSS `text-transform` property — it does NOT change the actual DOM text node. The DOM always contains the literal string passed to JSX.
**How to avoid:** Always test against the literal JSX string. For "Grading Notes" with `uppercase` class: test `getByText('Grading Notes')`, not `getByText('GRADING NOTES')`.
**Warning signs:** Test fails only for the label text, not the body text; inspecting the element in browser shows uppercase but DOM shows lowercase.

### Pitfall 2: Arbitrary Tailwind Width Not Rendering
**What goes wrong:** `w-[40%]` class applied to fill div but width is 0 or 100%
**Why it happens:** Arbitrary values require the Tailwind JIT scanner to have seen the exact class string in a scanned file. If the class is assembled dynamically (`w-[${pct}%]`) the string is never in source and won't be compiled.
**How to avoid:** Write each width as a literal string in JSX — `w-[40%]`, `w-[35%]`, `w-[15%]`. Never construct arbitrary values via template literals.
**Warning signs:** Fill bar renders but shows no fill; inspecting element shows the class is present but Tailwind generated no CSS for it.

### Pitfall 3: Test Collision from Shared Text
**What goes wrong:** `screen.getByText('15%')` throws "Found multiple elements" because "up to 15%" also contains "15%"
**Why it happens:** `getByText` with regex `\b15%\b` or substring match can hit multiple nodes
**How to avoid:** For the Extra Credit card, the percentage display text is "up to 15%" (verbatim from CONTEXT.md). Tests should use `getByText(/up to 15%/)` for Extra Credit and `getByText('40%')`, `getByText('35%')`, `getByText('15%')` only if the "Memo Quality" card renders exactly `15%` without the "up to" prefix. Match text nodes carefully.

### Pitfall 4: `overflow-hidden` Missing on Fill Bar Track
**What goes wrong:** Fill div with `rounded-full` overflows the track container, showing corners outside the track
**Why it happens:** Without `overflow-hidden` on the track div, child elements can paint outside their parent's border-radius clip
**How to avoid:** Always add `overflow-hidden` to the track div: `<div className="h-2 bg-tint-100 rounded-full overflow-hidden">`

---

## Code Examples

Verified patterns from the existing codebase:

### Callout Pattern (Phase 4 Guidance block — confirmed source of truth)
```tsx
// Source: src/app/instructions/page.tsx lines 131-141
<div className="mt-10 sm:mt-12 bg-section-amber border-l-4 border-crowe-amber rounded-r-lg px-6 py-5">
  <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
    Guidance
  </p>
  <p className="italic text-tint-900 leading-relaxed">
    The end deliverables are clear...
  </p>
</div>
```

### Page Title Block (Phase 4 — confirmed source of truth)
```tsx
// Source: src/app/instructions/page.tsx lines 5-8
<div className="mb-10 sm:mb-12">
  <h1 className="text-4xl font-bold text-crowe-indigo-dark">Instructions</h1>
  <p className="text-tint-700 mt-2 text-lg">Case Brief</p>
</div>
```

### Card Shadow Token (confirmed in tailwind.config.ts)
```ts
// Source: tailwind.config.ts line 39-41
'crowe-card': '0 1px 3px rgba(1,30,65,0.04), 0 6px 16px rgba(1,30,65,0.04), 0 12px 32px rgba(1,30,65,0.02)',
```

### Section Amber Background Token (confirmed in tailwind.config.ts)
```ts
// Source: tailwind.config.ts line 47
'section-amber': '#fff8eb',
// Available as: bg-section-amber (same as bg-[#fff8eb])
```

### Complete RubricPage — Reference Implementation
```tsx
// src/app/rubric/page.tsx
export default function RubricPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      {/* PAGE TITLE BLOCK */}
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Rubric</h1>
        <p className="text-tint-700 mt-2 text-lg">Grading Criteria</p>
      </div>

      {/* CATEGORY CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Data Analysis Depth — 40% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Data Analysis Depth</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">40%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Did they go beyond listing anomalous rows? Are there trend analyses, pattern clusters,
            time-series observations, or forward-looking insights?
          </p>
        </div>

        {/* Dashboard UI Quality — 35% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Dashboard UI Quality</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">35%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[35%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Does the dashboard look polished and intentional? Did they use UI libraries, animations,
            or charts that go beyond default AI-generated output?
          </p>
        </div>

        {/* Memo Quality — 15% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Memo Quality</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">15%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[15%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Is the written narrative clear, accurate, and actionable? Does it read like a real
            compliance memo or like a summary of what the code does?
          </p>
        </div>

        {/* Extra Credit — up to 15% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Extra Credit</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">up to 15%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[15%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Did they go above and beyond? Unique chart types, external data context, custom
            animations, creative layout, unexpected insight?
          </p>
        </div>
      </div>

      {/* GRADING NOTES CALLOUT */}
      <div className="mt-10 sm:mt-12 bg-section-amber border-l-4 border-crowe-amber rounded-r-lg px-6 py-5">
        <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
          Grading Notes
        </p>
        <p className="italic text-tint-900 leading-relaxed">
          Grading is field-and-feel based. There is no formula. We&apos;re looking for evidence of
          critical thinking, intentional design decisions, and genuine engagement with the data
          &mdash; not just the volume of output.
        </p>
      </div>
    </div>
  );
}
```

### Test Pattern (mirrors InstructionsPage.test.tsx)
```tsx
// src/__tests__/RubricPage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RubricPage from '@/app/rubric/page';

// No mocks needed — RubricPage is a pure Server Component with no hooks,
// router calls, animation dependencies, or icon imports.

describe('RubricPage', () => {
  // RUB-01: Four scoring categories with visual weight indicators
  it('renders page title', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Rubric' })).toBeInTheDocument();
  });

  it('renders Data Analysis Depth category with 40%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Data Analysis Depth' })).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('renders Dashboard UI Quality category with 35%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Dashboard UI Quality' })).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
  });

  it('renders Memo Quality category with 15%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Memo Quality' })).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('renders Extra Credit category with up to 15%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Extra Credit' })).toBeInTheDocument();
    expect(screen.getByText('up to 15%')).toBeInTheDocument();
  });

  // RUB-02: "What We're Looking For" descriptions
  it('renders Data Analysis Depth description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/go beyond listing anomalous rows/i)).toBeInTheDocument();
  });

  it('renders Dashboard UI Quality description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/polished and intentional/i)).toBeInTheDocument();
  });

  it('renders Memo Quality description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/real compliance memo/i)).toBeInTheDocument();
  });

  it('renders Extra Credit description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/above and beyond/i)).toBeInTheDocument();
  });

  // RUB-03: Grading Notes callout block
  it('renders Grading Notes callout label', () => {
    render(<RubricPage />);
    // DOM text is 'Grading Notes' — Tailwind 'uppercase' is CSS-only and does NOT affect DOM text
    expect(screen.getByText('Grading Notes')).toBeInTheDocument();
  });

  it('renders Grading Notes callout quote text', () => {
    render(<RubricPage />);
    expect(screen.getByText(/field-and-feel based/i)).toBeInTheDocument();
    expect(screen.getByText(/critical thinking/i)).toBeInTheDocument();
  });
});
```

**Note on `15%` text collision:** Both "Memo Quality" and "Extra Credit" render `w-[15%]` fill bars, and "Memo Quality" renders the text `15%` while "Extra Credit" renders `up to 15%`. These are distinct text nodes — `getByText('15%')` matches exact text in a node, so `up to 15%` will NOT match `getByText('15%')`. No collision. Confirmed safe.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| shadcn Progress component (`<Progress value={40} />`) | Plain two-div Tailwind pattern | Project decision (Phase 5) | No extra component wrapper, no CSS variable conflicts, full control over styling |
| `'use client'` for any animated element | Pure Server Component with CSS-only transition | Phases 1-4 established Server Component baseline | Simpler rendering path, no hydration overhead |

---

## Open Questions

1. **Fill bar animation: include or omit?**
   - What we know: CONTEXT.md marks this as Claude's discretion; `transition-all duration-500` is trivially addable
   - What's unclear: Whether the CSS transition fires on initial render in a Server Component (it typically does not — transitions trigger on property changes, not initial paint)
   - Recommendation: Include the `transition-all duration-500` class for future-proofing (if the bar ever becomes dynamic). For the current static render, it has no visual effect and adds no complexity.

2. **Fill bar height: `h-1.5` or `h-2`?**
   - What we know: Both are listed in CONTEXT.md as Claude's discretion options; `h-2` = 8px, `h-1.5` = 6px
   - Recommendation: Use `h-2` (8px). Aligns with the 8px grid system from CLAUDE.md and is more visually readable at the card width.

3. **Optional "Grading Categories" section heading above the grid?**
   - What we know: CONTEXT.md lists this as Claude's discretion
   - Recommendation: Omit it. The page title "Rubric / Grading Criteria" already frames the content. A section heading above 4 cards adds visual noise in a narrow column layout. Keep it clean.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 1.x + React Testing Library |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `npx vitest run src/__tests__/RubricPage.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| RUB-01 | All 4 categories render with heading + percentage text | unit | `npx vitest run src/__tests__/RubricPage.test.tsx` | Wave 0 |
| RUB-02 | Each category description text renders | unit | `npx vitest run src/__tests__/RubricPage.test.tsx` | Wave 0 |
| RUB-03 | Grading Notes label and quote text render | unit | `npx vitest run src/__tests__/RubricPage.test.tsx` | Wave 0 |

**Note on fill bar visual testing:** The fill bar's rendered width (`w-[40%]` → CSS `width: 40%`) cannot be asserted in jsdom because Tailwind CSS is not evaluated in the test environment. Visual correctness of fill bars is verified by manual browser inspection, not unit tests. Unit tests cover content presence only.

### Sampling Rate
- **Per task commit:** `npx vitest run src/__tests__/RubricPage.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/RubricPage.test.tsx` — covers RUB-01, RUB-02, RUB-03 (11 tests, all RED until Plan 02)

---

## Sources

### Primary (HIGH confidence)
- `src/app/instructions/page.tsx` — canonical established pattern for callout, page layout, heading style, body text style
- `tailwind.config.ts` — confirmed available tokens: `shadow-crowe-card`, `bg-section-amber`, `text-crowe-indigo-dark`, `text-crowe-amber`, `bg-tint-100`, `bg-tint-200`, `text-tint-700`, `text-tint-900`
- `src/__tests__/InstructionsPage.test.tsx` — canonical test pattern for Server Component pages
- `.planning/phases/05-rubric-page/05-CONTEXT.md` — all locked decisions, content, and layout specification

### Secondary (MEDIUM confidence)
- CLAUDE.md Section 2.2 — color token definitions cross-referenced with tailwind.config.ts (confirmed match)
- CLAUDE.md Section 2.3 — 8px grid system used for spacing decisions within cards

### Tertiary (LOW confidence)
- None — all findings verified against actual project files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed installed and in use by prior phases
- Architecture: HIGH — established patterns confirmed from reading actual source files (not assumptions)
- Pitfalls: HIGH — discovered by reading established test and implementation patterns; no speculative claims
- Test patterns: HIGH — exact pattern confirmed from InstructionsPage.test.tsx which is GREEN and committed

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable stack; no external dependencies to track)
