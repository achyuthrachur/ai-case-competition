# Phase 6: Downloads Page + Static Files - Research

**Researched:** 2026-03-04
**Domain:** Next.js Server Component, static file serving via /public, Iconsax icons, Crowe brand card pattern
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Card grid layout:** `grid-cols-3` on desktop, `grid-cols-1` on mobile. Cards use `bg-white shadow-crowe-card rounded-xl` — same as home page quick-link cards.
- **Card anatomy:** file name (heading), description text, approximate file size, download button with Iconsax `DocumentDownload` icon.
- **transactions.csv placeholder behavior:** Link points to `/transactions.csv` from the start; no disabled state; Phase 7 drops the file in later.
- **data_dictionary.md content:** Full column reference — all 12 columns with name, type, description, and example value. Markdown table format (readable without rendering).
- **setup_guide.md content:** Step-by-step VS Code + Cursor setup guide. Numbered steps, actionable, not walls of text.
- **Download mechanism:** `<a href="/filename" download>` — browser native download, no JavaScript required.
- **Component structure:** `DownloadCard.tsx` at `src/components/DownloadCard.tsx`. Props: `fileName`, `description`, `fileSize`, `href`. Page renders 3 instances.
- **Icon:** Iconsax `DocumentDownload` Bold variant on the download button.

### Claude's Discretion

- Exact card padding and spacing (follow 8px grid from CLAUDE.md)
- Whether to add a page-level intro sentence above the cards
- Download button style (likely `bg-crowe-indigo-dark text-white` matching established primary button pattern)
- Exact section heading treatment (may or may not need a subheading above the card grid)

### Deferred Ideas (OUT OF SCOPE)

- "Download All" zip bundle (REQUIREMENTS.md v2 UX-03 — deferred to v2)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DL-01 | Styled download card for `transactions.csv` (name, description, ~150 KB size, download button) | DownloadCard component pattern; static anchor with `download` attribute |
| DL-02 | Styled download card for `data_dictionary.md` (name, description, < 5 KB size, download button) | Same DownloadCard pattern |
| DL-03 | Styled download card for `setup_guide.md` (name, description, < 5 KB size, download button) | Same DownloadCard pattern |
| DL-04 | Each card uses Iconsax `DocumentDownload` icon; files served from `/public` via `<a href="..." download>` | Confirmed: iconsax-react installed; `DocumentDownload` is a valid export; `download` attribute on anchor triggers browser save |
| STATIC-01 | `public/data_dictionary.md` with full column descriptions per spec | Content fully specified in AGENT_PLAN.md — 12-column markdown table; ready to write verbatim |
| STATIC-02 | `public/setup_guide.md` with participant environment setup steps per spec | Content fully specified in AGENT_PLAN.md — 6-step guide; ready to write verbatim |
</phase_requirements>

---

## Summary

Phase 6 is a straightforward static-content phase. There are no new libraries to install, no client-side interactivity, and no data fetching. The work is: (1) replace the stub `downloads/page.tsx` with a Server Component that renders three `DownloadCard` instances in a responsive grid, (2) extract `DownloadCard.tsx` as a typed component, and (3) write two markdown files to `public/`. All patterns are already established in the codebase.

The download mechanism is a plain HTML anchor with the `download` attribute pointing to a `/public` path — no JavaScript, no API route, no streaming. Next.js serves files from `public/` as static assets at the root URL path by default. This is a known, HIGH-confidence behavior of Next.js.

The card visual pattern — `bg-white shadow-crowe-card rounded-xl` with `p-6` padding — is already proven on the Rubric page and the Home page quick-links. The `DownloadCard` component receives four string props and renders one consistent layout, making it trivially testable as a Server Component with no mocks needed.

**Primary recommendation:** Build `DownloadCard.tsx` as a named export Server Component (no `'use client'`), render three instances in `downloads/page.tsx`, and write the two markdown files to `public/` using verbatim content from AGENT_PLAN.md.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 14+ (already installed) | Server Component page rendering | Project foundation |
| Tailwind CSS | v3 (already installed) | Utility styling, responsive grid | Project foundation |
| iconsax-react | 0.0.8 (already installed) | `DocumentDownload` icon on download button | Established in all prior phases |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn `Button` (`src/components/ui/button.tsx`) | already present | Download button — use `asChild` with `<a>` | Consistent button variant behavior |
| `cn()` from `src/lib/utils.ts` | already present | Conditional class merging if needed | DownloadCard variant states |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plain `<a>` tag styled with Tailwind | shadcn Button with `asChild` | Both are valid; `asChild` allows Button styling on anchor semantics; plain `<a>` is simpler; either works since DL-04 just requires `<a href download>` |
| Writing markdown by hand | Copying verbatim from AGENT_PLAN.md | AGENT_PLAN.md has the exact content locked in — copy verbatim, no deviation needed |

