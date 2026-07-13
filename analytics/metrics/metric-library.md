# Metric Library & Governance

## 1. Overview
The Metric Library acts as the single source of truth for how business calculations are defined. This prevents the "multiple versions of the truth" problem where different dashboards show different numbers for the same metric.

## 2. Reusable Metric Definitions

### 2.1 Base Metrics (Raw Facts)
* `Total_Downloads`: Sum of `download_count` from `Fact_Downloads`.
* `Total_Uploads`: Count of rows in `Fact_Uploads`.
* `Total_AI_Tokens`: Sum of `tokens_used_prompt` + `tokens_used_completion` from `Fact_AI_Usage`.

### 2.2 Calculated & Derived Metrics
* `Average_Download_Per_Student`: `Total_Downloads` / `Count(Distinct student_key)`.
* `Upload_Rejection_Rate`: `Count(Uploads where status='REJECTED')` / `Total_Uploads`.

### 2.3 Composite Metrics
* `Engagement_Score`: `(0.5 * DAU) + (0.3 * Average_Download_Per_Student) + (0.2 * AI_Queries_Per_Student)`.

## 3. Metric Governance
* **Ownership**: Every metric must have an assigned owner (e.g., "Data Analytics Team").
* **Versioning**: When a metric's calculation logic changes (e.g., DAU definition changes from 24h to 48h active), a new version is created (`DAU_v2`). Existing scorecards must be explicitly migrated to prevent historical data skew.
