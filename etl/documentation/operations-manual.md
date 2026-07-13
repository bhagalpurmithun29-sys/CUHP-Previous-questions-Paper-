# ETL Operations Manual

## 1. Pipeline Monitoring
* Use the Orchestrator's web UI to monitor the `Pipeline Status` across the DAG.
* **Failure Alerts**: If a job fails, the platform automatically pages the on-call engineer via Slack/PagerDuty.

## 2. Reconciliation Reports
Reconciliation is run automatically.
* **Source vs Warehouse Counts**: The daily `Reconciliation Engine` queries the operational MongoDB and compares counts with the `Fact_Uploads` table. 
* If a discrepancy > 0.01% is found, the job is marked `WARNING` and requires a manual review.

## 3. Backfill Procedures
To run a backfill for historical data without breaking CDC offsets:
1. Pause the CDC pipelines.
2. Trigger a Historical Load pipeline specifying the date range.
3. Once completed, resume CDC pipelines. The CDC framework will naturally fast-forward through events that have already been handled idempotently by the historical load.

## 4. Maintenance Windows
* Schedule major schema migrations during low-traffic windows (02:00 AM - 04:00 AM UTC).
* After a migration, run a full `Reconciliation Test` to ensure data integrity.
