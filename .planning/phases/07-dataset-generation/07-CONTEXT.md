# Phase 7: Dataset Generation - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Create `scripts/generate-dataset.js` — a standalone Node.js script (no external npm dependencies) that writes `public/transactions.csv` when run with `node scripts/generate-dataset.js`. Delivers a 50k–100k row synthetic transaction dataset with 12 columns, 20 fictional accounts, and 5 evenly-distributed anomaly types (~10% of rows flagged). Requirements: DATA-01, DATA-02, DATA-03, DATA-04.

</domain>

<decisions>
## Implementation Decisions

### Row Count Target
- **~75,000 rows** — middle of the 50k–100k range per REQUIREMENTS.md
- Results in ~10–12 MB CSV file — rich enough for meaningful analysis, fast enough to generate in a few seconds
- Exact count can vary ±5% due to rounding in anomaly distribution logic

### Script Console Output
- **Progress logging** — script prints to stdout while running:
  - Start message: `Generating Meridian Financial transaction dataset...`
  - Progress every 25%: `25%... 50%... 75%...`
  - Final summary line: `✓ Generated 75,000 rows → public/transactions.csv (X.X MB, Xs)`
- This confirms the script is working during the ~5–30 second runtime

### Date Distribution
- **Fully random** across 2024-01-01 to 2024-12-31
- No business-day filtering — any calendar day is valid
- Simple to implement; sufficient for anomaly detection analysis purposes

### Account Inventory (20 accounts)
- Realistic mid-market business names — fictional but plausible (e.g., "Hargrove Logistics LLC", "Meridian Capital Partners", "Westfield Supply Co.")
- Each account has: `account_id` (ACC-101 through ACC-120), `account_name`, and `historical_avg_amount` that stays consistent across all transactions for that account
- Transaction types per account are also consistent (some accounts primarily use Wire, others ACH, etc.)

### Anomaly Distribution
- **~10% of rows flagged** = ~7,500 anomalous rows out of 75,000
- **5 types, evenly distributed** = ~1,500 rows per anomaly type
- Anomaly types (locked from REQUIREMENTS.md DATA-03):
  1. Large amount spike — 5x–10x `historical_avg_amount`
  2. High-risk jurisdiction — sanctioned `counterparty_country` (Iran, North Korea, Myanmar, Russia, Belarus)
  3. Structuring pattern — multiple transactions $9,200–$9,800 within a 6-day window
  4. Dormant account activity — account with no transactions for 6+ months then sudden activity
  5. Frequency spike — 8x–12x historical `monthly_transaction_count`
- `anomaly_notes` column: human-readable plain-English explanation for each flagged row; blank string for non-anomalous rows

### Script Architecture
- **Single file, no external dependencies** — uses only Node.js built-ins (`fs`, `path`)
- **No TypeScript** — plain `.js` file run directly with `node`
- Deterministic structure: define accounts → generate normal transactions → inject anomalies → shuffle → write CSV
- CSV written with proper header row and comma-separated values (handle commas in text fields with quoting if needed)

### Claude's Discretion
- Exact fictional account names, counterparty names, and historical average amounts
- Specific sanctioned country list for high-risk jurisdiction anomalies
- How structuring pattern is implemented (same account, short time window)
- CSV quoting strategy for text fields with potential commas
- Exact progress reporting interval (every N rows vs percentage-based)

</decisions>

<specifics>
## Specific Ideas

- AGENT_PLAN.md column spec is authoritative — 12 columns in this exact order: `transaction_id`, `transaction_date`, `account_id`, `account_name`, `transaction_type`, `amount`, `counterparty_name`, `counterparty_country`, `historical_avg_amount`, `monthly_transaction_count`, `is_anomalous`, `anomaly_notes`
- `transaction_id` format: `TXN-00001` through `TXN-75000` (zero-padded to 5 digits)
- `is_anomalous` values: `True` or `False` (capitalized, not boolean) per AGENT_PLAN.md examples
- `amount` and `historical_avg_amount`: USD float with 2 decimal places
- REQUIREMENTS.md note: AGENT_PLAN.md shows ~800 rows as an example spec — the actual target is 50k–100k per REQUIREMENTS.md and STATE.md decision log

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — this is a standalone Node.js script in `scripts/`, not a Next.js component
- No imports from `src/` — the script runs independently of the Next.js app

### Established Patterns
- Output goes to `public/transactions.csv` — Next.js serves `public/` as static assets; the Downloads page already links to `/transactions.csv`
- No TypeScript in scripts/ — plain `.js` is correct here (no `tsconfig.json` coverage of `scripts/`)
- The data dictionary (`public/data_dictionary.md`) already documents all 12 columns — script output must match those column names exactly

### Integration Points
- `public/transactions.csv` — consumed by the Downloads page card (DL-01) and by competition participants
- `scripts/generate-dataset.js` — referenced in README.md (Phase 10) with command `node scripts/generate-dataset.js`
- No API route dependency — dataset is a static file, not dynamically generated

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-dataset-generation*
*Context gathered: 2026-03-04*
