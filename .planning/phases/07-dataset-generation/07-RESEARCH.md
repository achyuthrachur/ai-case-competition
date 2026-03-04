# Phase 7: Dataset Generation - Research

**Researched:** 2026-03-04
**Domain:** Node.js scripting — synthetic CSV generation with zero external dependencies
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Row count:** ~75,000 rows (middle of 50k–100k range); exact count may vary ±5% due to rounding in anomaly distribution logic
- **Script console output:** Progress logging to stdout — start message, 25%/50%/75% progress, final summary line with row count, file path, size in MB, and elapsed seconds
- **Date distribution:** Fully random across 2024-01-01 to 2024-12-31; no business-day filtering
- **Account inventory:** 20 accounts, ACC-101 through ACC-120, with realistic mid-market fictional business names, consistent `account_name`, `account_id`, and `historical_avg_amount` per transaction type
- **Anomaly distribution:** ~10% of rows (~7,500 rows); 5 types evenly distributed (~1,500 rows each)
  1. Large amount spike — 5x–10x `historical_avg_amount`
  2. High-risk jurisdiction — sanctioned `counterparty_country` (Iran, North Korea, Myanmar, Russia, Belarus)
  3. Structuring pattern — multiple transactions $9,200–$9,800 within a 6-day window
  4. Dormant account activity — account with no transactions for 6+ months then sudden activity
  5. Frequency spike — 8x–12x historical `monthly_transaction_count`
- **`anomaly_notes`:** Human-readable plain-English explanation for flagged rows; blank string for non-anomalous rows
- **Script architecture:** Single file, no external npm dependencies; plain `.js`; Node.js built-ins (`fs`, `path`) only; deterministic order: define accounts → generate normal transactions → inject anomalies → shuffle → write CSV
- **`transaction_id` format:** `TXN-00001` through `TXN-75000` (zero-padded to 5 digits)
- **`is_anomalous` values:** `True` or `False` (capitalized strings, not JS booleans)
- **`amount` and `historical_avg_amount`:** USD float with 2 decimal places
- **Output path:** `public/transactions.csv`

### Claude's Discretion
- Exact fictional account names, counterparty names, and `historical_avg_amount` values
- Specific sanctioned country list for high-risk jurisdiction anomalies
- How structuring pattern is implemented (same account, short time window)
- CSV quoting strategy for text fields with potential commas
- Exact progress reporting interval (every N rows vs percentage-based)

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | `scripts/generate-dataset.js` Node.js script produces `public/transactions.csv` when run with `node scripts/generate-dataset.js` | Node.js `fs.writeFileSync` + `path.join` patterns; `scripts/` directory must be created; no npm install needed |
| DATA-02 | Dataset contains 50,000–100,000 rows with all 12 columns in correct order and formats | CSV construction loop pattern; column header order locked; format rules for each column type |
| DATA-03 | ~10% rows anomalous; 5 anomaly types evenly distributed | Anomaly injection architecture: generate normal rows first, then overlay anomaly batches; structuring requires date-window logic |
| DATA-04 | 20 unique fictional accounts with consistent `account_name`, `account_id`, and `historical_avg_amount` per transaction type | Account table defined as a constant array; each row draws from it by reference, ensuring consistency |
</phase_requirements>

---

## Summary

Phase 7 delivers a single file: `scripts/generate-dataset.js`. It is a standalone Node.js script that writes `public/transactions.csv` — a 75,000-row synthetic financial transaction dataset. The script has zero external dependencies; it uses only Node.js built-in modules (`fs`, `path`). No npm install, no TypeScript compilation, no Next.js involvement.

The technical challenge is not the CSV writing itself (trivial with `fs.writeFileSync`) but the data modeling: 20 accounts with consistent properties, 5 structurally distinct anomaly types that each require different injection strategies, and correct formatting of all 12 column values. The structuring anomaly type is the most complex — it requires injecting multiple transactions for the same account within a constrained date window, which must survive the final shuffle while still being detectable.

Performance is a secondary concern: generating 75,000 rows in Node.js v24 using only string concatenation is fast (typically 2–10 seconds). Writing a 10–12 MB CSV file sequentially with a single `writeFileSync` call is safe for this file size. No streaming is required.