**Installation:** No new installs required. All dependencies are already present.

---

## Architecture Patterns

### Recommended File Structure for This Phase

```
src/
├── app/
│   └── downloads/
│       └── page.tsx           # Replace stub — renders 3 DownloadCard instances
├── components/
│   └── DownloadCard.tsx       # New named-export Server Component
└── __tests__/
    └── DownloadsPage.test.tsx # New test file (mirrors RubricPage.test.tsx pattern)
public/
├── data_dictionary.md         # New static file (STATIC-01)
└── setup_guide.md             # New static file (STATIC-02)
```

### Pattern 1: DownloadCard Server Component

**What:** A typed functional component with no client-side hooks. Props define card content declaratively. The download button is an `<a>` tag styled as a button.

**When to use:** All three download cards share identical layout — extract once, reuse three times.

```tsx
// src/components/DownloadCard.tsx
// Source: established pattern from RubricPage and Navbar codebase
import { DocumentDownload } from 'iconsax-react';

interface DownloadCardProps {
  fileName: string;
  description: string;
  fileSize: string;
  href: string;
}

export function DownloadCard({ fileName, description, fileSize, href }: DownloadCardProps) {
  return (
    <div className="bg-white shadow-crowe-card rounded-xl p-6 flex flex-col gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-crowe-indigo-dark">{fileName}</h3>
        <p className="mt-2 text-sm text-tint-700 leading-relaxed">{description}</p>
        <p className="mt-3 text-xs text-tint-500 font-medium">{fileSize}</p>
      </div>
      <a
        href={href}
        download
        className="inline-flex items-center justify-center gap-2 rounded-md bg-crowe-indigo-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-crowe-indigo"
      >
        <DocumentDownload variant="Bold" size={18} />
        Download
      </a>
    </div>
  );
}
```

### Pattern 2: DownloadsPage — Three-Column Responsive Grid

**What:** Replace the 7-line stub with a Server Component matching the layout conventions of Instructions and Rubric pages.

**When to use:** Static page content, no interactivity required.

```tsx
// src/app/downloads/page.tsx
// Source: established pattern from rubric/page.tsx and instructions/page.tsx
import { DownloadCard } from '@/components/DownloadCard';

const DOWNLOAD_CARDS = [
  {
    fileName: 'transactions.csv',
    description: 'Synthetic transaction records for Meridian Financial. ~500–1,000 rows. Anomalies pre-labeled.',
    fileSize: '~150 KB',
    href: '/transactions.csv',
  },
  {
    fileName: 'data_dictionary.md',
    description: 'Plain-language description of every column in the dataset.',
    fileSize: '< 5 KB',
    href: '/data_dictionary.md',
  },
  {
    fileName: 'setup_guide.md',
    description: 'Step-by-step instructions for setting up VS Code and Cursor before you start.',
    fileSize: '< 5 KB',
    href: '/setup_guide.md',
  },
] as const;

export default function DownloadsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Downloads</h1>
        <p className="text-tint-700 mt-2 text-lg">Everything you need to get started</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {DOWNLOAD_CARDS.map((card) => (
          <DownloadCard key={card.fileName} {...card} />
        ))}
      </div>
    </div>
  );
}
```

### Pattern 3: Static Files in /public

**What:** Next.js serves any file in `public/` as a static asset at the root URL. A file at `public/data_dictionary.md` is accessible at `https://example.com/data_dictionary.md`.

**When to use:** All three download files. The `download` attribute on the anchor tag triggers browser save-dialog behavior instead of in-tab navigation.

**Key detail:** `transactions.csv` does NOT exist yet (Phase 7 creates it). The link `/transactions.csv` is wired now. The browser will receive a 404 until Phase 7 drops the file in — this is the accepted behavior per CONTEXT.md locked decision.

### Anti-Patterns to Avoid

