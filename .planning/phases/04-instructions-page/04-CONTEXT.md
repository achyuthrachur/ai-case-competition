# Phase 4: Instructions Page - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the Instructions page (`src/app/instructions/page.tsx`) that renders the full case brief as clean, readable long-form content. Content is fully specified in AGENT_PLAN.md — this phase is about presentation, not content authoring. Replaces the current stub page.

</domain>

<decisions>
## Implementation Decisions

### Reading Width & Layout
- **Narrow reading column** — use `max-w-3xl mx-auto` (768px) for the content area, centered within the page
- The full `max-w-7xl` layout container from `layout.tsx` is the outer bound; the content column is narrower for comfortable line length
- Generous vertical padding (`py-12 sm:py-16`) between sections for breathing room
- Page title ("Instructions") as a large `h1` in `text-crowe-indigo-dark` at the top of the column

### Section Heading Treatment
- **Indigo `h2` with amber left-border accent** — each of the 5 section headings gets a `border-l-4 border-crowe-amber pl-4` treatment
- Heading text: `text-2xl font-bold text-crowe-indigo-dark`
- Creates visual rhythm and ties back to the amber active-state established in the navbar
- Section headings: "Background", "Your Dataset", "Your Deliverables", "Tools You Should Use", "What You Do NOT Need to Do"

### Guidance Callout Style
- **Amber-bordered callout panel** — distinct from the body text
- Styling: `bg-[#fff8eb] border-l-4 border-crowe-amber rounded-r-lg px-6 py-5`
- Small label above the quote: "Guidance" in `text-sm font-semibold text-crowe-amber uppercase tracking-wide`
- Quote text: italic, `text-tint-900`, standard body size
- Rationale: Reuses the amber-wash pattern established in the key dates section (Phase 3) — consistent brand language for "notable/important" content

### Numbered Deliverables Style
- **Styled `ol` with prominent numbered items** — each deliverable gets a large indigo number badge
- Number badge: `w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0`
- Item layout: flex row with badge left, content right (`gap-4 items-start`)
- Item title in bold (`font-semibold text-crowe-indigo-dark`), description as normal body text below
- Two items:
  1. **Standalone HTML Dashboard** — description from AGENT_PLAN.md
  2. **2-Page Findings Memo** — description from AGENT_PLAN.md

### Content (Locked — from AGENT_PLAN.md)
Full verbatim content for all 6 sections is specified in AGENT_PLAN.md under `/instructions — Case Brief`. The implementation must render this content exactly as written. No paraphrasing.

### Page Structure (top to bottom, all within `max-w-3xl mx-auto`)
1. Page heading: `h1` "Instructions" + subtitle "Case Brief"
2. Background section: `h2` + paragraph
3. Your Dataset section: `h2` + paragraph
4. Your Deliverables section: `h2` + styled numbered list (2 items)
5. Tools You Should Use section: `h2` + bullet list
6. What You Do NOT Need to Do section: `h2` + bullet list
7. Guidance section: amber callout panel (full content from AGENT_PLAN.md)

### Bullet Lists (Tools / What You Don't Need)
- Standard `ul` with custom bullet: `list-none` + each `li` has a small amber dash or indigo dot prefix (`before:content-['—'] before:text-crowe-amber before:mr-2`) or simple Tailwind `list-disc` styled in amber
- Claude's discretion on exact bullet style

### Claude's Discretion
- Exact spacing between sections (follow 8px grid from CLAUDE.md)
- Whether to add a subtle horizontal rule or just rely on spacing + heading to separate sections
- Exact `prose` width (max-w-3xl vs max-w-2xl — use whichever reads better at 16px body text)
- Whether page title section gets a subtle indigo background band or just warm off-white

</decisions>

<specifics>
## Specific Ideas

- Guidance callout pattern (`bg-[#fff8eb] border-l-4 border-crowe-amber`) mirrors the key dates section from Phase 3 — consistent use of amber-wash for "highlighted info"
- The amber left-border on headings mirrors the amber active underline on nav links — same brand accent color used across the app
- No decorative images or illustrations — content only, clean and readable

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `cn()` from `src/lib/utils.ts` — for conditional class merging
- shadcn `Card` (`src/components/ui/card.tsx`) — available but likely not needed; sections are styled with Tailwind directly for reading-optimized prose
- No existing prose/typography component — styled inline with Tailwind

### Established Patterns
- `bg-[#fff8eb]` amber-wash (used for key dates in Phase 3) — reuse for Guidance callout
- `text-crowe-indigo-dark` for headings, `text-tint-700` for body text, `text-tint-900` for important body text
- Named exports, no `'use client'` needed (no state or hooks — purely static content)
- Full-width page sections that break out of layout use `-mx-4 sm:-mx-6 lg:-mx-8` (established in Phase 3); instructions page doesn't need this — content stays in the narrow column

### Integration Points
- `src/app/instructions/page.tsx` — replace the current 6-line stub
- Root layout already provides `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` and `pt-16` navbar offset — no extra wrapper needed
- Navbar "Instructions" link already active-highlights on this route (established in Phase 2)

</code_context>

<deferred>
## Deferred Ideas

- Table of contents for quick section navigation — noted in REQUIREMENTS.md v2 (UX-02), intentionally out of scope for v1

</deferred>

---

*Phase: 04-instructions-page*
*Context gathered: 2026-03-04*
