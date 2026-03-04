'use strict';
const fs   = require('fs');
const path = require('path');

// ─── Constants ────────────────────────────────────────────────
const OUTPUT_PATH   = path.join(__dirname, '../public/transactions.csv');
const TOTAL_ROWS    = 75000;
const ANOMALY_COUNT = 7500;   // ~10%
const PER_TYPE      = 1500;   // 5 anomaly types, evenly distributed
const NORMAL_COUNT  = TOTAL_ROWS - ANOMALY_COUNT;  // 67500

// ─── Accounts (20 accounts, ACC-101..ACC-120) ────────────────
const ACCOUNTS = [
  { account_id: 'ACC-101', account_name: 'Hargrove Logistics LLC',       historical_avg_amount: 5800.00,  monthly_transaction_count: 4,  preferred_types: ['Wire', 'ACH'] },
  { account_id: 'ACC-102', account_name: 'Pinnacle Trade Partners Inc',   historical_avg_amount: 22400.00, monthly_transaction_count: 6,  preferred_types: ['Wire', 'ACH'] },
  { account_id: 'ACC-103', account_name: 'Westfield Industrial Supply',   historical_avg_amount: 8750.00,  monthly_transaction_count: 8,  preferred_types: ['ACH', 'Check'] },
  { account_id: 'ACC-104', account_name: 'Crestwood Capital Group',       historical_avg_amount: 47200.00, monthly_transaction_count: 5,  preferred_types: ['Wire'] },
  { account_id: 'ACC-105', account_name: 'Bluestone Merchant Services',   historical_avg_amount: 3150.00,  monthly_transaction_count: 12, preferred_types: ['ACH', 'Check'] },
  { account_id: 'ACC-106', account_name: 'Meridian Fabrication Co',       historical_avg_amount: 11300.00, monthly_transaction_count: 7,  preferred_types: ['ACH', 'Wire'] },
  { account_id: 'ACC-107', account_name: 'Stonegate Distribution LLC',    historical_avg_amount: 6400.00,  monthly_transaction_count: 9,  preferred_types: ['ACH', 'Check'] },
  { account_id: 'ACC-108', account_name: 'Ashford Consulting Group',      historical_avg_amount: 18900.00, monthly_transaction_count: 3,  preferred_types: ['Wire', 'ACH'] },
  { account_id: 'ACC-109', account_name: 'Lakeshore Foods Wholesale',     historical_avg_amount: 4200.00,  monthly_transaction_count: 10, preferred_types: ['ACH', 'Check'] },
  { account_id: 'ACC-110', account_name: 'Northgate Properties LLC',      historical_avg_amount: 85000.00, monthly_transaction_count: 2,  preferred_types: ['Wire'] },
  { account_id: 'ACC-111', account_name: 'Ironclad Manufacturing Inc',    historical_avg_amount: 31600.00, monthly_transaction_count: 6,  preferred_types: ['Wire', 'ACH'] },
  { account_id: 'ACC-112', account_name: 'Clearview Media Solutions',     historical_avg_amount: 7800.00,  monthly_transaction_count: 5,  preferred_types: ['ACH', 'Internal Transfer'] },
  { account_id: 'ACC-113', account_name: 'Riverton Building Materials',   historical_avg_amount: 12500.00, monthly_transaction_count: 8,  preferred_types: ['Check', 'ACH'] },
  { account_id: 'ACC-114', account_name: 'Golden Gate Exports Ltd',       historical_avg_amount: 39000.00, monthly_transaction_count: 4,  preferred_types: ['Wire'] },
  { account_id: 'ACC-115', account_name: 'Cornerstone Tech Ventures',     historical_avg_amount: 9600.00,  monthly_transaction_count: 7,  preferred_types: ['ACH', 'Wire'] },
  { account_id: 'ACC-116', account_name: 'Highpoint Energy Resources',    historical_avg_amount: 56800.00, monthly_transaction_count: 3,  preferred_types: ['Wire', 'ACH'] },
  { account_id: 'ACC-117', account_name: 'Timberline Freight Services',   historical_avg_amount: 1250.00,  monthly_transaction_count: 15, preferred_types: ['Check', 'ACH'] },
  // Dormant accounts — excluded from normal row generation
  { account_id: 'ACC-118', account_name: 'Coastal Harbor Trading Co',     historical_avg_amount: 14700.00, monthly_transaction_count: 5,  preferred_types: ['Wire'] },
  { account_id: 'ACC-119', account_name: 'Silverton Asset Management',    historical_avg_amount: 72000.00, monthly_transaction_count: 2,  preferred_types: ['Wire', 'Internal Transfer'] },
  { account_id: 'ACC-120', account_name: 'Redwood Pacific Holdings LLC',  historical_avg_amount: 28300.00, monthly_transaction_count: 4,  preferred_types: ['Wire', 'ACH'] },
];