- **Using `'use client'`:** DownloadCard has no interactivity — no state, no effects, no event handlers other than the native anchor `download` attribute. Adding `'use client'` adds unnecessary bundle weight.
- **Using `<button>` for downloads:** The `download` attribute is an HTML anchor attribute, not a button attribute. Wrap the button styling on an `<a>` element (either via Tailwind directly or via shadcn Button `asChild`).
- **Using `window.location` or `fetch` for downloads:** The `<a href download>` pattern is the locked decision and the correct approach — no JavaScript needed.
- **Importing Iconsax with wrong variant name:** Per STATE.md, `HambergerMenu` (not `HamburgerMenu`) is an intentional typo in iconsax-react 0.0.8. Verify `DocumentDownload` is the exact export name before writing the test.
- **Using `max-w-7xl` for the page container:** The root layout already provides the outer `max-w-7xl mx-auto` wrapper. The inner page content uses `max-w-3xl mx-auto` — consistent with Instructions and Rubric pages.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File download triggering | Custom JS download handler, fetch + blob URL | `<a href="/file.csv" download>` | HTML native; works across all browsers; zero JavaScript; no edge cases |
| Static file serving | Custom API route to stream files | Next.js `public/` directory | Next.js serves `public/` as CDN-cached static assets automatically |
| Icon | Custom SVG for download icon | `DocumentDownload` from `iconsax-react` | Already installed; Bold variant established for action icons |
| Responsive grid | Flexbox wrapping logic | Tailwind `grid grid-cols-1 sm:grid-cols-3 gap-6` | Established pattern; zero custom CSS |

**Key insight:** This phase is deliberately simple. The complexity ceiling is a 30-line component and two markdown files. Do not over-engineer.

---

## Common Pitfalls

### Pitfall 1: `download` Attribute Cross-Origin Restriction

**What goes wrong:** The HTML `download` attribute only triggers a file save dialog when the resource is **same-origin**. If the file URL is on a different domain (e.g., a CDN with a different origin), the browser navigates to the URL instead of downloading.

**Why it happens:** Browser security policy restricts the `download` attribute to same-origin resources.

**How to avoid:** All three files are served from `/public` — same origin as the Next.js app. No cross-origin issue. This is a non-issue for this phase.

**Warning signs:** If files were ever moved to Vercel Blob URLs (different origin), the `download` attribute would stop working and a server-side redirect or `Content-Disposition` header would be needed.

### Pitfall 2: Iconsax Export Name Verification

**What goes wrong:** Using `DocumentDownload` as the import name when the actual export name differs slightly in iconsax-react 0.0.8.

**Why it happens:** STATE.md already documents one iconsax typo (`HambergerMenu`). It is worth verifying `DocumentDownload` is the exact export before writing tests that assert on it.

**How to avoid:** The Navbar uses `import { ..., FolderOpen, ... } from 'iconsax-react'` successfully. Check the iconsax-react package exports or app.iconsax.io for `DocumentDownload` specifically. If unavailable, `DocumentDownload` from iconsax maps to a known icon — check the package directly.

**Warning signs:** TypeScript error on import at compile time.

### Pitfall 3: Test Collision on File Name Strings

**What goes wrong:** Three cards each display similar text patterns. Tests that use loose `getByText` matchers may match multiple elements.

**Why it happens:** `getByText('Download')` would match three elements (one per card) — the test would throw "Found multiple elements."

**How to avoid:** Per RubricPage pattern: use `getByRole('heading', { name: 'transactions.csv' })` to assert card headings uniquely. For the download link, use `getAllByRole('link', { name: /download/i })` and assert `toHaveLength(3)`. Or use `getByRole('link', { name: /transactions\.csv/i })` if the accessible name includes the file name.

**Warning signs:** `TestingLibraryElementError: Found multiple elements with the role "link"`.

### Pitfall 4: `transactions.csv` 404 Before Phase 7

**What goes wrong:** Manually testing the download page and seeing a 404 for the CSV link before Phase 7 runs.

**Why it happens:** The file does not exist yet — this is by design per CONTEXT.md locked decision.

**How to avoid:** This is expected and acceptable. Do not add error handling or disabled states for the missing file. The Vitest tests do not fetch actual files — they only assert on rendered DOM elements.

---

## Code Examples

Verified patterns from existing codebase:

### Iconsax Bold Icon Usage (from Navbar.tsx)

```tsx
// Source: src/components/layout/Navbar.tsx (established pattern)
import { FolderOpen } from 'iconsax-react';

<Icon variant="Bold" size={18} />
// For DownloadCard: variant="Bold", size={18}
```

### Card Pattern (from rubric/page.tsx)

