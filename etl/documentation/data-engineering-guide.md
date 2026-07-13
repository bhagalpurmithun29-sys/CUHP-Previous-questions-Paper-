# Data Engineering Guide & Operations Manual

## 1. Creating a New Pipeline

### 1.1 Source Connection
- Define the extractor securely using environment variables for credentials.
- Test the connection using `Pipeline Validation Tests`.

### 1.2 Transformation Logic
- Write transformations in a modular, unit-testable manner.
- Do NOT write complex logic in the Orchestrator DAG file; keep the DAG strictly for orchestration. Use the `Transformation Library` modules.

### 1.3 Target Destination
- Ensure the load step is idempotent (uses `UPSERT` or `MERGE` statements).

## 2. Handling Failures (Operations)

### 2.1 Dead Letter Queues (DLQ)
- When a transformation fails due to a schema mismatch or business rule violation, the record is routed to the `dead-letter/` queue.
- **Ops Task**: Review the DLQ daily. Fix the parser or data, and run a Replay Job.

### 2.2 Retry Policies
- Transients (e.g., Network timeouts) are configured with 3 retries and exponential backoff.
- Fatal errors (e.g., Syntax Error) fail immediately and send a notification.

### 2.3 Monitoring Data Freshness
- The orchestration tool tracks "Data Freshness" SLAs. If Fact tables are older than 24 hours, a Sev-2 alert is raised to Platform Operations.