// Designate ACC-118, ACC-119, ACC-120 as dormant (excluded from normal generation)
const DORMANT_IDS      = new Set(['ACC-118', 'ACC-119', 'ACC-120']);
const ACTIVE_ACCOUNTS  = ACCOUNTS.filter(a => !DORMANT_IDS.has(a.account_id));
const DORMANT_ACCOUNTS = ACCOUNTS.filter(a => DORMANT_IDS.has(a.account_id));

// ─── Counterparties ───────────────────────────────────────────
const COUNTERPARTIES_US = [
  'Apex National Bank',
  'Broadstreet Financial',
  'Continental Supply Co',
  'Delta Trade Services',
  'Eastern Commerce Corp',
  'First Harbor Payments',
  'Great Plains Wholesale',
  'Horizon Distribution',
  'Inland Merchant Group',
  'Jefferson Financial LLC',
  'Keystone Vendors Inc',
  'Liberty Commerce Partners',
  'Midland Trade Alliance',
  'National Freight Corp',
  'Overland Logistics LLC',
  'Pacific Coast Trading',
  'Quorum Capital Partners',
  'Riverside Commerce Inc',
  'Summit Trade Finance',
  'United Western Merchants',
];

const HIGH_RISK_COUNTRIES = ['Iran', 'North Korea', 'Myanmar', 'Russia', 'Belarus'];

const HIGH_RISK_COUNTERPARTIES = [
  'Caspian Global Trade',
  'Eastern Alliance Corp',
  'Far East Commerce Ltd',
  'Frontier Commerce LLC',
  'Global Exchange Partners',
  'Horizon Pacific Ventures',
  'International Brokerage Ltd',
  'Northern Star Trading',
  'Steppe Commerce Group',
  'United Meridian Trade',
];

// Transaction types
const TRANSACTION_TYPES_ALL = ['Wire', 'ACH', 'Check', 'Internal Transfer'];

// Month names for notes
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// ─── Utilities ────────────────────────────────────────────────
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomIntBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Returns a random YYYY-MM-DD date string in the range [from, to].
 * Uses Date.UTC so no timezone issues.
 */
