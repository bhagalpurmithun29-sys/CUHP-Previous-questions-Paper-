# Privacy Governance Guide & Operations Manual

## 1. Governance: Handling DSAR (Data Subject Requests)
* When a user requests Data Deletion (Right to be Forgotten):
  1. The API triggers a `Suspended` workflow state.
  2. The system checks the `Legal Hold` database. If the user is on hold, the request is automatically denied with a compliant explanation.
  3. If clear, the Purge Engine executes the deletion asynchronously across the Data Warehouse and MongoDB, finalizing the `Processing Status`.

## 2. Operations: Background Processing
* **Incremental Lifecycle Evaluation**: Checking millions of rows for expiration daily is heavy. The Retention Engine runs incrementally, evaluating only rows where `expiration_date` falls within the current processing window.
* **Cached Policy Resolution**: Because retention policies change infrequently, the Policy Engine caches them in Redis. The ETL layer evaluates rows against this fast cache, not the primary database.

## 3. Operations: Analytics & Compliance Tracking
* Operations monitors the `Retention Compliance` dashboard to ensure automated archival/purges are completing without errors.
* **Audit Logs**: Maintain strict, immutable logs of `Consent Updated`, `Legal Hold Applied`, and `Deletion Executed`. These logs are critical evidence during an external compliance audit.
