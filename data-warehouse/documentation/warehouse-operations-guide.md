# Warehouse Operations Guide & Developer Handbook

## 1. Incremental Loading Operations
The EDW relies on incremental loading to maintain performance. 
* **Process**: Nightly batch jobs extract only records where `updated_at > last_extract_timestamp`.
* **Handling SCD2**: Updates to Dimensions (e.g., a student changing status) trigger an `INSERT` of a new row with `is_current = true`, and an `UPDATE` to the old row setting `is_current = false` and setting the `valid_to` date.

## 2. Refresh & Background Caching
* **Aggregate Refresh**: Materialized views for the Executive Analytics Mart are refreshed daily at 03:00 AM UTC.
* **Cache invalidation**: The analytical API caches heavily requested dashboard payloads in Redis for 12 hours.

## 3. Auditing and Monitoring
Warehouse operations emit audit logs to track data pipeline health:
* `Warehouse Refresh Started/Completed`
* `Dimension Updated`
* `Fact Loaded` (with row counts)
* `Snapshot Created`

## 4. Developer Guidelines
* **Provider Neutrality**: Never use proprietary SQL extensions. Always adhere to ANSI SQL.
* **Testing**: 
  - Ensure **Dimension Tests** validate uniqueness of surrogate keys.
  - Ensure **Fact Tests** validate that all foreign keys map correctly to a dimension (No orphan facts).
  - Ensure **Reconciliation Tests** verify that total rows in `Fact_Uploads` match the operational MongoDB `QuestionPapers` collection count.

## 5. Historical Snapshots
Periodic snapshots of highly dynamic operational tables (like user session states) are taken and appended to `snapshots/` in Parquet format for point-in-time trend analysis.
