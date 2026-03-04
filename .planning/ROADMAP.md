# Roadmap: AI Case Competition Portal

## Overview

Build a Next.js 14 portal that gives competition participants everything they need in one place: a case brief, grading rubric, downloadable synthetic dataset, and a working file submission form backed by Vercel Blob. The build follows a foundation-first, API-before-UI order so each phase produces something independently verifiable before the next depends on it.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, dependencies, design tokens, and environment files (completed 2026-03-04)
- [x] **Phase 2: Navigation & Layout** - Persistent top navbar with Iconsax icons, active-tab highlighting, mobile hamburger, and root layout (completed 2026-03-04)
- [ ] **Phase 3: Home Page** - Animated hero, quick-link cards, and key dates section
- [ ] **Phase 4: Instructions Page** - Long-form case brief with section headings, numbered lists, and callout block
- [ ] **Phase 5: Rubric Page** - Scored breakdown with category cards and grading notes callout
- [ ] **Phase 6: Downloads Page + Static Files** - Download cards with Iconsax icons and the three public files they link to
- [ ] **Phase 7: Dataset Generation** - Node.js script that produces the 50k–100k row synthetic transaction CSV
- [ ] **Phase 8: API Route** - POST /api/submit handler with validation, Vercel Blob uploads, and JSON response
- [ ] **Phase 9: Submission Form** - Drag-and-drop form with loading state, confirmation screen, and error handling
- [ ] **Phase 10: Deployment & Docs** - README, vercel.json security headers, and GitHub Actions CI/CD workflows

## Phase Details

### Phase 1: Foundation
**Goal**: The project compiles, runs locally, and the design system is in place so every later phase can build on a consistent base.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Plans**: 2 plans
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without errors and the default Next.js page loads in a browser
  2. `react-dropzone`, `@vercel/blob`, `iconsax-react`, and React Bits are importable in a TypeScript file without type errors
  3. Crowe Indigo + Amber color tokens are available as Tailwind utility classes (e.g., `bg-crowe-indigo`)
  4. Helvetica Now (or fallback stack) renders on the page via `next/font/local`
  5. `.env.example` is present at the project root and `.env.local` is gitignored

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 15, install npm deps (react-dropzone, @vercel/blob, iconsax-react), init shadcn@2.3.0 with base primitives, install React Bits BlurText proof-of-pattern
- [ ] 01-02-PLAN.md — Apply full Crowe brand design tokens (tailwind.config.ts, globals.css), configure font fallback stack, create .env.example and .env.local

### Phase 2: Navigation & Layout
**Goal**: Every page in the app shares a persistent, functional navbar so navigation works before any page content is built.
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04
**Plans**: 2 plans
**Success Criteria** (what must be TRUE):
  1. The "Meridian Financial — AI Case Competition" wordmark is visible at the top-left of every page
  2. All five nav links (Home, Instructions, Rubric, Downloads, Submit) are visible with their Iconsax icons on desktop
  3. The active page's nav link is visually highlighted when that route is active
  4. On a mobile viewport, the nav links collapse behind a hamburger icon that opens and closes them on tap

Plans:
- [ ] 02-01-PLAN.md — Install Vitest test infrastructure and create failing Navbar test suite (Wave 0 RED state)
- [ ] 02-02-PLAN.md — Build Navbar.tsx client component, update root layout, create 4 stub route pages (GREEN state + human verify)

### Phase 3: Home Page
**Goal**: The landing page communicates the competition at a glance and routes participants to the right section immediately.
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04
**Plans**: 2 plans
**Success Criteria** (what must be TRUE):
  1. The hero headline "Meridian Financial — AI Case Competition" displays with a React Bits animated text effect on page load
  2. The 1–2 sentence competition blurb appears below the headline
  3. Four quick-link cards (Instructions, Rubric, Downloads, Submit) are visible and each navigates to the correct route when clicked
  4. A key dates section is visible with "Competition Opens: TBD" and "Submission Deadline: TBD" placeholder values

Plans:
- [ ] 03-01-PLAN.md — Write failing HomePage test suite covering HOME-01 through HOME-04 (TDD RED state)
- [ ] 03-02-PLAN.md — Implement src/app/page.tsx: hero + cards + key dates (TDD GREEN + human verify)

### Phase 4: Instructions Page
**Goal**: Participants can read the full case brief and understand exactly what to build and submit.
**Depends on**: Phase 2
**Requirements**: INST-01, INST-02, INST-03, INST-04, INST-05
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. The "Background", "Your Dataset", "Your Deliverables", "Tools You Should Use", and "What You Do NOT Need to Do" sections are all rendered with distinct headings
  2. "Your Deliverables" shows a numbered list with HTML Dashboard and 2-Page Memo as separate items
  3. The "Guidance" section is rendered as a visually distinct callout or quote block (not plain paragraph text)

