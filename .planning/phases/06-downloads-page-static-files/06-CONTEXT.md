# Phase 6: Downloads Page + Static Files - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the Downloads page (`src/app/downloads/page.tsx`) with three styled download cards — one each for `transactions.csv`, `data_dictionary.md`, and `setup_guide.md` — and create the two static markdown files with full content. Replaces the current stub page. Requirements: DL-01, DL-02, DL-03, DL-04, STATIC-01, STATIC-02.

</domain>

<decisions>
## Implementation Decisions

### Card Grid Layout
- **Row of 3 across on desktop** — `grid-cols-3` on desktop, collapsing to `grid-cols-1` on mobile
- Cards use the established pattern: `bg-white shadow-crowe-card rounded-xl`
- Same card visual treatment as home page quick-link cards — consistent brand language
- Each card: file name (heading), description text, approximate file size, download button with Iconsax `DocumentDownload` icon

### transactions.csv Placeholder Behavior
- **Wire it up now, Phase 7 drops the file in** — the CSV download link points to `/transactions.csv` from the start
- No "coming soon" state, no disabled button — just link it and let Phase 7 create the file
- The card shows the correct metadata (name, description, ~150 KB size per AGENT_PLAN.md spec)

### data_dictionary.md Content
- **Full column reference** — all 12 columns with name, type, description, and example values
- Columns to document (from REQUIREMENTS.md DATA-02): `transaction_id`, `transaction_date`, `account_id`, `account_name`, `transaction_type`, `amount`, `counterparty_name`, `counterparty_country`, `historical_avg_amount`, `monthly_transaction_count`, `is_anomalous`, `anomaly_notes`
- Include: column name, data type, plain-English description, example value for each column
- Format: Markdown table or definition list — readable without rendering

### setup_guide.md Content
- **Step-by-step VS Code + Cursor setup** — practical beginner guide
- Cover: installing VS Code, installing Cursor, recommended extensions for CSV/data work, how to open and inspect the CSV file
- Keep it actionable — numbered steps, not walls of text

### Download Mechanism
- All three files served from `/public` via `<a href="/filename" download>` — browser native download (per DL-04)
- No JavaScript needed — pure anchor tags

### Component Structure
- AGENT_PLAN.md specifies a `DownloadCard.tsx` component — create it at `src/components/DownloadCard.tsx`
- Props: `fileName`, `description`, `fileSize`, `href`
- Page renders 3 instances of DownloadCard with the Iconsax `DocumentDownload` icon

### Claude's Discretion
- Exact card padding and spacing (follow 8px grid from CLAUDE.md)
- Whether to add a page-level intro sentence above the cards
- Download button style (likely `bg-crowe-indigo-dark text-white` button matching Iconsax Bold icon)
- Exact section heading treatment (may or may not need a subheading above the card grid)

</decisions>

<specifics>
## Specific Ideas

- Card content from AGENT_PLAN.md (locked):
  - Card 1 — `transactions.csv`: "Synthetic transaction records for Meridian Financial. ~500–1,000 rows. Anomalies pre-labeled." / ~150 KB
  - Card 2 — `data_dictionary.md`: "Plain-language description of every column in the dataset." / < 5 KB
  - Card 3 — `setup_guide.md`: "Step-by-step instructions for setting up VS Code and Cursor before you start." / < 5 KB
- Note: REQUIREMENTS.md targets 50k–100k rows for the actual dataset (Phase 7), but AGENT_PLAN.md shows ~150 KB / ~800 rows for the card display — use AGENT_PLAN.md card content as-is; Phase 7 will produce the actual file

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/card.tsx` — shadcn Card primitives available, but likely style DownloadCard from scratch with Tailwind for full control (same approach as home page and rubric)
- `src/components/ui/button.tsx` — shadcn Button; could use for the download button inside DownloadCard
- `cn()` from `src/lib/utils.ts` — conditional class merging

### Established Patterns
- Named exports, no `'use client'` — pure Server Component (static content, no interactivity)
- `max-w-3xl mx-auto py-12 sm:py-16` — reading page layout (Instructions, Rubric pages)
- `bg-white shadow-crowe-card rounded-xl` — floating card style (home page, rubric)
- `bg-crowe-indigo-dark text-white` — primary action button style
- Iconsax: `Bold` variant for action icons (DocumentDownload)
- `bg-page` (#f8f9fc) as page background (inherited from root layout)

### Integration Points
- `src/app/downloads/page.tsx` — replace the current 7-line stub
- Root layout provides `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container + `pt-16` navbar offset — no extra wrapper needed
- Navbar "Downloads" link (`href: '/downloads'`, Icon: `FolderOpen`) already wired — active-highlights on this route
- `public/` directory — `data_dictionary.md` and `setup_guide.md` go here; `transactions.csv` will be dropped in by Phase 7

</code_context>

<deferred>
## Deferred Ideas

- "Download All" zip bundle — noted in REQUIREMENTS.md v2 as UX-03; out of scope for v1

</deferred>

---

*Phase: 06-downloads-page-static-files*
*Context gathered: 2026-03-04*