function randomDate(from, to) {
  const fromMs = Date.UTC(
    parseInt(from.slice(0, 4), 10),
    parseInt(from.slice(5, 7), 10) - 1,
    parseInt(from.slice(8, 10), 10)
  );
  const toMs = Date.UTC(
    parseInt(to.slice(0, 4), 10),
    parseInt(to.slice(5, 7), 10) - 1,
    parseInt(to.slice(8, 10), 10)
  );
  const ms = fromMs + Math.random() * (toMs - fromMs);
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Add n calendar days to a YYYY-MM-DD string, return YYYY-MM-DD.
 */
function addDays(dateStr, n) {
  const ms = Date.UTC(
    parseInt(dateStr.slice(0, 4), 10),
    parseInt(dateStr.slice(5, 7), 10) - 1,
    parseInt(dateStr.slice(8, 10), 10)
  );
  return new Date(ms + n * 86400000).toISOString().slice(0, 10);
}

/**
 * RFC 4180 CSV escaping — wrap in quotes if value contains comma, quote, or newline.
 * Doubles any internal quotes.
 */
function csvEscape(value) {
  const str = String(value == null ? '' : value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * Joins row object fields in the exact locked column order.
 */
function rowToCSV(row) {
  return [
    csvEscape(row.transaction_id),
    csvEscape(row.transaction_date),
    csvEscape(row.account_id),
    csvEscape(row.account_name),
    csvEscape(row.transaction_type),
    csvEscape(row.amount),
    csvEscape(row.counterparty_name),
    csvEscape(row.counterparty_country),
    csvEscape(row.historical_avg_amount),
    csvEscape(row.monthly_transaction_count),
    csvEscape(row.is_anomalous),
    csvEscape(row.anomaly_notes),
  ].join(',');
}

/**
 * Fisher-Yates in-place shuffle, returns the same array.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// ─── Normal Row Generator ─────────────────────────────────────
function generateNormalRows(count) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const account = pick(ACTIVE_ACCOUNTS);
    const amount = parseFloat((account.historical_avg_amount * randomBetween(0.6, 1.4)).toFixed(2));
    rows.push({
      transaction_id: '',  // assigned after shuffle
      transaction_date: randomDate('2024-01-01', '2024-12-31'),
      account_id: account.account_id,
      account_name: account.account_name,
      transaction_type: pick(account.preferred_types),
      amount: amount,
      counterparty_name: pick(COUNTERPARTIES_US),
      counterparty_country: 'United States',
      historical_avg_amount: parseFloat(account.historical_avg_amount.toFixed(2)),
      monthly_transaction_count: account.monthly_transaction_count,
      is_anomalous: 'False',
      anomaly_notes: '',
    });
  }
  return rows;
}

// ─── Anomaly Generators ───────────────────────────────────────

/**
 * Generate rows where the amount is 5x–10x the historical average.
 */
function generateAmountSpikes(count) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const account = pick(ACTIVE_ACCOUNTS);
    const ratio = parseFloat(randomBetween(5, 10).toFixed(1));
    const amount = parseFloat((account.historical_avg_amount * ratio).toFixed(2));
    const hist   = parseFloat(account.historical_avg_amount.toFixed(2));
    rows.push({
      transaction_id: '',
      transaction_date: randomDate('2024-01-01', '2024-12-31'),
      account_id: account.account_id,
      account_name: account.account_name,
      transaction_type: pick(account.preferred_types),
      amount: amount,
      counterparty_name: pick(COUNTERPARTIES_US),
      counterparty_country: 'United States',
      historical_avg_amount: hist,
      monthly_transaction_count: account.monthly_transaction_count,
      is_anomalous: 'True',
      anomaly_notes: `Transaction amount of $${amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} is ${ratio}x the historical average of $${hist.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} for this account.`,
    });
  }
  return rows;
}

/**
 * Generate rows where the counterparty is in a high-risk (sanctioned) jurisdiction.
 */
function generateHighRiskJurisdictions(count) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const account = pick(ACTIVE_ACCOUNTS);
    const country  = pick(HIGH_RISK_COUNTRIES);
    const amount   = parseFloat((account.historical_avg_amount * randomBetween(0.8, 1.5)).toFixed(2));
    rows.push({
      transaction_id: '',
      transaction_date: randomDate('2024-01-01', '2024-12-31'),
      account_id: account.account_id,
      account_name: account.account_name,
      transaction_type: 'Wire',
      amount: amount,
      counterparty_name: pick(HIGH_RISK_COUNTERPARTIES),
      counterparty_country: country,
      historical_avg_amount: parseFloat(account.historical_avg_amount.toFixed(2)),
      monthly_transaction_count: account.monthly_transaction_count,
      is_anomalous: 'True',
      anomaly_notes: `Wire transfer to counterparty in sanctioned jurisdiction (${country}).`,
    });
  }
  return rows;
}

/**
 * Generate structuring pattern rows — groups of 3–5 ACH transactions between
 * $9,200–$9,800 for the same account within a 6-day window.
 * Returns exactly `count` rows (sliced if the last group overshoots).
 */
function generateStructuringPatterns(count) {
  const rows = [];
  while (rows.length < count) {
    const account  = pick(ACTIVE_ACCOUNTS);
    const groupSize = randomIntBetween(3, 5);
    const startDate = randomDate('2024-01-01', '2024-12-25');
    const hist = parseFloat(account.historical_avg_amount.toFixed(2));
    const note = `Account shows ${groupSize} ACH transactions between $9,200\u2013$9,800 within a 6-day window \u2014 possible structuring.`;
    for (let j = 0; j < groupSize && rows.length < count; j++) {
      const amount = parseFloat(randomBetween(9200, 9800).toFixed(2));
      rows.push({
        transaction_id: '',
        transaction_date: addDays(startDate, j),
        account_id: account.account_id,
        account_name: account.account_name,
        transaction_type: 'ACH',
        amount: amount,
        counterparty_name: pick(COUNTERPARTIES_US),
        counterparty_country: 'United States',
        historical_avg_amount: hist,
        monthly_transaction_count: account.monthly_transaction_count,
        is_anomalous: 'True',
        anomaly_notes: note,
      });
    }
  }
  return rows.slice(0, count);
}

/**
 * Generate dormant account rows — DORMANT_ACCOUNTS only appear in Sep–Dec 2024.
 */
