# ETL Acceptance Checklist

## 1. Pipelines & Execution
- [ ] Batch Pipelines implemented for nightly runs.
- [ ] Incremental Pipelines tracking watermarks/checkpoints.
- [ ] Backfill jobs created for historical data loading.

## 2. Change Data Capture
- [ ] CDC Engine handles Insert Detection correctly.
- [ ] CDC Engine handles Update Detection correctly (SCD logic applied).
- [ ] CDC Engine handles Delete Detection (Soft deletes propagated).

## 3. Transformations
- [ ] Data cleaning and normalization rules created.
- [ ] Enrichment (Lookups) correctly resolving IDs.
- [ ] Transformation tests validating output against expected schema.

## 4. Orchestration & Validation
- [ ] Workflow scheduling correctly defining dependencies.
- [ ] Retry policies (Exponential Backoff) configured.
- [ ] Null and Duplicate validation checks implemented.
- [ ] Dead-letter queue catching and logging failed validations.

## 5. Reconciliation & Auditing
- [ ] Reconciliation scripts comparing Source vs Warehouse counts.
- [ ] Audit Logs tracking `Pipeline Started`, `Completed`, `Failed`.
- [ ] Performance metrics (Execution Time, Freshness) monitored.