```tsx
// Source: src/app/rubric/page.tsx
<div className="bg-white shadow-crowe-card rounded-xl p-6">
  <h3 className="text-lg font-bold text-crowe-indigo-dark">Card Heading</h3>
  <p className="mt-4 text-tint-700 leading-relaxed text-sm">Description text</p>
</div>
```

### Page Header Block (from instructions/page.tsx and rubric/page.tsx)

```tsx
// Source: src/app/rubric/page.tsx
<div className="mb-10 sm:mb-12">
  <h1 className="text-4xl font-bold text-crowe-indigo-dark">Downloads</h1>
  <p className="text-tint-700 mt-2 text-lg">Everything you need to get started</p>
</div>
```

### Anchor as Primary Button (pattern synthesis from codebase)

```tsx
// Download anchor styled as primary action button
// Uses same color as bg-crowe-indigo-dark text-white pattern in rubric page
<a
  href="/transactions.csv"
  download
  className="inline-flex items-center justify-center gap-2 rounded-md bg-crowe-indigo-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-crowe-indigo"
>
  <DocumentDownload variant="Bold" size={18} />
  Download
</a>
```

### Static File Content — data_dictionary.md (verbatim from AGENT_PLAN.md)

```markdown
# Data Dictionary — Meridian Financial Transaction Dataset

| Column | Description | Format | Example |
|---|---|---|---|
| transaction_id | Unique identifier for each transaction | TXN-XXXXX | TXN-00042 |
| transaction_date | Date the transaction was processed | YYYY-MM-DD | 2024-03-15 |
| account_id | Internal identifier for the originating account | ACC-XXX | ACC-101 |
| account_name | Name of the business account holder | string | Hargrove Logistics LLC |
| transaction_type | Method of transfer | Wire / ACH / Check / Internal Transfer | Wire |
| amount | Transaction amount in USD | float | 48200.00 |
| counterparty_name | Name of the receiving party | string | Baltic Trade Partners |
| counterparty_country | Country of the receiving party | string | Russia |
| historical_avg_amount | Typical transaction amount for this account and type | float | 5800.00 |
| monthly_transaction_count | Typical number of transactions per month for this account | integer | 4 |
| is_anomalous | Whether the compliance team flagged this transaction | True / False | True |
| anomaly_notes | Plain-English explanation of why it was flagged (blank if not anomalous) | string | Transaction amount is 8.3x the historical average. |
```

### Static File Content — setup_guide.md (verbatim from AGENT_PLAN.md)

