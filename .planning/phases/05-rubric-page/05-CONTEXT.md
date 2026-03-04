# Phase 5: Rubric Page - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the Rubric page (`src/app/rubric/page.tsx`) that displays the grading rubric as four scored category cards with visual weight indicators and a Grading Notes callout block. Replaces the current stub page. Content is fully specified in AGENT_PLAN.md — this phase is about presentation. Requirements: RUB-01, RUB-02, RUB-03.

</domain>

<decisions>
## Implementation Decisions

### Category Card Layout
- **2×2 grid of cards** — 2 across on desktop (`grid-cols-2`), single column on mobile (`grid-cols-1`)
- Each of the 4 categories gets its own card: Data Analysis Depth (40%), Dashboard UI Quality (35%), Memo Quality (15%), Extra Credit (up to 15%)
- Cards use the established white-card-on-warm-bg pattern: `bg-white shadow-crowe-card rounded-xl`
- All 4 Extra Credit card is the same style as other categories — no visual distinction

### Visual Weight Indicator (Fill Bar)
- **Percentage text + fill bar** — both shown, not bar alone
- **Literal fill:** bar fills to the exact percentage (40% → 40% fill, 35% → 35% fill, 15% → 15% fill)
- **Color:** Indigo (`bg-crowe-indigo-dark`) fill bar on a light indigo-tinted track (`bg-tint-100` or `bg-tint-200`)
- **Position:** Below the category title, above the description text — layout per card:
  1. Category title (`h3`, bold, `text-crowe-indigo-dark`)
  2. Percentage text + fill bar (indigo, literal fill)
  3. "What We're Looking For" description paragraph

### Grading Notes Callout
- Reuse the established amber-wash callout pattern from Phase 4 (Instructions page Guidance block)
- Styling: `bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5`
- Label above the text: "Grading Notes" in `text-sm font-semibold text-crowe-amber uppercase tracking-wide`
- Quote text: italic, `text-tint-900`, standard body size
- Content (verbatim from AGENT_PLAN.md): *"Grading is field-and-feel based. There is no formula. We're looking for evidence of critical thinking, intentional design decisions, and genuine engagement with the data — not just the volume of output."*

### Page Layout
- Same narrow reading column as Instructions page: `max-w-3xl mx-auto py-12 sm:py-16`
- Page title block at top: `h1` "Rubric" + subtitle "Grading Criteria"
- Section order (top to bottom):
  1. Page title block
  2. 2×2 category card grid
  3. Grading Notes callout block

### Content (Locked — from AGENT_PLAN.md)
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

</decisions>

<specifics>
## Specific Ideas

- The amber left-border heading pattern from Instructions (`border-l-4 border-crowe-amber pl-4`) is established — use it for the page-level `h1` or a section subheading if needed
- The Grading Notes callout is identical in style to the Phase 4 "Guidance" callout — same amber-wash, same left-border, same label treatment. Consistent brand language for "important/notable" content.
- AGENT_PLAN.md describes it as "card or table layout with visual score indicators" — card layout with fill bar satisfies this spec

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/card.tsx` — shadcn Card primitives (Card, CardHeader, CardContent, CardTitle). Available but likely styled with Tailwind directly for full control (same approach as Instructions page sections)
- `cn()` from `src/lib/utils.ts` — for conditional class merging
- No existing progress/fill bar component — implement inline with Tailwind `w-[40%]` style

### Established Patterns
- Named exports, no `'use client'` — pure Server Component (no state/hooks needed, static content)
- `max-w-3xl mx-auto py-12 sm:py-16` — reading page layout (Instructions page)
- `bg-white shadow-crowe-card rounded-xl` — floating card style (home page quick-link cards)
- `bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5` — amber-wash callout (Instructions page Guidance block)
- `text-crowe-indigo-dark` for headings, `text-tint-700` for body text
- `bg-page` (#f8f9fc) as page background (inherited from root layout)

### Integration Points
- `src/app/rubric/page.tsx` — replace the current 6-line stub
- Root layout provides `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container and `pt-16` navbar offset — no extra wrapper needed
- Navbar "Rubric" link already active-highlights on this route (Phase 2)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-rubric-page*
*Context gathered: 2026-03-04*