**Primary recommendation:** Define the 20-account table as a module-level constant array first, then build a `generateNormalRow()` function, then write 5 separate anomaly injection functions, then shuffle and write. Keep the script under ~300 lines.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `fs` (built-in) | Node.js 24 | Write CSV to disk | No install; `fs.writeFileSync` sufficient for 10–12 MB |
| `path` (built-in) | Node.js 24 | Resolve `public/transactions.csv` relative to script location | `path.join(__dirname, '../public/transactions.csv')` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None | — | No external dependencies needed | — |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `fs.writeFileSync` with string | `csv-writer` npm package | npm package adds install step and dependency; not permitted per locked decisions |
| String concatenation loop | Template literals with `.join('\n')` | Both valid; array of strings joined with `\n` is marginally more memory-efficient and easier to read |
| Plain loop counter for progress | `Date.now()` delta | Both valid; percentage-based (every 25% of 75,000 = every 18,750 rows) is cleaner than wall-clock polling |

**Installation:**
```bash
# No installation required — uses only Node.js built-ins
# Ensure scripts/ directory exists:
mkdir -p scripts
```

---

## Architecture Patterns

### Recommended Project Structure
```
scripts/
└── generate-dataset.js    # Single file, ~250-300 lines, no imports except fs + path

public/
├── transactions.csv       # Output (75,000 rows, ~10-12 MB)
├── data_dictionary.md     # Already exists
└── setup_guide.md         # Already exists
```

### Pattern 1: Account Table as Module-Level Constant

**What:** Define 20 accounts as an array of objects at the top of the script. Every row generated for that account references the same object — `account_id`, `account_name`, `historical_avg_amount`, `preferred_transaction_types`, and `monthly_transaction_count` are never regenerated per row.

**When to use:** Always — this is the only way to guarantee DATA-04 consistency requirement.

**Example:**
```javascript
// Source: Node.js built-in patterns (no external source needed)
const ACCOUNTS = [
  {
    account_id: 'ACC-101',
    account_name: 'Hargrove Logistics LLC',
    historical_avg_amount: 5800.00,
    monthly_transaction_count: 4,
    preferred_types: ['Wire', 'ACH'],
  },
  {
    account_id: 'ACC-102',
    account_name: 'Meridian Capital Partners',
    historical_avg_amount: 42000.00,
    monthly_transaction_count: 2,
    preferred_types: ['Wire'],
  },
  // ... 18 more accounts
];
```

### Pattern 2: Deterministic Script Flow

**What:** Four sequential phases — (1) generate normal rows, (2) generate anomaly rows per type, (3) shuffle all rows together, (4) write CSV.

**When to use:** Always — locked decision in CONTEXT.md.

**Example:**
```javascript
const START_TIME = Date.now();
console.log('Generating Meridian Financial transaction dataset...');

const TOTAL_ROWS = 75000;
const ANOMALY_COUNT = 7500;   // ~10%
const PER_TYPE = 1500;        // 5 types, evenly distributed

// Phase 1: Normal rows
const normalRows = generateNormalRows(TOTAL_ROWS - ANOMALY_COUNT);

// Phase 2: Anomaly rows
const anomalyRows = [
  ...generateLargeAmountSpikes(PER_TYPE),
  ...generateHighRiskJurisdictions(PER_TYPE),
  ...generateStructuringPatterns(PER_TYPE),
  ...generateDormantAccountActivity(PER_TYPE),
  ...generateFrequencySpikes(PER_TYPE),
];

// Phase 3: Shuffle
const allRows = shuffle([...normalRows, ...anomalyRows]);

// Phase 4: Write
writeCSV(allRows);
```

### Pattern 3: Structuring Anomaly — Date-Window Groups

**What:** Structuring requires multiple transactions for the same account within a 6-day window. Generate these as "groups" of 3–5 transactions sharing a base date, not as isolated rows.

**When to use:** Only for structuring anomaly type. This is the only type where rows are interdependent.