```markdown
# Environment Setup Guide

Follow these steps before starting the competition.

## Step 1: Install VS Code
Download and install from: https://code.visualstudio.com/

## Step 2: Install Cursor
Download and install from: https://www.cursor.com/
Cursor is an AI-powered code editor built on VS Code. You will use it to write code with AI assistance.

## Step 3: Open Your Project Folder
1. Open Cursor
2. Click File > Open Folder
3. Create a new folder called `meridian-competition` on your desktop
4. Open that folder in Cursor

## Step 4: Download the Dataset
Go to the Downloads tab on this site and download `transactions.csv` into your project folder.

## Step 5: Start Building
- Ask Cursor/Codex to help you plan your dashboard
- Ask it to write HTML, CSS, and JavaScript
- Use ChatGPT or Claude to help draft your findings memo
- There are no rules on how much AI assistance you use — use it as much as possible

## Tips
- Keep your final dashboard as a single `.html` file with all CSS and JS embedded inline
- Preview your file by right-clicking it and selecting "Open with Live Server" (install the Live Server VS Code extension)
- Save your work frequently
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-side file streaming via API route | `/public` static file + `<a download>` | N/A — chosen at project start | Zero server load; CDN-cached; no API route needed |
| Default export React components | Named exports (established in this project) | Phase 1 foundation | `DownloadCard` must be a named export |

**Established in prior phases:**
- No `'use client'` on pure Server Components — applies here (DownloadCard has no interactivity)
- `HambergerMenu` intentional typo in iconsax-react 0.0.8 — verify `DocumentDownload` spelling before using
- Tailwind JIT scanner requires hardcoded class strings — do not dynamically construct class names like `bg-crowe-indigo-${variant}`

---

## Open Questions

1. **Exact `DocumentDownload` export name in iconsax-react 0.0.8**
   - What we know: The package has a known intentional typo (`HambergerMenu`). Most icon names follow PascalCase exactly as shown on app.iconsax.io.
   - What's unclear: Whether `DocumentDownload` is the exact export or whether it uses a variant like `DocumentDownload1`.
   - Recommendation: In Wave 0 of the plan, verify the export by checking `node_modules/iconsax-react/dist/index.d.ts` or importing in a scratch file. If the name differs, update accordingly before writing tests. This is LOW risk — the icon name is prominent and standard.

2. **Grid column breakpoint: `sm:grid-cols-3` vs `md:grid-cols-3`**
   - What we know: CONTEXT.md says "row of 3 across on desktop, collapsing to grid-cols-1 on mobile." The Rubric page uses `sm:grid-cols-2`. The exact breakpoint for the 3-column layout is Claude's discretion.
   - What's unclear: Whether 3 cards fit comfortably at the `sm` breakpoint (640px) given card padding.
   - Recommendation: Use `sm:grid-cols-3` since cards are simple (no progress bars, minimal content) and the `max-w-3xl` container constrains total width to 48rem. At 640px, three `16rem` cards with `gap-6` fit. If visual review shows crowding, switch to `md:grid-cols-3 sm:grid-cols-2`.

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` — this section is included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest + React Testing Library |
| Config file | `vitest.config.ts` (exists) |
| Quick run command | `npx vitest run src/__tests__/DownloadsPage.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DL-01 | `transactions.csv` card renders with heading, description, size | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ❌ Wave 0 |
| DL-02 | `data_dictionary.md` card renders with heading, description, size | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ❌ Wave 0 |
| DL-03 | `setup_guide.md` card renders with heading, description, size | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ❌ Wave 0 |
| DL-04 | Three anchor links with `download` attribute exist; hrefs point to `/transactions.csv`, `/data_dictionary.md`, `/setup_guide.md` | unit | `npx vitest run src/__tests__/DownloadsPage.test.tsx` | ❌ Wave 0 |
| STATIC-01 | `public/data_dictionary.md` file exists with column content | manual-only | `ls public/data_dictionary.md` (filesystem check) | ❌ Wave 0 |
| STATIC-02 | `public/setup_guide.md` file exists with setup content | manual-only | `ls public/setup_guide.md` (filesystem check) | ❌ Wave 0 |

**Note on STATIC-01/STATIC-02:** Vitest runs in jsdom — it cannot assert filesystem presence. These are verified by the implementer confirming the files exist in `public/` and contain expected headings. The plan should include a verification task that checks `public/` contents.

**Note on DL-04 anchor attribute testing:** React Testing Library's `getByRole('link')` returns anchor elements. The `download` attribute can be asserted with `expect(link).toHaveAttribute('download')`. The `href` can be asserted with `expect(link).toHaveAttribute('href', '/transactions.csv')`.

### Sampling Rate

- **Per task commit:** `npx vitest run src/__tests__/DownloadsPage.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/__tests__/DownloadsPage.test.tsx` — covers DL-01, DL-02, DL-03, DL-04
- [ ] `src/components/DownloadCard.tsx` — required by the test file import
- [ ] `public/data_dictionary.md` — STATIC-01 (verified manually, not via Vitest)
- [ ] `public/setup_guide.md` — STATIC-02 (verified manually, not via Vitest)

*(Shared fixtures and framework setup already exist — `src/__tests__/setup.ts` and `vitest.config.ts` are present)*

---

## Sources

### Primary (HIGH confidence)

- Codebase direct inspection — `src/app/rubric/page.tsx`, `src/app/instructions/page.tsx`, `src/components/layout/Navbar.tsx`, `tailwind.config.ts`, `vitest.config.ts`, `src/__tests__/RubricPage.test.tsx` — all patterns verified in-repo
- `AGENT_PLAN.md` — locked card content and static file content verified verbatim
- `06-CONTEXT.md` — all locked decisions read directly

### Secondary (MEDIUM confidence)

- Next.js public directory documentation: static files in `public/` are served at root URL path — well-known Next.js behavior, consistent with project setup
- HTML `download` attribute: triggers browser save dialog for same-origin resources — standard HTML5 behavior

### Tertiary (LOW confidence)

- `DocumentDownload` exact export name in iconsax-react 0.0.8 — assumed correct based on icon naming convention; flagged as open question for Wave 0 verification

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed and in use
- Architecture: HIGH — directly mirrors established RubricPage and InstructionsPage patterns
- Pitfalls: HIGH — documented from STATE.md accumulated decisions and HTML specification
- Static file content: HIGH — verbatim content available in AGENT_PLAN.md

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable stack; patterns unlikely to change within project)
