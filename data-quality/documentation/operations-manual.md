# Data Quality Guide & Operations Manual

## 1. Quality Guide: Rule Implementation
* **Separation of Concerns**: Validation rules must be stored in configuration files (YAML/JSON) or a central repository, NOT hardcoded into Python or SQL logic.
* **Testing**: Every Quality Rule must have an associated unit test passing both a positive (valid) and negative (invalid) dataset to ensure the rule triggers correctly.

## 2. Operations: Profiling & Drift
* **Background Profiling**: Profiling large tables (e.g., `Fact_AI_Usage`) is resource-intensive. Run deep profiling jobs weekly during off-peak hours (e.g., Sunday 02:00 AM).
* **Drift Resolution**: If Schema Drift occurs (e.g., mobile app sends a new telemetry field), Operations must decide whether to update the ETL pipeline to ingest it, or update the Validation rule to ignore it.

## 3. Operations: Root Cause Analysis (RCA)
When a quality circuit breaker trips:
1. Check the `Root Cause Dashboard`.
2. Trace the **Pipeline Failure Correlation**: Identify if the failure stems from a recent code deployment, an upstream API outage, or a change in the source database schema.
3. Once the issue is resolved in the source or pipeline, clear the failure flag and resume the pipeline.

## 4. Audit & Analytics Tracking
* **Audit Logs**: Maintain strict logs of `Quality Rule Updated` and `Certification Issued` for compliance.
* **KPIs**: Track `Quality Score` (average Trust Score across all certified tables) and `Validation Success Rate` in the Operations BI Dashboard.