**Example:**
```javascript
function generateStructuringPatterns(count) {
  const rows = [];
  // Each "structuring event" = 3-5 transactions in a 6-day window
  const eventsNeeded = Math.ceil(count / 4); // avg 4 per event

  for (let i = 0; i < eventsNeeded && rows.length < count; i++) {
    const account = pickStructuringAccount(); // pick an account with ACH preferred
    const baseDate = randomDate('2024-01-15', '2024-11-30'); // leave room for 6-day window
    const txCount = 3 + Math.floor(Math.random() * 3); // 3–5 per event

    for (let t = 0; t < txCount && rows.length < count; t++) {
      const date = addDays(baseDate, t); // 0, 1, 2, 3... within window
      const amount = (9200 + Math.random() * 600).toFixed(2); // $9,200–$9,800
      rows.push({
        ...buildBaseRow(account, date),
        amount,
        is_anomalous: 'True',
        anomaly_notes: `Account shows ${txCount} ACH transactions between $9,200–$9,800 within a 6-day window — possible structuring.`,
      });
    }
  }
  return rows;
}
```

### Pattern 4: CSV Quoting Strategy

**What:** Text fields (`account_name`, `counterparty_name`, `anomaly_notes`) may contain commas. RFC 4180 CSV quoting: wrap the field in double quotes if it contains a comma, double-quote, or newline. Replace any `"` within the field with `""`.

**When to use:** Always — apply to every text field in the CSV row builder.

**Example:**
```javascript
function csvEscape(value) {
  const str = String(value);
  // Wrap in quotes if contains comma, double-quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function rowToCSV(row) {
  return [
    row.transaction_id,
    row.transaction_date,
    row.account_id,
    csvEscape(row.account_name),
    row.transaction_type,
    row.amount,
    csvEscape(row.counterparty_name),
    row.counterparty_country,
    row.historical_avg_amount,
    row.monthly_transaction_count,
    row.is_anomalous,
    csvEscape(row.anomaly_notes),
  ].join(',');
}
```

### Pattern 5: Transaction ID Generation

**What:** `TXN-00001` through `TXN-75000` — assigned after shuffle so IDs are sequential in the output file but rows are already shuffled.

**When to use:** Assign IDs as the final step before writing, after shuffle.

**Example:**
```javascript
// After shuffle:
allRows.forEach((row, index) => {
  row.transaction_id = 'TXN-' + String(index + 1).padStart(5, '0');
});
```

### Pattern 6: Progress Reporting

**What:** Log progress every 25% of total rows processed. Track wall-clock time with `Date.now()`.

**Example:**
```javascript
const CHECKPOINTS = [0.25, 0.50, 0.75];
let nextCheckpoint = 0;

for (let i = 0; i < TOTAL_ROWS; i++) {
  // ... generate row ...
  if (nextCheckpoint < CHECKPOINTS.length && i / TOTAL_ROWS >= CHECKPOINTS[nextCheckpoint]) {
    console.log(`${CHECKPOINTS[nextCheckpoint] * 100}%...`);
    nextCheckpoint++;
  }
}

// Final summary
const elapsed = ((Date.now() - START_TIME) / 1000).toFixed(1);
const sizeKB = (csvString.length / 1024).toFixed(1);
const sizeMB = (csvString.length / (1024 * 1024)).toFixed(1);
console.log(`✓ Generated ${TOTAL_ROWS} rows → public/transactions.csv (${sizeMB} MB, ${elapsed}s)`);
```

### Anti-Patterns to Avoid

- **Generating `historical_avg_amount` per row:** This breaks DATA-04. It must come from the account table.
- **Generating `monthly_transaction_count` per row:** Same issue — must be per-account, not per-row random.
- **Assigning transaction IDs before shuffle:** IDs will not be sequential in the output file if assigned before shuffle. Assign after.
- **Writing rows incrementally with `appendFileSync`:** Slow for 75,000 rows. Build the full CSV string in memory, then write once with `writeFileSync`.
- **Using JS boolean `true`/`false` for `is_anomalous`:** Must be the capitalized string `'True'` or `'False'` per AGENT_PLAN.md spec.
- **Not creating the `scripts/` directory in the task:** The directory does not exist yet. The plan must include `mkdir -p scripts` or note that the task must create it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSV escaping | Custom regex-based escaper | Simple `csvEscape()` per RFC 4180 (4 lines) | The actual logic is trivial; just implement it correctly the first time — no library needed for this simple case |
| Random date generation | Complex date library | `new Date(Date.UTC(2024, 0, 1) + Math.random() * 365 * 24 * 3600 * 1000)` | Built-in `Date` is sufficient for YYYY-MM-DD within a single year |
| Fisher-Yates shuffle | Custom shuffle implementation | Standard Fisher-Yates algorithm (5 lines) | No library needed — this is a standard textbook algorithm |

