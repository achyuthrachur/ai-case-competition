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
