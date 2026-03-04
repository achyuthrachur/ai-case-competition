import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { describe, it, expect, beforeAll } from 'vitest';

const PROJECT_ROOT = join(import.meta.dirname, '../../');
const SCRIPT_PATH = join(PROJECT_ROOT, 'scripts/generate-dataset.js');
const CSV_PATH = join(PROJECT_ROOT, 'public/transactions.csv');

const EXPECTED_HEADERS = [
  'transaction_id',
  'transaction_date',
  'transaction_hour',
  'account_id',
  'account_name',
  'account_type',
  'account_region',
  'account_risk_tier',
  'account_tenure_years',
  'transaction_type',
  'transaction_channel',
  'transaction_reference',
  'amount',
  'counterparty_name',
  'counterparty_country',
  'counterparty_type',
  'historical_avg_amount',
  'monthly_transaction_count',
  'prior_year_avg_monthly_count',
  'is_anomalous',
  'anomaly_notes',
];

// Simple CSV row parser that handles RFC 4180 quoting
function parseCSVRow(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

let rows = [];
let headers = [];

beforeAll(() => {
  // Runs the script — will throw (RED) if scripts/generate-dataset.js does not exist
  execSync(`node "${SCRIPT_PATH}"`, { cwd: PROJECT_ROOT, stdio: 'inherit' });
  const raw = readFileSync(CSV_PATH, 'utf8');
  const lines = raw.trim().split('\n');
  headers = parseCSVRow(lines[0]);
  rows = lines.slice(1).map(parseCSVRow);
}, 120_000); // 2-minute timeout for generation

describe('DATA-01: CSV file output', () => {
  it('produces public/transactions.csv after script run', () => {
    expect(existsSync(CSV_PATH)).toBe(true);
  });
});

describe('DATA-02: CSV structure and format', () => {
  it('DATA-02a: header row contains exactly 21 columns in the correct order', () => {
    expect(headers).toEqual(EXPECTED_HEADERS);
  });

  it('DATA-02b: row count (excluding header) is between 50,000 and 100,000', () => {
    expect(rows.length).toBeGreaterThanOrEqual(50_000);
    expect(rows.length).toBeLessThanOrEqual(100_000);
  });

  it('DATA-02c: all is_anomalous values are either "True" or "False"', () => {
    const isAnomalousIdx = headers.indexOf('is_anomalous');
    const invalidRows = rows.filter(
      (row) => row[isAnomalousIdx] !== 'True' && row[isAnomalousIdx] !== 'False'
    );
    expect(invalidRows).toHaveLength(0);
  });
});

describe('DATA-03: Anomaly distribution', () => {
  it('DATA-03a: between 8% and 12% of rows have is_anomalous = "True" (~10%)', () => {
    const isAnomalousIdx = headers.indexOf('is_anomalous');
    const anomalousCount = rows.filter((row) => row[isAnomalousIdx] === 'True').length;
    const percentage = anomalousCount / rows.length;
    expect(percentage).toBeGreaterThanOrEqual(0.08);
    expect(percentage).toBeLessThanOrEqual(0.12);
  });

  it('DATA-03b: all 5 anomaly type fingerprints appear in anomaly_notes', () => {
    const isAnomalousIdx = headers.indexOf('is_anomalous');
    const anomalyNotesIdx = headers.indexOf('anomaly_notes');
    const anomalousNotes = rows
      .filter((row) => row[isAnomalousIdx] === 'True')
      .map((row) => row[anomalyNotesIdx].toLowerCase());

    // Fingerprint 1: Amount spike — references "historical average" or "historical avg"
    const hasAmountSpike = anomalousNotes.some(
      (note) => note.includes('historical average') || note.includes('historical avg')
    );
    expect(hasAmountSpike).toBe(true);

    // Fingerprint 2: High-risk jurisdiction — references "sanctioned jurisdiction" or "sanctioned"
    const hasSanctioned = anomalousNotes.some(
      (note) => note.includes('sanctioned jurisdiction') || note.includes('sanctioned')
    );
    expect(hasSanctioned).toBe(true);

    // Fingerprint 3: Structuring — references "structuring" or "$9,2" or "$9,8" or "6-day"
    const hasStructuring = anomalousNotes.some(
      (note) =>
        note.includes('structuring') ||
        note.includes('$9,2') ||
        note.includes('$9,8') ||
        note.includes('6-day')
    );
    expect(hasStructuring).toBe(true);

    // Fingerprint 4: Dormant account — references "dormant" or "no activity" or "inactive"
    const hasDormant = anomalousNotes.some(
      (note) =>
        note.includes('dormant') || note.includes('no activity') || note.includes('inactive')
    );
    expect(hasDormant).toBe(true);

    // Fingerprint 5: Frequency spike — references "transactions in" or "historical average of"
    const hasFrequencySpike = anomalousNotes.some(
      (note) => note.includes('transactions in') || note.includes('historical average of')
    );
    expect(hasFrequencySpike).toBe(true);
  });
});

describe('DATA-04: Account consistency', () => {
  it('DATA-04a: exactly 20 unique account_ids, all in range ACC-101..ACC-120', () => {
    const accountIdIdx = headers.indexOf('account_id');
    const uniqueIds = new Set(rows.map((row) => row[accountIdIdx]));

    // Build expected set: ACC-101 through ACC-120
    const expectedIds = new Set(Array.from({ length: 20 }, (_, i) => `ACC-${101 + i}`));

    expect(uniqueIds.size).toBe(20);
    for (const id of uniqueIds) {
      expect(expectedIds.has(id)).toBe(true);
    }
  });

  it('DATA-04b: account_name is consistent per account_id (same id never maps to two names)', () => {
    const accountIdIdx = headers.indexOf('account_id');
    const accountNameIdx = headers.indexOf('account_name');

    const idToNames = new Map();
    for (const row of rows) {
      const id = row[accountIdIdx];
      const name = row[accountNameIdx];
      if (!idToNames.has(id)) {
        idToNames.set(id, new Set());
      }
      idToNames.get(id).add(name);
    }

    for (const [id, names] of idToNames) {
      expect(names.size, `account_id ${id} has ${names.size} different account_name values`).toBe(
        1
      );
    }
  });

  it('DATA-04c: historical_avg_amount is consistent per account_id', () => {
    const accountIdIdx = headers.indexOf('account_id');
    const historicalAvgIdx = headers.indexOf('historical_avg_amount');

    const idToAvgs = new Map();
    for (const row of rows) {
      const id = row[accountIdIdx];
      const avg = row[historicalAvgIdx];
      if (!idToAvgs.has(id)) {
        idToAvgs.set(id, new Set());
      }
      idToAvgs.get(id).add(avg);
    }

    for (const [id, avgs] of idToAvgs) {
      expect(
        avgs.size,
        `account_id ${id} has ${avgs.size} different historical_avg_amount values`
      ).toBe(1);
    }
  });
});