function generateDormantActivity(count) {
  const rows = [];
  // Distribute across the 3 dormant accounts
  const perAccount = Math.ceil(count / DORMANT_ACCOUNTS.length);
  for (const account of DORMANT_ACCOUNTS) {
    const acctRows = Math.min(perAccount, count - rows.length);
    // Group these into a few bursts to make the note realistic
    let generated = 0;
    while (generated < acctRows) {
      const burstSize  = randomIntBetween(2, 5);
      const actual     = Math.min(burstSize, acctRows - generated);
      const burstDate  = randomDate('2024-09-01', '2024-12-15');
      const monthIdx   = parseInt(burstDate.slice(5, 7), 10) - 1;
      const monthName  = MONTH_NAMES[monthIdx];
      const n          = actual;
      const hist       = parseFloat(account.historical_avg_amount.toFixed(2));
      const note       = `Account ${account.account_id} had no activity from Jan\u2013Aug 2024, then initiated ${n} wire transfers in ${monthName}.`;
      for (let j = 0; j < actual; j++) {
        const amount = parseFloat((account.historical_avg_amount * randomBetween(0.8, 1.3)).toFixed(2));
        rows.push({
          transaction_id: '',
          transaction_date: addDays(burstDate, j),
          account_id: account.account_id,
          account_name: account.account_name,
          transaction_type: 'Wire',
          amount: amount,
          counterparty_name: pick(COUNTERPARTIES_US),
          counterparty_country: 'United States',
          historical_avg_amount: hist,
          monthly_transaction_count: account.monthly_transaction_count,
          is_anomalous: 'True',
          anomaly_notes: note,
        });
        generated++;
      }
    }
    if (rows.length >= count) break;
  }
  return rows.slice(0, count);
}

/**
 * Generate frequency spike rows — same historical_avg_amount, but
 * monthly_transaction_count inflated 8x–12x.
 */
function generateFrequencySpikes(count) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const account     = pick(ACTIVE_ACCOUNTS);
    const multiplier  = randomIntBetween(8, 12);
    const spikedCount = account.monthly_transaction_count * multiplier;
    const amount      = parseFloat((account.historical_avg_amount * randomBetween(0.7, 1.3)).toFixed(2));
    const hist        = account.monthly_transaction_count;
    const date        = randomDate('2024-01-01', '2024-12-31');
    const monthIdx    = parseInt(date.slice(5, 7), 10) - 1;
    const monthName   = MONTH_NAMES[monthIdx];
    rows.push({
      transaction_id: '',
      transaction_date: date,
      account_id: account.account_id,
      account_name: account.account_name,
      transaction_type: pick(account.preferred_types),
      amount: amount,
      counterparty_name: pick(COUNTERPARTIES_US),
      counterparty_country: 'United States',
      historical_avg_amount: parseFloat(account.historical_avg_amount.toFixed(2)),
      monthly_transaction_count: spikedCount,
      is_anomalous: 'True',
      anomaly_notes: `Account processed ${spikedCount} transactions in ${monthName} vs. a historical average of ${hist}/month.`,
    });
  }
  return rows;
}

// ─── Main ─────────────────────────────────────────────────────
const START_TIME = Date.now();
console.log('Generating Meridian Financial transaction dataset...');

const normalRows    = generateNormalRows(NORMAL_COUNT);
console.log('25%...');

const spikeRows     = generateAmountSpikes(PER_TYPE);
const highRiskRows  = generateHighRiskJurisdictions(PER_TYPE);
console.log('50%...');

const structureRows = generateStructuringPatterns(PER_TYPE);
const dormantRows   = generateDormantActivity(PER_TYPE);
console.log('75%...');

const freqRows = generateFrequencySpikes(PER_TYPE);

const allRows = shuffle([
  ...normalRows,
  ...spikeRows,
  ...highRiskRows,
  ...structureRows,
  ...dormantRows,
  ...freqRows,
]);

// Assign transaction IDs AFTER shuffle
allRows.forEach((row, i) => {
  row.transaction_id = 'TXN-' + String(i + 1).padStart(5, '0');
});

// Build full CSV string in memory, write once
const HEADER = 'transaction_id,transaction_date,account_id,account_name,transaction_type,amount,counterparty_name,counterparty_country,historical_avg_amount,monthly_transaction_count,is_anomalous,anomaly_notes';
const csv    = [HEADER, ...allRows.map(rowToCSV)].join('\n');

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, csv, 'utf8');

const sizeMB  = (Buffer.byteLength(csv, 'utf8') / (1024 * 1024)).toFixed(1);
const elapsed = ((Date.now() - START_TIME) / 1000).toFixed(1);
console.log(`\u2713 Generated ${allRows.length} rows \u2192 public/transactions.csv (${sizeMB} MB, ${elapsed}s)`);