**Key insight:** Every utility needed (random dates, CSV escaping, shuffle, string padding) is achievable in 5 lines or fewer of plain JavaScript. No npm package adds value here.

---

## Common Pitfalls

### Pitfall 1: Dormant Account Anomaly Requires Date Logic
**What goes wrong:** The dormant account anomaly requires accounts with "no transactions for 6+ months" followed by sudden activity. If account selection and date assignment are random, some accounts may receive random normal transactions in the January–August window, making them non-dormant.
**Why it happens:** Normal transactions are assigned to accounts randomly without checking whether an account is designated "dormant."
**How to avoid:** Designate 2–3 accounts as "dormant accounts" in the account table. Exclude them from normal transaction generation. Only inject transactions for them in the September–December window as anomaly rows.
**Warning signs:** Dormant account has normal rows in Q1–Q3 in the output CSV.

### Pitfall 2: Structuring Pattern Rows Must Cluster by Account
**What goes wrong:** Structuring anomaly rows assigned to random accounts won't form a detectable pattern. The whole point is the same account making multiple near-$10k transactions within 6 days.
**Why it happens:** Treating structuring rows like other anomaly types (one-row-per-anomaly).
**How to avoid:** Generate structuring "events" (groups of 3–5 rows for the same account on consecutive dates), not individual rows. See Pattern 3 above.

### Pitfall 3: CSV Output Not in `public/` (Path Resolution)
**What goes wrong:** `fs.writeFileSync('public/transactions.csv', ...)` uses a relative path from `process.cwd()`. If the script is run from a directory other than the project root, the file lands in the wrong place.
**Why it happens:** Relative path resolution depends on the shell's working directory.
**How to avoid:** Use `path.join(__dirname, '../public/transactions.csv')`. `__dirname` is always the directory containing the script file (`scripts/`), so `../public/` always resolves correctly.

### Pitfall 4: `public/` May Not Exist
**What goes wrong:** `fs.writeFileSync` to `public/transactions.csv` throws `ENOENT` if `public/` does not exist.
**Why it happens:** The script is run before the directory is created.
**How to avoid:** Check: in this project, `public/` already exists (it contains `data_dictionary.md` and `setup_guide.md`). The script should still defensively call `fs.mkdirSync(dir, { recursive: true })` before writing.

### Pitfall 5: Anomaly Notes Containing Commas Break Naive CSV
**What goes wrong:** `anomaly_notes` values like `"Account ACC-114 had no activity from Jan–Aug 2024, then initiated 3 wire transfers..."` contain commas. A naive join will split this field into multiple CSV columns.
**Why it happens:** Using `.join(',')` without escaping text fields.
**How to avoid:** Always pass text fields through `csvEscape()` (Pattern 4 above) before joining.

### Pitfall 6: Frequency Spike — `monthly_transaction_count` Column Value
**What goes wrong:** The frequency spike anomaly requires that the row's `monthly_transaction_count` value reflects the spike (e.g., 47) not the historical norm (e.g., 4). But `historical_avg_amount` should remain the account's normal value.
**Why it happens:** Confusing which column to inflate — both look like "historical" fields.
**How to avoid:** For frequency spike rows: keep `historical_avg_amount` from the account table (unchanged), but set `monthly_transaction_count` to `historical * (8–12)`. The `anomaly_notes` should reference both the current count and the historical baseline.

### Pitfall 7: Large Amounts Formatted Without 2 Decimal Places
**What goes wrong:** `(5800 * 7.3)` produces `42340.000000000000` — not `42340.00`.
**Why it happens:** JavaScript floating-point arithmetic produces long decimals.
**How to avoid:** Always call `.toFixed(2)` on any calculated amount before writing to the row. Wrap in `parseFloat()` only if you need arithmetic on it later.

