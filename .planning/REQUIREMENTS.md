# Requirements: AI Case Competition Portal

**Defined:** 2026-03-03
**Core Value:** Participants can find everything they need — instructions, dataset, rubric — and submit their work in one place without friction.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Next.js 14+ App Router project initialized with TypeScript, Tailwind CSS, and shadcn/ui
- [x] **FOUND-02**: Dependencies installed: `react-dropzone`, `@vercel/blob`, `iconsax-react`, React Bits
- [x] **FOUND-03**: Crowe brand color tokens (Indigo + Amber palette) configured in `tailwind.config.ts` and `globals.css` — applied under Meridian Financial branding (no Crowe wordmarks)
- [x] **FOUND-04**: Helvetica Now font configured via `next/font/local` (with Arial/Helvetica Neue fallback stack if unlicensed)
- [x] **FOUND-05**: `.env.local` and `.env.example` present with `BLOB_READ_WRITE_TOKEN` variable

### Navigation

- [x] **NAV-01**: Persistent top navbar with "Meridian Financial — AI Case Competition" wordmark (left) and nav links (right)
- [x] **NAV-02**: Nav links: Home, Instructions, Rubric, Downloads, Submit — each with an Iconsax icon (Home, Document, Judge, FolderOpen, Send)
- [x] **NAV-03**: Active tab highlighted based on current route
- [x] **NAV-04**: Mobile hamburger menu collapses nav links on small screens

### Home Page

- [x] **HOME-01**: Full-width hero section with React Bits animated text effect on the headline "Meridian Financial — AI Case Competition"
- [x] **HOME-02**: 1–2 sentence competition blurb below the headline
- [x] **HOME-03**: 4 quick-link cards (21st.dev components) for Instructions, Rubric, Downloads, and Submit — each with an Iconsax icon
- [x] **HOME-04**: Key dates section with placeholder values (Competition Opens: TBD, Submission Deadline: TBD)

### Instructions Page

- [x] **INST-01**: "Background" section rendered with heading and paragraph text
- [x] **INST-02**: "Your Dataset" section rendered
- [x] **INST-03**: "Your Deliverables" section with numbered list (HTML Dashboard, 2-page Memo)
- [x] **INST-04**: "Tools You Should Use" and "What You Do NOT Need to Do" sections
- [x] **INST-05**: "Guidance" section rendered as a styled callout/quote block

### Rubric Page

- [x] **RUB-01**: Four scoring categories displayed with visual weight indicators:
  - Data Analysis Depth — 40%
  - Dashboard UI Quality — 35%
  - Memo Quality — 15%
  - Extra Credit — up to 15%
- [x] **RUB-02**: "What We're Looking For" description for each category
- [x] **RUB-03**: Grading Notes rendered as a styled callout block

### Downloads Page

- [x] **DL-01**: Styled download card for `transactions.csv` (name, description, ~150 KB size, download button)
- [x] **DL-02**: Styled download card for `data_dictionary.md` (name, description, < 5 KB size, download button)
- [x] **DL-03**: Styled download card for `setup_guide.md` (name, description, < 5 KB size, download button)
- [x] **DL-04**: Each card uses Iconsax `DocumentDownload` icon; files served from `/public` via `<a href="..." download>`

### Submission Form

- [ ] **SUB-01**: Participant Name (text input, required) and Email Address (email input, required) fields
- [ ] **SUB-02**: Drag-and-drop zone for HTML Dashboard — accepts `.html` only, max 10 MB, built with `react-dropzone`; shows inline error on wrong type or oversized file
- [ ] **SUB-03**: Drag-and-drop zone for Findings Memo — accepts `.pdf`, `.docx`, `.md` only, max 25 MB, built with `react-dropzone`; shows inline error on wrong type or oversized file
- [ ] **SUB-04**: Submit button sends `multipart/form-data` POST to `/api/submit`; button is disabled while upload is in progress to prevent double-submission
- [ ] **SUB-05**: Loading spinner shown during upload
- [ ] **SUB-06**: On success: replace form with confirmation screen showing "Submission received!", participant name, timestamp, and both file names confirmed
- [ ] **SUB-07**: On error: show inline error with actionable message (wrong file type, file too large, network error)

### API Route

- [ ] **API-01**: `POST /api/submit` route handler parses `multipart/form-data` using `request.formData()` (no third-party parser)
- [ ] **API-02**: Server-side validation: `name` and `email` present; `htmlFile` is `.html` and ≤ 10 MB; `memoFile` is `.pdf`, `.docx`, or `.md` and ≤ 25 MB
- [ ] **API-03**: Uploads `dashboard.html` to Vercel Blob at path `submissions/{sanitized-name}-{unix-timestamp}/dashboard.html`
- [ ] **API-04**: Uploads memo to Vercel Blob at path `submissions/{sanitized-name}-{unix-timestamp}/memo.{ext}`
- [ ] **API-05**: Returns JSON: `{ "success": true, "submittedAt": "ISO string", "files": { "dashboard": "url", "memo": "url" } }`
- [ ] **API-06**: `BLOB_READ_WRITE_TOKEN` is only referenced server-side; never exposed to the client

### Dataset Generation

