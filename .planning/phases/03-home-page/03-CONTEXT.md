# Phase 3: Home Page - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the landing page (`src/app/page.tsx`) that communicates the competition at a glance and routes participants to the right section immediately. Delivers: animated hero with BlurText headline, competition blurb, four 21st.dev quick-link cards, and a key dates section. No other pages are touched — this phase replaces the existing stub home page only.

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **Background:** Dark indigo (`bg-crowe-indigo-dark`, #011E41) — full-width band, matches the navbar's visual weight and establishes it as a brand surface
- **Height:** ~50vh (`min-h-[50vh]`) — medium height, headline + blurb visible above the fold with breathing room
- **Alignment:** Centered horizontally and vertically (`flex items-center justify-center text-center`)
- **Decorative element:** Amber accent bar below the headline — short horizontal line (`w-16 h-1 bg-crowe-amber rounded-full mx-auto`) between the headline and blurb
- **Text colors:** Headline in soft white (`#f6f7fa`), blurb in `text-[#f6f7fa]/80` (slightly muted)

### BlurText Animation
- **Unit:** Word-by-word (`animateBy="words"`)
- **Direction:** Top-down (`direction="top"`)
- **Speed:** Fast and crisp — `delay={0.25}` seconds per word (professional, snappy)
- **Blurb animation:** Simple CSS opacity fade-in triggered after the headline completes (`onAnimationComplete` callback sets state → `transition-opacity duration-300`)
- **Blurb appears statically at opacity-0, transitions to opacity-100 after last word animates**

### Quick-Link Cards
- **Content:** Icon + title + short 1-line description per card
- **Card descriptions:**
  - Instructions → "Read the case brief and rules"
  - Rubric → "See how your work will be scored"
  - Downloads → "Get the dataset and reference files"
  - Submit → "Upload your dashboard and memo"
- **Layout:** 4-across row on desktop (`grid-cols-4`), 2×2 on tablet (`sm:grid-cols-2`), single column on mobile (`grid-cols-1`)
- **Hover effect:** Lift 4px (`hover:-translate-y-1`) + amber glow shadow (`hover:shadow-amber-glow`) — uses existing Tailwind token from `tailwind.config.ts`
- **Icon style:** 48px Iconsax Bold variant in `text-crowe-indigo-dark` — no background circle
- **Card background:** White on the warm off-white section (`bg-white shadow-crowe-card rounded-xl`)
- **Section background:** Warm off-white (`bg-page`) between hero and key dates
- **Icons per card:**
  - Instructions → Iconsax `Document` (Bold)
  - Rubric → Iconsax `Judge` (Bold)
  - Downloads → Iconsax `FolderOpen` (Bold)
  - Submit → Iconsax `Send` (Bold)

### Key Dates Section
- **Prominence:** Its own full-width section with amber-wash background (`bg-[#fff8eb]`) — distinct from card section above
- **Display:** Calendar icon + label + value per date entry
  - `Iconsax Calendar (Linear)` + "Competition Opens" + "TBD"
  - `Iconsax Calendar (Linear)` + "Submission Deadline" + "TBD"
- **Layout:** Two date entries side by side on desktop (`flex gap-12 justify-center`), stacked on mobile
- **Section heading:** Optional subtle heading ("Key Dates") in `text-crowe-indigo-dark`

### Page Structure (top to bottom)
1. **Hero** — dark indigo, ~50vh, BlurText headline + amber bar + fading blurb
2. **Cards section** — warm off-white bg, `py-16`, 4-across grid of quick-link cards
3. **Key dates section** — amber-wash bg, `py-12`, 2 date entries with calendar icons

### Claude's Discretion
- Exact padding/spacing within sections (follow CLAUDE.md 8px grid)
- Card transition duration for hover (likely `transition-all duration-200`)
- Whether to add a subtle section divider or rely on background color change between sections
- Exact font sizes for card title vs description (use Tailwind type scale from CLAUDE.md)
- Whether the section heading "Key Dates" is `text-xl` or `text-2xl`

</decisions>

<specifics>
## Specific Ideas

- AGENT_PLAN.md blurb text: *"You've been given access to a transaction dataset from Meridian Financial. Your challenge: use AI tools to build a dashboard that surfaces anomalies, uncovers patterns, and tells a story about what's happening in these accounts."*
- Cards should feel like navigational signposts — utility first, not decorative
- Amber glow on hover (`shadow-amber-glow` = `0 4px 16px rgba(245,168,0,0.20)`) already defined in `tailwind.config.ts`
- The amber accent bar in the hero visually connects the hero to the amber active-state established in the navbar

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/blur-text.tsx` — GSAP BlurText, props: `text`, `delay`, `animateBy`, `direction`, `onAnimationComplete`, `className`. Already tested in Phase 1 smoke test. Import: `import { BlurText } from '@/components/ui/blur-text'`
- `src/components/ui/card.tsx` — shadcn Card primitives (Card, CardHeader, CardContent, CardTitle). May use as base or style from scratch with Tailwind for full control.
- `src/components/ui/button.tsx` — shadcn Button. Not needed for cards (cards are `<Link>` wrappers).
- `cn()` utility at `src/lib/utils.ts` — for conditional class merging

### Established Patterns
- Named exports, `'use client'` only when state/hooks needed (BlurText requires it — uses `useState` for `onAnimationComplete` callback)
- `bg-crowe-indigo-dark` for brand surfaces, `text-crowe-amber` for accents, `shadow-crowe-card` for floating cards
- `bg-page` (#f8f9fc) as the standard page/section background between brand surfaces
- Iconsax: `Bold` variant for prominent/active icons, `Linear` for secondary (calendars, decorative)

### Integration Points
- `src/app/page.tsx` — this is the file being replaced. Currently a 10-line stub.
- The page inherits the root layout (`Navbar` + `pt-16` content offset) — no need to re-add navbar or padding
- All 4 card routes already exist as stubs (`/instructions`, `/rubric`, `/downloads`, `/submit`) — cards link directly to them via Next.js `<Link>`
- `next/link` already used in Navbar; same import pattern applies here

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-home-page*
*Context gathered: 2026-03-04*