### Phase 5: Rubric Page
**Goal**: Participants can see exactly how their submission will be graded, including category weights and qualitative notes.
**Depends on**: Phase 2
**Requirements**: RUB-01, RUB-02, RUB-03
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. All four scoring categories (Data Analysis Depth 40%, Dashboard UI Quality 35%, Memo Quality 15%, Extra Credit up to 15%) are displayed with visible weight indicators
  2. Each category shows a "What We're Looking For" description
  3. The Grading Notes are rendered as a styled callout block (visually distinct from the cards/table above it)

### Phase 6: Downloads Page + Static Files
**Goal**: Participants can download all three required files from a single page.
**Depends on**: Phase 2
**Requirements**: DL-01, DL-02, DL-03, DL-04, STATIC-01, STATIC-02
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. Three styled download cards are visible: one each for `transactions.csv`, `data_dictionary.md`, and `setup_guide.md`
  2. Each card shows the file name, description, and approximate file size
  3. Clicking the download button on any card triggers a file download via the browser's native download behavior
  4. `public/data_dictionary.md` and `public/setup_guide.md` are present and contain the full column and setup content per spec

### Phase 7: Dataset Generation
**Goal**: The synthetic transaction dataset exists in `/public`, is large enough for meaningful analysis, and follows the full 12-column spec with realistic anomaly distribution.
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. Running `node scripts/generate-dataset.js` produces `public/transactions.csv` without errors
  2. The CSV contains between 50,000 and 100,000 rows and all 12 required columns with correct data types and formats
  3. Approximately 10% of rows have `is_anomalous = True`; the five anomaly types (amount spike, high-risk jurisdiction, structuring, dormant account, frequency spike) are all represented
  4. The dataset uses exactly 20 unique fictional accounts with consistent `account_name`, `account_id`, and `historical_avg_amount` per transaction type across all rows

### Phase 8: API Route
**Goal**: File submissions can be received, validated, and stored in Vercel Blob via a working API endpoint — independently of any UI.
**Depends on**: Phase 1
**Requirements**: API-01, API-02, API-03, API-04, API-05, API-06
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. A `curl` or Postman POST to `/api/submit` with valid `multipart/form-data` (name, email, valid HTML file, valid memo file) returns a 200 JSON response with `success: true`, `submittedAt`, and Blob URLs for both files
  2. A POST with a missing required field, wrong file type, or oversized file returns a non-200 JSON response with an actionable error message
  3. Both uploaded files appear in the Vercel Blob store at the correct path pattern (`submissions/{sanitized-name}-{timestamp}/`)
  4. The `BLOB_READ_WRITE_TOKEN` is only accessed inside the route handler and is never included in any client-side bundle

### Phase 9: Submission Form
**Goal**: Participants can submit their HTML dashboard and memo through a polished drag-and-drop form and receive confirmation that their submission was received.
**Depends on**: Phase 8
**Requirements**: SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. Participant Name and Email fields are present and the Submit button cannot be activated until both are filled
  2. Both drag-and-drop zones accept files via drag or click; dropping a wrong file type or oversized file shows an inline error message without submitting
  3. The Submit button is disabled and a loading spinner is shown for the duration of the upload
  4. After a successful upload, the form is replaced with a confirmation screen showing "Submission received!", the participant name, timestamp, and both confirmed file names
  5. If the API returns an error, an inline error message with actionable guidance is shown and the form remains usable for retry

### Phase 10: Deployment & Docs
**Goal**: The project is deployable from a fresh clone, the Vercel deployment is secured with headers and region config, and CI/CD runs on every push.
**Depends on**: Phase 9
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. A developer can follow the README from a fresh clone to run the app locally, generate the dataset, and deploy to Vercel without consulting any other source
  2. `vercel.json` is present and applies `X-Frame-Options` and `X-Content-Type-Options` security headers and sets the region to `iad1`
  3. The `.github/workflows/ci.yml` workflow runs type-check and build on every pull request; `deploy.yml` triggers on pushes to main

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

Note: Phases 3, 4, 5, and 6 all depend on Phase 2 (navbar/layout) but are otherwise independent of each other and can execute in any order after Phase 2 is complete. Phase 7 depends only on Phase 1. Phase 8 depends only on Phase 1. Phase 9 depends on Phase 8.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-03-04 |
| 2. Navigation & Layout | 2/2 | Complete   | 2026-03-04 |
| 3. Home Page | 1/2 | In Progress|  |
| 4. Instructions Page | 0/TBD | Not started | - |
| 5. Rubric Page | 0/TBD | Not started | - |
| 6. Downloads Page + Static Files | 0/TBD | Not started | - |
| 7. Dataset Generation | 0/TBD | Not started | - |
| 8. API Route | 0/TBD | Not started | - |
| 9. Submission Form | 0/TBD | Not started | - |
| 10. Deployment & Docs | 0/TBD | Not started | - |