- [ ] **DATA-01**: `scripts/generate-dataset.js` Node.js script produces `public/transactions.csv` when run with `node scripts/generate-dataset.js`
- [ ] **DATA-02**: Dataset contains 50,000–100,000 rows with all 12 columns: `transaction_id`, `transaction_date`, `account_id`, `account_name`, `transaction_type`, `amount`, `counterparty_name`, `counterparty_country`, `historical_avg_amount`, `monthly_transaction_count`, `is_anomalous`, `anomaly_notes`
- [ ] **DATA-03**: ~10% of rows flagged as anomalous; 5 anomaly types evenly distributed:
  1. Large amount spike (5x–10x historical avg)
  2. High-risk jurisdiction (sanctioned countries)
  3. Structuring pattern (multiple transactions just under $10,000)
  4. Dormant account activity (no activity for 6+ months, then sudden transactions)
  5. Frequency spike (8x–12x historical monthly count)
- [ ] **DATA-04**: 20 unique fictional accounts with consistent `account_name`, `account_id`, and `historical_avg_amount` per transaction type

### Static Files

- [ ] **STATIC-01**: `public/data_dictionary.md` with full column descriptions per spec (served via `/public` CDN)
- [ ] **STATIC-02**: `public/setup_guide.md` with participant environment setup steps per spec (served via `/public` CDN)

### Deployment & Docs

- [ ] **DEPLOY-01**: `README.md` covering local dev setup, dataset generation command, and Vercel deployment steps
- [ ] **DEPLOY-02**: `vercel.json` with security headers (`X-Frame-Options`, `X-Content-Type-Options`) and region config (`iad1`)
- [ ] **DEPLOY-03**: CI/CD workflows (`.github/workflows/ci.yml` and `deploy.yml`) per CLAUDE.md Section 6

## v2 Requirements

### Submission Management

- **MGMT-01**: Admin view listing all submissions (name, email, timestamp, file links)
- **MGMT-02**: Email confirmation sent to participant on successful submission
- **MGMT-03**: Participant can re-submit (overwrite previous submission by email)

### UX Enhancements

- **UX-01**: Countdown timer on Home page to submission deadline (requires real date to be set)
- **UX-02**: Table of contents on Instructions page for quick navigation
- **UX-03**: "Download All" zip bundle on Downloads page

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentication / login | No access control needed for this competition |
| Machine learning or anomaly detection | Anomalies are pre-labeled in the dataset |
| Real-time leaderboard | Not part of competition format |
| Team management | Individual submissions only for v1 |
| Mobile app | Web-only |
| Crowe logos or wordmarks | Meridian Financial fictional brand only |
| Post-submit file editing | Participants submit once |
| Judge-facing interface | Out of scope for v1 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1: Foundation | Complete |
| FOUND-02 | Phase 1: Foundation | Complete |
| FOUND-03 | Phase 1: Foundation | Complete |
| FOUND-04 | Phase 1: Foundation | Complete |
| FOUND-05 | Phase 1: Foundation | Complete |
| NAV-01 | Phase 2: Navigation & Layout | Complete |
| NAV-02 | Phase 2: Navigation & Layout | Complete |
| NAV-03 | Phase 2: Navigation & Layout | Complete |
| NAV-04 | Phase 2: Navigation & Layout | Complete |
| HOME-01 | Phase 3: Home Page | Complete |
| HOME-02 | Phase 3: Home Page | Complete |
| HOME-03 | Phase 3: Home Page | Complete |
| HOME-04 | Phase 3: Home Page | Complete |
| INST-01 | Phase 4: Instructions Page | Complete |
| INST-02 | Phase 4: Instructions Page | Complete |
| INST-03 | Phase 4: Instructions Page | Complete |
| INST-04 | Phase 4: Instructions Page | Complete |
| INST-05 | Phase 4: Instructions Page | Complete |
| RUB-01 | Phase 5: Rubric Page | Complete |
| RUB-02 | Phase 5: Rubric Page | Complete |
| RUB-03 | Phase 5: Rubric Page | Complete |
| DL-01 | Phase 6: Downloads Page + Static Files | Complete |
| DL-02 | Phase 6: Downloads Page + Static Files | Complete |
| DL-03 | Phase 6: Downloads Page + Static Files | Complete |
| DL-04 | Phase 6: Downloads Page + Static Files | Complete |
| STATIC-01 | Phase 6: Downloads Page + Static Files | Pending |
| STATIC-02 | Phase 6: Downloads Page + Static Files | Pending |
| DATA-01 | Phase 7: Dataset Generation | Pending |
| DATA-02 | Phase 7: Dataset Generation | Pending |
| DATA-03 | Phase 7: Dataset Generation | Pending |
| DATA-04 | Phase 7: Dataset Generation | Pending |
| API-01 | Phase 8: API Route | Pending |
| API-02 | Phase 8: API Route | Pending |
| API-03 | Phase 8: API Route | Pending |
| API-04 | Phase 8: API Route | Pending |
| API-05 | Phase 8: API Route | Pending |
| API-06 | Phase 8: API Route | Pending |
| SUB-01 | Phase 9: Submission Form | Pending |
| SUB-02 | Phase 9: Submission Form | Pending |
| SUB-03 | Phase 9: Submission Form | Pending |
| SUB-04 | Phase 9: Submission Form | Pending |
| SUB-05 | Phase 9: Submission Form | Pending |
| SUB-06 | Phase 9: Submission Form | Pending |
| SUB-07 | Phase 9: Submission Form | Pending |
| DEPLOY-01 | Phase 10: Deployment & Docs | Pending |
| DEPLOY-02 | Phase 10: Deployment & Docs | Pending |
| DEPLOY-03 | Phase 10: Deployment & Docs | Pending |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-03 — traceability updated after roadmap creation (10 phases)*