---

## Code Examples

Verified patterns from Node.js built-in APIs (HIGH confidence):

### Date Generation (Random Date in 2024)
```javascript
// Source: Node.js Date built-in — no external reference needed
const YEAR_START = Date.UTC(2024, 0, 1);   // 2024-01-01 00:00:00 UTC
const YEAR_END   = Date.UTC(2024, 11, 31); // 2024-12-31 00:00:00 UTC
const YEAR_MS    = YEAR_END - YEAR_START;

function randomDate(fromDate, toDate) {
  // fromDate / toDate: 'YYYY-MM-DD' strings (optional narrowed range)
  const from = fromDate ? new Date(fromDate).getTime() : YEAR_START;
  const to   = toDate   ? new Date(toDate).getTime()   : YEAR_END;
  const d = new Date(from + Math.random() * (to - from));
  return d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
```

### Fisher-Yates Shuffle
```javascript
// Source: Knuth, TAOCP Vol. 2 — standard algorithm, no library needed
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### File Write Pattern
```javascript
const fs   = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '../public/transactions.csv');

function writeCSV(rows) {
  const HEADER = [
    'transaction_id', 'transaction_date', 'account_id', 'account_name',
    'transaction_type', 'amount', 'counterparty_name', 'counterparty_country',
    'historical_avg_amount', 'monthly_transaction_count', 'is_anomalous', 'anomaly_notes'
  ].join(',');

  const lines = [HEADER, ...rows.map(rowToCSV)];
  const csv = lines.join('\n');

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, csv, 'utf8');

  const sizeMB = (Buffer.byteLength(csv, 'utf8') / (1024 * 1024)).toFixed(1);
  return sizeMB;
}
```

### Random Pick Utility
```javascript
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomIntBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
```

### Amount Formatting
```javascript
function formatAmount(n) {
  return parseFloat(n.toFixed(2));
  // Stored as number; CSV output via rowToCSV calls .toFixed(2) again when joining
}
// In rowToCSV: row.amount.toFixed(2) and row.historical_avg_amount.toFixed(2)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `fs.writeFile` (async) for CSV | `fs.writeFileSync` (sync) for scripts | N/A | Simpler for CLI scripts; no callback or promise chain needed; fine for 10–12 MB |
| Streaming row-by-row writes | Build string in memory, single write | N/A | For 75k rows at ~150 bytes each = ~11 MB; fits comfortably in memory; single write is faster than 75k append calls |
| `new Date()` local time for dates | `Date.UTC()` and `.toISOString().slice(0,10)` | N/A | Avoids timezone offset bugs where dates can shift by ±1 day depending on system locale |

**Deprecated/outdated:**
- `fs.appendFileSync` in a loop: Do not use for large datasets — one syscall per row is ~100x slower than one write.
- `moment.js` for date manipulation: Not needed; built-in Date + UTC methods are sufficient here.

---

## Open Questions

1. **`scripts/` directory creation**
   - What we know: `scripts/` does not currently exist in the project (confirmed by directory listing)
   - What's unclear: Whether the plan should create it explicitly or whether the task instruction should note it
   - Recommendation: Wave 0 task creates `scripts/` directory as its first step; document in the plan

2. **`public/transactions.csv` size vs. Downloads page display**
   - What we know: The Downloads page (DL-01) currently shows "~150 KB" as the file size description (from AGENT_PLAN.md original spec targeting ~800 rows). The actual 75k-row file will be ~10–12 MB.
   - What's unclear: Whether the Downloads page hardcoded size string needs updating in this phase or a later phase
   - Recommendation: Phase 7 plan should note this discrepancy. The planner should add a task to update the Downloads page `DownloadCard` size string to "~10–12 MB" when creating transactions.csv. This is a 1-line change in `src/app/downloads/page.tsx` or wherever the card data lives.

3. **Seeding for reproducibility**
   - What we know: `Math.random()` is not seedable in Node.js without a library. Each run produces a different dataset.
   - What's unclear: Whether the competition organizers need a reproducible dataset (same file every run)
   - Recommendation: For this use case (competition dataset), reproducibility is NOT required — the file is generated once and committed. No seeding needed. Document this in the plan.

