# Phase 4: Instructions Page - Research

**Researched:** 2026-03-04
**Domain:** Next.js static Server Component — long-form prose layout with Crowe brand typography and styled component patterns
**Confidence:** HIGH

---

## Summary

Phase 4 replaces the 6-line stub at `src/app/instructions/page.tsx` with a fully-rendered case brief. All content is locked verbatim in AGENT_PLAN.md. The work is entirely presentational: narrow reading column, amber-accented section headings, a styled callout panel, indigo numbered badge deliverables, and custom bullet lists.

This is a pure Server Component — no state, no hooks, no client-side interaction. The `'use client'` directive is explicitly NOT needed. The component is implemented entirely with Tailwind utility classes using tokens already configured in `tailwind.config.ts`. No new dependencies are required.

The layout integration is clean: `layout.tsx` wraps `<main>` in `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` with a `pt-16` navbar offset. The instructions page nests a `max-w-3xl mx-auto` column inside that — this works without conflict because `max-w-3xl` (768px) is well inside `max-w-7xl` (1280px). No padding manipulation or negative-margin breakout is needed.

**Primary recommendation:** Implement as a named-export Server Component. Use the verbatim content from AGENT_PLAN.md. Apply all Tailwind classes directly (no prose plugin, no shadcn Card). Map each requirement to its section with a test in `src/__tests__/InstructionsPage.test.tsx` using the established RTL render pattern.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Reading Width & Layout**
- Narrow reading column — use `max-w-3xl mx-auto` (768px) for the content area, centered within the page
- The full `max-w-7xl` layout container from `layout.tsx` is the outer bound; the content column is narrower for comfortable line length
- Generous vertical padding (`py-12 sm:py-16`) between sections for breathing room
- Page title ("Instructions") as a large `h1` in `text-crowe-indigo-dark` at the top of the column

**Section Heading Treatment**
- Indigo `h2` with amber left-border accent — each of the 5 section headings gets a `border-l-4 border-crowe-amber pl-4` treatment
- Heading text: `text-2xl font-bold text-crowe-indigo-dark`
- Section headings: "Background", "Your Dataset", "Your Deliverables", "Tools You Should Use", "What You Do NOT Need to Do"

**Guidance Callout Style**
- Amber-bordered callout panel — distinct from body text
- Styling: `bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5`
- Small label above the quote: "Guidance" in `text-sm font-semibold text-crowe-amber uppercase tracking-wide`
- Quote text: italic, `text-tint-900`, standard body size

**Numbered Deliverables Style**
- Styled `ol` with prominent numbered items — each deliverable gets a large indigo number badge
- Number badge: `w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0`
- Item layout: flex row with badge left, content right (`gap-4 items-start`)
- Item title in bold (`font-semibold text-crowe-indigo-dark`), description as normal body text below

**Content (Locked — from AGENT_PLAN.md)**
Full verbatim content for all 6 sections is specified in AGENT_PLAN.md under `/instructions — Case Brief`. Must render exactly as written. No paraphrasing.

**Page Structure (top to bottom, all within `max-w-3xl mx-auto`)**
1. Page heading: `h1` "Instructions" + subtitle "Case Brief"
2. Background section: `h2` + paragraph
3. Your Dataset section: `h2` + paragraph
4. Your Deliverables section: `h2` + styled numbered list (2 items)
5. Tools You Should Use section: `h2` + bullet list
6. What You Do NOT Need to Do section: `h2` + bullet list
7. Guidance section: amber callout panel (full content from AGENT_PLAN.md)

