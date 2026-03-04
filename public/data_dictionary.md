# Data Dictionary — Meridian Financial Transaction Dataset

## Overview

This dataset contains synthetic financial transaction records for 20 fictional business accounts at Meridian Financial. All anomalies are pre-labeled. Use this dictionary to understand each column before building your dashboard.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `transaction_id` | string | Unique identifier for each transaction | `TXN-00042` |
| `transaction_date` | date | Date the transaction was processed (YYYY-MM-DD) | `2024-03-15` |
| `transaction_hour` | integer | Hour of day the transaction was initiated (0–23) | `14` |
| `account_id` | string | Internal identifier for the originating account | `ACC-101` |
| `account_name` | string | Name of the business account holder | `Hargrove Logistics LLC` |
| `account_type` | string | Account product type | `Business Checking` |
| `account_region` | string | Geographic region of the account | `Midwest` |
| `account_risk_tier` | string | Pre-assigned risk classification | `Low` / `Medium` / `High` |
| `account_tenure_years` | integer | Number of years the account has been open | `8` |
| `transaction_type` | string | Method of transfer | `Wire` / `ACH` / `Check` / `Internal Transfer` |
| `transaction_channel` | string | System or channel used to initiate the transaction | `Online Banking` / `Wire Room` / `Branch` / `ACH Processor` / `Mobile Banking` |
| `transaction_reference` | string | Internal reference code assigned to the transaction | `WIRE-2024-04821` |
| `amount` | float | Transaction amount in USD (2 decimal places) | `48200.00` |
| `counterparty_name` | string | Name of the receiving party | `Baltic Trade Partners` |
| `counterparty_country` | string | Country of the receiving party | `Russia` |
| `counterparty_type` | string | Classification of the counterparty | `Business` / `Individual` / `Financial Institution` / `Foreign Entity` |
| `historical_avg_amount` | float | Typical transaction amount for this account (baseline) | `5800.00` |
| `monthly_transaction_count` | integer | Number of transactions processed this month (current period) | `4` |
| `prior_year_avg_monthly_count` | integer | Average monthly transaction count for this account in 2023 | `4` |
| `is_anomalous` | boolean | Whether the compliance team flagged this transaction | `True` / `False` |
| `anomaly_notes` | string | Plain-English explanation of why it was flagged; blank if not anomalous | `Transaction amount is 8.3x the historical average.` |

## Anomaly Types

Five types of anomalies are pre-labeled in the dataset, each representing approximately 2% of all rows (~1,500 rows per type):

| Anomaly Type | Description | Key Signal Column(s) |
|---|---|---|
| **Amount Spike** | Transaction is 5x–10x the account's historical average | `amount` vs `historical_avg_amount` |
| **High-Risk Jurisdiction** | Wire transfer to a sanctioned country | `counterparty_country`, `transaction_type` |
| **Structuring** | Multiple ACH transactions just under $10,000 within a 6-day window | `amount`, `transaction_date`, `account_id` |
| **Dormant Account Activity** | Account had no transactions Jan–Aug 2024, then sudden activity in Sep–Dec | `transaction_date`, `account_id` |
| **Frequency Spike** | Monthly transaction count is 8x–12x the historical norm | `monthly_transaction_count` vs `prior_year_avg_monthly_count` |

## Account Types

| Value | Description |
|-------|-------------|
| `Business Checking` | Standard commercial checking account |
| `Business Savings` | Interest-bearing business savings account |
| `Commercial Line of Credit` | Revolving credit facility for business operations |
| `Merchant Account` | Payment processing account for high-volume retail transactions |

## Notes

- **75,000 total rows** — ~10% anomalous (7,500 rows), ~90% normal (67,500 rows)
- **20 unique accounts** — ACC-101 through ACC-120. Account metadata (`account_name`, `account_type`, `account_region`, `account_risk_tier`, `account_tenure_years`, `historical_avg_amount`, `prior_year_avg_monthly_count`) is consistent per `account_id` across all rows
- **Accounts ACC-118, ACC-119, ACC-120** are dormant accounts — they appear only in the Sep–Dec 2024 window as anomalous rows
- All company names, account names, and counterparty names are entirely fictional