---

## Validation Architecture

> nyquist_validation is enabled in .planning/config.json.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 |
| Config file | `vitest.config.ts` (project root) |
| Quick run command | `npx vitest run src/__tests__/generate-dataset.test.js` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DATA-01 | Script exits 0 and `public/transactions.csv` exists after running | integration (child_process) | `node scripts/generate-dataset.js && node -e "require('fs').statSync('public/transactions.csv')"` | ❌ Wave 0 |
| DATA-02 | CSV has exactly 12 columns with correct header names in correct order; row count is 50,000–100,000 | unit (parse CSV header + count) | `npx vitest run src/__tests__/generate-dataset.test.js` | ❌ Wave 0 |
| DATA-03 | ~10% rows have `is_anomalous = True`; all 5 anomaly types present in `anomaly_notes` | unit (parse CSV, count anomalous rows, check notes) | `npx vitest run src/__tests__/generate-dataset.test.js` | ❌ Wave 0 |
| DATA-04 | 20 unique `account_id` values (ACC-101..ACC-120); `account_name` consistent per `account_id`; `historical_avg_amount` consistent per `account_id` | unit (group by account_id, assert consistency) | `npx vitest run src/__tests__/generate-dataset.test.js` | ❌ Wave 0 |

**Note on test strategy:** Because the script writes to disk, the test must first run `node scripts/generate-dataset.js` (via `child_process.execSync`) and then read and parse the output CSV. This is an integration test, not a unit test of isolated functions. Vitest supports this pattern. The test file should be at `src/__tests__/generate-dataset.test.js` (or `.test.ts`) and can read `public/transactions.csv` relative to the project root.

**Alternative — lighter test approach:** Parse the CSV inline within the test without re-running the script, by reading the file if it already exists. Use `beforeAll` to conditionally run the script. This avoids a 5–30 second generation step on every test run after the file already exists.

### Sampling Rate
- **Per task commit:** `node scripts/generate-dataset.js` (manual verification; generation is the verification)
- **Per wave merge:** `npx vitest run src/__tests__/generate-dataset.test.js`
- **Phase gate:** Full suite green (`npx vitest run`) before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/generate-dataset.test.js` — covers DATA-01, DATA-02, DATA-03, DATA-04
- [ ] `scripts/` directory — must be created before `generate-dataset.js` can exist
- [ ] No additional test infrastructure needed; `vitest.config.ts` and `src/__tests__/setup.ts` already exist

---

## Sources

### Primary (HIGH confidence)
- Node.js 24 built-in `fs` module — `writeFileSync`, `mkdirSync` with `{ recursive: true }` are stable APIs unchanged since Node.js 10
- Node.js 24 built-in `path` module — `path.join`, `__dirname` are stable
- RFC 4180 (CSV format specification) — CSV quoting rules: wrap in `"` if field contains `,`, `"`, or `\n`; escape `"` as `""`
- Project file: `public/data_dictionary.md` — authoritative column names and formats
- Project file: `.planning/phases/07-dataset-generation/07-CONTEXT.md` — locked decisions
- Project file: `AGENT_PLAN.md` — column spec and anomaly type descriptions with example notes

### Secondary (MEDIUM confidence)
- Fisher-Yates shuffle — standard algorithm; implementation verified correct by code inspection
- `Date.UTC()` + `.toISOString().slice(0,10)` for UTC-safe date strings — standard Node.js Date pattern; avoids timezone offset issue documented in multiple Node.js community sources

### Tertiary (LOW confidence)
- Performance estimate "2–10 seconds for 75,000 rows" — based on general knowledge of Node.js string processing speed; not benchmarked on this machine

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — only Node.js built-ins; no version risk, no ecosystem drift
- Architecture: HIGH — all patterns are standard Node.js scripting; verified against project constraints
- Pitfalls: HIGH — derived from close reading of locked decisions and data modeling requirements
- Validation: MEDIUM — test file does not yet exist; framework and config already in place

**Research date:** 2026-03-04
**Valid until:** 2026-06-04 (stable — Node.js built-in APIs, no external dependencies to drift)