**Bullet Lists (Tools / What You Don't Need)**
- Standard `ul` with custom bullet — Claude's discretion on exact bullet style

### Claude's Discretion
- Exact spacing between sections (follow 8px grid from CLAUDE.md)
- Whether to add a subtle horizontal rule or just rely on spacing + heading to separate sections
- Exact prose width (max-w-3xl vs max-w-2xl — use whichever reads better at 16px body text)
- Whether page title section gets a subtle indigo background band or just warm off-white

### Deferred Ideas (OUT OF SCOPE)
- Table of contents for quick section navigation — noted in REQUIREMENTS.md v2 (UX-02), intentionally out of scope for v1
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INST-01 | "Background" section rendered with heading and paragraph text | Section content extracted verbatim from AGENT_PLAN.md below; `h2` with `border-l-4 border-crowe-amber pl-4` heading pattern identified |
| INST-02 | "Your Dataset" section rendered | Section content extracted verbatim from AGENT_PLAN.md below; same heading pattern applies |
| INST-03 | "Your Deliverables" section with numbered list (HTML Dashboard, 2-page Memo) | Indigo badge `ol` pattern fully specified in CONTEXT.md; both items' descriptions extracted verbatim |
| INST-04 | "Tools You Should Use" and "What You Do NOT Need to Do" sections | Both bullet lists extracted verbatim; custom `ul` bullet treatment specified |
| INST-05 | "Guidance" section rendered as a styled callout/quote block | Callout content extracted verbatim; amber-wash `bg-[#fff8eb] border-l-4 border-crowe-amber` styling confirmed against Phase 3 `bg-section-amber` token |
</phase_requirements>

---

## Verbatim Content (from AGENT_PLAN.md)

**CRITICAL:** This is the locked content. Implementation must use these strings exactly.

### Section: Background
> You are working with a fictional financial institution called Meridian Financial. The compliance team has been manually reviewing transaction records and flagging anomalies. They've asked for a dashboard that makes it easier to visualize suspicious activity, understand patterns, and communicate findings to leadership.

### Section: Your Dataset
> You've been provided with a synthetic dataset of approximately 500–1,000 transaction records (`transactions.csv`). Each row represents a single transaction. The compliance team has already reviewed every record — anomalies are pre-labeled in the `is_anomalous` column. A plain-English reason for each flagged transaction is in the `anomaly_notes` column.

### Section: Your Deliverables (numbered list)

**Item 1 — Standalone HTML Dashboard**
> A single `.html` file that can be opened directly in any browser with no server or dependencies. It should visualize the transaction data, surface anomalies, and allow a viewer to explore patterns.

**Item 2 — 2-Page Findings Memo**
> A written document (PDF, DOCX, or Markdown) summarizing what you found, what patterns you observed, and what you recommend. Pretend you are presenting this to the compliance team at Meridian Financial.

### Section: Tools You Should Use (bullet list)
- VS Code (code editor)
- Cursor or GitHub Copilot (AI coding assistant)
- ChatGPT, Claude, or any LLM (for ideation, narrative writing, code generation)
- Any free, publicly accessible UI libraries or chart libraries you find

### Section: What You Do NOT Need to Do (bullet list)
- Build a machine learning model — anomalies are already labeled
- Deploy anything to a server
- Follow any specific branding guidelines
- Use any particular framework — plain HTML/CSS/JS is perfectly valid

### Section: Guidance (callout panel — INST-05)
> The end deliverables are clear. How you get there is entirely up to you. We encourage you to use AI aggressively — to ideate, to write code, to draft your memo, to debug. What we're evaluating is how well you can direct AI to produce something meaningful, polished, and insightful.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 14+ | Server Components, routing | Already in project; page.tsx is a Server Component by default |
| Tailwind CSS | v3 | Utility-class styling | Already configured; all brand tokens present |
| TypeScript | 5+ | Type safety | Already in project; named export required |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `cn()` (clsx + twMerge) | installed | Conditional class merging | Use if any conditional classes needed; available at `@/lib/utils` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind direct | `@tailwindcss/typography` prose plugin | Prose plugin adds ~80KB to bundle; no benefit for 1 page; direct Tailwind is simpler and already established |
| Tailwind direct | shadcn `Card` | Card adds extra DOM nesting; prose sections are better styled inline per Phase 3 pattern |

**Installation:** No new dependencies required.

---

## Architecture Patterns

### Recommended Project Structure

No new directories needed. Single file replacement:

```
src/
├── app/
│   └── instructions/
│       └── page.tsx    # Replace 6-line stub with full implementation
└── __tests__/
    └── InstructionsPage.test.tsx    # New — Wave 0 gap
```

### Pattern 1: Server Component Named Export

**What:** No `'use client'` — purely static content, no hooks or event handlers.
**When to use:** All pages with no interactivity. Reduces bundle size; enables SSR/streaming.

```tsx
// src/app/instructions/page.tsx
// NO 'use client' directive — this is a Server Component

export default function InstructionsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      {/* content */}
    </div>
  );
}
```

Confirmed: The existing stub (`src/app/instructions/page.tsx`) has no `'use client'` and no hooks. This is the correct baseline.

### Pattern 2: Layout Container Nesting

**What:** The `layout.tsx` `<main>` element already provides `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. The instructions page adds a narrower inner column.
**When to use:** Any page requiring a narrow reading column inside the full-width layout.

```tsx
// layout.tsx outer wrapper (already exists — do NOT change):
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {children}
</main>

// instructions/page.tsx inner narrow column:
<div className="max-w-3xl mx-auto py-12 sm:py-16">
  {/* All content here — centered, comfortable line length */}
</div>
```

**No conflict:** `max-w-3xl` (768px) is a subset of `max-w-7xl` (1280px). The layout's `px-4 sm:px-6 lg:px-8` padding still applies correctly. No negative-margin breakout needed (that pattern is for full-bleed sections only — confirmed in Phase 3 where hero and key-dates use `-mx-4 sm:-mx-6 lg:-mx-8`).

### Pattern 3: Amber Left-Border Section Headings

**What:** Each section `h2` gets a 4px amber left border with left padding, creating visual rhythm.
**When to use:** All 5 section headings in the instructions page.

```tsx
<h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
  Background
</h2>
```

Rationale from CONTEXT.md: mirrors the amber active underline on nav links — same brand accent across the app.

### Pattern 4: Amber-Wash Guidance Callout

**What:** A panel visually distinct from body text, using the same `bg-[#fff8eb]` amber wash established in Phase 3's key-dates section.
**When to use:** INST-05 Guidance content only.

```tsx
<div className="bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5 mt-10">
  <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
    Guidance
  </p>
  <p className="italic text-tint-900 leading-relaxed">
    The end deliverables are clear...
  </p>
</div>
```

**Token verification:** `bg-section-amber: '#fff8eb'` is registered in `tailwind.config.ts` as `backgroundColor['section-amber']`. For the callout, use inline `bg-[#fff8eb]` (arbitrary value) to match the locked styling from CONTEXT.md exactly, or use `bg-section-amber`. Both resolve to `#fff8eb`. Using `bg-section-amber` is cleaner and consistent with `bg-page`, `bg-section-warm` etc.

### Pattern 5: Indigo Numbered Badge Deliverables

**What:** Each deliverable is rendered as a flex row: a circular indigo badge with the number, then title + description stacked to the right.
**When to use:** "Your Deliverables" section only (2 items).

```tsx
<ol className="space-y-6 mt-4">
  {[
    {
      title: 'Standalone HTML Dashboard',
      description:
        'A single .html file that can be opened directly in any browser with no server or dependencies...',
    },
    {
      title: '2-Page Findings Memo',
      description:
        'A written document (PDF, DOCX, or Markdown) summarizing what you found...',
    },
  ].map((item, i) => (
    <li key={item.title} className="flex gap-4 items-start">
      <span className="w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
        {i + 1}
      </span>
      <div>
        <p className="font-semibold text-crowe-indigo-dark">{item.title}</p>
        <p className="text-tint-700 mt-1 leading-relaxed">{item.description}</p>
      </div>
    </li>
  ))}
</ol>
```

Note: `mt-0.5` on the badge vertically aligns the circle with the first line of text when the description wraps.

### Pattern 6: Custom Bullet Lists

**What:** `ul` list items with an amber dash prefix using Tailwind's `before:` pseudo-element.
**When to use:** "Tools You Should Use" and "What You Do NOT Need to Do" sections (4 items each).

```tsx
<ul className="space-y-2 mt-4">
  {items.map((item) => (
    <li key={item} className="flex gap-2 text-tint-700 leading-relaxed">
      <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">—</span>
      <span>{item}</span>
    </li>
  ))}
</ul>
```

This is cleaner than `before:content-['—']` (pseudo-elements don't need DOM manipulation) and matches the CONTEXT.md suggestion. The `flex-shrink-0` on the dash prevents it from collapsing when text wraps.

### Pattern 7: Page Title Block

**What:** Large `h1` at the top with a subtitle, establishing the page before sections begin.
**When to use:** Top of the content column.

```tsx
<div className="mb-10 sm:mb-12">
  <h1 className="text-4xl font-bold text-crowe-indigo-dark">Instructions</h1>
  <p className="text-tint-700 mt-2 text-lg">Case Brief</p>
</div>
```

Claude's discretion: no indigo background band on the title — warm off-white page background is sufficient. The indigo band is reserved for hero/CTA sections (Phase 3 pattern).

### Anti-Patterns to Avoid

- **`'use client'`:** Not needed — zero interactivity. Adding it degrades SSR performance for no gain.
- **`shadcn Card` for sections:** Extra DOM nesting obscures the semantic section hierarchy. Tailwind direct is correct here.
- **`prose` Tailwind plugin:** Not installed and not needed. Direct utility classes give exact control.
- **Full-bleed negative-margin breakout (`-mx-4 sm:-mx-6 lg:-mx-8`):** Only for sections that need to break out of the layout container (hero/key-dates). The instructions page stays in its column.
- **`<hr>` horizontal rules:** Per CLAUDE.md anti-patterns — use whitespace + section background changes instead. Spacing between sections (`mt-10 sm:mt-12` before each `h2`) provides visual separation.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Amber left-border heading | Custom CSS class | `border-l-4 border-crowe-amber pl-4` Tailwind utility combo | Already in config; 3 classes, done |
| Amber-wash callout | New component | Inline Tailwind on a `<div>` | Single use; no abstraction needed |
| Numbered badge | SVG or image | Tailwind `rounded-full bg-crowe-indigo-dark` span | Pure CSS, no assets |
| Custom bullet | SVG dash icon | Hardcoded `—` span with `text-crowe-amber` | Zero overhead |

**Key insight:** Everything in this phase is presentational Tailwind composition. No new abstractions, no new components, no new dependencies.

---

## Common Pitfalls

### Pitfall 1: Forgetting `flex-shrink-0` on Badge and Dash

**What goes wrong:** On narrow screens or when text wraps, the circular badge or amber dash compresses, breaking the layout.
**Why it happens:** Flex children shrink by default.
**How to avoid:** Always add `flex-shrink-0` to the badge span and the dash span.
**Warning signs:** Badge becomes oval or dash disappears at mobile widths.

### Pitfall 2: Using `bg-section-amber` vs `bg-[#fff8eb]`

**What goes wrong:** The CONTEXT.md spec uses the arbitrary value `bg-[#fff8eb]` literally. `bg-section-amber` resolves to the same hex but uses a different Tailwind class name.
**Why it happens:** Both work; the spec was written before double-checking the configured token name.
**How to avoid:** Use `bg-section-amber` (the configured token) — cleaner, avoids arbitrary value scanning in purge. Verify it equals `#fff8eb` (confirmed in `tailwind.config.ts` line 47: `'section-amber': '#fff8eb'`).

### Pitfall 3: Vertical Alignment of Badge with Multi-Line Text

**What goes wrong:** The circular number badge aligns to the center of the entire text block when the description wraps multiple lines, making it look disconnected from the item title.
**Why it happens:** `items-start` aligns to the flex start but the badge needs a small top offset to optically align with the first text line.
**How to avoid:** Add `mt-0.5` to the badge span (2px nudge down). Use `items-start` on the `li`, not `items-center`.

### Pitfall 4: Apostrophes and Special Characters in JSX

**What goes wrong:** Verbatim content contains `—` (em dash), `'` (curly apostrophe), and backticks inside strings. Raw characters in JSX cause lint errors or render issues.
**Why it happens:** JSX string literals don't support HTML entities; apostrophes in text strings need escaping.
**How to avoid:** In JSX text nodes, use `&apos;` or the curly-brace string escape for apostrophes: `{'it\'s'}` or just `it&apos;s`. Em dashes `—` render fine as Unicode in JSX strings. Backtick-wrapped filenames like `` `transactions.csv` `` should use `<code>` tags or plain text with backticks as Unicode characters (not template literals).

### Pitfall 5: Section Spacing Inconsistency

**What goes wrong:** Sections feel cramped or unevenly spaced if spacing tokens are applied inconsistently.
**Why it happens:** Mixing `mt-8`, `mt-10`, `mt-12` without a consistent system.
**How to avoid:** Establish one pattern: `mt-10 sm:mt-12` before each `h2` heading (following the 8px grid from CLAUDE.md). `mt-4` for body content immediately after a heading. `space-y-2` for bullet list items, `space-y-6` for deliverable items.

---

## Code Examples

### Complete Page Skeleton (verified against layout.tsx and tailwind.config.ts)

```tsx
// src/app/instructions/page.tsx
// Server Component — no 'use client'

export default function InstructionsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">

      {/* Page Title */}
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Instructions</h1>
        <p className="text-tint-700 mt-2 text-lg">Case Brief</p>
      </div>

      {/* Background */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Background
        </h2>
        <p className="mt-4 text-tint-700 leading-relaxed">
          You are working with a fictional financial institution called Meridian Financial...
        </p>
      </section>

      {/* Your Dataset */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Your Dataset
        </h2>
        <p className="mt-4 text-tint-700 leading-relaxed">
          You&apos;ve been provided with a synthetic dataset...
        </p>
      </section>

      {/* Your Deliverables */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Your Deliverables
        </h2>
        <ol className="space-y-6 mt-4">
          <li className="flex gap-4 items-start">
            <span className="w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            <div>
              <p className="font-semibold text-crowe-indigo-dark">Standalone HTML Dashboard</p>
              <p className="text-tint-700 mt-1 leading-relaxed">
                A single .html file that can be opened directly...
              </p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <span className="w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            <div>
              <p className="font-semibold text-crowe-indigo-dark">2-Page Findings Memo</p>
              <p className="text-tint-700 mt-1 leading-relaxed">
                A written document (PDF, DOCX, or Markdown)...
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Tools You Should Use */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Tools You Should Use
        </h2>
        <ul className="space-y-2 mt-4">
          {[
            'VS Code (code editor)',
            'Cursor or GitHub Copilot (AI coding assistant)',
            'ChatGPT, Claude, or any LLM (for ideation, narrative writing, code generation)',
            'Any free, publicly accessible UI libraries or chart libraries you find',
          ].map((item) => (
            <li key={item} className="flex gap-2 text-tint-700 leading-relaxed">
              <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What You Do NOT Need to Do */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          What You Do NOT Need to Do
        </h2>
        <ul className="space-y-2 mt-4">
          {[
            'Build a machine learning model — anomalies are already labeled',
            'Deploy anything to a server',
            'Follow any specific branding guidelines',
            'Use any particular framework — plain HTML/CSS/JS is perfectly valid',
          ].map((item) => (
            <li key={item} className="flex gap-2 text-tint-700 leading-relaxed">
              <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Guidance Callout — INST-05 */}
      <div className="bg-section-amber border-l-4 border-crowe-amber rounded-r-lg px-6 py-5 mt-10 sm:mt-12">
        <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
          Guidance
        </p>
        <p className="italic text-tint-900 leading-relaxed">
          The end deliverables are clear. How you get there is entirely up to you...
        </p>
      </div>

    </div>
  );
}
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest + React Testing Library (jsdom) |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `npx vitest run src/__tests__/InstructionsPage.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INST-01 | "Background" heading and paragraph rendered | unit | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | Wave 0 |
| INST-02 | "Your Dataset" heading and paragraph rendered | unit | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | Wave 0 |
| INST-03 | "Your Deliverables" heading + 2 numbered items rendered | unit | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | Wave 0 |
| INST-04 | "Tools You Should Use" and "What You Do NOT Need to Do" headings + list items rendered | unit | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | Wave 0 |
| INST-05 | "Guidance" label and quote text rendered inside callout | unit | `npx vitest run src/__tests__/InstructionsPage.test.tsx` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run src/__tests__/InstructionsPage.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Test Patterns (from established Phase 2/3 precedent)

The InstructionsPage is a Server Component with no mocks required (no Next.js router hooks, no animation components, no iconsax icons). The test file is the simplest in the project:

```tsx
// src/__tests__/InstructionsPage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InstructionsPage from '@/app/instructions/page';

describe('InstructionsPage', () => {
  // INST-01
  it('renders Background section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Background' })).toBeInTheDocument();
  });

  it('renders Background paragraph text', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/Meridian Financial/)).toBeInTheDocument();
    expect(screen.getByText(/compliance team/i)).toBeInTheDocument();
  });

  // INST-02
  it('renders Your Dataset section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Your Dataset' })).toBeInTheDocument();
  });

  it('renders Your Dataset paragraph text', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/transactions\.csv/i)).toBeInTheDocument();
  });

  // INST-03
  it('renders Your Deliverables section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Your Deliverables' })).toBeInTheDocument();
  });

  it('renders both numbered deliverable items', () => {
    render(<InstructionsPage />);
    expect(screen.getByText('Standalone HTML Dashboard')).toBeInTheDocument();
    expect(screen.getByText('2-Page Findings Memo')).toBeInTheDocument();
  });

  it('renders indigo number badges 1 and 2', () => {
    render(<InstructionsPage />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  // INST-04
  it('renders Tools You Should Use section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Tools You Should Use' })).toBeInTheDocument();
  });

  it('renders Tools list items', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/VS Code/)).toBeInTheDocument();
    expect(screen.getByText(/Cursor or GitHub Copilot/)).toBeInTheDocument();
  });

  it('renders What You Do NOT Need to Do section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'What You Do NOT Need to Do' })).toBeInTheDocument();
  });

  it('renders Not-needed list items', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/machine learning model/i)).toBeInTheDocument();
    expect(screen.getByText(/Deploy anything/i)).toBeInTheDocument();
  });

  // INST-05
  it('renders Guidance callout label', () => {
    render(<InstructionsPage />);
    expect(screen.getByText('GUIDANCE')).toBeInTheDocument();
  });

  it('renders Guidance quote text', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/end deliverables are clear/i)).toBeInTheDocument();
    expect(screen.getByText(/use AI aggressively/i)).toBeInTheDocument();
  });
});
```

**Note on "GUIDANCE" vs "Guidance" test:** The callout label uses Tailwind `uppercase` class which transforms visually but the DOM text remains "Guidance". Use `screen.getByText('Guidance')` in the actual test — not 'GUIDANCE'. The `uppercase` class is a CSS transform; `getByText` reads the DOM text node, not the computed style.

### Wave 0 Gaps

- [ ] `src/__tests__/InstructionsPage.test.tsx` — covers INST-01 through INST-05 (does not exist yet; create in Wave 0)

*(No framework gaps — Vitest + RTL + jsdom + jest-dom matchers all installed. No new mocks needed for a Server Component with no external dependencies.)*

---

## Layout Integration Analysis

### Layout.tsx Chain (verified)

```
<html>
  <body class="bg-page">           ← #f8f9fc warm off-white page bg
    <Navbar />                     ← fixed, z-50, full-width
    <div class="pt-16">            ← navbar height offset
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}                 ← InstructionsPage renders here
      </main>
    </div>
  </body>
</html>
```

### InstructionsPage.tsx Column

```
<div class="max-w-3xl mx-auto py-12 sm:py-16">
  ...content...
</div>
```

**Computed layout at 1280px viewport:**
- `max-w-7xl` = 1280px outer bound with `px-8` (32px each side) = 1216px usable
- `max-w-3xl mx-auto` = 768px centered = 224px whitespace on each side
- Result: well-centered, comfortable 48-character approximate line length at 16px body text

**No conflict.** No negative margins needed. The `py-12 sm:py-16` (48px/64px) on the column handles top/bottom breathing room within the layout's existing vertical flow.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `prose` Tailwind plugin for long-form content | Direct Tailwind utilities | Project standard (Phase 1) | Full control over every element; no plugin overhead |
| Default export React component | Named export function | Project standard (Phase 3 — `HomePage` uses default; convention is `export default function PageName`) | `export default function` is correct for Next.js page files |

**Deprecated/outdated:**
- Nothing to flag for this phase. The tech is stable.

---

## Open Questions

1. **"Guidance" label: uppercase CSS vs DOM text**
   - What we know: Tailwind `uppercase` transforms CSS visually; DOM text stays "Guidance"
   - What's unclear: Whether test should use `screen.getByText('Guidance')` or `screen.getByText(/guidance/i)`
   - Recommendation: Use `screen.getByText('Guidance')` — exact DOM text match. The `uppercase` visual is a CSS concern only.

2. **`bg-section-amber` vs `bg-[#fff8eb]` for callout**
   - What we know: `bg-section-amber` is configured in `tailwind.config.ts` as `backgroundColor['section-amber']: '#fff8eb'` — identical hex to the CONTEXT.md arbitrary value
   - What's unclear: The CONTEXT.md spec uses `bg-[#fff8eb]` literally — should the planner use the token or the arbitrary value?
   - Recommendation: Use `bg-section-amber` (the token). It's cleaner, consistent with `bg-page` and `bg-section-warm` elsewhere, and avoids arbitrary-value scanning in CSS purge. The planner should note this preference in the plan.

---

## Sources

### Primary (HIGH confidence)
- `src/app/layout.tsx` — confirmed layout wrapping structure, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, `pt-16` offset
- `tailwind.config.ts` — confirmed all tokens: `crowe-amber`, `crowe-indigo-dark`, `tint-700`, `tint-900`, `bg-section-amber`, `shadow-crowe-card`, `shadow-amber-glow`
- `AGENT_PLAN.md` — verbatim content for all 6 sections extracted
- `src/app/page.tsx` — confirmed `bg-[#fff8eb]`/`bg-section-amber` pattern in key-dates section; confirmed full-bleed `-mx-4 sm:-mx-6 lg:-mx-8` is NOT needed for content-column pages
- `src/__tests__/HomePage.test.tsx` — established RTL test pattern (render + screen queries, no router mocks needed for pages without navigation hooks)
- `vitest.config.ts` — confirmed `jsdom` environment, `setupFiles: ['./src/__tests__/setup.ts']`, `@/*` alias to `./src`
- `.planning/phases/04-instructions-page/04-CONTEXT.md` — locked styling decisions

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` — confirmed `'use client'` is NOT present on the stub; project convention is Server Component by default for pages without interactivity

---

## Metadata

**Confidence breakdown:**
- Verbatim content: HIGH — extracted directly from AGENT_PLAN.md
- Layout integration: HIGH — verified against actual layout.tsx and tailwind.config.ts
- Tailwind tokens: HIGH — verified in tailwind.config.ts
- Test patterns: HIGH — established in Phase 2/3, no new mocks needed for Server Component
- Styling patterns: HIGH — cross-referenced with Phase 3 page.tsx implementations

**Research date:** 2026-03-04
**Valid until:** 2026-06-04 (stable stack — Next.js, Tailwind v3, Vitest; no fast-moving dependencies)
